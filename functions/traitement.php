<?php
session_start();
include "../config/connexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_SESSION['subscriber'])) {
        $subscriber = $_SESSION['subscriber'];
        if (isset($_POST['valider']) && !isset($_POST['updated_simulation'])) {
            // Récupérez et nettoyez les données du formulaire pour l'ajout
            $driverName = cleanInput($_POST["driverName"]);
            $driverBirthDay = cleanInput($_POST["driverBirthDay"]);
            $driverLicense = cleanInput($_POST["driverLicense"]);
            $licenseStartDate = cleanInput($_POST["licenseStartDate"]);
            $status = cleanInput($_POST["status"]);
            $categoryCode = findCode(cleanInput($_POST["lib_category"]));
            $insuranceDuration = cleanInput($_POST["time"]);
            $fiscalPower = cleanInput($_POST["fiscalPower"]);
            $fuelType = cleanInput($_POST["Energy"]);
            $canDrive = isset($_POST["can_drive"]) ? cleanInput($_POST["can_drive"]) : null;
            $kartOwnerInsured = isset($_POST["kartOwner"]) ? cleanInput($_POST["kartOwner"]) : null;
            $carriesFlammableMaterial = isset($_POST["flammable"]) ? 'Yes' : null;
            $withTrailer = isset($_POST["withTrailer"]) ? 'Yes' : null;
            $trailerPower = isset($_POST["powerTrailer"]) ? cleanInput($_POST["powerTrailer"]) : null;
            $numSeats = isset($_POST["numSeats"]) ? cleanInput($_POST["numSeats"]) : null;
            $tonnagePayload = isset($_POST["tonnage"]) ? cleanInput($_POST["tonnage"]) : null;
            $habitualDrivingZone = cleanInput($_POST["zones"]);
            $tpvType = isset($_POST["vehicleType"]) ? cleanInput($_POST["vehicleType"]) : null;
            $vehicleAutoEcoleType = isset($_POST["category"]) ? cleanInput($_POST["category"]) : null;
            $motoType = isset($_POST['twoWheelsVehicles']) ? cleanInput($_POST['twoWheelsVehicles']) : null;
            $paid = isset($_POST["wheeler"]) ? cleanInput($_POST["wheeler"]) : null;
            $specialCategoryType = isset($_POST["special_category"]) ? cleanInput($_POST["special_category"]) : null;
            $result = cleanInput($_POST["prime"]);
            $num_vehicle = strtoupper(cleanInput($_POST["immatriculation"]));
            
            // Récupérez l'ID du conducteur inséré
            $driverId = insertDriverData($pdo, $driverName, $driverBirthDay, $driverLicense, $licenseStartDate, $status, $categoryCode, $subscriber);
            
            // Insérez les données du véhicule
            insertVehicleData($pdo, $num_vehicle, $categoryCode, $insuranceDuration, $fiscalPower, $fuelType, $canDrive, $kartOwnerInsured, $carriesFlammableMaterial, $withTrailer, $trailerPower, $numSeats, $tonnagePayload, $habitualDrivingZone, $tpvType, $vehicleAutoEcoleType, $motoType, $paid, $specialCategoryType);
            
            // Insérez les données de la simulation
            insertSimulationData($pdo, $result, $driverId, $num_vehicle, $subscriber);
            
            echo "Données insérées avec succès !";
            header('Location: ../index.php?index=list');
        } else if (isset($_POST['updated_simulation'])) {
            // Récupérez les valeurs du formulaire pour la mise à jour
            // $updatedSimulationId = $_POST['updated_simulation'];
            // $driverName = cleanInput($_POST["driverName"]);
            // $driverBirthDay = cleanInput($_POST["driverBirthDay"]);
            // $driverLicense = cleanInput($_POST["driverLicense"]);
            // $licenseStartDate = cleanInput($_POST["licenseStartDate"]);
            // $status = cleanInput($_POST["status"]);
            // $libCategory = cleanInput($_POST["lib_category"]);
            
            // // Mettez à jour la base de données en utilisant des requêtes SQL
            // updateSimulationData($pdo, $updatedSimulationId, $driverName, $driverBirthDay, $driverLicense, $licenseStartDate, $status, $libCategory);
        }
    } else {
        echo "<p style='font-size=bolder'>Pour pouvoir valider vos simulations,\n  veuillez vous connecter svp";
        echo "<h2>Vous allez être redirigé vers une page pour cela</h2></p>";
        header('Refresh:4; URL=../view/sign_up.php');
    }
}
if (isset($_POST['sign_up'])) {
    $subscriber_login = cleanInput($_POST['login']);
    $subscriber_email = cleanInput($_POST['email']);
    $subscriber_password = cleanInput($_POST['password']);

    $sql = "SELECT * FROM subscribers WHERE email = ?";
    $req = $pdo->prepare($sql);
    $req->execute([$subscriber_email]);
    $subscriber = $req->fetch();

    if (!empty($subscriber)) {
        header('Refresh:1; URL=../view/sign_up.php');
        echo "$subscriber_email already exists!";
    } else {
        $sql = "INSERT INTO subscribers (login, email, password) VALUES (:subscriber_login, :subscriber_email, :subscriber_password)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':subscriber_login', $subscriber_login);
        $stmt->bindParam(':subscriber_email', $subscriber_email);
        $stmt->bindParam(':subscriber_password', password_hash($subscriber_password, PASSWORD_DEFAULT));
        $stmt->execute();

        if ($stmt) {
            header("Location: ../view/confirmation.php");
            exit;
        } else {
            echo "Erreur lors de l'inscription : " . $pdo->errorCode();
        }
    }
}

if (isset($_POST['sign_in'])) {
    $subscriber_email = cleanInput($_POST['email']);
    $subscriber_password = cleanInput($_POST['password']);
    $query = "SELECT * FROM subscribers WHERE email=?";
    $result = $pdo->prepare($query);
    $result->execute([$subscriber_email]);
    $subscriber = $result->fetch();

    if ($subscriber && password_verify($subscriber_password, $subscriber['password'])) {
        $_SESSION['subscriber'] = $subscriber;
        header("Location: ../index.php?index=form");
        exit;
    } else {
        header("Location: ../view/error.php");
        exit;
    }
}




// Fonction pour nettoyer les données d'entrée
function cleanInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function findCode($lib)
{
    $code_designation = [
        'Promenade & Affaires' => '210',
        'Transport Propre Compte' => '220',
        'Transport Public de Marchandises' => '230',
        'Transport Public de Voyageurs' => '240',
        'Véhicule 2/3 Roues Personnel' => '250',
        "Véhicules 'WW' Garages" => '260',
        'Véhicule Auto-École' => '270',
        'Véhicule de Location' => '280',
        'Engins de Chantiers' => '290',
        'Véhicules Spéciaux' => '291'
    ];

    $findCode = null;

    foreach ($code_designation as $designation => $code) {
        if ($lib == $designation) {
            $findCode = $code;
            break;
        }
    }

    return $findCode;
}

function insertDriverData($pdo, $driverName, $driverBirthDay, $driverLicense, $licenseStartDate, $status, $categoryCode, $subscriber) {
    $stmt = $pdo->prepare("INSERT INTO drivers (driver_name, birth_date, license_type, license_issue_date, socio_professional_status, subscriber_id)
            VALUES (:driverName, :driverBirthDay, :driverLicense, :licenseStartDate, :status, :subscriber_id)");
    $stmt->bindParam(':driverName', $driverName);
    $stmt->bindParam(':driverBirthDay', $driverBirthDay);
    $stmt->bindParam(':driverLicense', $driverLicense);
    $stmt->bindParam(':licenseStartDate', $licenseStartDate);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':subscriber_id', $subscriber['subscriber_id']);
    $stmt->execute();

    return $pdo->lastInsertId();
}

function insertVehicleData($pdo, $num_vehicle, $categoryCode, $insuranceDuration, $fiscalPower, $fuelType, $canDrive, $kartOwnerInsured, $carriesFlammableMaterial, $withTrailer, $trailerPower, $numSeats, $tonnagePayload, $habitualDrivingZone, $tpvType, $vehicleAutoEcoleType, $motoType, $paid, $specialCategoryType) {
    $stmt = $pdo->prepare("INSERT INTO vehicles (num_vehicle, category_code, insurance_duration, fiscal_power, fuel_type, can_drive, kart_owner_insured, carries_flammable_material, with_trailer, trailer_power, num_seats, tonnage_payload, habitual_driving_zone, tpv_type, vehicle_auto_ecole_type, moto_type, paid, special_category_type) 
            VALUES (:num_vehicle, :categoryCode, :insuranceDuration, :fiscalPower, :fuelType, :canDrive, :kartOwnerInsured, :carriesFlammableMaterial, :withTrailer, :trailerPower, :numSeats, :tonnagePayload, :habitualDrivingZone, :tpvType, :vehicleAutoEcoleType, :motoType, :paid, :specialCategoryType)");
    $stmt->bindParam(':num_vehicle', $num_vehicle);
    $stmt->bindParam(':categoryCode', $categoryCode);
    $stmt->bindParam(':insuranceDuration', $insuranceDuration);
    $stmt->bindParam(':fiscalPower', $fiscalPower);
    $stmt->bindParam(':fuelType', $fuelType);
    $stmt->bindParam(':canDrive', $canDrive);
    $stmt->bindParam(':kartOwnerInsured', $kartOwnerInsured);
    $stmt->bindParam(':carriesFlammableMaterial', $carriesFlammableMaterial);
    $stmt->bindParam(':withTrailer', $withTrailer);
    $stmt->bindParam(':trailerPower', $trailerPower);
    $stmt->bindParam(':numSeats', $numSeats);
    $stmt->bindParam(':tonnagePayload', $tonnagePayload);
    $stmt->bindParam(':habitualDrivingZone', $habitualDrivingZone);
    $stmt->bindParam(':tpvType', $tpvType);
    $stmt->bindParam(':vehicleAutoEcoleType', $vehicleAutoEcoleType);
    $stmt->bindParam(':motoType', $motoType);
    $stmt->bindParam(':paid', $paid);
    $stmt->bindParam(':specialCategoryType', $specialCategoryType);
    $stmt->execute();
}

function insertSimulationData($pdo, $result, $driverId, $num_vehicle, $subscriber) {
    $stmt = $pdo->prepare("INSERT INTO simulations (simulation_date, prime , driver_id, num_vehicle,subscriber_id)
            VALUES (NOW(), :result, :driverId, :num_vehicle,:subscriber_id)");
    $stmt->bindParam(':result', $result);
    $stmt->bindParam(':driverId', $driverId);
    $stmt->bindParam(':num_vehicle', $num_vehicle);
    $stmt->bindParam(':subscriber_id', $subscriber['subscriber_id']);
    $stmt->execute();
}

function updateSimulationData($pdo, $updatedSimulationId, $driverName, $driverBirthDay, $driverLicense, $licenseStartDate, $status, $libCategory) {
    $updateQuery = "UPDATE simulations 
                    SET driver_name = :driverName, birth_date = :driverBirthDay, license_type = :driverLicense, license_issue_date = :licenseStartDate, socio_professional_status = :status, category_code = :categoryCode
                    WHERE simulation_id = :updatedSimulationId";
    $updateStmt = $pdo->prepare($updateQuery);
    $updateStmt->bindParam(':driverName', $driverName);
    $updateStmt->bindParam(':driverBirthDay', $driverBirthDay);
    $updateStmt->bindParam(':driverLicense', $driverLicense);
    $updateStmt->bindParam(':licenseStartDate', $licenseStartDate);
    $updateStmt->bindParam(':status', $status);
    $updateStmt->bindParam(':categoryCode', findCode($libCategory));
    $updateStmt->bindParam(':updatedSimulationId', $updatedSimulationId);
    $updateStmt->execute();
}

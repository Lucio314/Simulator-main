<?php
session_start();
include_once('./config/connexion.php');
$insured_vehicles = [];
$sql = "SELECT num_vehicle FROM simulations;";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$insured_vehicles = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/sign.css">
    <link rel="shortcut icon" href="./img/icons8-processing-64.png" type="image/x-icon">
    <meta charset="utf-8">
    <title>Simulateur</title>
</head>
<style>
    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url('./img/icons8-processing-64.png');
        background-size: 20px;
        background-position: right 8px center;
        background-repeat: no-repeat;
    }
</style>

<body>
    <?php include_once "view/header.php" ?>
    <?php include_once "view/body.php" ?>
    <!-- <footer></footer> -->
    <script src="js/script.js"></script>
    <script>
        const list = <?php echo json_encode($insured_vehicles); ?>;
        function formatAndCheck(input) {
    const message = document.getElementById("message");
    message.textContent = "";

    let vehicleNumber = input.value;
    // Convertir le numéro de véhicule en majuscules
    vehicleNumber = vehicleNumber.toUpperCase();

    // Expression régulière pour valider le format
    let formatPattern;
    
    if (list.some(vehicle => vehicle.num_vehicle === vehicleNumber)) {
        message.style.color = 'red';
        input.style.borderColor = 'red';
        message.textContent = 'Ce véhicule est déjà assuré';
        return;
    }

    if (categoryIsMoto()) {
        formatPattern = /^2[A-Z]{2} \d{4} [A-Z]{2}$/; // Format spécial pour les motos
    } else {
        formatPattern = /^[A-Z]{2} \d{4} [A-Z]{2}$/; // Format par défaut
    }

    const isFormatValid = formatPattern.test(vehicleNumber);

    if (isFormatValid) {
        message.style.color = 'green';
        input.style.borderColor = 'black';
        message.textContent = 'Format valide.';
    } else {
        message.style.color = 'red';
        input.style.borderColor = 'red';
        message.textContent = 'Format invalide! ';
    }
}

function categoryIsMoto() {
    const categorySelect = document.getElementById('lib_category');
    return categorySelect.value === "Véhicule 2/3 Roues Personnel";
}
    </script>

</body>

</html>
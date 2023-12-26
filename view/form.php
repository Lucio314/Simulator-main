<?php
if (!isset($_SESSION['subscriber'])) {
    include_once('header.php');
}else{

$subscriber = $_SESSION['subscriber'];
include_once('./config/connexion.php');
}
if (isset($_REQUEST['id'])) {
    $query = 'SELECT * 
    FROM simulations
    INNER JOIN drivers ON simulations.driver_id = drivers.driver_id
    INNER JOIN vehicles ON vehicles.num_vehicle = simulations.num_vehicle
    WHERE simulations.simulation_id = ?';
    $req = $pdo->prepare($query);
    $req->execute([$_REQUEST['id']]);
    $page = $req->fetch(PDO::FETCH_ASSOC);
    $sql = "SELECT designation FROM vehicles
INNER JOIN categories ON vehicles.category_code = categories.category_code 
INNER JOIN simulations ON simulations.num_vehicle = vehicles.num_vehicle
WHERE simulations.simulation_id = ?; ";
$req = $pdo->prepare($sql);
$req->execute([$_REQUEST['id']]);
$lib = $req->fetch(PDO::FETCH_ASSOC);
}

?>

<div class="container">
    <form id="insuranceForm" method="POST" action="functions/traitement.php" onsubmit="return validateForm()">
        <!-- Les informations sur le conducteur -->
      <?php if (isset($_REQUEST['id'])) echo "<input type=hidden name=updated_simulation value=".$_REQUEST['id'] .'>'?>
        <fieldset>
            <legend>
                <h2>Infos sur le conducteur</h2>
            </legend>
            <label for="driverName">Nom du conducteur:</label>
            <input type="text" name="driverName" id="driverName" value='<?php if (isset($page['driver_name'])) echo $page['driver_name']; ?>'> <br>

            <label for="driverBirthDay">Date de naissance:</label>
            <input type="date" name="driverBirthDay" id="driverBirthDay" value='<?php if (isset($page['birth_date'])) echo $page['birth_date']; ?>' required>
            <span id="msg"></span> <br>

            <label for="driverLicense">Type de Permis:</label>
            <select id="driverLicense" name="driverLicense">
                <option selected="selected" disabled="disabled">Sélectionner le type de permis</option>
                <option value="A1, A2, A3" <?php if (isset($page['license_type']) && $page['license_type'] === "A1, A2, A3") echo 'selected'; ?>>A1, A2, A3</option>
                <option value="B" <?php if (isset($page['license_type']) && $page['license_type'] === "B") echo 'selected'; ?>>B</option>
                <option value="C" <?php if (isset($page['license_type']) && $page['license_type'] === "C") echo 'selected'; ?>>C</option>
                <option value="D" <?php if (isset($page['license_type']) && $page['license_type'] === "D") echo 'selected'; ?>>D</option>
                <option value="A,B,C,D,E" <?php if (isset($page['license_type']) && $page['license_type'] === "A,B,C,D,E") echo 'selected'; ?>>A,B,C,D,E</option>
            </select> <br>
            <label for="licenseStartDate">Délivré le</label>
            <input type="date" id="licenseStartDate" name="licenseStartDate" value='<?php if (isset($page['license_issue_date'])) echo $page['license_issue_date']; ?>' required>
            <span id="msg1"></span><br>
            <label for="status">Statut Socio-Professionnel:</label>
            <select name="status" required id="status">
                <option selected="selected" disabled="disabled">Votre Profession</option>
                <option value="Statut1" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut1") echo 'selected'; ?>>Professions libérales</option>
                <option value="Statut1" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut1") echo 'selected'; ?>>Commerçants</option>
                <option value="Statut1" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut1") echo 'selected'; ?>>Agents commerciaux</option>
                <option value="Statut1" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut1") echo 'selected'; ?>>Agents de recouvrements</option>
                <option value="Statut1" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut1") echo 'selected'; ?>>Voyageurs Représentants Placiers</option>
                <option value="Statut2" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut2") echo 'selected'; ?>>Employés du privé</option>
                <option value="Statut2" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut2") echo 'selected'; ?>>Fonctionnaires</option>
                <option value="Statut2" <?php if (isset($page['socio_professional_status']) && $page['socio_professional_status'] === "Statut2") echo 'selected'; ?>>retraités, conjoints au foyer, sans emploi, etc...</option>
            </select>
        </fieldset>
        <!-- Fin informations sur le conducteur -->

        <!-- Informations sur la catégorie d'automobile -->
        <fieldset>
            <legend>
                <h2>Catégorie: </h2>
            </legend>
            <div class="category_designation">
                <div class="category">Code: <span id="code_category"><?php echo (isset($page['category_code']) ? $page['category_code'] : '000') ?></span></div>

                <div class="designation">
                    <select id="lib_category" name="lib_category" required>
                        <option selected="selected" disabled="disabled">Choisir la catégorie d'automobile</option>
                        <option value="Promenade & Affaires" <?php if (isset($lib['designation']) && $lib['designation'] === "Promenade & Affaires") echo 'selected'; ?>>Promenade & Affaires</option>
                        <option value="Transport Propre Compte" <?php if (isset($lib['designation']) && $lib['designation'] === "Transport Propre Compte") echo 'selected'; ?>>Transport Propre Compte</option>
                        <option value="Transport Public de Marchandises" <?php if (isset($lib['designation']) && $lib['designation'] === "Transport Public de Marchandises") echo 'selected'; ?>>Transport Public de Marchandises</option>
                        <option value="Transport Public de Voyageurs" <?php if (isset($lib['designation']) && $lib['designation'] === "Transport Public de Voyageurs") echo 'selected'; ?>>Transport Public de Voyageurs</option>
                        <option value="Véhicule 2/3 Roues Personnel" <?php if (isset($lib['designation']) && $lib['designation'] === "Véhicule 2/3 Roues Personnel") echo 'selected'; ?>>Véhicule 2/3 Roues Personnel</option>
                        <option value="Véhicule Auto-École" <?php if (isset($lib['designation']) && $lib['designation'] === "Véhicule Auto-École") echo 'selected'; ?>>Véhicule Auto-École</option>
                        <option value="Véhicule de Location" <?php if (isset($lib['designation']) && $lib['designation'] === "Véhicule de Location") echo 'selected'; ?>>Véhicule de Location</option>
                        <option value="Engins de Chantiers" <?php if (isset($lib['designation']) && $lib['designation'] === "Engins de Chantiers") echo 'selected'; ?>>Engins de Chantiers</option>
                        <option value="Véhicules Spéciaux" <?php if (isset($lib['designation']) && $lib['designation'] === "Véhicules Spéciaux") echo 'selected'; ?>>Véhicules Spéciaux</option>
                    </select>
                </div>
            </div><br>

            <label>Durée de l'assurance:</label>
            <input type="radio" name="time" id="lessThanYear" value="-1" <?php if (isset($page['insuration_duration']) && $page['insuration_duration'] != '1')  echo 'checked' ?>>
            <label for="lessThanYear">moins d'un an</label>
            <input type="radio" name="time" value="1" id="oneYear" checked required>
            <label for="oneYear">un an</label>
        </fieldset>
        <!-- Informations sur l'Automobile -->
        <fieldset>
            <legend>
                <h2>Infos sur le Véhicule: </h2>
            </legend>
            <div class="info_car">
                <div class="info_type">
                    <label for="immatriculation">Numéro d'immatriculation : </label>
                    <input type="text" name="immatriculation" id="immatriculation " placeholder="Ex: AK 3604 RB" onblur="formatAndCheck(this)" value="<?php if (isset($page['num_vehicle'])) echo $page['num_vehicle'] ?>">
                    <span id="message"></span>
                    <div style="display: none;" id="categories">
                        <label for="category">Catégorie de véhicule utilisé : </label>
                        <select name="category" id="category">
                            <option selected="selected" disabled="disabled">Choisir un genre</option>
                            <option value="Promenade & Affaires" <?php if (isset($page['vehicle_auto_ecole_type']) && $page['vehicle_auto_ecole_type'] === "Promenade & Affaires") echo 'selected'; ?>>Promenade & Affaires</option>
                            <option value="Transport Propre Compte" <?php if (isset($page['vehicle_auto_ecole_type']) && $page['vehicle_auto_ecole_type'] === "Transport Propre Compte") echo 'selected'; ?>>Transport Propre Compte</option>
                            <option value="Transport Public de Marchandises" <?php if (isset($page['vehicle_auto_ecole_type']) && $page['vehicle_auto_ecole_type'] === "Transport Public de Marchandises") echo 'selected'; ?>>Transport Public de Marchandises</option>
                        </select>
                    </div>

                    <div style="display: none;" id="special_categories">
                        <label for="special_category">Genre:</label>
                        <select name="special_category" id="special_category">
                            <option selected="selected" disabled="disabled">Choisir un genre</option>
                            <option value="Ambulances" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Ambulances") echo 'selected'; ?>>Ambulances</option>
                            <option value="Corbillards" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Corbillards") echo 'selected'; ?>>Corbillards</option>
                            <option value="Fourgons funéraires" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Fourgons funéraires") echo 'selected'; ?>>Fourgons funéraires</option>
                            <option value="Arroseuses" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Arroseuses") echo 'selected'; ?>>Arroseuses</option>
                            <option value="Balayeuses" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Balayeuses") echo 'selected'; ?>>Balayeuses</option>
                            <option value="Véhicules municipaux" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Véhicules municipaux") echo 'selected'; ?>>Véhicules municipaux</option>
                            <option value="Tracteurs agricoles" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Tracteurs agricoles") echo 'selected'; ?>>Tracteurs agricoles</option>
                            <option value="Karts" <?php if (isset($page['special_category_type']) && $page['special_category_type'] === "Karts") echo 'selected'; ?>>Karts</option>
                        </select>
                    </div>


                    <div style="display: none;" id="wheelers">
                        <h3>2/3 Roues :</h3>
                        <select name="twoWheelsVehicles" id="twoWheelsVehicles">
                            <option selected="selected" disabled="disabled">Choisir un genre</option>
                            <option value="Cyclomoteur" <?php if (isset($page['moto_type']) && $page['moto_type'] === "Cyclomoteur") echo 'selected'; ?>>Cyclomoteur</option>
                            <option value="Scooter" <?php if (isset($page['moto_type']) && $page['moto_type'] === "Scooter") echo 'selected'; ?>>Scooter</option>
                            <option value="Triporteur" <?php if (isset($page['moto_type']) && $page['moto_type'] === "Triporteur") echo 'selected'; ?>>Triporteur</option>
                            <option value="Vélomoteur" <?php if (isset($page['moto_type']) && $page['moto_type'] === "Vélomoteur") echo 'selected'; ?>>Vélomoteur</option>
                            <option value="Motocyclette" <?php if (isset($page['moto_type']) && $page['moto_type'] === "Motocyclette") echo 'selected'; ?>>Motocyclette</option>
                        </select>
                        <h4>Payant ou non-payant?</h4>
                        <input type="checkbox" name="wheeler" value="paid" id="paid" <?php if (isset($page['paid']) && $page['paid'] === "paid") echo 'checked'; ?>>
                        <label for="paid"> Payant</label>
                        <input type="checkbox" name="wheeler" value="unpaid" id="unpaid" <?php if (isset($page['paid']) && $page['paid'] === "unpaid") echo 'checked'; ?>>
                        <label for="unpaid"> Non Payant</label>
                    </div>

                    <div style="display: none;" id="vehicleTypes">
                        <label for="vehicleType">Genre :</label>
                        <select id="vehicleType" name="vehicleType" title="Genre de véhicule">
                            <option selected="selected" disabled="disabled">Choisir un genre</option>
                            <option value="Véhicule Particulier" <?php if (isset($page['tpv_type']) && $page['tpv_type'] === "Véhicule Particulier") echo 'selected'; ?>>Véhicule Particulier</option>
                            <option value="Taxis" <?php if (isset($page['tpv_type']) && $page['tpv_type'] === "Taxis") echo 'selected'; ?>>Taxis</option>
                            <option value="Minibus" <?php if (isset($page['tpv_type']) && $page['tpv_type'] === "Minibus") echo 'selected'; ?>>Minibus</option>
                            <option value="Autocars" <?php if (isset($page['tpv_type']) && $page['tpv_type'] === "Autocars") echo 'selected'; ?>>Autocars</option>
                            <option value="Camions" <?php if (isset($page['tpv_type']) && $page['tpv_type'] === "Camions") echo 'selected'; ?>>Camions</option>
                            <option value="Transports mixtes" <?php if (isset($page['tpv_type']) && $page['tpv_type'] === "Transports mixtes") echo 'selected'; ?>>Transports mixtes</option>
                        </select>
                    </div>


                    <div id="powerTrailerHide" style="display: none;">
                        <label for="powerTrailer">Puissance fiscale de la remorque:</label>
                        <input type="number" name="powerTrailer" min="1" id="powerTrailer" placeholder="Puissance fiscale de la remorque" value="<?php if (isset($page['trailer_power'])) echo $page['trailer_power']; ?>">
                    </div><br>

                    <label for="power">Puissance fiscale:</label>
                    <input type="number" name="fiscalPower" style="display: block;" id="power" min="2" value="<?php if (isset($page['fiscal_power'])) echo $page['fiscal_power']; ?>" required><br>

                    <label>Énergie:</label>
                    <input type="radio" name="Energy" value="Diesel" id="diesel" <?php if (isset($page['fuel_type']) && $page['fuel_type'] === "Diesel") echo 'checked'; ?>>
                    <label for="diesel">Diesel</label>
                    <input type="radio" name="Energy" value="Essence" id="essence" <?php if (isset($page['fuel_type']) && $page['fuel_type'] === "Essence") echo 'checked'; ?>>
                    <label for="essence">Essence</label>
                    <input type="radio" name="Energy" value="Electric" id="electric" <?php if (isset($page['fuel_type']) && $page['fuel_type'] === "Electric") echo 'checked'; ?>>
                    <label for="electric">Électrique</label><br>

                    <div style="display: none;" id="driveStatus">
                        <label>Peut-il circuler sur une route ouverte au public?</label>
                        <input type="radio" name="can_drive" value="Yes" <?php if (isset($page['can_drive']) && $page['can_drive'] === "Yes") echo 'checked'; ?>>
                        <label for="can_drive">Oui</label>
                        <input type="radio" name="can_drive" value="No" <?php if (isset($page['can_drive']) && $page['can_drive'] === "No") echo 'checked'; ?>>
                        <label for="can_drive">Non</label>
                    </div><br>

                    <div style="display: none;" id="kartOwners">
                        <input type="checkbox" name="kartOwner" value="owner" id="owner" <?php if (isset($page['kart_owner_insured']) && $page['kart_owner_insured'] === "owner") echo 'checked'; ?>>
                        <label for="owner">Propriété de l'assuré</label>
                        <input type="checkbox" name="kartOwner" value="rental" id="rental" <?php if (isset($page['kart_owner_insured']) && $page['kart_owner_insured'] === "rental") echo 'checked'; ?>>
                        <label for="rental">Véhicule en location</label>
                    </div>

                    <div id="checkboxs" style="display: none;">
                        <input type="checkbox" name="flammable" id="flammable" <?php if (isset($page['carries_flammable_material']) && $page['carries_flammable_material'] === "Yes") echo 'checked'; ?>>
                        <label for="flammable">Mat.Inflammables</label>
                        <input type="checkbox" name="withTrailer" value="withTrailer" id="withTrailer" <?php if (isset($page['with_trailer']) && $page['with_trailer'] === "Yes") echo 'checked'; ?>>
                        <label for="withTrailer">Avec Remorque</label>
                    </div>

                    <div id="numSeatsHide" style="display: <?php echo (isset($page['category_code']) && $page['category_code'] == '240') ? 'block' : 'none' ?>">
                        <label for="numSeats">Nb Places:</label>
                        <input type="number" name="numSeats" id="numSeats" min="2" value="<?php if (isset($page['num_seats'])) echo $page['num_seats']; ?>">
                    </div><br>

                    <div id="tonnageHide" style="display: none;">
                        <label for="tonnage">Tonnage/Charge utile:</label>
                        <input type="number" name="tonnage" id="tonnage" min="1" value="<?php if (isset($page['tonnage_payload'])) echo $page['tonnage_payload']; ?>"><br>
                    </div>

                    <label for="zones">Zone:</label>
                    <select id="zones" name="zones" required>
                        <option value="zone rouge" selected="selected" disabled="disabled">zone de conduite habituelle</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Indéterminé") echo 'selected'; ?>>Indéterminé</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Cotonou") echo 'selected'; ?>>Cotonou</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Allada") echo 'selected'; ?>>Allada</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Porto-Novo") echo 'selected'; ?>>Porto-Novo</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Ouidah") echo 'selected'; ?>>Ouidah</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Lokossa") echo 'selected'; ?>>Lokossa</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Azovè") echo 'selected'; ?>>Azovè</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Dogbo") echo 'selected'; ?>>Dogbo</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Abomey") echo 'selected'; ?>>Abomey</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Bohicon") echo 'selected'; ?>>Bohicon</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Dassa") echo 'selected'; ?>>Dassa</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Savè") echo 'selected'; ?>>Savè</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Parakou") echo 'selected'; ?>>Parakou</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Natitingou") echo 'selected'; ?>>Natitingou</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Djougou") echo 'selected'; ?>>Djougou</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Kandi") echo 'selected'; ?>>Kandi</option>
                        <option value="zone rouge" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Malanville") echo 'selected'; ?>>Malanville</option>
                        <option value="zone verte" <?php if (isset($page['habitual_driving_zone']) && $page['habitual_driving_zone'] === "Autres localités du Bénin") echo 'selected'; ?>>Autres localités du Bénin</option>
                    </select>

                </div>
        </fieldset>
        <input type="button" name="simuler" value="Simuler :" id="submitButton" />
        <div class="result">
            <input type="number" name="prime" placeholder="    Prime" id="result" value="<?php if (isset($page['prime'])) echo $page['prime']; ?>" readonly required />
            <input type="submit" name="valider" value="valider" />
        </div>

    </form>
    <div id="surprime"></div>
<?php
if (!isset($_SESSION['subscriber'])) {
    header("Location: index.php?index=form");
    exit;
} else {
    $subscriber = $_SESSION['subscriber'];
}

include "config/connexion.php";
// Récupérer les données de simulation du souscripteur connecté depuis la base de données
$stmt = $pdo->prepare("SELECT subscriber_id FROM subscribers WHERE email=?");
$stmt->execute([$subscriber['email']]);
$id = $stmt->fetch();
$stmt = $pdo->prepare("SELECT * FROM simulations WHERE subscriber_id = ?");
$stmt->execute([$id[0]]);
$simulations = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "<form id=fleetform method=post>
    <table border=1>
        <tr>
            <th><input type=checkbox id=all_checked>ID</th>
            <th>Date de Simulation</th>
            <th>N° Immatriculation</th>
            <th>Résultat</th>
        </tr>";
        foreach ($simulations as $simulation) {
            echo '<tr>';
            echo '<td><input type="checkbox" name="simulation_id[]" id="' . $simulation['simulation_id'] . '" value="' . $simulation['simulation_id'] . '"></td>';
            echo '<td>' . $simulation['simulation_date'] . '</td>';
            echo '<td><a href=index.php?index=form&id='. $simulation['simulation_id'] .'> '. $simulation['num_vehicle'] . '</a></td>';
            echo '<td>' . $simulation['prime'] . '</td>';
            echo '</tr>';
        }
  echo " </table>
    <center><input type=submit style=display:none name=flotte id=flotte value=Regrouper></center>
</form>";

$sql = "SELECT simulations.simulation_id 
FROM vehicles 
INNER JOIN simulations ON vehicles.num_vehicle = simulations.num_vehicle 
INNER JOIN subscribers ON simulations.subscriber_id = subscribers.subscriber_id 
WHERE subscribers.subscriber_id = ? AND 
(vehicles.category_code IN (250,260,270,280,290,291) OR vehicles.tpv_type = 'Taxis');";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id[0]]);
$notInFleetIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div id="totalPrimes"></div>

<script src="js/simul.js"></script>
<script>
    const notInFleetIds = <?php echo json_encode($notInFleetIds) ?>;
    console.log(notInFleetIds);

    document.getElementById('flotte').addEventListener('click', function(event) {
        event.preventDefault();
        var checkboxes = document.querySelectorAll('input[type="checkbox"][name="simulation_id[]"]:checked:not(#all_checked)');
        var FleetIds = [];
        var totalPrimes = 0;
        var n=0;
        checkboxes.forEach(function(checkbox) {
            const selectedId = parseInt(checkbox.value);
            let prime=0;
            if (!notInFleetIds.some(flotte => flotte.simulation_id == selectedId)) {
                FleetIds.push(selectedId);
                checkbox.parentNode.style.backgroundColor = 'green';
                 prime = parseFloat(checkbox.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.innerText);
                totalPrimes += prime;
                n++;
            }else{
                checkbox.parentNode.style.backgroundColor = 'red';
            }
        });
        console.log(n);
        const taux=1;
            if (n>=5 && n<=20) {
                taux=0.1
            } else if(n >20){
                taux = 0.15
            }
            

        document.getElementById('totalPrimes').innerText = 'Prime : ' + totalPrimes*taux;
        document.getElementById('totalPrimes').innerHTML += '<br/>' + "\"Les cases en rouges sont pour les véhicules qui ne peuvent pas partiper aux regroupements des véhicules sélectionnés\"";
    });
</script>
</body>
</html>

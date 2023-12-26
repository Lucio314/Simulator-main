<?php
if (session_status() === PHP_SESSION_ACTIVE) {
    session_write_close();
} else {
    session_start();
}
include_once('header.php');
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/sign.css">
    <title>Accueil </title>
</head>

<body>

    <div class="header">
        <?php if (isset($_SESSION['subscriber'])) echo "<h1>" . $_SESSION['subscriber']['login'] . "</h1>"  ?>
        <h1>Bienvenue sur l'Application de Simulation</h1>
        <p>Simulez, gérez, prenez des décisions éclairées.</p>
    </div>
    <main>
        <section class="description">
            <h2>Présentation de l'Application</h2>
            <p>
                Notre application de simulation vous permet de gérer efficacement les ressources, y compris les flottes et les regroupements. Prenez des décisions stratégiques en obtenant des informations précises et en simulant divers scénarios.
            </p>
        </section>
        <section class="actions">
            <h2> Pour tester dès maintenant notre Simulateur <a href=<?php echo $index ?>>Cliquer ici !</a> </h2>
            <h2> <a href=<?php echo $sign; ?>>Connectez-vous</a> pour plus de possibilités</h2>
        </section>
    </main>
    <footer>
        <p>&copy; 2023 Votre Entreprise. Tous droits réservés.</p>
    </footer>
    <!-- <script>
        const check_connected = <?php echo json_encode(isset($_SESSION['subscriber'])); ?>;
        console.log(check_connected);
        document.getElementById('header').style.display = (check_connected === true) ? 'block' : 'none';
    </script> -->
</body>

</html>
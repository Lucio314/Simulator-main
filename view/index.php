<?php
session_start();
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
    <script>
        const check_connected = <?php echo json_encode(isset($_SESSION['subscriber'])); ?>;
        console.log(check_connected);
        document.getElementById('header').style.display = (check_connected === true) ? 'block' : 'none';
    </script>
    <script src="script.js"></script>
</body>

</html>
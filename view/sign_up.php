<?php 
    session_start(); 
?>
<head>
    <link rel="stylesheet" href="../css/sign.css">
</head>
<style>
    /* Style de l'en-tête */
    header {
        background-color: #333;
        /* Couleur de fond de la barre de navigation */
        padding: 10px 0;
    }

    nav ul {
        list-style-type: none;
        padding: 0;
        text-align: center;
    }

    nav li {
        display: inline;
        margin: 0 20px;
    }

    nav a {
        text-decoration: none;
        color: white;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 16px;
    }

    nav a:hover {
        padding: 6px;
        border: #ffffff solid 1px;
        border-radius: 5px;
    }
</style>
<!-- <?php include "header.php"; ?> -->

<!-- //les infos sont envoyés par la méthode 'post' et sont traités dans le fichier traitement.php -->
<div class="form">
    <div class="form-container">
        <div class="form-header">
            <div class="form-title">Création de votre compte</div>
            <div class="line"></div>
        </div>
        <form method="POST" id="form" action="../functions/traitement.php">

            <div class="form-component">
                <label class="form-label" for="login">Login</label>
                <input class="form-control" type="text" name="login" id="login" style="text-transform: lowercase;" required /><br>
            </div>
            <div class="form-component">
                <label class="form-label" for="email">Email </label>
                <input class="form-control" type="email" name="email" id="email" required /><br>
            </div>
            <div class="form-component">
                <label class="form-label" for="password">Mot de passe </label>
                <input class="form-control" type="password" name="password" id="password" required /><br>
            </div>
            
            <div class="form-footer">
                <center> <input id="inscription" name="sign_up" value="S'inscrire" type="submit" /></center>
            </div>
            <p>Already registered ? <a href="sign_in.php">Login here</a></p>
        </form>
    </div>
</div>
<script>
        const check_connected = <?php echo json_encode(isset($_SESSION['subscriber'])); ?>;
        console.log(check_connected);
        document.getElementById('header').style.display = (check_connected === true) ? 'none' : 'none';
    </script>
</body>

</html>
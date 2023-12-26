<?php
$dir = $_SERVER['REQUEST_URI'];
$list = "index.php?index=list";
$log = "log_out.php";
$sign_up = 'sign_up.php';
if (strtolower($dir) == '/simulator/') {
    $accueil = "view/accueil.php";
    $index = "index.php?index=form";
    $sign = "view/sign_in.php";
} elseif (strtolower($dir) == '/simulator/view/') {
    $sign = "sign_in.php";
    $index = "../index.php?index=form";
    $accueil = "accueil.php";
} elseif (strtolower($dir) == '/simulator/view/accueil.php') {
    $sign = "../view/sign_in.php";
    $sign_up = "../view/sign_up.php";
    $index = "../index.php?index=form";
    $accueil = "./accueil.php   ";
    $list = "../index.php?index=list";
} else {
    $sign_up = "./view/sign_up.php";
    $accueil = "./view/accueil.php";
    $index = "./index.php?index=form";
    $sign = "./view/sign_in.php";
}

?>
<header>
    <nav>
        <ul>
            <li><a href=<?php echo $accueil ?>>Home</a></li>
            <li><a href=<?php echo $index ?>>Simulation-form</a></li>
            <?php

            if (isset($_SESSION['subscriber'])) {
                echo "<li><a href=" . $list . ">my Simulations</a></li>
                 <li class='dropdown'>
                     <a href=$sign>Connexion</a>
                     <ul class='dropdown-content'>
                         <li><a href=$sign>Se connecter</a></li>
                         <li><a href=$sign_up>S'inscrire</a></li>
                     </ul>
                 </li>";
                echo '<li><a href="view/log_out.php">Log out</a></li>';
            }

            ?>
        </ul>
    </nav>
</header>
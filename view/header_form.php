<?php
$dir = $_SERVER['REQUEST_URI'];
if (strtolower($dir) == '/simulator/') {
    $accueil = "view/accueil.php";
    $index = "index.php?index=form";
    $sign = "view/sign_in.php";
}elseif (strtolower($dir) == '/simulator/view/') {
    $sign = "sign_in.php";
    $index = "../index.php?index=form";
    $accueil = "accueil.php";
}elseif(strtolower($dir) == '/simulator/view/accueil.php'){
    $sign = "../view/sign_in.php";
    $index = "../index.php?index=form";
    $accueil = "./accueil.php";
}else {
    $accueil = "./view/accueil.php";
    $index = "./index.php?index=form";
}
// echo $dir;
?>
<header id=header>
    <nav>
        <ul>
            <li><a href=<?php echo $accueil ?> >Home</a></li>
            <li><a href=<?php echo $index ?> >Simulation-form</a></li>
            <?php
            
             if (isset($_SESSION['subscriber'])) {
               echo"  <li><a href=../index.php?index=list>my Simulations</a></li>
                 <li class='dropdown'>
                     <a href='sign_in.php'>Sign_in</a>
                     <ul class='dropdown-content'>
                         <li><a href='sign_in.php'>Se connecter</a></li>
                         <li><a href='sign_up.php'>S'inscrire</a></li>
                     </ul>
                 </li>";
                 echo '<li><a href="log_out.php">Log out</a></li>';
                }
             
             ?>
        </ul>
    </nav>
</header>
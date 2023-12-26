<header id="header" style="display: none;">
    <nav>
        <ul>
            <li><a href="accueil.php">Home</a></li>
            <li><a href="../index.php?index=list">My Simulations</a></li>
            <li><a href="../index.php?index=form">Simulation-form</a></li>
            <li class="dropdown">
                <a href="sign_in.php">Sign_in</a>
                <ul class="dropdown-content">
                    <li><a href="sign_in.php">Se connecter</a></li>
                    <li><a href="sign_up.php">S'inscrire</a></li>
                </ul>
            </li>
            <!-- <li><a href="#">Contact</a></li> -->
            <?php if (isset($_SESSION['subscriber'])) echo '<li><a href="log_out.php">Log out</a></li>' ?>
        </ul>
    </nav>
</header>
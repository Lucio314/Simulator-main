<?php
if (!isset($_REQUEST['index'])) {
    include('view/accueil.php');
} else {
    switch ($_REQUEST['index']) {
        case 'list':
            include('view/list-simul.php');
            break;
        case 'sign':
            include('view/sign_up.php');
            break;
        case 'form':
            include('view/form.php');
            break;
    }
}

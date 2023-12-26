<!DOCTYPE html>
<html lang="fr">
    <style>
        body {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
    margin: 0;
    padding: 0;
}

.confirmation {
    text-align: center;
    background-color: #fff;
    max-width: 400px;
    margin: 100px auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h1 {
    color: #008000;
}

a {
    text-decoration: none;
    color: #0073e6;
    font-weight: bold;
}

a:hover {
    text-decoration: underline;
}

    </style>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription Réussie</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="confirmation">
        <h1>Inscription Réussie!</h1>
        <p>Merci pour votre inscription. Votre formulaire a été soumis avec succès.</p>
       <?php 
        header('Refresh:3; URL=sign_in.php');
        exit;
       ?>
    </div>
</body>
</html>

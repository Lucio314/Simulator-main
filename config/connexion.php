<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'simulator';
try
{
       // Créer une connexion PDO
       $pdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
       // Définir le mode d'erreur PDO à exception
       $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
}
catch (Exception $e)
{
    die('Erreur de connexion à la base de données : ' . $e->getMessage());
}

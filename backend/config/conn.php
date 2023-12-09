<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$servername = "Localhost";
$username = "id21586058_salonsys";
$password = "SalonSys@2023";
$database = "id21586058_salonsys";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

?>

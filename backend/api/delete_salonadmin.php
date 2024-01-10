<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$SalonID = '';
$SalonUser = '';



// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
    $fetch = mysqli_fetch_assoc($email_check);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role == "MainAdmin") {
        $SalonID = $_POST['SalonID'];
        $delete_Salon = mysqli_query($conn, "DELETE FROM `Salons` WHERE SalonID = '$SalonID'");
        echo json_encode("Success");
    } elseif ($fetch_Role == "SalonAdmin") {
        $SalonUser = $_POST['SalonUser'];
        $delete_Salon_Admin = mysqli_query($conn, "DELETE FROM `Admins` WHERE AdID = '$SalonUser' AND Role = 'SalonUser'");
        echo json_encode("Success");
    } else {
        echo json_encode("Unable To Access");
    }

} else {
    echo json_encode("Unable To Access");
}


$conn->close();
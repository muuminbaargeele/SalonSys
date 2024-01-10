<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$Name = $_POST['Name'];
$NewUsername = $_POST['NewUsername'];
$Phone = '';
$Address = '';



// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
    $fetch = mysqli_fetch_assoc($email_check);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role != "MainAdmin") {
        $Phone = $_POST['Phone'];
        $Address = $_POST['Address'];
    }
    if ($fetch_Role == "MainAdmin") {
        $update_MainAdmin = mysqli_query($conn, "UPDATE `Admins` SET `Name`='$Name',`Username`='$NewUsername' WHERE Username = '$Username'");
        echo json_encode("Success");
    } else {
        $fetch_SalonID = $fetch['SalonID'];
        $update_Admin = mysqli_query($conn, "UPDATE `Admins` SET `Name`='$Name',`Username`='$NewUsername',`Phone`='$Phone' WHERE Username = '$Username'");
        $update_Salon = mysqli_query($conn, "UPDATE `Salons` SET `Address`='$Address' WHERE SalonID = '$fetch_SalonID'");
        echo json_encode("Success");
    }

} else {
    echo json_encode("Incorrect username");
}


$conn->close();
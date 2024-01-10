<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$ReqId = $_POST['ReqId'];
$Status = $_POST['Status'];



// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
    $fetch = mysqli_fetch_assoc($email_check);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role == ("SalonAdmin" || "SalonUser")) {
        $update_Service = mysqli_query($conn, "UPDATE `Requests` SET `Status`= '$Status'  WHERE `ReqId`= '$ReqId'");
        echo json_encode("Success");
    } else {
        echo json_encode("Unable To Access");
    }

} else {
    echo json_encode("Unable To Access");
}


$conn->close();
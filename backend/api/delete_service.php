<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$ServiceId = $_POST['ServiceId'];



// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
    $fetch = mysqli_fetch_assoc($email_check);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role == ("SalonAdmin" || "SalonUser")) {
        $delete_Service = mysqli_query($conn, "DELETE FROM `Services` WHERE serviceId = '$ServiceId'");
        echo json_encode("Success");
    } else {
        echo json_encode("Unable To Access");
    }

} else {
    echo json_encode("Unable To Access");
}


$conn->close();
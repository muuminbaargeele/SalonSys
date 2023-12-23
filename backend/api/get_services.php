<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$get_admin = mysqli_query($conn, "SELECT `AdID`, `Name`, `Username`, `Role`, `SalonID` FROM `Admins` WHERE `Username` = '$Username'");
$rows = array();
if (mysqli_num_rows($get_admin) > 0) {
    if ($get_admin) {
        $fetch = mysqli_fetch_assoc($get_admin);
        $role = $fetch['Role'];
        if ($role != 'MainAdmin') {
            $SalonID = $fetch['SalonID'];
            $get_Services = mysqli_query($conn, "SELECT se.serviceId, se.Title, se.SubTitle, se.CreateDT, se.ServiceImage, se.Price FROM `Services` se JOIN `Salons` s ON se.SalonID = s.SalonID WHERE s.SalonID = '$SalonID'");
            while ($fetch_Services = mysqli_fetch_assoc($get_Services)) {
                $rows[] = $fetch_Services;
            }
        } else {
            $rows = array("Unable To Access");
        }
    }
    print json_encode($rows);
} else {
    print json_encode("Unable To Access");
}


$conn->close();
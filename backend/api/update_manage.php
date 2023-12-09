<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$Name = $_POST['Name'];
$Phone = $_POST['Phone'];
$AdID = $_POST['AdID'];
$SalonName = '';
$Address = '';
$LastActivation = '';
$TodayDT = '';
$Amount = '';
$Status = '';
$SalonID = '';
$Shift = '';



// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$get_admin = mysqli_query($conn, "SELECT `AdID`, `Name`, `Username`, `Role`, `SalonID` FROM `Admins` WHERE `Username` = '$Username'");
$rows = array();
if (mysqli_num_rows($get_admin) > 0) {
    $fetch_admin = mysqli_fetch_assoc($get_admin);
    $role = $fetch_admin['Role'];
    if ($role == 'MainAdmin') {
        $SalonName = $_POST['SalonName'];
        $Address = $_POST['Address'];
        $LastActivation = $_POST['LastActivation'];
        $TodayDT = $_POST['TodayDT'];
        $Amount = $_POST['Amount'];
        $Status = $_POST['Status'];
        $SalonID = $_POST['SalonID'];
        $salon_check = mysqli_query($conn, "SELECT `SalonID`, `SalonName`, `Address`, `CreateDT`, `LastActivation`, `Amount`, `SalonLink`, `CustomerLink`, `Status`, DATEDIFF( DATE_FORMAT(DATE_ADD(LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), LastActivation ) - DATEDIFF(CURDATE(), LastActivation) AS Remaining FROM `Salons` WHERE SalonID != '$SalonID' AND SalonName = '$SalonName'");
        $fetch_salons = mysqli_fetch_assoc($salon_check);
        if (mysqli_num_rows($salon_check) > 0) {
            $rows = array("SalonName Already exists");
        } else {
            $salon_Activation_check = mysqli_query($conn, "SELECT `SalonID`, `SalonName`, `Address`, `CreateDT`, `LastActivation`, `Amount`, `SalonLink`, `CustomerLink`, `Status`, DATEDIFF( DATE_FORMAT(DATE_ADD(LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), LastActivation ) - DATEDIFF(CURDATE(), LastActivation) AS Remaining FROM `Salons` WHERE SalonID = '$SalonID'");
            $fetch_Activation_salons = mysqli_fetch_assoc($salon_Activation_check);
            $remaining = $fetch_Activation_salons['Remaining'];
            if ($remaining < 0 && $Status == 1) {
                $update_SalonAdmin = mysqli_query($conn, "UPDATE `Admins` SET `Name`='$Name',`Phone`='$Phone' WHERE `AdID`='$AdID'");
                $update_Salon = mysqli_query($conn, "UPDATE `Salons` SET `SalonName`='$SalonName',`Address`='$Address',`LastActivation`='$TodayDT',`Amount`='$Amount',`Status`='$Status' WHERE `SalonID`='$SalonID'");
            } else {
                $update_SalonAdmin = mysqli_query($conn, "UPDATE `Admins` SET `Name`='$Name',`Phone`='$Phone' WHERE `AdID`='$AdID'");
                $update_Salon = mysqli_query($conn, "UPDATE `Salons` SET `SalonName`='$SalonName',`Address`='$Address',`LastActivation`='$LastActivation',`Amount`='$Amount',`Status`='$Status' WHERE `SalonID`='$SalonID'");
            }


            if ($update_SalonAdmin && $update_Salon) {
                $rows = array("Success");
            } else {
                $rows = array("SalonAdmin And Salon Not Updated");
            }
        }

    } elseif ($role == "SalonAdmin") {
        $Shift = $_POST['Shift'];
        $update_SalonUser = mysqli_query($conn, "UPDATE `Admins` SET `Name`='$Name',`Phone`='$Phone',`Shift`='$Shift' WHERE `AdID`='$AdID'");
        if ($update_SalonUser) {
            $rows = array("Success");
        } else {
            $rows = array("SalonUSer Not Updated");
        }
    } else {
        $rows = array("Unable To Access");
    }
    echo json_encode($rows);
} else {
    echo json_encode("Unable To Access");
}


$conn->close();
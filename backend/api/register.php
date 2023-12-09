<?php

require_once('../config/conn.php');
$Name = $_POST['Name'];
$Username = $_POST['Username'];
$NewUsername = $_POST['NewUsername'];
$Pass = $_POST['Password'];
$Phone = $_POST['Phone'];
$CreateDT = $_POST['CreateDT'];
$Role = $_POST['Role'];
$SalonName = '';
$Address = '';
$Amount = '';
$Link = '';
$LoginLink = '';
$Shift = '';


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$NewUsername'");
$get_admin = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($username_check) > 0) {
    echo json_encode("Username Already exists");

} elseif (mysqli_num_rows($get_admin) > 0) {
    $fetch = mysqli_fetch_assoc($get_admin);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role == 'MainAdmin') {
        $SalonName = $_POST['SalonName'];
        $Address = $_POST['Address'];
        $Amount = $_POST['Amount'];
        $Link = $_POST['Link'];
        $LoginLink = $_POST['LoginLink'];
        $salon_check = mysqli_query($conn, "SELECT * FROM `Salons` WHERE SalonName = '$SalonName'");
        if (mysqli_num_rows($salon_check) > 0) {
            echo json_encode("SalonName Already exists");
        } else {
            $insertSalon = mysqli_query($conn, "INSERT INTO `Salons`(`SalonName`, `Address`, `CreateDT`, `LastActivation`, `Amount`, `Status`) VALUES ('$SalonName','$Address','$CreateDT','$CreateDT','$Amount','1')");
            if ($insertSalon) {
                $getSalonId = mysqli_query($conn, "SELECT `SalonID` FROM `Salons` WHERE `SalonName` = '$SalonName'");
                if ($getSalonId) {
                    $fetch = mysqli_fetch_assoc($getSalonId);
                    $SalonID = $fetch['SalonID'];
                    $hash = password_hash(
                        $Pass,
                        PASSWORD_DEFAULT
                    );
                    $SalonLink = $LoginLink . "?id=$SalonID";
                    $CustomerLink = $Link . "?id=$SalonID";
                    $insertLink = mysqli_query($conn, "UPDATE `Salons` SET `SalonLink`='$SalonLink',`CustomerLink`='$CustomerLink' WHERE `SalonID`='$SalonID'");
                    $insertOwner = mysqli_query($conn, "INSERT INTO `Admins`(`Name`, `Username`, `Password`, `Phone`, `CreateDT`, `Role`, `SalonID`) VALUES ('$Name','$NewUsername','$hash','$Phone','$CreateDT','$Role','$SalonID')");
                    if ($insertOwner) {
                        echo json_encode("Success");
                    } else {
                        echo json_encode("Owner Not Inserted");
                    }
                }
            } else {
                echo json_encode("Salon Not Inserted");
            }
        }
    } elseif ($fetch_Role == 'SalonAdmin') {
        $Shift = $_POST['Shift'];
        $fetch_SalonID = $fetch['SalonID'];
        $hash = password_hash(
            $Pass,
            PASSWORD_DEFAULT
        );
        $insertUser = mysqli_query($conn, "INSERT INTO `Admins`(`Name`, `Username`, `Password`, `Phone`, `CreateDT`, `Shift`, `Role`, `SalonID`) VALUES ('$Name','$NewUsername','$hash','$Phone','$CreateDT', '$Shift', '$Role','$fetch_SalonID')");
        if ($insertUser) {
            echo json_encode("Success");
        } else {
            echo json_encode("User Not Inserted");
        }
    } else {
        echo json_encode("Not Allowed");
    }
} else {
    echo json_encode("Unknown Admin Not Allowed");
}







$conn->close();
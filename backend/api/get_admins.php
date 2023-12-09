<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$get_admin = mysqli_query($conn, "SELECT `AdID`, `Name`, `Username`, `Role` FROM `Admins` WHERE `Username` = '$Username'");
$rows = array();
if ($get_admin) {
    $fetch = mysqli_fetch_assoc($get_admin);
    $role = $fetch['Role'];
    if ($role == 'MainAdmin') {
        $rows[] = $fetch;
    } elseif ($role == 'SalonAdminAdmin') {
        $get_SalonAdmin = mysqli_query($conn, "SELECT a.AdID, a.Name, a.Username, a.Phone, a.CreateDT, a.Role, s.SalonName, s.Address, CustomerLink FROM `Admins` a JOIN `Salons` s WHERE a.SalonID = s.SalonID AND a.Username = '$Username'");
        $fetch_SalanAdmin = mysqli_fetch_assoc($get_SalonAdmin);
        if ($get_SalonAdmin) {
            $rows[] = $fetch_SalanAdmin;
        }
    } else {
        $get_SalonAdmin = mysqli_query($conn, "SELECT a.AdID, a.Name, a.Username, a.Phone, a.CreateDT, a.Shift, a.Role, s.SalonName, s.Address, CustomerLink FROM `Admins` a JOIN `Salons` s WHERE a.SalonID = s.SalonID AND a.Username = '$Username'");
        $fetch_SalanAdmin = mysqli_fetch_assoc($get_SalonAdmin);
        if ($get_SalonAdmin) {
            $rows[] = $fetch_SalanAdmin;
        }
    }
}
print json_encode($rows);


$conn->close();
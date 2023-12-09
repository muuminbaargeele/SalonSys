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
    $fetch_admin = mysqli_fetch_assoc($get_admin);
    $role = $fetch_admin['Role'];
    if ($role == 'MainAdmin') {
        $get_SalonInfo = mysqli_query($conn, "SELECT DATEDIFF( DATE_FORMAT(DATE_ADD(s.LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), s.LastActivation ) - DATEDIFF(CURDATE(), s.LastActivation) AS Remaining, s.SalonID, s.SalonName, s.Amount, s.CreateDT, s.SalonLink, s.CustomerLink, s.LastActivation, s.Address, s.Status, a.AdID, a.Name, a.Phone FROM Salons as s JOIN Admins as a WHERE a.Role = 'SalonAdmin' AND s.SalonID = a.SalonID;");
        while ($fetch = mysqli_fetch_assoc($get_SalonInfo)) {
            $remaining = $fetch["Remaining"];
            $SalonName = $fetch["SalonName"];
            if ($remaining >= 0) {
                $rows[] = $fetch;
            } else {
                $get_expiredSalons = mysqli_query($conn, "SELECT `SalonID` FROM `Salons` WHERE DATEDIFF( DATE_FORMAT(DATE_ADD(LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), LastActivation ) - DATEDIFF(CURDATE(), LastActivation) <= 0 AND SalonName = '$SalonName'");
                $fetched_salonID = mysqli_fetch_assoc($get_expiredSalons);
                $expiredSalonsID = $fetched_salonID["SalonID"];
                $updateSalonStatus = mysqli_query($conn, "UPDATE `Salons` SET `Status` = 0 WHERE SalonID = '$expiredSalonsID'");
                $get_inActive_SalonInfo = mysqli_query($conn, "SELECT DATEDIFF( DATE_FORMAT(DATE_ADD(s.LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), s.LastActivation ) - DATEDIFF(CURDATE(), s.LastActivation) AS Remaining, s.SalonID, s.SalonName, s.Amount, s.CreateDT, s.SalonLink, s.CustomerLink, s.LastActivation, s.Address, s.Status, a.AdID, a.Name, a.Phone FROM Salons as s JOIN Admins as a WHERE a.Role = 'SalonAdmin' AND s.SalonID = a.SalonID  AND s.SalonID = '$expiredSalonsID';");
                $fetch_inActive = mysqli_fetch_assoc($get_inActive_SalonInfo);
                $rows[] = $fetch_inActive;
            }
        }
    } elseif ($role == "SalonAdmin") {
        $SalonID = $fetch_admin['SalonID'];
        $get_SalonUser = mysqli_query($conn, "SELECT `AdID`, `Name`, `Username`, `Phone`, `CreateDT`, `Role`, `Shift` FROM `Admins` WHERE Role = 'SalonUser' AND SalonID = '$SalonID'");
        while ($fetch = mysqli_fetch_assoc($get_SalonUser)) {
            $rows[] = $fetch;
        }
    } else {
        $rows[] = array("Unable To Access");
    }
    print json_encode($rows);
} else {
    echo json_encode("Unable To Access");
}


$conn->close();
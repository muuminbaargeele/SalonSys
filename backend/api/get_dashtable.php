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
    $SalonID = $fetch_admin['SalonID'];
    $role = $fetch_admin['Role'];
    if ($role == 'MainAdmin') {
        $get_SalonInfo = mysqli_query($conn, "SELECT DATEDIFF( DATE_FORMAT(DATE_ADD(s.LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), s.LastActivation ) - DATEDIFF(CURDATE(), s.LastActivation) AS Remaining, s.SalonName, s.Address, s.Status, a.Name, a.Phone FROM Salons as s JOIN Admins as a WHERE a.Role = 'SalonAdmin' AND s.SalonID = a.SalonID;");
        while ($fetch = mysqli_fetch_assoc($get_SalonInfo)) {
            $remaining = $fetch["Remaining"];
            if ($remaining >= 0) {
                $rows[] = $fetch;
            } else {
                $get_expiredSalons = mysqli_query($conn, "SELECT `SalonID` FROM `Salons` WHERE DATEDIFF( DATE_FORMAT(DATE_ADD(LastActivation, INTERVAL 1 MONTH), '%Y-%m-%d'), LastActivation ) - DATEDIFF(CURDATE(), LastActivation) <= 0");
                $fetched_salonID = mysqli_fetch_assoc($get_expiredSalons);
                $expiredSalonsID = $fetched_salonID["SalonID"];
                $updateSalonStatus = mysqli_query($conn, "UPDATE `Salons` SET `Status` = 0 WHERE SalonID = '$expiredSalonsID'");
            }
        }
    } else {
        $get_SalonUser = mysqli_query($conn, "SELECT r.ReqId, c.CustomerName, c.CustomerPhone, se.Title, se.SubTitle, se.Price, se.ServiceImage, r.QueNO, r.ArrivalTime, r.Status FROM `Requests` as r JOIN `Customers` as c ON r.CusID = c.CusID JOIN `Services` as se ON r.ServiceID = se.serviceId JOIN `Salons` as s ON s.SalonID = se.SalonID JOIN Admins as a ON s.SalonID = a.SalonID WHERE a.SalonID = '$SalonID' AND a.Username = '$Username'");

        $rows = array();
        while ($fetch = mysqli_fetch_assoc($get_SalonUser)) {
            // Format the price as a string with a dollar sign
            $fetch['Price'] = '$' . number_format($fetch['Price'], 2); // Formats the price as $X.XX

            // Add the formatted fetch array to your rows
            $rows[] = $fetch;
        }

        // Now $rows contains all the formatted data

    }
    print json_encode($rows);
} else {
    echo json_encode("Incorrect username");
}


$conn->close();
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
            $SalonID = $fetch['SalonID'];  // Assuming $fetch['SalonID'] is previously defined and contains the correct SalonID

            $get_Services = mysqli_query($conn, "SELECT se.serviceId, se.Title, se.SubTitle, se.CreateDT, se.ServiceImage, se.Price FROM `Services` se JOIN `Salons` s ON se.SalonID = s.SalonID WHERE s.SalonID = '$SalonID'");

            $rows = array();
            while ($fetch_Services = mysqli_fetch_assoc($get_Services)) {
                // Format the price as a string with a dollar sign and two decimal places
                $fetch_Services['Price'] = '$' . number_format((float) $fetch_Services['Price'], 2);

                // Add the formatted fetch_Services array to your rows
                $rows[] = $fetch_Services;
            }

            // Now $rows contains all the data including formatted Prices

        } else {
            $rows = array("Unable To Access");
        }
    }
    print json_encode($rows);
} else {
    print json_encode("Unable To Access");
}


$conn->close();
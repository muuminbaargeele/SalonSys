<?php

require_once('../config/conn.php');

// Check if SalonID is set in POST data
if (isset($_POST['SalonID'])) {
    $SalonID = $_POST['SalonID'];

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $checkSalon = mysqli_query($conn, "SELECT * FROM `Salons` WHERE SalonID = '$SalonID'");

    if (mysqli_num_rows($checkSalon) > 0) {
        $get_Services = mysqli_query($conn, "SELECT s.SalonName, s.SalonImage, se.serviceId, se.Title, se.SubTitle, se.Price, se.ServiceImage 
        FROM `Services` se
        JOIN `Salons` s ON se.SalonID = s.SalonID
        WHERE s.SalonID = '$SalonID'");

        $rows = array();

        if ($get_Services) {
            if (mysqli_num_rows($get_Services) > 0) {
                while ($fetch_Services = mysqli_fetch_assoc($get_Services)) {
                    $rows[] = $fetch_Services;
                }
            } else {
                // If no services found, fetch salon name
                $get_Salon = mysqli_query($conn, "SELECT SalonName, SalonImage FROM `Salons` WHERE SalonID = '$SalonID'");

                if ($get_Salon) {
                    $rows[] = mysqli_fetch_assoc($get_Salon);
                } else {
                    // Handle the case where fetching salon name fails
                    $rows[] = array('error' => 'Unable to fetch salon details');
                }
            }
        } else {
            // Handle the case where fetching services fails
            $rows[] = array('error' => 'Unable to fetch services');
        }
    } else {
        $rows[] = array("Salon Not Found");
    }




    echo json_encode($rows);

    $conn->close();
} else {
    echo json_encode(array('error' => 'SalonID is not set in POST data'));
}

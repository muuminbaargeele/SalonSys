<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$targetDirectory = '../logo_images/'; // Replace with your desired directory


$get_admin = mysqli_query($conn, "SELECT `AdID`, `Name`, `Username`, `Role`, `SalonID` FROM `Admins` WHERE `Username` = '$Username'");
$rows = array();
if (mysqli_num_rows($get_admin) > 0) {
    $fetch = mysqli_fetch_assoc($get_admin);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role == ("SalonAdmin" || "SalonUser")) {
        $fetch_SalonID = $fetch['SalonID'];
    if (!empty($_FILES['image']['name'])) {
        $imageName = basename($_FILES['image']['name']); // Get the basename of the file
        $targetFile = $targetDirectory . $imageName; // Set the target file path

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            echo 'File uploaded successfully.';

            // Prepare an INSERT statement
            $stmt = mysqli_query($conn, "UPDATE `Salons` SET `SalonImage`='$imageName' WHERE SalonID = '$fetch_SalonID'");

            // Execute the query
            if ($stmt) {
                echo 'Image name inserted into database successfully.';
            } else {
                echo 'Failed to insert image name into database.';
            }

            // Close statement
            $stmt->close();
        } else {
            echo 'Failed to upload file.';
        }
    } else {
        echo 'No file selected.';
    }} else {
        echo json_encode("Unable To Access main admin");
    }
} else {
    print json_encode("Unable To Access");
}
?>
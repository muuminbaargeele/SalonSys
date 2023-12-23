<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$Title = $_POST['Title'];
$SubTitle = $_POST['SubTitle'];
$Price = $_POST['Price'];
$CreateDT = $_POST['CreateDT'];
$targetDirectory = '../service_images/'; // Replace with your desired directory



// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
    $fetch = mysqli_fetch_assoc($email_check);
    $fetch_Role = $fetch['Role'];
    if ($fetch_Role == ("SalonAdmin" || "SalonUser")) {
        $fetch_SalonID = $fetch['SalonID'];
        $get_Services = mysqli_query($conn, "SELECT se.serviceId, se.Title, se.SubTitle, se.CreateDT, se.Price FROM `Services` se JOIN `Salons` s ON se.SalonID = s.SalonID WHERE s.SalonID = '$fetch_SalonID'");
        $fetch_SubTitle = '';
        if (mysqli_num_rows($get_Services) > 0) {
            $fetch_Services = mysqli_fetch_assoc($get_Services);
            $fetch_SubTitle = $fetch_Services["SubTitle"];
        }
        if ($SubTitle == $fetch_SubTitle) {
            echo json_encode("SubTitle Alredy Exits");
        } else {
            if (!empty($_FILES['image']['name'])) {
                $targetFile = $targetDirectory . basename($_FILES['image']['name']);
                $imageName = basename($_FILES['image']['name']); // Get the basename of the file

                if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $upload_Service = mysqli_query($conn, "INSERT INTO `Services`(`Title`, `SubTitle`, `CreateDT`, `ServiceImage`, `Price`, `SalonID`) VALUES ('$Title','$SubTitle','$CreateDT','$imageName','$Price','$fetch_SalonID')");
                    echo json_encode("Success");
                } else {
                    echo 'Failed to upload file.';
                }
            } else {
                echo 'No file selected.';
            }
        }

    } else {
        echo json_encode("Unable To Access");
    }

} else {
    echo json_encode("Unable To Access");
}


$conn->close();
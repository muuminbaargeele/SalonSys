<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$Pass = $_POST['Password'];
$new_Pass = $_POST['NewPass'];


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
    $fetch = mysqli_fetch_assoc($email_check);
    $fetch_pass = $fetch['Password'];
    $rows = array();
    $verify = password_verify($Pass, $fetch_pass);
    if ($verify) {
        $hash = password_hash(
            $new_Pass,
            PASSWORD_DEFAULT
        );
        $update_Pass = mysqli_query($conn, "UPDATE `Admins` SET `Password`='$hash' WHERE Username = '$Username'");
        $rows = array("Success");
        echo json_encode($rows);
    } else {
        print json_encode("Incorrect password");
    }

} else {
    print json_encode("Incorrect username");
}


$conn->close();
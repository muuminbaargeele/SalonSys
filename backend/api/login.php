<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];
$Pass = $_POST['Password'];


// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$email_check = mysqli_query($conn, "SELECT * FROM `Admins` WHERE Username = '$Username'");
if (mysqli_num_rows($email_check) > 0) {
  $fetch = mysqli_fetch_assoc($email_check);
  $fetch_pass = $fetch['Password'];
  $fetch_role = $fetch['Role'];
  $rows = array();
  $verify = password_verify($Pass, $fetch_pass);
  if ($verify) {
    if ($fetch_role != "MainAdmin") {
      $active_check = mysqli_query($conn, "SELECT * FROM `Admins` JOIN `Salons` WHERE Salons.Status = 1 AND Username = '$Username'");
      if (mysqli_num_rows($active_check) > 0) {
        $rows = array("Success", $fetch_role);
        echo json_encode($rows);
      } else {
        $rows = array("You Are In Active");
      echo json_encode($rows);
      }

    } else {
      $rows = array("Success", $fetch_role);
      echo json_encode($rows);
    }

  } else {
    print json_encode("Incorrect password");
  }

} else {
  print json_encode("Incorrect username");
}


$conn->close();
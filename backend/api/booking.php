<?php

require_once('../config/conn.php');

$CustomerName = '';
$CustomerPhone = $_POST['CustomerPhone'];
$CreateDT = $_POST['CreateDT'];
$ServiceID = $_POST['ServiceID'];

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$rows = array();

$getCus = mysqli_query($conn, "SELECT `CusID`, `CustomerName`, `CustomerPhone`, `CreateDT` FROM `Customers` WHERE CustomerPhone = '$CustomerPhone' ");
if (mysqli_num_rows($getCus) > 0) {
    $fetch_Cus = mysqli_fetch_assoc($getCus);
    $fetch_cu_id = $fetch_Cus["CusID"];
    $insert_req = mysqli_query($conn, "INSERT INTO `Requests`(`ServiceID`, `CusID`, `DT`, `ArrivalTime`, `Status`) VALUES ('$ServiceID','$fetch_cu_id','$CreateDT', null,0)");
    if ($insert_req) {
        $rows = array("Success");
    } else {
        $rows = array("failed");
    }

} else {
    $CustomerName = $_POST['CustomerName'];
    $inser_Cus = mysqli_query($conn, "INSERT INTO `Customers`(`CustomerName`, `CustomerPhone`, `CreateDT`) VALUES ('$CustomerName','$CustomerPhone','$CreateDT')");
    $getCus = mysqli_query($conn, "SELECT `CusID`, `CustomerName`, `CustomerPhone`, `CreateDT` FROM `Customers` WHERE CustomerPhone = '$CustomerPhone' ");
    $fetch_Cus = mysqli_fetch_assoc($getCus);
    $fetch_cu_id = $fetch_Cus["CusID"];
    $insert_req = mysqli_query($conn, "INSERT INTO `Requests`(`ServiceID`, `CusID`, `DT`, `ArrivalTime`, `Status`) VALUES ('$ServiceID','$fetch_cu_id','$CreateDT', null,0)");
    if ($insert_req) {
        $rows = array("Success");
    } else {
        $rows = array("failed");
    }
}


echo json_encode($rows);

$conn->close();


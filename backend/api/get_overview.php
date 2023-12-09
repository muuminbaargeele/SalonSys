<?php

require_once('../config/conn.php');
$Username = $_POST['Username'];

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$get_admin = mysqli_query($conn, "SELECT `Role`, `SalonID` FROM `Admins` WHERE `Username` = '$Username'");

if (mysqli_num_rows($get_admin) > 0) {
    $fetch_admin = mysqli_fetch_assoc($get_admin);
    $role = $fetch_admin['Role'];
    if ($role == 'MainAdmin') {
        $admin_overView = mysqli_multi_query($conn, "
        SELECT COUNT(SalonID) as TotalSalons, SUM(Amount) as TotalAmount FROM `Salons`;
        SELECT COUNT(SalonID) as RecentSalons FROM `Salons`WHERE CreateDT BETWEEN DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 1 MONTH) + INTERVAL 1 DAY AND LAST_DAY(CURDATE());
        SELECT COUNT(SalonID) as ActiveSalons FROM `Salons` WHERE Status = 1; 
        SELECT COUNT(SalonID) as inActiveSalons FROM `Salons` WHERE Status = 0;
        SELECT COUNT(ReqId) as TotalRequests FROM `Requests`;
        ");

        if ($admin_overView) {
            $rows = array();

            do {
                if ($result = mysqli_store_result($conn)) {
                    $fetch = mysqli_fetch_assoc($result);
                    $rows[] = $fetch;
                    mysqli_free_result($result);
                }
            } while (mysqli_more_results($conn) && mysqli_next_result($conn));

            print json_encode($rows);
        } else {
            $rows = array("Query execution failed: " . mysqli_error($conn));
            print json_encode($rows);
        }
    } else {
        $SalonID = $fetch_admin["SalonID"];
        $salon_overView = mysqli_query($conn, "SELECT 
        COUNT(DISTINCT c.CusID) AS TotalCustomers,
        COUNT(r.ReqId) AS TotalRequests,
        COUNT(CASE WHEN r.Status = 0 THEN 1 ELSE NULL END) AS Pending,
        COUNT(DISTINCT CASE WHEN c.CreateDT BETWEEN DATE_SUB(LAST_DAY(CURDATE()), INTERVAL 1 MONTH) + INTERVAL 1 DAY AND LAST_DAY(CURDATE()) THEN c.CusID ELSE NULL END) AS RecentCustomers,
        COALESCE(SUM(IFNULL(CASE WHEN r.Status = 2 THEN se.Price ELSE 0 END, 0)), 0) AS TotalPrice,
        COUNT(se.serviceId) AS Services
    FROM 
        `Customers` AS c
    JOIN 
        `Requests` AS r ON c.CusID = r.CusID
    JOIN 
        `Services` AS se ON r.ServiceID = se.ServiceID
    JOIN 
        `Salons` AS s ON se.SalonID = s.SalonID
    WHERE 
        s.SalonID = '$SalonID';
    ");
        $fetch = mysqli_fetch_assoc($salon_overView);
        $rows[] = $fetch;
        print json_encode($rows);
    }
} else {
    $rows = array("Incorrect username");
    print json_encode($rows);
}

$conn->close();
?>
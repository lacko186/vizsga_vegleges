<?php
header('Content-Type: application/json');

// Kapcsolódás az adatbázishoz
$servername = "localhost"; // Adatbázis kiszolgáló
$username = "root";        // Felhasználónév
$password = "";            // Jelszó
$dbname = "jaratok"; // Adatbázis neve

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name FROM jarat";
$result = $conn->query($sql);

$locations = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }
}

echo json_encode($locations);

$conn->close();
?>

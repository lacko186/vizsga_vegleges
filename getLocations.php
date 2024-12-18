<?php
header('Content-Type: application/json');

// Kapcsolódás az adatbázishoz
$servername = "localhost"; // Adatbázis kiszolgáló
$username = "root";        // Felhasználónév
$password = "";            // Jelszó
$dbname = "megallok"; // Adatbázis neve

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Lekérdezés a helyek adatainak lekérésére
$sql = "SELECT name, lat, lng FROM kezdo_vegpont_nev";
$result = $conn->query($sql);

$locations = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }
}

// JSON formátumban válasz küldése
echo json_encode($locations);

$conn->close();
?>

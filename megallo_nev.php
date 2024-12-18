<?php
header('Content-Type: application/json');

// Kapcsolódás az adatbázishoz
$servername = "localhost"; // Adatbázis kiszolgáló
$username = "root";        // Felhasználónév
$password = "";            // Jelszó
$dbname = "jarat"; // Adatbázis neve

// Kapcsolat létrehozása
$conn = new mysqli($servername, $username, $password, $dbname);

// Kapcsolat ellenőrzése
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL lekérdezés a jarat tábla megallo oszlopából
$sql = "SELECT megallo FROM jarat";
$result = $conn->query($sql);

// Eredmények tárolása
$locations = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $locations[] = $row['megallo']; // A 'megallo' kulcsot hozzárendeljük az értékhez
    }
}

// Az eredmények JSON kódolása és visszaküldése
echo json_encode($locations);

// Kapcsolat lezárása
$conn->close();
?>

<?php
session_start();
require_once 'config.php';

// Debug információ
error_log("Session tartalma: " . print_r($_SESSION, true));

// Ellenőrizzük, hogy a felhasználó be van-e jelentkezve
if (!isset($_SESSION['user_id'])) {
    error_log("Nincs bejelentkezve, átirányítás a login.php-ra");
    header("Location: login.php");
    exit();
}

?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Vezérlőpult</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            background-color: #f4f6f9;
        }
    </style>
</head>
<body class="antialiased">
    <div class="min-h-screen flex">
        <!-- Oldalsáv -->
        <div class="w-64 bg-gray-800 text-white p-4">
            <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul>
                    <li class="mb-2">
                        <a href="#dashboard" class="hover:bg-gray-700 px-3 py-2 rounded block">
                            🏠 Irányítópult
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="#maps" class="hover:bg-gray-700 px-3 py-2 rounded block">
                            🗺️ Térképkezelés
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="#stops" class="hover:bg-gray-700 px-3 py-2 rounded block">
                            🚏 Megállók
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="#schedule" class="hover:bg-gray-700 px-3 py-2 rounded block">
                            📅 Menetrendek
                        </a>
                    </li>
                    <li class="mb-2">
                        <a href="#tickets" class="hover:bg-gray-700 px-3 py-2 rounded block">
                            🎫 Jegykezelés
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="absolute bottom-0 left-0 w-64 p-4">
                <a href="?action=logout" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full block text-center">
                    Kijelentkezés
                </a>
            </div>
        </div>

        <!-- Fő tartalom -->
        <div class="flex-1 p-10 bg-gray-100">
            <div class="grid grid-cols-3 gap-6">
                <!-- Statisztika kártyák -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">🚏 Megállók</h3>
                    <p class="text-3xl font-bold">42</p>
                    <p class="text-sm text-gray-500">Aktív megállók</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">🚌 Járatok</h3>
                    <p class="text-3xl font-bold">18</p>
                    <p class="text-sm text-gray-500">Aktív járatok</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-lg font-semibold mb-4">🎫 Jegyek</h3>
                    <p class="text-3xl font-bold">1,256</p>
                    <p class="text-sm text-gray-500">Eladott jegyek</p>
                </div>
            </div>

            <!-- Térkép koordináta bevitel -->
            <div class="mt-8 bg-white p-6 rounded-lg shadow">
                <h3 class="text-lg font-semibold mb-4">Koordináta Hozzáadás</h3>
                <form class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block mb-2">Szélesség (Latitude)</label>
                        <input type="text" placeholder="pl. 46.234324" 
                               class="w-full px-3 py-2 border rounded">
                    </div>
                    <div>
                        <label class="block mb-2">Hosszúság (Longitude)</label>
                        <input type="text" placeholder="pl. 17.324322" 
                               class="w-full px-3 py-2 border rounded">
                    </div>
                    <div class="col-span-2">
                        <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Koordináta mentése
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Egyszerű oldalnavigáció
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Itt később hozzáadhatóak az oldal dinamikus váltásai
                alert('Kiválasztott menüpont: ' + e.target.textContent);
            });
        });
    </script>
</body>
</html>
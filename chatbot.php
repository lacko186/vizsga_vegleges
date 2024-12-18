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
    <title>Kaposvár Intelligens Közlekedési Asszisztens</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            font-family: 'Poppins', sans-serif;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center">
    <div class="container mx-auto px-4 py-8 max-w-2xl w-full">
        <div class="bg-white shadow-2xl rounded-2xl overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6">
                <h1 class="text-3xl font-bold">Kaposvár Közlekedési Segítő</h1>
                <p class="text-sm opacity-75">Intelligens Útitárs</p>
            </div>
            
            <div id="suggestion-container" class="p-4 bg-gray-100 flex flex-wrap gap-2">
                <button class="suggestion-btn bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                    Menetrendek
                </button>
                <button class="suggestion-btn bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                    Jegyárak
                </button>
                <button class="suggestion-btn bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                    Útvonalak
                </button>
                <button class="suggestion-btn bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                    Kedvezmények
                </button>
                <button class="suggestion-btn bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200">
                    Átszállások
                </button>
            </div>
            
            <div id="chat-container" class="p-4 h-[500px] overflow-y-auto bg-gray-50">
                <div class="text-center text-gray-500 py-4">
                    Üdvözöljük! Válasszon egy témát, vagy írjon be egy kérdést a kaposvári közlekedésről.
                </div>
            </div>
            
            <div class="border-t bg-white p-4 flex items-center space-x-2">
                <input 
                    type="text" 
                    id="user-input" 
                    placeholder="Írjon be egy kérdést a tömegközlekedésről..." 
                    class="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                <button 
                    id="send-btn" 
                    class="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Küldés
                </button>
            </div>
        </div>
    </div>

    <script>
        const aiResponses = {
            'menetrendek': [
                {
                    keywords: ['menetrend', 'járat', 'busz', 'villamos', 'közlekedés'],
                    title: 'Kaposvár Tömegközlekedési Menetrendje',
                    content: 'Részletes információk a helyi járatokról:',
                    details: [
                        '1-es busz: Belváros - Zselic lakótelep (Üzemidő: 05:00-22:00)',
                        '2-es busz: Kaposvári Egyetem - Búzavirág utca (Üzemidő: 06:00-21:00)',
                        '3-as busz: Kishíd utca - Sportcsarnok (Üzemidő: 05:30-21:30)',
                        '4-es busz: Déli ipartelep - Keleti lakótelep (Üzemidő: 05:00-22:00)',
                        'Villamosok: 1-es és 2-es vonal a város központi részén (Üzemidő: 05:30-21:30)'
                    ],
                    additional: 'Pontos menetrendekért látogassa meg a helyi közlekedési vállalat weboldalát.'
                }
            ],
            'jegyárak': [
                {
                    keywords: ['jegy', 'bérlet', 'ár', 'viteldíj', 'kedvezmény'],
                    title: 'Kaposvár Tömegközlekedési Jegyárak',
                    content: 'Aktuális árak és bérlettípusok:',
                    details: [
                        'Egyszeri utazási jegy: 450 Ft',
                        'Diák havi bérlet: 3200 Ft (50% kedvezmény)',
                        'Felnőtt havi bérlet: 9500 Ft',
                        'Nyugdíjas havi bérlet: 4800 Ft (90% kedvezmény)',
                        '24 órás napijegy: 1200 Ft',
                        'Kerékpár szállítási díj: 200 Ft/alkalom'
                    ],
                    additional: 'A jegyárak 2024. januári állapot szerint érvényesek.'
                }
            ],
            'útvonalak': [
                {
                    keywords: ['útvonal', 'megálló', 'végállomás', 'csomópont'],
                    title: 'Kaposvár Fő Közlekedési Útvonalai',
                    content: 'Legfontosabb közlekedési csomópontok:',
                    details: [
                        'Autóbusz-pályaudvar: Fő utca 45. (Központi csomópont)',
                        'Vasútállomás: Bajcsy-Zsilinszky utca',
                        'Kiemelt megállók: Megyeháza, Kaposvári Egyetem, Kórház',
                        'Fő átszállási pontok: Fő téri csomópont, Autóbusz-pályaudvar',
                        'Érintett főbb utcák: Fő utca, Bajcsy-Zsilinszky utca, Áchim András utca'
                    ],
                    additional: 'Valós idejű útvonaltervezésért javasoljuk a helyi közlekedési alkalmazást.'
                }
            ],
            'kedvezmények': [
                {
                    keywords: ['kedvezmény', 'ingyenes', 'támogatás', 'utazás'],
                    title: 'Utazási Kedvezmények Kaposvárott',
                    content: 'Elérhető kedvezmények a helyi tömegközlekedésben:',
                    details: [
                        'Diákok: 50% kedvezmény (nappali tagozatos, 26 év alatt)',
                        'Nyugdíjasok: 90% kedvezmény (62 év felett)',
                        'Nagycsaládosok: ingyenes utazás (3 vagy több gyermek)',
                        'Fogyatékkal élők: ingyenes utazás (érvényes igazolvány alapján)',
                        'Pedagógusigazolvány: 50% kedvezmény',
                        'Rendszeres szociális támogatásban részesülők: ingyenes utazás'
                    ],
                    additional: 'A kedvezmények igénybevételéhez megfelelő igazolás szükséges.'
                }
            ],
            'átszállások': [
                {
                    keywords: ['átszállás', 'átszálló', 'csere', 'kapcsolat'],
                    title: 'Átszállási Lehetőségek Kaposvárott',
                    content: 'Fontos tudnivalók az átszállásokról:',
                    details: [
                        'Ingyenes átszállás: Minden jegy egyszeri átszállásra jogosít',
                        'Átszállási idő: 60 perc az első felszállástól',
                        'Fő átszállási csomópontok: Autóbusz-pályaudvar, Fő téri csomópont',
                        'Villamos-busz átszállás: Megyeháza megálló',
                        'Vasút-busz átszállás: Vasútállomás környéke'
                    ],
                    additional: 'Javasoljuk, hogy mindig ellenőrizze a pontos átszállási lehetőségeket.'
                }
            ]
        };

        const chatContainer = document.getElementById('chat-container');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const suggestionContainer = document.getElementById('suggestion-container');

        function addMessage(message, type) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('mb-4');
            messageDiv.classList.add(type === 'user' ? 'text-right' : 'text-left');
            
            messageDiv.innerHTML = `
                <div class="inline-block max-w-[80%] p-3 rounded-xl ${
                    type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-black'
                }">
                    ${message}
                </div>
            `;
            
            chatContainer.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function getAIResponse(userMessage) {
            const lowercaseMessage = userMessage.toLowerCase();

            for (let category in aiResponses) {
                for (let response of aiResponses[category]) {
                    if (response.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
                        return `
                            <strong>${response.title}</strong><br>
                            ${response.content}<br>
                            ${response.details.map(detail => `• ${detail}`).join('<br>')}<br>
                            <em>${response.additional}</em>
                        `;
                    }
                }
            }
            
            return 'Sajnos nem találtam egyértelmű választ a kérdésére. Próbálja meg újrafogalmazni, vagy használja a javasolt témákat.';
        }

        function handleSendMessage() {
            const message = userInput.value.trim();
            
            if (message) {
                addMessage(message, 'user');
                const aiResponse = getAIResponse(message);
                
                setTimeout(() => {
                    addMessage(aiResponse, 'ai');
                }, 500);
                
                userInput.value = '';
            }
        }

        // Suggestion buttons
        document.querySelectorAll('.suggestion-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                userInput.value = btn.textContent.trim();
                handleSendMessage();
            });
        });

        sendBtn.addEventListener('click', handleSendMessage);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    </script>
</body>
</html>
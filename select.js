<script>
const busStations = [
    "Kaposvár helyi autóbusz állomás", 
    "Kaposvár Berzsenyi utca felüljáró", 
    "Kaposvár Berzsenyi utca 30.", 
    "Kaposvár Ballakúti utca", 
    "Kaposvár Lonkahegy forduló", 
    "Kaposvár Nyár", 
    "Kaposvár Berzsenyi utca felüljáró", 
    "Kaposvár Jókai liget", 
    "Kaposvár Szigetvári utca 6.", 
    "Kaposvár Szigetvári utca 62.", 
    "Kaposvár Szigetvári utca 139.", 
    "Kaposvár Kaposfüred vá.", 
    "Kaposvár Bersenyi utca 30.", 
    "Kaposvár Füredi utca csomópont", 
    "Kaposvár Toldi lakónegyed", 
    "Kaposvár Kinizsi lakótelep", 
    "Kaposvár Búzavirág utca", 
    "Kaposvár Laktanya", 
    "Kaposvár Volán-telep", 
    "Kaposvár Kaposfüredi utca 12.", 
    "Kaposvár Kaposfüredi utca 104.", 
    "Kaposvár Kaposfüred központ", 
    "Kaposvár Állomás utca", 
    "Kaposvár Kaposfüredi utca 244.", 
    "Kaposvár Kaposfüred forduló", 
    "Kaposvár Városi könyvtár", 
    "Kaposvár Vasútköz", 
    "Kaposvár Raktár utca forduló", 
    "Kaposvár Mátyás király utca forduló", 
    "Kaposvár Egyenesi utca forduló", 
    "Kaposvár Koppány vezér utca forduló", 
    "Kaposvár Töröcske forduló", 
    "Kaposvár Béla király utca forduló", 
    "Kaposvár Kaposszentjakab forduló", 
    "Kaposvár Toponár forduló", 
    "Kaposvár NABI forduló", 
    "Kaposvár Kaposvári Egyetem", 
    "Kaposvár Videoton", 
    "Kaposvár Buzsáki utca", 
    "Kaposvár Aranytér", 
    "Kaposvár Sopron utca forduló", 
    "Kaposvár Tóth Árpád utca", 
    "Kaposvár Kométa forduló", 
    "Kaposvár 67-es számú út", 
    "Kaposvár Rózsa utca", 
    "Kaposvár Erdősor utca", 
    "Kaposvár Gönczi Ferenc utca", 
    "Kaposvár Városi Fürdő", 
    "Kaposvár Hajnóczy utca csomópont", 
    "Kaposvár Jutai utca 24.", 
    "Kaposvár Jutai utca 45.", 
    "Kaposvár Raktár utca 2.", 
    "Kaposvár Kecelhegyalja utca 6.", 
    "Kaposvár Kőrösi Csoma Sándor utca 109.", 
    "Kaposvár Kecelhegyi iskola", 
    "Kaposvár Kőrösi Csoma Sándor utca 45.", 
    "Kaposvár Kenese tér", 
    "Kaposvár Eger utca", 
    "Kaposvár Kapoli Ádám utca", 
    "Kaposvár Egyenesi utca 42.", 
    "Kaposvár Beszédes József utca", 
    "Kaposvár Állatkorház", 
    "Kaposvár Kölcsey utca", 
    "Kaposvár Tompa Mihály utca", 
    "Kaposvár Vasútállomás", 
    "Kaposvár Baross Gábor utca", 
    "Kaposvár Csalogány utca", 
    "Kaposvár Vikár Béla utca", 
    "Kaposvár Fő utca 48.", 
    "Kaposvár Fő utca 37-39.", 
    "Kaposvár Hársfa utca", 
    "Kaposvár Hősök temploma", 
    "Kaposvár Gyár utca", 
    "Kaposvár Pécsi úti iskola", 
    "Kaposvár Nádasdi utca", 
    "Kaposvár Móricz Zsigmond utca", 
    "Kaposvár Pécsi utca 227.", 
    "Kaposvár Várhegy feljáró", 
    "Kaposvár Nap utca", 
    "Kaposvár Hold utca", 
    "Kaposvár Magyar Nobel-díjasok tere", 
    "Kaposvár Bartók Béla utca", 
    "Kaposvár Táncsics Mihály utca", 
    "Kaposvár Zichy Miklós utca", 
    "Kaposvár Aranyeső utca", 
    "Kaposvár Jókai utca", 
    "Kaposvár Szegfű utca", 
    "Kaposvár Gyertyános", 
    "Kaposvár Kertbarát felső", 
    "Kaposvár Kertbarát alsó", 
    "Kaposvár Szőlőhegy", 
    "Kaposvár Fenyves utca 37/A", 
    "Kaposvár Fenyves utca 31", 
    "Kaposvár Kórház célgazdaság", 
    "Kaposvár Fenyves utca 63.", 
    "Kaposvár Mező utca csomópont", 
    "Kaposvár Izzó utca", 
    "Kaposvár Guba Sándor utca 81.", 
    "Kaposvár Guba Sándor utca 57.", 
    "Kaposvár Villamossági Gyár", 
    "Kaposvár Toponár posta", 
    "Kaposvár Toponár Orci elágazás", 
    "Kaposvár Toponári utca 182.", 
    "Kaposvár Toponári utca 238.", 
    "Kaposvár Erdei Ferenc utca", 
    "Kaposvár Szabó Pál utca", 
    "Kaposvár Orci út 14.", 
    "Kaposvár Répáspuszta", 
    "Kaposvár Kenyérgyár utca 1.", 
    "Kaposvár Kenyérgyár utca 3.", 
    "Kaposvár Dombóvári utca 4.", 
    "Kaposvár Kaposvári Egyetem forduló", 
    "Kaposvár Virág utca", 
    "Kaposvár Pázmány Péter utca", 
    "Kaposvár Vöröstelek utca", 
    "Kaposvár Hegyi utca", 
    "Kaposvár Tallián Gyula utca 4.", 
    "Kaposvár Kórház", 
    "Kaposvár Tallián Gyula utca 56.", 
    "Kaposvár Tallián Gyula utca 82.", 
    "Kaposvár ÁNTSZ", 
    "Kaposvár Rendőrség", 
    "Kaposvár Szent Imre utca 29.", 
    "Kaposvár Szent Imre utca 13.", 
    "Kaposvár Széchenyi tér", 
    "Kaposvár Zárda utca", 
    "Kaposvár Honvéd utca", 
    "Kaposvár Arany János tér", 
    "Kaposvár Losonc-köz", 
    "Kaposvár Brassó utca", 
    "Kaposvár Nagyszeben utca", 
    "Kaposvár Somssich Pál utca", 
    "Kaposvár Pázmány Péter utca", 
    "Kaposvár Kisgát", 
    "Kaposvár Arany János utca", 
    
];

// Legördülő listák inicializálása
function initializeDropdowns() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    // A listák törlése az újratöltés előtt
    startSelect.innerHTML = '';
    endSelect.innerHTML = '';
    
    // Opciók hozzáadása mindkét legördülő listához
    busStations.forEach(station => {
        // Kezdő állomás select
        const startOption = new Option(station, station);
        startSelect.add(startOption);
        
        // Végállomás select
        const endOption = new Option(station, station);
        endSelect.add(endOption);
    });
}

// Állomások felcserélése
function switchStations() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    // Csak akkor cseréljük fel, ha a két állomás különbözik
    const tempValue = startSelect.value;
    if (startSelect.value !== endSelect.value) {
        // Felcseréljük a kiválasztott értékeket
        startSelect.value = endSelect.value;
        endSelect.value = tempValue;

        // Kiválasztott opciók frissítése
        updateDropdowns(startSelect, endSelect);
    }
}

// Frissíti a legördülők kiválasztott értékeit
function updateDropdowns(startSelect, endSelect) {
    // A kiválasztott opciók átállítása
    const startSelectedOption = startSelect.querySelector(`option[value="${startSelect.value}"]`);
    const endSelectedOption = endSelect.querySelector(`option[value="${endSelect.value}"]`);
    
    // Ha a kiválasztott opciók léteznek, akkor frissítjük a kiválasztott állapotot
    if (startSelectedOption) startSelectedOption.selected = true;
    if (endSelectedOption) endSelectedOption.selected = true;
}


// Event listener a switch gombhoz
document.getElementById('switchBtn').addEventListener('click', switchStations);

// Oldal betöltésekor inicializáljuk a legördülő listákat
document.addEventListener('DOMContentLoaded', initializeDropdowns);

// Segédfüggvény a kiválasztott állomások validálására
function validateSelection() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    if (startSelect.value === endSelect.value) {
        alert('A kezdő és végállomás nem lehet ugyanaz!');
        return false;
    }
    return true;
}

// Form submit kezelése
document.querySelector('form').addEventListener('submit', function(e) {
    if (!validateSelection()) {
        e.preventDefault();
    }
});


function updateSchedule(result) {
    const scheduleBody = document.getElementById("schedule-body");
    scheduleBody.innerHTML = ''; // Ürítjük a meglévő menetrendet

    const statusOptions = [
        { text: "Pontosan érkezik", class: "on-time" },
        { text: "Kis mértékben késik", class: "slight-delay" },
        { text: "Jelentősen késik", class: "major-delay" }
    ];

    const legs = result.routes[0].legs;
    legs.forEach(leg => {
        leg.steps.filter(step => step.travel_mode === 'TRANSIT').forEach(step => {
            // Véletlenszerű státusz generálás
            const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
            
            // Késés generálás
            const delayMinutes = randomStatus.class === "on-time" ? 0 
                : randomStatus.class === "slight-delay" ? Math.floor(Math.random() * 10)
                : Math.floor(Math.random() * 30);

            const row = document.createElement("tr");
            row.classList.add(randomStatus.class);
            row.innerHTML = `
                <td>${step.transit.line.short_name || 'Helyi járat'}</td>
                <td>${step.duration.text}</td>
                <td>${step.instructions || 'Busz útvonal'}</td>
                <td class="status">
                    <span class="${randomStatus.class}">
                        ${randomStatus.text} 
                        ${delayMinutes > 0 ? `(${delayMinutes} perc)` : ''}
                    </span>
                </td>
            `;
            scheduleBody.appendChild(row);
        });
    });
}

// CSS kiegészítés a státuszokhoz
const styleTag = document.createElement('style');
styleTag.textContent = `
    #schedule .on-time { background-color: rgba(0, 255, 0, 0.1); }
    #schedule .slight-delay { background-color: rgba(255, 255, 0, 0.1); }
    #schedule .major-delay { background-color: rgba(255, 0, 0, 0.1); }
    #schedule .status .on-time { color: green; }
    #schedule .status .slight-delay { color: orange; }
    #schedule .status .major-delay { color: red; }
`;
document.head.appendChild(styleTag);

document.getElementById("routeBtn").onclick = function() {
    if (!validateSelection()) return;

    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    
    const request = { 
        origin: start, 
        destination: end, 
        travelMode: 'TRANSIT', 
        transitOptions: {
            modes: ['BUS'], 
            routingPreference: 'FEWER_TRANSFERS' 
        }, 
        unitSystem: google.maps.UnitSystem.METRIC 
    };
    
    directionsService.route(request, function(result, status) {
        if (status == "OK") {
            directionsRenderer.setDirections(result);
            updateSchedule(result);
        } else {
            alert("Útvonal nem található: " + status);
        }
    });
};

// Segédfüggvény a kiválasztott állomások validálására
function validateSelection() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    if (startSelect.value === endSelect.value) {
        alert('A kezdő és végállomás nem lehet ugyanaz!');
        return false;
    }
    return true;
}

// Buszállomások feltöltése a select mezőkbe
function populateBusStops() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    kaposvarBusStops.forEach(stop => {
        const startOption = document.createElement('option');
        const endOption = document.createElement('option');
        
        startOption.value = stop.name;
        startOption.textContent = stop.name;
        
        endOption.value = stop.name;
        endOption.textContent = stop.name;
        
        startSelect.appendChild(startOption);
        endSelect.appendChild(endOption);
    });
}

// Állomásváltó gomb funkció
document.getElementById('switchBtn').onclick = function() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    const tempValue = startSelect.value;
    startSelect.value = endSelect.value;
    endSelect.value = tempValue;
};

// Inicializálás kiterjesztése
window.onload = function() {
    initMap();
    populateBusStops();
};


</script>
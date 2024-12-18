// Legördülő listák inicializálása
function initializeDropdowns() {
    const startSelect = document.getElementById('start');
    
    // A listák törlése az újratöltés előtt
    startSelect.innerHTML = '';
    
    // Opciók hozzáadása mindkét legördülő listához
    busStations.forEach(station => {
        // Kezdő állomás select
        const startOption = new Option(station, station);
        startSelect.add(startOption);
        
        // Végállomás select
    });
}

// Állomások felcserélése
function switchStations() {
    const startSelect = document.getElementById('start');
    
    
}

// Frissíti a legördülők kiválasztott értékeit
function updateDropdowns(startSelect, ) {
    // A kiválasztott opciók átállítása
    const startSelectedOption = startSelect.querySelector(`option[value="${startSelect.value}"]`);
    
    // Ha a kiválasztott opciók léteznek, akkor frissítjük a kiválasztott állapotot
    if (startSelectedOption) startSelectedOption.selected = true;
}


// Event listener a switch gombhoz
document.getElementById('switchBtn').addEventListener('click', switchStations);

// Oldal betöltésekor inicializáljuk a legördülő listákat
document.addEventListener('DOMContentLoaded', initializeDropdowns);

// Segédfüggvény a kiválasztott állomások validálására
function validateSelection() {
    const startSelect = document.getElementById('start');
    
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
    
    const request = { 
        origin: start, 
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
   
}

// Buszállomások feltöltése a select mezőkbe
function populateBusStops() {
    const startSelect = document.getElementById('start');
    
    kaposvarBusStops.forEach(stop => {
        const startOption = document.createElement('option');
        
        startOption.value = stop.name;
        startOption.textContent = stop.name;
        
        
        startSelect.appendChild(startOption);
    });
}

// Állomásváltó gomb funkció
document.getElementById('switchBtn').onclick = function() {
    const startSelect = document.getElementById('start');
    
    const tempValue = startSelect.value;
};

// Inicializálás kiterjesztése
window.onload = function() {
    initMap();
    populateBusStops();
};

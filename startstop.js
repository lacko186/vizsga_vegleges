
// Az oldal betöltésekor inicializáljuk a legördülő listákat
document.addEventListener('DOMContentLoaded', function() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');
    
    // Opciók hozzáadása a selectekhez
    stations.forEach(station => {
        const startOption = new Option(station, station);
        const endOption = new Option(station, station);
        startSelect.add(startOption);
        endSelect.add(endOption);
    });
    
    // Kezdő és végállomások alapértelmezett értékei
    startSelect.value = stations[0];  // Kezdőállomás
    endSelect.value = stations[1];    // Végállomás
});

// A két select mező értékének felcserélése
function switchStations() {
    const startSelect = document.getElementById('start');
    const endSelect = document.getElementById('end');

    // Jelenlegi értékek
    const startValue = startSelect.value;
    const endValue = endSelect.value;

    // Felcseréljük a két mezőt
    startSelect.value = endValue;
    endSelect.value = startValue;

    // Ha azonos értékeket próbálnak választani, visszaállítjuk az alapértelmezett állapotot
    if (startSelect.value === endSelect.value) {
        endSelect.value = stations.find(station => station !== startValue); // Kiválasztunk egy másik értéket
    }
}

// Az eseménykezelőt hozzárendeljük a switch gombhoz
document.getElementById('switchBtn').addEventListener('click', switchStations);


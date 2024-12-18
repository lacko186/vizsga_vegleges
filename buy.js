
const busStations = [
            "helyi autóbusz állomás", "Berzsenyi u. felűljáró", "Berzsenyi u. 30.", "Ballakúti u.",
            "Lonkahegy forduló", "Nyár", "Berzsenyi u. felűljáró", "Jókai liget", "Szigetvári u. 6.",
            "Szigetvári u. 62.", "Szigetvári u. 139.", "Kaposfüred vá.", "Bersenyi u. 30.", "Füredi u. csp.",
            "Toldi lakónegyed", "Kinizsi ltp.", "Búzavirág u.", "Laktanya", "Volán-telep", "Kaposfüredi u. 12.",
            "Kaposfüredi u. 104.", "Kaposfüred központ", "Állomás u.", "Kaposfüredi u. 244.", "Kaposfüred forduló",
            "Városi könyvtár", "Vasútköz", "Raktár u. forduló", "Mátyás k. u. forduló", "Egyenesi u. forduló",
            "Koppány vezér u. forduló", "Töröcske forduló", "Béla király u. forduló", "Kaposszentjakab forduló",
            "Toponár forduló", "NABI forduló", "Kaposvári Egyetem", "Videoton", "Buzsáki u.", "Aranytér",
            "Sopron u. forduló", "Tóth Árpád u.", "Kométa forduló", "67-es sz. út", "Rózsa u.", "Erdősor u.",
            "Gönczi F. u.", "Városi Fürdő", "Hajnóczy u. csp.", "Jutai u. 24.", "Jutai u. 45.", "Raktár u. 2.",
            "Kecelhegyalja u. 6.", "Kőrösi Cs. S. u. 109.", "Kecelhegyi iskola", "Kőrösi Cs. S. u. 45.",
            "Kenese tér", "Eger u.", "Kapoli A. u.", "Egyenesi u. 42.", "Beszédes J. u.", "Állatkorház", "Kölcsey u.",
            "Tompa M. u.", "Vasútállomás", "Baross G. u.", "Csalogány u.", "Vikár B. u.", "Fő u. 48.", "Fő u. 37-39.",
            "Hársfa u.", "Hősök temploma", "Gyár u.", "Pécsi úti iskola", "Nádasdi u.", "Móricz Zs. u.", "Pécsi u. 227.",
            "Várhegy feljáró", "Nap u", "Hold u.", "Magyar Nobel-díjasok tere", "Bartók B. u.", "Táncsics M. u.",
            "Zichy M. u.", "Aranyeső u.", "Jókai u.", "Szegfű u.", "Gyertyános", "Kertbarát felső", "Kertbarát alsó",
            "Szőlőhegy", "Fenyves u. 37/A", "Fenyves u. 31", "Kórház célgazdaság", "Fenyves u. 63.", "Mező u. csp.",
            "Izzó u.", "Guba S. u. 81.", "Guba S. u. 57.", "Villamossági Gyár", "Toponár posta", "Toponár Orci elágazás",
            "Toponári u. 182.", "Toponári u. 238.", "Erdei F. u.", "Szabó P. u.", "Orci út 14.", "Répáspuszta",
            "Kenyérgyár u. 1.", "Kenyérgyár u. 3.", "Dombóvári u. 4.", "Kaposvári Egyetem forduló", "Virág u.",
            "Pázmány P. u.", "Vöröstelek u.", "Hegyi u.", "Tallián Gy. u. 4.", "Kórház", "Tallián Gy. u. 56.",
            "Tallián Gy. u. 82.", "ÁNTSZ", "Rendőrség", "Szent Imre u. 29.", "Szent Imre u. 13.", "Széchenyi tér",
            "Zárda u.", "Honvéd u.", "Arany J. tér", "Losonc-köz", "Brassó u.", "Nagyszeben u.", "Somssich P. u.",
            "Pázmány P. u.", "Kisgát", "Arany J. u", "Rózsa u.", "Corso"
        ];
function initializeDropdowns() {
    const startSelect = document.getElementById('felszallas');
    const endSelect = document.getElementById('leszallas');
    busStations.forEach(station => {
        const startOption = new Option(station, station);
        startSelect.add(startOption);
        const endOption = new Option(station, station);
        endSelect.add(endOption);
    });
}

document.addEventListener('DOMContentLoaded', initializeDropdowns);
        const today = new Date();
        document.getElementById("validFrom").value = today.toISOString().split("T")[0];
        document.getElementById("validFrom").min = today.toISOString().split("T")[0];
        const delay = new Date();
        document.getElementById("datum").value = today.toISOString().split("T")[0];
        document.getElementById("datum").min = today.toISOString().split("T")[0];
        document.getElementById("validUntil").min = today.toISOString().split("T")[0];
        function updatePrice() {
            const ticketSelect = document.getElementById('ticketType');
            const quantity = document.getElementById('quantity').value;
            const selectedOption = ticketSelect.options[ticketSelect.selectedIndex];

            if (selectedOption.value) {
                const basePrice = parseInt(selectedOption.dataset.price);
                const total = basePrice * quantity;
                document.getElementById('totalPrice').textContent = total.toLocaleString();

                // Update validUntil date based on ticket type
                const validFrom = new Date(document.getElementById('validFrom').value);
                if (selectedOption.value.includes('monthly')) {
                    const validUntil = new Date(validFrom);
                    validUntil.setMonth(validUntil.getMonth() + 1);
                    document.getElementById('validUntil').value = validUntil.toISOString().split('T')[0];
                } else {
                    const validUntil = new Date(validFrom);
                    validUntil.setDate(validUntil.getDate() + 1);
                    document.getElementById('validUntil').value = validUntil.toISOString().split('T')[0];
                }
            }
        }
        document.getElementById('ticketType').addEventListener('change', updatePrice);
        document.getElementById('quantity').addEventListener('change', updatePrice);
        document.getElementById('validFrom').addEventListener('change', updatePrice);
        function generateRandomId() {
            return 'TKT-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        }
        function generateInvoice() {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                vatNumber: document.getElementById('vatNumber').value,
                address: document.getElementById('address').value,
                ticketType: document.getElementById('ticketType').options[document.getElementById('ticketType').selectedIndex].text,
                quantity: document.getElementById('quantity').value,
                validFrom: document.getElementById('validFrom').value,
                validUntil: document.getElementById('validUntil').value,
                paymentMethod: document.getElementById('paymentMethod').value,
                totalPrice: document.getElementById('totalPrice').textContent,
                szamlaszam: document.getElementById('szamlaszam').value,
                invoiceId: generateRandomId(),
                invoiceDate: new Date().toLocaleDateString('hu-HU')
            };
            if (!formData.name || !formData.email || !formData.phone || !formData.address || 
                !formData.ticketType || !formData.paymentMethod || !formData.szamlaszam) {
                alert("Kérjük, töltse ki az összes kötelező mezőt!");
                return;
            }
            const invoiceDetails = `Számla
----------------------------------------------------------------------------------------            
Számlaszám: ${formData.szamlaszam}
Kiállítás dátuma: ${formData.invoiceDate}
Név: ${formData.name}
${formData.vatNumber ? 'Adószám: ' + formData.vatNumber : ''}
Cím: ${formData.address}
E-mail: ${formData.email}
Telefon: ${formData.phone}
Termék részletei:
Megnevezés: ${formData.ticketType}
Mennyiség: ${formData.quantity} db
Érvényesség kezdete: ${formData.validFrom}
Érvényesség vége: ${formData.validUntil}
Fizetési indormációk:
Fizetési mód: ${formData.paymentMethod}
Végösszeg: ${formData.totalPrice} Ft
Egyedi azonosító: ${formData.invoiceId}
----------------------------------------------------------------------------------------`;

            document.getElementById('invoiceDetails').innerText = invoiceDetails;
            document.getElementById('invoice').style.display = 'block';
            // Generate QR code
            const qrCode = new QRious({
                element: document.getElementById('qrcode'),
                value: formData.invoiceId,
                size: 150
            });
            
        }
       function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    try {
        // Alapbeállítások
        const margin = 20;
        const pageWidth = 210;
        const contentWidth = pageWidth - (2 * margin);
        // Színek definíciója
        const colors = {
            primary: [0, 31, 63],    // Sötétkék
            secondary: [245, 245, 245], // Világosszürke
            accent: [230, 230, 230],    // Középszürke
            text: [51, 51, 51],        // Sötétszürke
            lightText: [102, 102, 102]  // Világosabb szürke
        };

        // Fejléc
        doc.setFillColor(...colors.secondary);
        doc.rect(0, 0, pageWidth, 45, 'F');

        // Cég logó helye (ha van)
        try {
            const logoBase64 = document.getElementById('logo')?.src;
            if (logoBase64) {
                doc.addImage(logoBase64, 'SVG', margin, 10, 30, 30);
            }
        } catch (error) {
            console.warn('Logo betöltése sikertelen:', error);
        }

        // Cégnév és számlainformációk a fejlécben
        doc.setTextColor(...colors.primary);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('Kaposvári Közlekedési Zrt.', margin + 35, 25);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text([
            'Adószám: 12345678-2-14',
            'Cégjegyzékszám: 01-10-123456',
            'Bankszámlaszám: 11111111-22222222-33333333',
            'Székhely: 7400 Kaposvár'
        ], margin + 35, 30, { lineHeightFactor: 1.2 });
        // Számla cím szakasz
        doc.setFillColor(...colors.accent);
        doc.rect(0, 45, pageWidth, 15, 'F');
        doc.setTextColor(...colors.text);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('SZÁMLA', pageWidth/2, 55, { align: 'center' });
        // Form adatok beszerzése
        const formData = {
            szamlaszam: document.getElementById('szamlaszam').value,
            invoiceDate: new Date().toLocaleDateString('hu-HU'),
            name: document.getElementById('name').value,
            vatNumber: document.getElementById('vatNumber').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            ticketType: document.getElementById('ticketType').options[document.getElementById('ticketType').selectedIndex].text,
            quantity: document.getElementById('quantity').value,
            validFrom: document.getElementById('validFrom').value,
            validUntil: document.getElementById('validUntil').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            totalPrice: document.getElementById('totalPrice').textContent,
            invoiceId: generateRandomId()
        };
        let y = 70;
        // Számla alapadatok box
        doc.setFillColor(...colors.secondary);
        doc.roundedRect(margin, y, contentWidth/2 - 5, 40, 3, 3, 'F');
        doc.setFontSize(10);
        doc.setTextColor(...colors.text);
        // Bal oldali adatok
        doc.setFont('helvetica', 'bold');
        doc.text('Számlaszám:', margin + 5, y + 10);
        doc.setFont('helvetica', 'normal');
        doc.text(formData.szamlaszam, margin + 30, y + 10);
        doc.text(formData.invoiceDate, margin + 5, y + 20);
        // QR kód a jobb felső sarokban
        try {
            const qrCanvas = document.getElementById('qrcode');
            const qrBase64 = qrCanvas.toDataURL('image/png');
            doc.addImage(qrBase64, 'PNG', pageWidth - margin - 35, y, 35, 35);
        } catch (error) {
            console.warn('QR kód betöltése sikertelen:', error);
        }
        y += 45;
        // Vevő adatok szakasz
        doc.setFillColor(149, 6, 6);
        doc.setTextColor(255, 255, 255);
        doc.rect(margin, y, contentWidth, 8, 'F');
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Adatok', margin + 5, y + 6);
        y += 15;
        doc.setTextColor(...colors.text);
        doc.setFontSize(11);
        function addField(label, value, yPos, leftMargin = margin) {
            doc.setFont('helvetica', 'bold');
            doc.text(label, leftMargin, yPos);
            doc.setFont('helvetica', 'normal');
            doc.text(value || '', leftMargin + 45, yPos);
            return yPos + 8;
        }
        y = addField('Név:', formData.name, y);
        if (formData.vatNumber) {
            y = addField('Adószám:', formData.vatNumber, y);
        }
        y = addField('Cím:', formData.address, y);
        y = addField('E-mail:', formData.email, y);
        y = addField('Telefon:', formData.phone, y);
        y += 10;
        const quantity = parseInt(formData.quantity);
        const unitPrice = parseInt(formData.totalPrice) / quantity;
        const netPrice = unitPrice * quantity;
        const vat = netPrice * 0.27; // 27% ÁFA
        const grossPrice = netPrice + vat;
        // Lábléc
        y = 270;
        doc.setFillColor(...colors.accent);
        doc.rect(0, y, pageWidth, 27, 'F');
        doc.setFontSize(9);
        doc.setTextColor(...colors.lightText);

        const footer = [
            'Ez a számla elektronikusan került kiállításra és hitelesítésre.',
            `Egyedi azonosító: ${formData.invoiceId}`,
            'Köszönjük, hogy szolgáltatásainkat választotta!'
        ];
        footer.forEach((line, i) => {
            doc.text(line, pageWidth/2, y + 6 + (i * 5), { align: 'center' });
        });

        // PDF mentése
        const cleanName = formData.name
            ? formData.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
            : 'szamla';
        const filename = `szamla_${cleanName}_${formData.invoiceId}.pdf`;
        doc.save(filename);

    } catch (error) {
        console.error('Hiba a PDF generálása során:', error);
        alert(`Hiba történt a PDF generálása során: ${error.message}`);
    }
}

// Meglévő eseménykezelők megtartása
document.getElementById('ticketType').addEventListener('change', updatePrice);
document.getElementById('quantity').addEventListener('change', updatePrice);
document.getElementById('validFrom').addEventListener('change', updatePrice);

// Nav
document.getElementById('menuBtn').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('dropdownMenu').classList.toggle('active');
});
// Kívülre kattintás esetén bezárjuk a menüt
document.addEventListener('click', function(event) {
    const menu = document.getElementById('dropdownMenu');
    const menuBtn = document.getElementById('menuBtn');
    
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        menu.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});
// Aktív oldal jelölése
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu-items a');
    
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});
//Nav end
        document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('kesesigazolas');

    function kesesSzamitas(tervezett, tenyleges) {
        try {
            const tervIdopont = new Date(`1970-01-01T${tervezett}`);
            const tenyIdopont = new Date(`1970-01-01T${tenyleges}`);
            
            if (isNaN(tervIdopont.getTime()) || isNaN(tenyIdopont.getTime())) {
                throw new Error('Érvénytelen időformátum');
            }
            
            return Math.round((tenyIdopont - tervIdopont) / (1000 * 60));
        } catch (error) {
            console.error('Hiba a késés számításánál:', error);
            throw error;
        }
    }

    async function loadImage(path) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Nem sikerült létrehozni a canvas kontextust'));
                        return;
                    }
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                } catch (error) {
                    reject(error);
                }
            };
            img.onerror = () => reject(new Error(`Nem sikerült betölteni a képet: ${path}`));
            img.src = path;
        });
    }

    async function pdfKeszites(adatok) {
        if (!window.jspdf) {
            alert('A PDF generáló könyvtár nem található. Kérjük, frissítse az oldalt.');
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        try {
            // Alapbeállítások
            const margin = 25;
            const pageWidth = 210;
            const contentWidth = pageWidth - (2 * margin);

            // Fejléc háttér - világosabb szürke
            doc.setFillColor(245, 245, 245);
            doc.rect(0, 0, pageWidth, 40, 'F');

            // Logo betöltésének megpróbálása
            try {
                const logoBase64 = await loadImage('logo.svg');
                doc.addImage(logoBase64, 'SVG', margin, 10, 15, 15);
            } catch (error) {
                console.warn('Logo betöltése sikertelen:', error);
                // Folytatjuk logo nélkül
            }
            // Fejléc szöveg - sötétszürke
            doc.setTextColor(51, 51, 51);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('Kaposvári Közlekedési Zrt.', margin + 40, 22);
            // Alcím sáv - középszürke
            doc.setFillColor(230, 230, 230);
            doc.rect(0, 40, pageWidth, 10, 'F');
            doc.setTextColor(51, 51, 51);
            doc.setFontSize(14);
            doc.text('KÉSÉS IGAZOLÁS', pageWidth/2, 47, { align: 'center' });
            // Adatok szakasz
            let y = 65;
            doc.setTextColor(68, 68, 68);
            doc.setFontSize(11);

            function addDataField(label, value, yPos) {
                if (!label || !value) return yPos; // Üres mezők kihagyása
                
                // Háttér minden második sorhoz - nagyon világos szürke
                if ((yPos - 65) / 8 % 2 === 0) {
                    doc.setFillColor(250, 250, 250);
                    doc.rect(margin, yPos - 4, contentWidth, 8, 'F');
                }
                
                // Címke
                doc.setFont('helvetica', 'bold');
                doc.text(label, margin, yPos);
                
                // Érték
                doc.setFont('helvetica', 'normal');
                doc.text(String(value), margin + 50, yPos);
                
                return yPos + 8;
            }

            let kesesPerc;
            try {
                kesesPerc = kesesSzamitas(adatok.tervezett_indulas, adatok.tenyleges_indulas);
            } catch (error) {
                console.error('Hiba a késés számításánál:', error);
                kesesPerc = 'N/A';
            }

            // Adatok megjelenítése
            y = addDataField('Utas neve:', adatok.nev, y);
            y = addDataField('Bérletszám:', adatok.berletszam, y);
            y = addDataField('Járatszám:', adatok.jaratszam, y);
            y = addDataField('Dátum:', adatok.datum, y);
            y = addDataField('Felszállás:', adatok.felszallas, y);
            y = addDataField('Leszállás:', adatok.leszallas, y);
            y = addDataField('Tervezett indulás:', adatok.tervezett_indulas, y);
            y = addDataField('Tényleges indulás:', adatok.tenyleges_indulas, y);

            // Késés kiemelése - modern stílus
            y += 10;
            doc.setFillColor(68, 68, 68);
            doc.rect(margin, y - 4, contentWidth, 12, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(12);
            doc.text(`KÉSÉS MÉRTÉKE: ${kesesPerc} PERC`, pageWidth/2, y + 3, { align: 'center' });

            // Aláírás betöltésének megpróbálása
            y = 160;
            try {
                const signatureBase64 = await loadImage('alairas.svg');
                doc.addImage(signatureBase64, 'SVG', margin, y, 40, 20);
            } catch (error) {
                console.warn('Aláírás betöltése sikertelen:', error);
                // Alternatív megoldás aláírás helyett
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(10);
                doc.setTextColor(68, 68, 68);
                doc.text('Elektronikusan hitelesítve', margin, y + 10);
            }

            // Lábléc vonal
            y = 200;
            doc.setFillColor(200, 200, 200);
            doc.rect(margin, y, contentWidth, 0.5, 'F');

            // Lábléc információk
            y += 10;
            doc.setTextColor(102, 102, 102);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            const maiDatum = new Date().toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            doc.text(`Kiállítás dátuma: ${maiDatum}`, margin, y);

            // Dokumentum azonosító és generálási információ
            y += 6;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            const docId = Math.random().toString(36).substr(2, 9).toUpperCase();
            doc.text('Az igazolást a rendszer automatikusan generálta.', margin, y);
            doc.text(`Dokumentum azonosító: ${docId}`, pageWidth - margin, y, { align: 'right' });

            // Fájlnév generálása biztonságosan
            const tisztaNev = adatok.nev
                ? adatok.nev.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
                : 'keses_igazolas';
            const fajlnev = `keses_igazolas_${tisztaNev}_${docId}.pdf`;

            // PDF mentése
            doc.save(fajlnev);

        } catch (error) {
            console.error('Részletes hiba a PDF generálása során:', error);
            alert(`Hiba történt a PDF generálása során: ${error.message}`);
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Adatok validálása
        const required = ['nev', 'jaratszam', 'datum', 'tervezett_indulas', 'tenyleges_indulas'];
        const hianyzo = required.filter(field => !document.getElementById(field)?.value);
        
        if (hianyzo.length > 0) {
            alert(`Kérjük, töltse ki a következő kötelező mezőket: ${hianyzo.join(', ')}`);
            return;
        }
        
        const adatok = {
            nev: document.getElementById('nev').value,
            berletszam: document.getElementById('berletszam').value,
            jaratszam: document.getElementById('jaratszam').value,
            datum: document.getElementById('datum').value,
            tervezett_indulas: document.getElementById('tervezett_indulas').value,
            tenyleges_indulas: document.getElementById('tenyleges_indulas').value,
            felszallas: document.getElementById('felszallas').value,
            leszallas: document.getElementById('leszallas').value
        };
        
        pdfKeszites(adatok).catch(error => {
            console.error('Hiba a form feldolgozása során:', error);
            alert('Váratlan hiba történt. Kérjük, próbálja újra később.');
        });
    });
});
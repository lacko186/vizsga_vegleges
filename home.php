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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="footer.css">
    <link rel="stylesheet" href="header.css">
    <title>Kaposbusz</title>
    <style>
     @import url('https://fonts.googleapis.com/css?family=Open+Sans');

    :root {
        --primary-color:linear-gradient(to right, #211717,#b30000);
        --accent-color: #7A7474;
        --text-light: #fbfbfb;
        --secondary-color: #3498db;
        --hover-color: #2980b9;
        --background-light: #f8f9fa;
        --shadow-color: rgba(0, 0, 0, 0.5);
        --transition: all 0.3s ease;
     }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Open Sans', sans-serif;
        color: #222;
    }

/*--------------------------------------------------------------------------------------------------------CSS - HEADER---------------------------------------------------------------------------------------------------*/
    .header {
        position: relative;
        background: var(--primary-color);
        color: var(--text-light);
        padding: 1rem;
        box-shadow: 0 2px 10px var(--shadow-color);
    }

    .header h1 {
        text-align: center;
        font-size: 2rem;
        padding: 1rem 0;
        margin-left: 38%;
        display: inline-block;
    }

    .nav-wrapper {
        position: absolute;
        top: 1rem;
        left: 1rem;
        z-index: 1000;
    }

    .nav-container {
        position: relative;
    }
/*--------------------------------------------------------------------------------------------------------HEADER END-----------------------------------------------------------------------------------------------------*/

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .hero {
        background-image: url('https://kaposvariprogramok.hu/sites/default/files/120845739_825620101509249_2047839847436415923_n.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom center;
        height: 100vh;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: relative;
        margin-bottom: 20px;
        z-index: -2;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: -1;
    }

    .hero h1 {
        font-size: 46px;
        margin: -20px 0 20px;
    }

    .hero p {
        font-size: 20px;
        letter-spacing: 1px;
    }

    .content h2,
    .content h3 {
        font-size: 150%;
        margin: 20px 0;
    }

    .content p {
        color: #555;
        line-height: 30px;
        letter-spacing: 1.2px;
    }

/*--------------------------------------------------------------------------------------------------------CSS - @MEDIA---------------------------------------------------------------------------------------------------*/
        @media (max-width: 480px) {
            .header-content {
                padding: 1rem;
            }

            h1 {
                font-size: 1.25rem;
                margin-right: 30%;
            }

            .nav-wrapper{
                left: 0.05rem;
            }

            .card-container{
                align-items:center;
            }
        }
/*--------------------------------------------------------------------------------------------------------@MEDIA END-----------------------------------------------------------------------------------------------------*/
  
/* UIverse card container */
.card-container {
    display: flex;
    flex-wrap: wrap; /* Allow wrapping for smaller screens */
    justify-content: center; /* Center the items horizontally */
    align-items: center; /* Center the items vertically */
    margin-left: 0;
    max-width: 1200px;
    gap: 20px; /* Add space between cards */
    margin: 0 auto; /* Horizontally center the container itself */
}

/* UIverse card */
.card {
    width: 30%; /* Default to 3 cards per row on large screens */
    height: auto; 
    border-radius: 20px;
    background: #f5f5f5;
    position: relative;
    padding: 2rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
    margin-bottom: 5%;
    box-sizing: border-box; /* Include padding and borders in width calculation */
}

.card-details {
    color: black;
    height: 100%;
    gap: .5em;
    display: grid;
    place-content: center;
}

.card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #b30000;
    color: #fff;
    font-size: 1rem;
    padding: .5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
}

.card:hover {
    border-color: #b30000;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
}

/* Responsive adjustments */

/* 1024px - two cards per row */
@media (max-width: 1024px) {
    .card {
        width: 48%; /* 2 cards per row */
        margin-left: 0;
    }
}

/* 768px - one card per row */
@media (max-width: 768px) {
    .card {
        width: 90%; /* 1 card per row */
        margin-left: 0;
        margin-bottom: 20px;
    }
}

/* 480px - optional, for very small screens */
@media (max-width: 480px) {
    .card {
        width: 90%; /* 1 card per row on very small screens */
        margin-left: 0;
        margin-bottom: 20px;
    }
}




/*UIverse button */
    .btn-53,
    .btn-53 *,
    .btn-53 :after,
    .btn-53 :before,
    .btn-53:after,
    .btn-53:before {
    border: 0 solid;
    box-sizing: border-box;
    }

    .btn-53 {
    -webkit-tap-highlight-color: transparent;
    -webkit-appearance: button;
    background-color: #211717;
    background-image: none;
    color: #fbfbfb;
    cursor: pointer;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
        Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-size: 100%;
    line-height: 1.5;
    margin: 0;
    -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
    padding: 0;
    }

    .btn-53:disabled {
    cursor: default;
    }

    .btn-53:-moz-focusring {
    outline: auto;
    }

    .btn-53 svg {
    display: block;
    vertical-align: middle;
    }

    .btn-53 [hidden] {
    display: none;
    }

    .btn-53 {
    border: 1px solid;
    border-radius: 999px;
    box-sizing: border-box;
    display: block;
    font-weight: 900;
    overflow: hidden;
    padding: 1.2rem 3rem;
    position: relative;
    text-transform: uppercase;
    margin-left: 45%;
    }

    .btn-53 .original {
    background: #b30000;
    color: #fbfbfb;
    display: grid;
    inset: 0;
    place-content: center;
    position: absolute;
    transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1);
    }

    .btn-53:hover .original {
    transform: translateY(100%);
    }

    .btn-53 .letters {
    display: inline-flex;
    }

    .btn-53 span {
    opacity: 0;
    transform: translateY(-15px);
    transition: transform 0.2s cubic-bezier(0.87, 0, 0.13, 1), opacity 0.2s;
    }

    .btn-53 span:nth-child(2n) {
    transform: translateY(15px);
    }

    .btn-53:hover span {
    opacity: 1;
    transform: translateY(0);
    }

    .btn-53:hover span:nth-child(2) {
    transition-delay: 0.1s;
    }

    .btn-53:hover span:nth-child(3) {
    transition-delay: 0.2s;
    }

    .btn-53:hover span:nth-child(4) {
    transition-delay: 0.3s;
    }

    .btn-53:hover span:nth-child(5) {
    transition-delay: 0.4s;
    }

    .btn-53:hover span:nth-child(6) {
    transition-delay: 0.5s;
    }

    .btn-53:hover span:nth-child(7) {
    transition-delay: 0.6s;
    }

    .btn-53:hover span:nth-child(8) {
    transition-delay: 0.7s;
    }

    .btn-53:hover span:nth-child(9) {
    transition-delay: 0.8s;
    }

    .btn-53:hover span:nth-child(10) {
    transition-delay: 0.9s;
    }

    .btn-53:hover span:nth-child(11) {
    transition-delay: 0.10s;
    }

    .btn-53:hover span:nth-child(12) {
    transition-delay: 0.11s;
    }

    .btn-53:hover span:nth-child(13) {
    transition-delay: 0.12s;
    }

    .btn-53:hover span:nth-child(14) {
    transition-delay: 0.13s;
    }

    .btn-53:hover span:nth-child(15) {
    transition-delay: 0.14s;
    }
/*End */

@keyframes animation-name {
    0% {
        /* Initial state of the element */
        transform: rotate(0deg);
        opacity: 0;
    }
    50% {
        /* Midpoint state of the element */
        transform: rotate(180deg);
        opacity: 0.5;
    }
    100% {
        /* Final state of the element */
        transform: rotate(360deg);
        opacity: 1;
    }
}

    </style>
  </head>
  <body>
<!-- -----------------------------------------------------------------------------------------------------HTML - HEADER----------------------------------------------------------------------------------------------- -->
    <div class="header">
        <div class="nav-wrapper">
            <div class="nav-container">
                <button class="menu-btn" id="menuBtn">
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                <nav class="dropdown-menu" id="dropdownMenu">
                    <ul class="menu-items">
                        <li>
                            <a href="fooldal.php" class="active">
                                <img src="home.png" alt="Főoldal">
                                <span>Főoldal</span>
                            </a>
                        </li>
                        <li>
                            <a href="index.php" class="active">
                                <img src="placeholder.png" alt="Térkép">
                                <span>Térkép</span>
                            </a>
                        </li>
                        <li>
                            <a href="buy.php">
                                <img src="tickets.png" alt="Jegyvásárlás">
                                <span>Jegyvásárlás</span>
                            </a>
                        </li>
                        <li>
                            <a href="menetrend.php">
                                <img src="calendar.png" alt="Menetrend">
                                <span>Menetrend</span>
                            </a>
                        </li>
                        <li>
                            <a href="jaratok.php">
                            <img src="bus.png" alt="Járatok">
                                <span>&nbsp; Járatok</span>
                            </a>
                        </li>
                        <li>
                            <a href="info.php">
                                <img src="information-button.png" alt="Információ">
                                <span>Információ</span>
                            </a>
                        </li>
                        <li>
                            <a href="logout.php">
                                <i class="fas fa-sign-out-alt"></i>
                                <span>Kijelentkezés</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
                <h1>Kaposvár Közlekedési Zrt.</h1>
        </div>
<!-- -----------------------------------------------------------------------------------------------------HEADER END-------------------------------------------------------------------------------------------------- -->


    <div class="hero">
      <div class="container">
        <h1>Üdvözöljük a Kaposbusz megújult weboldalán</h1>
      </div>
    </div>

<!-- -----------------------------------------------------------------------------------------------------HTML - NEWS-------------------------------------------------------------------------------------------------- -->
    <h1 style="color: #b30000; margin-left: 20%; margin-bottom: 3%; margin-top: 5%;">Hírek</h1>

    <div id="card-container" class="card-container"></div>
<!-- -----------------------------------------------------------------------------------------------------NEWS END----------------------------------------------------------------------------------------------------- -->

<!-- -----------------------------------------------------------------------------------------------------HTML - MORE NEWS BUTTON-------------------------------------------------------------------------------------- -->
    <button class="btn-53" id="btnMoreNews">
        <div class="original">Még több hír >></div>
        <div class="letters">
            
            <span>M</span>
            <span>É</span>
            <span>G</span>
            <span>&nbsp;</span>
            <span>T</span>
            <span>Ö</span>
            <span>B</span>
            <span>B</span>
            <span>&nbsp;</span>
            <span>H</span>
            <span>Í</span>
            <span>R</span>
            <span>&nbsp;</span>
            <span>></span>
            <span>></span>
        </div>
    </button>
<!-- -----------------------------------------------------------------------------------------------------MORE NEWS BUTTON END----------------------------------------------------------------------------------------- -->

<!-- -----------------------------------------------------------------------------------------------------HTML - FOOTER------------------------------------------------------------------------------------------------ -->
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h2>Kaposvár közlekedés</h2>
                <p style="font-style: italic">Megbízható közlekedési szolgáltatások<br> az Ön kényelméért már több mint 50 éve.</p><br>
                <div class="social-links">
                    <a style="color: darkblue;" href="https://www.facebook.com/VOLANBUSZ/"><i class="fab fa-facebook"></i></a>
                    <a style="color: lightblue"href="https://x.com/volanbusz_hu?mx=2"><i class="fab fa-twitter"></i></a>
                    <a style="color: red"href="https://www.instagram.com/volanbusz/"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
           
            <div  class="footer-section">
                <h3>Elérhetőség</h3>
                <ul class="footer-links">
                    <li><i class="fas fa-phone"></i> +36-82/411-850</li>
                    <li><i class="fas fa-envelope"></i> titkarsag@kkzrt.hu</li>
                    <li><i class="fas fa-map-marker-alt"></i> 7400 Kaposvár, Cseri út 16.</li>
                    <li><i class="fas fa-map-marker-alt"></i> Áchim András utca 1.</li>
                </ul>
            </div>
        </div>
        <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);">
            <p>© 2024 Kaposvár közlekedési Zrt. Minden jog fenntartva.</p>
        </div>
    </footer>
<!-- -----------------------------------------------------------------------------------------------------FOOTER END--------------------------------------------------------------------------------------------------- -->
    <script>
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

        const newsData = [
            {
                "img": "bus.png",
                "title": "Adócsalás",
                "date": "2024.11.23.",
                "details": "Az XY xxx millió Ft-ot csaltak el ezen hétfői napon. Bűneik miatt a következő kedden fognak bíróságra menni."
            },
            {
                "img": "bus.png",
                "title": "Családi baleset",
                "date": "2024.10.31.",
                "details": "XY család akart el utazni, de balesetbe kerültek. A család 2024. 11. 20-án szálltak fel a KK Zrt. buszára ami nem sokkal később a körforgalomnál felborult. Több felszálló utas megsérült, de szerencsére senki nem halt meg."
            },
            {
                "img": "bus.png",
                "title": "Menetrend változás",
                "date": "2024.08.11.",
                "details": "Az előző menetrendre sok vevő panaszkodott, így változott a menetrend. A következő hétfőtől a 24-es, 25-ös, 36-os, 37-es mentrendje megváltozik kérjük figyeljenek oda a változásokra."
            },
            {
                "img": "bus.png",
                "title": "Adócsalás",
                "date": "2024.07.03.",
                "details": "Az XY xxx millió Ft-ot csaltak el ezen hétfői napon. Bűneik miatt a következő kedden fognak bíróságra menni."
            },
            {
                "img": "bus.png",
                "title": "Családi baleset",
                "date": "2024.05.28.",
                "details": "XY család akart el utazni, de balesetbe kerültek. A család 2024. 11. 20-án szálltak fel a KK Zrt. buszára ami nem sokkal később a körforgalomnál felborult. Több felszálló utas megsérült, de szerencsére senki nem halt meg."
            },
            {
                "img": "bus.png",
                "title": "Menetrend változás",
                "date": "2024.03.16.",
                "details": "Az előző menetrendre sok vevő panaszkodott, így változott a menetrend. A következő hétfőtől a 24-es, 25-ös, 36-os, 37-es mentrendje megváltozik kérjük figyeljenek oda a változásokra."
            },
            {
                "img": "bus.png",
                "title": "Adócsalás",
                "date": "2024.11.23.",
                "details": "Az XY xxx millió Ft-ot csaltak el ezen hétfői napon. Bűneik miatt a következő kedden fognak bíróságra menni."
            },
            {
                "img": "bus.png",
                "title": "Családi baleset",
                "date": "2024.10.31.",
                "details": "XY család akart el utazni, de balesetbe kerültek. A család 2024. 11. 20-án szálltak fel a KK Zrt. buszára ami nem sokkal később a körforgalomnál felborult. Több felszálló utas megsérült, de szerencsére senki nem halt meg."
            },
            {
                "img": "bus.png",
                "title": "Menetrend változás",
                "date": "2024.08.11.",
                "details": "Az előző menetrendre sok vevő panaszkodott, így változott a menetrend. A következő hétfőtől a 24-es, 25-ös, 36-os, 37-es mentrendje megváltozik kérjük figyeljenek oda a változásokra."
            },
            {
                "img": "bus.png",
                "title": "Adócsalás",
                "date": "2024.07.03.",
                "details": "Az XY xxx millió Ft-ot csaltak el ezen hétfői napon. Bűneik miatt a következő kedden fognak bíróságra menni."
            },
            {
                "img": "bus.png",
                "title": "Családi baleset",
                "date": "2024.05.28.",
                "details": "XY család akart el utazni, de balesetbe kerültek. A család 2024. 11. 20-án szálltak fel a KK Zrt. buszára ami nem sokkal később a körforgalomnál felborult. Több felszálló utas megsérült, de szerencsére senki nem halt meg."
            },
            {
                "img": "bus.png",
                "title": "Menetrend változás",
                "date": "2024.03.16.",
                "details": "Az előző menetrendre sok vevő panaszkodott, így változott a menetrend. A következő hétfőtől a 24-es, 25-ös, 36-os, 37-es mentrendje megváltozik kérjük figyeljenek oda a változásokra."
            },
        ];

        function truncateText(text, maxLength) {
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        }

        let showAll = false; // Flag to track whether to show all news

        function displayNews() {
            const container = document.getElementById('card-container');
            container.innerHTML = '';

            const visibleNews = showAll ? newsData : newsData.slice(0, 6); // Display all or only the first 6

            visibleNews.forEach(news => {
                const newsElement = document.createElement('div');
                newsElement.classList.add('card');

                const truncatedDetails = truncateText(news.details, 50);

                newsElement.innerHTML = `
                    <div class="card-details">
                        <p>
                            <img src="${news.img}" style="width: 150px; height: 150px; padding-left: 0.7rem">
                        </p>
                        <p class="text-title">${news.title}</p>
                        <p class="date" style="background: #b30000;width: 90px;border-radius: 3px;padding:3px;color: #fbfbfb;">${news.date}</p>
                        <p class="text-body">${truncatedDetails}</p>
                    </div>
                    <button class="card-button">More info</button>
                `;

                newsElement.addEventListener('click', () => {
                    const url = new URL('news.php', window.location.origin);
                    url.searchParams.append('imgPath', news.img);
                    url.searchParams.append('title', news.title);
                    url.searchParams.append('date', news.date);
                    url.searchParams.append('details', news.details);
                    window.location.href = url.toString();
                });

                container.appendChild(newsElement);
            });
        }

        function setupButton() {
            const button = document.getElementById('btnMoreNews');
            button.textContent = showAll ? 'Kevesebb hír' : 'Még több hír';

            button.addEventListener('click', () => {
                showAll = !showAll; // Toggle the state
                displayNews(); // Re-render news
                button.textContent = showAll ? 'Kevesebb hír' : 'Még több hír'; // Update button text
            });
        }

        // Initial setup
        displayNews();
        setupButton();


    </script>
  </body>
</html>

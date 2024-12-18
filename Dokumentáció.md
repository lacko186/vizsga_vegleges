<center>

# Vizsgaremek  

</center>

<br><br><br><br><br><br>
**Készítette: Falka Marietta & Bogdán László**
<br><br><br><br><br><br><br>


### <p style = "text-align: center ">Kaposvár</p>  


#### <p style = "text-align: center">2024</p>

<br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br>

## <p style=" text-align: center "> Kaposvári Szakképzési Centrum <br> Noszlopy Gáspár Közgazdasági Technikum 
<br><br><br><br><br><br><br>
### <p style="text-align: center">Ticket</p> 
<br><br><br><br><br><br><br>

 *Szoftverfejlesztő és tesztelő képzés*

---

## <p style = "text-align: center ">Tartalomjegyzék</p>

1. [Bevezetés](#bevezetés)
   - 1.1. [Köszönetnyilvánítás](#köszönetnyilvánítás)
   - 1.2. [Témaválasztás](#témaválasztás)
   - 1.3. [Témaválasztás indoklása](#témaválasztás-indoklása)
2. [Felhasználói dokumentáció](#felhasználói-dokumentáció)
   - 2.1. [Rendszerkövetelmények](#rendszerkövetelmények)

   - 2.3. [Főoldal](#főoldal)
   
    

3. [Fejlesztői dokumentáció](#fejlesztői-dokumentáció)
   - 3.1. [Fejlesztői környezet](#fejlesztői-környezet)
   - 3.2. [Fájlok, osztályok, főprogramok, alprogramok, változók](#fájlok-osztályok-főprogramok-alprogramok-változók)
     
     - js-ek
     
   
   - 3.3. [Fontosabb kódrészletek](#fontosabb-kódrészletek)

     - 3.3.2. [Felhasználónév input](#felhasználónév-input)



   - 3.4. [Grafikus elemek és képek](#grafikus-elemek-és-képek)
  

  

 
   - 3.5. [Betűtípusok](#betűtípusok)
     - 3.5.1. [Menüben felhasznált betűtípus](#menüben-felhasznált-betűtípus)

   - 3.9. [Tesztdokumentáció](#tesztdokumentáció)
   
4. [Fejlesztési lehetőségek](#fejlesztési-lehetőségek)
5. [Irodalomjegyzék](#irodalomjegyzék)

---

## <p style ="text-align: center">Bevezetés</p>

### 1.1. Köszönetnyilvánítás

Szeretném megköszönni Bloch Tamás tanár úrnak, hogy segített a program elkészítésében. Továbbá szeretném megköszönni Teveli Norbert, Teveli Róbert, aki szintén végig támogatott a technikumi képzés ideje alatt.
Nemutolsó sorban szeretném megköszönni támogatónknak Horváth Dusánnak a https://menetbrand.com tulajdonosát aki Speciális <b>GTFS</b>-t biztosított. 

### 1.2. Témaválasztás

A viszgaremek témája egy online vasúti, belföldi utastervező megújítása 

### 1.3. Témaválasztás indoklása

A mindennapokban használt utazás nehézségeinek leküzdése<br>
A projekt célja a Kaposvári Közlekedési Zrt. helyi járatos közlekedésének könnyebb, átláthatóbb felhasználóbarát felületének létrehozása volt.<br>
A Felhasználói visszajelzések alapján elégedettlenséggel találkoztunk, saját magunk is tapasztaltuk a KKZRT weboldalának bonyolult felépítését.<br>
Az oldal inspirációt ad egy modern közlekedési oldal létrehozásában.<br>
A projekt kifejezetten a KKZRT-nek készül, de a már meglévő https://www.volanbusz.hu/-nak és https://www.mavcsoport.hu/-nak is nyújthat inspirációt


---

## 2. Felhasználói dokumentáció

### Milyen hardver és szoftver eszközök szükségesek felhasználoknak?
<b>Windows, macOS, Linux operációs rendszer</b><br>
<b>Google Chrome, Mozilla Firefox, Microsoft Edge, Safari Böngésző</b><br>
<b>Bármilyen okostelefon, táblagép, vagy személyi számítógép</b><br>
<b>Minimum 1024 x 768 pixel képernyőfelbontás</b><br>
<b>Stabil internetkapcsolat szükséges a weboldal teljes funkcionalitásához</b><br>

### Milyen komponensek szükségesek?


- Felhasználóbarát dizájn és intuitív kezelőfelület. Reszponzív kialakítás, hogy asztali gépen és mobilon is jól működjön. Technológiák:<b> HTML, CSS, JavaScript.</b>
- Az üzleti logika és adatok feldolgozása. API-k a frontend és az adatbázis közötti kommunikációhoz. Node.js, PHP.
- Adatbázis
- Az alkalmazás által használt adatok tárolására. Relációs MySQL típusú adatbázis a szükségletektől függően. Biztonsági megoldások
- Hitelesítés és jogosultságkezelés. Adatvédelem és titkosítás.
- Infrastruktúra
- Felhőalapú szolgáltatások (pl. Google Cloud) vagy helyi szerverek.
- Tesztelési keretrendszerek
- Automatizált tesztek.
- Dokumentáció
- Felhasználói és fejlesztői dokumentáció a könnyebb karbantartás érdekében.
<br>

## Mi a cél?
- Felhasználóbarát környezet kiépítése és egyéb szolgáltatás elérhetővé tétele.
- A beépített elemekkel a weboldal megjelenése frissebb és modernebb legyen.
- Könnyen használható, értelmezhető utasinformáció megvalósítása.
- A helyi járatos közlekedés és a tömegközlekedés használatának népszerűsítése

## Milyen problémára akar megoldást nyújtani?
A https://www.kaposbusz.hu/ weboldal használata statikus, pdf-ekkel történik a menetrendek megtekintése csak helyben (jegykiadónál) lehet jegyet vásárolni elavult, nehéz használat.

Kezdetben mi is sokszor belefutottunk abba a problémába, hogy kiigazodni a város helyi járatos közlekedésén sokszor problémát okozott, az összes járatinformáció pdf-ekkel volt elérhető https://www.kaposbusz.hu/letoltheto-menetrend

Az online jegyrendelés a fizikai menetjegyek csökkentése, és a helyi járatok használatára való ösztönzése érdekében hoztuk létre

Eddig a https://www.kaposbusz.hu weboldalán nem találkoztunk online jegyrendelés opcióval, csak fizikai jegyet lehet vásárolni amely felesleges időt és pénzt(előállítás) emészt fel.
És a nem jó helyre eldobott, már fel használt fizikai jegyek rontják a város utcáinak tiszta és rendezett állapotát.
Az egyre sűrűbben jelentkező probléma a késés és annak igazolása az ebből adódó problémák kikerülése, gördülékenyebb tájékozódás a vidékiek számára is.

A statikus menetrend sokszor bonyolult, erre készítettünk egy dinamikus aktuálisan induló járatfigyelőt.





A KKZRT nem rendelkezik saját mobil applikációval, de az általunk fejlesztett weboldal alapvetően responsive mobilon való megtekintésre alkalmas, de van opció a mobil applikációra is.

Sikerült megvalósítani az online jegy pdf-ként letöltését, ami segít a jegy további használhatóságában még internet elérés nélkül is.



A bejelentkező felhasználok adatai adatbázisban tárolódnak, regisztráció után saját profilt generálunk amelyben tárolódnak az utas felhasználó adatai, amelyek csak a felhasználónak elérhetőek.


![kapobusz](../../../Users/User/Pictures/Screenshots/kapobusz.png)

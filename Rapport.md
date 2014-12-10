#Rapport

###Vad finns det för krav du måste anpassa dig efter i de olika API:erna?
####SR
Materialet som tillhandahålls via API får inte användas på ett sådant sätt att det skulle kunna skada Sveriges Radios oberoende eller trovärdighet.
####Google
Man har en viss mängd data man får använda om man inte betalar, så man får inte använda mer än 25 000 mapladdningar per dag i 90 dagar i sträck.
Så om man tror att sin applikation kommer att generera mycket laddningar så ska man överväga några av följande val.<br>
- Modify your application so that your usage is less than 25 000 map loads per day.<br>
- Enroll for automated billing of excess map loads in the Google APIs Console.<br>
- Purchase a Google Maps API for Work license.

Man ska även använda en API nyckel för att kolla hur mycket API:t används och så att Google kan kontakta en om det skulle vara nödvändigt.

###Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?
Jag cachar genom att när jag har hämtat från SR:s API så skriver jag den JSON man får tillbaka till en fil och sedan läser
jag alltid från filen. Filen uppdaterar jag var 5:e minut, så när det har gått 5 minuter så hämtar jag från SR:s API igen
och skriver över det som fanns i filen till det nya jag hämtade och sedan läser jag från filen igen.

###Vad finns det för risker med din applikation?
De risker som finns med applikationen är att om något skulle ändras i API:t, till exempel det byts namn på datum eller
sådant så kommer min applikation inte att fungera.

###Hur har du tänkt kring säkerheten i din applikation?
Kring säkerheten har jag tänkt som följande, att jag använder textContent när jag lägger ut titlarna till a - taggen för
den gör allt till text så om det finns en script - tag i titlarna så skrivs det ut `<script>` men den exikveras aldrg.
Sedan har jag även gjort så att om det man får tillbaka är tomt eller null så skrivs det ut som finns i textfilen.

###Hur har du tänkt kring optimeringen i din applikation?
Optimeringen har jag tänkt på följande att jag använder en minifierad jquery fil och så har jag använt en minifierad
bootstrap css som då tar ner laddningstiderna en del. Jag har även gjort en minifiering av min egen javascript fil som
blev stor så att den går snabbare att ladda in.
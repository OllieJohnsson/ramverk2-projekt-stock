# ramverk2-projekt-stock
Real-tids-service för projektet i kursen ramverk2.


<!-- I dina README beskriver du i ett eget stycke om hur du implementerade realtidsaspekten i din applikation. Du skriver också om vilken teknik/verktyg du valt för din implementation samt en kort reflektion av hur du tycker tekniken fungerar. -->



För att hantera real-time använde jag **socket.io**. Jag hade hört att det skulle vara ett av de populäraste biblioteken för real-time-kommunikation mellan klient och server, och eftersom jag inte jobbat med det tidigare under kursen ville jag testa. Jag använde mig av **express** för att skapa servern enligt anvisningar i socket.ios dokumentation.

När en användare ansluts ville jag hämta nuvarande objekt-data från databasen. Så jag använde mig av paketet **node-fetch** för att kunna göra requests från min real-time-server. Varje minut uppdateras priserna och den nya datan skickas ut till anslutna användare med hjälp av `io.emit("stocks", objects);`. Jag använde mig av **promises** för att vänta in requests vid data-hämtning och uppdatering av priser.

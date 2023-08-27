//Enkel funktion för att ge användaren en notífikation att deras request har blivit mottaget
function thanksNotification() {
let thankUser = document.getElementById("thanksForContact");
thankUser.innerHTML = "";
thankUser.innerHTML += `<h3>Thank you for your message. <br> We will reply as soon as possible. </h3>`;
}
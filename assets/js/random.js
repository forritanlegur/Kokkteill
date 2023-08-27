//random
function fetchRandomData() {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`).then((res) => {
        return res.json();
    });
}

function onLoad() {
    fetchRandomData().then((data) => {
        printRandom(data);
    });
}

function printRandom(data) {
    let randomdrink = data.drinks;
    console.log("this is the random drink  : ", randomdrink);
    randomDrinkText = "";
    randomDrinkText += `<div class="cardRandom" onclick="newCard()"><img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}"><br><h4>
        ${data.drinks[0].strDrink}</h4><hr class="dashed"> <h4>Ingredients:</h4>`;

    for (let i = 0; i <= 15; i++) {
        let currentIngredient;
        currentIngredient = "strIngredient" + i;
        let currentMeasure;
        currentMeasure = "strMeasure" + i;
        //Kollar om ingrediensen och måttet finns och i så fall skriver ut den. APIn har lite dålig design eftersom
        //ingredienserna inte förvaras i en string... De är alla separata objekt.. jobbigt
        if (data.drinks[0][currentIngredient] != null) {
            randomDrinkText += "<li>";
            if (data.drinks[0][currentMeasure] == null) {
                //För att undvika att APIn skriver ut saker som tex "null salt" om ett mått inte är angett
                randomDrinkText += ` ${data.drinks[0][currentIngredient]} </li>`;
            } else {
                //Om den kan hitta både mått och ingrediens skrivs:
                //ändra texten
                randomDrinkText += ` ${data.drinks[0][currentMeasure]} ${data.drinks[0][currentIngredient]} </li>`;
            }
        }
    }

    randomDrinkText += `</li><h4>Instructions:</h4><p>${data.drinks[0].strInstructions}</p></div>`;

    randomDrinkText += `</div>`;

    let showDrinkData = (document.getElementById("randomDrinkBox").innerHTML = randomDrinkText);
}

printRandom;

//En liten animation som spelas när man genererar ett nytt random kort
function newCard() {
    let cssAnimCard = document.querySelector(".cardRandom");
    //Lägger till css som får den att snurra
    cssAnimCard.classList.add("animateRotate");
    setTimeout(() => {
        //efter animationen spelats tas den bort och det nya kortet laddas in.
        //Det ser inte 100% helt seamless ut men blir en liten cool "effekt"
        cssAnimCard.classList.remove("animateRotate"), onLoad();
    }, 900);
}

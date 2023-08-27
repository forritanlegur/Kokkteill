//drinkar
function fetchCocktailData() {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkInput}`).then((res) => {
        return res.json();
    });
}
//ingredienser ----------------
function fetchIngredientData() {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientInput}`).then((res) => {
        return res.json();
    });
}

//outputDrinkData kommer innehålla html koden som ska ändras efter sökning
let outputDrinkData = "";
//default
let drinkInput = "margarita";
//för ingrediens-sökning------------
let ingredientInput = "";

function printData(data) {
    //Uppdaterar webbsidan med information från APIn.
    //"Drinks" reprsenterar hela sökresultat, alltså alla drinkar
    //som kommer upp efter användarens sökning.
    let drinks = data.drinks;
    console.log("this is the drinks list : ", drinks);
    if (drinks == null) {
        outputDrinkData += `<h2> No search results found... </h2>`;
        let showDrinkData = (document.getElementById("searchResultBoxID").innerHTML = outputDrinkData);
    } else {
        //Nedan ändras html:en för att reflektera sökningen
        for (let i = 0; i < drinks.length; i++) {
            outputDrinkData += `<div class="card"><img src="${data.drinks[i].strDrinkThumb}" alt="${data.drinks[i].strDrink}"><br><h4>
        ${data.drinks[i].strDrink}</h4><hr class="dashed"> <h4>Ingredients:</h4>`;
            //En for loop som går igenom alla ingredienser och skriver ut dem
            for (let f = 1; f <= 15; f++) {
                let currentIngredient;
                currentIngredient = "strIngredient" + f;
                let currentMeasure;
                currentMeasure = "strMeasure" + f;
                //Kollar om ingrediensen och måttet finns och i så fall skriver ut den. APIn har lite dålig design eftersom
                //ingredienserna inte förvaras i en string... De är alla separata objekt.. jobbigt
                if (data.drinks[i][currentIngredient] != null) {
                    outputDrinkData += "<li>";
                    if (data.drinks[i][currentMeasure] == null) {
                        //För att undvika att APIn skriver ut saker som tex "null salt" om ett mått inte är angett
                        outputDrinkData += ` ${data.drinks[i][currentIngredient]} </li>`;
                    } else {
                        //Om den kan hitta både mått och ingrediens skrivs:
                        //ändra texten
                        outputDrinkData += ` ${data.drinks[i][currentMeasure]} ${data.drinks[i][currentIngredient]} </li>`;
                    }
                }
            }

            outputDrinkData += `</li><h4>Instructions:</h4><p>${data.drinks[i].strInstructions}</p></div>`;
        }

        let showDrinkData = (document.getElementById("searchResultBoxID").innerHTML = outputDrinkData);
    }
}

fetchCocktailData().then((data) => {
    printData(data);
});

//Search bar functionality
function recieveInput() {
    //Ta emot input från användaren
    drinkInput = document.getElementById("userInput").value;
    //resetta datan efter sökningen
    outputDrinkData = "";
    console.log("the drink input is : ", drinkInput);
    //Hämta data baserat på input
    fetchCocktailData().then((data) => {
        printData(data);
    });
}

//För ingredienser----------
function recieveIngredientInput() {
    //Ta emot input från användaren
    ingredientInput = document.getElementById("userInput").value;
    //resetta datan efter sökningen
    outputDrinkData = "";
    console.log("the ingredient input is ", ingredientInput);
    //Hämta data baserat på input
    fetchIngredientData().then((data) => {
        printDataIngredients(data);
    });
}

function printDataIngredients(data) {
    //Uppdaterar webbsidan med information från APIn.
    //"Drinks" reprsenterar hela sökresultat, alltså alla drinkar
    //som kommer upp efter användarens sökning.
    let drinks = data.drinks;
    console.log("this is the drinks list : ", drinks);
    if (drinks == null) {
        outputDrinkData += `<h2> No search results found... </h2>`;
        let showDrinkData = (document.getElementById("searchResultBoxID").innerHTML = outputDrinkData);
    } else {
        //Nedan ändras html:en för att reflektera sökningen
        // Anledninen till att ingredienser & recept inte skrivs ut under denna sökning är pga hur APIn är uppbyggd
        //För att få recept mm från en ingrediens sökning måste man göra ytterligare en API call per resultat
        //för ingrediens sökningar som tex "vodka" med 20+ resultat skulle detta betyda en jättestor mängd API calls
        //Därför har jag valt att länka till receptet på webbsidan istället.
        for (let i = 0; i < drinks.length; i++) {
            outputDrinkData += `<div class="card"><img src="${data.drinks[i].strDrinkThumb}" alt="${data.drinks[i].strDrink}"><br>
            <a aria-label="Opens recipe in new tab" href="https://www.thecocktaildb.com/drink/${data.drinks[i].idDrink}"><h4>
        ${data.drinks[i].strDrink}</h4></a></div>`;
        }

        let showDrinkData = (document.getElementById("searchResultBoxID").innerHTML = outputDrinkData);
    }
}

//stoppa enter refresh
document.getElementById('searchForm').addEventListener('submit', function(e) {
    document.getElementById('userInput');
    e.preventDefault();
}, false);
let ingridients = [];
let instructions = [];

var list = document.getElementById("recipeList");
var addIncridientButton = document.getElementById("add-ingredient");
var addInstructionButton = document.getElementById("add-instruction");
var submitButton = document.getElementById("submit");

var updateRecipes = async function updateRecipes(){
    let recipe = await specificRecipeQuery("pizza")
    console.log(recipe)
    createRecipe(recipe)
}

function createRecipe(recipeData) {
    var recipeName = document.createElement("h4")
    var recipe = document.createElement("div");
    recipeName.innerText = recipeData.name
    recipe.appendChild(recipeName);

    recipe.appendChild(listItems(recipeData.instructions))
    recipe.appendChild(listItems(recipeData.ingridients))

    list.appendChild(recipe)
}

async function specificRecipeQuery(name) {
    console.log(name);
    return fetch(`/recipe/${name}`).then(res => res.json());
}

function listItems(items) {
    var itemsList = document.createElement("ul")
    items.forEach(item => {
        var itemsListElement = document.createElement("li");
        itemsListElement.innerText = item;
        itemsList.appendChild(itemsListElement)
    });
    
    return itemsList;
}

addIncridientButton.onclick = function () {
    var incridientArea = document.getElementById("ingredients-text")
    var incridient = incridientArea.value;
    ingridients.push(incridient);
    incridientArea.value = "";
}

addInstructionButton.onclick = function () {
    var instructionsArea = document.getElementById("instructions-text")
    var instruction = instructionsArea.value;
    instructions.push(instruction);
    instructionsArea.value = "";
}

submitButton.onclick = function () {
    var nameText = document.getElementById("name-text")
    var name = nameText.value

    fetch("/recipe", {
        method: "post",
        headers: {"Content-type": "application/json"},
        body: `{ "name": "${name}",
                "instructions": "${instructions}",
                "ingridients": "${ingridients}"
             }`})
             .then(response => response.json())

    ingridients = [];
    instructions = [];
    nameText.value = "";

    updateRecipes();
}

await updateRecipes();

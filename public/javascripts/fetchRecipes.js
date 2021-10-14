let ingridients = [];
let instructions = [];

var list = document.getElementById("recipeList");
var addIncridientButton = document.getElementById("add-ingredient");
var addInstructionButton = document.getElementById("add-instruction");
var submitButton = document.getElementById("submit");
var recipeSearchField = document.getElementById("search")


var updateRecipe = async function updateRecipes(food){
    let recipe = await recipeQuery(food)
    createRecipe(recipe)
}

function createRecipe(recipeData) {
    var recipeName = document.createElement("h4")
    var recipe = document.createElement("div");
    recipeName.innerText = recipeData.name
    recipe.appendChild(recipeName);
    console.log("recipeDATA:")
    console.log(recipeData)
    console.log(recipeData.instructions)
    recipe.appendChild(listItems(recipeData.instructions))
    recipe.appendChild(listItems(recipeData.ingridients))

    list.appendChild(recipe)
}

async function recipeQuery(food) {
    return fetch(`/recipe/${food}`).then(res => res.json());
}

function listItems(items) {
    console.log(items)
    var itemsList = document.createElement("ul")
    items.forEach(item => {
        console.log(item)
        var itemsListElement = document.createElement("li");
        itemsListElement.innerText = item;
        itemsList.appendChild(itemsListElement)
    });
    
    return itemsList;
}

recipeSearchField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        updateRecipe(recipeSearchField.value);
        recipeSearchField.value = "";
    }
});

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



submitButton.onclick = async function () {
    var nameText = document.getElementById("name-text")
    var name = nameText.value

    var jsonBody = { "name": "",
    "instructions": "[]",
    "ingridients": "[]"
    }

    jsonBody.name = name
    jsonBody.ingridients = ingridients
    jsonBody.instructions = instructions

    console.log("POSTING")
    console.log(instructions)

    fetch("/recipe", {
        method: "post",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(jsonBody) })
             .then(response => response.json())
             .then(data => {updateRecipe(data.name)})
         
    ingridients = [];
    instructions = [];
    nameText.value = "";
}

async function updateNewRecipes(name){
    let recipe = await fetch(`/recipe/new_recipe/${name}`).then(res => res.json());
    console.log(recipe)
    createRecipe(recipe)
}
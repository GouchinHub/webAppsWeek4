
var list = document.getElementById("recipeList");

var recipe = document.createElement("div");
var instructions = document.createElement("li");
var ingridients = document.createElement("li");

var recipeDataResponse = await recipesQuery();
console.log(recipeDataResponse)
recipeDataResponse.forEach(element => {
    createRecipe(element)
});


console.log(recipeDataResponse);

function createRecipe(recipeData) {
    var recipeName = document.createElement("h4")
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

async function recipesQuery() {
    return fetch(`/recipe/`).then(res => res.json());
}

function listItems(items) {
    var itemsListElement = document.createElement("li");
    itemsListElement.appendChild(document.createTextNode(items))
    return itemsListElement;
}
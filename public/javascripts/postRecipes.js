
let ingridients = [];
let instructions = [];

var addIncridientButton = document.getElementById("add-ingredient");
var addInstructionButton = document.getElementById("add-instruction");
var submitButton = document.getElementById("submit");

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
}
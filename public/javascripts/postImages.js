
var inputElement = document.getElementById("image-input")
var submitButton = document.getElementById("submit-images")

var fileList = []

inputElement.onchange = function(event) {
    fileList = inputElement.files;
}

submitButton.onclick = function() {
    var formData = new FormData

    formData.append("images", fileList)

    fetch("/images", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        },
        body: formData
        }).catch(error => {
        console.error(error);
    });

    console.log("images succesfully submitted")
    inputElement.value = null;
}

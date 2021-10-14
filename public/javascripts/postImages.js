
var inputElement = document.getElementById("camera-file-input")
var submitButton = document.getElementById("submit-images")

var fileList = []

submitButton.onclick = function() {
    var reader = new FileReader();
    var file = inputElement.files[0];

    console.log(file)
    console.log(file.name);
    console.log(file.encoding);
    console.log(file.type);
    console.log(reader.readAsBinaryString(file));
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

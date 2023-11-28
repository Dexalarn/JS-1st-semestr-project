function runSelectedFile() {
    var fileInput = document.getElementById('fileSelector');
    var outputDiv = document.getElementById('output');

    var selectedFile = fileInput.files[0];

    if (selectedFile) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var htmlContent = e.target.result;
            outputDiv.innerHTML = "Running selected HTML file...<br>";

            // Create a new iframe and append it to the output div
            var iframe = document.createElement('iframe');
            iframe.srcdoc = htmlContent;
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            outputDiv.appendChild(iframe);
        };

        reader.readAsText(selectedFile);
    } else {
        outputDiv.innerHTML = "Please select an HTML file.";
    }
}

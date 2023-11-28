function runSelectedFile() {
    var selectedFile = document.getElementById("fileSelector").value;
    if (selectedFile) {
        window.location.href = selectedFile;
    }
}

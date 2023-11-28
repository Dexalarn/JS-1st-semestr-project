function runselectedgame() {
    var selectedgame = document.getElementById("Gameselect").value;
    if (selectedgame) {
        window.location.href = selectedgame;
    }
}

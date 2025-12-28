function degistir() {
    let isim = document.getElementById("isimInput").value;

    if (isim === "") {
        document.getElementById("yazi").innerText = "Adını yazmadın 😅";
    } else {
        document.getElementById("yazi").innerText = "Merhaba " + isim + " 👋";
    }
}

function ingresar() {
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;
    var user;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText > "0") {
                user = this.responseText;
                window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/menuPrincipal.html";
            } else {
                alert("¡Usuario o Contraseña incorrectos!"); 
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/verificarAdmin.php?usuario="+usuario+"&password="+password, true);
    xmlhttp.send();   
}
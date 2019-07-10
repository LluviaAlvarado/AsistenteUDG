function agregar() {
    var clave = document.getElementById("clave").value;
    var nombre = document.getElementById("nombre").value;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            alert(this.responseText);  
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarMateria.php?clave="+clave+"&nombre="+nombre, true);
    xmlhttp.send(); 
}
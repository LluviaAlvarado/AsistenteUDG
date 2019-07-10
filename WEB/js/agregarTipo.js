function llenarInfo () {
    var url = new URL(window.location.href);
    var clave = url.searchParams.get("clave");
    var nrc = url.searchParams.get("nrc");
    document.getElementById("clave").innerHTML = clave;
    document.getElementById("nrc").innerHTML = nrc;
}

function agregar () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    var tipo = document.getElementById("tipo").value;
    var puntos = document.getElementById("puntos").value;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            var respuesta = this.responseText;
            alert(respuesta);  
            if(respuesta === "¡Criterio agregado!"){
                window.location.reload();
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarTipo.php?clave="+clave+"&nrc="+nrc+"&tipo="+tipo+"&puntos="+puntos, true);
    xmlhttp.send(); 
}
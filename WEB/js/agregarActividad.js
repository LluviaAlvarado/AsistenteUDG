function llenarTipos () {
    var url = new URL(window.location.href);
    var clave = url.searchParams.get("clave");
    var nrc = url.searchParams.get("nrc");
    document.getElementById("clave").innerHTML = clave;
    document.getElementById("nrc").innerHTML = nrc;
    var lista = document.getElementById("tipos");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var listado = JSON.parse(this.responseText);
            for(var i = 0; i < listado.length; i++) {
                var criterio = listado[i];
                var opcion = document.createElement("option");
                opcion.value= criterio.tipo;
                opcion.innerHTML = criterio.tipo; 
                lista.appendChild(opcion);
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerTipos.php?clave="+clave+"&nrc="+nrc, true);
    xmlhttp.send();
}

function agregarActividad () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    var titulo = document.getElementById("titulo").value;
    var fecha = document.getElementById("fecha").value;
    var lista = document.getElementById("tipos");
    var tipo = lista.options[lista.selectedIndex].value;
    var descripcion = document.getElementById("descripcion").value;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            alert(this.responseText);  
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarActividad.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo+"&fecha="+fecha+"&tipo="+tipo+"&descripcion="+descripcion, true);
    xmlhttp.send(); 
}
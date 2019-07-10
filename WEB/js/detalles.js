function llenarEntregas () {
    var url = new URL(window.location.href);
    var clave = url.searchParams.get("clave");
    var nrc = url.searchParams.get("nrc");
    var titulo = url.searchParams.get("titulo");
    document.getElementById("clave").innerHTML = clave;
    document.getElementById("nrc").innerHTML = nrc;
    document.getElementById("titulo").innerHTML = titulo;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var actividad = JSON.parse(this.responseText);
            document.getElementById("tipo").innerHTML = actividad.tipo;
            var pendiente = true;
            var split = actividad.fecha.split("-");
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            if(yyyy > split[0]){
                pendiente = false;
            }else{
                if(yyyy == split[0]){
                   if(mm > split[1] || (mm == split[1] && dd > split[2])){
                        pendiente = false;
                    } 
                }
            }
            document.getElementById("pendiente").innerHTML = pendiente;
            document.getElementById("descripcion").innerHTML = actividad.descripcion;
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividad.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo, true);
    xmlhttp.send();    
    var tabla = document.getElementById("entregas");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var listado = JSON.parse(this.responseText);
            var cabecera = tabla.insertRow(0);
            var th = document.createElement('th');    
            th.innerHTML = "Código del Alumno";
            th.style.width = "80%"; 
            cabecera.appendChild(th);
            th = document.createElement('th'); 
            th.innerHTML = "Calificación";
            th.style.width = "20%"; 
            cabecera.appendChild(th);
            for(var i = 0; i < listado.length; i++) {
                var entrega = listado[i];
                var fila = tabla.insertRow(i+1);
                var codigo = entrega.codigo;
                var puntos = entrega.calificacion;
                var td = document.createElement("td");
                td = fila.insertCell(0);
                var e = document.createElement("label");
                e.innerHTML = codigo;
                td.appendChild(e);
                td = document.createElement("td");
                td = fila.insertCell(1);
                e = document.createElement("input");
                e.setAttribute('type', 'number');
                e.setAttribute('value', puntos);
                td.appendChild(e);
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerEntregas.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo, true);
    xmlhttp.send();
}

function guardar () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    var titulo = document.getElementById("titulo").innerHTML;
    var tabla = document.getElementById("entregas");
    var filas = tabla.rows.length;
    for(var i = 1; i < filas; i++){
        var codigo = tabla.rows[i].cells[0].firstChild.innerText;
        var puntos = tabla.rows[i].cells[1].firstChild.value;
        xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/guardarEntregas.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo+"&codigo="+codigo+"&puntos="+puntos, true);
        xmlhttp2.send();
    }
    alert("Calificaciones guardadas correctamente.");
}
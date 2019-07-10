var seleccionada = null;

function llenarActividades () {
    var url = new URL(window.location.href);
    var clave = url.searchParams.get("clave");
    var nombre = url.searchParams.get("nombre");
    var nrc = url.searchParams.get("nrc");
    var profesor = url.searchParams.get("profesor");
    var horario = url.searchParams.get("horario");
    var aula = url.searchParams.get("aula");
    document.getElementById("clave").innerHTML = clave;
    document.getElementById("nombre").innerHTML = nombre;
    document.getElementById("nrc").innerHTML = nrc;
    document.getElementById("profesor").innerHTML = profesor;
    document.getElementById("horario").innerHTML = horario;
    document.getElementById("aula").innerHTML = aula;
    var tabla = document.getElementById("actividades");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var listado = JSON.parse(this.responseText);
            var cabecera = tabla.insertRow(0);
            var th = document.createElement('th');    
            th.innerHTML = "Título";
            th.style.width = "60%"; 
            cabecera.appendChild(th);
            th = document.createElement('th'); 
            th.innerHTML = "Fecha";
            th.style.width = "20%"; 
            cabecera.appendChild(th);
            th = document.createElement('th'); 
            th.innerHTML = "Pendiente";
            th.style.width = "20%"; 
            cabecera.appendChild(th);
            for(var i = 0; i < listado.length; i++) {
                var actividad = listado[i];
                var fila = tabla.insertRow(i+1);
                fila.onclick = function () {
                    if (this.parentNode.nodeName == 'THEAD') {
                        return;
                    }
                    seleccionada = this.cells; 
                };
                fila.ondblclick = function () {
                    if (this.parentNode.nodeName == 'THEAD') {
                        return;
                    }
                    verEntregas(clave, nrc, this.cells[0].firstChild.innerHTML);
                };
                var titulo = actividad.titulo;
                var fecha = actividad.fecha;
                var pendiente = true;
                var split = fecha.split("-");
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
                var td = document.createElement("td");
                td = fila.insertCell(0);
                var e = document.createElement("p");
                e.innerHTML = titulo;
                td.appendChild(e);
                td = document.createElement("td");
                td = fila.insertCell(1);
                e = document.createElement("p");
                e.innerHTML = fecha;
                td.appendChild(e);
                td = document.createElement("td");
                td = fila.insertCell(2);
                e = document.createElement("p");
                e.innerHTML = pendiente;
                td.appendChild(e);
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividades.php?clave="+clave+"&nrc="+nrc, true);
    xmlhttp.send();
}

function verCriterio () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/criterio.html?clave="+clave+"&nrc="+nrc;
}

function agregarActividad () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarActividad.html?clave="+clave+"&nrc="+nrc;
}

function verEntregas (clave, nrc, titulo) {
    window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/verDetalles.html?clave="+clave+"&nrc="+nrc+"&titulo="+titulo;
}

function eliminarActividad () {
    if (seleccionada !== null){
        var titulo = seleccionada[0].firstChild.innerHTML;
        var confirmacion = confirm("¿Está seguro de eliminar la actividad: "+titulo+"?");
        if(confirmacion === true){
            var clave = document.getElementById("clave").innerHTML;
            var nrc = document.getElementById("nrc").innerHTML;
            xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200){
                    var respuesta = this.responseText;
                    if(respuesta === "¡Se dio de baja la actividad correctamente!"){
                        window.location.reload();
                    }
                    alert(respuesta);  
                }
            };
            xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/eliminarActividad.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo, true);
            xmlhttp2.send();
        }
    }else{
        alert("¡No se ha seleccionado una actividad!");
    }
}
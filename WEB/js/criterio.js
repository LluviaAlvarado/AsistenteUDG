var seleccionada = null;

function llenarCriterio () {
    var url = new URL(window.location.href);
    var clave = url.searchParams.get("clave");
    var nrc = url.searchParams.get("nrc");
    document.getElementById("clave").innerHTML = clave;
    document.getElementById("nrc").innerHTML = nrc;
    var tabla = document.getElementById("criterios");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var listado = JSON.parse(this.responseText);
            var cabecera = tabla.insertRow(0);
            var th = document.createElement('th');    
            th.innerHTML = "Tipo";
            th.style.width = "80%"; 
            cabecera.appendChild(th);
            th = document.createElement('th'); 
            th.innerHTML = "Puntos";
            th.style.width = "20%"; 
            cabecera.appendChild(th);
            for(var i = 0; i < listado.length; i++) {
                var criterio = listado[i];
                var fila = tabla.insertRow(i+1);
                fila.onclick = function () {
                    if (this.parentNode.nodeName == 'THEAD') {
                        return;
                    }
                    seleccionada = this.cells; 
                };
                var tipo = criterio.tipo;
                var puntos = criterio.puntos;
                var td = document.createElement("td");
                td = fila.insertCell(0);
                var e = document.createElement("label");
                e.innerHTML = tipo;
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
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerCriterios.php?clave="+clave+"&nrc="+nrc, true);
    xmlhttp.send();
}

function agregarTipo () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarTipo.html?clave="+clave+"&nrc="+nrc;
}

function eliminarTipo () {
    if (seleccionada !== null){
        var tipo = seleccionada[0].firstChild.innerHTML;
        var confirmacion = confirm("¿Está seguro de eliminar el criterio: "+tipo+"?");
        if(confirmacion === true){
            var clave = document.getElementById("clave").innerHTML;
            var nrc = document.getElementById("nrc").innerHTML;
            xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200){
                    var respuesta = this.responseText;
                    if(respuesta === "¡Se dio de baja el criterio correctamente!"){
                        window.location.reload();
                    }
                    alert(respuesta);  
                }
            };
            xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/eliminarTipo.php?clave="+clave+"&nrc="+nrc+"&tipo="+tipo, true);
            xmlhttp2.send();
        }
    }else{
        alert("¡No se ha seleccionado un criterio!");
    }
}

function guardar () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").innerHTML;
    var tabla = document.getElementById("criterios");
    var filas = tabla.rows.length;
    for(var i = 1; i < filas; i++){
        var tipo = tabla.rows[i].cells[0].firstChild.innerHTML;
        var puntos = tabla.rows[i].cells[1].firstChild.value;
        xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/guardarCriterio.php?clave="+clave+"&nrc="+nrc+"&tipo="+tipo+"&puntos="+puntos, true);
        xmlhttp2.send();
    }
    alert("Criterio guardado correctamente.");
}
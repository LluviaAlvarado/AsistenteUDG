function llenarListaClaves () {
    var lista = document.getElementById("listaClaves");
    //obteniendo la lista materias en la BD
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var listado = JSON.parse(this.responseText);
            for(var i = 0; i < listado.length; i++) {
                var materia = listado[i];
                var opcion = document.createElement("option");
                opcion.value= materia.clave;
                opcion.innerHTML = materia.clave; 
                lista.appendChild(opcion);
            }
            if(listado.length > 0){
                llenarNRCS(listado[0].clave, listado[0].nombre);
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerMaterias.php", true);
    xmlhttp.send();
}

function llenarNRCS (clave, nombre) {
    document.getElementById("nombre").innerHTML = nombre;
    var nrcs = document.getElementById("listaNRC");
    xmlhttpn = new XMLHttpRequest();
    xmlhttpn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var secciones = JSON.parse(this.responseText);
            for(var i = nrcs.options.length - 1 ; i >= 0 ; i--){
                nrcs.remove(i);
            }
            for(i = 0; i < secciones.length; i++){
                var seccion = secciones[i];
                var op = document.createElement("option");
                op.value = seccion.nrc;
                op.innerHTML = seccion.nrc;
                nrcs.appendChild(op);
            }
            if(secciones.length > 0){
                llenarDatosSeccion(clave, secciones[0].nrc);
            }else{
                document.getElementById("profesor").innerHTML = "";
                document.getElementById("horario").innerHTML = "";
                document.getElementById("aula").innerHTML = "";
            }
        }
    };
    xmlhttpn.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerSecciones.php?clave="+clave, true);
    xmlhttpn.send();
}

function llenarDatosSeccion (clave, nrc) {
    xmlhttp1 = new XMLHttpRequest();
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var seccion = JSON.parse(this.responseText);
            document.getElementById("profesor").innerHTML = seccion.profesor;
            document.getElementById("horario").innerHTML = seccion.dias + " - " + seccion.horario;
            document.getElementById("aula").innerHTML = seccion.aula;
        }
    };
    xmlhttp1.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerSeccion.php?clave="+clave+"&nrc="+nrc, true);
    xmlhttp1.send();
}

function claveCambio () {
    var listaC = document.getElementById("listaClaves");
    var clave = listaC.options[listaC.selectedIndex].value;
    xmlhttp1 = new XMLHttpRequest();
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var nombre = JSON.parse(this.responseText).nombre;
            llenarNRCS(clave, nombre);
        }
    };
    xmlhttp1.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerMateria.php?clave="+clave, true);
    xmlhttp1.send();
}

function nrcCambio () {
    var listaC = document.getElementById("listaClaves");
    var clave = listaC.options[listaC.selectedIndex].value;
    var lista = document.getElementById("listaNRC");
    var nrc = lista.options[lista.selectedIndex].value;
    llenarDatosSeccion(clave, nrc);
}

function verActividades () {
    var listaC = document.getElementById("listaClaves");
    var clave = listaC.options[listaC.selectedIndex].value;
    var nombre = document.getElementById("nombre").innerHTML;
    var lista = document.getElementById("listaNRC");
    var nrc = lista.options[lista.selectedIndex].value;
    if(lista.options.length > 0){
        var profesor = document.getElementById("profesor").innerHTML;
        var horario = document.getElementById("horario").innerHTML;
        var aula = document.getElementById("aula").innerHTML;
        window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/actividades.html?clave="+clave+"&nombre="+nombre+"&nrc="+nrc+"&profesor="+profesor+"&horario="+horario+"&aula="+aula;
    }else{
        alert("¡No hay secciones!");   
    }
}

function agregarSeccion () {
    var listaC = document.getElementById("listaClaves");
    var clave = listaC.options[listaC.selectedIndex].value;
    var nombre = document.getElementById("nombre").innerHTML;
    window.location = "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarSeccion.html?clave="+clave+"&nombre="+nombre;
}

function eliminarSeccion () {
    var listaC = document.getElementById("listaClaves");
    var clave = listaC.options[listaC.selectedIndex].value;
    var lista = document.getElementById("listaNRC");
    var nrc = lista.options[lista.selectedIndex].value;
    if(lista.options.length > 0){
        var confirmacion = confirm("¿Está seguro de eliminar la sección: "+clave+"-NRC:"+nrc+"?");
        if(confirmacion === true){
            xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200){
                    var respuesta = this.responseText;
                    if(respuesta === "¡Se dio de baja la sección correctamente!"){
                        lista.remove(lista.selectedIndex);
                        nrcCambio();
                    }
                    alert(respuesta);  
                }
            };
            xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/eliminarSeccion.php?clave="+clave+"&nrc="+nrc, true);
            xmlhttp2.send();
        } 
    }else{
        alert("¡No hay secciones!"); 
    }
}
   
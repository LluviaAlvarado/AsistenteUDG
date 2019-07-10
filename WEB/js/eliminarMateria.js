function llenarListaClaves(){
    var lista = document.getElementById("listaClaves");
    //obteniendo la lista materias en la BD
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var arreglo = this.responseText;
            var listado = JSON.parse(arreglo);
            for(var i = 0; i < listado.length; i++) {
                var materia = listado[i];
                var opcion = document.createElement("option");
                opcion.value= materia.clave;
                opcion.innerHTML = materia.clave; 
                lista.appendChild(opcion);
            }
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerMaterias.php", true);
    xmlhttp.send();
}

function eliminar() {
    var listaC = document.getElementById("listaClaves");
    var clave = listaC.options[listaC.selectedIndex].value;
    xmlhttp1 = new XMLHttpRequest();
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var nombre = JSON.parse(this.responseText).nombre;
            var confirmacion = confirm("¿Está seguro de eliminar la materia: "+clave+"-"+nombre+"?");
            if(confirmacion === true){
                xmlhttp2 = new XMLHttpRequest();
                xmlhttp2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200){
                        var respuesta = this.responseText;
                        if(respuesta === "¡Se dio de baja la materia correctamente!"){
                            listaC.remove(listaC.selectedIndex);
                        }
                        alert(respuesta);  
                    }
                };
                xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/eliminarMateria.php?clave="+clave, true);
                xmlhttp2.send();
            } 
        }
    };
    xmlhttp1.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerMateria.php?clave="+clave, true);
    xmlhttp1.send();    
}
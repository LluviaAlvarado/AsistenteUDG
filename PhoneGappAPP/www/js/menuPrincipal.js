var codigo;
var nip;
var nrc;
var clave;
var cartaSeleccionada;
var actSeleccionada;
var itemSeleccionado;

document.addEventListener('init', function(event){
    var page = event.target;
    if(page.matches('#menuPrincipal')){
        cargarMaterias(page);
    }
});

document.addEventListener('show', function(event){
    var page = event.target;
    if(page.matches('#menuPrincipal')){
        document.querySelector("#menuNavigator").bringPageTop("menuAlumno.html", {data: {title: 'menuAlumno'}});
    }else if(page.matches('#menuMateria')){
        document.querySelector("#menuNavigator").bringPageTop("menuDMateria.html", {data: {title: 'menuMateria'}}).then(() => {
                llenarInfoMateria(nombre);  
        });
        llenarActividadesPendientes();
    }
});

window.fn = {};
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page, data) {
  var content = document.getElementById('myNavigator');
  var menu = document.getElementById('menu');
  content.pushPage(page, data).then(menu.close.bind(menu));
};

document.addEventListener('tap', function(event) {
    if (event.target.matches('#cardMateria')) {
        cartaSeleccionada = event.target;
        var nombre = cartaSeleccionada.querySelector('#nombreCM').innerText;
        var seccion = cartaSeleccionada.querySelector('#claveNRC').innerText.split(",");
        clave = seccion[0];
        nrc = seccion[1];
        document.querySelector('#myNavigator').bringPageTop('menuMateria.html', {data: {title: nombre}}).then(() => {
            document.querySelector("#menuNavigator").bringPageTop("menuDMateria.html", {data: {title: 'menuMateria'}}).then(() => {
                llenarInfoMateria(nombre);  
            });
            document.querySelector('#nombreMateriaM').innerText = nombre;
            llenarActividadesPendientes();
        });
    }else if(event.target.matches('#cardActividad')){
        actSeleccionada = event.target;
        var titulo = actSeleccionada.querySelector('#tituloCA').innerText;
        document.querySelector('#myNavigator').bringPageTop('pendiente.html', {data: {title: titulo}}).then(() => {
            document.querySelector('#tituloPendiente').innerText = titulo;
            llenarDatosPendiente(titulo);
        });
    }else if(event.target.matches('#cardActividadE')){
        actSeleccionada = event.target;
        var tituloE = actSeleccionada.querySelector('#tituloCAE').innerText;
        var calificacion = actSeleccionada.querySelector("#calificacionCAE").innerText;
        document.querySelector('#myNavigator').bringPageTop('entregada.html', {data: {title: tituloE}}).then(() => {
            document.querySelector('#tituloEntregada').innerText = tituloE;
            llenarDatosEntregada(tituloE, calificacion);
        });
    }
});

function llenarDatosEntregada(titulo, calificacion){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var actividad = JSON.parse(this.responseText);
            document.querySelector('#tipoEntregada').innerText = actividad.tipo;
            document.querySelector('#fechaEntregada').innerText = actividad.fecha;
            document.querySelector('#calificacionEntregada').innerText = calificacion;
            document.querySelector('#descripcionEntregada').innerText = actividad.descripcion;
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividad.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo, true);
    xmlhttp.send();
}

function verEntregas(event){
    itemSeleccionado = event.target;
    var criterio = itemSeleccionado.querySelector('#criterio').innerText;
    document.querySelector('#myNavigator').bringPageTop('menuEntregadas.html', {data: {title: criterio}}).then(() => {
            document.querySelector('#criterioEntregadas').innerText = criterio;
            document.querySelector('#menu').close();
            llenarActividadesEntregadas(criterio);
    });
}

function llenarActividadesEntregadas(criterio) {
    var actividades = [];
    xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            actividades = JSON.parse(this.responseText);
            if(actividades == "0"){
                actividades = [];
                document.querySelector("#actividadesEntregadas").innerText = "Aún no se han asignado actividades :D!";
            }else{
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200){
                        var entregasT = JSON.parse(this.responseText);
                        var entregas = [];
                        if(entregasT != "0"){
                            for(var i = 0; i < entregasT.length; i++) {
                                var entrega = entregasT[i];
                                for(var j = 0; j < actividades.length; j++){
                                    if(entrega.titulo === actividades[j].titulo){
                                        if(actividades[j].tipo == criterio){
                                            entregas.push(entrega);
                                        }
                                    }
                                }
                            }
                        }
                        if(entregas.length > 0){
                            document.querySelector("#actividadesEntregadas").innerText = "Actividades Entregadas: " + entregas.length;
                            agregarCartasActividadesEntregadas(entregas);
                        }else{
                            document.querySelector("#actividadesEntregadas").innerText = "No has entregado nada :c!";
                        }
                    }
                };
                xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerEntregasAlumno.php?codigo="+codigo+"&nrc="+nrc, false);
                xmlhttp.send();
            }
        }
    };
    xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividades.php?clave="+clave+"&nrc="+nrc, false);
    xmlhttp2.send();
    document.getElementById('cargandoActividadesE').remove();
}

function agregarCartasActividadesEntregadas(actividades) {
    var content = document.getElementById("menuEntregadas").getElementsByClassName('page__content')[0];
    var child = content.lastElementChild;  
    for(var i = 0; i < content.childElementCount; i++){ 
        content.removeChild(child); 
        child = content.lastElementChild; 
    } 
    for(i = 0; i < actividades.length; i++){
        var carta = document.getElementById('cardActividadE.html').content.cloneNode(true);
        carta.querySelector("#tituloCAE").innerText = actividades[i].titulo;
        carta.querySelector("#calificacionCAE").innerText = actividades[i].calificacion;
        content.appendChild(carta);
    }
}

function llenarDatosPendiente(titulo){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var actividad = JSON.parse(this.responseText);
            document.querySelector('#tipoPendiente').innerText = actividad.tipo;
            document.querySelector('#fechaPendiente').innerText = actividad.fecha;
            document.querySelector('#descripcionPendiente').innerText = actividad.descripcion;
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividad.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo, true);
    xmlhttp.send();
}

function removerMateria() {
    var nombre = cartaSeleccionada.querySelector("#nombreCM").innerText;
    var alerta = document.getElementById("eliminarMateria");
    if(alerta){
        alerta.querySelector("#mensajeEM").innerText = "¿Está seguro de eliminar la materia "+nombre+" con NRC: "+nrc+"?";
        alerta.show();
    }else{
        ons.createElement("eliminarMateria.html", {append: true}).then(function(alerta){
            alerta.querySelector("#mensajeEM").innerText = "¿Está seguro de eliminar la materia "+nombre+" con NRC: "+nrc+"?";
            alerta.show();
        });
    }
}

function esconderEM(){
    document.getElementById("eliminarMateria").hide();
}

function eliminarMateria(){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var respuesta = this.responseText;
            if(respuesta == "¡Materia eliminada!") {
                cartaSeleccionada.remove();
                var menu = document.getElementById('menu');
                document.querySelector('#myNavigator').bringPageTop('menuPrincipal.html', {data: {title: "menuPrincipal"}}).then(menu.close.bind(menu));
            }
            document.getElementById("eliminarMateria").hide();
            ons.notification.alert(respuesta);
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/eliminarAS.php?codigo="+codigo+"&clave="+clave+"&nrc="+nrc, true);
    xmlhttp.send();
}

function agregarCartasActividades(actividades) {
    var content = document.getElementById("menuMateria").getElementsByClassName('page__content')[0];
    var child = content.lastElementChild;  
    for(var i = 0; i < content.childElementCount; i++){ 
        content.removeChild(child); 
        child = content.lastElementChild; 
    } 
    for(i = 0; i < actividades.length; i++){
        var carta = document.getElementById('cardActividad.html').content.cloneNode(true);
        carta.querySelector("#tituloCA").innerText = actividades[i].titulo;
        carta.querySelector("#fechaCA").innerText = actividades[i].fecha;
        content.appendChild(carta);
    }
}

function llenarActividadesPendientes() {
    var actividades = [];
    xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            actividades = JSON.parse(this.responseText);
            if(actividades == "0"){
                actividades = [];
                document.querySelector("#actividadesPendientesM").innerText = "No tienes nada que hacer :D!";
            }else{
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200){
                        var entregas = JSON.parse(this.responseText);
                        if(entregas != "0"){
                            for(var i = 0; i < entregas.length; i++) {
                                var entrega = entregas[i];
                                for(var j = 0; j < actividades.length; j++){
                                    if(entrega.titulo === actividades[j].titulo){
                                        actividades.splice(j,1);
                                    }
                                }
                            }
                        }
                        if(actividades.length > 0){
                            document.querySelector("#actividadesPendientesM").innerText = "Actividades Pendientes: " + actividades.length;
                            agregarCartasActividades(actividades);
                        }else{
                            document.querySelector("#actividadesPendientesM").innerText = "No tienes nada que hacer :D!";
                        }
                    }
                };
                xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerEntregasAlumno.php?codigo="+codigo+"&nrc="+nrc, false);
                xmlhttp.send();
            }
        }
    };
    xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividades.php?clave="+clave+"&nrc="+nrc, false);
    xmlhttp2.send();
    document.getElementById('cargandoActividades').remove();
}

function llenarInfoMateria(nombre) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var seccion = JSON.parse(this.responseText);
            var menu = document.getElementById("menuDMateria");
            var puntos = 0;
            menu.querySelector("#nombreMateria").innerText = nombre;
            menu.querySelector("#claveMateria").innerText = seccion.clave;
            menu.querySelector("#nrcMateria").innerText = seccion.nrc;
            menu.querySelector("#profesorMateria").innerText = seccion.profesor;
            menu.querySelector("#horarioMateria").innerText = seccion.dias + " " + seccion.horario;
            menu.querySelector("#aulaMateria").innerText = seccion.aula;
            var menuCrit = menu.querySelector('#criterios');
            var child = menuCrit.lastElementChild;
            for(var i = 0; i < menuCrit.childElementCount+1; i++){ 
                menuCrit.removeChild(child); 
                child = menuCrit.lastElementChild; 
            }
            xmlhttp1= new XMLHttpRequest();
            xmlhttp1.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var criterios = JSON.parse(this.responseText);
                    for(var i  = 0; i < criterios.length; i++){
                        var pts = criterios[i].puntos;
                        var criterio = criterios[i].criterio;
                        var item = document.getElementById('itemCriterio.html').content.cloneNode(true);
                        item.querySelector("#criterio").innerText = criterio;
                        item.querySelector("#puntos").innerText = pts;
                        puntos += pts;
                        menuCrit.appendChild(item);
                    }
                    menu.querySelector("#puntosMateria").innerText = puntos;
                }
            };
            xmlhttp1.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerPuntos.php?codigo="+codigo+"&clave="+clave+"&nrc="+nrc, true);
            xmlhttp1.send();
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerSeccion.php?clave="+clave+"&nrc="+nrc, true);
    xmlhttp.send();
}

function llenarDatosAlumno(alumno) {
    var valores = alumno.split(",");
    var estado = valores[0];
    if(estado == "A"){
      estado = "Activo";
    }
    var nombre = valores[2];
    var cu = valores[3];
    var carrera = valores[4];
    var foto;
    var params = 'codigo='+codigo+"&nip="+nip;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            foto = this.responseText.split('foto":');
            carta.querySelector("#imagenAlumno").setAttribute('src', foto[1]);
        }
    };
    xmlhttp.open("POST", "https://dcc.000webhostapp.com/infoEstudiante.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
    var carta = document.querySelector("#infoAlumno");
    carta.querySelector("#nombreAlumno").innerText = nombre;
    carta.querySelector("#codigoAlumno").innerText = codigo;
    carta.querySelector("#cuAlumno").innerText = cu;
    carta.querySelector("#carreraAlumno").innerText = carrera;
    carta.querySelector("#estatusAlumno").innerText = estado;
}

function ingresar() {
    var page = document.getElementById("content");
    codigo = page.querySelector("#codigo").value;
    nip = page.querySelector("#nip").value;
    var params = 'codigo='+codigo+"&nip="+nip;
    var alumno;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
                alumno = this.responseText;
                if(alumno > "0"){
                    llenarDatosAlumno(alumno);
                    document.querySelector('#myNavigator').pushPage('menuPrincipal.html', {data: {title: 'Menú Principal'}});
                }else{
                    alert("¡Código o Nip incorrecto!");   
                }
        }
    };
    xmlhttp.open("POST", "https://dcc.000webhostapp.com/pruebaLogin.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);   
}

function llenarListaClaves () {
    var lista = document.getElementById("clavesAM");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var listado = JSON.parse(this.responseText);
            for(var i = 0; i < listado.length; i++) {
                var materia = listado[i];
                var opcion = document.createElement("option");
                opcion.value= materia.clave;
                opcion.innerText = materia.clave; 
                lista.appendChild(opcion);
            }
            if(listado.length > 0){
                llenarNRCS(listado[0].clave);
            }
            ons.compile(lista);
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerMaterias.php", true);
    xmlhttp.send();
}

function llenarNRCS (clave) {
    var nrcs = document.getElementById("nrcsAM");
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
                op.innerText = seccion.nrc;
                nrcs.appendChild(op);
            }
        }
    };
    xmlhttpn.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerSecciones.php?clave="+clave, true);
    xmlhttpn.send();
}

function claveCambio(){
    var listaC = document.getElementById("clavesAM");
    var clave = listaC.options[listaC.selectedIndex].value;
    llenarNRCS(clave);
}

function agregarMateria(){
    var dialogAM = document.getElementById('agregarMateria');
    if (dialogAM) {
        dialogAM.show();
    } else {
        ons.createElement('agregarMateria.html', { append: true })
        .then(function(dialogAM) {
          llenarListaClaves();
          dialogAM.show();
        });
    }
}

function cargarMaterias(menu){
    xmlhttpn = new XMLHttpRequest();
    xmlhttpn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var materias = JSON.parse(this.responseText);
            for(i = 0; i < materias.length; i++){
                var seccion = materias[i];
                var carta = document.getElementById('cardMateria.html').content.cloneNode(true);
                llenarCarta(carta, seccion.clave, seccion.nrc);
                menu.getElementsByClassName('page__content')[0].appendChild(carta);
            }
            document.getElementById('cargandoMaterias').remove();
        }
    };
    xmlhttpn.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerInfoMaterias.php?codigo="+codigo, true);
    xmlhttpn.send();    
}

function llenarCarta(carta, clave, nrc){
    var nombre = "";
    var horario = "";
    var aula = "";
    var pendientes = "";
    xmlhttpn = new XMLHttpRequest();
    xmlhttpn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            nombre = JSON.parse(this.responseText).nombre;
            carta.querySelector('#nombreCM').innerText = nombre;
        }
    };
    xmlhttpn.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerMateria.php?clave="+clave, false);
    xmlhttpn.send();
    xmlhttp1 = new XMLHttpRequest();
    xmlhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var seccion = JSON.parse(this.responseText);
            horario = seccion.dias + " " + seccion.horario;
            aula = seccion.aula;
            carta.querySelector('#horarioCM').innerText = horario;
            carta.querySelector('#aulaCM').innerText = aula;
            carta.querySelector('#claveNRC').innerText = clave+","+nrc;
        }
    };
    xmlhttp1.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerSeccion.php?clave="+clave+"&nrc="+nrc, false);
    xmlhttp1.send();
    var actividades = [];
    xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            actividades = JSON.parse(this.responseText);
            if(actividades == "0"){
                actividades = [];
            }else{
                xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200){
                        var entregas = JSON.parse(this.responseText);
                        if(entregas != "0"){
                            for(var i = 0; i < entregas.length; i++) {
                                var entrega = entregas[i];
                                for(var j = 0; j < actividades.length; j++){
                                    if(entrega.titulo === actividades[j].titulo){
                                        actividades.splice(j,1);
                                    }
                                }
                            }
                        }
                        if(actividades.length > 0){
                            pendientes = "Actividades Pendientes: " + actividades.length;
                            carta.querySelector('#pendientesCM').innerText = pendientes;
                        }
                    }
                };
                xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerEntregasAlumno.php?codigo="+codigo+"&nrc="+nrc, false);
                xmlhttp.send();
            }
        }
    };
    xmlhttp2.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/obtenerActividades.php?clave="+clave+"&nrc="+nrc, false);
    xmlhttp2.send();
}

function agregar(){
    var listaC = document.getElementById("clavesAM");
    var clave = listaC.options[listaC.selectedIndex].value;
    var listaN = document.getElementById("nrcsAM");
    var nrc = listaN.options[listaN.selectedIndex].value;
    xmlhttpn = new XMLHttpRequest();
    xmlhttpn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            var respuesta = this.responseText;
            document.getElementById('agregarMateria').hide();
            if(respuesta == "1"){
                var carta = document.getElementById('cardMateria.html').content.cloneNode(true);
                llenarCarta(carta, clave, nrc);
                document.getElementById("menuPrincipal").getElementsByClassName('page__content')[0].appendChild(carta);
            }else{
                ons.notification.alert(respuesta);
            }
        }
    };
    xmlhttpn.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarAlumno.php?clave="+clave+"&nrc="+nrc+"&codigo="+codigo, true);
    xmlhttpn.send();
}

function entregarTarea(){
    var titulo = actSeleccionada.querySelector('#tituloCA').innerText;
    var calificacion = 0;
    xmlhttpn = new XMLHttpRequest();
    xmlhttpn.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            ons.notification.alert(this.responseText);
            document.querySelector('#myNavigator').popPage();
        }
    };
    xmlhttpn.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/guardarCalificacion.php?clave="+clave+"&nrc="+nrc+"&titulo="+titulo+"&codigo="+codigo+"&calificacion="+calificacion, true);
    xmlhttpn.send();
}
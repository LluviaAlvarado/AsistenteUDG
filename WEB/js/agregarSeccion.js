function llenarInfo () {
    var url = new URL(window.location.href);
    var clave = url.searchParams.get("clave");
    var nombre = url.searchParams.get("nombre");
    document.getElementById("clave").innerHTML = clave;
    document.getElementById("nombre").innerHTML = nombre;
}

function agregarSeccion () {
    var clave = document.getElementById("clave").innerHTML;
    var nrc = document.getElementById("nrc").value;
    var profesor = document.getElementById("profesor").value;
    var dias = "";
    if(document.getElementById("L").checked){
        dias += "L-";
    }
    if(document.getElementById("M").checked){
        dias += "M-";
    }
    if(document.getElementById("I").checked){
        dias += "I-";
    }
    if(document.getElementById("J").checked){
        dias += "J-";
    }
    if(document.getElementById("V").checked){
        dias += "V-";
    }
    if(document.getElementById("S").checked){
        dias += "S-";
    }
    dias = dias.substring(0, dias.length-1);
    var inicio = document.getElementById("inicio").value;
    var fin = document.getElementById("fin").value;
    var horario = inicio+"-"+fin;
    var aula = document.getElementById("aula").value;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            alert(this.responseText);  
        }
    };
    xmlhttp.open("GET", "https://prointstraycatame.000webhostapp.com/AsistenteUDG/agregarSeccion.php?clave="+clave+"&nrc="+nrc+"&profesor="+profesor+"&dias="+dias+"&horario="+horario+"&aula="+aula, true);
    xmlhttp.send(); 
}
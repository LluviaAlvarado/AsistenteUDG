<?php
$clave = $_GET['clave'];
$nrc = $_GET['nrc'];
$titulo = $_GET['titulo'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="Delete from `Actividad` WHERE clave='$clave' AND nrc='$nrc' AND titulo='$titulo'";
if(mysqli_query($conexion,$sql)){
    $row = mysqli_affected_rows($conexion);
    if ($row > 0){
        echo "¡Se dio de baja la actividad correctamente!";
    }else{
        echo "No se pudo dar de baja la actividad.";
    }
}
mysqli_close($conexion);
?>
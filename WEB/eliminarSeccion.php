<?php
$clave = $_GET['clave'];
$nrc = $_GET['nrc'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="Delete from `Seccion` WHERE clave='$clave' AND nrc='$nrc'";
if(mysqli_query($conexion,$sql)){
    $row = mysqli_affected_rows($conexion);
    if ($row > 0){
        echo "¡Se dio de baja la sección correctamente!";
    }else{
        echo "No se pudo dar de baja la sección.";
    }
}
mysqli_close($conexion);
?>
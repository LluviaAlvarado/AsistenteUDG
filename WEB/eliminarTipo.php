<?php
$clave = $_GET['clave'];
$nrc = $_GET['nrc'];
$tipo = $_GET['tipo'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="Delete from `Criterio` WHERE clave='$clave' AND nrc='$nrc' AND tipo='$tipo'";
if(mysqli_query($conexion,$sql)){
    $row = mysqli_affected_rows($conexion);
    if ($row > 0){
        echo "¡Se dio de baja el criterio correctamente!";
    }else{
        echo "No se pudo dar de baja el criterio.";
    }
}
mysqli_close($conexion);
?>
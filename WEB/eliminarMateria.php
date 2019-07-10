<?php
$clave = $_GET['clave'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="Delete from `Materia` WHERE clave='$clave'";
if(mysqli_query($conexion,$sql)){
    $row = mysqli_affected_rows($conexion);
    if ($row > 0){
        echo "¡Se dio de baja la materia correctamente!";
    }else{
        echo "No se pudo dar de baja la materia.";
    }
}
mysqli_close($conexion);
?>
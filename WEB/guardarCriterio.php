<?php
$clave=$_GET['clave'];
$nrc=(int)$_GET['nrc'];
$tipo=$_GET['tipo'];
$puntos=$_GET['puntos'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="UPDATE `Criterio` SET puntos='$puntos' WHERE clave='$clave' AND nrc='$nrc'";
if(mysqli_query($conexion,$sql)){
   echo "¡Criterio actualizado!";
}else{
   echo "No se pudo actualizar el criterio.";
}
mysqli_close($conexion);
?>
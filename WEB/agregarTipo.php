<?php
$clave=$_GET['clave'];
$nrc=$_GET['nrc'];
$tipo=$_GET['tipo'];
$puntos=$_GET['puntos'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="INSERT INTO `Criterio` (clave,nrc,tipo,puntos)VALUES ('$clave','$nrc','$tipo','$puntos')";
if(mysqli_query($conexion,$sql)){
   echo "¡Criterio agregado!";
}else{
   echo "No se pudo agregar el criterio.";
}
mysqli_close($conexion);
?>
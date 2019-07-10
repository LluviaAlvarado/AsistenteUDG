<?php
$clave=$_GET['clave'];
$nombre=$_GET['nombre'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="INSERT INTO `Materia` (clave,nombre)VALUES ('$clave','$nombre')";
if(mysqli_query($conexion,$sql)){
   echo "¡Materia agregada!";
}else{
   echo "No se pudo agregar la materia.";
}
mysqli_close($conexion);
?>
<?php
$clave=$_GET['clave'];
$nrc=(int)$_GET['nrc'];
$titulo=$_GET['titulo'];
$fecha=$_GET['fecha'];
$tipo=$_GET['tipo'];
$descripcion=$_GET['descripcion'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="INSERT INTO `Actividad` (clave,nrc,titulo,tipo,fecha,descripcion)VALUES ('$clave','$nrc','$titulo','$tipo','$fecha','$descripcion')";
if(mysqli_query($conexion,$sql)){
   echo "¡Actividad agregada!";
}else{
   echo "No se pudo agregar la actividad.";
}
mysqli_close($conexion);
?>
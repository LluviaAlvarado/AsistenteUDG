<?php
$clave=$_GET['clave'];
$nrc=(int)$_GET['nrc'];
$titulo=$_GET['titulo'];
$codigo=$_GET['codigo'];
$puntos=$_GET['puntos'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="UPDATE `Calificacion` SET calificacion='$puntos' WHERE clave='$clave' AND nrc='$nrc' AND titulo='$titulo' AND codigo='$codigo'";
if(mysqli_query($conexion,$sql)){
   echo "¡Calificación actualizada!";
}else{
   echo "No se pudo actualizar la calificación.";
}
mysqli_close($conexion);
?>
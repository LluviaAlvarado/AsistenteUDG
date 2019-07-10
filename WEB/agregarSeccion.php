<?php
$clave=$_GET['clave'];
$nrc=(int)$_GET['nrc'];
$profesor=$_GET['profesor'];
$dias=$_GET['dias'];
$horario=$_GET['horario'];
$aula=$_GET['aula'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="INSERT INTO `Seccion` (clave,nrc,profesor,dias,horario,aula)VALUES ('$clave','$nrc','$profesor','$dias','$horario','$aula')";
if(mysqli_query($conexion,$sql)){
   echo "¡Sección agregada!";
}else{
   echo "No se pudo agregar la sección.";
}
mysqli_close($conexion);
?>
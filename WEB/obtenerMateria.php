<?php
$clave = $_GET['clave'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="SELECT nombre FROM `Materia` WHERE clave='$clave'";
$retval=(mysqli_query($conexion, $sql));
$arr = array();
if(mysqli_num_rows($retval)>0){
    while($row=mysqli_fetch_assoc($retval)){
        $arr = $row;
    }
    echo json_encode($arr);
}else{
    echo "0";
}
mysqli_close($conexion);
?>
<?php
$usuario=$_GET['usuario'];
$password=$_GET['password'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="SELECT * FROM `Admin` WHERE usuario='$usuario'";
$retval=(mysqli_query($conexion, $sql));
$arr = array();
if(mysqli_num_rows($retval)>0){
    while($row=mysqli_fetch_assoc($retval)){
        $arr = $row;
    }
    if($password == $arr['password']){
        echo $usuario;
    }else{
        echo "0";
    }
}else{
    echo "0";
}
mysqli_close($conexion);
?>
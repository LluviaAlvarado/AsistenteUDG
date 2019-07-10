<?php
$codigo = $_GET['codigo'];
$clave = $_GET['clave'];
$nrc = $_GET['nrc'];
$conexion=mysqli_connect("localhost", "id8529957_ame", "toradora96", "id8529957_ameppi");
$sql="SELECT * FROM `Criterio` WHERE clave='$clave' AND nrc='$nrc'";
$retval=(mysqli_query($conexion, $sql));
$arr = array();
if(mysqli_num_rows($retval)>0){
    while($row=mysqli_fetch_assoc($retval)){
        $arr[] = $row;
    }
    json_encode($arr);
    $sql="SELECT * FROM `Calificacion` WHERE codigo='$codigo' AND clave='$clave' AND nrc='$nrc'";
    $retval=(mysqli_query($conexion, $sql));
    $arr1 = array();
    while($row=mysqli_fetch_assoc($retval)){
        $arr1[] = $row;
    }
    json_encode($arr1);
    $sql="SELECT * FROM `Actividad` WHERE clave='$clave' AND nrc='$nrc'";
    $retval=(mysqli_query($conexion, $sql));
    $arr2 = array();
    while($row=mysqli_fetch_assoc($retval)){
        $arr2[] = $row;
    }
    json_encode($arr2);
    $criterios = array();
    foreach ($arr as $criterio) {
        $cantAct = 0;
        $crit = (object)['criterio' => $criterio['tipo']];
        foreach ($arr2 as $actividad){
            $ptsAct = 0;
            if($actividad['tipo'] == $criterio['tipo']){
                $cantAct++;
                foreach ($arr1 as $calificacion){
                    $ptsAct += $calificacion['calificacion'];
                }
            }
        }
        $crit->puntos = (($ptsAct / $cantAct) / 100) * $criterio['puntos'];
        $criterios[] = $crit;
    } 
    echo json_encode($criterios);
}else{
    echo "-1";
}
mysqli_close($conexion);
?>
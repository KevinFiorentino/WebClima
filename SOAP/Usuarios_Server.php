<?php

require_once("../model/dao/UsuariosDao.php");

if(!extension_loaded("soap")){
      dl("php_soap.dll");
}
 
ini_set("soap.wsdl_cache_enabled","0");
$server = new SoapServer("./Usuarios_SOAP.wsdl");
 
function AltaUsuarios($user, $pass, $idCiudad){
    $usuariosDao = new UsuariosDao();

    $usuariosDao->insertUsuario($user, $pass, $idCiudad);

    $user = $usuariosDao->traerUsuarioInsert($user);

    return $user;
}
 
function BajaUsuarios($idUsuario){
    $usuariosDao = new UsuariosDao();

    $usuariosDao->deleteUsuario($idUsuario);

    return "Usuario Borrado Exitosamente";
}

function Pronostico($ciudad){
	$url = 'http://api.openweathermap.org/data/2.5/forecast?q='.$ciudad.'&appid=f3f376b99fe63334a561bad62acb4f94&units=metric';
	$json = file_get_contents($url);

	$arrayResponse = array();
	$arrayResponse = json_decode($json, true);

	$fiveDays = array();


    /**
     *  Día Uno
     */
	$tempMin = $arrayResponse['list'][0]['main']['temp_min'];
    $tempMax = $arrayResponse['list'][0]['main']['temp_max'];
    for ($i = 0; $i < 8; $i++) {
      if($tempMin > $arrayResponse['list'][$i]['main']['temp_min']) {
        $tempMin = $arrayResponse['list'][$i]['main']['temp_min']; 
      }
      if($tempMax < $arrayResponse['list'][$i]['main']['temp_max']) {     
        $tempMax = $arrayResponse['list'][$i]['main']['temp_max']; 
      }
    }

	$clima = new stdClass();
	$clima->tempMin = $tempMin;
	$clima->tempMax = $tempMax;

    array_push($fiveDays, $clima);


    /**
     *  Día Dos
     */
	$tempMin = $arrayResponse['list'][8]['main']['temp_min'];
    $tempMax = $arrayResponse['list'][8]['main']['temp_max'];
    for ($i = 8; $i < 16; $i++) {
      if($tempMin > $arrayResponse['list'][$i]['main']['temp_min']) {
        $tempMin = $arrayResponse['list'][$i]['main']['temp_min']; 
      }
      if($tempMax < $arrayResponse['list'][$i]['main']['temp_max']) {     
        $tempMax = $arrayResponse['list'][$i]['main']['temp_max']; 
      }
    }

	$clima2 = new stdClass();
	$clima2->tempMin = $tempMin;
	$clima2->tempMax = $tempMax;

    array_push($fiveDays, $clima2);


    /**
     *  Día Tres
     */
	$tempMin = $arrayResponse['list'][16]['main']['temp_min'];
    $tempMax = $arrayResponse['list'][16]['main']['temp_max'];
    for ($i = 16; $i < 24; $i++) {
      if($tempMin > $arrayResponse['list'][$i]['main']['temp_min']) {
        $tempMin = $arrayResponse['list'][$i]['main']['temp_min']; 
      }
      if($tempMax < $arrayResponse['list'][$i]['main']['temp_max']) {     
        $tempMax = $arrayResponse['list'][$i]['main']['temp_max']; 
      }
    }

	$clima3 = new stdClass();
	$clima3->tempMin = $tempMin;
	$clima3->tempMax = $tempMax;

    array_push($fiveDays, $clima3);


    /**
     *  Día Cuatro
     */
	$tempMin = $arrayResponse['list'][24]['main']['temp_min'];
    $tempMax = $arrayResponse['list'][24]['main']['temp_max'];
    for ($i = 24; $i < 32; $i++) {
      if($tempMin > $arrayResponse['list'][$i]['main']['temp_min']) {
        $tempMin = $arrayResponse['list'][$i]['main']['temp_min']; 
      }
      if($tempMax < $arrayResponse['list'][$i]['main']['temp_max']) {     
        $tempMax = $arrayResponse['list'][$i]['main']['temp_max']; 
      }
    }

	$clima4 = new stdClass();
	$clima4->tempMin = $tempMin;
	$clima4->tempMax = $tempMax;

    array_push($fiveDays, $clima4);

 
    /**
     *  Día Cinco
     */
	$tempMin = $arrayResponse['list'][32]['main']['temp_min'];
    $tempMax = $arrayResponse['list'][32]['main']['temp_max'];
    for ($i = 32; $i < 39; $i++) {
      if($tempMin > $arrayResponse['list'][$i]['main']['temp_min']) {
        $tempMin = $arrayResponse['list'][$i]['main']['temp_min']; 
      }
      if($tempMax < $arrayResponse['list'][$i]['main']['temp_max']) {     
        $tempMax = $arrayResponse['list'][$i]['main']['temp_max']; 
      }
    }

	$clima5 = new stdClass();
	$clima5->tempMin = $tempMin;
	$clima5->tempMax = $tempMax;

    array_push($fiveDays, $clima5);


	return $fiveDays;
	//return $arrayResponse['list'];
}
 

$server->AddFunction("AltaUsuarios");
$server->AddFunction("BajaUsuarios");
$server->AddFunction("Pronostico");
$server->handle();

?>
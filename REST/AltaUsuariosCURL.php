<?php

session_start();

//API URL
$url = 'http://localhost/WebClima/usuario';

//Creamos CURL
$curl = curl_init($url);

$user = $_POST['user'];
$pass = $_POST['pass'];
$idC = $_POST['ciudad'];

//Armamos array con los datos del formulario
$data = array(
    'user' => $user,
    'pass' => $pass,
    'idCiudad' => $idC
);
$json = json_encode($data);	//jsonencodeamos el array


curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

//Capturamos respuesta de la API
$response = curl_exec($curl);

//Cerramos CURL
curl_close($curl);

$res = array();
$res = json_decode($response, true);	//desjsonencodeamos la respuesta

//Usuario creado correctamente, redirecciona a Bienvenido
if($res['status'] == 'success') {
	$_SESSION['idUsuario'] = $res['message']['idUsuario'];
	$_SESSION['ciudad'] = $res['message']['ciudad'];

	require_once("../view/Bienvenido.html");
}
else{	//Error al crear el Usuario, vuelve a Registrarme
	require_once("../view/Registrarme.html");
}
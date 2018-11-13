<?php

session_start();

require_once("../model/dao/UsuariosDao.php");

//API URL
$url = 'http://localhost/WebClima/usuario';

//Creamos CURL
$curl = curl_init($url);

$ciudad = $_POST['ciudad'];
$id = $_POST['id'];

//Armamos array con los datos del formulario
$data = array(
    'idCiudad' => $ciudad,
    'idUsuario' => $id
);
$json = json_encode($data);	//jsonencodeamos el array

curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT"); 

//Capturamos respuesta de la API
$response = curl_exec($curl);

//Cerramos CURL
curl_close($curl);

$res = array();
$res = json_decode($response, true);	//desjsonencodeamos la respuesta



$usuarioDao = new UsuariosDao();

$resUser = $usuarioDao->traerUsuario($_SESSION['idUsuario']);

$_SESSION['ciudad'] = $resUser->getCiudad();

$_SESSION['modUser'] = "Usuario modificado correctamente !";
require_once("../../WebClima/view/Perfil.php");
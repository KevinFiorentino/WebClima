<?php

session_start();

//API URL
$url = 'http://localhost/WebClima/usuario';

//Creamos CURL
$curl = curl_init($url);

$id = $_POST['id'];

//Armamos array con los datos del formulario
$data = array(
    'idUsuario' => $id
);
$json = json_encode($data);	//jsonencodeamos el array

curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE"); 

//Capturamos respuesta de la API
$response = curl_exec($curl);

//Cerramos CURL
curl_close($curl);

$res = array();
$res = json_decode($response, true);	//desjsonencodeamos la respuesta

require_once("../../WebClima/index.html");
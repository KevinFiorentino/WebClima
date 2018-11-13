<?php

@session_start();

require_once("../model/dao/UsuariosDao.php");

$user = $_POST['user'];
$pass = $_POST['pass'];

$usuariosDao = new UsuariosDao();

$logeo = $usuariosDao->login($user, $pass);

if($logeo != false) {
	$_SESSION['idUsuario'] = $logeo->idUsuario;
	$_SESSION['ciudad'] = $logeo->ciudad;

	require_once("../view/Bienvenido.html");
}
else{
	require_once("../index.html");
}
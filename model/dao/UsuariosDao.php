<?php

if(file_exists("../WebClima/model/Usuarios.php")){
    require_once("../WebClima/model/Usuarios.php"); }
if(file_exists("../WebClima/model/dao/DataSource.php")){
    require_once('../WebClima/model/dao/DataSource.php'); }

if(file_exists("../model/Usuarios.php")){
    require_once("../model/Usuarios.php"); }

require_once('DataSource.php');


class UsuariosDao {

    /**
     *	GET
     */
	public function traerUsuarios(){
    	$dataSource = new DataSource();
    	$query = $dataSource->ejecutarQuery("SELECT * FROM usuario");

    	$lstUsuarios = array();
    	$usuario = NULL;

    	while($row = odbc_fetch_array($query)) {       
    		$usuario = new Usuarios($row['idCiudad'], $row['user'], $row['pass'], $row['idCiudad']);
    		array_push($lstUsuarios, $usuario);
		}
    	return $lstUsuarios;
    }

    /**
     *	GET
     */
    public function traerUsuario($id){
    	$dataSource = new DataSource();
    	$query = $dataSource->ejecutarQuery("SELECT * FROM usuario JOIN ciudad ON usuario.idCiudad = ciudad.idCiudad WHERE idUsuario =" . $id);

    	$usuario = NULL;

    	while($row = odbc_fetch_array($query)) {       
    		$usuario = new Usuarios($row['idCiudad'], $row['user'], $row['pass'], $row['ciudad']);
		}
    	return $usuario;
    }

    public function traerUsuarioInsert($user){
        $dataSource = new DataSource();
        $query = $dataSource->ejecutarQuery("SELECT * FROM usuario 
            JOIN ciudad ON usuario.idCiudad = ciudad.idCiudad WHERE user ='" . $user . "';");

        $usuario = NULL;

        while($row = odbc_fetch_array($query)) {       
            $usuario = new Usuarios($row['idUsuario'], $row['user'], $row['pass'], $row['ciudad']);
        }
        return $usuario;
    }

    /**
     *	POST
     */
    public function insertUsuario($user = '', $pass = '', $idCiudad = ''){
        $dataSource = new DataSource();
    	$dataSource->ejecutarQuery("INSERT INTO usuario(user, pass, idCiudad) 
    											VALUES('".$user."', '".$pass."', '".$idCiudad."')");  	

        $query = $dataSource->ejecutarQuery("SELECT idUsuario, ciudad FROM usuario
                    JOIN ciudad ON usuario.idCiudad = ciudad.idCiudad
                    WHERE idUsuario = (SELECT MAX(idUsuario) FROM usuario);");

        $usuario = NULL;
        while($row = odbc_fetch_array($query)) {       
            $usuario = new Usuarios();
            $usuario->setIdUsuario($row['idUsuario']);
            $usuario->setCiudad($row['ciudad']);
        }
        return $usuario;
    }

    /**
     *	PUT
     */
    public function updateUsuario($idUsuario, $idCiudad){
        $dataSource = new DataSource();
    	$query = $dataSource->ejecutarQuery("UPDATE usuario 
    		SET idCiudad = ".$idCiudad." WHERE idUsuario = ".$idUsuario);
    }

    /**
     *	DELETE
     */
    public function deleteUsuario($idUsuario){
        $dataSource = new DataSource();
    	$query = $dataSource->ejecutarQuery("DELETE FROM usuario WHERE idUsuario =" . $idUsuario);
    }



    /**
     *  LOGIN, NO ES POR REST
     */
    public function login($user, $pass){
        $dataSource = new DataSource();
        $query = $dataSource->ejecutarQuery("SELECT idUsuario, ciudad FROM usuario 
                            JOIN ciudad ON usuario.idCiudad = ciudad.idCiudad
                            WHERE user = '".$user."' AND pass = '".$pass."'");

        $usuario = NULL;
        if(odbc_num_rows($query) > 0){
            while($row = odbc_fetch_array($query)) {     
                $usuario = new Usuarios();
                $usuario->setIdUsuario($row['idUsuario']);
                $usuario->setCiudad($row['ciudad']);

                return $usuario;
            }
        }
        else {
            return false; 
        }
    }


}
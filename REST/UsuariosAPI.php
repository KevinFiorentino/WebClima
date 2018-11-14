<?php

require_once("../WebClima/model/dao/UsuariosDao.php");

class UsuariosAPI {    

    public function API(){
        header('Content-Type: application/json');                
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case 'GET': //Consulta
                $this->getUsuario();
                break;     
            case 'POST': //Insert
                $this->insertUsuario();
                break;                
            case 'PUT': //Update
                $this->updateUsuario();
                break;      
            case 'DELETE': //Delete
                $this->deleteUsuario();
                break;
            default://metodo NO soportado
                echo 'METODO NO SOPORTADO';
                break;
        }
    }

    /**
     * Respuesta al cliente
     * @param int $code Codigo de respuesta HTTP
     * @param String $status indica el estado de la respuesta puede ser "success" o "error"
     * @param String $message Descripcion de lo ocurrido
     */
     function response($code=200, $status="", $message="") {
        http_response_code($code);
        if( !empty($status) && !empty($message) ){
            $response = array("status" => $status ,"message"=>$message);  
            echo json_encode($response, JSON_PRETTY_PRINT);    
        }            
     } 


    /**
     *  GET
     */
    function getUsuario(){

        if($_GET['action'] == 'usuario'){     

            $usuariosDao = new UsuariosDao();

            if(isset($_GET['id'])){ //muestra 1 solo registro si es que existiera ID                 
                $response = $usuariosDao->traerUsuario($_GET['id']); 
                echo json_encode($response, JSON_PRETTY_PRINT);
            } 
            else{ //muestra todos los registros                     
                $response = $usuariosDao->traerUsuarios(); 
                echo json_encode($response, JSON_PRETTY_PRINT); }
            } 
            else{
                $this->response(400); 
        }     
    }


    /**
     *  POST
     */
    function insertUsuario(){
        if($_GET['action'] == 'usuario'){   
            $obj = json_decode( file_get_contents('php://input') );   
            $objArr = (array)$obj;
        if (empty($objArr)){
            $this->response(422,"error","Nothing to add. Check json");                           
        }
        else if( isset($obj->user) && isset($obj->pass) && isset($obj->idCiudad) ) {
            $usuariosDao = new UsuariosDao();     
            $user = $usuariosDao->insertUsuario($obj->user, $obj->pass, $obj->idCiudad);
            //En el mensaje, pasamos el usuario que acabamos de dar de alta
            $this->response(200,"success",$user);                             
        }
        else{
             $this->response(422,"error","The property is not defined");
        }
        }
        else {               
            $this->response(400);
        }  
    }

    /**
     *  PUT
     */
    function updateUsuario(){
        if($_GET['action'] == 'usuario'){   
            $obj = json_decode( file_get_contents('php://input') );   
            $objArr = (array)$obj;
        if (empty($objArr)){
            $this->response(422,"error","Nothing to add. Check json");                           
        }
        else if( isset($obj->idUsuario) && isset($obj->idCiudad) ) {
            $usuariosDao = new UsuariosDao();     
            $usuariosDao->updateUsuario($obj->idUsuario, $obj->idCiudad);
            $this->response(200,"success","Usuario Modificado");                             
        }
        else{
             $this->response(422,"error","The property is not defined");
        }
        }
        else {               
            $this->response(400);
        }  
    }

    /**
     *  DELETE
     */
    function deleteUsuario(){
        if($_GET['action'] == 'usuario'){   
            $obj = json_decode( file_get_contents('php://input') );   
            $objArr = (array)$obj;
        if (empty($objArr)){
            $this->response(422,"error","Nothing to add. Check json");                           
        }
        else if(isset($obj->idUsuario)) {
            $usuariosDao = new UsuariosDao();     
            $usuariosDao->deleteUsuario($obj->idUsuario);
            $this->response(200,"success","Usuario Borrado Exitosamente");                             
        }
        else{
             $this->response(422,"error","The property is not defined");
        }
        }
        else {               
            $this->response(400);
        }  
    }
    
}
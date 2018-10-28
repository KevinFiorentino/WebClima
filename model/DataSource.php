<?php

class DataSource {
    
    private $dsn;
    private $cid;
    
    /** Conectar a Origen de Datos ODBC */
    public function __construct() {     
        $this->dsn = "OpenWeatherMap";
        $this->cid = odbc_connect($this->dsn, "", "");
        
        if(!$this->cid) {
            exit("Error en la Conexion al ODBC"); }          
    }
    
    /** Desconectar ODBC */
    public function __destruct() {
        odbc_close_all();
    }
    
    
    /**
     * Ejecuta una consulta y devuelve la Tabla de Datos como resultado.
     * 
     * @param string $sql -> Sentencia SQL
     * @return resource|number -> Retorna la Tabla de Datos o un 0 en caso de no haber encontrado nada en la consulta.
     */
    public function ejecutarQuery($sql = "") {
        if($sql != "") {
            $tablaDatos = odbc_exec($this->cid, $sql) or die (exit ("Error al ejecutar Query ODBC"));          
            return $tablaDatos;
        }
        else{
            return 0;
        }
    }
    
    
    /**
     * Ejecuta un INSERT, UPDATE, DELETE y devuelve el número de Filas afectadas.
     * 
     * @param string $sql -> Sentencia SQL
     * @return number -> Número de Filas afectadas.
     */
    public function ejecutarABM($sql = "") {
        if($sql != "") {
            $idQuery = odbc_exec($this->cid, $sql) or die (exit ("Error al ejecutar Query ODBC"));
            $numFilasAfectadas = odbc_num_rows($idQuery);
            return $numFilasAfectadas;
        }
        else{
            return 0;
        }
    }
    
    
    /**
     * Ejecutar un Pocedimiento SIN parámetros de Salida @out
     * 
     * @param string $call  -> Llamada al procedimiento
     * @param array $params -> Parámetros del Procedimiento
     * @return number -> Retorna la consulta si se ejecutó correctamente o 0 en caso de error.
     */
    public function ejecutarProcedure($call) {
        
        if($query = odbc_exec($this->cid, $call)) {
            return $query;
        }
        else {
            return 0;
        }
       
    }
    
    
    /**
     * Ejecutar un Procedimiento CON un parametro de Salida @out, SOLO UN PARÁMETRO DE SALIDA
     * 
     * @param string $sql -> SQL para capturar el parametro de Salida.
     * @param string $call -> Llamada al Procedimiento
     * @param array $params -> Parametros del Procedimiento
     * @return resource|number -> Retorna el parámetro de salida en caso de éxito o un 0 si salió mal o no encontró nada en el OUT.
     */
    public function ejecturaProcOut($call = "", array $params) {
        $callPrepare = odbc_prepare($this->cid, $call);
        $out = null;
        
        if(!$callPrepare) echo "Error en la preparacion del procedimiento";
        
        if(odbc_execute($callPrepare, $params)) {
            $sql = "SELECT @out;";
            $resultOut = odbc_exec($this->cid, $sql) or die (exit("Error ODBC"));
            
            while($valorOut = odbc_fetch_array($resultOut)) {
                $out = $valorOut['@out'];
                if($out == null) {
                    $out = 0;
                }   
            }      
            return $out;
        }
        else {
            return 0; 
        } 
    }

    
}
    
?>
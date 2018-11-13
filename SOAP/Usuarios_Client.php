<?php

try{
 $clienteSOAP = new SoapClient('http://localhost/WebClima/SOAP/Usuarios_SOAP.wsdl');
 
 /*
 $alta = $clienteSOAP->AltaUsuarios('GCBA', '1111', 6147439);
 $baja = $clienteSOAP->BajaUsuarios(8);
 
 print_r($alta);
 echo $baja;
*/

 $pronostico = $clienteSOAP->Pronostico("Londres");

 echo $pronostico;
 
} catch(SoapFault $e){
 	var_dump($e);
}


?>
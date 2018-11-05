<?php

require_once('../model/DataSource.php');

$dataSource = new DataSource();

$query = $dataSource->ejecutarQuery("SELECT ciudad, codCiudad FROM ciudad ORDER BY cantBusquedas DESC LIMIT 5;");

$json = '{"ciudades": [';

while($row = odbc_fetch_array($query)) {       
    $json .=  '{"ciudad" : "' . $row['ciudad'] . ', ' . $row['codCiudad'] . '"}, ';
}

$length = strlen($json);
$json = substr($json, 0, $length-2);		//Quitar última coma

$json .= ']}';

header('Content-type: application/json');

echo $json;

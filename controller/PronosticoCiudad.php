<?php

session_start();

$url ='http://api.openweathermap.org/data/2.5/forecast?q=' . $_SESSION['ciudad'] . '&appid=f3f376b99fe63334a561bad62acb4f94&units=metric';

$json = file_get_contents($url);

echo $json;
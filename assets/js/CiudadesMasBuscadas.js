angular.module('OpenWatherMapTop5', []).controller('OpenWatherMapTop5', function($scope, $http){


  $http.get("http://localhost/WebClima/controller/CiudadesMasBuscadas.php").
  then(function(responseCiudades){

  $scope.ciudadesMasBuscadas = responseCiudades.data;
  
  for(k = 0; k < 5; k++) {

  //**************************************** API OpenWeatherMap ****************************************

  $scope.showImg = true;
  
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  //var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

  $scope.fiveDays = [];
  $scope.ciudadObj = [];

  $http.get("http://api.openweathermap.org/data/2.5/forecast?q="+$scope.ciudadesMasBuscadas.ciudades[k].ciudad+"&appid=f3f376b99fe63334a561bad62acb4f94&units=metric").
  then(function(response) {

    $scope.showImg = true;                                    //Hacemos que aparezca las Imágenes

    $scope.clima = response.data;
    var length = $scope.clima.list.length;                    //Longitud de la respuesta

    var c = new Ciudad($scope.clima.city.name);
    $scope.ciudadObj.push(c);                   //Guardamos las ciudades

    var f = new Date();
    var dayWeek = f.getDay();
    var dayCurrent = f.getDate();
    var mouth = meses[f.getMonth()];

    /**
     *  Día Uno
     */
    var tempMin = $scope.clima.list[0].main.temp_min;         //Tomamos min y max para luego comparar
    var tempMax = $scope.clima.list[0].main.temp_max;
    var idImg_1 = [];                                         //Array para guardar los códigos de imagenes
    for (i = 0; i < 8; i++) {
      if(tempMin > $scope.clima.list[i].main.temp_min) {      //Calculamos temp Minima más Minima
        tempMin = $scope.clima.list[i].main.temp_min; 
      }
      if(tempMax < $scope.clima.list[i].main.temp_max) {      //Calculamos temp Maxima más Maxima
        tempMax = $scope.clima.list[i].main.temp_max; 
      }
      idImg_1.push($scope.clima.list[i].weather[0].id);       //Guardo código del clima
    };

    var fech = calcFecha(dayWeek, 1, dayCurrent, mouth);      //Calculamos fecha
    img = imgClima(idImg_1);                                  //Calculamos Imagen según los códigos

    var day_1 = new Clima(tempMin.toFixed(1), tempMax.toFixed(1), fech, img);  //toFixed(1): Un solo decimal
    $scope.fiveDays.push(day_1); 


    /**
     *  Día Dos
     */
    var tempMin = $scope.clima.list[8].main.temp_min;
    var tempMax = $scope.clima.list[8].main.temp_max;
    var idImg_2 = [];
    for (i = 8; i < 16; i++) {
      if(tempMin > $scope.clima.list[i].main.temp_min) {
        tempMin = $scope.clima.list[i].main.temp_min; 
      }
      if(tempMax < $scope.clima.list[i].main.temp_max) {
        tempMax = $scope.clima.list[i].main.temp_max; 
      }
        idImg_2.push($scope.clima.list[i].weather[0].id);
    };
    var fech = calcFecha(dayWeek, 2, dayCurrent, mouth);
    img = imgClima(idImg_2);
    var day_2 = new Clima(tempMin.toFixed(1), tempMax.toFixed(1), fech, img);
    $scope.fiveDays.push(day_2); 


    /**
     *  Día Tres
     */
    var tempMin = $scope.clima.list[16].main.temp_min;
    var tempMax = $scope.clima.list[16].main.temp_max;
    var idImg_3 = [];
    for (i = 16; i < 24; i++) {
      if(tempMin > $scope.clima.list[i].main.temp_min) {
        tempMin = $scope.clima.list[i].main.temp_min; 
      }
      if(tempMax < $scope.clima.list[i].main.temp_max) {
        tempMax = $scope.clima.list[i].main.temp_max; 
      }
        idImg_3.push($scope.clima.list[i].weather[0].id);
    };
    var fech = calcFecha(dayWeek, 3, dayCurrent, mouth);
    img = imgClima(idImg_3);
    var day_3 = new Clima(tempMin.toFixed(1), tempMax.toFixed(1), fech, img);
    $scope.fiveDays.push(day_3);


    /**
     *  Día Cuatro
     */
    var tempMin = $scope.clima.list[24].main.temp_min;
    var tempMax = $scope.clima.list[24].main.temp_max;
    var idImg_4 = [];
    for (i = 24; i < 32; i++) {
      if(tempMin > $scope.clima.list[i].main.temp_min) {
        tempMin = $scope.clima.list[i].main.temp_min; 
      }
      if(tempMax < $scope.clima.list[i].main.temp_max) {
        tempMax = $scope.clima.list[i].main.temp_max; 
      }
        idImg_4.push($scope.clima.list[i].weather[0].id);
    };
    var fech = calcFecha(dayWeek, 4, dayCurrent, mouth);
    img = imgClima(idImg_4);
    var day_4 = new Clima(tempMin.toFixed(1), tempMax.toFixed(1), fech, img);
    $scope.fiveDays.push(day_4);

 
    /**
     *  Día Cinco
     */
    var tempMin = $scope.clima.list[32].main.temp_min;
    var tempMax = $scope.clima.list[32].main.temp_max;
    var idImg_5 = [];
    for (i = 32; i < length; i++) {
     
      if(tempMin > $scope.clima.list[i].main.temp_min) {
        tempMin = $scope.clima.list[i].main.temp_min; 
      }
      if(tempMax < $scope.clima.list[i].main.temp_max) {
        tempMax = $scope.clima.list[i].main.temp_max; 
      }
        idImg_5.push($scope.clima.list[i].weather[0].id);
    };
    var fech = calcFecha(dayWeek, 5, dayCurrent, mouth);
    img = imgClima(idImg_5);
    var day_5 = new Clima(tempMin.toFixed(1), tempMax.toFixed(1), fech, img);
    $scope.fiveDays.push(day_5);

  }); //END HTTP OpenWeatherMap

}   //ENDFOR

}); //END HTTP responseciudades

}); //END Angular
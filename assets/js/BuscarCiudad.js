angular.module('OpenWatherMap', []).controller('OpenWatherMap', function($scope, $http){

//**************************************** Sugerencias Ciudades ****************************************

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input id='aux' type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function(e) {

              inp.value = this.getElementsByTagName("input")[0].value;      //GUARDAMOS LA CIUDAD EN EL INPUT DE LA VISTA ****

              $scope.city = this.getElementsByTagName("input")[0].value;    //GUARDAMOS LA CIUDAD EN EL $SCOPE.CITY **********

              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { 
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


$scope.sugerenciasCiudad = function() {

    $scope.cities = [];
    if($scope.city.length >= 3) {

        $http.get("http://localhost/WebClima/Controller/SugerenciasCiudad.php?sugerencias=" + $scope.city).
        then(function(response){

          $scope.ciudades = response.data;
          length = $scope.ciudades.ciudades.length;

          $scope.cities = [];
          for(i = 0; i < length; i++) {
              $scope.cities.push($scope.ciudades.ciudades[i].ciudad);
          }
          autocomplete(document.getElementById("lstCities"), $scope.cities);    //Cargamos sugerencias a la vista
        });
    }
    else {
        $scope.cities = [];
    }
}

  //**************************************** API OpenWeatherMap ****************************************

  $scope.showImg = true;
  
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  //var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

  $scope.buscarCiudad = function() {

  $scope.fiveDays = [];
  $scope.ciudad = "";

  //Consumimos el servicio desde PHP que se ocupa de la ciudad del usuario
  $http.get("http://api.openweathermap.org/data/2.5/forecast?q="+$scope.city+"&appid=f3f376b99fe63334a561bad62acb4f94&units=metric").
  then(function(response) {

    $scope.showImg = true;                                    //Hacemos que aparezca las Imágenes

    $scope.clima = response.data;
    var length = $scope.clima.list.length;                    //Longitud de la respuesta

    $scope.ciudad = $scope.clima.city.name;                   //Guardamos la ciudad

    //Guardamos Latitud y Longitud para Google Clouds
    $scope.latitud = $scope.clima.city.coord.lat;
    $scope.longitud = $scope.clima.city.coord.lon;

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


    //**************************************** API Google Clouds ****************************************

    var cityMap = {lat: $scope.latitud, lng: $scope.longitud};
    var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 5, center: cityMap});
    var marker = new google.maps.Marker({position: cityMap, map: map});

  });

 }

});

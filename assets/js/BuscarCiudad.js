angular.module('OpenWatherMap', []).controller('OpenWatherMap', function($scope, $http){





function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input id='aux' type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/

              inp.value = this.getElementsByTagName("input")[0].value;      //GUARDAMOS LA CIUDAD EN EL INPUT DE LA VISTA ****

              $scope.city = this.getElementsByTagName("input")[0].value;    //GUARDAMOS LA CIUDAD EN EL $SCOPE.CITY **********

              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}
/*An array containing all the country names in the world:*/
//var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
var countries = ["Paris", "Madrid", "München"];

autocomplete(document.getElementById("lstCities"), countries);

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



  });

 }

});
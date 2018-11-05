  //Clase para crear objetos Clima
  function Clima(min, max, day, img) {
    this.min = min;
    this.max = max;
    this.day = day;
    this.img = img;

    this.getMin = function() {
      return this.min; }
    this.getMax = function() {
      return this.max; }
    this.getDay = function() {
      return this.day; }
    this.getImg = function() {
      return this.img; }
    
  }

  function Ciudad(name) {
    this.name = name;

    this.getName = function() {
      return this.name; }
  }

  /**
   *  Función que devuelve día de la semana, fecha y mes dependiendo el día que se calcula, sea del primero al quito pronostico
   *
   *  @param dayWeek: día actual de la semana, se le suma 'día' para determinar el día del pronostico
   *  @param dia: dia que se está calculando del pronostico (1 al 5)
   *  @param day: día actual del mes (HOY)
   *  @param mounth: mes del pronostico, no está validado
   */
  function calcFecha(dayWeek, dia, day, mounth) {

    w = dayWeeek(dayWeek + dia);
    d = day + dia;                    //NO ESTÁ CONTEMPLADO EL CAMBIO DE MES

    return w + ", " + d + " de " + mounth;
  }

  function dayWeeek(w) {
    var week = "";
    switch(w) {
      case 0 : case 7  : { week = 'Domingo';   };break;
      case 1 : case 8  : { week = 'Lunes';     };break;
      case 2 : case 9  : { week = 'Martes';    };break;
      case 3 : case 10 : { week = 'Miercoles'; };break;
      case 4 : case 11 : { week = 'Jueves';    };break;
      case 5 :           { week = 'Viernes';   };break;
      case 6 :           { week = 'Sabado';    };break;
    }
    return week;
  }

  //********************

  //Función para determinar la imágen del clima dependiendo cúal código predomine en el array
  function imgClima(codigos) {
    //Sumamos los códigos para verificar cúal predomina, cada rango de códigos se
      //guarda en un indice distinto del array
    /*
      0 - 2xx       ->  Tormenta
      1 - 3xx       ->  Llovizna
      2 - 500 a 505 ->  Lluvia tipo 1
      3 - 520 a 550 ->  Lluvia tipo 2
      4 - 6xx       ->  Snow
      5 - 7xx       ->  Atmosfera
      6 - 800       ->  Despejado
      7 - 8xx       ->  Nubes

      4 - Código 511  ->  Snow
    */   

    var img = "http://openweathermap.org/img/w/02d.png";    //Imagen por defecto
    var sumCod = [];

    for(j = 0; j < 8; j++) {    //Inicializamos array en 0 cada posición
      sumCod[j] = 0;
    }

    for(i = 0; i < codigos.length; i++) {
      var cod = codigos[i];
      if( (cod >= 200) && (cod < 250) ) {    //Tormenta
          sumCod[0] = sumCod[0] + 1;
      }
      if( (cod >= 300) && (cod < 350) ) {    //Llovizna
          sumCod[1] = sumCod[1] + 1;
      }
      if( (cod >= 500) && (cod < 505) ) {    //Lluvia tipo 1
          sumCod[2] = sumCod[2] + 1;
      }
      if( (cod >= 520) && (cod < 550) ) {    //Lluvia tipo 2
          sumCod[3] = sumCod[3] + 1;
      }
      if( ((cod >= 600) && (cod < 650)) || (cod == 511) ) {    //Snow
          sumCod[4] = sumCod[4] + 1;
      }
      if( (cod >= 700) && (cod < 790) ) {     //Atmosfera
          sumCod[5] = sumCod[5] + 1;
      }
      if(cod == 800) {                        //Despejado
          sumCod[6] = sumCod[6] + 1;
      }
      if(cod > 800) {                         //Nublado
          sumCod[7] = sumCod[7] + 1;
      }
    }

    //Teniendo el array cargado con las cantidades, buscamos cúal predomina y devolvemos la imagen
    if(sumCod[0] >= 4) {
        img = "http://openweathermap.org/img/w/11d.png";
    }
    if(sumCod[1] >= 4) {
        img = "http://openweathermap.org/img/w/09d.png";
    }
    if(sumCod[2] >= 4) {
        img = "http://openweathermap.org/img/w/10d.png";
    }
    if(sumCod[3] >= 4) {
        img = "http://openweathermap.org/img/w/09d.png";
    }
    if(sumCod[4] >= 4) {
        img = "http://openweathermap.org/img/w/13d.png";
    }
    if(sumCod[5] >= 4) {
        img = "http://openweathermap.org/img/w/50d.png";
    }
    if(sumCod[6] >= 4) {
        img = "http://openweathermap.org/img/w/01d.png";
    }
    if(sumCod[7] >= 4) {
        img = "http://openweathermap.org/img/w/03d.png";
    }

    //En caso de igualdad entre Despejado y Nublado, que se muestre la imagen de Nublado
    if(sumCod[6] == sumCod[7]) {
        img = "http://openweathermap.org/img/w/03d.png";
    }

    return img;
  }
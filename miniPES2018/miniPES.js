      // Variables Globales
      //insertando imagenes 
      var estadioFutbol = new Image();
      var pelota = new Image();
      var jugReal = new Image();
      var jugBarcelona = new Image();
      var arqReal = new Image();
      var arqBarcelona = new Image();
      var logoReal = new Image();
      var logoBarcelona = new Image();
      var arbitro = new Image();
      //valor de las teclado
      var KEY_ENTER = 13;
      var KEY_LEFT = 37;
      var KEY_UP = 38;
      var KEY_RIGHT = 39;
      var KEY_DOWN = 40;
      //otros funcionalidades del teclado
      var lastPress = null;
      var pressing = [];
      var canvas = null;
      var ctx = null;
      //coordenandas de la pelota y los jugadores
      var x = 0;
      var y = 0;
      var EjeX = [];
      var EjeY = [];
      var gol1 = 0;
      var gol2 = 0;
      var goool = false;

      function miniPES() {
          canvas = document.getElementById('myCanvas');
          ctx = canvas.getContext('2d');
          coordenadasPelota();
          EjeCoordenadaJugadores();
          setInterval(function() {
              contador(0, 0)
          }, 1);
          run();
          doblePintado();
          IniciarTiempo();
      }

      function run() {
          setTimeout(run, 50);
          MovimientosDeLaPelota();
      }

      function doblePintado() {
          requestAnimationFrame(doblePintado);
          pintado(ctx);
      }

      function contador(local, visitante) {
          var c = document.getElementById("myCanvas2");
          var ctx1 = c.getContext("2d");
          logoReal.src = 'realmadrid.png';
          logoBarcelona.src = 'barcelona.png';
          ctx1.drawImage(logoReal, 8, 0, 35, 35);
          ctx1.drawImage(logoBarcelona, 210, 0, 35, 35);
          ctx1.fillStyle = "white";
          ctx1.font = "28px Arial";
          gol1 += local;
          gol2 += visitante;
          ctx1.clearRect(80, 2, 100, 50);
          ctx1.fillText(gol1 + '  :  ' + gol2, 80, 30);
      }
      /*============================== Funcion mostrar pelota y estadio en pantalla========================*/
      function pintado(ctx) {
          pelota.src = 'pelota.png'; //agrega la pelota
          estadioFutbol.src = 'estadio2.jpg'; //agregar la cancha de futbol
          ctx.drawImage(estadioFutbol, 0, 0, canvas.width, canvas.height); //*/
          ctx.drawImage(pelota, x, y, 25, 25);
          jugadorFutbol(ctx);
      }
      /*====== Funcion del cronometro=========*/
      function IniciarTiempo() {
          segundos = 0;
          s = document.getElementById("segundos");
          m = document.getElementById("minutos");
          cronometro = setInterval(function() {
              segundos++;
              secs = segundos;
              mins = 0;
              while (secs >= 60) {
                  mins++;
                  secs -= 60;
              }
              if (mins < 10) {
                  m.innerHTML = "0" + mins;
              } else {
                  m.innerHTML = mins;
              }
              if (secs < 10) {
                  s.innerHTML = "0" + secs;
              } else {
                  s.innerHTML = secs;
              }
              total_secs = secs;
              total_mins = mins;
          }, 1000);
      }
      /*============================== Funcion insertar jugadores al estadio======================================*/
      /*============================== como tambien ponemos los nombres a los jugadores =========================*/
      function jugadorFutbol(evt) {
          var nombreR = new Array("Kroos");
          var nombreB = new Array("Messi");
          for (var i = 0; i <= 9; i++) {
              if (i <= 4) {
                  jugReal.src = 'iniesta.png';
                  ctx.fillStyle = 'white';
                  ctx.font = "15px Arial";
                  ctx.fillText(nombreR, EjeX[i], EjeY[i]);
                  ctx.drawImage(jugReal, EjeX[i], EjeY[i], 40, 60);
              } else {
                  jugBarcelona.src = "messi.png";
                  ctx.fillStyle = 'white';
                  ctx.font = "15px Arial";
                  ctx.fillText(nombreB, EjeX[i], EjeY[i]);
                  ctx.drawImage(jugBarcelona, EjeX[i], EjeY[i], 40, 60);
              }
          }
          //______________ Insertamos el arbitro al campo de juego _____________________________________
          arbitro.src = "arbitro2.png";
          ctx.drawImage(arbitro, EjeX[10], EjeY[10], 40, 80);
          arqReal.src = "jasper.png";
          ctx.drawImage(arqReal, 30, EjeY[12], 35, 60);
          EjeX[11] = 780;
          EjeX[12] = 30;
          arqBarcelona.src = "marco.png";
          ctx.drawImage(arqBarcelona, 780, EjeY[11], 35, 60);
      }
      /*============================== Funcion aleatoria de la pelota en campo de juego=========================*/
      function coordenadasPelota() {
          var randonX = Math.floor(Math.random() * 700);
          var randonY = Math.floor(Math.random() * 400);
          if (randonX >= 60 && randonY >= 60 && randonX <= 700 && randonY <= 400) { //dimesiones del area de la cancha en dond la pelota puede aparecer
              x = randonX;
              y = randonY;
          } else { //en caso sobrepase ese area, se le agrega estos valores a las coordenadas
              x = 250;
              y = 250;
          }
      }
      /*============================== Funcion aleatoria de jugadores en campo de juego==========================*/
      function EjeCoordenadaJugadores() {
          var dif = 0;
          for (var i = 0; i <= 12; i++) {
              var randonX = Math.floor(Math.random() * 700);
              var randonY = Math.floor(Math.random() * 400);
              if (i >= 11) {
                  if (randonY > 150 && randonY < 280) {
                      EjeY[i] = randonY;
                  } else {
                      EjeY[i] = 230;
                      EjeY[i + 1] = 230;
                  }
              } else {
                  if (randonX >= 60 && randonY >= 60 && randonX <= 700 && randonY <= 400) { //dimesiones del area de la cancha en dond la pelota puede aparecer
                      EjeX[i] = randonX;
                      EjeY[i] = randonY;
                  } else { //en caso sobrepase ese area, se le agrega estos valores a las coordenadas
                      EjeX[i] = 150 + dif;
                      EjeY[i] = 150 + dif;
                      dif += 50;
                      if (dif >= 300) {
                          dif = 0;
                      }
                  }
              }
          }
      }
      /*============================== Funcion del teclado======================================*/
      /*============================== Movemos con las flechas del teclado======================*/
      function MovimientosDeLaPelota() {
          var final = 12;
          //fecha arriba
          if (pressing[KEY_UP]) y -= 5;
          for (var i = 0; i <= final; i++) {
              if (i <= 4) {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      y = EjeY[i] - 25;
                  }
              } else {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      y = EjeY[i] + 50;
                  }
              }
          }
          //flecha derecha
          if (pressing[KEY_RIGHT]) x += 5;
          for (var i = 0; i <= final; i++) {
              if (i <= 4) {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      x = EjeX[i] + 30;
                  }
              } else {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      x = EjeX[i] - 20;
                  }
              }
          }
          //flecha abajo
          if (pressing[KEY_DOWN]) y += 5;
          for (var i = 0; i <= final; i++) {
              if (i <= 4) {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      y = EjeY[i] + 50;
                  }
              } else {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      y = EjeY[i] - 25;
                  }
              }
          }
          //flecha izquierda
          if (pressing[KEY_LEFT]) x -= 5;
          for (var i = 0; i <= final; i++) {
              if (i <= 4) {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      x = EjeX[i] - 20;
                  }
              } else {
                  if (x > (EjeX[i] - 20) && x < (EjeX[i] + 30) && y > (EjeY[i] - 25) && y < (EjeY[i] + 50)) {
                      x = EjeX[i] + 30;
                  }
              }
          }
          //limites del estadio
          if (x > 796)
              //arco del barcelona
              if (y > 175 && y < 305) {
                  contador(1, 0);
                  coordenadasPelota();
                  EjeCoordenadaJugadores();
              }
          else {
              x = 796;
          }
          if (y > 448) y = 448;
          if (x < 24)
              //arco del real madrid
              if (y > 175 && y < 305) {
                  contador(0, 1);
                  coordenadasPelota();
                  EjeCoordenadaJugadores();
              }
          else {
              x = 24;
          }
          if (y < 24) y = 24;
      }
      document.addEventListener('keydown', function(evt) {
          lastPress = evt.keyCode;
          pressing[evt.keyCode] = true;
      }, false);
      document.addEventListener('keyup', function(evt) {
          pressing[evt.keyCode] = false;
      }, false);
      window.requestAnimationFrame = (function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
              window.setTimeout(callback, 17);
          };
      })();
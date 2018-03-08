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

      function contador() {
          var c = document.getElementById("myCanvas2");
          var ctx1 = c.getContext("2d");
          ctx1.fillStyle = "white";
          ctx1.font = "30px Arial";
          ctx1.clearRect(10, 10, 180, 40);
          ctx1.fillText(acumulador, 86, 35);
          acumulador++;
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

      function MovimientosDeLaPelota(evt) {
          // bandera para devolver las variables si llegamos a un borde del tablero.
          var flag = 0; //bandera
          oldShipX = shipX;
          oldShipY = shipY;
          oldBack = cancha;
          switch (evt.keyCode) {
              // Flecha Izquierda cuando se presiona la tecla <-
              case 37:
                  shipX = shipX - 10;
                  if (shipX < 55) {
                      shipX = 55;
                      flag = 1;
                  }
                  break;
                  // Flecha Derecha. cuando se presiona la tecla ->
              case 39:
                  shipX = shipX + 10;
                  if (shipX > 745) {
                      shipX = 745;
                      flag = 1;
                  }
                  break;
                  // Flecha Abajo: cuando se presiona la tecla abajo
              case 40:
                  shipY = shipY + 10;
                  if (shipY > 380) {
                      shipY = 380;
                      flag = 1;
                  }
                  break;
                  // Flecha Arriba:cuando se presiona la tecla arriba
              case 38:
                  shipY = shipY - 10;
                  if (shipY < 55) {
                      shipY = 55;
                      flag = 1;
                  }
                  break;
          }
          var aleX = Math.floor(Math.random() * 700);
          var aleY = Math.floor(Math.random() * 400);
          if (aleX >= 80 && aleY >= 80 && aleX <= 650 && aleY <= 300) {
              x = aleX;
              y = aleY;
          } else {
              x = 250;
              y = 250;
          }
          /*  
                    //izquirda superior
                    if (shipX == 55 && shipY == 55) {
                        contador();
                        shipX = x;
                        shipY = y;
                    }
                    //derecha superior
                    else if (shipX == 745 && shipY == 55) {
                        contador();
                        shipX = x;
                        shipY = y;
                    }
                    //derecha inferior
                    else if (shipX == 745 && shipY == 380) {
                        contador();
                        shipX = x;
                        shipY = y;
                    }
                    //isquierda inferior
                    else if (shipX == 55 && shipY == 380) {
                        contador();
                        shipX = x;
                        shipY = y;
                    }
                    //centro superior
                    else if (shipX >= 395 && shipX <= 410) {
                        if (shipY == 55 || shipY == 380) {
                            contador();
                            shipX = x;
                            shipY = y;
                        }
                    }
                    */
      }
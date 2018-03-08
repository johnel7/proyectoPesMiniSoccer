      // Global variables
      var canvas; // canvas
      var ctx; // contexto
      var cancha = new Image();
      var oldBack = new Image();
      var balon = new Image();
      var shipX = 0; //posición  X
      var shipY = 0; // posición  Y
      var oldShipX = 0; // posicion antigua X
      var oldShipY = 0; // posicion antigua Y
      var x = 0;
      var y = 0;
      var acumulador = 0;
      var ranX = 0;
      var ranY = 0;

      function canvasJugarFutbol() {
          contador();
          canvas = document.getElementById("myCanvas");
          ranX = Math.floor(Math.random() * 700);
          ranY = Math.floor(Math.random() * 400);
          if (ranX >= 60 && ranY >= 60 && ranX <= 760 && ranY <= 400) {
              x = ranX;
              y = ranY;
          } else {
              x = 250;
              y = 250;
          }
          shipX = x;
          shipY = y;
          if (canvas.getContext) {
              ctx = canvas.getContext("2d");
              balon.src = 'pelota12.png';
              cancha.src = 'estadio.png';
              IniciarTiempo();
          }
          // Juega el juego, hasta que el juego termine.
          gameLoop = setInterval(doGameLoop, 16);
          window.addEventListener('keydown', MovimientosDeLaPelota, true);
      }

      function doGameLoop() {
          ctx.drawImage(cancha, 0, 0);
          ctx.drawImage(balon, shipX, shipY, 40, 40);
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
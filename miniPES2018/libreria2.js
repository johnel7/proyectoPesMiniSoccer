      // Global variables
      var canvas; // canvas
      var ctx; // context
      var back = new Image(); // storage for new background piece fondos
      var oldBack = new Image(); // storage for old background piece fondos
      var ship = new Image(); // pequeñas imagenes
      var shipX = 0; // current ship position X
      var shipY = 0; // current ship position Y
      var oldShipX = 0; // old ship position Y
      var oldShipY = 0; // old ship position Y
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
          shipY = y; //*/
          if (canvas.getContext) {
              ctx = canvas.getContext("2d");
              ship.src = 'pelota12.png';
              back.src = 'estadio.png';
              IniciarTiempo();
          }
          // Play the game until the until the game is over.
          gameLoop = setInterval(doGameLoop, 16);
          window.addEventListener('keydown', MovimientosDeLaPelota, true);
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

      function stars() {
          ctx.fillStyle = "red";
          ctx.beginPath();
          ctx.rect(40, 480, 720, 480);
          ctx.closePath();
          ctx.fill(); ///*
          // Save black background.
          oldBack = ctx.getImageData(0, 0, 30, 30);
      } //*/
      function BolaDeBillar() {
          ctx.beginPath();
          ctx.arc(x + 10, y + 10, 10, 0, Math.PI * 2, true);
          ctx.fillStyle = "black"
          ctx.closePath();
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x + 11, y + 13, 5, 0, Math.PI * 2, true);
          ctx.fillStyle = "white"
          ctx.closePath();
          ctx.fill(); //*/
          // Save ship data.
          ship = ctx.getImageData(x, y, 20, 20);
          // Erase it for now.
          //ctx.putImageData(oldBack, 0, 0);
      }

      function doGameLoop() {
          ctx.drawImage(back, 0, 0);
          ctx.drawImage(ship, shipX, shipY, 40, 40);
      }

      function MovimientosDeLaPelota(evt) {
          // Flag to put variables back if we hit an edge of the board.
          var flag = 0;
          oldShipX = shipX;
          oldShipY = shipY;
          oldBack = back;
          switch (evt.keyCode) {
              // Left arrow. cuando se presiona la tecla <-
              case 37:
                  shipX = shipX - 10;
                  if (shipX < 55) {
                      // If at edge, reset ship position and set flag.
                      shipX = 55;
                      flag = 1;
                  }
                  break;
                  // Right arrow. cuando se presiona la tecla ->
              case 39:
                  shipX = shipX + 10;
                  if (shipX > 745) {
                      // If at edge, reset ship position and set flag.
                      shipX = 745;
                      flag = 1;
                  }
                  break;
                  // Down arrow cuando se presiona la tecla abajo
              case 40:
                  shipY = shipY + 10;
                  if (shipY > 380) {
                      // If at edge, reset ship position and set flag.
                      shipY = 380;
                      flag = 1;
                  }
                  break;
                  // Up arrow cuando se presiona la tecla arriba
              case 38:
                  shipY = shipY - 10;
                  if (shipY < 55) {
                      // If at edge, reset ship position and set flag.
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
      }
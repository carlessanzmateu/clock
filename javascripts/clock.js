'use strict';
var intervalId = 0;
// var fontSize =

/**
* Setup and start an analog clock using a canvas
* @param canvas The canvas to use
* @param clockWidth The width of the clock (radius*2)
* @author Lyndon Armitage
*/
function setupAnalogClock(canvas, clockWidth) {
  var canvasContext = canvas.getContext('2d');
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  render();

  function render() {
    intervalId = requestAnimationFrame(render);

    var date = new Date();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    drawStatic();
    $('#date').html(date);

    var hours = date.getHours() + (date.getMinutes() / 60);
    canvasContext.strokeStyle = 'blue';
    canvasContext.lineWidth = 2.5;
    drawHand(clockWidth / 3, hours * 30);

    var minutes = date.getMinutes() + (date.getSeconds() / 60);
    canvasContext.strokeStyle = 'blue';
    canvasContext.lineWidth = 1.5;
    drawHand(clockWidth / 2, minutes * 6);

    var seconds = date.getSeconds();
    canvasContext.strokeStyle = 'red';
    canvasContext.lineWidth = 1;
    drawHand(clockWidth / 2, seconds * 6);

    function drawStatic() {
      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, clockWidth / 2, 0, 2 * Math.PI, false);
      canvasContext.strokeStyle = 'green';
      canvasContext.lineWidth = 2;
      canvasContext.stroke();
      canvasContext.closePath();

      canvasContext.beginPath();
      canvasContext.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
      canvasContext.fillStyle = 'green';
      canvasContext.fill();
      canvasContext.closePath();

      drawNumbers();
      drawTicks();

      function drawTicks() {
        canvasContext.strokeStyle = 'green';
        canvasContext.lineWidth = 1;
        var i = 12 * 5;
        while (i > 0) {
          canvasContext.save();
          canvasContext.beginPath();
          canvasContext.translate(centerX, centerY);
          var angle = ((i / 5) * 30) * Math.PI / 180;
          canvasContext.rotate(angle);
          canvasContext.translate(0, -clockWidth / 2);

          canvasContext.moveTo(0, 0);
          canvasContext.lineTo(0, 5);
          canvasContext.stroke();
          canvasContext.closePath();
          canvasContext.restore();
          i--;
        }
      }

      function drawNumbers() {
        canvasContext.strokeStyle = 'green';
        canvasContext.lineWidth = 2;
        var i = 12;
        while (i > 0) {
          canvasContext.save();
          canvasContext.beginPath();
          canvasContext.translate(centerX, centerY);
          var angle = (i * 30) * Math.PI / 180;
          canvasContext.rotate(angle);
          canvasContext.translate(0, -clockWidth / 2);

          // Drawing numbers doesn't look so good because of the origin of the text
          if (i % 2 == 0) {
            canvasContext.save();
            canvasContext.translate(0, 30);
            canvasContext.rotate(-angle);
            canvasContext.font = '15pt sans-serif';
            canvasContext.fillText(i, -10, 10);
            canvasContext.restore();
          }

          canvasContext.moveTo(0, 0);
          canvasContext.lineTo(0, 10);
          canvasContext.stroke();
          canvasContext.closePath();
          canvasContext.restore();
          --i;
        }
      }
    }

    function drawHand(length, angle) {
      canvasContext.save();
      canvasContext.beginPath();
      canvasContext.translate(centerX, centerY);
      canvasContext.rotate(-180 * Math.PI / 180); // Correct for top left origin
      canvasContext.rotate(angle * Math.PI / 180);
      canvasContext.moveTo(0, 0);
      canvasContext.lineTo(0, length);
      canvasContext.stroke();
      canvasContext.closePath();
      canvasContext.restore();
    }
  }
}

function initializer() {
  var initializer = {
    setup: {},
    canvas: '',
    size: '',
  };

  var setup = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
    canvasElement: document.getElementById('analogClock'),
  };

  var canvas = setup.canvasElement;
  canvas.width = setup.width;
  canvas.height = setup.height;

  var size = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
  initializer.setup = setup;
  initializer.canvas = canvas;
  initializer.size = size;

  return initializer;
}

window.onload = function () {
  var init = initializer();
  setupAnalogClock(init.canvas, init.size * 0.8);
};

window.onresize = function () {
  var init = initializer();
  window.clearInterval(intervalId);
  setupAnalogClock(init.canvas, init.size * 0.8);
};

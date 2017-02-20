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
  var ctx = canvas.getContext('2d');
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  render();

  function render() {
    intervalId = requestAnimationFrame(render);

    var date = new Date();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStatic();
    $('#date').html(date);

    var hours = date.getHours() + (date.getMinutes() / 60);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2.5;
    drawHand(clockWidth / 3, hours * 30);

    var minutes = date.getMinutes() + (date.getSeconds() / 60);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 1.5;
    drawHand(clockWidth / 2, minutes * 6);

    var seconds = date.getSeconds();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    drawHand(clockWidth / 2, seconds * 6);

    function drawStatic() {
      ctx.beginPath();
      ctx.arc(centerX, centerY, clockWidth / 2, 0, 2 * Math.PI, false);
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.closePath();

      drawNumbers();
      drawTicks();

      function drawTicks() {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;
        var i = 12 * 5;
        while (i > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.translate(centerX, centerY);
          var angle = ((i / 5) * 30) * Math.PI / 180;
          ctx.rotate(angle);
          ctx.translate(0, -clockWidth / 2);

          ctx.moveTo(0, 0);
          ctx.lineTo(0, 5);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
          i--;
        }
      }

      function drawNumbers() {
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        var i = 12;
        while (i > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.translate(centerX, centerY);
          var angle = (i * 30) * Math.PI / 180;
          ctx.rotate(angle);
          ctx.translate(0, -clockWidth / 2);

          // Drawing numbers doesn't look so good because of the origin of the text
          if (i % 2 == 0) {
            ctx.save();
            ctx.translate(0, 30);
            ctx.rotate(-angle);
            ctx.font = '15pt sans-serif';
            ctx.fillText(i, -10, 10);
            ctx.restore();
          }

          ctx.moveTo(0, 0);
          ctx.lineTo(0, 10);
          ctx.stroke();
          ctx.closePath();
          ctx.restore();
          --i;
        }
      }
    }

    function drawHand(length, angle) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(centerX, centerY);
      ctx.rotate(-180 * Math.PI / 180); // Correct for top left origin
      ctx.rotate(angle * Math.PI / 180);
      ctx.moveTo(0, 0);
      ctx.lineTo(0, length);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
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

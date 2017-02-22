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
  let SIMPLE = new Simple();
  render();

  function render() {
    intervalId = requestAnimationFrame(render);
    SIMPLE.simpleDraw(canvas, ctx, clockWidth, centerX, centerY);
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

'use strict';

class Simple {
  constructor() {
    console.log('Im simple');
  }

  simpleDraw(canvas, ctx, clockWidth, centerX, centerY) {
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

// var SIMPLE = {
//   log: log(),
//   draw: simpleDraw(),
// };
//
// function log() {
//   console.log('FOO from log');
// }
//
// function simpleDraw(canvas, ctx, clockWidth, centerX, centerY) {
//   var date = new Date();
//   debugger;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawStatic();
//   $('#date').html(date);
//
//   var hours = date.getHours() + (date.getMinutes() / 60);
//   ctx.strokeStyle = 'blue';
//   ctx.lineWidth = 2.5;
//   drawHand(clockWidth / 3, hours * 30);
//
//   var minutes = date.getMinutes() + (date.getSeconds() / 60);
//   ctx.strokeStyle = 'blue';
//   ctx.lineWidth = 1.5;
//   drawHand(clockWidth / 2, minutes * 6);
//
//   var seconds = date.getSeconds();
//   ctx.strokeStyle = 'red';
//   ctx.lineWidth = 1;
//   drawHand(clockWidth / 2, seconds * 6);
//
//   function drawStatic() {
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, clockWidth / 2, 0, 2 * Math.PI, false);
//     ctx.strokeStyle = 'green';
//     ctx.lineWidth = 2;
//     ctx.stroke();
//     ctx.closePath();
//
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI, false);
//     ctx.fillStyle = 'green';
//     ctx.fill();
//     ctx.closePath();
//
//     drawNumbers();
//     drawTicks();
//
//     function drawTicks() {
//       ctx.strokeStyle = 'green';
//       ctx.lineWidth = 1;
//       var i = 12 * 5;
//       while (i > 0) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.translate(centerX, centerY);
//         var angle = ((i / 5) * 30) * Math.PI / 180;
//         ctx.rotate(angle);
//         ctx.translate(0, -clockWidth / 2);
//
//         ctx.moveTo(0, 0);
//         ctx.lineTo(0, 5);
//         ctx.stroke();
//         ctx.closePath();
//         ctx.restore();
//         i--;
//       }
//     }
//
//     function drawNumbers() {
//       ctx.strokeStyle = 'green';
//       ctx.lineWidth = 2;
//       var i = 12;
//       while (i > 0) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.translate(centerX, centerY);
//         var angle = (i * 30) * Math.PI / 180;
//         ctx.rotate(angle);
//         ctx.translate(0, -clockWidth / 2);
//
//         // Drawing numbers doesn't look so good because of the origin of the text
//         if (i % 2 == 0) {
//           ctx.save();
//           ctx.translate(0, 30);
//           ctx.rotate(-angle);
//           ctx.font = '15pt sans-serif';
//           ctx.fillText(i, -10, 10);
//           ctx.restore();
//         }
//
//         ctx.moveTo(0, 0);
//         ctx.lineTo(0, 10);
//         ctx.stroke();
//         ctx.closePath();
//         ctx.restore();
//         --i;
//       }
//     }
//   }
//
//   function drawHand(length, angle) {
//     ctx.save();
//     ctx.beginPath();
//     ctx.translate(centerX, centerY);
//     ctx.rotate(-180 * Math.PI / 180); // Correct for top left origin
//     ctx.rotate(angle * Math.PI / 180);
//     ctx.moveTo(0, 0);
//     ctx.lineTo(0, length);
//     ctx.stroke();
//     ctx.closePath();
//     ctx.restore();
//   }
// }

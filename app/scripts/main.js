'use strict';
var game = $('#game');

// Hide Board on start.
function initialSetUp() {
  game.hide();
}

initialSetUp();

// Score keeper
// var player1 = 0;
// var player2 = 0;
// var winner;

// function updateScore() {
//   player1 = winner === 'blue' ? player1++ : player2++;
// }
// updateScore();


// Winning logic
// var cell = function(r, c) {
//   $(this).id('c-' + r + '-' + c);
// };

// function testClass(r, c, value) {
//   value = cell(r, c).hasClass('red blue');
// }

// var sameColor = function(r, c) {
//   testClass(r, c, player[current]);
// }

// function colorField(r, c, color) {
//   color = cell(r, c).className;
// }

// function diagonalRtlWon(r, c) {
//   for (var min = r - 1, t = c + 1; min > 0; min--, t++) {
//     if (t > 7 || !sameColor(min, t)) break;
//   }
//   for (var max = r + 1, t = c - 1; max < 7; max++, t--) {
//     if (t < 1 || !sameColor(max, t)) break;
//   }
//   return max - min > 4;
// }

// function diagonalLtrWon(r, c) {
//   for (var min = r - 1, t = c - 1; min > 0; min--, t--) {
//     if (t < 1 || !sameColor(min, t)) break;
//   }
//   for (var max = r + 1, t = c + 1; max < 7; max++, t++) {
//     if (t > 7 || !sameColor(max, t)) {
//       break;
//     }
//     return max - min > 4;
//   }
// }

// function horizontalWon(r, c) {
//   for (var min = c - 1; min > 0; min--) {
//     if (!sameColor(r, min)) break;
//   }
//   for (var max = c + 1; max < 8; max++) {
//     if (!sameColor(r, max)) {
//       break;
//     }
//     return max - min > 4;
//   }
// }

// function verticalWon(r, c) {
//   for (var max = r + 1; max < 7; max++) {
//     if (!sameColor(max, c)) {
//       break;
//     }
//     return max - r > 3;
//   }
// }

// Game Logic
$('.topRow td').click(function() {
  var col = $(this).parent().children().index($(this));


  var activePlayer = $(this).closest('table').data('activeplayer');
  //Get First available slot
  var cells = $('table.gameBoard tr td:nth-child(' + (col + 1) + ')');
  var cell;
  for (var i = cells.length - 1; i > -1; i--) {
    if ($(cells[i]).data('token') === undefined) {
      cell = cells[i];
      break;
    }
  }

  $(cell).data('token', activePlayer).addClass(activePlayer);


  //Toggle Active Player
  activePlayer = activePlayer === 'red' ? 'blue' : 'red';
  $(this).closest('table').toggleClass('red blue').data('activeplayer', activePlayer);


});

// var cells = $('table.gameBoard tr td:nth-child(' + (col + 1) + ')');
// var cell;
// for (var i = cells.length - 1; i > -1; i--) {
//   $(cells[i]).data('token') === undefined)
//   cell = cells[i];

//   $(cell).data('token', activePlayer).addClass(activePlayer);

//   //Toggle Active Player & add class
//   activePlayer = activePlayer === 'red' ? 'blue' : 'red';
//   $(this).closest('table').toggleClass('red blue').data('activeplayer', activePlayer);
//   console.log('classToggle');
// }

// }

// //Player logic
// function playerMove() {
//   if (!finished) {
//     $('.topRow td').click(function() {
//       var col = $(this).parent().children().index($(this));
//       var activePlayer = $(this).closest('table').data('activeplayer');
//       play(c);
//     })
//     console.log('got to player move');
//   }
// }

// Board focus
function scroll() {
  var x = $(this).offset().top - 25;
  $('html, body').animate({
    scrollTop: x
  }, 500);
}

// Game start
$('#2player').click(function() {
  game.show();
  $('.btn, .lead').hide();
  $('.topRow').focus(scroll);
  console.log('game start');
});

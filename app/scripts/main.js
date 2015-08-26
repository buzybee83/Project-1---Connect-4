'use strict';

var game = $('#game');
var message = $('.lead');
var winner;
var NUM_ROWS = 6;
var NUM_COLS = 7;
var EMPTY_CELL = '';
var board = new Array(NUM_ROWS);
var activePlayer = 'Yellow';

function togglePlayer() {
  activePlayer = activePlayer === 'Yellow' ? 'Red' : 'Yellow';
  $('#top').toggleClass('Red', 'Yellow');
  message.html('Current Player is: ' + activePlayer);
}

// Initializing board with empty cells
function initBoard() {
  for (var i = 0; i < NUM_ROWS; i++) {
    board[i] = new Array(NUM_COLS);
    for (var j = 0; j < NUM_COLS; j++) {
      board[i][j] = EMPTY_CELL;
    }
  }
  // board[0][0] = 'Yellow';
  // board[1][1] = 'Red';
  console.log('initBoard: ' + JSON.stringify(board));
}

function render() {
  console.log('rendering board: ' + JSON.stringify(board));
  for (var i = 0; i < NUM_ROWS; i++) {
    for (var j = 0; j < NUM_COLS; j++) {
      var cell = board[i][j];
      if (cell !== EMPTY_CELL) {
        var id = i + '-' + j;
        // console.log('setting cell class' + i + ',' + j + ' = ' + cell);
        $('#' + id).addClass(cell);
      }
    }
  }
}

function checkForWinner() {
  // Check horizontal win
  for (var i = 0; i < NUM_ROWS; i++) {
    for (var j = 0; j < NUM_COLS / 2; j++) {
      var cell0 = board[i][j + 0];
      var cell1 = board[i][j + 1];
      var cell2 = board[i][j + 2];
      var cell3 = board[i][j + 3];
      if (cell0 !== EMPTY_CELL &&
        cell0 === cell1 &&
        cell0 === cell2 &&
        cell0 === cell3) {
        return cell0;
      }
    }
  }

  // Check vertical win
  for (i = 0; i < NUM_ROWS / 2; i++) {
    for (j = 0; j < NUM_COLS; j++) {
      cell0 = board[i][j];
      cell1 = board[i + 1][j];
      cell2 = board[i + 2][j];
      cell3 = board[i + 3][j];
      console.log(cell0 + cell1 + cell2 + cell3);
      if (cell0 !== EMPTY_CELL &&
        cell0 === cell1 &&
        cell0 === cell2 &&
        cell0 === cell3) {
        $(this).css(
          'border-color', 'Red'
        );
        return cell0;
      }
    }
  }

  // Diagonal win bottom left - top right
  for (i = 0; i < NUM_ROWS / 2; i++) {
    for (j = 0; j < NUM_COLS; j++) {
      cell0 = board[i][j + 3];
      cell1 = board[i + 1][j + 2];
      cell2 = board[i + 2][j + 1];
      cell3 = board[i + 3][j + 0];
      console.log(cell0 + cell1 + cell2 + cell3);
      if (cell0 !== EMPTY_CELL &&
        cell0 === cell1 &&
        cell0 === cell2 &&
        cell0 === cell3) {
        return cell0;
      }
    }
  }

  // Diagonal win bottom right - top left
  for (i = 0; i < NUM_ROWS / 2; i++) {
    for (j = 0; j < NUM_COLS; j++) {
      cell0 = board[i][j + 0];
      cell1 = board[i + 1][j + 1];
      cell2 = board[i + 2][j + 2];
      cell3 = board[i + 3][j + 3];
      console.log(cell0 + cell1 + cell2 + cell3);
      if (cell0 !== EMPTY_CELL &&
        cell0 === cell1 &&
        cell0 === cell2 &&
        cell0 === cell3) {
        return cell0;
      }
    }
  }
  return EMPTY_CELL;
}

// End player turn after a win
function endGame() {
  $('.topRow').click(function() {
    $('.topRow td').unbind();
  });
  $('#winner').toggleClass(winner);
  message.html('We have a WINNER!');
  //$('.gameboard').css('margin-top', '-215px');
}

// Hide gameboard
function hideGame() {
  game.hide();
  message.html('');
}

// Winner message and hide board
function displayWinner() {
  message.html(winner + ' Player' + '<br />' + 'WINS!!!').css({
    'font-size': '3.8em',
    'margin-top': '50px',
    'font-weight': 700,
    'color': '#FF1919'
  });
}


//Hide Board on start.
function initialSetUp() {
  initBoard();
  render();
  game.hide();
  $('#reset').hide();
  $('#player').hide();
  message.show().html('Two player game, hit start when ready!');
  $('#2player').html('Start Game');
}

// Board focus
function scrollPage() {
  $('html, body').animate({
    scrollTop: $('#title').offset().top
  }, 500);
}

function gameStart() {
  game.show();
  $('.playerBtn').hide();
  scrollPage();
  $('#reset').show();
  $('#top').addClass(activePlayer);
}

initialSetUp();

// Player chip & winner logic
$('.topRow td').click(function() {
  var col = $(this).parent().children().index($(this));
  // var activePlayer = $(this).closest('table').data('activeplayer');

  // find first empty cell for given col from bottom up
  for (var row = NUM_ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY_CELL) {
      console.log('Found empty cell at ' + row + ',' + col + ' - filling with ' + activePlayer);
      board[row][col] = activePlayer;
      togglePlayer();
      winner = checkForWinner();
      console.log('winner: ' + winner);
      if (winner === 'Yellow' || winner === 'Red') {
        endGame();
        setTimeout(hideGame, 2000);
        setTimeout(displayWinner, 2100);
      }
      break;
    }

  }
  render();

});

// Game start
$('#2player').click(function() {
  gameStart();
  console.log('game start');
  message.html('Current Player is: Yellow');
});

// Reset -
$('#reset').click(function() {
  location.reload();
});

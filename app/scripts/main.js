'use strict';

var game = $('#game');
var winner;
var NUM_ROWS = 6;
var NUM_COLS = 7;
var EMPTY_CELL = '';
var board = new Array(NUM_ROWS);
var activePlayer = 'yellow';

function togglePlayer() {
  activePlayer = activePlayer === 'yellow' ? 'red' : 'yellow';
  $('.lead').html('Current Player is: ' + activePlayer);
}

// Initializing board with empty cells
function initBoard() {
  for (var i = 0; i < NUM_ROWS; i++) {
    board[i] = new Array(NUM_COLS);
    for (var j = 0; j < NUM_COLS; j++) {
      board[i][j] = EMPTY_CELL;
    }
  }
  // board[0][0] = 'yellow';
  // board[1][1] = 'red';
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
  for (var i = 0; i < NUM_ROWS / 2; i++) {
    for (var j = 0; j < NUM_COLS; j++) {
      var cell0 = board[i][j];
      var cell1 = board[i + 1][j];
      var cell2 = board[i + 2][j];
      var cell3 = board[i + 3][j];
      console.log(cell0 + cell1 + cell2 + cell3)
      if (cell0 !== EMPTY_CELL &&
        cell0 === cell1 &&
        cell0 === cell2 &&
        cell0 === cell3) {
        return cell0;
      }
    }
  }


  // Diagonal win bottom left - top right
  for (var i = 0; i < NUM_ROWS / 2; i++) {
    for (var j = 0; j < NUM_COLS; j++) {
      var cell0 = board[i][j + 3];
      var cell1 = board[i + 1][j + 2];
      var cell2 = board[i + 2][j + 1];
      var cell3 = board[i + 3][j + 0];
      console.log(cell0 + cell1 + cell2 + cell3)
      if (cell0 !== EMPTY_CELL &&
        cell0 === cell1 &&
        cell0 === cell2 &&
        cell0 === cell3) {
        return cell0;
      }
    }
  }

  // Diagonal win bottom right - top left
  for (var i = 0; i < NUM_ROWS / 2; i++) {
    for (var j = 0; j < NUM_COLS; j++) {
      var cell0 = board[i][j + 0];
      var cell1 = board[i + 1][j + 1];
      var cell2 = board[i + 2][j + 2];
      var cell3 = board[i + 3][j + 3];
      console.log(cell0 + cell1 + cell2 + cell3)
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

function endGame() {
  $('.lead').html(winner + ' Player' + '<br />' +'WINS!!!').css({'font-size': '4em', 'margin-top': '50px', 'font-weight': 700,'color': '#FF1919'});
  game.hide();
}

//Hide Board on start.
function initialSetUp() {
  initBoard();
  render();
  game.hide();
  $('#reset').hide();
}

// Board focus
function scrollPage() {
  //var x = $('.jumbotron h1').offset().top - 125;
  $('html, body').animate({ scrollTop: $('#title').offset().top }, 500);
}

function gameStart() {
  game.show();
  $('.playerBtn').hide();
  scrollPage();
  $('#reset').show();
}

initialSetUp();

// Player chip & winner logic
$('.topRow td').click(function() {
  var col = $(this).parent().children().index($(this));

  // find first empty cell for given col from bottom to top
  for (var row = NUM_ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY_CELL) {
      console.log('Found empty cell at ' + row + ',' + col + ' - filling with ' + activePlayer);
      board[row][col] = activePlayer;
      togglePlayer();
      winner = checkForWinner();
      console.log('winner: ' + winner);
      if (winner === 'yellow' || winner === 'red') {
        endGame();
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
  $('.lead').html('Current Player is: yellow');
});

// Reset -
$('#reset').click(function() {
  location.reload();
});

'use strict';
$('.topRow td').click(function() {
  var col = $(this).parent().children().index($(this));


  var activePlayer = $(this).closest('table').data('activeplayer');
  //Get First available slot
  var cells = $('table tr td:nth-child(' + (col + 1) + ')');
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

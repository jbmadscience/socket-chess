var board;
var game;

window.onload = function () {
    initGame();
};

// setup my socket client
var socket = io();

// called when the server calls socket.broadcast('move')
socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});

var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };

   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};

// called when a player makes a move on the board UI
var handleMove = function(source, target) {
    var move = game.move({from: source, to: target});

    if (move === null)  return 'snapback';
    else socket.emit('move', move);

};
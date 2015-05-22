;(function () {
	Chess = window.Chess = window.Chess || {};
	
	var Game = Chess.Game = function (player1, player2) {
		this.players = [player1, player2];
		this.currentPlayer = player1;
		Chess.board = new Chess.Board();
	};
	
	Game.prototype.play = function () {
		Chess.board.render();
		
		while (!this.isOver()) {
			this.currentPlayer.move();
			this.currentPlayer = this.switchCurrentPlayer();
		};
	};
	
	Game.prototype.switchCurrentPlayer = function () {
		if (this.currentPlayer === this.players[0]) {
			return this.players[1];
		}
		return this.players[0];
	};
	
	Game.prototype.isOver = function () {
		// body...
	};
})();
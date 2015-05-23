;(function () {
	Chess = window.Chess = window.Chess || {};
	
	var Game = Chess.Game = function () {
		this.currentPlayer = Chess.whiteTeam;
		Chess.board = new Chess.Board();
	};
	
	Game.prototype.play = function () {
		Chess.board.render();
		
		while (!this.isOver()) {
			this.currentPlayer.move();
			Chess.board.render();
			this.switchCurrentPlayer();
		};
		
		if (Chess.board.isWon()) {
			var winner = this.currentPlayer.opponent();
		}
	};
	
	Game.prototype.switchCurrentPlayer = function () {
		this.currentPlayer = this.currentPlayer.opponent();
	};
	
	Game.prototype.isOver = function () {
		return Chess.board.isWon(this.currentPlayer) || Chess.board.isDraw();
	};
})();
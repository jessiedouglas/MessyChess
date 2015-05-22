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
	};
	
	Game.prototype.switchCurrentPlayer = function () {
		if (this.currentPlayer.color === "W") {
			this.currentPlayer = Chess.blackTeam;
		} else {
		  this.currentPlayer = Chess.whiteTeam;
		}
	};
	
	Game.prototype.isOver = function () {
		return Chess.board.isWon() || Chess.board.isDraw();
	};
})();
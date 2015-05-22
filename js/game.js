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
			this.currentPlayer = this.switchCurrentPlayer();
		};
	};
	
	Game.prototype.switchCurrentPlayer = function () {
		if (this.currentPlayer.color === "W") {
			return Chess.blackTeam;
		}
		return Chess.whiteTeam;
	};
	
	Game.prototype.isOver = function () {
		// body...
	};
})();
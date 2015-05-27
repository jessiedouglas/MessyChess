;(function () {
	Chess = window.Chess = window.Chess || {};
	
	var Game = Chess.Game = function () {
		this.currentPlayer = Chess.whiteTeam;
		Chess.board = new Chess.Board();
		this.moves = {}; // Hash of moves to keep track of threefold repetition.
		this.numNonrelevantMoves = 0; // Keep track for fifty move rule.
	};
	
	Game.prototype.play = function () {
		Chess.board.render();
		
		while (!this.isOver()) {
			// Add current board to this.moves.
			// TODO: Don't add if en passant is possible.
			var currentBoard = Chess.board.toString();
			this.moves[currentBoard] = this.moves[currentBoard] || 0;
			this.moves[currentBoard]++;
			
			this.currentPlayer.move();
			// TODO: Add logic for this.numNonrelevantMoves (fifty move rule).
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
		return Chess.board.isWon(this.currentPlayer) || this.isDraw();
	};
	
	Game.prototype.isDraw = function () {
		// Checks for threefold repetition and fifty move rule. Calls similar
		// function on the board to check for stalemate and insufficient materials.
		
		// Check for threefold repetition.
		for (var boardString in this.moves) {
			if (this.moves[boardString] > 2) {
				return true;
			}
		};
		
		// Check the fifty move rule.
		if (this.numNonrelevantMoves > 49) {
			return true;
		}
		
		return Chess.board.isDraw();
	};
})();
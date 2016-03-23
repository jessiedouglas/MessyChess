;(function () {
	Chess = window.Chess = window.Chess || {};

	var Game = Chess.Game = function () {
		this.currentPlayer = Chess.whiteTeam;
		Chess.board = new Chess.Board();
		this.moves = {}; // Hash of moves to keep track of threefold repetition.
		this.numNonrelevantMoves = 0; // Keep track for fifty move rule.
	};

	Game.prototype.handleClick = function (clickEvent) {
		if(this.currentPlayer.isHumanPlayer){
			var offset = new Chess.Utils.Vector(clickEvent.offsetX, clickEvent.offsetY);
			var clickedSquare = Chess.Renderer.squarePosFromOffset(offset);
			if(this.movingPiece) {
				var move = new Chess.Move(this.movingPiece, clickedSquare);
				if(move.isValid){
					this.move(move);
					this.move();
				} else {
					console.log("Invalid move")
				}
				this.movingPiece = null;
			} else {
				this.movingPiece = Chess.board.pieceAt(clickedSquare);
				console.log(this.movingPiece);
			}
		}
	};

	Game.prototype.move = function (move) {
		// Add current board to this.moves.
		// TODO: Don't add if en passant is possible.
		var currentBoard = Chess.board.toString();
		this.moves[currentBoard] = this.moves[currentBoard] || 0;
		this.moves[currentBoard]++;

		this.currentPlayer.move(move);
		// TODO: Add logic for this.numNonrelevantMoves (fifty move rule).
		this.switchCurrentPlayer();
		Chess.board.render();
	};

	Game.prototype.switchCurrentPlayer = function () {
		this.currentPlayer = this.currentPlayer.opponent();
	};

	Game.prototype.isOver = function () {
		return this.isWon() || this.isDraw();
	};

	Game.prototype.isWon = function () {
		var isWon = Chess.board.isWon(this.currentPlayer);
		if(isWon){
			console.log(this.currentPlayer.color + " wins");
			return true;
		};
	};

	Game.prototype.isDraw = function () {
		// Checks for threefold repetition and fifty move rule. Calls similar
		// function on the board to check for stalemate and insufficient materials.

		// Check for threefold repetition.
		for (var boardString in this.moves) {
			if (this.moves[boardString] > 2) {
				console.log("Threefold Repetition: Stalemate");
				return true;
			}
		};

		// Check the fifty move rule.
		if (this.numNonrelevantMoves > 49) {
			console.log("50 irrelevant moves: Stalemate");
			return true;
		}

		if (Chess.board.isDraw()) {
			console.log("Stalemate");
			return true;
		}
	};
})();

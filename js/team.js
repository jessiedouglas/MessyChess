;(function (){
	var Chess = window.Chess = window.Chess || {};

  var Team = Chess.Team = function (color) {
    this.color = color;
		this.pieces = [];
		this.king = null; // Must be set later.
		this.isHumanPlayer = false;
  };

	Team.COLORS = ["W", "B"];

	Team.prototype.move = function (playerMove) {
		var move;
		if(playerMove){
			move = playerMove;
		} else {
			move = this.getComputerMove();
		}

		// If a piece has been taken, remove it from the other team's roster.
		this.opponent().removePieceIfThere(move.position);
		Chess.board.makeMove(move);
	};

	Team.prototype.getComputerMove = function () {
		var move;
		if (this.isInCheck()) {
			console.log("Check");
			var inCheckMoves = this.validInCheckMoves();
			move = Chess.Utils.sample(inCheckMoves);
		} else {
			var allMoves = this.allMoves();
			move = Chess.Utils.sample(allMoves);
		}
		return move;
	};

	Team.prototype.getHumanMove = function () {
		console.log(this.color + "'s turn");
	};

	Team.prototype.isInCheck = function () {
		var opponent = this.opponent();
		var checked = false;
		opponent.allMoves().forEach(function (move) {
			if (Chess.Utils.equal(move.position, this.king.position)) {
				checked = true;
			}
		}.bind(this));

		return checked;
	};

	Team.prototype.validInCheckMoves = function () {
		var fakeBoard, fakeKing;
		var realBoard = Chess.board;
		var realKing = this.king;
		var possibleKingMoves = this.king.getValidMoves();
		var outOfCheckKingMoves = [];

		possibleKingMoves.forEach(function (move) {
			// Make a duplicate board for experimentation
			fakeBoard = realBoard.deepDup();
			fakeBoard.isFake = true;
			// Set this.king and Chess.board to correspond with our fake board.
			this.king = fakeBoard.square(realKing.position).piece
			move.piece = this.king;
			Chess.board = fakeBoard;

			Chess.board.makeMove(move);
			if (!this.isInCheck()) {
				move.piece = realKing;
				outOfCheckKingMoves.push(move);
			}
		}.bind(this));

		// Reset Chess.board and this.king to the real stuff.
		Chess.board = realBoard;
		this.king = realKing;

		return outOfCheckKingMoves;
	};

	Team.prototype.opponent = function () {
		if (this.color === "W") {
			return Chess.blackTeam;
		}
		return Chess.whiteTeam;
 	};

	Team.prototype.allMoves = function () {
		// TODO: Optimize so this isn't calculated multiple times per turn.
		var moves = [];
		this.pieces.forEach(function (piece) {
			moves = moves.concat(piece.getValidMoves());
		});

		return moves;
	};

	Team.prototype.removePieceIfThere = function (position) {
		// When a piece from the opposing team takes one of the team's pieces, remove
		// the piece from the team's roster.
		var ind;
		for (var i = 0; i < this.pieces.length; i++) {
			if (Chess.Utils.equal(this.pieces[i].position, position)) {
				ind = i;
				break;
			}
		};

		// Remove the piece at that position, if there was one there.
		if (ind) {
			this.pieces.splice(ind, 1);
		}
	};

	Team.prototype.getBishopIfThereIsOne = function () {
		// This is assumed to be called only if there are two pieces remaining on
		// the team. It returns the Bishop or null.
		if (this.pieces[0].getPieceType() === Chess.Bishop) {
			return this.pieces[0];
		}
		if (this.pieces[1].getPieceType() === Chess.Bishop) {
			return this.pieces[1];
		}
		return null;
	};
})();

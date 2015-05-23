;(function (){
	var Chess = window.Chess = window.Chess || {};

  var Team = Chess.Team = function (color) {
    this.color = color;
		this.pieces = [];
		this.king = null; // Must be set later.
  };
  
	Team.prototype.move = function () {
		if (this.isInCheck()) {
			
			
			// move the king
		} else {
			
		}
	};
	
	Team.prototype.isInCheck = function () {
		var opponent = this.opponent();
		var checked = false;
		opponent.allMoves().forEach(function (move) {
			if (Chess.Utils.equal(move, this.king.position)) {
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
			fakeBoard = Chess.board.deepDup();
			// Set this.king and Chess.board to correspond with our fake board.
			this.king = fakeBoard.square(this.king.position).piece
			Chess.board = fakeBoard;
			
			Chess.board.movePiece(this.king.position, move);
			if (!this.isInCheck()) {
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
})();

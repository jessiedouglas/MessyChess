;(function (){
	var Chess = window.Chess = window.Chess || {};

  var Team = Chess.Team = function (color) {
    this.color = color;
		this.pieces = [];
		this.king = null; // Must be set later.
  };
  
	Team.prototype.move = function () {
		var position;
		if (this.isInCheck()) {
			// move the king
		} else {
			
		}
		
		// If a piece has been taken, remove it from the other team's roster.
		this.opponent().removePieceIfThere(position);
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
	
	Team.prototype.removePieceIfThere = function (position) {
		// When a piece from the opposing team takes one of the team's pieces, remove
		// the piece from the team's roster.
		var ind;
		for (var i = 0; i < this.pieces.length; i++) {
			if (Chess.Utils.equals(this.pieces[i].position, position)) {
				ind = i;
				break;
			}
		};
		
		// Remove the piece at that position, if there was one there.
		if (ind) {
			this.pieces = this.pieces.splice(ind, 1);
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

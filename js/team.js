;(function (){
	var Chess = window.Chess = window.Chess || {};

  var Team = Chess.Team = function (color) {
    this.color = color;
		this.pieces = [];
		this.king = null; // Must be set later.
  };
  
	Team.prototype.move = function () {
		if (this.isMated()) {
			var fakeBoard;
			var realBoard = Chess.board;
			var possibleKingMoves = this.king.getValidMoves();
			var unmatedKingMoves = [];
			possibleKingMoves.forEach(function (move) {
				var fakeBoard = Chess.board.deepDup();
				Chess.board = fakeBoard;
				Chess.board.movePiece(this.king.position, move);
				if (!this.isMated()) {
					unmatedKingMoves.push(move);
				}
				Chess.board = realBoard;
			}.bind(this));
			
			// move the king
		} else {
			
		}
	};
	
	Team.prototype.isMated = function (kingPosition) {
		var opponent = (this.color === "W" ? Chess.blackTeam : Chess.whiteTeam);
		opponent.allMoves().forEach(function (move) {
			if (Chess.Utils.equal(move, kingPosition)) {
				return true;
			}
		}.bind(this));
		
		return false;
	};
	
	Team.prototype.allMoves = function () {
		// TODO: Optimize so this isn't calculated multiple times per turn.
		var moves = [];
		this.pieces.forEach(function (piece) {
			moves.concat(piece.getValidMoves());
		});
	};
})();

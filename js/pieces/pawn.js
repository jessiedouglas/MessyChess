;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Board = Chess.Board;
	
	var Utils = Chess.Utils;

	var Vector = Utils.Vector;

	var Pawn = Chess.Pawn = function (color) {
		// Instantiates a pawn.
		Piece.call(this, color);
		this.hasMoved = false;
		this.dir = (this.color === "B" ? 1 : -1);
	};
	
	Pawn.prototype.getMoves = function () {
		// Gets all possible moves for the pawn. This includes rules about taking
		// other pieces.
	  var deltas = this.deltas();
		
		var moves = [];
		if (!this.hasMoved) {
			var longMove = Utils.add(this.position, new Vector(0, this.dir * 2));
			if (board.isEmptyAt(longMove)) {
				moves.push(longMove);
			}
		}
		
		var shortMove = Utils.add(this.position, new Vector(0, this.dir * 1));
		if (board.isEmptyAt(shortMove)) {
			moves.push(shortMove);
		}
		
		[
			new Vector(1, this.dir * 1), 
			new Vector(-1, this.dir * 1)
		].forEach(function (delta) {
			var move = Utils.add(this.position, delta);
			var piece = board.square(move).piece
			if (piece && piece.color !== this.color) {
				moves.push(move);
			}
		}).bind(this);
		
		return moves;
	};

	Chess.Utils.inherits(Chess.Piece, Pawn);
})();

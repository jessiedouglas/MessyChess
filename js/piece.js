;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Piece = Chess.Piece = function (color) {
		this.color = color;
		this.board = null; // Piece must have the board passed to it.
	};
	
	Piece.DIAG_DELTAS = [
		new Vector(1, 1),
		new Vector(1, -1),
		new Vector(-1, 1),
		new Vector(-1, -1),
	];
	
	Piece.ORTHO_DELTAS = [
		new Vector(1, 0),
		new Vector(0, 1),
		new Vector(-1, 0),
		new Vector(0, -1),
	];
	
	var SlidingPiece = Chess.SlidingPiece = function () {};
	
	Chess.Utils.inherits(Piece, SlidingPiece);
	
	var SteppingPiece = Chess.SteppingPiece = function () {};
	
	Chess.Utils.inherits(Piece, SteppingPiece);
})();
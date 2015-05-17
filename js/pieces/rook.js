;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Rook = Chess.Rook = function (color) {
		// Instantiates a rook.
		Chess.SlidingPiece.call(this, color);
	};
	
	Rook.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a rook can make.
		return Chess.Piece.ORTHO_DELTAS;
	};
		
	Chess.Utils.inherits(Chess.SlidingPiece, Rook);
})();
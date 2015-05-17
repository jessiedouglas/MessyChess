;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Rook = Chess.Rook = function (color) {
		Chess.SlidingPiece.call(this, color);
	};
	
	Rook.prototype.deltas = function () {
		return Chess.Piece.ORTHO_DELTAS;
	};
		
	Chess.Utils.inherits(Chess.SlidingPiece, Rook);
})();
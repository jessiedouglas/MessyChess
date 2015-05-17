;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Rook = Chess.Rook = function () {
	};
	
	Rook.prototype.deltas = function () {
		return Chess.Piece.ORTHO_DELTAS;
	};
	
	Rook.IS_SLIDING = true;
	
	Chess.Utils.inherits(Chess.SlidingPiece, Rook);
})();
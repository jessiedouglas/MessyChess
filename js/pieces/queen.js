;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;
	
	var Queen = Chess.Queen = function () {
		
	};
	
	Queen.prototype.deltas = function () {
		return Chess.Piece.DIAG_DELTAS.concat(Chess.Piece.ORTHO_DELTAS);
	};
			
	Chess.Utils.inherits(Chess.SlidingPiece, Queen);
})();
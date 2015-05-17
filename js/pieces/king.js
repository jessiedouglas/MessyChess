;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;
	
	var King = Chess.King = function (color) {
		Chess.SteppingPiece.call(this, color);
	};
	
	King.prototype.deltas = function () {
		return Chess.Piece.DIAG_DELTAS.concat(Chess.Piece.ORTHO_DELTAS);
	};
			
	Chess.Utils.inherits(Chess.SteppingPiece, King);
})();
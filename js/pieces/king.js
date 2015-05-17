;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;
	
	var King = Chess.King = function (color) {
		// Instantiates a king.
		Chess.SteppingPiece.call(this, color);
	};
	
	King.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a king can make.
		return Chess.Piece.DIAG_DELTAS.concat(Chess.Piece.ORTHO_DELTAS);
	};
			
	Chess.Utils.inherits(Chess.SteppingPiece, King);
})();
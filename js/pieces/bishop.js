;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Bishop = Chess.Bishop = function (color) {
		// Instantiates a bishop.
		Chess.SlidingPiec.call(this, color);
	};

	Bishop.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a bishop can make.
		return Chess.Piece.DIAG_DELTAS;
	};

	Chess.inherits(Chess.SlidingPiece, Bishop);
})();

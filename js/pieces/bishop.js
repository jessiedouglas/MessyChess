;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Bishop = Chess.Bishop = function (color) {
		Chess.SlidingPiec.call(this, color);
	};

	Bishop.prototype.deltas = function () {
		return Chess.Piece.DIAG_DELTAS;
	};

	Chess.inherits(Chess.SlidingPiece, Bishop);
})();

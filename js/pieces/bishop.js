;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Bishop = Chess.Bishop = function Bishop(color) {
		// Instantiates a bishop.
		Chess.SlidingPiece.call(this, color, position);
	};

	Chess.Utils.inherits(Chess.SlidingPiece, Bishop);

	Bishop.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a bishop can make.
		return Chess.Piece.DIAG_DELTAS;
	};

	Bishop.prototype.image = function () {
		var text = (this.color == "W" ? "♗" : "♝");
		return document.createTextNode(text);
	};
})();

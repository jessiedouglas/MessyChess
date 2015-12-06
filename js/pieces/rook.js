;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;

	var Rook = Chess.Rook = function Rook(color, position) {
		// Instantiates a rook.
		Chess.SlidingPiece.call(this, color, position);
	};

	Chess.Utils.inherits(Chess.SlidingPiece, Rook);

	Rook.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a rook can make.
		return Chess.Piece.ORTHO_DELTAS;
	};

	Rook.prototype.image = function () {
		var text = (this.color == "W" ? "♖" : "♜");
		return document.createTextNode(text);
	};
})();

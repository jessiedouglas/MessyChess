;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;
	
	var Queen = Chess.Queen = function (color) {
		// Instantiates a queen.
		Chess.SlidingPiece.call(this, color);
	};
	
	Chess.Utils.inherits(Chess.SlidingPiece, Queen);
	
	Queen.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a queen can make.
		return Chess.Piece.DIAG_DELTAS.concat(Chess.Piece.ORTHO_DELTAS);
	};
	
	Queen.prototype.image = function () {
		var text = (this.color == "W" ? "♕" : "♛");
		return document.createTextNode(text);
	};
})();
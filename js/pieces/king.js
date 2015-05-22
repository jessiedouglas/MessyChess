;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;
	
	var King = Chess.King = function (color, position) {
		// Instantiates a king.
		Chess.SteppingPiece.call(this, color, position);
	};

	Chess.Utils.inherits(Chess.SteppingPiece, King);
	
	King.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a king can make.
		return Chess.Piece.DIAG_DELTAS.concat(Chess.Piece.ORTHO_DELTAS);
	};
	
	King.prototype.image = function () {
		var text = (this.color == "W" ? "♔" : "♚");
		return document.createTextNode(text);
	};
})();
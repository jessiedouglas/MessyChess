;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Knight = Chess.Knight = function Knight(color, position) {
		// Instantiates a knight.
		Chess.SteppingPiece.call(this, color, position);
	};

	Chess.Utils.inherits(Chess.SteppingPiece, Knight);

	Knight.prototype.deltas = function () {
		// Returns all the potential changes in position (i.e. moves relative to the
		// current position) that a knight can make.
		return [
			new Vector(2, 1),
			new Vector(1, 2),
			new Vector(2, -1),
			new Vector(1, -2),
			new Vector(-2, 1),
			new Vector(-1, 2),
			new Vector(-2, -1),
			new Vector(-1, -2),
		];
	};

	Knight.prototype.image = function () {
		var text = (this.color == "W" ? "♘" : "♞");
		return document.createTextNode(text);
	};
})();

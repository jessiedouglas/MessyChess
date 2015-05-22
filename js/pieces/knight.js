;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Knight = Chess.Knight = function (color) {
		// Instantiates a knight.
		Chess.SteppingPiece.call(this, color);
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
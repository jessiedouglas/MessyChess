;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Knight = Chess.Knight = function (color) {
		// Instantiates a knight.
		Chess.SteppingPiece.call(this, color);
	};
	
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
		
	Chess.Utils.inherits(Chess.SteppingPiece, Knight);
})();
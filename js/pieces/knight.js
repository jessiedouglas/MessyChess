;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Knight = Chess.Knight = function (color) {
		Chess.SteppingPiece.call(this, color);
	};
	
	Knight.prototype.deltas = function () {
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
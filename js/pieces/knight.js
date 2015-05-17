;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Knight = Chess.Knight = function () {
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
;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Pawn = Chess.Pawn = function () {
	};

	Pawn.prototype.deltas = function () {
		var dir = (this.color === "B" ? 1 : -1)

		return [
			new Vector(0, dir * 1),
			new Vector(0, dir * 2),
			new Vector(1, dir * 1),
			new Vector(-1, dir * 1),
		];
	};

	Chess.Utils.inherits(Chess.Piece, Pawn);
})();

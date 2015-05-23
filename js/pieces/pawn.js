;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Board = Chess.Board;

	var Utils = Chess.Utils;

	var Vector = Utils.Vector;

	var Pawn = Chess.Pawn = function Pawn(color, position) {
		// Instantiates a pawn.
		Chess.Piece.call(this, color, position);
		this.hasMoved = false;
		this.dir = (this.color === "B" ? 1 : -1);
	};

	Chess.Utils.inherits(Chess.Piece, Pawn);

	Pawn.prototype.getMoves = function () {
		// Gets all possible moves for the pawn. This includes rules about taking
		// other pieces.
		var moves = [];
		if (!this.hasMoved) {
			var longMove = Utils.add(this.position, new Vector(0, this.dir * 2));
			if (Chess.board.isEmptyAt(longMove)) {
				moves.push(longMove);
			}
		}

		var shortMove = Utils.add(this.position, new Vector(0, this.dir * 1));
		if (Chess.board.isEmptyAt(shortMove)) {
			moves.push(shortMove);
		}

		[
			new Vector(1, this.dir * 1),
			new Vector(-1, this.dir * 1)
		].forEach(function (delta) {
			var move = Utils.add(this.position, delta);
			var square = Chess.board.square(move)
			if (square && square.piece && square.piece.color !== this.color) {
				moves.push(move);
			}
		}.bind(this));

		return moves;
	};

	Pawn.prototype.image = function () {
		var text = (this.color == "W" ? "♙" : "♟");
		return document.createTextNode(text);
	};
})();

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
			var longMovePos = Utils.add(this.position, new Vector(0, this.dir * 2));
			if (Chess.board.isEmptyAt(longMovePos)) {
				var longMove = new Chess.Move(this, longMovePos);
				moves.push(longMove);
			}
		}

		var shortMovePos = Utils.add(this.position, new Vector(0, this.dir * 1));
		if (Chess.board.isEmptyAt(shortMovePos)) {
			var shortMove = new Chess.Move(this, shortMovePos);
			moves.push(shortMove);
		}

		[
			new Vector(1, this.dir * 1),
			new Vector(-1, this.dir * 1)
		].forEach(function (delta) {
			var movePos = Utils.add(this.position, delta);
			var square = Chess.board.square(movePos);
			if (square && square.piece && square.piece.color !== this.color) {
				var move = new Chess.Move(this, movePos);
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

;(function () {
	Chess = window.Chess = window.Chess || {};

	var Board = Chess.Board = function () {
		this.buildSquares();
		this.conjurePieces();
	};

	Board.prototype.buildSquares = function () {
		this.squares = [];
		for (var i = 0; i < 8; i++) {
			var row = [];
			for (var i = 0; i < 8; i++) {
				row.push(new Square());
			}
			this.squares.push(row);
		}
	};

	Board.prototype.conjurePieces = function () {
		var backRow = [
			"Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"
		];
		for (var x = 0; x < backRow.length; x++) {
			var blackPiece = new Chess[this.backRow[x]]("B");
			var whitePiece = new Chess[this.backRow[x]]("W");

			//TODO Pass piece to team?
			
			this.square(new Vector(x, 0)).setPiece(blackPiece);
			this.square(new Vector(x, 1)).setPiece(new Chess.Pawn("B"))

			this.square(new Vector(x, 7)).setPiece(whitePiece);
			this.square(new Vector(x, 6)).setPiece(new Chess.Pawn("W"))
		}
	};

	Board.prototype.square = function (position) {
		return this.squares[position.y][position.x];
	};

	Board.prototype.movePiece = function (start_sq, end_sq) {
		var piece = this.square(start_sq).piece;

		this.square(start_sq).setPiece(null);
		this.square(end_sq).setPiece(piece);
	};

	Board.prototype.isEmptyAt = function (position) {
		return this.square(position).piece === null;
	};


	var Square = Chess.Square = function (piece) {
		this.piece = piece || null;
	};

	Square.prototype.setPiece = function (piece) {
		this.piece = piece;
	};

})();

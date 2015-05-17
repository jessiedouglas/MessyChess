;(function () {
	Chess = window.Chess = window.Chess || {};

	var Board = Chess.Board = function () {
		this.buildSquares();
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

	Board.prototype.square = function (position) {
		return this.squares[position.y][position.x];
	};

	Board.prototype.movePiece = function (start_sq, end_sq) {
		var piece = this.square(start_sq).piece;

		this.square(start_sq).setPiece(null);
		this.square(end_sq).setPiece(piece);
	};


	var Square = Chess.Square = function (piece) {
		this.piece = piece || null;
	};

	Square.prototype.setPiece = function (piece) {
		this.piece = piece;
	};


})();

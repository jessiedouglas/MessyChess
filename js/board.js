;(function () {
	Chess = window.Chess = window.Chess || {};
	
	var Vector = Chess.Utils.Vector;

	var Board = Chess.Board = function () {
		this.el = document.getElementById("chessboard");
		this.buildSquares();
		this.conjurePieces();
	};

	Board.prototype.buildSquares = function () {
		this.squares = [];
		var row;
		for (var i = 0; i < 8; i++) {
			row = [];
			for (var j = 0; j < 8; j++) {
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
			var blackPiece = new Chess[backRow[x]]("B");
			var whitePiece = new Chess[backRow[x]]("W");
			//TODO Pass piece to team?
			
			this.square(new Vector(x, 0)).setPiece(blackPiece);
			this.square(new Vector(x, 1)).setPiece(new Chess.Pawn("B"))

			this.square(new Vector(x, 7)).setPiece(whitePiece);
			this.square(new Vector(x, 6)).setPiece(new Chess.Pawn("W"));
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
	
	Board.prototype.render = function () {
		this.el.innerHTML = "";
		
		var squares = Chess.board.squares;
		for (var i = 0; i < squares.length; i++) {
			this.renderRow(squares[i], i);
		};
	};
	
	Board.prototype.renderRow = function (row, row_i) {
		var position, piece, image, html, el, fullText;
		
		for (var j = 0; j < row.length; j++) {
			position = new Vector(j, row_i);
			piece = Chess.board.square(position).piece;
			image = !!piece ? piece.image() : '';
			html = Chess.Utils.Template.squareView(position, image);
			this.el.insertAdjacentElement('beforeend', html);
		};
	};


	var Square = Chess.Square = function (piece) {
		this.piece = piece || null;
	};

	Square.prototype.setPiece = function (piece) {
		this.piece = piece;
	};

})();

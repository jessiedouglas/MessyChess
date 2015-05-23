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
		// Create pieces, add them to the board, and add them to each team's roster.
		var pieces, pos, team;
		var backRow = [
			"Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"
		];
		
		for (var x = 0; x < backRow.length; x++) {	
			pieces = [
				new Chess[backRow[x]]("B", new Vector(x, 0)),
			  new Chess[backRow[x]]("W", new Vector(x, 7)),
				new Chess.Pawn("B", new Vector(x, 1)),
				new Chess.Pawn("W", new Vector(x, 6)),
			];
			
			pieces.forEach(function (piece) {
				pos = piece.position;
				// Add piece to the board.
				this.square(pos).setPiece(piece);
				// Add piece to team's roster.
				team = (piece.color === "W" ? Chess.whiteTeam : Chess.blackTeam);
				team.pieces.push(piece);
				if (piece.getPieceType() === Chess.King) {
					team.king = piece;
				}
			}.bind(this));
		}
	};

	Board.prototype.square = function (position) {
		return this.squares[position.y][position.x];
	};

	Board.prototype.movePiece = function (startPos, endPos) {
		var piece = this.square(startPos).piece;

		this.square(startPos).setPiece(null);
		this.square(endPos).setPiece(piece);
		piece.position = endPos;
	};

	Board.prototype.isEmptyAt = function (position) {
		return this.square(position).piece === null;
	};
	
	Board.prototype.isOffBoard = function (position) {
		var xOff = position.x < 0 || position.x > 7;
		var yOff = position.y < 0 || position.y > 7;
		return xOff || yOff;
	};
	
	Board.prototype.isWon = function () {
		// body...
	};
	
	Board.prototype.isDraw = function () {
		// body...
	};
	
	Board.prototype.deepDup = function () {
		var pos, piece, pieceType, newPiece;
		var newBoard = new Board();
		for (var y = 0; y < this.squares.length; y++) {
			for (var x = 0; x < this.squares[y].length; x++) {
				pos = new Vector(x, y);
				piece = this.square(pos).piece;
				console.log(piece);
				if (!!piece) {
					pieceType = piece.getPieceType();
					newPiece = new pieceType(piece.color, pos);
					newBoard.square(pos).setPiece(newPiece);
				} else {
					newBoard.square(pos).setPiece(null);
				}
			};
		};
		
		return newBoard;
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

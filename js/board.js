;(function () {
	Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Board = Chess.Board = function (shouldPopulateTeams) {
		this.el = document.getElementById("chessboard");
		this.buildSquares();
		this.conjurePieces(shouldPopulateTeams);
		this.hasBeenWon = false;
		// this.render();
	};

	Board.prototype.buildSquares = function () {
		console.log("Building board");
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

	Board.prototype.conjurePieces = function (shouldPopulateTeams) {
		console.log("Conjuring Pieces");
		// Create pieces, add them to the board, and add them to each team's roster.

		// Populate teams by default.
		if (shouldPopulateTeams === undefined) {
			shouldPopulateTeams = true;
		}

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
				if (shouldPopulateTeams) {
					team = (piece.color === "W" ? Chess.whiteTeam : Chess.blackTeam);
					team.pieces.push(piece);
					if (piece.getPieceType() === Chess.King) {
						team.king = piece;
					}
				}
			}.bind(this));
		}
	};

	Board.prototype.square = function (position) {
		return this.squares[position.y][position.x];
	};

	Board.prototype.makeMove = function (move) {
		var piece = move.piece;
		var newPos = move.position;

		this.square(piece.position).setPiece(null);
		this.square(newPos).setPiece(piece);
		piece.position = newPos;
		console.log(piece.constructor.name + " to " + newPos.asBoardPosition());
	};

	Board.prototype.isEmptyAt = function (position) {
		return this.square(position).piece === null;
	};

	Board.prototype.isOffBoard = function (position) {
		var xOff = position.x < 0 || position.x > 7;
		var yOff = position.y < 0 || position.y > 7;
		return xOff || yOff;
	};

	Board.prototype.isWon = function (currentPlayer) {
		if (this.hasBeenWon) {
			return true;
		}
		this.hasBeenWon = currentPlayer.isInCheck() &&
		                  currentPlayer.validInCheckMoves().length === 0;
		return this.hasBeenWon;
	};

	Board.prototype.isDraw = function () {
		// Checks for draws through stalemate and insufficient materials, but not
		// through threefold repetition or the fifty move rule.
		var white = Chess.whiteTeam;
		var black = Chess.blackTeam;

		// Check for stalemate.
		var players = [white, black];
		for (var i = 0; i < players.length; i++) {
			if (players[i].allMoves().length === 0 && !players[i].isInCheck()) {
				return true;
			}
		};

		// Check for insufficient materials.
		var first, second;
		if (white.pieces.length === 1 && black.pieces.length === 1){
			return true;
		}
		if (white.pieces.length == 1 && black.pieces.length == 2) {
			first = black.pieces[0].getPieceType();
			second = black.pieces[1].getPieceType();
			if (first === Chess.Bishop || second === Chess.Bishop) {
				return true;
			}
			if (first === Chess.Knight || second === Chess.Knight) {
				return true;
			}
		}
		if (white.pieces.length == 2 && black.pieces.length == 1) {
			first = white.pieces[0].getPieceType();
			second = white.pieces[1].getPieceType();
			if (first === Chess.Bishop || second === Chess.Bishop) {
				return true;
			}
			if (first === Chess.Knight || second === Chess.Knight) {
				return true;
			}
		}
		if (white.pieces.length === 2 && black.pieces.length === 2) {
			var whiteBishop = white.getBishopIfThereIsOne();
			var blackBishop = black.getBishopIfThereIsOne();
			// Check to see if both are on the same color.
			if (whiteBishop && blackBishop) {
				var whiteTileColor = whiteBishop.position.x + whiteBishop.position.y;
				var blackTileColor = blackBishop.position.x + blackBishop.position.y;
				if (whiteTileColor % 0 === blackTileColor % 0) {
					return true;
				}
			}
		}
		return false;
	};

	Board.prototype.deepDup = function () {
		var pos, piece, pieceType, newPiece;
		var newBoard = new Board(false);
		this.forEachSquare(function(square){
			piece = square.piece;
			if (!!piece) {
				pieceType = piece.getPieceType();
				newPiece = new pieceType(piece.color, pos);
				newBoard.square(pos).setPiece(newPiece);
			} else {
				newBoard.square(pos).setPiece(null);
			}
		});

		return newBoard;
	};

	Board.prototype.forEachSquare = function (callback) {
		for (var y = 0; y < this.squares.length; y++) {
			for (var x = 0; x < this.squares[y].length; x++) {
				pos = new Vector(x, y);
				square = this.square(pos);
				callback(square);
			}
		}
	};

	Board.prototype.toString = function () {
		var boardString = "", squareString;
		this.forEachSquare(function (square){
			if (square.piece) {
				squareString = square.piece.color + square.piece.constructor.name + ",";
			} else {
				squareString = ","
			}
			boardString += squareString;
		});
		return boardString;
		// TODO: Add logic for whether each team can castle.
	};

	Board.prototype.renderOnCanvas = function (ctx) {
		for (var i = 0; i < this.squares.length; i++) {
			this.renderRow(this.squares[i], i);
		};
	};

	Board.prototype.renderRowOnCanvas = function (row, row_i) {
		var position, piece;

		for (var j = 0; j < row.length; j++) {
			position = new Vector(j, row_i);
			piece = this.square(position).piece;
			if (piece) {
				Chess.renderer.renderPiece(piece);
			}
		}
	};

	Board.prototype.render = function () {
		// this.el.innerHTML = "";
		//
		// var squares = Chess.board.squares;
		// for (var i = 0; i < squares.length; i++) {
		// 	this.renderRow(squares[i], i);
		// };
		Chess.renderer.renderBoard();
		this.renderOnCanvas();
	};

	Board.prototype.renderRow = function (row, row_i) {
		// var position, piece, image, html, el, fullText;
		//
		// for (var j = 0; j < row.length; j++) {
		// 	position = new Vector(j, row_i);
		// 	piece = Chess.board.square(position).piece;
		// 	image = !!piece ? piece.image() : '';
		// 	html = Chess.Utils.Template.squareView(position, image);
		// 	this.el.insertAdjacentElement('beforeend', html);
		// };
		this.renderRowOnCanvas(row, row_i);
	};

	var Square = Chess.Square = function (piece) {
		this.piece = piece || null;
	};

	Square.prototype.setPiece = function (piece) {
		this.piece = piece;
	};

})();

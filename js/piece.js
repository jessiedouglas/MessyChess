;(function () {
	var Chess = window.Chess = window.Chess || {};

	var Vector = Chess.Utils.Vector;

	var Piece = Chess.Piece = function Piece(color, position) {
		// Instantiates a new piece.
		this.color = color;
		this.position = position;
	};

	Piece.NAMES = ["King", "Queen", "Bishop", "Knight", "Rook", "Pawn"];

	Piece.DIAG_DELTAS = [
		new Vector(1, 1),
		new Vector(1, -1),
		new Vector(-1, 1),
		new Vector(-1, -1),
	];

	Piece.ORTHO_DELTAS = [
		new Vector(1, 0),
		new Vector(0, 1),
		new Vector(-1, 0),
		new Vector(0, -1),
	];

	Piece.SPRITE = new Image();
	Piece.SPRITE.src = 'assets/Chess_Pieces_Sprite.svg'

	Piece.prototype.getValidMoves = function () {
		// Finds all the valid moves for the piece. "Valid" moves takes into account
		// rules for directions a given piece can move, occupied spaces, and
		// off-board spaces. It does NOT account for a king being in check.
		var moves = this.getMoves();
		moves = this.removeOffBoardMoves(moves);
		moves = this.removeOccupiedMoves(moves);
		moves.concat(this.addUnusualMoves());
		return moves;
	};

	Piece.prototype.removeOffBoardMoves = function (moves) {
		// Removes any moves that fall off the board.
		var onBoardMoves = [];
		moves.forEach(function (move) {
			if (!Chess.board.isOffBoard(move)) {
				onBoardMoves.push(move);
			}
		});

		return onBoardMoves;
	};

	Piece.prototype.removeOccupiedMoves = function (moves) {
		// Removes any moves that fall on a space occupied by a piece of the same
		// color as the current piece.
		var unoccupiedMoves = [];
		moves.forEach(function (move) {
			var square = Chess.board.square(move.position);
			var occupyingPiece = square.piece;
			if (!occupyingPiece || occupyingPiece.color !== this.color) {
				unoccupiedMoves.push(move);
			}
		}.bind(this));

		return unoccupiedMoves;
	};

	Piece.prototype.addUnusualMoves = function () {
		// TODO: Add castling and en passant rules here...
		return [];
	};

	Piece.prototype.mostValuableMove = function (moves) {
		// TODO: Add an actual algorithm.
		return moves[0];
	};

	Piece.prototype.getPieceType = function () {
		return this.constructor;
	};


	var SlidingPiece = Chess.SlidingPiece = function (color, position) {
		// Instantiates a sliding piece (i.e. Queen, Bishop, or Rook).
		Piece.call(this, color, position);
	};

	Chess.Utils.inherits(Piece, SlidingPiece);

	SlidingPiece.prototype.getMoves = function () {
		// Gets moves for sliding pieces. Includes moves for occupied spaces of
		// either color, but not ones beyond the occupied spaces.
		var deltas = this.deltas();

		var moves = [];
		deltas.forEach(function (delta) {
			var newPos = Chess.Utils.add(this.position, delta);
			while (!Chess.board.isOffBoard(newPos) && Chess.board.isEmptyAt(newPos)) {
				// Advance the position in the direction of delta;
				// add the new position to moves.
				moves.push(new Chess.Move(this, newPos));
				newPos = Chess.Utils.add(newPos, delta);
			};
			if(!Chess.board.isOffBoard(newPos)){
				moves.push(new Chess.Move(this, newPos));
			}
		}.bind(this));

		return moves;
	};



	var SteppingPiece = Chess.SteppingPiece = function (color, position) {
		// Instantiates a stepping piece (i.e. King or Knight).
		Piece.call(this, color, position);
  };

	Chess.Utils.inherits(Piece, SteppingPiece);

	SteppingPiece.prototype.getMoves = function () {
		// Gets moves for stepping pieces. Includes all occupied moves.
		var deltas = this.deltas();

		var moves = [];
		deltas.forEach(function (delta) {
			var newPos = Chess.Utils.add(this.position, delta);
			if(!Chess.board.isOffBoard(newPos)){
				moves.push(new Chess.Move(this, newPos));
			}
		}.bind(this));

		return moves;
	};
})();

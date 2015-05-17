;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var board = Chess.board;
	
	var Vector = Chess.Utils.Vector;
	
	var Piece = Chess.Piece = function (color) {
		// Instantiates a new piece.
		this.color = color;
		this.position = null; //Piece must have its initial position passed to it.
	};
	
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
			if (!board.isOffBoard(move)) {
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
			var piece = board.square(move).piece
			if (!piece || piece.color !== this.color) {
				unoccupiedMoves.push(move);
			}
		}).bind(this);
		
		return unoccupiedMoves;
	};
	
	Piece.prototype.addUnusualMoves = function () {
		// TODO: Add castling and en passant rules here...
		return [];
	};
	
	Piece.prototype.calculateMostValuableMove = function (moves) {
		// TODO: Add an actual algorithm.
		return moves[0];
	};
	
	
	var SlidingPiece = Chess.SlidingPiece = function (color) {
		// Instantiates a sliding piece (i.e. Queen, Bishop, or Rook).
		Piece.call(this, color);
	};
	
	SlidingPiece.prototype.getMoves = function () {
		// Gets moves for sliding pieces. Includes moves for occupied spaces of 
		// either color, but not ones beyond the occupied spaces.
		var deltas = this.deltas();
		
		var moves = [];
		deltas.forEach(function (delta) {
			var current = this.position;
			while (board.isEmptyAt(current) && !board.isOffBoard(current)) {
				// Advance the position in the direction of delta; 
				// add the new position to moves.
				current = Chess.Utils.add(this.position, delta);
				moves.push(current);
			};
		}).bind(this);
		
		return moves;
	};
	
	Chess.Utils.inherits(Piece, SlidingPiece);
	
	
	var SteppingPiece = Chess.SteppingPiece = function (color) {
		// Instantiates a stepping piece (i.e. King or Knight).
		Piece.call(this, color);
  };
	
	SteppingPiece.prototype.getMoves = function () {
		// Gets moves for stepping pieces. Includes all occupied moves.
		var deltas = this.deltas();
		
		var moves = [];
		deltas.forEach(function (delta) {
			var move = Chess.Utils.add(this.position, delta);
			moves.push(move);
		}).bind(this);
		
		return moves;
	};
	
	Chess.Utils.inherits(Piece, SteppingPiece);
})();
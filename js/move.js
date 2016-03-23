;(function () {
	Chess = window.Chess = window.Chess || {};

  var Move = window.Chess.Move = function (piece, position) {
    this.piece = piece;
    this.position = position;
  };
	Move.prototype.isValid = function () {
		var validMovesForPiece = this.piece.getValidMoves;
		for(i = 0; i < validMovesForPiece.length; i++) {
			if (validMovesForPiece[i].position.equal(this.position)) {
				return true;
			}
		}
		return false;
	};

})();

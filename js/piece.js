;(function () {
	var Chess = window.Chess = window.Chess || {};
	
	var Piece = Chess.Piece = function (color) {
		this.color = color;
		this.board = null; // Piece must have the board passed to it.
	};
})();
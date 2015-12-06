;(function () {

  var Chess = window.Chess = window.Chess || {};

  var Vector = Chess.Utils.Vector;

  var Renderer = Chess.Renderer = function (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  };

  Renderer.SPRITE_PIECE_SIZE = new Vector(45,45);
  Renderer.BOARD_SQUARE_SIZE = new Vector(50,50);

  Renderer.spritePositionOf = function (piece) {
    var nameIdx = Chess.Piece.NAMES.indexOf(piece.constructor.name);
    var colorIdx = Team.COLORS.indexOf(piece.color);

    var posX = Renderer.SPRITE_PIECE_SIZE.x * nameIdx;
    var posY = Renderer.SPRITE_PIECE_SIZE.y * colorIdx;

    return new Vector(posX, posY);
  };

  Renderer.positionOnBoardOf = function (piece) {
    var posX = Renderer.BOARD_SQUARE_SIZE.x * piece.position.x;
    var posY = Renderer.BOARD_SQUARE_SIZE.y * piece.position.y;

    return new Vector(posX, posY);
  };


  Renderer.prototype.renderPiece = function (piece) {
    var spritePosition = Renderer.spritePositionOf(piece);
    var positionOnBoard = Renderer.positionOnBoardOf(piece);

    this.ctx.drawImage(
      Chess.Piece.SPRITE,

      spritePosition.x,
      spritePosition.y,

      Renderer.SPRITE_PIECE_SIZE.x,
      Renderer.SPRITE_PIECE_SIZE.y,

      positionOnBoard.x,
      positionOnBoard.y,

      Renderer.BOARD_SQUARE_SIZE.x,
      Renderer.BOARD_SQUARE_SIZE.y
    );
  };

  Renderer.prototype.renderBoard = function (board) {

    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if ((i % 2) === (j % 2)) {
          this.ctx.fillStyle = "navajowhite"
        } else {
          this.ctx.fillStyle = "#693810"
        }
        this.ctx.fillRect(50*i, 50*j, 50, 50);
      }
    }
  };

})();

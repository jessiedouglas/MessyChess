;(function (){
	var Chess = window.Chess = window.Chess || {};

	Chess.inherits = function (parent, child) {
		function Surrogate() = {};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
	};

	var Utils = Chess.Utils = {};

	var Vector = Utils.Vector = function (x, y) {
		this.x = x
		this.y = y
	};

	var add = Utils.add = function(vector1, vector2) {
		var newX = vector1.x + vector2.x;
		var newY = vector1.y + vector2.y;

		return new Vector(newX, newY);
	};

	var scale = Utils.scale = function(vector, scalar) {
		var newX = vector.x * scalar;
		var newY = vector.y * scalar;

		return new Vector(newX, newY);
	};

})();
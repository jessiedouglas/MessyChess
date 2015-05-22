;(function (){
	var Chess = window.Chess = window.Chess || {};

	var Utils = Chess.Utils = {};

	Chess.Utils.inherits = function (parent, child) {
		function Surrogate() {};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
	};

	var Vector = Utils.Vector = function (x, y) {
		this.x = x;
		this.y = y;
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
	
	
  var Template = Utils.Template = {};
	
	Template.squareView = function (position, image) {
		var image = image || document.createTextNode('');
		var posValue = position.x + position.y;
		var className = posValue % 2 == 0 ? "white-square" : "black-square";
		var idName = '' + position.x + position.y;
		var element = document.createElement("div");
		element.className = className;
		element.id = idName;
		element.appendChild(image);
		return element;
	};
})();

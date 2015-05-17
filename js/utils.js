;(function (){
	Chess = window.Chess = window.Chess || {};
	
	Chess.inherits = function (parent, child) {
		function Surrogate() = {};
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();
	};
})();
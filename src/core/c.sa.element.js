/*
 * Simple Animation c.sa.element:
 */
;var animationElement = function(el, _options, callback){
	
	if(!el) { return "must provide element"; }

	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var Element;
	var options;
	var instructions = "these are the rules for using this Object";
	_options = (_options) ? _options : {};

	var animationElementIinitialize = function(_options, callback) {

		var defaults = { 
			element:null,
			type:"css",
			unit:"px",
			inRange: "before",
			animationStartPoint: 0,//percent of scroll or px… formatted as string
			animationEndPoint: 100,//percent of scroll or px… formatted as string
			startValues: {},
			endValues: {},
			animationStepCallBack:{},
			easing:"none",
			currStep:0,
			storeInElement:false,
			animationCompleteCallBack:function(e) {}
			};
			
		options = mergeObjects(defaults, _options);
		if(callback) {
			options.scrollCompleteCallback = callback;
		}
		
		options.element = el;
		Element = zest(options.element);
		
		
	};
	
	animationElementIinitialize(_options, callback);
	
	 
	////PUBLIC METHODS
	_inst.model = function() {
		return options;
	}
	
	_inst.element = function() {
		return options.element;
	}
	
	_inst.goToFrame = function(e) {
		options.animationStepCallBack(e);
	}
	  
};
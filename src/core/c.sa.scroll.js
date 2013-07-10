/*
 * Simple Animation c.sa.scroll:
 */
;var sScrollAnimation = function sScrollAnimation(_options, callback){

	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var instructions = "";
	_options = (_options) ? _options : {};
	
	var scrollAnimationInitialize = function(_options, callback) {
		
		simpleAnimation.call(_inst);
		
		var defaults = { 
			context:window,
			autoEnable:false
			};
			
		_inst.options = mergeObjects(defaults, _inst.options);
		_inst.options = mergeObjects(_inst.options, _options);
		
		if(callback) {
			_inst.options.animateCompleteCallback = callback;
		}
		_inst.options.instructions = instructions;
		//$(_inst.options.context).data("simpleAnimation", _inst);
		if(_inst.options.autoEnable == true) {
			_inst.bindScroll();
		}
		
		_inst.setStepValues()
		
	};
	
	////PUBLIC VARS
	///////////////
	
	////PUBLIC METHODS
	//////////////////
	_inst.bindScroll = function() {	
		var Element = ( this.options.context== window ) ? window : ( zest(this.options.context).length ) ? zest(this.options.context)[0] : zest(this.options.context);
		log(this.options.context)
		vine.unbind( Element, 'scroll', _inst.step )
		vine.bind( Element, 'scroll', _inst.step )
	}
	
	_inst.unBindScroll = function() {
		_inst.options.context.unbind('scroll', _inst.step)
	}
	
	scrollAnimationInitialize(_options, callback)
};


////INHERITANCE
///////////////
sScrollAnimation.prototype = new simpleAnimation();
sScrollAnimation.prototype.constructor = sScrollAnimation;

sScrollAnimation.prototype.setStepValues = function() {
	var param = (this.options.context==window) ? "" : this.options.context;
	var contentHeight  = getHeight(param);
	var ElementHeight = ( this.options.context== window ) ? window.innerHeight : ( zest(this.options.context).length ) ? zest(this.options.context)[0].offsetHeight : zest(this.options.context).offsetHeight;
	 log(ElementHeight)
	this.options.totalSteps = contentHeight - ElementHeight;
};

sScrollAnimation.prototype.calculateCurrentStep = function() {
    var param = (this.options.context==window) ? "" : this.options.context;
    var currentStep = getScrollTop(param);
	return currentStep;
};

sScrollAnimation.prototype.stepComplete = function() {

};
/*
 * Simple Animation c.sa.touchmove:
 */
;var sTouchMoveAnimation = function sTouchMoveAnimation	(_options, callback){

	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var instructions = "";
 	_options = (_options) ? _options : {};
 	_inst.touchmoveTop = 0;
 	_inst.lastTouchY = -1;
	
	var touchMoveAnimationInitialize = function(_options, callback) {

		
		simpleAnimation.call(_inst);
		
		var defaults = { 
			context:window,
			autoEnable:false,
			maxTop:10000,
			multiplier:1,
			scrollStepCallBack:function(e){}
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
		
		//_inst.setStepValues()
		
	};
	
	function beginScroll(e){ 
		_inst.lastTouchY = e.changedTouches[0].screenY;
	}
	function endScroll(e){
		_inst.lastTouchY = -1;
	}

	function internalStep(e){
		e.preventDefault();
		_inst.touchmoveTop -= (e.changedTouches[0].screenY - _inst.lastTouchY) * _inst.options.multiplier;
		if(_inst.touchmoveTop < 0){
			_inst.touchmoveTop = 0;
		}else if(_inst.touchmoveTop > _inst.options.maxTop){
			_inst.touchmoveTop = _inst.options.maxTop;
		}
		_inst.lastTouchY = e.changedTouches[0].screenY
		_inst.step();
		log(_inst.touchmoveTop)
		_inst.options.scrollStepCallBack(_inst.touchmoveTop)
	}

	////PUBLIC VARS
	///////////////
	
	////PUBLIC METHODS
	//////////////////
	_inst.bindScroll = function() {	
		_inst.options.context.removeEventListener('touchmove', internalStep);
		_inst.options.context.addEventListener('touchmove', internalStep);
		_inst.options.context.removeEventListener('touchstart', beginScroll);
		_inst.options.context.addEventListener('touchstart', beginScroll);
		_inst.options.context.removeEventListener('touchend', endScroll);
		_inst.options.context.addEventListener('touchend', endScroll);
	}
	
	_inst.unBindScroll = function() {
		_inst.options.context.removeEventListener('touchmove', internalStep);
		_inst.options.context.removeEventListener('touchstart', beginScroll);
		_inst.options.context.removeEventListener('touchend', endScroll);
	}

	_inst.maxTop = function(e) {
		_inst.options.maxTop = e;
	}

	_inst.touchStep = function(e) {
		if(!e) {
			return _inst.touchmoveTop;
		} else {
			_inst.touchmoveTop = e;
			_inst.step()
		}
	}

	
	touchMoveAnimationInitialize(_options, callback)

};


////INHERITANCE
///////////////
sTouchMoveAnimation.prototype = new simpleAnimation();
sTouchMoveAnimation.prototype.constructor = sTouchMoveAnimation;


sTouchMoveAnimation.prototype.calculateCurrentStep = function() {
    var currentStep = this.touchmoveTop;
	return currentStep;
};

sTouchMoveAnimation.prototype.stepComplete = function() {

};
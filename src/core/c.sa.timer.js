/*
 * Simple Animation c.sa.timer:
 */
;var sTimerAnimation = function(_options, callback){
	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var instructions = "";
	_options = (_options) ? _options : {};
	
	var timerAnimationInitialize = function(_options, callback) {
		
		simpleAnimation.call(_inst);
		
		var defaults = { 
			totalTime:10000,
			autoStart:false,
			timerON:true,
			};
			
		_inst.options = mergeObjects(defaults, _inst.options);
		_inst.options = mergeObjects(_inst.options, _options);
		
		if(callback) {
			_inst.options.animateCompleteCallback = callback;
		}
		_inst.options.instructions = instructions;
		// if(!_inst.options.element) {
		// 	$(_inst.options.element).data("timerAnimation", _inst);
		// }
		_inst.options.totalSteps = _inst.options.totalTime / 16;
		if(_inst.options.autoStart == true) {
			_inst.timerStart();
		}
		
		// log(_inst);
	};
	
	
	////PUBLIC VARS
	_inst.currentStep = 0;
	
	////PUBLIC METHODS
	_inst.Timer = function(timestamp) {
		if(_inst.options.timerON != false) {
			window.requestAnimationFrame(_inst.Timer);
			_inst.processStep();
		}
	}
	
	_inst.timerStart = function() {
		// log('timerStart');
		_inst.options.timerON = true;
		window.requestAnimationFrame(_inst.Timer);
	}
	
	_inst.timerStop = function() {
		// log('timerStop')
		window.cancelAnimationFrame(_inst.Timer);
		_inst.options.timerON = false;
	}
	
	_inst.timerReset = function() {
		// log('timerReset');
		_inst.currentStep = 0;
		currentStep = _inst.options.firstStep
	}
	
	
	timerAnimationInitialize(_options, callback)
};

sTimerAnimation.prototype = new simpleAnimation();
sTimerAnimation.prototype.constructor = sTimerAnimation;

sTimerAnimation.prototype.calculateCurrentStep = function() {
	 return this.currentStep;
};

sTimerAnimation.prototype.stepComplete = function() {
	if(this.currentStep<this.options.totalSteps) {
		this.currentStep++;
	} else {
		// log('stop')
		this.timerStop()
		this.timerReset()
	}
};
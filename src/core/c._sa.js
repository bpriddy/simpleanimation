/*
 * Simple Animation c._sa:
 */
;var simpleAnimation = function(_options, callback){
	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var totalSteps = 1000
	var currentStep = 0;
	var instructions = "test";
	var ticking = false;
	_options = (_options) ? _options : {};
	
	var simpleAnimationInitialize = function(_options, callback) {
		var defaults = { 
			element:null,
			totalSteps:10000,
			firstStep:0,
			animationResolution:10,
			autoEnable:false,
			animateCompleteCallback:function() {},
			};
		_inst.options = mergeObjects(defaults, _options);
		if(callback) {
			_inst.options.animateCompleteCallback = callback;
		}
		_inst.options.instructions = instructions;
		// if(_inst.options.element!=null) {
		// 	_inst.options.element.data("simpleAnimation", _inst);
		// }
	};
		
	var requestTick = function() {
	    if(!ticking) {
	        window.requestAnimationFrame(_inst.processStep);
	        ticking = true;
	    }
	}
	
	var setValues = function(aE, elementPerc) {	

		// log('setValues')
		switch(aE.model().type) {
			case "sprite" :
				var targFrame = Math.round( (aE.model().frames-aE.model().startframe ) *elementPerc) + aE.model().startframe;
				log('sprite setValues ',targFrame)
				aE.goToFrame(targFrame)//// MUST BE DEFINED AS THE SPRITE STEP FUNCTION
			break;
			
			case "css" :
				var Element = $$(aE.model().element);
				for (var css in aE.model().startValues) {
					var newVal
					switch(elementPerc) {
						case 0:
							newVal = aE.model().startValues[css];
							break;
							
						case 1:
							newVal = aE.model().endValues[css];
							break;
							
						default:
							if(aE.model().easing != "none") {
								var change = aE.model().endValues[css] - aE.model().startValues[css];
								var result = Math[aE.model().easing](elementPerc, aE.model().startValues[css], change, 1);
							} else {
								var result = ( ( aE.model().endValues[css] - aE.model().startValues[css] ) * elementPerc ) + aE.model().startValues[css] ;
							}
							newVal = ( Math.round( result * _inst.options.animationResolution ) ) / _inst.options.animationResolution;
							break	
					}
					
					if(css=="rotate") {	
						//doesn't work in ie8 or before
						Element.style["-webkit-transform"] = "rotate("+newVal+"deg)"; 
						Element.style["-moz-transform"] = "rotate("+newVal+"deg)"; 
						Element.style["-ms-transform"] = "rotate("+newVal+"deg)";  
						Element.style["-o-transform"] = "rotate("+newVal+"deg)";  
						Element.style["transform"] = "rotate("+newVal+"deg)"; 
						//$(aE.model().element)[0].rotate(Math.round(newVal))
					} else if(css=="opacity") {
						//shouldn't use for ie9 or before
						Element.style["filter"] = "alpha(opacity="+(newVal*100)+")";
						Element.style["-moz-opacity"] = newVal;
						Element.style["-khtml-opacity"] = newVal;
						Element.style["opacity"] = newVal;
						Element.style["-ms-filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity="+(newVal*100)+")";
						Element.style["filter"] = "progid:DXImageTransform.Microsoft.Alpha(Opacity="+(newVal*100)+")";
					} else {
						Element.style[css] =  newVal+"px";
					}
				}
			break;
		}
	};
	
	var animationCallBacks = function(fnName, e) {
		 log('looking for '+fnName)
		if(typeof window[fnName] == 'function') {
			window[fnName](e);
		}
	}
	
	simpleAnimationInitialize(_options, callback)
	
	_inst.animationElements;

	////PUBLIC VARS
	_inst.options
	
	////PUBLIC METHODS
	_inst.instructions = function() {
		return instructions;
	}
	
	_inst.addElement = function(sE) {
		// log('addElement')
		if( !(sE instanceof animationElement) ) { /* alert( "must provide scrollElement class instance" ); */ return false; }
		if(!_inst.animationElements) { _inst.animationElements = []; };
		if(!_inst.animationElements[sE.element()]) {
			_inst.animationElements[sE.element()] = new Array();
		}
		_inst.animationElements[sE.element()].push(sE);
	}
	
	_inst.step = function() {
		requestTick();
	}
	
	_inst.inputJSON = function(json) {	
		// log(json)
		if(!json) { return alert("must pass json to this function"); }
		var JSONToDigest = json;
		for(i=0;i<JSONToDigest.length;i++) {
			if(JSONToDigest[i] != undefined && JSONToDigest[i] != null && JSONToDigest[i].values != null  ) {
				var Values = JSONToDigest[i].values
				var SV = new Object();
				var EV = new Object();
				for(var val in Values) {
					SV[val] = Values[val].s;
					EV[val] = Values[val].e;
				}
				var SP = JSONToDigest[i].startend.s
				var EP = JSONToDigest[i].startend.e
				var dynAE = new animationElement(JSONToDigest[i].element, { startValues:SV, endValues:EV, unit:JSONToDigest[i].unit, animationStartPoint: SP, animationEndPoint: EP, easing: JSONToDigest[i].easing })
				_inst.addElement(dynAE)
			}
		}
	}
	
	_inst.processStep = function(e) {	
		// log('processStep')
		currentStep = _inst.calculateCurrentStep();
		// log(_inst.animationElements)
		for(var key in _inst.animationElements) {
			for(var i=0;i<_inst.animationElements[key].length;i++) {
				var aE = _inst.animationElements[key][i]
				var start = (aE.model().unit=="%") ? aE.model().animationStartPoint / 100 * _inst.options.totalSteps : aE.model().animationStartPoint;
				var end = (aE.model().unit=="%") ? aE.model().animationEndPoint / 100 * _inst.options.totalSteps : aE.model().animationEndPoint;
				
				// log('start', start, "currentStep", currentStep)
				var elName = aE.model().element.match(/^(\W)?(.*)/)[2]; 

				if(currentStep > start && currentStep < end) {
					if(aE.model().inRange=="before") {
						animationCallBacks(elName+i+"_Anim_Start", aE.model().animationStartPoint)
					} else if(aE.model().inRange=="after") {
						animationCallBacks(elName+i+"_Anim_End", aE.model().animationEndPoint)
					}
					aE.model().inRange = "during";
					setValues(aE, (currentStep - start) / ( end - start ) )

				} else if(currentStep < start && aE.model().inRange != "before" ) {
					aE.model().inRange = "before";
					animationCallBacks(elName+i+"_Anim_Start", aE.model().animationStartPoint)
					setValues(aE, 0);
				} else if(currentStep > end && aE.model().inRange != "after" ) {
					aE.model().inRange = "after";
					animationCallBacks(elName+i+"_Anim_End", aE.model().animationEndPoint)
					setValues(aE, 1);
				}
			}
		}
		ticking = false;
		_inst.stepComplete()
	};


};
	
simpleAnimation.prototype.calculateCurrentStep = function() {
	 return currentStep;
};

simpleAnimation.prototype.stepComplete = function() {
	currentStep++;
};



simpleAnimation.prototype.destroy = function() {
	this.animationElements = null; 
}
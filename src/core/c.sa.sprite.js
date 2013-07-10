/*
 * Simple Animation c.sa.sprite:
 */
;var spriteAnimation = function(_options, callback){
	
	
	////////////////////
	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var Element;
	var Current_Frame = 1;
	var Current_Row = 1;
	var animationInterval;
	var Reverse = "false";
	_options = _options || {};
	
	
	var spriteIinitialize = function(_options, callback) {
		
		var defaults = { 
			fps: 12,  
			cols: 10, 
			rows: 2,
			stopAt:null,
			cell_width:250,
			cell_height:250,
			loop:false,
			stopAt:null,
			src:"images/sprite.png",
			spriteElement:null,
			endFrame:null,
			loadingVisible:true,
			loadingElement:null,
			loadCallBack:null,
			autoplay:true,
			loadCallBack:function(e) {},
			animationCompleteCallback:function() {}
			};
		    
		_inst.options = mergeObjects(defaults, _options);
		if(callback) {
			_inst.options.loadCallBack = callback;
		}

		// log(options.spriteElement)
		
		Element = _inst.options.spriteElement;
		// if(options.loadingElement!=null) {
		// 	Element.append($(options.loadingElement))
		// }
		
		Element.spriteAnimation = _inst;
		
		//var BGImage = new Image();
		//var BGImage = $$("<img />");
		//BGImage.src = options.src;
		//$$(BGImage).load(loadComplete).attr("src", options.src)
		//if(options.loadingElement!=null) {
		//	options.loadingElement.show();
		//};
		if(Element) {
			Element.style.backgroundImage = "url("+_inst.options.src+")";
		}

	};
			
	var animate = function() {
		// if(options.endFrame!=null) {
		// 	Element.find(".end_frame").hide()
		// }

    	var xPos = -( (Current_Frame-1) * _inst.options.cell_width );
    	var yPos = -( (Current_Row-1) * _inst.options.cell_height );
    	var el = Element 
    	el.style['backgroundPosition'] = xPos + 'px ' + yPos + 'px';
    	
    	if(Reverse != "true") {
	    	if( Current_Frame <= _inst.options.cols ) {
	    		Current_Frame++;
	    	} else if(_inst.options.loop==true) {
	    		Current_Frame = 1
	    	} else {
	    		console.log('we should end here')
	    		if(_inst.options.endFrame!=null) {
	    			el.style['background-position'] = _inst.options.cell_width + 'px';
					//$$(".end_frame", Element).style.display = "block"
				}
	    		clearInterval(animationInterval);
	    	};

	    	if(_inst.options.stopAt && Current_Frame >= _inst.options.stopAt) {
	    		clearInterval(animationInterval);
	    	}
	    } else {
	    	if( Current_Frame > 0 ) {
	    		Current_Frame--;
	    	} else if(_inst.options.loop==true) {
	    		Current_Frame = _inst.options.cols
	    	} else {
	    		console.log('we should end here')
	   //  		if(_inst.options.endFrame!=null) {
	   //  			el.style['background-position'] = _inst.options.cell_width + 'px';
				// 	//$$(".end_frame", Element).style.display = "block"
				// }
	    		clearInterval(animationInterval);
	    	};

	    	if(_inst.options.stopAt && Current_Frame <= _inst.options.stopAt) {
	    		clearInterval(animationInterval);
	    	}
	    }
	};

	
	// var addListener = function(element, type, expression, bubbling, context) {
	// 	bubbling = bubbling || false;
	// 	if(window.addEventListener)	{ // Standard
	// 		element.addEventListener(type, function() { expression(context) }, bubbling);
	// 		return true;
	// 	} else if(window.attachEvent) { // IE
	// 		element.attachEvent('on' + type, function() { expression(context) });
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// };
	
	// var loadComplete = function(e) {
	// 	Element.style["background-image"] = "url("+options.src+")";
	// 	if(options.loadingElement!=null) {
	// 		options.loadingElement.style.display = "none";
	// 	};
	// 	if(options.endFrame!=null) {
	// 		Element.append("<img src='"+options.endFrame+"' style='display:none' class='end_frame' />")
	// 	}
		
	// 	setTimeout(function() {
	// 		options.loadCallBack(_inst)
	// 	}, 200)
		
	// 	if(options.autoplay==true){
	// 		_inst.start();
	// 	}
	// };
	
		
	spriteIinitialize(_options, callback)
	 
	
	
	////PUBLIC METHODS
	this.model = function() {
		return options;
	}
	
	this.instructions = function() {
		return instructions;
	}
	
	this.image = function(){
		return options.src;
	};
		
	this.start = function() {
		clearInterval(animationInterval);
		animationInterval=setInterval( function(){animate(); } , parseInt(1000 / _inst.options.fps) );
	};	
	this.pause = function() {
		clearInterval(animationInterval);
	};
	this.reset = function() {
    	Current_Frame = 1;
    	var xPos = -( (Current_Frame-1) * _inst.options.cell_width );
    	var yPos = -( (Current_Row-1) * _inst.options.cell_height );
    	var el = $$(Element)
		el.style['background-position'] = xPos + 'px ' + yPos + 'px'; 
	};	
	this.reverse = function(bool, autoplay) {
		Reverse = bool;
		if(autoplay == "true") {
			clearInterval(animationInterval);
			animationInterval=setInterval( function(){animate(); } , parseInt(1000 / _inst.options.fps) );
		}
	};
	this.element = function() {
		return Element;
	};
	this.changeRow = function(num) {
		Current_Row = num
	};
	this.goToFrame = function(num) {
		if(num<1) { num = 1 };
		if(num>_inst.options.cols) { num = _inst.options.cols}
		log('gotoframe', num)
		Current_Frame = parseInt(num);
		animate()
		return Element;
	};
	this.step = function() {
		if(_inst.options.cols>Current_Frame+1) {
			Current_Frame++;
			animate()
		}
		return Element;
	};


	  
};
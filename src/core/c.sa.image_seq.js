/*
 * Image Sequence Animation c.sa.image_seq:
 */
var imageSequenceAnimation = function(_options, callback){
	
	
	////////////////////
	/////GLOBAL VARIABLES
	////////////////////
	var _inst = this;
	var Element;
	var Current_Frame = 0;
	var Previous_Frame = 0;	
	var Current_Child;
	var Next_Child;
	var Previous_Child;
	var animationInterval;
	var options;

	
	
	var imageSeqIinitialize = function(_options, callback) {
		
		var defaults = { 
			fps: 12,  
			totalFrames:10, 
			loop:false,
			srcBase:"images/sprite",
			ext:"jpg",
			sequenceElement:"<div class='sequence _1'></div>",
			endFrame:null,
			stopAt:null,
			loadingVisible:true,
			loadingElement:null,
			loadCallBack:null,
			autoplay:true,
			loadCallBack:function(e) {},
			animationCompleteCallback:function() {}
			};
		    
		_inst.options = mergeObjects(defaults, _options);
		if(callback) {
			options.loadCallBack = callback;
		}
		Element = _inst.options.sequenceElement;
		createLoadCarousel();
	};

	var createLoadCarousel = function() {

		var divA = document.createElement('div');
		divA.className = "a";
		divA.style.position = "absolute";
		divA.style.height = "100%";
		divA.style.width = "100%";
		divA.style.top = 0;
		divA.style.left = 0;
		divA.style.backgroundPosition = "top center";
		var divB = document.createElement('div');
		divB.className = "b";
		divB.style.position = "absolute";
		divB.style.height = "100%";
		divB.style.width = "100%";
		divB.style.top = 0;
		divB.style.left = 0;
		divB.style.backgroundPosition = "top center";
		var divC = document.createElement('div');
		divC.className = "c";
		divC.style.position = "absolute";
		divC.style.height = "100%";
		divC.style.width = "100%";
		divC.style.top = 0;
		divC.style.left = 0;
		divC.style.backgroundPosition = "top center";
		var divD = document.createElement('div');
		divD.className = "d";
		divD.style.position = "absolute";
		divD.style.height = "100%";
		divD.style.width = "100%";
		divD.style.top = 0;
		divD.style.left = 0;
		divD.style.backgroundPosition = "top center";
		var divE = document.createElement('div');
		divE.className = "e";
		divE.style.position = "absolute";
		divE.style.height = "100%";
		divE.style.width = "100%";
		divE.style.top = 0;
		divE.style.left = 0;
		divE.style.backgroundPosition = "top center";

		$$(Element).appendChild(divB);
		$$(Element).appendChild(divC);
		$$(Element).appendChild(divD);
		$$(Element).appendChild(divE);
		$$(Element).appendChild(divA);

		Current_Child = $$(Element+" .a");
		Next_Child = $$(Element+" .b");
		Next_Next_Child = $$(Element+" .d");
		Previous_Child = $$(Element+" .c");
		Previous_Previous_Child = $$(Element+" .e");
		
//		log("url('"+options.srcBase+Current_Frame+"."+options.ext+"')")
		log(_inst)
		var nF = (Current_Frame<_inst.options.totalFrames) ? Current_Frame+1 : _inst.options.totalFrames;
	    var nnF = (Current_Frame+1<_inst.options.totalFrames) ? Current_Frame+2 : _inst.options.totalFrames;
	    var pF = (Current_Frame>0) ? Current_Frame-1 : 0;
	    var ppF = (Current_Frame-1>0) ? Current_Frame-2 : 0;
	    
    	Current_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+Current_Frame+"."+_inst.options.ext+"')";
		Next_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+nF+"."+_inst.options.ext+"')"; 
		Next_Next_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+nnF+"."+_inst.options.ext+"')"; 
		Previous_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+pF+"."+_inst.options.ext+"')"; 
		Previous_Previous_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+ppF+"."+_inst.options.ext+"')"; 
	}
			
	var animate = function(single) {
		a = Current_Child, b = Next_Child, c = Previous_Child, d = Next_Next_Child, e = Previous_Previous_Child;
		if(Current_Frame>Previous_Frame) {
			Current_Child = b, Previous_Child = a, Next_Child = d, Previous_Previous_Child = c, Next_Next_Child = e;
			Previous_Child.style.display = "none";
			Next_Child.style.display = "none";
			Previous_Previous_Child.style.display = "none";
			Next_Next_Child.style.display = "none";
			Current_Child.style.display = "block";
		} else {
			Current_Child = c, Previous_Child = e, Next_Child = a, Previous_Previous_Child = d, Next_Next_Child = b;
			Previous_Child.style.display = "none";
			Next_Child.style.display = "none";
			Previous_Previous_Child.style.display = "none";
			Next_Next_Child.style.display = "none";
			Current_Child.style.display = "block";
		}

		if(!single) {
	    	if( Current_Frame <= _inst.options.totalFrames ) {
	    		Previous_Frame = Current_Frame;
	    		Current_Frame++;
	    	} else if(options.loop==true) {
	    		Current_Frame = Previous_Frame = 1
	    	} else {
	    		if(options.endFrame!=null) {
	    			$$(Element).style['background-position'] = options.cell_width + 'px';
					//$$(".end_frame", Element).style.display = "block"
				}
	    		clearInterval(animationInterval);
	    	};

	    	if(_inst.options.stopAt && Current_Frame >= _inst.options.stopAt) {
	    		clearInterval(animationInterval);
	    	};
	    };
	    var nF = (Current_Frame<_inst.options.totalFrames) ? Current_Frame+1 : _inst.options.totalFrames;
	    var nnF = (Current_Frame+1<_inst.options.totalFrames) ? Current_Frame+2 : _inst.options.totalFrames;
	    var pF = (Current_Frame>0) ? Current_Frame-1 : 0;
	    var ppF = (Current_Frame-1>0) ? Current_Frame-2 : 0;
		Next_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+nF+"."+_inst.options.ext+"')"; 
	    Next_Next_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+nnF+"."+_inst.options.ext+"')"; 
		Previous_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+pF+"."+_inst.options.ext+"')"; 
		Previous_Previous_Child.style['backgroundImage'] = "url('"+_inst.options.srcBase+ppF+"."+_inst.options.ext+"')"; 
	};
		
	imageSeqIinitialize(_options, callback)
	 
	
	
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
		animationInterval=setInterval( function(){animate(); } , parseInt(1000 / _inst.options.fps) );
	};	
	this.pause = function() {
		clearInterval(animationInterval);
	};
	this.reset = function() {
    	Current_Frame = 1;
		//$$(Element).style['background-image'] = "url('"+options.srcBase+"0."+options.ext+"')"; 
		animate();
	};	
	this.element = function() {
		return Element;
	};
	this.changeRow = function(num) {
		Current_Row = num
	};
	this.goToFrame = function(num) {
		//log(Current_Frame,parseInt(num) );
		if(Current_Frame!=parseInt(num)) {
			Current_Frame = parseInt(num);
			animate(true)
		}
		return Element;
	};
	this.step = function() {
		if(options.cols>Current_Frame+1) {
			Current_Frame++;
			animate()
		}
		return Element;
	};

};
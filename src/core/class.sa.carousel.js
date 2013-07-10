/*------------------------*/
/*------ CAROUSEL --------*/
/*------------------------*/

;var simpleCarousel = function(_options, callback){

	var _inst = this;
	_options = (_options) ? _options : {};
	var currStep = 0;

	/// class level animation vars
	var currStart;
	var currDestDist;
	var currAnimStep = 0;
	var totalAnimSteps;
	var ticking = false;
	var currLoc
	
	var simpleCarouselInitialize = function(_options, callback) {
		var defaults = { 
			context:null,
			carousel:'.carousel',
			container:'.container',
			list:'.list',
			items:'.item',
			arrow_forward:'.arrow_right',
			arrow_backwards:'.arrow_left',
			containerWidth:null,
			direction:'horizontal',
			looping:"false",
			infinite:"false", //need to implement still
			stepLength:4,
			minSteps:30,
			visible:4,
			speed:300,
			unit:'px',
			easing: "easeInOutQuad",
			animateCompleteCallback:function() {},
			};

		_inst.options = mergeObjects(defaults, _options);
		if(callback) {
			_inst.options.animateCompleteCallback = callback;
		}

		window.onresize = resizePlacement; // for when width of elements slave to browser dimensions

		setupUI();
	};
		
	var setupUI = function() {
		var c =  $$(_inst.options.context);
		c = (c.length) ? c[0] : c;
		var arrow_forward = $$(_inst.options.arrow_forward, c);
		arrow_forward = (arrow_forward.length) ? arrow_forward[0] : arrow_forward;
		var arrow_backwards = $$(_inst.options.arrow_backwards, c);
		arrow_backwards = (arrow_backwards.length) ? arrow_backwards[0] : arrow_backwards;

		vine.bind(arrow_forward, 'click', cStep);
		vine.bind(arrow_backwards, 'click', cStep);
		var cssVal = (_inst.options.direction=="horizontal") ? "left" : "top";
		arrow_backwards.style.display = ( _inst.options.looping=="false" && _inst.options.infinite=="false" ) ? "none" : "block";
	}

	var calculateDest  = function(lS, dir) {
		var c =  $$(_inst.options.context); 
		c = (c.length) ? c[0] : c;
		var container = $$(_inst.options.container, c);
		container = (container.length) ? container[0] : container;
		var it = $$(_inst.options.items, c);
		var len = it.length;
		if(_inst.options.direction=="horizontal") { var msrmnt = "Width"; var cssVal = "left"; } else { var msrmnt = "Height"; var cssVal = "top"; }
		var offsetDim = (_inst.options.containerWidth == null) ? container["offset"+msrmnt] : _inst.options.containerWidth;
		//console.log(offsetDim)

		if( lS ) {
			var frag = len - ( (currStep * _inst.options.stepLength) +_inst.options.visible);
				//console.log(frag)
				frag /= _inst.options.stepLength
				//console.log(frag)
				frag *= ( offsetDim*(_inst.options.stepLength/_inst.options.visible) )
				//console.log(frag)
				frag += (currStep) * ( offsetDim*(_inst.options.stepLength/_inst.options.visible) )
				//console.log(frag)
				cD = frag;
		} else {
			cD = currStep *  (offsetDim*(_inst.options.stepLength/_inst.options.visible));
		};

		return cD;
	}

	var cStep = function(e) {
		var c =  $$(_inst.options.context);
		c = (c.length) ? c[0] : c;
		var container = $$(_inst.options.container, c);
		container = (container.length) ? container[0] : container;
		var it = $$(_inst.options.items, c);
		var len = it.length;
		var a = _inst.options.arrow_forward;
		var b = _inst.options.arrow_backwards;
		if(_inst.options.direction=="horizontal") { var msrmnt = "Width"; var cssVal = "left"; } else { var msrmnt = "Height"; var cssVal = "top"; }
		var offsetDim = (_inst.options.containerWidth == null) ? container["offset"+msrmnt] : _inst.options.containerWidth;

		var arrow_forward = $$(_inst.options.arrow_forward, c);
		arrow_forward = (arrow_forward.length) ? arrow_forward[0] : arrow_forward;
		var arrow_backwards = $$(_inst.options.arrow_backwards, c);
		arrow_backwards = (arrow_backwards.length) ? arrow_backwards[0] : arrow_backwards;

		vine.unbind(arrow_forward, 'click', cStep);
		vine.unbind(arrow_backwards, 'click', cStep);
		if(_inst.options.direction=="horizontal") { var msrmnt = "Width"; var cssVal = "left"; } else { var msrmnt = "Height"; var cssVal = "top"; }
		var list = $$(_inst.options.list, c);
		list = (list.length) ? list[0] : list;
		currStart = parseInt(list.style[cssVal].replace(_inst.options.unit, "")) || 0;

		currTarget = (e.srcElement) ? e.srcElement : (e.currentTarget) ? e.currentTarget : e;
		if(currTarget == arrow_forward ) {
			if(_inst.options.looping=="true") {
				currStep = (  ((currStep * _inst.options.stepLength)+_inst.options.visible) >= len) ? 0 : currStep+1;
			} else {
				currStep++;
			}
			var lastStep = ( currStep*_inst.options.stepLength )+_inst.options.visible >= len;
			
			// console.log("Must be >= len", ( currStep*_inst.options.stepLength )+_inst.options.visible);
			// console.log("len", len);
			// console.log("lastStep", lastStep);

			currDest = calculateDest(lastStep, "f");
			arrow_backwards.style.display = "block";
			arrow_forward.style.display = ( lastStep && (_inst.options.looping=="false" && _inst.options.infinite=="false") ) ? "none" : "block" ;
			currDestDist = Math.abs(currStart) - Math.abs(currDest) ;
		} else {
			if(_inst.options.looping=="true") {
				currStep = (currStep<=0) ? (Math.ceil(len/_inst.options.stepLength)) - (_inst.options.visible/_inst.options.stepLength) : currStep-1;
			} else {
				currStep--;
			}
			var lastStep = (currStep*_inst.options.stepLength)+_inst.options.visible > len;
			currDest = calculateDest(lastStep, "b");
			arrow_forward.style.display = "block";
			arrow_backwards.style.display = ( currStep < 1 && (_inst.options.looping=="false" && _inst.options.infinite=="false") ) ? "none" : "block" ;
			currDestDist = Math.abs(currStart) - Math.abs(currDest) ;
		}

		// console.log("currStep", currStep, "currDest", currDest, "currDestDist", currDestDist)
		// console.log(offsetDim);

		totalAnimSteps = Math.abs(currDestDist)/offsetDim * _inst.options.speed / (offsetDim*.2);
		totalAnimSteps = (_inst.options.minSteps > totalAnimSteps) ? _inst.options.minSteps : totalAnimSteps;
		// console.log(totalAnimSteps);
		currAnimStep = 0;
		// console.log(currStart, currDest, currDestDist)
		requestTick();
	}


	var requestTick = function() {
	    if(!ticking) {
	        window.requestAnimationFrame(animate);
	        ticking = true;
	    }
	}

	var animate = function() {
		var c =  $$(_inst.options.context);
		c = (c.length) ? c[0] : c;
		var arrow_forward = $$(_inst.options.arrow_forward, c);
		arrow_forward = (arrow_forward.length) ? arrow_forward[0] : arrow_forward;
		var arrow_backwards = $$(_inst.options.arrow_backwards, c);
		arrow_backwards = (arrow_backwards.length) ? arrow_backwards[0] : arrow_backwards;

		currAnimStep++;
		setCssTo = Math[_inst.options.easing](currAnimStep/totalAnimSteps, currStart, currDestDist, 1);
		var cssVal = (_inst.options.direction=="horizontal") ? "left" : "top";
		setCssTo = ( Math.round( setCssTo*100 ) ) / 100
		var list = $$(_inst.options.list, c);
		list = (list.length) ? list[0] : list;
		list.style.left = setCssTo+_inst.options.unit;
		currLoc = setCssTo; 
		ticking = false;

		if(currAnimStep/totalAnimSteps<1) {
			requestTick();
		} else {
			vine.bind(arrow_forward, 'click', cStep);
			vine.bind(arrow_backwards, 'click', cStep);
		}
	}

	var resizePlacement = function() {
		var c =  $$(_inst.options.context);
		c = (c.length) ? c[0] : c;
		var it = $$(_inst.options.items, c);
		var len = it.length;
		var cssVal = (_inst.options.direction=="horizontal") ? "left" : "top";
		var lastStep = (currStep+1)*_inst.options.stepLength > len;
		currDest = -( calculateDest(lastStep, "f") );
		//console.log(currDest);
		var list = $$(_inst.options.list, c);
		list = (list.length) ? list[0] : list;
		list.style[cssVal] = Math.round(currDest)+_inst.options.unit;
	}

	
	simpleCarouselInitialize(_options, callback);


	////PUBLIC VARS
	_inst.options
	
	////PUBLIC METHODS
	
	_inst.step = function(dir) {
		cStep(dir);
	}
	

};
	
/*
 *  Utils
 */
function scrollTo(e,t,n){var r;var i=getScrollTop(e);var s=t-i;var o=0;var u=function(){o+=16;var t=Math.easeInOutQuad(o,i,s,n);getScrollTop(e,t);if(o<n){window.requestAnimationFrame(u)}};u()}(function(){var e=0;var t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(t,n){var r=(new Date).getTime();var i=Math.max(0,16-(r-e));var s=window.setTimeout(function(){t(r+i)},i);e=r+i;return s};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(e){clearTimeout(e)}})();var getHeight=function(e){var e=e?e:"document";var t;if(e=="document"){var n=document;t=Math.max(Math.max(n.body.scrollHeight,n.documentElement.scrollHeight),Math.max(n.body.offsetHeight,n.documentElement.offsetHeight),Math.max(n.body.clientHeight,n.documentElement.clientHeight))}else{t=Sizzle(e).scrollHeight}return t};var getScrollTop=function(e,t){var e=e?e:"document";var n;if(e!="document"){var r=Sizzle(e).length?Sizzle(e)[0]:Sizzle(e);if(t){r["scrollTop"]=t}else{n=r["scrollTop"]}}else{if(typeof pageYOffset!="undefined"){if(t){log(t);window.scroll(0,Math.round(t))}else{n=pageYOffset}}else{var i=document.body;var s=document.documentElement;s=s.clientHeight?s:i;if(t){s.scrollTop=t}else{n=s.scrollTop}}}return n};var mergeObjects=function(e,t){var n={};if(typeof e!=="object"||typeof t!=="object"){return sa_debug?alert("both items passed into mergeObjects must be objects"):null}for(k in e){n[k]=t[k]?t[k]:e[k]?e[k]:null}for(k in t){if(!n[k]){n[k]=t[k]}}return n};
/*
 *  log polyfill :
 * by our friend, Paul Irish
 */
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){ log(Array.prototype.slice.call(arguments))}};
/*
 * 140 medley
 * (c) 2011 - Honza Pokorny
 * Licensed under the terms of the BSD license
 */
var t=function(a,b){return function(c,d){return a.replace(/#{([^}]*)}/g,function(a,f){return Function("x","with(x)return "+f).call(c,d||b||{})})}},s=function(a,b){return b?{get:function(c){return a[c]&&b.parse(a[c])},set:function(c,d){a[c]=b.stringify(d)}}:{}}(this.localStorage||{},JSON),p=function(a,b,c,d){c=c||document;d=c[b="on"+b];a=c[b]=function(e){d=d&&d(e=e||c.event);return(a=a&&b(e))?b:d};c=this},m=function(a,b,c){b=document;c=b.createElement("p");c.innerHTML=a;for(a=b.createDocumentFragment();b=
c.firstChild;)a.appendChild(b);return a},$$=function(a,b){a=a.match(/^(\W)?(.*)/);return(b||document)["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2])},j=function(a){for(a=0;a<4;a++)try{return a?new ActiveXObject([,"Msxml2","Msxml3","Microsoft"][a]+".XMLHTTP"):new XMLHttpRequest}catch(b){}};
/*
 * Vine :
 * An events library that supports binding, unbinding, and triggering events on DOM elements or JavaScript Objects
 */
vine=function(a,b,c,d,e,f,g,h,i){function j(d,e){return e=d[a]=d[a]||b++,c[e]||(c[e]={b:{},e:{}})}function k(a){return a.charAt?g.getElementById(a):a}return h={d:j,id:k,Event:i=function(a,b,c){c=this;for(b in a)c[b]=c[b]||a[b];c.timestamp=+(new Date),c.target||(c.target=c.srcElement)},bind:function(a,b,c,g,i,l,m,n){if((n=(m=b.split(" ")).length)>1)while(n--)h.bind(a,m[n],c);else{a=k(a),i=j(a);if(l=/^(.+)\.([^\.]+)$/.exec(b))b=l[2],l=l[1];(i.e[b]||(i.e[b]=[])).push({n:l,f:c,d:g||{}}),!i.b[b]&&(i.b[b]=1,a[e]?a[e](b,function(c){h.trigger(a,b,c)[d]&&c.preventDefault()},null):a[f]("on"+b,function(){return!h.trigger(a,b,window.event)[d]}))}},trigger:function(a,b,c,e,f,h,l,m,n){a=k(a);if(!c&&a.nodeType){if(!a.fireEvent)return l=g.createEvent((init=/click|mousedown|mouseup|mousemove/.test(b))?"MouseEvents":"HTMLEvents"),l[init?"initMouseEvent":"initEvent"](b,!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),a.dispatchEvent(l),l;try{return new i({defaultPrevented:a[b==="click"?b:fireEvent]("on"+b)})}catch(o){}}l=new i(c||{});if(e=j(a).e[b]){for(f=0,h=e.length;f<h;f++)if(n=e[f])l.namespace=n.n,l.data=n.d,m=m||n.f.call(a,l)===!1;l[d]=l[d]||m}return l},unbind:function(b,d,e,f,g,h,i){b=k(b);if(!d)return c[b[a]]=b[a]=null;e=j(b);if(d.charAt)if(d.charAt(0)==="."){d=d.substring(1);for(g in e.e){i=e.e[g],h=i.length;for(f=0;f<h;f++)i[f].n===d&&(i[f]=null)}}else e.e[d]=[];else for(g in e.e){i=e.e[g],h=i.length;for(f=0;f<h;f++)i[f].f===d&&(i[f]=null)}}},i.prototype={defaultPrevented:!1,preventDefault:function(){this[d]=!0}},h}(+(new Date),1,{},"defaultPrevented","addEventListener","attachEvent",document);
/*
 * Tween functions
 * linearTween, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInSine, easeOutSine, easeInOutSine, easeInExpo, easeOutExpo, easeInCirc, easeOutCirc, easeInOutCirc
 *
 * Math.easeInQuad(curranimationposition, startValue, changeofvalue, endanimationposition);
 * Math.easeInQuad(.4, 45, 150, 1);
 */
 Math.linearTween=function(e,t,n,r){return n*e/r+t};Math.easeInQuad=function(e,t,n,r){e/=r;return n*e*e+t};Math.easeOutQuad=function(e,t,n,r){e/=r;return-n*e*(e-2)+t};Math.easeInOutQuad=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e+t;e--;return-n/2*(e*(e-2)-1)+t};Math.easeInCubic=function(e,t,n,r){e/=r;return n*e*e*e+t};Math.easeOutCubic=function(e,t,n,r){e/=r;e--;return n*(e*e*e+1)+t};Math.easeInOutCubic=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e*e+t;e-=2;return n/2*(e*e*e+2)+t};Math.easeInQuart=function(e,t,n,r){e/=r;return n*e*e*e*e+t};Math.easeOutQuart=function(e,t,n,r){e/=r;e--;return-n*(e*e*e*e-1)+t};Math.easeInOutQuart=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e*e*e+t;e-=2;return-n/2*(e*e*e*e-2)+t};Math.easeInQuint=function(e,t,n,r){e/=r;return n*e*e*e*e*e+t};Math.easeOutQuint=function(e,t,n,r){e/=r;e--;return n*(e*e*e*e*e+1)+t};Math.easeInOutQuint=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e*e*e*e+t;e-=2;return n/2*(e*e*e*e*e+2)+t};Math.easeInSine=function(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t};Math.easeOutSine=function(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t};Math.easeInOutSine=function(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t};Math.easeInExpo=function(e,t,n,r){return n*Math.pow(2,10*(e/r-1))+t};Math.easeOutExpo=function(e,t,n,r){return n*(-Math.pow(2,-10*e/r)+1)+t};Math.easeInOutExpo=function(e,t,n,r){e/=r/2;if(e<1)return n/2*Math.pow(2,10*(e-1))+t;e--;return n/2*(-Math.pow(2,-10*e)+2)+t};Math.easeInCirc=function(e,t,n,r){e/=r;return-n*(Math.sqrt(1-e*e)-1)+t};Math.easeOutCirc=function(e,t,n,r){e/=r;e--;return n*Math.sqrt(1-e*e)+t};Math.easeInOutCirc=function(e,t,n,r){e/=r/2;if(e<1)return-n/2*(Math.sqrt(1-e*e)-1)+t;e-=2;return n/2*(Math.sqrt(1-e*e)+1)+t};

/*! onDomReady.js 1.2 (c) 2012 Tubal Martin - MIT license */
!function(e){typeof define=="function"&&define.amd?define(e):window.onDomReady=e()}(function(){"use strict";function d(e){if(!h){if(!t.body)return m(d);h=!0;while(e=p.shift())m(e)}}function v(){l?(t.removeEventListener(a,v,r),d()):t[s]===i&&(t.detachEvent(f,v),d())}function m(e,t){setTimeout(e,+t>=0?t:1)}function y(e){h?m(e):p.push(e)}var e=window,t=e.document,n=t.documentElement,r=!1,i="complete",s="readyState",o="attachEvent",u="addEventListener",a="DOMContentLoaded",f="onreadystatechange",l=u in t,c=r,h=r,p=[];if(t[s]===i)m(d);else if(l)t[u](a,v,r),e[u]("load",d,r);else{t[o](f,v),e[o]("onload",d);try{c=e.frameElement==null&&n}catch(g){}c&&c.doScroll&&function b(){if(!h){try{c.doScroll("left")}catch(e){return m(b,50)}d()}}()}return y.version="1.2",y});
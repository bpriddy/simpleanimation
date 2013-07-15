
/*! onDomReady.js 1.2 (c) 2012 Tubal Martin - MIT license */
!function(e){typeof define=="function"&&define.amd?define(e):window.onDomReady=e()}(function(){"use strict";function d(e){if(!h){if(!t.body)return m(d);h=!0;while(e=p.shift())m(e)}}function v(){l?(t.removeEventListener(a,v,r),d()):t[s]===i&&(t.detachEvent(f,v),d())}function m(e,t){setTimeout(e,+t>=0?t:1)}function y(e){h?m(e):p.push(e)}var e=window,t=e.document,n=t.documentElement,r=!1,i="complete",s="readyState",o="attachEvent",u="addEventListener",a="DOMContentLoaded",f="onreadystatechange",l=u in t,c=r,h=r,p=[];if(t[s]===i)m(d);else if(l)t[u](a,v,r),e[u]("load",d,r);else{t[o](f,v),e[o]("onload",d);try{c=e.frameElement==null&&n}catch(g){}c&&c.doScroll&&function b(){if(!h){try{c.doScroll("left")}catch(e){return m(b,50)}d()}}()}return y.version="1.2",y});

/*
 * 140 medley
 * (c) 2011 - Honza Pokorny
 * Licensed under the terms of the BSD license
 */
var $$=function(e,t){e=e.match(/^(\W)?(.*)/);var n=(t||document)["getElement"+(e[1]?e[1]=="#"?"ById":"sByClassName":"sByTagName")](e[2]);n=n==null||n=="undefined"?null:n.length&&n.length==1?n[0]:n;return n};var getElementsByClassNameFill=function(e){var t=[],n=new RegExp("(^| )"+e+"( |$)"),r=this.getElementsByTagName("*");for(var i=0,s=r.length;i<s;i++){if(n.test(r[i].className)){t.push(r[i])}}return t};var gebcn="getElementsByClassName";if(!document[gebcn]){var ep=typeof HTMLElement!=="undefined"?HTMLElement.prototype:Element.prototype;ep[gebcn]=getElementsByClassNameFill;document[gebcn]=getElementsByClassNameFill}/*

/*
 * Vine :
 * An events library that supports binding, unbinding, and triggering events on DOM elements or JavaScript Objects
 */
vine=function(a,b,c,d,e,f,g,h,i){function j(d,e){return e=d[a]=d[a]||b++,c[e]||(c[e]={b:{},e:{}})}function k(a){return a.charAt?g.getElementById(a):a}return h={d:j,id:k,Event:i=function(a,b,c){c=this;for(b in a)c[b]=c[b]||a[b];c.timestamp=+(new Date),c.target||(c.target=c.srcElement)},bind:function(a,b,c,g,i,l,m,n){if((n=(m=b.split(" ")).length)>1)while(n--)h.bind(a,m[n],c);else{a=k(a),i=j(a);if(l=/^(.+)\.([^\.]+)$/.exec(b))b=l[2],l=l[1];(i.e[b]||(i.e[b]=[])).push({n:l,f:c,d:g||{}}),!i.b[b]&&(i.b[b]=1,a[e]?a[e](b,function(c){h.trigger(a,b,c)[d]&&c.preventDefault()},null):a[f]("on"+b,function(){return!h.trigger(a,b,window.event)[d]}))}},trigger:function(a,b,c,e,f,h,l,m,n){a=k(a);if(!c&&a.nodeType){if(!a.fireEvent)return l=g.createEvent((init=/click|mousedown|mouseup|mousemove/.test(b))?"MouseEvents":"HTMLEvents"),l[init?"initMouseEvent":"initEvent"](b,!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),a.dispatchEvent(l),l;try{return new i({defaultPrevented:a[b==="click"?b:fireEvent]("on"+b)})}catch(o){}}l=new i(c||{});if(e=j(a).e[b]){for(f=0,h=e.length;f<h;f++)if(n=e[f])l.namespace=n.n,l.data=n.d,m=m||n.f.call(a,l)===!1;l[d]=l[d]||m}return l},unbind:function(b,d,e,f,g,h,i){b=k(b);if(!d)return c[b[a]]=b[a]=null;e=j(b);if(d.charAt)if(d.charAt(0)==="."){d=d.substring(1);for(g in e.e){i=e.e[g],h=i.length;for(f=0;f<h;f++)i[f].n===d&&(i[f]=null)}}else e.e[d]=[];else for(g in e.e){i=e.e[g],h=i.length;for(f=0;f<h;f++)i[f].f===d&&(i[f]=null)}}},i.prototype={defaultPrevented:!1,preventDefault:function(){this[d]=!0}},h}(+(new Date),1,{},"defaultPrevented","addEventListener","attachEvent",document)
/*
 *   W, width management tool for responsive designs
 */
this.W=function(){var a=window,b=document,c=b.documentElement,d,e,f="style",g="createElement",h="appendChild",i="offsetHeight",j="offsetWidth",k=[];return function(l){var m=typeof l,n,o,p;if(m=="function")(o=a.addEventListener)?o("resize",l,!1):a.attachEvent("onresize",l),k.length||(d=b[g]("b"),d[f].position="absolute",d[f].top="-99em",d.innerHTML="W",c[h](d),e=d[i],setInterval(function(a,b){if(e!=(b=d[i])){a=k.length;while(a)k[--a]()}e=b},250)),k.push(l);else{o=b[g]("div"),o[f].width="1em",c[h](o),n=o[j],n=n?n:16,c.removeChild(o);if(m=="number")return l/n;o=c[j],(p=a.innerWidth)||(p=c.clientWidth),o=(p-o)*100/p<5?p:o;return l?o/n:o}}}()
/*
 * Tween functions
 * linearTween, easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInSine, easeOutSine, easeInOutSine, easeInExpo, easeOutExpo, easeInCirc, easeOutCirc, easeInOutCirc
 */
Math.linearTween=function(e,t,n,r){return n*e/r+t};Math.easeInQuad=function(e,t,n,r){e/=r;return n*e*e+t};Math.easeOutQuad=function(e,t,n,r){e/=r;return-n*e*(e-2)+t};Math.easeInOutQuad=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e+t;e--;return-n/2*(e*(e-2)-1)+t};Math.easeInCubic=function(e,t,n,r){e/=r;return n*e*e*e+t};Math.easeOutCubic=function(e,t,n,r){e/=r;e--;return n*(e*e*e+1)+t};Math.easeInOutCubic=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e*e+t;e-=2;return n/2*(e*e*e+2)+t};Math.easeInQuart=function(e,t,n,r){e/=r;return n*e*e*e*e+t};Math.easeOutQuart=function(e,t,n,r){e/=r;e--;return-n*(e*e*e*e-1)+t};Math.easeInOutQuart=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e*e*e+t;e-=2;return-n/2*(e*e*e*e-2)+t};Math.easeInQuint=function(e,t,n,r){e/=r;return n*e*e*e*e*e+t};Math.easeOutQuint=function(e,t,n,r){e/=r;e--;return n*(e*e*e*e*e+1)+t};Math.easeInOutQuint=function(e,t,n,r){e/=r/2;if(e<1)return n/2*e*e*e*e*e+t;e-=2;return n/2*(e*e*e*e*e+2)+t};Math.easeInSine=function(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t};Math.easeOutSine=function(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t};Math.easeInOutSine=function(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t};Math.easeInExpo=function(e,t,n,r){return n*Math.pow(2,10*(e/r-1))+t};Math.easeOutExpo=function(e,t,n,r){return n*(-Math.pow(2,-10*e/r)+1)+t};Math.easeInOutExpo=function(e,t,n,r){e/=r/2;if(e<1)return n/2*Math.pow(2,10*(e-1))+t;e--;return n/2*(-Math.pow(2,-10*e)+2)+t};Math.easeInCirc=function(e,t,n,r){e/=r;return-n*(Math.sqrt(1-e*e)-1)+t};Math.easeOutCirc=function(e,t,n,r){e/=r;e--;return n*Math.sqrt(1-e*e)+t};Math.easeInOutCirc=function(e,t,n,r){e/=r/2;if(e<1)return-n/2*(Math.sqrt(1-e*e)-1)+t;e-=2;return n/2*(Math.sqrt(1-e*e)+1)+t}


var sa_debug = false;

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


var getHeight = function(context) {
	var context = (context) ? context : "document";
	var toReturn
	if(context == "document") {
		var D = document;
		toReturn = Math.max(
							Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
							Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
							Math.max(D.body.clientHeight, D.documentElement.clientHeight)
						);
	} else {
		toReturn = $$(context).scrollHeight
	}
	return toReturn;
};

var getScrollTop = function(context, val) {
	var context = (context) ? context : "document";
	var toReturn
	if(context!="document") {
		// log($(context)['scrollTop'])
		var Element = $$(context)
		if(val) {
			Element['scrollTop'] = val;
		} else {
			toReturn = Element['scrollTop'];
		}

	} else {
		if(typeof pageYOffset!= 'undefined'){
			if(val) {
				log(val)
				window.scroll(0,Math.round(val))
		    	//window.pageYOffset.value = val;
		    } else {
		        toReturn = pageYOffset;
		    }
	    }
	    else{
	        var B = document.body; //IE 'quirks'
	        var D = document.documentElement; //IE with doctype
	        D = (D.clientHeight)? D: B;
			if(val) {
				D.scrollTop = val
			} else {
		        toReturn = D.scrollTop;
			}
	    };
	}	
	return toReturn;
};



  
function scrollTo(context, to, duration) {
	
	var scrollTop;
	var start = getScrollTop(context);
	var change = to - start;
    var currentTime = 0;
    var animateScroll = function(){  
        currentTime += 16;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);          
        getScrollTop(context,val); 
        if(currentTime < duration) {
        	window.requestAnimationFrame(animateScroll);
        }
    };
    animateScroll();

}



var mergeObjects = function(a, b) { 
	var c = {};
	if(typeof a !== 'object' || typeof b !== 'object') {
		return ( sa_debug ) ? alert('both items passed into mergeObjects must be objects') : null;
	};
	for(k in a) {
		c[k] = (b[k]) ? b[k] : ( (a[k]) ? a[k] : null );
	};
	for(k in b) {
		if(!c[k]) {
			c[k] = b[k];
		}
	}
	return c;
}



HTMLDivElement.prototype.height = function() {
	/// doesn't account for borders
	var val = this.offsetHeight;
	if(this.currentStyle) {
		var cS = this.currentStyle
		val += cS['margin-top'] += cS['margin-bottom'] += cS['padding-top'] += cS['padding-bottom'];
	} else {
		val += parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('margin-top').replace('px',''));
		val	+= parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('margin-bottom').replace('px',''));  
		val	+= parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('padding-top').replace('px',''));
		val	+= parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('padding-bottom').replace('px',''));
	}

	return val;
}

HTMLDivElement.prototype.width = function() {
	/// doesn't account for borders
	var val = this.offsetWidth;
	if(this.currentStyle) {
		var cS = this.currentStyle
		val += cS['margin-left'] += cS['margin-right'] += cS['padding-left'] += cS['padding-right'];
	} else {
		val += parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('margin-left').replace('px',''));
		val	+= parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('margin-right').replace('px',''));  
		val	+= parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('padding-left').replace('px',''));
		val	+= parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue('padding-right').replace('px',''));
	}

	return val;
};

Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}
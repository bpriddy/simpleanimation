
/*! onDomReady.js 1.2 (c) 2012 Tubal Martin - MIT license */
!function(e){typeof define=="function"&&define.amd?define(e):window.onDomReady=e()}(function(){"use strict";function d(e){if(!h){if(!t.body)return m(d);h=!0;while(e=p.shift())m(e)}}function v(){l?(t.removeEventListener(a,v,r),d()):t[s]===i&&(t.detachEvent(f,v),d())}function m(e,t){setTimeout(e,+t>=0?t:1)}function y(e){h?m(e):p.push(e)}var e=window,t=e.document,n=t.documentElement,r=!1,i="complete",s="readyState",o="attachEvent",u="addEventListener",a="DOMContentLoaded",f="onreadystatechange",l=u in t,c=r,h=r,p=[];if(t[s]===i)m(d);else if(l)t[u](a,v,r),e[u]("load",d,r);else{t[o](f,v),e[o]("onload",d);try{c=e.frameElement==null&&n}catch(g){}c&&c.doScroll&&function b(){if(!h){try{c.doScroll("left")}catch(e){return m(b,50)}d()}}()}return y.version="1.2",y});
/*
 * 140 medley
 * (c) 2011 - Honza Pokorny
 * Licensed under the terms of the BSD license
 */
var t=function(e,t){return function(n,r){return e.replace(/#{([^}]*)}/g,function(e,i){return Function("x","with(x)return "+i).call(n,r||t||{})})}};var s=function(e,t){return t?{get:function(n){return e[n]&&t.parse(e[n])},set:function(n,r){e[n]=t.stringify(r)}}:{}}(this.localStorage||{},JSON);var b=function(e,t,n,r){n=n||document;r=n[t="on"+t];e=n[t]=function(i){r=r&&r(i=i||n.event);return(e=e&&t(i))?t:r};n=this};var m=function(e,t,n){t=document;n=t.createElement("p");n.innerHTML=e;e=t.createDocumentFragment();while(t=n.firstChild)e.appendChild(t);return e};var $$=function(e,t){e=e.match(/^(\W)?(.*)/);var n=(t||document)["getElement"+(e[1]?e[1]=="#"?"ById":"sByClassName":"sByTagName")](e[2]);n=n.length&&n.length>1?n[0]:n;return n};var getElementsByClassNameFill=function(e){var t=[],n=new RegExp("(^| )"+e+"( |$)"),r=this.getElementsByTagName("*");for(var i=0,s=r.length;i<s;i++){if(n.test(r[i].className)){t.push(r[i])}}return t};var gebcn="getElementsByClassName";if(!document[gebcn]){var ep=typeof HTMLElement!=="undefined"?HTMLElement.prototype:Element.prototype;ep[gebcn]=getElementsByClassNameFill;document[gebcn]=getElementsByClassNameFill}var j=function(e){for(e=0;e<4;e++)try{return e?new ActiveXObject([,"Msxml2","Msxml3","Microsoft"][e]+".XMLHTTP"):new XMLHttpRequest}catch(t){}}
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
 /*
 * Simple Animation Utils:
 */
;function scrollTo(e,t,n){var r;var i=getScrollTop(e);var s=t-i;var o=0;var u=function(){o+=16;var t=Math.easeInOutQuad(o,i,s,n);getScrollTop(e,t);if(o<n){window.requestAnimationFrame(u)}};u()}var sa_debug=false;(function(){var e=0;var t=["ms","moz","webkit","o"];for(var n=0;n<t.length&&!window.requestAnimationFrame;++n){window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame)window.requestAnimationFrame=function(t,n){var r=(new Date).getTime();var i=Math.max(0,16-(r-e));var s=window.setTimeout(function(){t(r+i)},i);e=r+i;return s};if(!window.cancelAnimationFrame)window.cancelAnimationFrame=function(e){clearTimeout(e)}})();var getHeight=function(e){var e=e?e:"document";var t;if(e=="document"){var n=document;t=Math.max(Math.max(n.body.scrollHeight,n.documentElement.scrollHeight),Math.max(n.body.offsetHeight,n.documentElement.offsetHeight),Math.max(n.body.clientHeight,n.documentElement.clientHeight))}else{t=$$(e).scrollHeight}return t};var getScrollTop=function(e,t){var e=e?e:"document";var n;if(e!="document"){var r=$$(e);if(t){r["scrollTop"]=t}else{n=r["scrollTop"]}}else{if(typeof pageYOffset!="undefined"){if(t){log(t);window.scroll(0,Math.round(t))}else{n=pageYOffset}}else{var i=document.body;var s=document.documentElement;s=s.clientHeight?s:i;if(t){s.scrollTop=t}else{n=s.scrollTop}}}return n};var mergeObjects=function(e,t){var n={};if(typeof e!=="object"||typeof t!=="object"){return sa_debug?alert("both items passed into mergeObjects must be objects"):null}for(k in e){n[k]=t[k]?t[k]:e[k]?e[k]:null}for(k in t){if(!n[k]){n[k]=t[k]}}return n};HTMLDivElement.prototype.height=function(){var e=this.offsetHeight;if(this.currentStyle){var t=this.currentStyle;e+=t["margin-top"]+=t["margin-bottom"]+=t["padding-top"]+=t["padding-bottom"]}else{e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("margin-top").replace("px",""));e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("margin-bottom").replace("px",""));e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("padding-top").replace("px",""));e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("padding-bottom").replace("px",""))}return e};HTMLDivElement.prototype.width=function(){var e=this.offsetWidth;if(this.currentStyle){var t=this.currentStyle;e+=t["margin-left"]+=t["margin-right"]+=t["padding-left"]+=t["padding-right"]}else{e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("margin-left").replace("px",""));e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("margin-right").replace("px",""));e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("padding-left").replace("px",""));e+=parseInt(document.defaultView.getComputedStyle(this,null).getPropertyValue("padding-right").replace("px",""))}return e}

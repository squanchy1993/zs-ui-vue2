!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof window?window:this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t),n.d(t,"LongPress",(function(){return o}));class o{constructor(e){let{delay:t=null,interval:n=null}=e;r(this,"delay",400),r(this,"interval",50),r(this,"bind",(e,t,n)=>{var r,o;const l=(null==t||null===(r=t.value)||void 0===r?void 0:r.delay)||this.delay,i=(null==t||null===(o=t.value)||void 0===o?void 0:o.interval)||this.interval;let u=null,s=null;const a=e=>{"click"===e.type&&0!==e.button||null===u&&(u=setTimeout(()=>{i&&i>0&&(s=setInterval(()=>{this.emitEvent(n,"longPressInterval",e)},i)),this.emitEvent(n,"longPressInterval",e),this.emitEvent(n,"longPressStart",e)},l))},c=e=>{null!==u&&(clearTimeout(u),u=null),s&&(clearInterval(s),s=null,this.emitEvent(n,"longPressEnd",e))};["mousedown","touchstart"].forEach(t=>{e.addEventListener(t,a,{passive:!0})}),["click","mouseout","touchend","touchcancel"].forEach(t=>{e.addEventListener(t,c,{passive:!0})})}),t&&(this.delay=t),n&&(this.interval=n)}emitEvent(e,t,n){e.componentInstance?e.componentInstance.$emit(t,{detail:n}):e.elm.dispatchEvent(new CustomEvent(t,{detail:n}))}}t.default={LongPress:o}}])}));
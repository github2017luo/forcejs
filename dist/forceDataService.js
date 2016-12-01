!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.forceDataService=t():e.forceDataService=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t){"use strict";function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var s=Object.getPrototypeOf(t);return null===s?void 0:e(s,r,n)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(n)},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/")),c=window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:""),u=c+a,p=function(e,t){return"/"!==e.charAt(e.length-1)&&(e+="/"),"/"===t.charAt(0)&&(t=t.substr(1)),e+t},h=function(e){var t=[],r=void 0;for(r in e)e.hasOwnProperty(r)&&t.push(encodeURIComponent(r)+"="+encodeURIComponent(e[r]));return t.join("&")},d=function(e){var t=e.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([^?#]*)(\?[^#]*|)(#.*|)$/);return t&&{protocol:t[1],host:t[2],hostname:t[3],port:t[4],path:t[5],params:parseQueryString(t[6]),hash:t[7]}},f=void 0,l={},v=void 0;document.addEventListener("deviceready",function(){try{v=cordova.require("com.salesforce.plugin.network")}catch(e){}},!1),e.exports={createInstance:function(e,t,r){var n=void 0;return n=window.cordova?new k(e,t):new g(e,t),r?l[r]=n:f=n,n},getInstance:function(e){return e?l[e]:f}};var y=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,e),this.appId=t.appId,this.accessToken=t.accessToken,this.instanceURL=t.instanceURL,this.refreshToken=t.refreshToken,this.userId=t.userId,this.apiVersion=r.apiVersion||"v36.0",this.loginURL=r.loginURL||"https://login.salesforce.com",this.useProxy=!(r.useProxy||window.cordova||window.SfdcApp||window.sforce),this.proxyURL=r.proxyURL||u}return i(e,[{key:"getRequestBaseURL",value:function(){var e=void 0;return e=this.useProxy?this.proxyURL:this.instanceURL?this.instanceURL:c,"/"===e.slice(-1)&&(e=e.slice(0,-1)),e}},{key:"refreshAccessToken",value:function(){}},{key:"getUserId",value:function(){return this.userId}},{key:"request",value:function(e){var t=this;return new Promise(function(r,n){if(!t.accessToken&&!t.refreshToken)return void("function"==typeof errorHandler&&n("No access token. Login and try again."));var o=e.method||"GET",s=new XMLHttpRequest,i=t.getRequestBaseURL();if("/"!==e.path.charAt(0)&&(e.path="/"+e.path),i+=e.path,e.params&&(i+="?"+h(e.params)),s.onreadystatechange=function(){var t=this;if(4===s.readyState)if(s.status>199&&s.status<300)r(s.responseText?JSON.parse(s.responseText):void 0);else if(401===s.status&&this.refreshToken)this.refreshAccessToken().then(function(){return t.request(e).then(function(e){return r(e)}).catch(function(e){return n(e)})}).catch(function(){console.error(s.responseText);var e=s.responseText?JSON.parse(s.responseText):{message:"An error has occurred"};n(e)});else{console.error(s.responseText);var o=s.responseText?JSON.parse(s.responseText):{message:"An error has occurred"};n(o)}},s.open(o,i,!0),s.setRequestHeader("Accept","application/json"),s.setRequestHeader("Authorization","Bearer "+t.accessToken),s.setRequestHeader("Cache-Control","no-store"),s.setRequestHeader("X-Connect-Bearer-Urls",!0),e.contentType&&s.setRequestHeader("Content-Type",e.contentType),e.headerParams)for(var a in e.headerParams.getOwnPropertyNames()){var c=e.headerParams[a];s.setRequestHeader(a,c)}t.useProxy&&s.setRequestHeader("Target-URL",t.instanceURL),s.send(e.data?JSON.stringify(e.data):void 0)})}},{key:"query",value:function(e){return this.request({path:"/services/data/"+this.apiVersion+"/query",params:{q:e}})}},{key:"retrieve",value:function(e,t,r){return this.request({path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/"+t,params:r?{fields:"string"==typeof r?r:r.join(",")}:void 0})}},{key:"getPickListValues",value:function(e){return this.request({path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/describe"})}},{key:"create",value:function(e,t){return this.request({method:"POST",contentType:"application/json",path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/",data:t})}},{key:"update",value:function(e,t){var r=t.Id||t.id,n=JSON.parse(JSON.stringify(t));return delete n.attributes,delete n.Id,delete n.id,this.request({method:"POST",contentType:"application/json",path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/"+r,params:{_HttpMethod:"PATCH"},data:n})}},{key:"del",value:function(e,t){return this.request({method:"DELETE",path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/"+t})}},{key:"upsert",value:function(e,t,r,n){return this.request({method:"PATCH",contentType:"application/json",path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/"+t+"/"+r,data:n})}},{key:"apexrest",value:function(e){var t=void 0;return"string"==typeof e?t={path:e,method:"GET"}:(t=e,"/"!==t.path.charAt(0)&&(t.path="/"+t.path),"/services/apexrest"!==t.path.substr(0,18)&&(t.path="/services/apexrest"+t.path)),t.contentType||(t.contentType="DELETE"==t.method||"GET"==t.method?null:"application/json"),this.request(t)}},{key:"chatter",value:function(e){var t="/services/data/"+this.apiVersion+"/chatter",r=void 0;if(e&&e.substring)r={path:p(t,e)};else{if(!e||!e.path)return new Promise(function(e,t){return t("You must specify a path for the request")});r=e,r.path=p(t,e.path)}return this.request(r)}},{key:"versions",value:function(){return this.request({path:"/services/data/"})}},{key:"resources",value:function(){return this.request({path:"/services/data/"+this.apiVersion})}},{key:"describeGlobal",value:function(){return this.request({path:"/services/data/"+this.apiVersion+"/sobjects"})}},{key:"metadata",value:function(e){return this.request({path:"/services/data/"+this.apiVersion+"/sobjects/"+e})}},{key:"describe",value:function(e){return this.request({path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/describe"})}},{key:"describeLayout",value:function(e,t){return t=t||"",this.request({path:"/services/data/"+this.apiVersion+"/sobjects/"+e+"/describe/layouts/"+t})}},{key:"queryMore",value:function(e){var t=d(e);return this.request({path:t.path,params:t.params})}},{key:"search",value:function(e){return this.request({path:"/services/data/"+this.apiVersion+"/search",params:{q:e}})}}]),e}(),g=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),i(t,[{key:"refreshAccessToken",value:function(){var e=this;return new Promise(function(t,r){if(!e.refreshToken)return console.log("Missing refreshToken"),void r("Missing refreshToken");if(!e.appId)return console.log("Missing appId"),void r("Missing appId");var n=new XMLHttpRequest,o={grant_type:"refresh_token",refresh_token:e.refreshToken,client_id:e.appId},s=e.useProxy?e.proxyURL:e.loginURL;s=s+"/services/oauth2/token?"+h(o),n.onreadystatechange=function(){if(4===n.readyState)if(200===n.status){console.log("Token refreshed");var o=JSON.parse(n.responseText);e.accessToken=o.access_token,t()}else console.log("Error while trying to refresh token: "+n.responseText),r()},n.open("POST",s,!0),e.useProxy||n.setRequestHeader("Target-URL",e.loginURL),n.send()})}}]),t}(y),k=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),i(t,[{key:"refreshAccessToken",value:function(){return new Promise(function(e,t){document.addEventListener("deviceready",function(){var r=void 0;try{r=cordova.require("com.salesforce.plugin.oauth")}catch(e){}return r?void r.authenticate(function(t){this.accessToken=t.accessToken,e()},function(){console.error("Error refreshing oauth access token using the oauth plugin"),t()}):(console.error("Salesforce Mobile SDK OAuth plugin not available"),void t("Salesforce Mobile SDK OAuth plugin not available"))},!1)})}},{key:"computeEndPointIfMissing",value:function(e,t){if(void 0!==e)return{endPoint:e,path:t};var r=t.split("/").filter(function(e){return""!==e});return r.length>=2?{endPoint:"/"+r.slice(0,2).join("/"),path:"/"+r.slice(2).join("/")}:{endPoint:"",path:t}}},{key:"request",value:function(e){return v?new Promise(function(t,r){var n=computeEndPointIfMissing(e.endPoint,e.path);v.sendRequest(n.endPoint,n.path,t,r,e.method,e.data||e.params,e.headerParams)}):s(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"request",this).call(this,e)}}]),t}(y)}])});
/*
 * tagContainer Generator v5
 * Copyright Tag Commander
 * http://www.tagcommander.com/
 * Generated: 2016-05-27 12:21:39 Europe/Paris
 * ---
 * Version	: 8.00
 * IDTC 	: 5
 * IDS		: 1517
 */
/*!compressed by YUI*/ if(typeof tC=="undefined"){if(typeof document.domain=="undefined"||typeof document.referrer=="undefined"){document=window.document}(function(m,k){var j,r,y=m.document,a=m.location,e=m.navigator,x=m.tC,v=m.$,H=Array.prototype.push,b=Array.prototype.slice,u=Array.prototype.indexOf,g=Object.prototype.toString,i=Object.prototype.hasOwnProperty,o=String.prototype.trim,c=function(J,K){return new c.fn.init(J,K,j)},B=/[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,q=/\S/,t=/\s+/,d=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,w=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,l=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,D=/^[\],:{}\s]*$/,z=/(?:^|:|,)(?:\s*\[)+/g,G=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,E=/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,I=/^-ms-/,p=/-([\da-z])/gi,F=function(J,K){return(K+"").toUpperCase()},f={};c.fn=c.prototype={constructor:c,init:function(J,M,P){var L,N,K,O;if(!J){return this}if(J.nodeType){this.context=this[0]=J;this.length=1;return this}if(typeof J==="string"){if(J.charAt(0)==="<"&&J.charAt(J.length-1)===">"&&J.length>=3){L=[null,J,null]}else{L=w.exec(J)}if(L&&(L[1]||!M)){if(L[1]){M=M instanceof c?M[0]:M;O=(M&&M.nodeType?M.ownerDocument||M:y);J=c.parseHTML(L[1],O,true);if(l.test(L[1])&&c.isPlainObject(M)){this.attr.call(J,M,true)}return c.merge(this,J)}else{N=y.getElementById(L[2]);if(N&&N.parentNode){if(N.id!==L[2]){return P.find(J)}this.length=1;this[0]=N}this.context=y;this.selector=J;return this}}else{if(!M||M.tC){return(M||P).find(J)}else{return this.constructor(M).find(J)}}}else{if(c.isFunction(J)){return P.ready(J)}}if(J.selector!==k){this.selector=J.selector;this.context=J.context}return c.makeArray(J,this)},each:function(K,J){return c.each(this,K,J)},ready:function(J){c.ready.promise(J);return this}};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var S,L,J,K,P,Q,O=arguments[0]||{},N=1,M=arguments.length,R=false;if(typeof O==="boolean"){R=O;O=arguments[1]||{};N=2}if(typeof O!=="object"&&!c.isFunction(O)){O={}}if(M===N){O=this;--N}for(;N<M;N++){if((S=arguments[N])!=null){for(L in S){J=O[L];K=S[L];if(O===K){continue}if(R&&K&&(c.isPlainObject(K)||(P=c.isArray(K)))){if(P){P=false;Q=J&&c.isArray(J)?J:[]}else{Q=J&&c.isPlainObject(J)?J:{}}O[L]=c.extend(R,Q,K)}else{if(K!==k){O[L]=K}}}}}return O};c.extend({ssl:(("https:"==y.location.protocol)?"https://manager.":"http://redirect1517."),randOrd:function(){return(Math.round(Math.random())-0.5)},nodeNames:"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",rnocache:/<(?:script|object|embed|option|style)/i,rnoshimcache:new RegExp("<(?:"+c.nodeNames+")[\\s/>]","i"),rchecked:/checked\s*(?:[^=]|=\s*.checked.)/i,containersLaunched:{}});c.extend({inArray:function(N,K,M){var J,L=Array.prototype.indexOf;if(K){if(L){return L.call(K,N,M)}J=K.length;M=M?M<0?Math.max(0,J+M):M:0;for(;M<J;M++){if(M in K&&K[M]===N){return M}}}return -1},isFunction:function(J){return c.type(J)==="function"},isArray:Array.isArray||function(J){return c.type(J)==="array"},isWindow:function(J){return J!=null&&J==J.window},isNumeric:function(J){return !isNaN(parseFloat(J))&&isFinite(J)},type:function(J){return J==null?String(J):f[g.call(J)]||"object"},each:function(O,P,L){var K,M=0,N=O.length,J=N===k||c.isFunction(O);if(L){if(J){for(K in O){if(P.apply(O[K],L)===false){break}}}else{for(;M<N;){if(P.apply(O[M++],L)===false){break}}}}else{if(J){for(K in O){if(P.call(O[K],K,O[K])===false){break}}}else{for(;M<N;){if(P.call(O[M],M,O[M++])===false){break}}}}return O},log:function(J,K){try{if(c.getCookie("tCdebugLib")&&console){console[K?K:"log"](J)}}catch(L){}}});c.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(K,J){f["[object "+J+"]"]=J.toLowerCase()});j=c(y);var h={};function C(K){var J=h[K]={};c.each(K.split(t),function(M,L){J[L]=true});return J}c.buildFragment=function(M,N,K){var L,J,O,P=M[0];N=N||y;N=!N.nodeType&&N[0]||N;N=N.ownerDocument||N;if(M.length===1&&typeof P==="string"&&P.length<512&&N===y&&P.charAt(0)==="<"&&!c.rnocache.test(P)&&(c.support.checkClone||!c.rchecked.test(P))&&(c.support.html5Clone||!c.rnoshimcache.test(P))){J=true;L=jQuery.fragments[P];O=L!==k}if(!L){L=N.createDocumentFragment();c.clean(M,N,L,K);if(J){c.fragments[P]=O&&L}}return{fragment:L,cacheable:J}};var s=a.hostname,n=s.split("."),A="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";if(n.length<2||s.match(A)){c.maindomain=s}else{c.maindomain=n[n.length-2]+"."+n[n.length-1]}m.tC=c})(window)}tC.extend({internalvars:typeof tC.internalvars!="undefined"?tC.internalvars:{},internalFunctions:typeof tC.internalFunctions!="undefined"?tC.internalFunctions:{},privacyVersion:"",containerVersion:"8.00",id_container:"5",id_site:"1517",generatorVersion:"1.0.0",dedup_done:typeof tC.dedup_done!="undefined"?tC.dedup_done:false});tC.extend({launchTag:function(e,c,d,a,b){tC.array_launched_tags.push(c);tC.array_launched_tags_keys.push(e);tC.containersLaunched[a][b].t.push({id:e,label:c,idTpl:d});window.postMessage('TC.EX:{"id":"'+e+'","idc":"'+b+'","idt":"'+d+'","ids":"'+a+'","lb":"'+c.replace(/"/g,'\\"')+'"}',"*")}});if(tC.containersLaunched===undefined){tC.containersLaunched={}}if(tC.containersLaunched[1517]===undefined){tC.containersLaunched[1517]={}}tC.containersLaunched[1517][5]={v:"8.00",t:[]};tC.extend({domReady:false,isDOMReady:function(){if(document.readyState=="complete"||document.readyState=="loaded"){return true}if(document.readyState!="interactive"){return false}if(!document.documentElement.doScroll){return true}try{document.documentElement.doScroll("left");return true}catch(a){return false}},waitingOnDomReadyCallBacks:tC.waitingOnDomReadyCallBacks||[],excuteOnDomReadyCallBacks:function(){for(var a=0;a<tC.waitingOnDomReadyCallBacks.length;a++){tC.waitingOnDomReadyCallBacks[a]()}tC.waitingOnDomReadyCallBacks=[]},onDomReady:function(b){if(this.domReady){b();return}tC.waitingOnDomReadyCallBacks.push(b);var a=false;if(document.addEventListener){a=true;document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);tC.excuteOnDomReadyCallBacks()},false)}else{if(document.attachEvent){a=true;document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);tC.excuteOnDomReadyCallBacks()}});if(document.documentElement.doScroll&&window==window.top){(function(){if(tC.domReady){return}try{document.documentElement.doScroll("left")}catch(c){setTimeout(arguments.callee,0);return}tC.excuteOnDomReadyCallBacks()})()}}}if(!a){window.onload=tC.excuteOnDomReadyCallBacks}}});if(tC.isDOMReady()){tC.domReady=true}else{tC.onDomReady(function(){tC.domReady=true})}tC.extend({isCurrentVersion:function(){var a=tC.getCookie("tc_mode_test"),b="testModeIncludeReplaceThisByTrue";return a!="1"||(a=="1"&&b=="true")}});tC.extend({pixelTrack:{add:function(a,b){a=a||0;b=b||"img";tC.onDomReady(function(){if(b=="iframe"){var c=document.createElement(b);c.src=a;c.width=1;c.height=1;c.style.display="none";document.body.appendChild(c)}else{var c=new Image();c.src=a}})}}});tC.extend({tc_hdoc:false,domain:function(){this.tc_hdoc=document;try{try{this.tc_hdoc=top.document}catch(d){this.tc_hdoc=document}var a=typeof this.tc_hdoc.domain!="undefined"?this.tc_hdoc.domain.toLowerCase().split("."):false,g="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$";if(a.length<2||this.tc_hdoc.domain.match(g)){return""}else{var f=a[a.length-3],c=a[a.length-2],b=a[a.length-1];if(c=="co"||c=="com"){return"."+f+"."+c+"."+b}else{return"."+c+"."+b}}}catch(d){tC.log(["tC.domain error : ",d],"warn")}}});tC.domain();tC.extend({removeCookie:function(a){this.setCookie(a,"",-1)},setCookie:function(c,e,a,h,d,g){if(!d){d=tC.domain()}var b=new Date();b.setTime(b.getTime());if(a){a=a*1000*60*60*24}var f=new Date(b.getTime()+(a));document.cookie=c+"="+escape(e)+((a)?";expires="+f.toGMTString():"")+((h)?";path="+h:";path=/")+((d)?";domain="+d:"")+((g)?";secure":"")},getCookie:function(a){return(result=new RegExp("(?:^|; )"+encodeURIComponent(a)+"=([^;]*)").exec(document.cookie))?unescape(result[1]):""}});tC.extend({storage:{has:function(){try{if("localStorage" in window&&window.localStorage!==null){window.localStorage.setItem("TC_CHECK","1");window.localStorage.removeItem("TC_CHECK");return true}return false}catch(a){return false}},get:function(a){return this.has()?window.localStorage.getItem(a):false},set:function(b,a){return this.has()?(window.localStorage.setItem(b,a)||true):false},remove:function(a){return this.has()?(window.localStorage.removeItem(a)||true):false}}});tC.extend({_R:{cR:function(a){tC.storage.set("tC_Sync",a);tC.pixelTrack.add("//engage.commander1.com/reach?tc_s=1517")},rR:function(){if(tC.storage.has()){var a=new Date().getTime();var b=tC.storage.get("tC_Sync")||0;b=parseInt(b);if(b==0||a-b>604800000){this.cR(a)}}}}});tC.onDomReady(function(){tC._R.rR()});tC.extend({hitCounter:function(){if(Math.floor(Math.random()*parseInt(10))==0){tC.pixelTrack.add("//manager.tagcommander.com/utils/hit.php?id=5&site=1517&version=8.00&frequency=10&position="+tC.container_position+"&rand="+Math.random())}}});tC.container_position=(typeof tc_container_position!=="undefined")?tc_container_position:(typeof tC.container_position!=="undefined")?tC.container_position:0;tC.container_position++;if(typeof tc_container_position!=="undefined"){tc_container_position++}tC.hitCounter();tC.extend({script:{add:function(d,f,c){var a=(document.getElementsByTagName("body")[0]||document.getElementsByTagName("script")[0].parentNode),b=document.createElement("script");b.type="text/javascript";b.async=true;b.src=d;b.charset="utf-8";if(a){if(f){if(b.addEventListener){b.addEventListener("load",function(){f()},false)}else{b.onreadystatechange=function(){if(b.readyState in {loaded:1,complete:1}){b.onreadystatechange=null;f()}}}}if(c&&typeof c=="number"){setTimeout(function(){if(a&&b.parentNode){a.removeChild(b)}},c)}a.insertBefore(b,a.firstChild)}else{tC.log("tC.script error : the element <script> or <body> is not found ! the file "+d+" is not implemented !","warn")}}}});tC.extend({getParamURL:function(p,b){if(typeof p==="undefined"){return""}p=p.toLowerCase();var n=new Array();if(!b){var o="";try{if(typeof top!="undefined"&&typeof top.document!="undefined"){o=top.document}}catch(h){}if(o===""){o=document}b=typeof o.location!="undefined"?o.location.href:""}var m=0;var d=b.indexOf("?");var c=b.indexOf("#");if(d!=-1){m=d}else{if(c!=-1){m=c}}var a="";if(m!=0){a=b.substring(m+1,b.length).split("#").join("&")}a=a.replace(/%3d/g,"=");var f=a.split("&");for(var g=0;g<f.length;g++){var l=f[g].split("="),j=(l.shift()).toLowerCase(),k=l.join("=");n[j]=k}return((typeof n[p]!="undefined")?n[p]:"")}});tC.fn.css=function(b){try{this.each(function(g,j){for(var d in b){var h="";if(/-/.test(d)){var c=d.split("-");for(var g in c){if(g==0){h=c[g]}else{var f=c[g].split(""),k=f.shift();h+=k.toUpperCase()+f.join("")}}}else{var h=d}j.style[h]=b[d]}})}catch(a){tC.log(["tC.fn.css->error",a.message],"warn")}return this};tC.fn.resetCss=function(){this.each(function(a,b){tC(b).css({border:"none",background:"none",font:"none",margin:"none",padding:"none",top:"none",left:"none",buttom:"none",right:"none",width:"none",height:"none"})});return this};tC.extend({privacy:{reactived:null,id:null,version:null,categories:null,cookieData:null,init:function(){this.categories=tC.getCookie(this.getCN()+"_categories").split(",");this.cookieData=tC.getCookie(this.getCN()).split("@@@")},set:function(a){this.settings=a},getCN:function(){return typeof tc_privacy_cookie_name!="undefined"?tc_privacy_cookie_name:"TC_OPTOUT"},activTag:function(e,c){var d=e.split("@@@");if(d.length>2){var b=d[2].split("|");for(var a=0;a<b.length;a++){if(c==b[a]){return c}}return false}return c},In:function(c,a,b){b=b?b:"";this.cok(0,a,b);this.hit(1,a,c,b)},Out:function(c,a,b){b=b?b:"";this.cok(1,a,b);this.hit(0,a,c,b)},cok:function(b,c,d){var e=typeof tc_privacy_force_domain!=="undefined"?tc_privacy_force_domain:null;tC.setCookie(this.getCN(),b+"@@@"+c+"@@@"+d,396,"/",e)},hit:function(b,c,e,d){tC.pixelTrack.add(tC.ssl+"tagcommander.com/utils/privacyHit.php?id_tc=5&site=1517&version="+c+"&id_privacy="+e+"&privacy_action="+b+"&list_tag="+d+"&rand="+Math.random())},validRules:function(c){if(this.cookieData===null){this.init()}if(!this.cookieData.length||(this.cookieData.length===1&&this.cookieData[0]==="")){return true}var a=parseInt(this.cookieData[0]||0),b=this.cookieData[1]||0,d=(this.cookieData[2]||"").split("|");return(a===0&&(tC.inArray(c.toString(),d)!==-1||tC.inArray("ALL",d)!==-1))||(a===1&&(tC.inArray(c.toString(),d)===-1&&tC.inArray("ALL",d)===-1))},isEnable:function(){if(this.cookieData===null){this.init()}return(this.cookieData.length<=2||(this.reactivate!=""&&this.cookieData[1]==this.reactivate))},getContainer:function(a){return a.getElementById("tc_div_preview")||a.body},hitCounter:function(a){tC.pixelTrack.add("//manager.tagcommander.com/utils/privacyHit.php?id="+tC.id_container+"&site="+tC.id_site+"@&version="+tC.privacyVersion+"&id_privacy="+a+"&privacy_action=V&rand="+Math.random())}}});tC1517_5=tC;/* RETRO COMPATIBILITY FUNCTIONS */


if(typeof tc_vars=='undefined')var tc_vars=[];(function(){var l='env_template|env_work|env_channel|env_language|env_country|env_dnt|env_site|user_id|user_logged|page_cat1|page_cat2|page_cat3|page_name|page_error|conversion_funnel_name|conversion_funnel_name2|conversion_funnel_step|conversion_simulation_id|conversion_contract_id|conversion_file_id|conversion_amount_ati|conversion_discount_ati|conversion_amount_tf|conversion_discount_tf|promo_code|conversion_newcustomer|conversion_score|conversion_currency|conversion_email|conversion_products|product_name|product_url_page|search_keywords|search_page_number|search_results_number|search_filters|xtsd|xtsite|xtergo|xtpagetype|xt_multc|xt_tags|xtform|xtn2|xtncom|xt_orderid|xt_roimt|xt_paym|xt_promocode|xt_ordermc'.split('|');for(var k in l){if(!tc_vars.hasOwnProperty(l[k])){tc_vars[l[k]]='';}}})();

/*DYNAMIC JS BLOCK 1*/


/*END DYNAMIC JS BLOCK 1*/

/*CUSTOM_JS_BLOCK1*/

/*END_CUSTOM_JS_BLOCK1*/
tC.array_launched_tags=[];tC.array_launched_tags_keys=[];tC.id_site='1517';if(tC.getCookie('tc_mode_test')==1){(function(){var tc_testmodescriptload=document.createElement('script');tc_testmodescriptload.type='text/javascript';tc_testmodescriptload.src='//manager.tagcommander.com/utils/test_mode_include.php?id=5&site=1517&type=load&rand='+Math.random()+'&version=';(document.getElementsByTagName('body')[0]||document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0].parentNode).appendChild(tc_testmodescriptload);})();}else{
/*VARIABLES_BLOCK*/

tC.internalvars.xtpage="";if(tc_vars.page_cat1!==""){tC.internalvars.xtpage+=tc_vars.page_cat1;}
if(tc_vars.page_cat2!==""){if(tC.internalvars.xtpage!==""){tC.internalvars.xtpage+="::";}tC.internalvars.xtpage+=tc_vars.page_cat2;}
if(tc_vars.page_cat3!==""){if(tC.internalvars.xtpage!==""){tC.internalvars.xtpage+="::";}tC.internalvars.xtpage+=tc_vars.page_cat3;}
if(tc_vars.page_name!==""&&tc_vars.page_name!==tc_vars.page_cat1&&tc_vars.page_name!==tc_vars.page_cat2&&tc_vars.page_name!==tc_vars.page_cat3){if(tC.internalvars.xtpage!==""){tC.internalvars.xtpage+="::";}tC.internalvars.xtpage+=tc_vars.page_name;}
tC.internalvars.ua=navigator.userAgent.toLowerCase();if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(tC.internalvars.ua)){tC.internalvars.ua='tablet';}else{if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(tC.internalvars.ua)){tC.internalvars.ua='mobile';}else{tC.internalvars.ua='desktop';}}
tC.internalvars.ADMO_objectif="";switch(tc_vars["conversion_funnel_step"]){case"step2":tC.internalvars.ADMO_objectif="lead";break;case"step3":tC.internalvars.ADMO_objectif="devis";break;case"step5":tC.internalvars.ADMO_objectif="contrat";break;default:tC.internalvars.ADMO_objectif="lead";break;}
var tc_product_ID='';switch(tc_vars["page_name"].toString().toLowerCase()){case"assurance auto":tc_product_ID="1";break;case"assurance voiture sans permis":tc_product_ID="2";break;case"assurance moto":tc_product_ID="3";break;case"assurance scooter":tc_product_ID="4";break;case"assurance cyclo":tc_product_ID="5";break;case"assurance quad":tc_product_ID="6";break;case"assurance habitation":tc_product_ID="";break;case"assurance sante":tc_product_ID="";break;case"assurance chiens chats":tc_product_ID="";break;default:tc_product_ID="";}
tC.internalvars.google_conv_label="";switch(tc_vars["conversion_funnel_name"]){case"AUTO":tC.internalvars.google_conv_label="x1";break;case"MOTO":tC.internalvars.google_conv_label="x2";break;case"MRH":tC.internalvars.google_conv_label="x3";break;case"SANTE":tC.internalvars.google_conv_label="x4";break;default:tC.internalvars.google_conv_label="x1";break;}
tC.internalvars.eggs_page="";switch(tc_vars["page_name"]){case"homepage":tC.internalvars.eggs_page="1";break;case"promotion avantage assurance":tC.internalvars.eggs_page="2";break;default:tC.internalvars.eggs_page="";break;}

/*END_VARIABLES_BLOCK*/


/*DYNAMIC JS BLOCK 2*/


/*END DYNAMIC JS BLOCK 2*/

/*CUSTOM_JS_BLOCK2*/

/*END_CUSTOM_JS_BLOCK2*/
tC.inclusion_adperf_conversion_1="\/\* 2014-12-17 12:15:31 \*\/\n"+"\/\*\n"+"(c) Copyright Weborama SA - PARIS\n"+"All rights reserved\n"+"\n"+"It is illegal to modify, disassemble, sell, copy or publish  this software \n"+"or any part thereof. The use of this software is only permitted with the \n"+"prior and express written permission of Weborama SA - PARIS.\n"+"\n"+"for more information please contact: info@weborama.com\n"+"\*\/\n"+"(function(){\"use strict\";var I1a=navigator.userAgent.toLowerCase(),I1b=document,I1c=(I1a.indexOf('opera')>=0)?parseFloat(I1a.slice(I1a.indexOf('opera')+6)):0,I1d=((I1a.indexOf('msie')>=0)&&(!I1c))?(I1a.indexOf('trident/5.0')!==-1?9:parseFloat(I1a.slice(I1a.indexOf('msie')+5))):0;function I1e(I1f){if(typeof I1f===\"undefined\"||I1f===\"\"||I1f===null){return false;}\n"+"return true;}\n"+"function I1g(I1h){var I1i=new Date(),I1j={},I1k='a',I1l='',I1t='',I1u,I1m=\".weborama.fr\",I1n=\"/fcgi-bin/dispatch.fcgi\",I1p='',I1v,I1w;try{I1v=escape(document.location);I1w=escape((top!==null&&top.location!==null&&typeof(top.location.href)===\"string\")?top.document.referrer:document.referrer);}catch(e){}\n"+"I1i=parseInt(I1i.getTime()/1000-60*I1i.getTimezoneOffset(),10);if(location.protocol==='https:'){I1k='b';}\n"+"if(I1h.fullhost!==undefined&&I1h.fullhost!==''){I1p=((location.protocol==='https:')?\"https:\/\/\":\"http:\/\/\")+I1h.fullhost;}else if(I1h.host!==''){I1p=((location.protocol==='https:')?\"https:\/\/\":\"http:\/\/\")+I1h.host+'.solution.weborama.fr';}else{I1p=((location.protocol==='https:')?\"https:\/\/ssl\":\"http:\/\/perf\")+I1m;}\n"+"I1l=I1p+I1n+\"?a.A=co\";I1l+=\"&a.si=\"+I1h.site;I1l+=\"&a.cp=\"+I1h.conversion_page;I1l+=\"&a.ct=\"+I1k;if(I1e(I1h.client)&&I1h.client!==0){I1l+=\"&a.cid=\"+escape(I1h.client);}\n"+"if(I1e(I1h.amount)&&I1h.amount!==0){I1l+=\"&a.re=\"+escape(I1h.amount);}if(I1e(I1h.invoice_id)&&I1h.invoice_id!==0){I1l+=\"&a.iid=\"+escape(I1h.invoice_id);}\n"+"if(I1e(I1h.quantity)&&I1h.quantity!==0){I1l+=\"&a.inu=\"+I1h.quantity;}\n"+"if(I1e(I1h.is_client)){I1l+=\"&a.isc=\"+I1h.is_client;}\n"+"if(I1e(I1h.funnel_id)){I1l+=\"&a.fu=\"+I1h.funnel_id;}\n"+"if(I1e(I1h.funnel_step)){I1l+=\"&a.fus=\"+I1h.funnel_step;}\n"+"if(I1e(I1h.is_mobile)){I1l+=\"&g.ism=\"+(I1h.is_mobile?1:0);}\n"+"if(I1e(I1h.device_id)&&I1h.device_id.match&&I1h.device_id.match(/^[a-f0-9_\\-]+$/i)){I1l+=\"&g.did=\"+encodeURIComponent(I1h.device_id);}\n"+"I1l+='&da='+I1i+'&g.ru='+I1w+'&g.pu='+I1v;if(I1h.optional_parameters){for(I1u in I1h.optional_parameters){if((typeof I1j[I1u]===\"undefined\"||I1j[I1u]!==I1h.optional_parameters[I1u])&&typeof I1h.optional_parameters[I1u]!==\"function\"){if(I1t.length>0){I1t+=',';}\n"+"I1t+=encodeURIComponent(I1u)+':'+encodeURIComponent(I1h.optional_parameters[I1u]);}\n"+"}\n"+"if(I1t.length>0){I1l=I1l+\"&a.opt=\"+encodeURIComponent(I1t);}\n"+"}\n"+"return I1l;}\n"+"function I1q(I1h){try{var I1r=I1b.createElement('IFRAME'),I1s=I1b.getElementsByTagName('body').item(0)||I1b.documentElement.childNodes[0];I1r.style.width=I1r.style.height='1px';I1r.style.border='0px';I1r.style.position='absolute';I1r.style.display='none';I1r.style.top=I1r.style.left='0px';I1r.style.zIndex=0;I1r.src=I1g(I1h);if(I1d>5&&I1d<=6){I1s.insertAdjacentHTML(\"beforeBegin\",\"<iframe src='\"+I1g(I1h)+\"' width=\\\"1\\\" height=\\\"1\\\" frameborder=\\\"0\\\" style='zindex:0;position:absolute;border:0px;display:none;left:0;top:0;width:1px;height:1px;'><\\/iframe>\");}\n"+"else if(I1s.firstChild!==null){I1s.insertBefore(I1r,I1s.firstChild);}\n"+"else{I1s.appendChild(I1r);}\n"+"}catch(e){I1b.write(\"<iframe src='\"+I1g(I1h)+\"' width=\\\"1\\\" height=\\\"1\\\" frameborder=\\\"0\\\" style='zindex:0;position:absolute;border:0px;display:none;left:0;top:0;width:1px;height:1px;'><\\/iframe>\");}\n"+"}\n"+"if(typeof window.adperfTracker===\"undefined\"){window.adperfTracker=(function(){return{track:I1q};}());}\n"+"}());";}

//----------------------------------------------------




//----

if(tC.getCookie('tc_mode_test')==1){(function(){var tc_testmodescriptexec=document.createElement('script');tc_testmodescriptexec.type='text/javascript';tc_testmodescriptexec.src='//manager.tagcommander.com/utils/test_mode_include.php?id=5&site=1517&type=exec&rand='+Math.random()+'&version=8.00';(document.getElementsByTagName('body')[0]||document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0].parentNode).appendChild(tc_testmodescriptexec);})();(function(){setTimeout(function(){if(typeof top.tc_count!=='undefined'){top.tc_count++;}else{top.tc_count=1;}var tc_newscript=document.createElement('script');tc_newscript.type='text/javascript';tc_newscript.src='//manager.tagcommander.com/utils/livetest/bookmarklet.php?r='+Math.random()+'&nb='+top.tc_count+'&container=1517!5&version=8.00';(document.getElementsByTagName('body')[0]||document.getElementsByTagName('head')[0]||document.getElementsByTagName('script')[0].parentNode).appendChild(tc_newscript);},1000);})();}else{tC.launchTag('105','Measure Click and Site Tracking 3.5','1885','1517','5');if(typeof tC.msr!=="object"){tC.msr=[];}
tC.onDomReady(function(){tC.msr.page_name=tc_vars["page_name"];tC.msr.page_type=tc_vars["env_template"];tC.msr.dns='assu2000.commander1.com';tC.msr.sbrand=[];tC.msr.sbrand[0]='assu2000';tC.msr.sbrand[1]='assurances 2000';tC.msr.sbrand[2]='assurances2000';tC.msr.sbrand[3]='';tC.msr.user_id='';tC.msr.provided_excluded_referrer=''.split(',');var tc_search_engine='';if(tc_search_engine!=='')
{var tc_search_engine_fs=tc_search_engine.split(",")
tC.msr.provided_search_engines=(function(){var pl=[];for(var i=0;i<tc_search_engine_fs.length;++i){pl.push(tc_search_engine_fs[i].split('|'));}
return pl;})()}
tC.msr.provided_social_networks=''.split(',');tC.msr.provided_brand_urls=''.split(',');tC.msr.internal_subdmomains=''.split(',')
tC.msr.id_site='1517';tC.msr.additional_params='';tC.msr.scriptElt1=document.createElement("script");tC.msr.scriptElt1.id="tc_script_msr_1";tC.msr.scriptElt1.src="//cdn.tagcommander.com/measure/measure.js";tC.msr.scriptElt1.async=true;tC.msr.scriptElt1.defer='defer';tC.msr.tmp=tC.getParamURL("tmp");(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]||document.getElementsByTagName('script')[0].parentNode).insertBefore(tC.msr.scriptElt1,null);});if((tc_vars["env_template"]=='promos')||(tc_vars["env_template"]=='homepage')){tC.launchTag('97','Eggs conversion','26','1517','5');eval(tC.inclusion_adperf_conversion_1);var adperftrackobj={client:"",amount:"0.0",invoice_id:"",quantity:0,is_client:0,optional_parameters:{"N1":"0","N2":"0"},fullhost:'assu2000.solution.weborama.fr',site:3017,conversion_page:tC.internalvars.eggs_page}
try{adperfTracker.track(adperftrackobj);}catch(err){}}
tC.launchTag('57','TagCommander - Privacy Optout','1529','1517','5');tC.privacy_optout_landing=function(){if(tC.getCookie(tC.privacy.getCN())===''){if((typeof tc_privacy_used==="undefined"||tc_privacy_used===0)&&tC.limit<40){tC.limit++;setTimeout(tC.privacy_optout_landing,100);}else{tC.privacy.In(0,tC.containerVersion,'ALL');}}};tC.limit=0;tC.onDomReady(function(){if(tC.getCookie(tC.privacy.getCN())===''){tC.privacy_optout_landing();}});}
var tc_privacy_used=0;var tc_privacy_display_5=function(){if(tC.isCurrentVersion()){tC.script.add('//cdn.tagcommander.com/privacy/1517/privacy_1.js');}}
var tc_privacy_cpt=0;function tc_privacy_wait_body_5(){if(document.body!=null){tc_privacy_display_5();}else{tc_privacy_cpt++;if(tc_privacy_cpt<20){setTimeout("tc_privacy_wait_body_5()",100);}}}
tc_privacy_wait_body_5();
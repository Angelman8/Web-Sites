/*1361244550,173213727*/

if (self.CavalryLogger) { CavalryLogger.start_js(["dMo4h"]); }

__d("Recaptcha",["AsyncRequest","Bootloader","CSS","DOM","Env","ge","tx"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('Bootloader'),i=b('CSS'),j=b('DOM'),k=b('Env'),l=b('ge'),m=b('tx');a.recaptcha_log_action=function(q){new g().setURI('/ajax/captcha/recaptcha_log_actions.php').setData({action:q,ua:navigator.userAgent,location:window.location.href}).setMethod('GET').setReadOnly(true).send();};var n,o={tabindex:0,callback:null},p={widget:null,timer_id:-1,fail_timer_id:-1,type:'image',ajax_verify_cb:null,audio_only:false,$:function(q){if(typeof(q)=="string"){return document.getElementById(q);}else return q;},create:function(q,r,s){p.destroy();if(r)p.widget=p.$(r);p._init_options(s);p._call_challenge(q);},destroy:function(){var q=p.$('recaptcha_challenge_field');if(q)q.parentNode.removeChild(q);if(p.timer_id!=-1)clearInterval(p.timer_id);p.timer_id=-1;var r=p.$('recaptcha_image');if(r)r.innerHTML="";if(p.widget){p.widget.style.display="none";p.widget=null;}},focus_response_field:function(){var q=p.$,r=q('captcha_response');try{r.focus();}catch(s){}},get_challenge:function(){if(typeof(a.RecaptchaState)=="undefined")return null;return a.RecaptchaState.challenge;},get_response:function(){var q=p.$,r=q('captcha_response');if(!r)return null;return r.value;},ajax_verify:function(q){p.ajax_verify_cb=q;var r=p._get_api_server()+"/ajaxverify"+"?c="+encodeURIComponent(p.get_challenge())+"&response="+encodeURIComponent(p.get_response());p._add_script(r);},_ajax_verify_callback:function(q){p.ajax_verify_cb(q);},_get_api_server:function(){var q=window.location.protocol,r;if(typeof(a._RecaptchaOverrideApiServer)!="undefined"){r=a._RecaptchaOverrideApiServer;}else r="www.google.com";return q+"//"+r;},_call_challenge:function(q){if(!p.audio_only)p.fail_timer_id=setTimeout(p.fail_timer_id==-1?"recaptcha_log_action('timeout'); create_captcha();":"create_captcha();",15000);var r=p._get_api_server()+"/recaptcha/api/challenge?k="+q+"&ajax=1&xcachestop="+Math.random();if(l('extra_challenge_params')!=null)r+="&"+l('extra_challenge_params').value;p._add_script(r);},_add_script:function(q){h.requestResource('js',q);},_init_options:function(q){var r=o,s=q||{};for(var t in s)r[t]=s[t];n=r;},challenge_callback:function(){if(!p.audio_only){clearTimeout(p.fail_timer_id);p._reset_timer();}var q=p.widget;if(window.addEventListener)window.addEventListener('unload',function(t){p.destroy();},false);if(p._is_ie()&&window.attachEvent)window.attachEvent('onbeforeunload',function(){});if(navigator.userAgent.indexOf("KHTML")>0){var r=document.createElement('iframe');r.src="about:blank";r.style.height="0px";r.style.width="0px";r.style.visibility="hidden";r.style.border="none";var s=document.createTextNode("This frame prevents back/forward cache problems in Safari.");r.appendChild(s);document.body.appendChild(r);}p._finish_widget();if(p.audio_only)p.switch_type('audio');a.recaptcha_log_action('shown');},_finish_widget:function(){var q=p.$,r=a.RecaptchaState,s=n,t=document.createElement("input");t.type="password";t.setAttribute("autocomplete","off");t.style.display="none";t.name="recaptcha_challenge_field";t.id="recaptcha_challenge_field";q('captcha_response').parentNode.insertBefore(t,q('captcha_response'));q('captcha_response').setAttribute("autocomplete","off");q('recaptcha_image').style.width='300px';q('recaptcha_image').style.height='57px';p.should_focus=false;if(!p.audio_only){p._set_challenge(r.challenge,'image');}else p._set_challenge(r.challenge,'audio');if(s.tabindex)q('captcha_response').tabIndex=s.tabindex;if(p.widget)p.widget.style.display='';if(s.callback)s.callback();q('recaptcha_loading').style.display="none";},switch_type:function(q){var r=p;r.type=q;r.$('recaptcha_type').value=q;r.reload(r.type=='audio'?'a':'v');},reload:function(q){var r=p,s=r.$,t=a.RecaptchaState;if(typeof(q)=="undefined")q='r';var u=t.server+"reload?c="+t.challenge+"&k="+t.site+"&reason="+q+"&type="+r.type+"&lang="+k.recaptcha_lang;if(l('extra_challenge_params')!=null)u+="&"+l('extra_challenge_params').value;r.should_focus=q!='t';r._add_script(u);},finish_reload:function(q,r){a.RecaptchaState.is_incorrect=false;p._set_challenge(q,r);},_set_challenge:function(q,r){var s=p,t=a.RecaptchaState,u=s.$;t.challenge=q;s.type=r;u('recaptcha_challenge_field').value=t.challenge;u('recaptcha_challenge_field').defaultValue=t.challenge;u('recaptcha_image').innerHtml="";if(r=='audio'){u("recaptcha_image").innerHTML=p.getAudioCaptchaHtml();}else if(r=='image'){var v=t.server+'image?c='+t.challenge;u('recaptcha_image').innerHTML="<img style='display:block;' height='57' width='300' src='"+v+"'/>";}p._css_toggle("recaptcha_had_incorrect_sol","recaptcha_nothad_incorrect_sol",t.is_incorrect);p._css_toggle("recaptcha_is_showing_audio","recaptcha_isnot_showing_audio",r=='audio');if(s.should_focus)s.focus_response_field();s._reset_timer();},_reset_timer:function(){var q=a.RecaptchaState;clearInterval(p.timer_id);p.timer_id=setInterval("Recaptcha.reload('t');",(q.timeout-60*5)*1000);},_clear_input:function(){var q=p.$('captcha_response');q.value="";},_displayerror:function(q){var r=p.$;j.empty('recaptcha_image');r('recaptcha_image').appendChild(document.createTextNode(q));},reloaderror:function(q){p._displayerror(q);},_is_ie:function(){return (navigator.userAgent.indexOf("MSIE")>0)&&!window.opera;},_css_toggle:function(q,r,s){var t=p.widget;if(!t)t=document.body;var u=t.className;u=u.replace(new RegExp("(^|\\s+)"+q+"(\\s+|$)"),' ');u=u.replace(new RegExp("(^|\\s+)"+r+"(\\s+|$)"),' ');u+=" "+(s?q:r);i.setClass(t,u);},playAgain:function(){var q=p.$;q("recaptcha_image").innerHTML=p.getAudioCaptchaHtml();},getAudioCaptchaHtml:function(){var q=p,r=a.RecaptchaState,s=p.$,t=r.server+"image?c="+r.challenge;if(t.indexOf("https://")==0)t="http://"+t.substring(8);var u=r.server+"/img/audiocaptcha.swf?v2",v;if(q._is_ie()){v='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="audiocaptcha" width="0" height="0" codebase="https://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab"><param name="movie" value="'+u+'" /><param name="quality" value="high" /><param name="bgcolor" value="#869ca7" /><param name="allowScriptAccess" value="always" /></object><br/>';}else v='<embed src="'+u+'" quality="high" bgcolor="#869ca7" width="0" height="0" name="audiocaptcha" align="middle" play="true" loop="false" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/flashplayer" url="'+u+'"></embed> ';var w=(p.checkFlashVer()?'<br/><a class="recaptcha_audio_cant_hear_link" href="#" onclick="Recaptcha.playAgain(); return false;">'+"Play Again"+'</a>':'')+'<br/><a class="recaptcha_audio_cant_hear_link" target="_blank" href="'+t+'">'+"Can't hear this"+'</a>';return v+w;},gethttpwavurl:function(){var q=a.RecaptchaState;if(p.type=='audio'){var r=q.server+"image?c="+q.challenge;if(r.indexOf("https://")==0)r="http://"+r.substring(8);return r;}return "";},checkFlashVer:function(){var q=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false,r=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false,s=(navigator.userAgent.indexOf("Opera")!=-1)?true:false,t=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var u=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"",v=navigator.plugins["Shockwave Flash"+u].description,w=v.split(" "),x=w[2].split(".");t=x[0];}}else if(q&&r&&!s)try{var z=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),aa=z.GetVariable("$version");t=aa.split(" ")[1].split(",")[0];}catch(y){}return t>=9;},getlang:function(){return k.recaptcha_lang;},createCaptcha:function(q){var r={};if(k.recaptcha_focus_on_load)r.callback=p.focus_response_field;setTimeout(function(){p.create(q,"captcha",r);},0);},createAudioCaptcha:function(q){setTimeout(function(){p._init_options({});p.audio_only=true;p._call_challenge(q);},0);}};e.exports=p;a.create_captcha=p.createCaptcha;});
__d("legacy:recaptcha",["Recaptcha"],function(a,b,c,d){var e=b('Recaptcha');a.m_create_audio_captcha=e.createAudioCaptcha;a.Recaptcha=e;},3);
__d("legacy:fbdesktop-detect",["FBDesktopDetect"],function(a,b,c,d){a.FbDesktopDetect=b('FBDesktopDetect');},3);
function FormTypeABTester(a){var b=16,c=32,d=65,e=90,f=48,g=57,h=58,i=63,j=91,k=94,l=0,m=0,n=0,o=0,p=[],q=null,r=[],s=[],t=[],u=[];for(var v=0;v<10;v++){r.push(0);s.push(0);}for(var w=0;w<10;w++){s.push(0);t.push(0);u.push(0);}var x=function(aa){var ba=window.event?Date.now():aa.timeStamp,ca=window.event?window.event.keyCode:aa.which;ca%=128;if((ca>=d&&ca<=e)||ca==c){l++;}else if(ca>=f&&ca<=g){m++;}else if(ca>=h&&ca<=i||ca>=j&&ca<=k){n++;}else o++;p[ca]=ba;if(q){var da=ba-q;if(da>=0&&((ca>=d&&ca<=e)||ca==c))if(da<400){s[Math.floor(da/20)]++;}else if(da<1000){t[Math.floor((da-400)/60)]++;}else if(da<3000)u[Math.floor((da-1000)/200)]++;}q=ba;},y=function(aa){var ba=window.event?Date.now():aa.timeStamp,ca=window.event?window.event.keyCode:aa.which,da=ba-p[ca%128];if(da>=50&&da<250)r[Math.floor((da-50)/20)]++;},z=function(aa){var ba=Math.max.apply(Math,aa),ca=[];aa.forEach(function(da){ca.push(Math.floor(da*63/(ba||1)));});return ca;};this.getDataVect=function(){var aa=s.concat(t,u);return z(aa).concat(z(r),[l/2,m/2,n/2,o/2]);};this.getData=function(){return Base64.encodeNums(this.getDataVect());};Event.listen(a,{keyup:y.bind(this),keydown:x.bind(this)});}function startFormTypeABTester(a){a.ab_tester=new FormTypeABTester(document);}function setFormTypeABTest(a){a.ab_test_data.value=a.ab_tester.getData();return true;}
__d("LoginFormController",["Event","ge","Button"],function(a,b,c,d,e,f){var g=b('Event'),h=b('ge'),i=b('Button');f.init=function(j,k){g.listen(j,'submit',function(){i.setEnabled(k,false);i.setEnabled.curry(k,true).defer(15000);});var l=h('lgnjs');if(l)l.value=parseInt(Date.now()/1000,10);};});
__d("QuicklingAugmenter",["URI"],function(a,b,c,d,e,f){var g=b('URI'),h=[],i={addHandler:function(j){h.push(j);},augmentURI:function(j){var k=[],l=g(j);h.forEach(function(m){var n=m(l);if(!n)return l;k.push(m);l=l.addQueryData(n);});h=k;return l;}};e.exports=i;});
__d("Quickling",["AjaxPipeRequest","Arbiter","Class","DocumentTitle","DOM","ErrorUtils","HTML","OnloadHooks","PageTransitions","QuicklingAugmenter","Run","URI","UserAgent","copyProperties","goOrReplace","isEmpty","QuicklingConfig"],function(a,b,c,d,e,f){var g=b('AjaxPipeRequest'),h=b('Arbiter'),i=b('Class'),j=b('DocumentTitle'),k=b('DOM'),l=b('ErrorUtils'),m=b('HTML'),n=b('OnloadHooks'),o=b('PageTransitions'),p=b('QuicklingAugmenter'),q=b('Run'),r=b('URI'),s=b('UserAgent'),t=b('copyProperties'),u=b('goOrReplace'),v=b('isEmpty'),w=b('QuicklingConfig'),x=w.version,y=w.sessionLength,z=new RegExp(w.inactivePageRegex),aa=0,ba,ca='',da={isActive:function(){return true;},isPageActive:function(ka){if(ka=='#')return false;ka=new r(ka);if(ka.getDomain()&&ka.getDomain()!=r().getDomain())return false;if(ka.getPath()=='/l.php'){var la=ka.getQueryData().u;if(la){la=r(unescape(la)).getDomain();if(la&&la!=r().getDomain())return false;}}var ma=ka.getPath(),na=ka.getQueryData();if(!v(na))ma+='?'+r.implodeQuery(na);return !z.test(ma);},getLoadCount:function(){return aa;}};function ea(ka){ka=ka||'Facebook';j.set(ka);if(s.ie()){ca=ka;if(!ba)ba=window.setInterval(function(){var la=ca,ma=j.get();if(la!=ma)j.set(la);},5000,false);}}function fa(ka){var la=document.getElementsByTagName('link');for(var ma=0;ma<la.length;++ma){if(la[ma].rel!='alternate')continue;k.remove(la[ma]);}if(ka.length){var na=k.find(document,'head');na&&k.appendContent(na,m(ka[0]));}}function ga(ka){var la={version:x};this.parent.construct(this,ka,{quickling:la});}i.extend(ga,g);t(ga.prototype,{_preBootloadFirstResponse:function(ka){return true;},_fireDomContentCallback:function(){this._request.cavalry&&this._request.cavalry.setTimeStamp('t_domcontent');o.transitionComplete();this._onPageDisplayed&&this._onPageDisplayed(this.pipe);this.parent._fireDomContentCallback();},_fireOnloadCallback:function(){if(this._request.cavalry){this._request.cavalry.setTimeStamp('t_hooks');this._request.cavalry.setTimeStamp('t_layout');this._request.cavalry.setTimeStamp('t_onload');}this.parent._fireOnloadCallback();},isPageActive:function(ka){return da.isPageActive(ka);},_versionCheck:function(ka){if(ka.version==x)return true;var la=['quickling','ajaxpipe','ajaxpipe_token'];u(window.location,r(ka.uri).removeQueryData(la),true);return false;},_processFirstResponse:function(ka){var la=ka.getPayload();ea(la.title);fa(la.syndication||[]);window.scrollTo(0,0);var ma=la.body_class||'';document.body.className=ma;},getSanitizedParameters:function(){return ['quickling'];}});function ha(){aa++;return aa>=y;}function ia(ka){g.setCurrentRequest(null);if(ha())return false;ka=p.augmentURI(ka);if(!da.isPageActive(ka))return false;window.ExitTime=Date.now();q.__removeHook('onafterloadhooks');q.__removeHook('onloadhooks');n.runHooks('onleavehooks');h.inform('onload/exit',true);new ga(ka).setCanvasId('content').send();return true;}function ja(ka){var la=window[ka];function ma(na,oa,pa){if(typeof na!=='function')na=eval.bind(null,na);var qa=la(l.guard(na),oa);if(oa>0)if(pa!==false)q.onLeave(function(){clearInterval(qa);});return qa;}window[ka]=ma;}q.onAfterLoad(function ka(){ja('setInterval');ja('setTimeout');o.registerHandler(ia,1);});e.exports=a.Quickling=da;});
__d("StringTransformations",[],function(a,b,c,d,e,f){e.exports={unicodeEscape:function(g){return g.replace(/[^A-Za-z0-9\-\.\:\_\$\/\+\=]/g,function(h){var i=h.charCodeAt().toString(16);return '\\u'+('0000'+i.toUpperCase()).slice(-4);});},unicodeUnescape:function(g){return g.replace(/(\\u[0-9A-Fa-f]{4})/g,function(h){return String.fromCharCode(parseInt(h.slice(2),16));});}};});
__d("DisablePlatformButton",["ge","CSS","Event"],function(a,b,c,d,e,f){var g=b('ge'),h=b('CSS'),i=b('Event'),j=false,k={init:function(l){for(var m=0;m<l.length;m++){var n=g(l[m]);i.listen(n,'click',function(o){if(j){return false;}else{j=true;for(var p=0;p<l.length;p++)h.addClass(l[p],'uiButtonDisabled');}});}}};e.exports=k;});
var RegistrationBootloader=(function(){return {init:function(a,b,c,d,e){this.confirmationNode=a;this.redirectConfirmation=b;this.regFormName=c;this.logFocusName=d;this.validationEndpoint=e;this.regForm=ge(c);if(this.regForm){this.regForm.onclick=this.bootload.bind(this);this.regForm.onkeypress=this.bootload.bind(this);}},bootload:function(a,b){if(this.regForm){this.regForm.onclick=null;this.regForm.onkeypress=null;}Bootloader.loadComponents(['registration'],function(){Registration.getInstance().init(this.confirmationNode,this.redirectConfirmation,this.regFormName,this.logFocusName,this.validationEndpoint);if(b)Registration.getInstance().validateForm();Registration.getInstance().logFormFocus();}.bind(this));},bootloadAndValidate:function(){this.bootload(null,true);}};})();
__d("useragentcm",["Bootloader","Env","ge"],function(a,b,c,d,e,f){var g=b('Bootloader'),h=b('Env'),i=b('ge');function j(){var k=false,l={ffid:(typeof(h.ffid)=="undefined"?0:h.ffid),ffid1:(typeof(h.ffid1)=="undefined"?0:h.ffid1),ffid2:(typeof(h.ffid2)=="undefined"?0:h.ffid2),ffid3:(typeof(h.ffid3)=="undefined"?0:h.ffid3),ffid4:(typeof(h.ffid4)=="undefined"?0:h.ffid4),ffver:(typeof(h.ffver)=="undefined"?0:h.ffver)};l.qp=document.location;var m=i('login_form');if(m&&m.action)l.qm=m.action;var n='\146\141\143\145\142\157\157\153',o=new RegExp('(^|\\.)'+n+'\\.com$','i').test(document.location.hostname);if(!o){k=true;}else if(l.qm){var p=l.qm.split('?')[0].split('#')[0],q=65535;for(var r=0;r<p.length;r++){var s=((q>>8)^p.charCodeAt(r))&255;s^=s>>4;q=((q<<8)^(s<<12)^(s<<5)^s)&65535;}if(h.ffver&&h.ffver!=q)k=true;}if(k){var t=document.location.protocol+'//www.'+n+'.com/ajax/ua_callback.php';if(document.referrer)l.qr1=document.referrer;g.loadModules(['AsyncSignal'],function(v){new v(t,l).send();});}}e.exports=j;});
__d("legacy:si-countermeasures",["useragentcm"],function(a,b,c,d){a.useragentcm=b('useragentcm');},3);
__d("WebStorageMonster",["Event","AsyncRequest","UserActivity","StringTransformations","setTimeoutAcrossTransitions"],function(a,b,c,d,e,f){var g=b('Event'),h=b('AsyncRequest'),i=b('UserActivity'),j=b('StringTransformations'),k=b('setTimeoutAcrossTransitions'),l=300000,m=false;function n(s){var t={};for(var u in s){var v=s.getItem(u),w=j.unicodeEscape(u);if(typeof v==='string')t[w]=v.length;}return t;}function o(s){if(a.localStorage&&s.keys)r._getLocalStorageKeys().forEach(function(t){if(s.keys.contains(t))a.localStorage.removeItem(t);});}function p(s){if(a.localStorage)r._getLocalStorageKeys().forEach(function(t){if(!s.some(function(u){return new RegExp(u).test(t);}))a.localStorage.removeItem(t);});if(a.sessionStorage)a.sessionStorage.clear();}function q(s){if(i.isActive(l)){k(q.curry(s),l);}else r.cleanNow(s);}var r={registerLogoutForm:function(s,t){g.listen(s,'submit',function(u){r.cleanOnLogout(t);});},schedule:function(s){if(m)return;m=true;q(s);},cleanNow:function(s){var t=Date.now(),u={},v=false;['localStorage','sessionStorage'].forEach(function(x){if(a[x]){u[x]=n(a[x]);v=true;}});var w=Date.now();u.logtime=w-t;if(v)new h('/ajax/webstorage/process_keys.php').setData(u).setHandler(function(x){if(!s){var y=x.getPayload();if(y.keys)y.keys=y.keys.map(j.unicodeUnescape);o(y);}}.bind(this)).send();},cleanOnLogout:function(s){if(s)p(s);if(a.sessionStorage)a.sessionStorage.clear();},_getLocalStorageKeys:Object.keys.curry(a.localStorage)};e.exports=r;});
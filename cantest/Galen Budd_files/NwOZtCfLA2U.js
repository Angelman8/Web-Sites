/*1361565146,178142523*/

if (self.CavalryLogger) { CavalryLogger.start_js(["aXcu+"]); }

__d("MercuryShareLinkUploader",["ArbiterMixin","AsyncRequest","CSS","copyProperties","DOM","Form","HTML","URLScraper","WebMessengerEvents","Event"],function(a,b,c,d,e,f){var g=b('ArbiterMixin'),h=b('AsyncRequest'),i=b('CSS'),j=b('copyProperties'),k=b('DOM'),l=b('Form'),m=b('HTML'),n=b('URLScraper'),o=b('WebMessengerEvents'),p=b('Event');function q(t,u,v,w,x){this._stageElement=t;this._stageContentElement=u;this._stageLoadingElement=v;this._isShareLoaded=false;this._shareInProgress=null;this._currentAsyncRequest=null;p.listen(w,'click',this.close.bind(this));this._scraper=new n(x);this._scraper.subscribe('match',s.curry(this));}j(q.prototype,g);j(q.prototype,{getAttachData:function(){if(this._isShareLoaded){return l.serialize(this._stageElement);}else return null;},check:function(){this._scraper.check();},close:function(){r(this);this._scraper.disable();this.inform('closed');},clear:function(){r(this);this._scraper.enable();},enable:function(){this._scraper.enable();},disable:function(){this._scraper.disable();}});function r(t){i.hide(t._stageElement);t._isShareLoaded=false;t._shareInProgress=null;t._currentAsyncRequest&&t._currentAsyncRequest.abort();t._currentAsyncRequest=null;t._scraper.reset();o.detailDOMChanged();}function s(t,event,u){t._shareInProgress=u.url;t._currentAsyncRequest&&t._currentAsyncRequest.abort();t._currentAsyncRequest=new h().setMethod('POST').setURI('/ajax/share_scrape.php').setData({u:u.url}).setHandler(function(v){if(t._shareInProgress!==u.url)return;t._shareInProgress=null;t._currentAsyncRequest=null;i.show(t._stageElement);k.empty(t._stageContentElement);k.setContent(t._stageContentElement,m(v.payload));t._isShareLoaded=true;o.detailDOMChanged();}).setStatusElement(t._stageLoadingElement);t._currentAsyncRequest.send();t.inform('link-detected');}e.exports=q;});
__d("WebMessengerSubscriptionsHandler",["SubscriptionsHandler"],function(a,b,c,d,e,f){var g=b('SubscriptionsHandler'),h=new g('webmessenger');e.exports=h;});
__d("WebMessengerDetailViewAllPeopleResultsControl",["Event","CSS","DataStore","DOM","ExpandableDataSource","MercuryIDs","Parent","WebMessengerStateConstants","WebMessengerStateManager","Token","WebMessengerEvents","cx","WebMessengerSubscriptionsHandler","copyProperties","WebMessengerTemplates"],function(a,b,c,d,e,f){var g=b('Event'),h=b('CSS'),i=b('DataStore'),j=b('DOM'),k=b('ExpandableDataSource'),l=b('MercuryIDs'),m=b('Parent'),n=b('WebMessengerStateConstants'),o=b('WebMessengerStateManager'),p=b('Token'),q=b('WebMessengerEvents'),r=b('cx'),s=b('WebMessengerSubscriptionsHandler'),t=b('copyProperties'),u=b('WebMessengerTemplates'),v=5,w=5,x=function(ca){this._rootElement=ca;j.empty(this._rootElement);var da=u[':fb:web-messenger:all-people-results'].build();j.setContent(this._rootElement,da.getRoot());this._loadingSpinner=da.getNode('loadingSpinner');this._peopleResults=da.getNode('results');this._loadMoreButton=da.getNode('loadMoreButton');this._loadMoreLink=da.getNode('loadMoreLink');s.addSubscriptions(g.listen(this._loadMoreLink,'click',function(){h.addClass(this._loadMoreButton,'async_saving');this._peopleDataSource&&this._peopleDataSource.loadMore();}.bind(this)));};t(x.prototype,{hideView:function(){h.hide(this._rootElement);},updateView:function(){var ca=o.getCurrentDetailState();if(ca==n.DETAIL.COMPOSE_ALL_PEOPLE_RESULTS){h.show(this._rootElement);y(this);q.detailDOMChanged();}},destroy:function(){}});function y(ca){h.show(ca._loadingSpinner);h.hide(ca._peopleResults);h.hide(ca._loadMoreButton);var da=o.getCurrentStateData(),ea=da.all_people_query||'';z(ca);var fa=(da.participants||[]).map(function(ga){return l.tokenize(ga).value;});ca._peopleDataSource.setExclusions(fa);ca._peopleDataSource.query(ea);}function z(ca){if(!ca._peopleDataSource){ca._peopleDataSource=new k({queryEndpoint:'/ajax/mercury/search_people.php'},v,w);ca._peopleDataSource.init();s.addSubscriptions(ca._peopleDataSource.subscribe('respond',aa.curry(ca)),g.listen(ca._rootElement,'click',function(event){var da=event.getTarget().parentNode;if(h.hasClass(da,"_4wt"))ba(event.getTarget(),ca._peopleDataSource);}));}}function aa(ca,da,ea){var fa=o.getCurrentDetailState(),ga=o.getCurrentStateData();if(fa==n.DETAIL.COMPOSE_ALL_PEOPLE_RESULTS&&ga.all_people_query==ea.value){j.empty(ca._peopleResults);h.show(ca._peopleResults);ea.results.forEach(function(ha){var ia=j.create('div',{className:'personResult'},ha.detail_markup);i.set(ia,'uid',ha.uid);j.appendContent(ca._peopleResults,ia);});if(ea.results.length){h.hide(ca._loadingSpinner);h.conditionShow(ca._loadMoreButton,!ca._peopleDataSource.hasLoadedAllResults());h.conditionClass(ca._loadMoreButton,'async_saving',ca._peopleDataSource.isLoadingMore());}}}function ba(ca,da){var ea=m.byClass(ca,'personResult'),fa=da.getEntry(i.get(ea,'uid')),ga=t(o.getCurrentStateData(),{new_tokens:[new p(fa)],start:false});o.updateDetailState(n.DETAIL.COMPOSE_MAIN,ga);}e.exports=x;});
__d("MessagingConst",["copyProperties"],function(a,b,c,d,e,f){var g=b('copyProperties'),h={APP_ID:313785040330,XD_MESSAGE:{SANDBOX_READY:'sandbox_ready',SET_CONTENT:'set_content',HTML_SIZE:'html_size',REFRESH_SIZE:'refresh_size'},SHINGLE_SCROLL_TRIGGER:5,EVENTS:{MESSAGE_SENT:'messaging/message_sent'},initConstants:function(i){g(h,i);}};e.exports=h;});
__d("MessagingXD",["Event","DOM","MercuryConstants","MessagingConst","URI","copyProperties"],function(a,b,c,d,e,f){var g=b('Event'),h=b('DOM'),i=b('MercuryConstants'),j=b('MessagingConst'),k=b('URI'),l=b('copyProperties');function m(n){this._listeners=[g.listen(window,'message',this._onPostMessage.bind(this))];this._iframes={};this._contentWindows={};this._messageHandler=n;}l(m.prototype,{unload:function(){this._listeners.forEach(function(n){n.remove();});},createIframe:function(n,o,p){var q=new k(p);this._iframes[o]=h.create('iframe',{name:o,frameBorder:0,src:q.toString()});h.appendContent(n,this._iframes[o]);this._contentWindows[o]=this._iframes[o].contentWindow;return this._iframes[o];},sendMessage:function(n,o){var p=Array.prototype.slice.apply(arguments);p[0]=j.APP_ID;var q=this._iframes[n].contentWindow||this._contentWindows[n];q.postMessage(p.join(','),i.Sandbox.ORIGIN);},_onPostMessage:function(event){if(event.origin!==i.Sandbox.ORIGIN||!event.data.split)return;var n=event.data.split(','),o=unescape(n[1]);this._contentWindows[o]=event.source;this._messageHandler(o,n);}});e.exports=m;});
__d("HTMLEmailRenderer",["CSS","MessagingConst","MessagingXD","copyProperties","emptyFunction","tx","MercuryConstants"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('MessagingConst'),i=b('MessagingXD'),j=b('copyProperties'),k=b('emptyFunction'),l=b('tx'),m=b('MercuryConstants');function n(o,p){this._resizeContent=o.resizeContent||k;this._richMap={};this._useFBStyle=p;this._xdc=new i(this.onXDMessage.bind(this));this._maxWidth=0;}j(n.prototype,{onXDMessage:function(o,p){if(p[0]!=h.APP_ID.toString())return;if(this._richMap&&this._richMap[o])if(p[2]==h.XD_MESSAGE.SANDBOX_READY){return this.setIframeContent(o);}else if(p[2]==h.XD_MESSAGE.HTML_SIZE)return this._resizeContent(o,parseInt(p[3],10),parseInt(p[4],10),p[5]=='true',p[6]=='true');},setIframeContent:function(o,p){this._xdc.sendMessage(o,h.XD_MESSAGE.SET_CONTENT,escape(this._richMap[o]),this._useFBStyle?'useFBStyle':'',p?'forceDialogOnWide':'',escape("Show Hidden Text"),escape("Hide"),this._maxWidth);},makeRich:function(o,p,q,r){var s=this._xdc.createIframe(p,o,m.Sandbox.PAGE_URL);g.addClass(s,'xdIframe');this._richMap[o]=q;this._maxWidth=r||0;},updateRichMap:function(o,p){this._richMap[o]=p;},unload:function(){this._xdc.unload();}});e.exports=n;});
__d("WebMessengerForwardedMessages",["Event","CSS","DOM","MercuryMessages","WebMessengerThreadMessagesRenderer","WebMessengerEvents","WebMessengerSubscriptionsHandler","copyProperties","tx"],function(a,b,c,d,e,f){var g=b('Event'),h=b('CSS'),i=b('DOM'),j=b('MercuryMessages').get(),k=b('WebMessengerThreadMessagesRenderer'),l=b('WebMessengerEvents'),m=b('WebMessengerSubscriptionsHandler'),n=b('copyProperties'),o=b('tx');function p(q,r,s,t){this._parent=q;this._title=r;this._shelf=s;this._closeButton=t;this._forwardedMessages=[];m.addSubscriptions(g.listen(this._closeButton,'click',this.clear.bind(this)));}n(p.prototype,{setForwardedMessages:function(q){this._forwardedMessages=q;this._render();},clear:function(){this._forwardedMessages=[];this._render();},getForwardedMessages:function(){return this._forwardedMessages||[];},_render:function(){i.empty(this._shelf);var q=this._forwardedMessages.length;if(q){var r=(q===1)?"1 forwarded message":o._("{num} forwarded messages",{num:q});i.setContent(this._title,r);k.renderForwardedMessages(this._shelf,j.getMessagesFromIDs(this._forwardedMessages));}h.conditionShow(this._parent,q);l.detailDOMChanged();}});e.exports=p;});
__d("WebMessengerDeleteThreadDialog",["Dialog","tx","MercuryThreads"],function(a,b,c,d,e,f){var g=b('Dialog'),h=b('tx'),i=b('MercuryThreads').get(),j={show:function(k){var l=[];l.push({name:'delete_conversation',label:"Delete Conversation",handler:i.deleteThread.bind(i,k)});l.push(g.CANCEL);new g().setTitle("Delete This Entire Conversation?").setBody("Once you delete your copy of this conversation, it cannot be undone.").setButtons(l).show();}};e.exports=j;});
__d("WebMessengerEditFilteringSettingDialog",["AsyncDialog","AsyncRequest","MercuryConstants","DOM","csx"],function(a,b,c,d,e,f){var g=b('AsyncDialog'),h=b('AsyncRequest'),i=b('MercuryConstants'),j=b('DOM'),k=b('csx'),l='/ajax/mercury/edit_filtering_type.php',m='/ajax/mercury/change_filtering_type.php',n={show:function(){var o=function(q){var r=q.getRoot(),s=j.find(r,"._cq6").checked,t=j.find(r,"._cq7").checked,u='';if(s){u=i.MessagingFilteringType.MODERATE;}else if(t)u=i.MessagingFilteringType.STRICT;new h(m).setData({filtering_type:u}).send();q.hide();},p=function(q){q.subscribe('confirm',o.curry(q));q.show();};g.send(new h(l),p);}};e.exports=n;});
__d("WebMessengerComposerDataSource",["Class","MercuryConstants","ExpandableDataSource","MercuryIDs","WebMessengerStateManager","copyProperties"],function(a,b,c,d,e,f){var g=b('Class'),h=b('MercuryConstants'),i=b('ExpandableDataSource'),j=b('MercuryIDs'),k=b('WebMessengerStateManager'),l=b('copyProperties');function m(q){this.parent.construct(this,q,h.MercuryTypeaheadConstants.COMPOSER_THREADS_INITIAL_LIMIT,h.MercuryTypeaheadConstants.COMPOSER_SHOW_MORE_LIMIT);this._maxResults=h.MercuryTypeaheadConstants.COMPOSER_FRIENDS_MAX+h.MercuryTypeaheadConstants.COMPOSER_THREADS_INITIAL_LIMIT+h.MercuryTypeaheadConstants.COMPOSER_NON_FRIENDS_MAX;this._statesPerTokens={};this.subscribe('fetchComplete',function(r,s){var t=s.fetch_context,u=s.response.getPayload().entries;if(t.bootstrap)p(u);});}g.extend(m,i);l(m.prototype,{buildData:function(q){var r=[],s=[],t=[];q.forEach(function(v){var w=this.parent.getEntry(v);switch(w.render_type){case h.MercuryTypeaheadConstants.FRIEND_TYPE:if(r.length<h.MercuryTypeaheadConstants.COMPOSER_FRIENDS_MAX)r.push(v);break;case h.MercuryTypeaheadConstants.THREAD_TYPE:s.push(v);break;case h.MercuryTypeaheadConstants.NON_FRIEND_TYPE:if(t.length<h.MercuryTypeaheadConstants.COMPOSER_NON_FRIENDS_MAX)t.push(v);break;}}.bind(this));var u=r.concat(s,t);if(!this.hasLoadedAllResults()){this._maxResults=u.length+1;}else this._maxResults=u.length;return this.parent.buildData(u);},query:function(q,r,s){this.value=q;this.parent.query(q,r,s);},getQueryData:function(q,r){var s=this.parent.getQueryData(q,r);s.existing_token_ids=o();return s;},getStates:function(){var q=n();if(!this._statesPerTokens[q])this._statesPerTokens[q]={};return this._statesPerTokens[q];},fetchHandler:function(q,r){this.getState('loaded_all_threads_per_query')[r.value]=q.getPayload().end_of_threads;this.getState('loaded_initial_per_query')[r.value]=true;this.parent.fetchHandler(q,r);},hasLoadedInitialResults:function(q){if(q===undefined)q=this.value;return this.getState('loaded_initial_per_query')[q];},hasLoadedAllResults:function(q){if(q===undefined)q=this.value;return this.getState('loaded_all_threads_per_query')[q];}});function n(){var q=o().sort();return ','+q.join(',');}function o(){var q=k.getCurrentStateData();return (q.participants||[]).map(function(r){return j.tokenize(r).value;});}function p(q){q.forEach(function(r){r.render_type=h.MercuryTypeaheadConstants.FRIEND_TYPE;});}e.exports=m;});
__d("MessagingFilteringNux",["Arbiter","AsyncRequest","LayerDestroyOnHide","LayerHideOnTransition","MercuryConfig","WebMessengerPermalinks"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i=b('LayerDestroyOnHide'),j=b('LayerHideOnTransition'),k=b('MercuryConfig'),l=b('WebMessengerPermalinks'),m=null,n,o={ACCEPTED_EVENT:'filtering/accepted',DIALOG_REGISTERED_EVENT:'filtering/dialog-registered',tryShow:function(p){g.subscribe(o.DIALOG_REGISTERED_EVENT,function(){if(!m)return;m.setContext(p);m.show();m=null;},g.SUBSCRIBE_ALL);},registerDialog:function(p){m=p.disableBehavior(i).disableBehavior(j);n=g.subscribe('page_transition',function(q,r){if(!l.isWebMessengerURI(r.uri)){p&&p.destroy();n.unsubscribe();}},g.SUBSCRIBE_NEW);if(p)p.subscribe('confirm',function(){k.filtering_active=true;new h('/ajax/web_messenger/dismiss_filtering_nux.php').send();p.hide();g.inform(o.ACCEPTED_EVENT,{});});g.inform(o.DIALOG_REGISTERED_EVENT,{},g.BEHAVIOR_PERSISTENT);}};e.exports=o;});
__d("WebMessengerInfoBoxRenderer",["Event","cx","DOM","WebMessengerSubscriptionsHandler"],function(a,b,c,d,e,f){var g=b('Event'),h=b('cx'),i=b('DOM'),j=b('WebMessengerSubscriptionsHandler'),k={render:function(l,m){var n=i.create('div',{className:"_4rk"},l),o=i.create('div',{}),p=true;m.forEach(function(q){if(!p){var r=i.create('span',{className:"_4rl"},'\u00b7');i.appendContent(o,r);}p=false;var s=i.create('a',{},q.text);if(q.handler)j.addSubscriptions(g.listen(s,'click',q.handler));i.appendContent(o,s);});return i.create('div',{className:"_4rh"},[n,o]);}};e.exports=k;});
__d("MercuryDataSources",[],function(a,b,c,d,e,f){var g={},h={add:function(i,j){g[i]=j;},get:function(i){!g[i];return g[i];}};e.exports=h;});
__d("MercuryListUpdateRenderer",["DOM","ge"],function(a,b,c,d,e,f){var g=b('DOM'),h=b('ge'),i={updateList:function(j,k,l,m,n){var o=[];for(var p=0;p<k.length;p++){if(n){var q=n(p);q&&o.push(q);}var r=h(k[p]);if(r&&l(p)){o.push(r);}else o.push(m(p));}g.setContent(j,o);}};e.exports=i;});
__d("MercuryDataSourceHelper",["MercuryConstants","MercuryServerRequests","MercuryThreadMetadataRawRenderer","MercuryThreadMetadataRenderer","WebMessengerConstants"],function(a,b,c,d,e,f){var g=b('MercuryConstants'),h=b('MercuryServerRequests').get(),i=b('MercuryThreadMetadataRawRenderer'),j=b('MercuryThreadMetadataRenderer'),k=b('WebMessengerConstants'),l={updateMercuryOnFetchComplete:function(m){m.subscribe('fetchComplete',function(n,o){var p={participants:[],threads:[],payload_source:g.MercuryPayloadSource.SERVER_SEARCH};o.response.getPayload().entries.forEach(function(q){if(q.type==k.THREAD_TYPE){p.threads=p.threads.concat(q.mercury_thread);p.participants=p.participants.concat(q.participants_to_render);}});if(p.threads.length){h.handleUpdate(p);o.response.getPayload().entries.forEach(function(q){if(q.mercury_thread)q.text=j.renderThreadNameAndParticipantList(q.mercury_thread.thread_id,q.participants_to_render,q.mercury_thread.participants.length,{last_separator_uses_and:false,names_renderer:i.renderShortNames});});}});}};e.exports=l;});
__d("Autosize",["CSS","cx","DOM","Style"],function(a,b,c,d,e,f){var g=b("CSS"),h=b('cx'),i=b("DOM"),j=b("Style"),k=['fontFamily','fontStyle','fontVariant','fontWeight','letterSpacing','textDecoration','textIndent','textTransform','whiteSpace','wordSpacing','wordWrap'],l=/^[0-9]+$/;function m(r){var s=r.cloneNode(true);g.addClass(s,"_4g");var t=r.clientWidth-j.getFloat(r,'paddingLeft')-j.getFloat(r,'paddingRight');j.set(s,'width',t+'px');var u=r.clientHeight-j.getFloat(r,'paddingTop')-j.getFloat(r,'paddingBottom');j.set(s,'height',u+'px');i.insertAfter(r,s);return s;}function n(r,s,t,u,v){var w=r.style.fontSize,x=r.style.height;j.set(r,"height","auto");if(s!==null){var y=r.style.width;j.set(r,"width","auto");}var z=0,aa=v.length-1;while(z<aa){var ba=Math.ceil((z+aa)/2);j.set(r,"font-size",v[ba]+u);if((t!==null&&r.scrollHeight>t)||(s!==null&&r.scrollWidth>s)){aa=ba-1;}else z=ba;}r.style.fontSize=w;r.style.height=x;if(s!==null)r.style.width=y;return v[z]+u;}function o(r,s,t,u,v,w){var x=r.style.fontSize,y=r.style.height;j.set(r,"height","auto");if(s!==null){var z=r.style.width;j.set(r,"width","auto");}j.set(r,"font-size",w+u);if((t===null||r.scrollHeight<=t)&&(s===null||r.scrollWidth<=s)){r.style.fontSize=x;r.style.height=y;if(s!==null)r.style.width=z;return w+u;}j.set(r,"font-size",v+u);if((t!==null&&r.scrollHeight>t)||(s!==null&&r.scrollWidth>s)){r.style.fontSize=x;r.style.height=y;if(s!==null)r.style.width=z;return v+u;}while(v+1<w){var aa=Math.ceil((v+w)/2);j.set(r,"font-size",aa+u);if((t!==null&&r.scrollHeight>t)||(s!==null&&r.scrollWidth>s)){w=aa;}else v=aa;}r.style.fontSize=x;r.style.height=y;if(s!==null)r.style.width=z;return v+u;}function p(r,s){this._wrap=r;this._attr=s;if(this._attr.sizes){var t=this._attr.sizes;for(var u=1,v=t.length;u<v;u++){if(t[u-1]<=t[u])continue;t.sort(function(x,y){return x-y;});break;}}else if(s.min>s.max){var w=s.min;s.min=s.max;s.max=w;}this.fit();}p.prototype.fit=function(r,s){var t=this._wrap;if(!t.clientWidth){q.push(this);return;}var u=m(t);if(typeof r==="undefined")r=this._attr.width;if(l.test(r)){u.style.width=r+"px";}else if(r!==null&&r!=="auto")u.style.width=r;if(typeof s==="undefined")s=this._attr.height;if(l.test(s)){u.style.height=s+"px";}else if(s!==null&&s!=="auto")u.style.height=s;var v=null;if(!this._attr.wrap)v=u.clientWidth;var w=null;if(this._attr.wrap||s!==null)w=u.clientHeight;var x;if(this._attr.sizes){x=n(u,v,w,"px",this._attr.sizes);}else x=o(u,v,w,"px",this._attr.min,this._attr.max);i.remove(u);j.set(t,"font-size",x);g.removeClass(t,"invisible_elem");};var q=[];p.onNodeInserted=function(){var r=q;q=[];r.forEach(function(s){s.fit();});};e.exports=p;});
__d("FileInputUploader",["ArbiterMixin","DOM","Env","FileForm","Form","copyProperties","submitForm"],function(a,b,c,d,e,f){var g=b('ArbiterMixin'),h=b('DOM'),i=b('Env'),j=b('FileForm'),k=b('Form'),l=b('copyProperties'),m=b('submitForm');function n(o){this._inputElem=o;this._data={};}l(n.prototype,g,{_formElem:null,_fileForm:null,_uri:null,_allowCrossOrigin:false,_uploadInParallel:false,setURI:function(o){this._uri=o;return this;},setData:function(o){this._data=o;return this;},setAllowCrossOrigin:function(o){this._allowCrossOrigin=!!o;return this;},setUploadInParallel:function(o){this._uploadInParallel=!!o;return this;},send:function(){this._createForm();var o=this._inputElem.cloneNode(false);h.replace(this._inputElem,o);h.appendContent(this._formElem,this._inputElem);h.appendContent(document.body,this._formElem);m(this._formElem);h.replace(o,this._inputElem);this._cleanup();},_onFileFormEvent:function(o,p){this.inform(o,p);},_createForm:function(){this._formElem=h.create('form',{action:this._uri,method:'post'});this._fileForm=new j(this._formElem,null,{allowCrossOrigin:this._allowCrossOrigin,uploadInParallel:this._uploadInParallel});this._fileForm.subscribe(j.EVENTS,this._onFileFormEvent.bind(this));k.createHiddenInputs(l({fb_dtsg:i.fb_dtsg},this._data),this._formElem);},_cleanup:function(){this._fileForm.destroy();this._fileForm=null;h.remove(this._formElem);this._formElem=null;}});e.exports=n;});
__d("PhotosUploadID",[],function(a,b,c,d,e,f){var g=1024,h={getNewID:function(){return g++;}};e.exports=h;});
__d("escapeRegex",[],function(a,b,c,d,e,f){function g(h){return h.replace(/([.?*+\^$\[\]\\(){}|\-])/g,"\\$1");}e.exports=g;});
__d("Photocrop2",["array-extensions","Event","ArbiterMixin","CSS","DOM","PhotosConst","Vector","Rect","copyProperties"],function(a,b,c,d,e,f){b('array-extensions');var g=b('Event'),h=b('ArbiterMixin'),i=b('CSS'),j=b('DOM'),k=b('PhotosConst'),l=b('Vector'),m=b('Rect'),n=b('copyProperties');function o(q,r,s){this.photo=q;if(s){this.imageDimensions=new l(s.x,s.y);}else this.imageDimensions=new l(q.offsetWidth,q.offsetHeight);n(this,n({target:this.photo.parentNode,create_target:false,target_parent:this.photo.parentNode,width:200,height:200,min_width:k.PIC_NORMAL_FBX_SIZE,min_height:k.PIC_NORMAL_FBX_SIZE,center_x:(this.photo.offsetWidth||200)/2,center_y:(this.photo.offsetHeight||200)/2,square:true},r));this.unscaledMinWidth=this.min_width;this.unscaledMinHeight=this.min_height;if(this.square){this.unscaledMinWidth=Math.min(this.min_width,this.min_height);this.unscaledMinHeight=this.unscaledMinWidth;}this.setNewRatio();this.width=Math.max(this.width,this.min_width);this.height=Math.max(this.height,this.min_height);var t=Math.min(this.width,this.height);if(t>this.photo.offsetWidth||t>this.photo.offsetHeight)t=Math.min(this.photo.offsetWidth,this.photo.offsetHeight);if(this.min_width>this.photo.offsetWidth)this.min_width=this.photo.offsetWidth;if(this.min_height>this.photo.offsetHeight)this.min_height=this.photo.offsetHeight;if(this.square){this.min_width=Math.min(this.min_width,this.min_height);this.min_height=this.min_width;}var u=this.center_x-t/2,v=this.center_y-t/2;this.box=new m(v,u+t,v+t,u);this.displacement=null;if(this.create_target){this.target=j.create('div');i.addClass(this.target,'stageCropper');this.target_parent.appendChild(this.target);}i.addClass(this.target,'photocrop');['bg','wrapper','viewport'].forEach(function(w){this[w]=j.create('div');i.addClass(this[w],w);}.bind(this));this.highlight=j.create('img',{src:q.src});i.addClass(this.highlight,'highlight');i.addClass(this.wrapper,'photocropWrapper');this.target.appendChild(this.bg);this.target.appendChild(this.wrapper);this.wrapper.appendChild(this.highlight);this.wrapper.appendChild(this.viewport);['ne','nw','sw','se'].forEach(function(w){var x=j.create('div');i.addClass(x,w);this.viewport.appendChild(x);i.addClass(x,'profilePicViewportGrabby');}.bind(this));g.listen(this.viewport,{mousedown:this.mousedown.bind(this),dragstart:g.kill,selectstart:g.kill,click:g.stop});g.listen(document,{mousemove:this.mousemove.bind(this),mouseup:this.mouseup.bind(this)});g.listen(window,{resize:this.adjustForResize.bind(this)});this.realignToPictureSize();this.redraw();}n(o.prototype,h);o.prototype.adjustForResize=function(){var q=this.ratio,r=this.setNewRatio(),s=r/q;this.box.t*=s;this.box.l*=s;this.box.b*=s;this.box.r*=s;this.redraw();this.realignToPictureSize();};o.prototype.setNewRatio=function(){this.ratio=this.photo.offsetWidth/this.imageDimensions.x;this.min_width=this.ratio*this.unscaledMinWidth;this.min_height=this.ratio*this.unscaledMinHeight;return this.ratio;};o.prototype.realignToPictureSize=function(){var q=this.photo;if(!q)return;[this.bg,this.wrapper].forEach(function(r){r.style.width=q.offsetWidth+'px';r.style.height=q.offsetHeight+'px';r.style.top=q.offsetTop+'px';r.style.left=q.offsetLeft+'px';});};var p=function(q,r,s){return Math.max(q,Math.min(s,r));};o.prototype.redraw=function(){var q=[this.box.t,this.box.r,this.box.b,this.box.l];this.highlight.style.width=this.photo.offsetWidth+"px";this.highlight.style.height=this.photo.offsetHeight+"px";this.highlight.style.clip="rect("+q.join("px ")+"px)";this.viewport.style.top=this.box.t+"px";this.viewport.style.left=this.box.l+"px";this.viewport.style.height=(this.box.b-this.box.t)+"px";this.viewport.style.width=(this.box.r-this.box.l)+"px";};o.prototype.done=function(q){this.freezeViewport=true;if(!q){[this.bg,this.wrapper].forEach(j.remove);if(this.create_target){j.remove(this.target);this.target=null;}else i.removeClass(this.target,'photocrop');}var r=Math.round(this.box.l*(1/this.ratio)),s=Math.round(this.box.t*(1/this.ratio)),t=Math.round(this.box.r*(1/this.ratio)),u=Math.round(this.box.b*(1/this.ratio));this.inform('done',q);return {x:Math.max(r,0),y:Math.max(s,0),width:t-Math.max(r,0),height:u-Math.max(s,0)};};o.prototype.mousedown=function(q){if(this.freezeViewport)return;this.mouseTarget=q.getTarget();this.pos=l.getEventPosition(q);var r=this.box.r-this.box.l;this.displacement=new l(r,r);i.addClass(document.body,'draggingMode');return false;};o.prototype.mousemove=function(q){if(!this.mouseTarget)return;var r=l.getEventPosition(q).sub(this.pos),s=this.min_width,t=this.min_height,u=this.box,v=this.wrapper.offsetWidth,w=this.wrapper.offsetHeight,x;if(this.mouseTarget===this.viewport){r.x=p(-u.l,r.x,v-u.r);r.y=p(-u.t,r.y,w-u.b);this.box=u.add(r);}else if(i.hasClass(this.mouseTarget,'ne')){if(this.square){this.displacement=this.displacement.add(r.x,-r.y);x=p(s,Math.max(this.displacement.x,this.displacement.y),Math.min(u.b,v-u.l));this.box.r=u.l+x;this.box.t=u.b-x;}else{this.box.r+=r.x=p(u.l+s-u.r,r.x,v-u.r);this.box.t+=r.y=p(-u.t,r.y,u.b-t-u.t);}}else if(i.hasClass(this.mouseTarget,'nw')){if(this.square){this.displacement=this.displacement.add(-r.x,-r.y);x=p(s,Math.max(this.displacement.x,this.displacement.y),Math.min(u.b,u.r));this.box.l=u.r-x;this.box.t=u.b-x;}else{this.box.b+=r.x=p(-u.l,r.x,u.r-s-u.l);this.box.t+=r.y=p(-u.t,r.y,u.b-t-u.t);}}else if(i.hasClass(this.mouseTarget,'se')){if(this.square){this.displacement=this.displacement.add(r.x,r.y);x=p(s,Math.max(this.displacement.x,this.displacement.y),Math.min(w-u.t,v-u.l));this.box.r=u.l+x;this.box.b=u.t+x;}else{this.box.r+=r.x=p(u.l+s-u.r,r.x,v-u.r);this.box.b+=r.y=p(u.t+t-u.b,r.y,w-u.b);}}else if(i.hasClass(this.mouseTarget,'sw'))if(this.square){this.displacement=this.displacement.add(-r.x,r.y);x=p(s,Math.max(this.displacement.x,this.displacement.y),Math.min(w-u.t,u.r));this.box.l=u.r-x;this.box.b=u.t+x;}else{this.box.l+=r.x=p(-u.l,r.x,u.r-s-u.l);this.box.b+=r.y=p(u.t+t-u.b,r.y,w-u.b);}this.redraw();this.pos=this.pos.add(r);return false;};o.prototype.mouseup=function(q){this.mouseTarget=null;i.removeClass(document.body,'draggingMode');};e.exports=o;});
__d("PhotosUploadWaterfall",["AsyncSignal"],function(a,b,c,d,e,f){var g=b('AsyncSignal'),h={APP_FLASH:'flash_pro',APP_SIMPLE:'simple',APP_ARCHIVE:'archive',APP_COMPOSER:'composer',APP_MESSENGER:'messenger',APP_HTML5:'html5',INSTALL_CANCEL:1,INSTALL_INSTALL:2,INSTALL_UPDATE:3,INSTALL_REINSTALL:4,INSTALL_PERMA_CANCEL:5,INSTALL_SILENT_SKIP:6,INSTALL_DOWNLOAD:7,BEGIN:1,UPLOAD_START:4,ALL_UPLOADS_DONE:6,CLIENT_ERROR:7,IMAGES_SELECTED:9,UPGRADE_REQUIRED:11,VERSION:15,SELECT_START:18,SELECT_CANCELED:19,CANCEL:22,ONE_UPLOAD_DONE:29,PROGRESS_BAR_STOPPED:44,MISSED_BEAT:45,HEART_ATTACK:46,RESIZER_AVAILABLE:20,OVERLAY_FIRST:61,ASYNC_AVAILABLE:63,FALLBACK_TO_FLASH:13,RETRY_UPLOAD:17,TAGGED_ALL_FACES:14,VAULT_IMAGES_SELECTED:62,VAULT_CREATE_POST_CANCEL:65,VAULT_SEND_IN_MESSAGE_CLICKED:66,VAULT_DELETE_CANCEL:68,VAULT_ADD_TO_ALBUM_CANCEL:74,VAULT_SHARE_IN_AN_ALBUM_CLICKED:76,VAULT_SHARE_OWN_TIMELINE_CLICKED:77,VAULT_SHARE_FRIENDS_TIMELINE_CLICKED:78,VAULT_SHARE_IN_A_GROUP_CLICKED:79,METHOD_DRAGDROP:'dragdrop',METHOD_FILE_SELECTOR:'file_selector',VAULTBOX:'vaultbox',GRID:'grid',sendSignal:function(i,j){new g('/ajax/photos/waterfall.php',{data:JSON.stringify(i)}).setHandler(j).send();}};e.exports=h;});
__d("ProfilePicRequestCreator",["copyProperties","Form"],function(a,b,c,d,e,f){var g=b('copyProperties'),h=b('Form');function i(j,k,l,m){this._fbid=j;this._owner=k;this._profileID=l;this._area=m;}g(i.prototype,{setSuccessURI:function(j){this._successURI=j;return this;},setErrorURI:function(j){this._errorURI=j;return this;},setIsUnscaled:function(j){this._isUnscaled=j;return this;},send:function(){var j=g({fbid:this._fbid,owner:this._owner,id:this._profileID,'return':this._successURI,error_return:this._errorURI,is_unscaled:this._isUnscaled},this._area);h.post('/crop_profile_pic.php',j);}});e.exports=i;});
__d("ProgressBar",["CSS","DOM","Style","copyProperties","emptyFunction"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i=b('Style'),j=b('copyProperties'),k=b('emptyFunction');function l(o,p,q){this._root=o;this._min=p||0;this._max=q||100;this._meter=h.find(o,'div.fill');this._initialPosition=0;this._position=0;this._initialVelocity=0;this._velocity=0;this._acceleration=0;this.useAcceleration=true;this._loopInterval=30;this._targetPosition=0;this._targetTime=0;this._startTime=null;this._timeout=null;this._onComplete=k;}j(l.prototype,{getRoot:function(){return this._root;},setPosition:function(o){o=this._normalizePosition(o);this._initialPosition=o;this._position=o;this._updateMeter();this.stop();return this;},changeLabel:function(o){var p=h.scry(this._root,'span.label');p.forEach(function(q){h.setContent(q,o);});return this;},setCompleteHandler:function(o){this._onComplete=o||k;return this;},setTarget:function(o,p){clearTimeout(this._timeout);this._targetPosition=o;var q=this._normalizePosition(o);this._targetTime=p;this._initialVelocity=this._velocity;this._initialPosition=this._position;if(this.useAcceleration){this._acceleration=2*(q-this._initialPosition-this._initialVelocity*p)/(p*p);}else{this._acceleration=0;this._velocity=this._initialVelocity=(q-this._initialPosition)/p;}if(this._position>=q){this._onComplete();}else this._start();return this;},setNoAcceleration:function(o){this.useAcceleration=!o;return this;},stop:function(){this._velocity=0;this._initialVelocity=0;this._acceleration=0;clearTimeout(this._timeout);return this;},_start:function(){this._startTime=Date.now();this._timeout=setTimeout(this._loop.bind(this),this._loopInterval);return this;},_loop:function(){var o=Date.now()-this._startTime;this._position=(.5*this._acceleration*o*o)+(this._initialVelocity*o)+this._initialPosition;var p=this._velocity;this._velocity=this._acceleration*o+this._initialVelocity;var q=p<0!==this._velocity<0;this._updateMeter();if(this._position>this._normalizePosition(this._targetPosition)||q){this._velocity=this._initialVelocity=0;this._acceleration=0;this.setPosition(this._targetPosition);this._onComplete();}else this._timeout=setTimeout(this._loop.bind(this),this._loopInterval);},_updateMeter:function(){var o=Math.min(Math.max(this._position,0),1);g.conditionClass(this._meter,'empty',o<=0);g.conditionClass(this._meter,'full',o>=1);i.set(this._meter,'width',o*100+'%');},_normalizePosition:function(o){return Math.min(Math.max((o-this._min)/(this._max-this._min),0),1);}});function m(o,p){o.setPosition(p);}function n(o,p,q){o.setTarget(p,q);}e.exports=l;e.exports.setTarget=n;e.exports.setPosition=m;});
__d("FreeformTokenizerBehavior",["Input","Keys","Event","function-extensions"],function(a,b,c,d,e,f){var g=b('Input'),h=b('Keys'),i=b('Event');b('function-extensions');function j(k,l){var m=l.tokenize_on_blur!==false,n=l.tokenize_on_paste!==false,o=l.matcher&&new RegExp(l.matcher,'i'),p=l.paste_split&&new RegExp(l.paste_split);function q(event){var r=g.getValue(k.getInput()).trim();if(p&&event&&event.type=='paste'){r=r.split(p);}else r=[r];var s=false;for(var t=0;t<r.length;t++){var u=r[t].trim();if(u&&(!o||o.test(u))){var v={uid:u,text:u,freeform:true};k.addToken(k.createToken(v));s=true;}}if(event&&s){k.getTypeahead().getCore().afterSelect();event.kill();}}k.subscribe('keydown',function(r,s){var event=s.event,t=i.getKeyCode(event);if(t==h.COMMA||t==h.RETURN){var u=k.getTypeahead().getView();if(u.getSelection()){u.select();event.kill();}else q(event);}});k.subscribe('paste',function(r,s){if(n)q.bind(null,s.event).defer(20);});k.subscribe('blur',function(r,s){if(m)q();k.getTypeahead().getCore().reset();});}e.exports=j;});
__d("VaultBoxURI",[],function(a,b,c,d,e,f){var g={PHOTOS_SYNCED:'photos_synced',isVaultBoxURI:function(h){var i=new RegExp("\/"+g.PHOTOS_SYNCED+"\/?$");return h.getPath().match(i)&&h.getQueryData().hasOwnProperty('view_image');},isVaultArchiveURI:function(h){var i=new RegExp("\/"+g.PHOTOS_SYNCED+"\/?$");return h.getPath().match(i);}};e.exports=g;});
/*1361258153,178142515*/

if (self.CavalryLogger) { CavalryLogger.start_js(["wVxiS"]); }

__d("OGHovercardLayerHideOnBlur",["Event","DOM","copyProperties"],function(a,b,c,d,e,f){var g=b('Event'),h=b('DOM'),i=b('copyProperties');function j(k){this._layer=k;}i(j.prototype,{_subscriptions:null,_clickListener:null,enable:function(){this._subscriptions=[this._layer.subscribe('show',this._attach.bind(this)),this._layer.subscribe('hide',this._detach.bind(this))];if(this._layer.isShown())this._attach();},disable:function(){this._detach();while(this._subscriptions.length)this._subscriptions.pop().unsubscribe();this._subscriptions=null;},_detach:function(){this._clickListener&&this._clickListener.remove();this._clickListener=null;},_attach:function(){!function(){this._clickListener=g.listen(document.documentElement,'click',this._maybeHide.bind(this));}.bind(this).defer();},_maybeHide:function(event){var k=event.getTarget();if(h.contains(this._layer.getContent(),k))return;if(this._shouldHide(event))this._layer.hide();},_shouldHide:function(event){return true;}});e.exports=j;});
__d("OGAggregationHovercardTarget",["Event","ArbiterMixin","AsyncRequest","Class","ContextualDialog","ContextualDialogArrow","CSS","DOM","LayerHideOnBlur","LayerHideOnEscape","OGHovercardLayerHideOnBlur","copyProperties","cx","tx"],function(a,b,c,d,e,f){var g=b('Event'),h=b('ArbiterMixin'),i=b('AsyncRequest'),j=b('Class'),k=b('ContextualDialog'),l=b('ContextualDialogArrow'),m=b('CSS'),n=b('DOM'),o=b('LayerHideOnBlur'),p=b('LayerHideOnEscape'),q=b('OGHovercardLayerHideOnBlur'),r=b('copyProperties'),s=b('cx'),t=b('tx'),u=350,v={},w=function(){var y=new k({addedBehaviors:[o,p],arrowBehavior:l},n.create('div',{className:"_4q1"},"Loading...")).setWidth(u);w=bagof(y);return y;};r(x,{setHovercard:function(y,z){var aa=v[y];aa&&aa.setHovercard(z);}});function x(y,z,aa,ba,ca,da){v[z]=this;this._targetID=z;this._endpoint=aa;this._preventClose=ca||[];this.init(y);for(var ea=0,fa=ba.length;ea<fa;ea++){var ga=ba[ea];this.addTrigger(ga.element,ga.trigger_class,ga.context);}if(da)this.showHovercard(null,null);}r(x.prototype,h,{init:function(y){this._hovercardShown=false;this._hovercardScheduled=false;this._target=y;this._triggers=[];this._hovercard=null;this._fetching=false;this._placeholder=null;this._placeholderListener=null;this._shownClass='hover_shown';this._triggerClass=null;this._currentTrigger=null;this._context=null;return this;},addTrigger:function(y,z,aa){this._triggers.push(y);g.listen(y,'click',this._onTrigger.bind(this,y,z,aa));},_onTrigger:function(y,z,aa){aa=aa||this._target;if((this._hovercardShown&&(this._hovercard.getContext()===aa))||(this._hovercardScheduled&&(this._placeholder.getContext()===aa))||((this._hovercardShown||this._hovercardScheduled)&&(this._currentTrigger===y))){this._currentTrigger=null;this.hideHovercard();return;}this.hideHovercard();this._currentTrigger=y;this.showHovercard(z,aa);},_fetch:function(){if(this._hovercard!=null||this._fetching)return;this._fetching=true;var y=function(){this._fetching=false;},z=function(){this.hideHovercard();};new i(this._endpoint).setData({hover_target:this._targetID}).setMethod('GET').setReadOnly(true).setErrorHandler(z.bind(this)).setTransportErrorHandler(z.bind(this)).setFinallyHandler(y.bind(this)).send();},setHovercard:function(y){this._hovercard=y;var z=function(aa){this.parent.construct(this,aa);};j.extend(z,q);r(z.prototype,{_shouldHide:function(event){var aa=event.getTarget();for(var ba=0,ca=this._preventClose.length;ba<ca;ba++)if(n.contains(this._preventClose[ba],aa))return false;return true;}.bind(this)});this._hovercard.setPosition('below').setAlignment('center').enableBehaviors([z,p]);this._hovercard.subscribe('aftershow',this._onHovercardShow.bind(this));this._hovercard.subscribe('hide',this._onHovercardHide.bind(this));this._hovercard.subscribe('destroy',this._onHovercardDestroy.bind(this));if(this._hovercardScheduled)this.showHovercard(this._triggerClass,this._context);},showHovercard:function(y,z){m.addClass(this._target,this._shownClass);if(this._triggerClass&&this._triggerClass!==y)m.removeClass(this._target,this._triggerClass);this._triggerClass=y;m.addClass(this._target,this._triggerClass);if(this._hovercard){this._hovercard.setContext(z||this._target).show();this._hovercardShown=true;this._hovercardScheduled=false;this._hidePlaceholder();}else{this._context=z;this._hovercardScheduled=true;this._fetch();this._showPlaceholder();}this.inform('showhovercard');},hideHovercard:function(){this._hovercardScheduled=false;this._hidePlaceholder();if(this._hovercard){this._hovercard.hide();}else this._onHovercardHide();},_showPlaceholder:function(){if(!this._placeholder){this._placeholder=w();this._placeholder.setContext(this._context||this._target).setPosition('below').setAlignment('center').show();this._placeholderListener=this._placeholder.subscribe('hide',this._onPlaceholderHide.bind(this));}},_hidePlaceholder:function(){this._placeholder&&this._placeholder.hide();},_onPlaceholderHide:function(){if(this._placeholder){this._hovercardScheduled=false;this._placeholderListener&&this._placeholder.unsubscribe(this._placeholderListener);this._placeholder=null;!this._hovercardShown&&this._removeTriggerClasses();}},_onHovercardShow:function(){var y=this._hovercard.getContent(),z=n.scry(y,'textarea.mentionsTextarea')[0];z&&z.focus();},_onHovercardHide:function(){this._hovercardShown=false;this._removeTriggerClasses();this.inform('hidehovercard');},_onHovercardDestroy:function(){this._hovercard=null;},_removeTriggerClasses:function(){m.removeClass(this._target,this._shownClass);m.removeClass(this._target,this._triggerClass);}});e.exports=x;});
__d("PhotoCurationControl",["Event","Parent","Toggler"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Parent'),i=b('Toggler'),j={init:function(k){var l=h.byClass(k,'fbPhotoStarGridElement');g.listen(l,'mouseleave',function(){i.hide();});}};e.exports=j;});
__d("PhotoInlineActions",["Event","Arbiter","AsyncRequest","CSS","Nectar","Parent","copyProperties","cx"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('AsyncRequest'),j=b('CSS'),k=b('Nectar'),l=b('Parent'),m=b('copyProperties'),n=b('cx'),o={init:function(p,q,r,s){h.subscribe(['UFI/CommentAddedActive','UFI/CommentDeletedActive','UFI/LikeActive'],function(t,u){if(parseInt(p.getAttribute('data-fbid'),10)!==u)return;if(t==='UFI/LikeActive')j.toggleClass(p,"_53a");new i().setURI('/ajax/photos/photo/refresh.php').setData({fbid:p.getAttribute('data-fbid')}).setRelativeTo(p).send();});g.listen(p,'click',function(event){var t=event.getTarget();if(!l.byClass(t,"_53b"))return;event.prevent();j.toggleClass(p,"_53a");var u={};k.addModuleData(u,p);new i().setURI('/ajax/photos/photo/like.php').setData(m({fbid:p.getAttribute('data-fbid'),relatedid:q,hovercardendpoint:r,includecommentlink:s},u)).setRelativeTo(p).setErrorHandler(function(){j.toggleClass(p,"_53a");}).send();});}};e.exports=o;});
__d("StarGridLayout",["copyProperties","Vector"],function(a,b,c,d,e,f){var g=b('copyProperties'),h=b('Vector');function i(j){g(this,j);}g(i.prototype,{getShortestColumn:function(j){return j[0]<=j[1]?0:1;},getDangling:function(j){var k=j.filter(function(l){return !this.isStarred(l);}.bind(this));if(k.length%2===1)return k[k.length-1];return null;},mangleOrder:function(j){if(j.length<3||!(this.isFixed(j[0])&&this.isStarred(j[1])))return j;var k=this.nextNonStarred(j,2);if(!k)return j;var l=j.concat();l.remove(k);l.splice(1,0,k);return l;},layout:function(j){var k=[0,0],l=0,m=this.getDangling(j),n=[];j=this.mangleOrder(j);for(var o=0;o<j.length;++o){var p=this.getShortestColumn(k),q=j[o];if(this.isStarred(q)){this.renderStarred(this._grid,k,p,q);k[p]+=2;l=Math.max(l,(p*2)+2);}else{n.push(q);if(n.length===2||q===m){this.renderNonStarred(this._grid,k,p,n);l=Math.max(l,(p*2)+n.length);n=[];k[p]+=1;}}}return new h(l,Math.max.apply(null,k));},inNonStarredBlock:function(j,k,l,m){return k===l[m]&&Math.floor(j/2)===m;},inStarredBlock:function(j,k,l,m){return (k===l[m]||k===l[m]+1)&&Math.floor(j/2)===m;},nextNonStarred:function(j,k){for(;k<j.length;++k)if(!this.isStarred(j[k]))return j[k];return null;},layoutReorder:function(j,k,l,m){j=j.concat();l=Math.max(0,Math.min(3,l));m=Math.max(0,m);j.remove(k);j.push(k);var n=[0,0],o=this.getDangling(j),p=false,q=[];for(var r=0;r<j.length;++r){var s=this.getShortestColumn(n),t=j[r];if(this.isStarred(t)){if(t===k)p=true;if(!p&&this.isStarred(k)&&this.inStarredBlock(l,m,n,s)&&this.inNonStarredBlock(l,m,n,s)){j.remove(k);this.renderStarred(this._grid,n,s,k);n[s]+=2;s=this.getShortestColumn(n);p=true;}if(!p&&!this.isStarred(k)&&this.inStarredBlock(l,m,n,s)&&this.inNonStarredBlock(l,m,n,s)){j.remove(k);if(q.length===1){q.splice(l%2,0,k);}else{var u=this.nextNonStarred(j,r);if(u){j.remove(u);q.push(u);q.splice(l%2,0,k);}else q.push(k);}this.renderNonStarred(this._grid,n,s,q);q=[];n[s]+=1;o=this.getDangling(j.slice(r+1));s=this.getShortestColumn(n);p=true;}if(!p&&this.inStarredBlock(l,m,n,s)&&!this.inNonStarredBlock(l,m,n,s)){j.remove(k);var u=this.nextNonStarred(j,r);j.push(k);if(u){j.remove(u);j.splice(r,0,u);r--;continue;}m-=1;r--;continue;}this.renderStarred(this._grid,n,s,t);n[s]+=2;}else{q.push(t);if(q.length===2||t===o){if(!p&&!this.isStarred(k)&&this.inNonStarredBlock(l,m,n,s)){q.remove(k);j.remove(k);q.splice(l%2,0,k);if(q.length===3){j.remove(q[2]);j.splice(r,0,q[2]);r=j.indexOf(q[2])-1;q.pop();}o=this.getDangling(j.slice(r+1));p=true;}if(!p&&this.isStarred(k)&&this.inNonStarredBlock(l,m,n,s)){j.remove(k);this.renderStarred(this._grid,n,s,k);n[s]+=2;s=this.getShortestColumn(n);p=true;}this.renderNonStarred(this._grid,n,s,q);q=[];n[s]+=1;}}}},getStoringLayout:function(j){return new i({grid:this._grid,isStarred:this.isStarred,isFixed:this.isFixed,renderStarred:function(k,l,m,n){j.push(n);},renderNonStarred:function(k,l,m,n){j.push(n[0]);if(n.length>1)j.push(n[1]);}});},reorder:function(j,k,l,m){var n=[];this.getStoringLayout(n).layoutReorder(j,k,l,m);return n;},canonicalize:function(j){var k=[];this.getStoringLayout(k).layout(j);return k;}});e.exports=i;});
__d("StarGrid",["Event","Arbiter","AsyncRequest","CSS","DataStore","DOM","ImageUtils","Locale","Parent","Style","StarGridLayout","copyProperties"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('AsyncRequest'),j=b('CSS'),k=b('DataStore'),l=b('DOM'),m=b('ImageUtils'),n=b('Locale'),o=b('Parent'),p=b('Style'),q=b('StarGridLayout'),r=b('copyProperties'),s={MARGIN:5,isStarred:function(t){return j.hasClass(t,'fbPhotoStarGridStarred');},isFixed:function(t){return j.hasClass(t,'fbPhotoStarGridFixed');},setPosition:function(t,u,v){var w=n.isRTL()?'margin-right':'margin-left';p.set(t,'position','absolute');p.set(t,'margin-top',u+'px');p.set(t,w,v+'px');},renderNonStarred:function(t,u,v,w){for(var x=0;x<w.length;++x){var y=u[v]*s.getSize(t),z=(v*2+x)*s.getSize(t);s.setPosition(w[x],y,z);}},renderStarred:function(t,u,v,w){var x=u[v]*s.getSize(t),y=v*2*s.getSize(t);s.setPosition(w,x,y);},mergeWithPreviousGrid:function(t){var u=t.previousSibling;if(u&&j.hasClass(u,'fbStarGrid')){j.addClass(u,'fbStarGridAppendedTo');while(t.firstChild)u.appendChild(t.firstChild);l.remove(t);t=u;}return t;},removePhoto:function(t){var u=l.scry(document.body,'.fbPhotoStarGridElement[data-fbid="'+t+'"]')[0],v=o.byClass(u,'fbStarGrid'),w=s.getElements(v);w.remove(u);l.remove(u);s.layoutGrid(v,w);h.inform('StarGrid/UPDATE',v);},layoutGrid:function(t,u){var v=new q({_grid:t,isStarred:s.isStarred,isFixed:s.isFixed,renderNonStarred:s.renderNonStarred,renderStarred:s.renderStarred});s.setElements(t,u);var w=v.layout(u);p.set(t,'width',(w.x*s.getSize(t))+'px');p.set(t,'height',(w.y*s.getSize(t))+'px');},mergeAndLayoutGrid:function(t,u){var v=l.scry(t,'.fbPhotoStarGridElement'),w=s.mergeWithPreviousGrid(t),x=v;if(t!==w)x=s.getElements(w).concat(v);s.setElements(t,x);k.set(t,'size',u);s.layoutGrid(w,x);h.inform('StarGrid/UPDATE',t);},getSize:function(t){return k.get(t,'size');},updateBackground:function(t,u){var v;function w(){p.set(t,'backgroundImage','url('+u+')');window.clearTimeout(v);}var x=new Image();x.onload=w;x.src=u;function y(){if(m.hasLoaded(x)){w();}else y.defer(100);}v=y.defer();},setStarred:function(t,u,v,w){var x=o.byClass(u,'fbPhotoStarGridElement');j.conditionClass(x,'fbPhotoStarGridStarred',w);j.conditionClass(x,'fbPhotoStarGridNonStarred',!w);var y=l.scry(x,'.uiMediaThumb i')[0]||l.scry(x,'.uiVideoLink i')[0],z=x.getAttribute(w?'data-starred-src':'data-non-starred-src');this.updateBackground(y,z);var aa=s.getSize(t)*(w?2:1)-s.MARGIN;p.set(y,'width',aa+'px');p.set(y,'height',aa+'px');var t=o.byClass(x,'fbStarGrid');s.layoutGrid(t,s.getElements(t));h.inform('StarGrid/UPDATE',t);},addClickListener:function(t){g.listen(t,'click',function(event){var u=o.byClass(event.target||event.srcElement,'fbPhotoStarButton');if(!u)return;var v=o.byClass(u,'fbPhotoStarGridElement'),w=o.byClass(v,'fbStarGrid'),x=v.getAttribute('data-fbid'),y=s.isStarred(v);s.setStarred(w,u,x,!y);new i().setMethod('POST').setURI('/ajax/photos/photo/star.php').setData({fbid:x,value:!y}).setErrorHandler(function(){s.setStarred(w,u,x,y);}).send();return false;});h.subscribe('BulkTagger.SHOW',function(){j.addClass(t,'uiMediaThumbNoOverlay');});h.subscribe('BulkTagger.HIDE',function(){j.removeClass(t,'uiMediaThumbNoOverlay');});}};r(s,{getElements:function(t){var u=k.get(t,'elements');if(!u){u=l.scry(t,'div.fbPhotoStarGridElement');s.setElements(t,u);}return u;},setElements:function(t,u){k.set(t,'elements',u);}});e.exports=s;});
/*1361377859,173213983*/

if (self.CavalryLogger) { CavalryLogger.start_js(["fjb2a"]); }

__d("ActivityLogBulkSelection",["Event","AsyncRequest","CSS","DataStore","DOM","Parent","copyProperties","csx","cx","tx"],function(a,b,c,d,e,f){var g=b('Event'),h=b('AsyncRequest'),i=b('CSS'),j=b('DataStore'),k=b('DOM'),l=b('Parent'),m=b('copyProperties'),n=b('csx'),o=b('cx'),p=b('tx'),q=10,r='fbTimelineLogBody',s='ActivityLogBulkSelection-instance',t='ActivityLogBulkSelection-ids';function u(z){return k.find(z,"input._2o3s");}function v(z){return k.scry(z,"input._2o3s");}function w(z){return l.byClass(z,"_z6m");}function x(z,aa){this._header=z;this._body=k.find(aa,'.'+r);j.set(this._body,s,this);this._selected=[];g.listen(this._body,'click',function(event){var da=w(event.getTarget());if(!da)return;if(!u(da).checked){this._selected.remove(da);}else if(!this._selected.contains(da))this._selected.push(da);this._selectionChanged();}.bind(this));var ba=k.find(this._header,"a._2o3u");g.listen(ba,'click',function(){this._selected.forEach(function(da){u(da).checked=false;});this._selected=[];this._selectionChanged();}.bind(this));v(this._body).forEach(function(da){da.checked&&this._selected.push(w(da));}.bind(this));var ca=k.find(this._header,"._2o3v");g.listen(ca,'click',function(){new h('/ajax/photo_tag/bulk_remove').setData({photo_ids:this.getSelectedIDs()}).send();}.bind(this));this._selected.length&&this._selectionChanged();}x.init=function(z,aa,ba){q=ba;return new x(z,aa);};x.registerStory=function(z,aa){j.set(z,t,aa);var ba=l.byClass(z,r),ca=j.get(ba,s);if(ca&&ca._checkboxesDisabled)y(z,true);};m(x.prototype,{getSelectedIDs:function(){var z={};this._selected.forEach(function(aa){var ba=j.get(aa,t);ba&&ba.forEach(function(ca){z[ca]=true;});});return Object.keys(z);},_selectionChanged:function(){var z=this._selected.length,aa=k.find(this._header,"span._2o3w");if(z>1){k.setContent(aa,p._("{num} items",{num:z}));}else if(z==1)k.setContent(aa,"1 item");i.conditionClass(this._header,"_2o3r",z);var ba=this._checkboxesDisabled;this._checkboxesDisabled=this._selected.length>=q;if(!ba&&this._checkboxesDisabled){y(this._body,true);}else if(ba&&!this._checkboxesDisabled)y(this._body,false);}});function y(z,aa){v(z).forEach(function(ba){if(!ba.checked)ba.disabled=aa;});}e.exports=x;});
__d("ActivityLogNUXController",["AsyncRequest","DOM","URI","$","copyProperties","csx"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('DOM'),i=b('URI'),j=b('$'),k=b('copyProperties'),l=b('csx'),m={NAVIGATION:'navigation',FILTERS:'filters',EDIT:'edit'},n=[m.NAVIGATION,m.FILTERS,m.EDIT],o={ALL:'all',TAGGED_PHOTOS:'taggedphotos'};function p(r,s){var t={step:r};if(s)t.action=s;new g('/ajax/timeline/all_activity/nux_checkpoint.php').setData(t).send();}var q={init:function(r){if(!q.initialized){k(q,{dialogs:r.dialogs,initialized:true,finished:false});q.initDialogs();}q.setStep(r.nextStep);},initDialogs:function(){n.forEach(function(s,t){var u=q.dialogs[s];u.subscribe('button',function(v,w){r(u,w,t);});});function r(s,t,u){s.hide();switch(t.getAttribute('data-action')){case 'back':q.setStep(n[u-1]);break;case 'next':q.setStep(n[u+1]);break;case 'defer':q.suppressUsered();break;case 'close':case 'done':q.setFinished();break;}p(n[u],t.getAttribute('data-action'));}},setStep:function(r){if(q.finished)return;switch(r){case m.NAVIGATION:if(!q.setFilter(o.ALL))q.showNavigationDialog();break;case m.FILTERS:if(!q.setFilter(o.TAGGED_PHOTOS))q.showFiltersDialog();break;case m.EDIT:q.showEditDialog();break;}},showNavigationDialog:function(){var r=q.dialogs[m.NAVIGATION],s=h.scry(j('navItem_photos'),'.linkWrap')[0],t=h.create('span');h.appendContent(s,t);r.setContext(t).setOffsetX(5).show();p(m.NAVIGATION);},showFiltersDialog:function(){var r=q.dialogs[m.FILTERS],s=h.find(document.body,"._kj4");r.setContext(s).setOffsetX(-3).setOffsetY(2).show();p(m.FILTERS);},showEditDialog:function(){var r=q.dialogs[m.EDIT],s=h.scry(document.body,"._2fmm"),t=s[0];if(t){r.setContext(t).setOffsetX(-8).show();p(m.EDIT);}else q.setFinished();},setFilter:function(r){var s=i.getNextURI(),t=s.getQueryData().log_filter||o.ALL;if(t===r)return false;s.addQueryData({log_filter:r,usered:1,privacy_source:'activity_log_nux'}).go();return true;},setFinished:function(){q.finished=true;q.cleanup();new g('/ajax/timeline/all_activity/nux_checkpoint.php').setData({finished:true}).send();},suppressUsered:function(){h.scry(j('sideNav'),'a.item').forEach(function(r){r.href=i(r.href).addQueryData({suppress_usered:1});});},cleanup:function(){var r=q.dialogs;for(var s in r)r[s].destroy();}};e.exports=q;});
__d("ActivityLogOptionButton",["Button","csx","DOMQuery","MenuXSelectable","Tooltip"],function(a,b,c,d,e,f){var g=b('Button'),h=b('csx'),i=b('DOMQuery'),j=b('MenuXSelectable'),k=b('Tooltip'),l;function m(n,o,p){this._root=n;this._popoverMenu=o;var q=this._popoverMenu.subscribe('setMenu',function(){this._menu=this._popoverMenu.getMenu();if(this._menu instanceof j){q.unsubscribe();this._menu.subscribe('change',function(event,r){var s=i.find(n,"._2fmm");k.set(s,r.label);var t;if(r.value=='allow'||r.value=='default_allow'){t=l&&l.cloneNode(true);}else t=r.item.getIcon().cloneNode(true);g.setIcon(s,t);});}}.bind(this));}m.registerPencilIcon=function(n){l=n;};e.exports=m;});
__d("AllActivityContentLoader",["Arbiter","CSS","DOM","DOMScroll","OnVisible","Parent","ScrollingPager","TimelineConstants","TimelineController","TimelineLegacySections","TimelineSmartInsert","UIPagelet","Vector","$","clickRefAction","copyProperties","csx","userAction"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('DOM'),j=b('DOMScroll'),k=b('OnVisible'),l=b('Parent'),m=b('ScrollingPager'),n=b('TimelineConstants'),o=b('TimelineController'),p=b('TimelineLegacySections'),q=b('TimelineSmartInsert'),r=b('UIPagelet'),s=b('Vector'),t=b('$'),u=b('clickRefAction'),v=b('copyProperties'),w=b('csx'),x=b('userAction'),y=false,z=0,aa=null,ba={},ca=[],da={},ea=[],fa=null,ga=null;function ha(la,ma,na,oa){this.node=la;this.canScrollLoad=true;this.scrubberKey=ma;this._pageletLoadData=na;this.loaded=oa;this.contentNode=i.scry(la,"div._z6j")[0];}function ia(){if(y)return;o.register(o.CONTENT,ka);fa=x('allactivity').uai('init','scrubber',false);u('scrubber').set_namespace('allactivity');y=true;}function ja(la){var ma=p.get(la);ma&&ma.canScrollLoad&&ma.load();}v(ha.prototype,{load:function(){if(this.loaded)return;this.loaded=true;this.contentNode&&h.hide(this.contentNode);h.show(l.byClass(this.node,'fbTimelineSection'));var la='TimelineProfileAllActivityPagelet',ma=this.node;function na(pa){q.run(ma,pa);}var oa=i.find(this.node,'div.fbTimelineLogStream');ea.push(r.loadFromEndpoint(la,oa.id,this._pageletLoadData,{usePipe:true,jsNonblock:true,constHeight:true,displayCallback:na,append:true}));},contentAdded:function(la){if(!this.hasContent){h.removeClass(l.byClass(this.node,'stat_elem'),'async_saving');if(this.contentNode){la&&i.prependContent(this.contentNode,la);h.show(this.contentNode);}this.hasContent=true;}},fullyLoaded:function(){if(!this.hasContent){h.removeClass(l.byClass(this.node,'stat_elem'),'async_saving');h.show(i.find(this.node,"div._40pu"));this.contentNode&&h.hide(this.contentNode);}},activateScrollLoad:function(){this.canScrollLoad=true;da[this.scrubberKey]&&da[this.scrubberKey].reset();},deactivateScrollLoad:function(){if(!this.loaded){this.canScrollLoad=false;}else{var la=i.scry(this.node,'div.all_activity_pager')[0];if(la){var ma=m.getInstance(la.id);if(ma){ma.removeOnVisible();h.removeClass(i.scry(la,'div.uiMorePager')[0],'async_saving');}}}da[this.scrubberKey]&&da[this.scrubberKey].remove();},getParent:function(){if(this.parentKey)return p.get(this.parentKey);return null;}});var ka={SCROLL_TO_OFFSET:115,HEADER_SCROLL_CUTOFF:30,CURRENT_SECTION_OFFSET:150,registerTimePeriod:function(la,ma,na,oa,pa,qa){ia();var ra=new ha(la,ma,na,oa);if(!pa){ca.push(ma);ba[ma]=true;}else{ra.parentKey=pa;p.get(pa).subSections=p.get(pa).subSections||[];p.get(pa).subSections.push(ra);}p.set(ma,ra);ka.checkCurrentSectionChange();g.inform(n.SECTION_REGISTERED,{scrubberKey:ma},g.BEHAVIOR_PERSISTENT);o.registerSectionKey(ma,z++);},reset:function(){ka.stopLoadingContent();y=false;p.removeAll();z=0;aa=null;ba={};ca=[];da={};ea=[];fa=null;ga=null;},stopLoadingContent:function(){for(var la in da)da[la].remove();for(var ma=0;ma<ea.length;ma++)ea[ma].cancel();},setContentHeader:function(la){ga=la;},checkCurrentSectionChange:function(){var la=ka.getCurrentSection(),ma=aa&&aa.scrubberKey;if(la&&la.scrubberKey!==ma){aa=la;var na=la.scrubberKey,oa=la.parentKey;if(!oa){oa=na;na=null;}o.sectionHasChanged(oa,na);}},getCurrentSection:function(){var la={},ma=p.getAll();for(var na in ma){var oa=ma[na];if(!oa.loaded)continue;var pa=s.getElementPosition(oa.node,'viewport').y;if(pa<ka.CURRENT_SECTION_OFFSET)la[pa]=oa;}var qa=Math.max.apply(this,Object.keys(la)),ra=qa==-Infinity;if(!ra){return la[qa];}else return null;},enableScrollLoad:function(la,ma,na){la=t(la);var oa=ka.getNextSectionKey(ma);if(oa)da[oa]=new k(la,ja.curry(oa),false,na||1000);},getNextSectionKey:function(la){var ma=p.get(la),na=ma.getParent(),oa=null,pa=null;if(na)for(var qa=0;qa<na.subSections.length-1;qa++)if(na.subSections[qa].scrubberKey==la)oa=na.subSections[qa+1].scrubberKey;if(!oa)for(var ra=0;ra<ca.length-ra;ra++)if(ca[ra]==na.scrubberKey){pa=p.get(ca[ra+1]).subSections[0];if(pa)oa=pa.scrubberKey;}return oa;},navigateToSection:function(la,ma,na){fa.add_event("nav_"+la);ma=!!ma;var oa=p.get(la);if(!oa)return;if(!oa.getParent()){la=oa.subSections[0].scrubberKey;oa=p.get(la);}for(var pa=0;pa<ca.length;pa++){var qa=p.get(ca[pa]);for(var ra=0;ra<qa.subSections.length;ra++){if(qa.subSections[ra].scrubberKey==la)break;qa.subSections[ra].deactivateScrollLoad();}if(qa.scrubberKey==oa.getParent().scrubberKey)break;}oa.activateScrollLoad();oa.load();ka.adjustContentPadding();var sa=s.getScrollPosition().x,ta=s.getElementPosition(oa.node).y;if(!ma){var ua=ka.SCROLL_TO_OFFSET;j.scrollTo(new s(sa,ta-ua,'document'));}},adjustContentPadding:function(){t('fbTimelineLogBody').style.paddingBottom=s.getViewportDimensions().y-ka.CURRENT_SECTION_OFFSET-ka.HEADER_SCROLL_CUTOFF+'px';},sectionHasContent:function(la){var ma=p.get(la);ma&&ma.contentAdded(ga);ga=null;},sectionFullyLoaded:function(la){var ma=p.get(la);ma&&ma.fullyLoaded();}};e.exports=ka;});
__d("FriendListHeader",["Event","Arbiter","CSS","DOM","Focus","Input","PageTransitions","Parent"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('CSS'),j=b('DOM'),k=b('Focus'),l=b('Input'),m=b('PageTransitions'),n=b('Parent'),o,p,q={init:function(r,s){o=r;p=j.find(o,'.nameInput');var t=h.subscribe('FriendListHeader/initMenu',q.initMenu);m.registerHandler(function(){h.unsubscribe(t);});},initMenu:function(r,s){var t=null;if(s)t=s.subscribe('rename',function(u,v){i.addClass(o,'friendListHeaderEditMode');l.setValue(p,'');k.set(p);});g.listen(o,'click',function(u){if(n.byClass(u.getTarget(),'cancel')){i.removeClass(o,'friendListHeaderEditMode');return;}if(n.byClass(u.getTarget(),'saveButton')&&l.isEmpty(p)){k.set(p);u.preventDefault();}});m.registerHandler(function(){if(s&&t)s.unsubscribe(t);});}};e.exports=q;});
__d("FriendListManageMenuX",["AsyncRequest","Class","CSS","MenuXSelectable","copyProperties"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('Class'),i=b('CSS'),j=b('MenuXSelectable'),k=b('copyProperties');function l(m,n,o,p){this.parent.construct(this,m,n,o,{multiple:true});this.flid=p;}h.extend(l,j);k(l.prototype,{_handleItemClick:function(m){if(i.hasClass(m.getRoot(),'editName')){this.inform('rename',{item:m});}else if(i.hasClass(m.getRoot(),'chooseUpdateTypes')){i.addClass(this.getRoot(),'updateTypesExpanded');return false;}else if(i.hasClass(m.getRoot(),'selectableUpdateType')){var n=this.parent._handleItemClick(m),o=[];this._items.forEach(function(p){if(i.hasClass(p.getRoot(),'selectableUpdateType')&&p.isSelected())o.push(p.getValue());});new g().setURI('/ajax/friends/lists/subscriptions.php').setData({subs:o,flid:this.flid}).send();return n;}return this.parent._handleItemClick(m);}});e.exports=l;});
__d("UnicodeByteMaxLength",["Event","DataStore"],function(a,b,c,d,e,f){var g=b('Event'),h=b('DataStore');function i(j){var k=0;for(var l=0;l<j.length;l++){var m=j.charCodeAt(l);if(m<=127){k+=1;}else if(m<=2047){k+=2;}else if(m<=55193){k+=3;}else if(m>=55296&&m<57344){k+=4;l++;}else if(m<65535)k+=3;}return k;}g.listen(document,'keypress',function(j){var k=j.getTarget(),l=h.get(k,'maxlen');if(l)return i(k.value)<l;});});
__d("FlexibleScrollableArea",["Event","DataStore","DOM","Parent","Run","Style","Vector","copyProperties","throttle"],function(a,b,c,d,e,f){var g=b('Event'),h=b('DataStore'),i=b('DOM'),j=b('Parent'),k=b('Run'),l=b('Style'),m=b('Vector'),n=b('copyProperties'),o=b('throttle'),p=30,q=100;function r(s,t,u,v,w){this._element=s;this._tight=t;this._measureFrom=u;this._minHeight=v;this._margin=w;h.set(this._element,'FlexibleScrollableArea',this);k.onLeave(this.cleanup.bind(this));this._listener=g.listen(window,'resize',o(this.poke,q,this));this.poke();}n(r,{getInstance:function(s){var t=j.byClass(s,'flexibleScrollableArea');return t?h.get(t,'FlexibleScrollableArea'):null;}});n(r.prototype,{poke:function(){var s=i.find(this._element,'div.elasticContainer'),t=m.getElementDimensions(s).y,u;if(this._tight){u=Math.max(Math.min(t,this.getMaxHeight()),this._minHeight);var v=m.getElementPosition(s).y+m.getElementDimensions(s).y-m.getElementPosition(this._element).y-u;if(v<=p)u+=v;}else u=Math.max(this.getMaxHeight(),this._minHeight);l.set(this._element,'height',u+'px');},getMaxHeight:function(){if(this._measureFrom==='bottom'){var s=m.getViewportDimensions().y,t=m.getElementPosition(this._element,'viewport').y,u=s-t;return u-this._margin;}var v=m.getElementPosition(this._element,'viewport').y+m.getElementDimensions(this._element).y;return v-this._margin;},cleanup:function(){this._listener&&this._listener.remove();}});e.exports=r;});
__d("MenuXStaticItem",["Class","copyProperties","DOM","HTML","MenuXItemBase"],function(a,b,c,d,e,f){var g=b('Class'),h=b('copyProperties'),i=b('DOM'),j=b('HTML'),k=b('MenuXItemBase');function l(m){this.parent.construct(this);this._data=m;}g.extend(l,k);h(l.prototype,{_renderItemContent:function(){return i.create('span',{className:'itemAnchor staticAnchor'},i.create('span',{className:'itemLabel'},j(this._data.markup).getNodes()));}});e.exports=l;});
__d("PopoverMenuDynamicIcon",["Button","copyProperties"],function(a,b,c,d,e,f){var g=b('Button'),h=b('copyProperties');function i(j){this._popoverMenu=j;}h(i.prototype,{_setMenuSubscription:null,_changeSubscription:null,enable:function(){this._setMenuSubscription=this._popoverMenu.subscribe('setMenu',this._onSetMenu.bind(this));},disable:function(){this._popoverMenu.unsubscribe(this._setMenuSubscription);this._setMenuSubscription=null;this._removeChangeSubscription();},_onSetMenu:function(){this._removeChangeSubscription();this._menu=this._popoverMenu.getMenu();this._changeSubscription=this._menu.subscribe('change',function(j,k){var l=k.item;if(k[0])l=k[0].item;if(!l)return;var m=l.getIcon();g.setIcon(this._popoverMenu.getTriggerElem(),m?m.cloneNode(true):null);}.bind(this));},_removeChangeSubscription:function(){if(this._changeSubscription){this._menu.unsubscribe(this._changeSubscription);this._changeSubscription=null;}}});e.exports=i;});
__d("HideInlineHelp",["DynamicIconSelector","Selector"],function(a,b,c,d,e,f){var g=b('DynamicIconSelector'),h=b('Selector'),i=[],j={registerMenu:function(k,l,m){i[k]=l.setValue.bind(l,m);},registerLegacyMenu:function(k,l,m){i[k]=function(){h.setSelected(l,m);g.swapIcon(l);};},registerAsyncPopoverMenu:function(k,l,m){i[k]=function(){var n=l.getMenu();n.setValue(m);};},triggerUndo:function(k){i[k]();}};e.exports=j;});
__d("ProfileApprovalController",["event-extensions","AsyncRequest","DOM","HTML","$","copyProperties","ge"],function(a,b,c,d,e,f){b('event-extensions');var g=b('AsyncRequest'),h=b('DOM'),i=b('HTML'),j=b('$'),k=b('copyProperties'),l=b('ge');function m(n){this.queueType=n;var o=l('profileApprovalSeeMoreLink');if(o)Event.listen(o,'click',this.clickedSeeMore.bind(this));}m.NO_MORE_CONTENT='no_more_content';k(m.prototype,{FILTER_NONE:0,FILTER_OLDER:1,FILTER_NEWER:2,getNewStories:function(){var n=this.getStoryData(),o={filter:this.FILTER_NEWER,filter_timestamp:n.newest_time,filter_fbid:n.newest_fbid};new g().setURI('/ajax/profile/approval/get_more.php').setData(o).setHandler(this.handleContent).send();},clickedSeeMore:function(){var n=this.getStoryData(),o={queue_type:this.queueType,filter:this.FILTER_OLDER,filter_timestamp:n.oldest_time,filter_fbid:n.oldest_fbid};new g().setURI('/ajax/profile/approval/get_more.php').setData(o).setHandler(this.handleContent).send();},handleContent:function(n){var o=n.payload;if(o.pager_error){h.replace(j('profileApprovalSeeMoreContainer'),i(o.pager_markup));return;}if(o.hide_more_pager)h.remove(j('profileApprovalSeeMoreContainer'));if(!o.items_markup)return;if(o.insert_before)h.prependContent(h.find(j('profileApprovalContentContainer'),'.profileApprovalList'),i(o.items_markup));if(o.insert_after)h.appendContent(h.find(j('profileApprovalContentContainer'),'.profileApprovalList'),i(o.items_markup));},getStoryData:function(){var n=h.scry(j('profileApprovalContentContainer'),'.profileApprovalStoryContainer');if(!n)return;var o=n[0],p=n[n.length-1];return {newest_time:o.getAttribute('data-timestamp'),newest_fbid:o.getAttribute('data-fbid'),oldest_time:p.getAttribute('data-timestamp'),oldest_fbid:p.getAttribute('data-fbid')};}});e.exports=m;});
__d("legacy:profile-approval-controller",["ProfileApprovalController"],function(a,b,c,d){a.ProfileApprovalController=b('ProfileApprovalController');},3);
__d("TimelineAllActivitySideNav",["CSS","DOM","DOMDimensions","FutureSideNav","PageTransitions","Style","UIPagelet","$","csx"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i=b('DOMDimensions'),j=b('FutureSideNav'),k=b('PageTransitions'),l=b('Style'),m=b('UIPagelet'),n=b('$'),o=b('csx'),p={init:function(q,r,s){var t=h.find(n('contentArea'),"._6-0"),u=h.getID(t);l.set(t,'minHeight',i.getViewportDimensions().height+'px');g.addClass(q,'fixed_elem');k.registerHandler(function(v){if(r===v.getPath()){var w=v.getQueryData();w.renderContentsOnly=1;w.profile_id=s;w.uripath=v.toString();var x=j.getInstance(),y=x&&x._getItemForKey(w.log_filter);y&&x.setLoading(y);m.loadFromEndpoint('TimelineAllActivityColumn',u,w,{jsNonblock:true,constHeight:true,displayCallback:function(z){z();y&&x.setSelected(y);document.body.scrollTop=0;k.transitionComplete(true);}});return true;}return false;});}};e.exports=p;});
__d("TimelineAllActivityStorySelector",["Arbiter","CSS","PrivacyConst","Selector"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('PrivacyConst'),j=b('Selector');j.subscribe('select',function(l,m){if(!h.hasClass(m.selector,'fbTimelineAllActivityStorySelector'))return;var n=j.getOptionValue(m.option);if(n==i.BaseValue.CUSTOM){j.toggle(m.selector);return false;}if(h.hasClass(m.option,'fbPrivacyAudienceSelectorOption')){k(m.selector,'fbPrivacyAudienceSelectorOption');}else if(h.hasClass(m.option,'fbTimelineCurationOption'))k(m.selector,'fbTimelineCurationOption');});g.subscribe('CustomPrivacyOption/update',function(l,m){if(!h.hasClass(m.selector,'fbTimelineAllActivityStorySelector'))return;k(m.selector,'fbPrivacyAudienceSelectorOption');j.setSelected(m.selector,j.getOptionValue(m.option));});function k(l,m){j.getOptions(l).forEach(function(n){if(h.hasClass(n,m)){var o=j.getOptionValue(n);j.setSelected(l,o,false);}});}});
__d("ConfirmFamilyPendingPostsQueue",["Event","Button","DOM"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Button'),i=b('DOM'),j={listen:function(k){g.listen(k,'change',function(event){var l=event.target,m=!!parseInt(l.value,10),n=l.form;n.approve_button.disabled=!m;var o=i.find(n,'.submitButton');h.setEnabled(o,m);});}};e.exports=j;});
__d("TimelineReviewTour",["AsyncRequest"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h={showTour:function(i){new g().setURI('/ajax/timeline/all_activity/review/tour.php').setData({step:i}).send();}};e.exports=h;});
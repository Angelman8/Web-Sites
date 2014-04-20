/*1361055055,178130529*/

if (self.CavalryLogger) { CavalryLogger.start_js(["O+P\/M"]); }

__d("BlobFactory",["emptyFunction"],function(a,b,c,d,e,f){var g=b('emptyFunction'),h,i=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||a.MSBlobBuilder;if(a.Blob){var j;try{new a.Blob();j=true;}catch(k){j=false;}h={getBlob:function(l,m){l=l||[];m=m||{};if(j){return new a.Blob(l,m);}else{var n=new i();for(var o=0;o<l.length;o++)n.append(l[o]);return n.getBlob(m.type);}},isSupported:g.thatReturnsTrue};}else h={getBlob:function(){},isSupported:g.thatReturnsFalse};e.exports=h;});
__d("ImageResizer",["Event","ArbiterMixin","BlobFactory","DOM","UserAgent","copyProperties"],function(a,b,c,d,e,f){var g=b('Event'),h=b('ArbiterMixin'),i=b('BlobFactory'),j=b('DOM'),k=b('UserAgent'),l=b('copyProperties'),m=function(n,o,p){this._input=n;this._image=null;this._canvas=null;this._rotation=0;this._maxWidth=o;this._maxHeight=p;this._outputMime='image/jpeg';this._outputCompression=.87;};m.isSupported=function(){if(window.File&&window.FileReader){var n=j.create('canvas');if(n.toBlob||(n.toDataURL&&window.ArrayBuffer&&window.Uint8Array&&i.isSupported()))return true;}return false;};l(m.prototype,h);l(m.prototype,{setOrientation:function(n){this._rotation={1:0,3:180,6:90,8:270}[n]||0;},resize:function(){if(this._input instanceof HTMLCanvasElement||this._input instanceof HTMLImageElement){this._image=this._input;this._handleImage();}else if(typeof this._input=="string"){this._loadImage(this._input);}else if(this._input instanceof window.File)this._loadFile(this._input);},_rotatedToSide:function(){return (this._rotation%180)==90;},_prepareError:function(n){return (function(){this.inform.bind(this,"error",n);}.bind(this));},_loadFile:function(n){var o=new FileReader();g.listen(o,'load',this._handleFile.bind(this));g.listen(o,'error',this._prepareError("Could not read file."));o.readAsDataURL(n);},_handleFile:function(event){var n=event.target.result;this._loadImage(n);},_loadImage:function(n){this._image=j.create('img');g.listen(this._image,'load',this._handleImage.bind(this));g.listen(this._image,'error',this._prepareError("Could not load image."));this._image.src=n;},_handleImage:function(){this._drawTransformed();this._extractBlob();},_drawTransformed:function(){var n=this._calculateRatio(),o=0;if(k.chrome())if(n<.25){o=2;}else if(n<.5)o=1;var p=this._drawResizedCanvas(this._image,n*Math.pow(2,o));for(var q=0;q<o;q++)p=this._drawResizedCanvas(p,.5);if(this._rotation)p=this._drawRotatedCanvas(p);this._canvas=p;},_drawResizedCanvas:function(n,o){var p=j.create('canvas');p.width=n.width*o;p.height=n.height*o;var q=p.getContext("2d");q.scale(o,o);q.drawImage(n,0,0);return p;},_drawRotatedCanvas:function(n){var o=j.create('canvas');if(this._rotatedToSide()){o.width=n.height;o.height=n.width;}else{o.width=n.width;o.height=n.height;}var p=o.getContext("2d");p.translate(o.width*.5,o.height*.5);p.rotate(Math.PI*(this._rotation/180));p.translate(n.width*-.5,n.height*-.5);p.drawImage(n,0,0,n.width,n.height);return o;},_calculateRatio:function(){var n=1,o=this._rotatedToSide()?this._maxHeight:this._maxWidth,p=this._rotatedToSide()?this._maxWidth:this._maxHeight,q=o/this._image.width,r=p/this._image.height;if(q<n&&q>0)n=q;if(r<n&&r>0)n=r;return n;},_extractBlob:function(){if(this._canvas.toBlob){this._canvas.toBlob(this._handleBlob.bind(this),this._outputMime,this._outputCompression);return;}var n=this._canvas.toDataURL(this._outputMime,this._outputCompression),o=n.match(/^data:(.*?);base64,/);if(!o){this._prepareError("Couldn't get base64 encoded data from canvas.")();return;}var p=o[1],q=n.substr(o[0].length),r=window.atob(q),s=new ArrayBuffer(r.length),t=new Uint8Array(s);for(var u=0;u<r.length;u++)t[u]=r.charCodeAt(u);var v=i.getBlob([s],{type:p});this._handleBlob(v);},_handleBlob:function(n){this.inform('resized',n);}});e.exports=m;});
__d("cancelAnimationFrame",[],function(a,b,c,d,e,f){var g=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||window.clearTimeout;e.exports=g;});
__d("PortfolioHiddenPhotosCallout",[],function(a,b,c,d,e,f){var g={bindMenu:function(h,i){h.getPopover().subscribe('show',function(){i.click();});}};e.exports=g;});
__d("PortfolioTour",["Event","Arbiter","AsyncRequest","CSS","DOM","Style","copyProperties","cx","csx"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('AsyncRequest'),j=b('CSS'),k=b('DOM'),l=b('Style'),m=b('copyProperties'),n=b('cx'),o=b('csx');function p(q,r,s,t){this._root=q.getRoot();this._dialog=q;this._closeLink=r;this._carousel=s;this._init();}m(p.prototype,{_init:function(){p.markSeen();this._prevButton=k.find(this._root,"._30_");this._nextButton=k.find(this._root,"._310");this._doneButton=k.find(this._root,"._311");g.listen(this._closeLink,'click',this._onCloseClick.bind(this));g.listen(this._doneButton,'click',function(){h.inform('PortfolioTour/done');});this._carousel.subscribe('page_start',this._onPage.bind(this));this._dialog.subscribe(['button','cancel'],this._onButtonClick.bind(this));},_onButtonClick:function(q,r){if(q==='button')if(r===this._prevButton){this._carousel.page('prev');}else if(r===this._nextButton)this._carousel.page('next');},_onCloseClick:function(event){this._dialog.hide();h.inform('PortfolioTour/done');},_onPage:function(q,r){var s;if(r===this._carousel.getNumItems()-1){s=[true,false,true];}else if(r===0){s=[false,true,false];}else s=[true,true,false];this._updateButtonState(s);},_updateButtonState:function(q){j.conditionShow(this._prevButton,q[0]);j.conditionShow(this._nextButton,q[1]);j.conditionShow(this._doneButton,q[2]);}});m(p,{setup:function(q,r){var s=k.scry(document.body,'.fbStarGrid')[0]||k.scry(document.body,'.fbTimelinePhotoAlbums')[0];j.addClass(s,"_161h");h.subscribe('PortfolioTour/done',function(){p.hideHeader(q,s);});g.listen(r,'click',function(){p.markSeen();p.hideHeader(q,s);});},markSeen:function(){new i().setURI('/ajax/photos/portfolio/seen_tour.php').setMethod('POST').send();},hideHeader:function(q,r){j.removeClass(r,"_161h");l.set(q,'height',0);}});e.exports=p;});
__d("PhotoInlineCaptionEditor",["Event","CSS","DOM","DOMControl","Input","Parent","copyProperties"],function(a,b,c,d,e,f){var g=b('Event'),h=b('CSS'),i=b('DOM'),j=b('DOMControl'),k=b('Input'),l=b('Parent'),m=b('copyProperties'),n=function(o){this.instanceId=o;n.instances[o]=this;};m(n,{instances:{},getInstance:function(o){return this.instances[o];},setCaption:function(o,p){this.getInstance(o).setCaption(p);}});m(n.prototype,{init:function(o){this.element=o;g.listen(o,'click',this.handleClick.bind(this));var p=i.scry(o,'input[name="caption_id"]');if(p.length)p[0].value=this.instanceId;this.inputStr='';var q=i.scry(this.element,'textarea.fbPhotoCaptionInput')[0];if(q)this.inputStr=k.getValue(q);},handleClick:function(event){var o=event.getTarget();if(l.byClass(o,'editIcon')||l.byClass(o,'noCaption')){this.toggleEditDescription(true);}else if(l.byClass(o,'cancelEdit')){k.setValue(i.find(this.element,'textarea.fbPhotoCaptionInput'),this.inputStr);this.toggleEditDescription(false);}},setCaption:function(o){i.setContent(i.find(this.element,'.fbPhotoCaptionText'),o);this.toggleEditDescription(false);this.inputStr=k.getValue(i.find(this.element,'textarea.fbPhotoCaptionInput'));},getCaption:function(){return i.getText(i.find(this.element,'.fbPhotoCaptionText'));},toggleEditDescription:function(o){if(!o)i.find(this.element,'textarea.fbPhotoCaptionInput').blur();h.conditionClass(this.element,'fbPhotoInlineCaptionEditorEditMode',!!o);if(o){var p=i.find(this.element,'textarea.fbPhotoCaptionInput'),q=j.getInstance(p);q&&q.update();p.focus();}else{h.conditionClass(i.find(this.element,'.noCaption'),'hidden_elem',this.getCaption().length);h.conditionClass(i.find(this.element,'.withCaption'),'hidden_elem',!this.getCaption().length);}}});e.exports=n;});
__d("legacy:PhotoInlineCaptionEditor",["PhotoInlineCaptionEditor"],function(a,b,c,d){a.PhotoInlineCaptionEditor=b('PhotoInlineCaptionEditor');},3);
__d("StarGridReorder",["array-extensions","Event","Arbiter","AsyncRequest","cancelAnimationFrame","CSS","DOM","Locale","Rect","requestAnimationFrame","SimpleDrag","StarGrid","StarGridLayout","Style","Vector"],function(a,b,c,d,e,f){b('array-extensions');var g=b('Event'),h=b('Arbiter'),i=b('AsyncRequest'),j=b('cancelAnimationFrame'),k=b('CSS'),l=b('DOM'),m=b('Locale'),n=b('Rect'),o=b('requestAnimationFrame'),p=b('SimpleDrag'),q=b('StarGrid'),r=b('StarGridLayout'),s=b('Style'),t=b('Vector'),u=15,v=50,w=80,x=1,y={getOrder:function(z){return z.map(function(aa){return aa.getAttribute('data-reorderid');});},addDragListener:function(z,aa){if(!z.hasChildNodes())return;var ba=new r({isStarred:q.isStarred,renderNonStarred:q.renderNonStarred,renderStarred:q.renderStarred,isFixed:q.isFixed}),ca=m.isRTL()?'margin-right':'margin-left',da,ea,fa,ga=n.getElementBounds(z),ha=false,ia=ba.canonicalize(q.getElements(z)),ja,ka;function la(ma){var na=new p(ma);na.setMinDragDistance(u);var oa,pa;function qa(){if(!fa)return;var va=n.getViewportBounds(),wa=fa.y-va.t,xa=va.b-fa.y,ya=new t(0,0);if(wa<xa&&wa<v){ya.y=-v+wa;}else if(xa<v)ya.y=v-xa;ya.y=ra(ya.y);if(ha)ga=n.getElementBounds(z);if(ya.y){if(fa.y+ya.y>ga.b)ya=new t(0,Math.max(ga.b-fa.y,0));ya.scrollElementBy(document.body);pa=pa.add(ya);ua(pa);fa=fa.add(ya);}oa=o(qa);}function ra(va){if(va>=0){va=Math.min(va,v);}else va=Math.max(va,-v);return Math.floor(Math.pow(va/v*w,x));}var sa=false,ta=l.scry(ma,'a[rel="theater"]');ta.forEach(function(va){g.listen(va,'click',function(event){if(sa)event.kill();});});na.subscribe('mousedown',function(va,event){sa=false;ea=t.getEventPosition(event);da=ea.sub(new t(s.get(ma,ca),s.get(ma,'margin-top')));});na.subscribe('start',function(va,event){if(event.button!==0)return;sa=true;if(ka)k.removeClass(ka,'fbPhotoStarGridAbove');k.addClass(ma,'fbPhotoStarGridDrag');k.addClass(ma,'fbPhotoStarGridAbove');ka=ma;oa=o(qa);});na.subscribe('update',function(va,event){if(!sa)return;var wa=t.getEventPosition(event);fa=wa;if(m.isRTL())wa.x=2*ea.x-wa.x;wa=wa.sub(da);ja=ba.reorder(ia,ma,Math.floor((wa.x+q.getSize(z)/2)/q.getSize(z)),Math.floor((wa.y+q.getSize(z)/2)/q.getSize(z)));pa=wa;q.layoutGrid(z,ja);ua(wa);});function ua(va){s.set(ma,'margin-top',va.y+'px');s.set(ma,ca,va.x+'px');}na.subscribe('end',function(va,event){if(!sa)return;j(oa);k.removeClass(ma,'fbPhotoStarGridDrag');q.layoutGrid(z,ja);new i(aa).setData({order:y.getOrder(ja)}).setErrorHandler(function(wa){ia=wa;q.layoutGrid(z,ja);}.bind(this,ia)).send();ia=ja;});}ia.forEach(la);h.subscribe('StarGrid/UPDATE',function(ma,na){var oa=ba.canonicalize(q.getElements(na));oa.forEach(function(pa){if(ia.indexOf(pa)===-1)la(pa);});ia=oa;ha=true;});}};e.exports=y;});
__d("FilePickerEvent",[],function(a,b,c,d,e,f){e.exports={SELECTED:'FilePickerEvent/SELECTED_FILES',MAX_EXCEEDED:'FilePickerEvent/MAX_EXCEEDED',SELECT_CANCELED:'FilePickerEvent/SELECT_CANCELED',FALLBACK:'FilePickerEvent/FALLBACK'};});
__d("FlashArbiterEvents",["Arbiter","Run","copyProperties"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Run'),i=b('copyProperties');function j(k){this._flashID=k;this._subscriptions=[];h.onLeave(this.unsubscribeAll.bind(this));}i(j.prototype,{subscribe:function(k,l){var m=this._flashID;this._subscriptions.push(g.subscribe(k,function(n,o){if(m===o.divID)l(o);}));return this;},unsubscribeAll:function(){while(this._subscriptions.length)g.unsubscribe(this._subscriptions.pop());}});e.exports=j;});
__d("FlashLoadEvent",[],function(a,b,c,d,e,f){e.exports={READY:'flash/ready',FAILED:'flash/failed',MOUSE_CANCELED:'UploadEvent/SELECT_CANCELED',MOUSE_DOWN:'UploadEvent/SELECT_DOWN',MOUSE_OUT:'UploadEvent/SELECT_OUT',MOUSE_OVER:'UploadEvent/SELECT_OVER',MOUSE_UP:'UploadEvent/SELECT_UP',ERROR_FLASH_LOAD_TIMEOUT:1,ERROR_FLASH_LOAD_FAILURE:2,ERROR_FLASH_UPGRADE_REQUIRED:3};});
__d("UploadEvent",[],function(a,b,c,d,e,f){var g={UPLOAD_START:'UploadEvent/UPLOAD_START',UPLOAD_HIRES_RESTART:'UploadEvent/UPLOAD_HIRES_RESTART',START:'UploadEvent/START',DONE:'UploadEvent/DONE',ERROR:'UploadEvent/ERROR',FINISHED_UPLOADING:'UploadEvent/FINISHED_UPLOADING',LOADED:'UploadEvent/LOADED',READY:'UploadEvent/READY',UPLOAD_FAILED:'UploadEvent/UPLOAD_FAILED',UPLOAD_PROGRESS:'UploadEvent/UPLOAD_PROGRESS',COMPRESS_PROGRESS:'UploadEvent/COMPRESS_PROGRESS',HI_RES_ATTACH_START:'UploadEvent/HI_RES_ATTACH_START',IMAGE_COMPRESS_ERROR:'UploadEvent/IMAGE_COMPRESS_ERROR',IMAGE_COMPRESSED:'UploadEvent/IMAGE_COMPRESSED',IMAGE_UPLOAD_ERROR:'UploadEvent/IMAGE_UPLOAD_ERROR',IMAGE_UPLOADED:'UploadEvent/IMAGE_UPLOADED',IMAGES_SELECTED:'UploadEvent/IMAGES_SELECTED',HEARTBEAT:'UploadEvent/HEARTBEAT'};e.exports=g;});
__d("FlashFilePicker",["Arbiter","ArbiterMixin","AsyncUploadBase","ImageResizer","CSS","FilePickerEvent","Flash","FlashArbiterEvents","FlashLoadEvent","FlashUploaderConfig","Parent","PhotosUploadWaterfall","UploadEvent","URI","copyProperties","$"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('ArbiterMixin'),i=b('AsyncUploadBase'),j=b('ImageResizer'),k=b('CSS'),l=b('FilePickerEvent'),m=b('Flash'),n=b('FlashArbiterEvents'),o=b('FlashLoadEvent'),p=b('FlashUploaderConfig'),q=b('Parent'),r=b('PhotosUploadWaterfall'),s=b('UploadEvent'),t=b('URI'),u=b('copyProperties'),v=b('$');function w(aa){for(var ba=0;ba<aa.length;++ba)if(m.checkMinVersion(aa[ba].toString()))return true;return false;}function x(aa){var ba=q.byClass(aa,'addPhotosDisabled');if(ba){k.removeClass(ba,'addPhotosDisabled');k.addClass(ba,'addPhotosEnabled');}}function y(aa,ba){ba.style.width=aa.offsetWidth+'px';ba.style.height=aa.offsetHeight+'px';}function z(aa,ba,ca){this._swfID=aa;this._button=ba;this._waterfallID=ca.qn;this._isReady=false;this._fallbackHref=ca.fallbackHref;if(!w(p.flashVersionInfo.minimumVersion)){r.sendSignal({qn:this._waterfallID,step:r.UPGRADE_REQUIRED,uploader:r.APP_FLASH});this._flashError(o.ERROR_FLASH_UPGRADE_REQUIRED);return;}this._flashEvents=new n(this._swfID).subscribe(o.READY,this._handleReady.bind(this)).subscribe(o.FAILED,this._handleFailed.bind(this)).subscribe(o.MOUSE_OVER,this._handleMouseIn.bind(this)).subscribe(o.MOUSE_OUT,this._handleMouseOut.bind(this)).subscribe(s.IMAGES_SELECTED,this._handleSelected.bind(this));this._timeout=function(){if(!this._isReady)this._flashError(o.ERROR_FLASH_LOAD_TIMEOUT);}.bind(this).defer(p.flashLoadTimeout);ca.logDetailed&&this.logDetailed();}u(z.prototype,h,{logDetailed:function(){r.sendSignal({qn:this._waterfallID,step:r.VERSION,uploader:r.APP_FLASH,version:m.getVersion().join('.')});if(i.isSupported()){r.sendSignal({qn:this._waterfallID,step:r.ASYNC_AVAILABLE,uploader:r.APP_FLASH});if(j.isSupported())r.sendSignal({qn:this._waterfallID,step:r.RESIZER_AVAILABLE,uploader:r.APP_FLASH});}},_handleReady:function(aa){y(this._button,v(this._swfID));x(this._button);this._isReady=true;clearTimeout(this._timeout);g.inform(s.READY,{divID:this._swfID},g.BEHAVIOR_PERSISTENT);},_handleFailed:function(aa){this._flashError(o.ERROR_FLASH_LOAD_FAILURE);},_flashError:function(aa){if(this._fallbackHref){var ba=t(this._fallbackHref).addQueryData({error:aa}).toString();this._button.removeAttribute('rel');this._button.removeAttribute('ajaxify');this._button.setAttribute('href',ba);x(this._button);}},_handleMouseIn:function(aa){k.addClass(this._button,'selectOver');},_handleMouseOut:function(aa){k.removeClass(this._button,'selectOver');},_handleSelected:function(aa){var ba;if(aa.files){ba=aa.files;}else{ba=[{uploadID:aa.divID+'.'}];ba.length=aa.count;}this.inform(l.SELECTED,{sender:this,files:ba},g.BEHAVIOR_PERSISTENT);}});e.exports=z;});
__d("UploadSession",["AsyncRequest","FilePickerEvent","PhotosUploadWaterfall","copyProperties"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('FilePickerEvent'),i=b('PhotosUploadWaterfall'),j=b('copyProperties'),k={};function l(n){this._sessionID=n;this._asyncBootstrapped=false;this._controller=null;this._overlay=null;this._pickers=[];this._pendingFileLists=[];}function m(n){if(!k[n])k[n]=new l(n);return k[n];}l.addFilePickerToSession=function(n,o){m(n).addFilePicker(o);};l.addControllerToSession=function(n,o){m(n).addController(o);};l.addOverlayToSession=function(n,o){m(n).addOverlay(o);};j(l.prototype,{addFilePicker:function(n){if(!this._pickers.contains(n)){this._pickers.push(n);n.subscribe(h.SELECTED,function(o,p){if(this._controller){this._controller.uploadFiles(p.files);}else this._pendingFileLists.push(p);if(this._asyncBootstrapped)return;var q=n._button;g.bootstrap(q.getAttribute('ajaxify'),q);this._asyncBootstrapped=true;}.bind(this));}},addController:function(n){this._controller=n;this._asyncBootstrapped=true;if(this._pendingFileLists.length){var o=[];this._pendingFileLists.forEach(function(q){o=o.concat(q.files);});this._controller.uploadFiles(o);}else if(this._controller.getWaterfallConfig){var p=this._controller.getWaterfallConfig();i.sendSignal({qn:p.waterfallID,step:i.OVERLAY_FIRST,uploader:p.waterfallApp});}},addOverlay:function(n){this._overlay=n;}});e.exports=l;});
__d("legacy:tour",["Tour"],function(a,b,c,d){a.Tour=b('Tour');},3);
__d("ContextualLayerPositionClassOnContext",["CSS","copyProperties","cx"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('copyProperties'),i=b('cx');function j(l){this._layer=l;}function k(l){var m=l.getAlignment(),n=l.getPosition();if(n==='below'){if(m==='left'){return "_nk";}else if(m==='right'){return "_nl";}else return "_nm";}else if(n==='above'){if(m==='left'){return "_nn";}else if(m==='right'){return "_no";}else return "_np";}else if(n==='left'){return "_nq";}else return "_nr";}h(j.prototype,{_subscription:null,_prevClassName:null,enable:function(){this._subscription=this._layer.subscribe('reposition',this._updateClassName.bind(this));if(this._layer.isShown())this._updateClassName();},disable:function(){this._subscription.unsubscribe();this._subscription=null;if(this._prevClassName){g.removeClass(this._layer.getContext(),this._prevClassName);this._prevClassName=null;}},_updateClassName:function(l,m){var n=this._layer.getContext(),o=k(m);if(this._prevClassName===o)return;g.removeClass(n,this._prevClassName);g.addClass(n,o);this._prevClassName=o;}});e.exports=j;});
// initialize
function init() {
	//If in regular browser, show iPhone.png and topbar (see CSS how this is positioned) 
	
	//do this only when caching is off. Caching is only for on the device
	if (caching!="on"){
		if ($(window).height() >= parseInt(targetheight) + 1) {
			if (deviceframe!="none") { 
				$.get("build/includes/css/additional.css", function(data){					   
				$("body").append("<style>"+data+"</style>");
				});
				//Add iPhone frame and iPhonebar
				$("body").append("<span id=\"device\"></span>");
			}
			if (deviceframe=="iphone3") { 
				$.get("build/includes/css/iphone3.css", function(data){					   
					$("body").append("<style>"+data+"</style>");
					});
				//Add iPhone frame and iPhonebar
				$("body").append("<span id=\"iphonebar\"></span>");
			}	 
			if (deviceframe=="iphone4") { 
				$.get("build/includes/css/iphone4.css", function(data){					   
					$("body").append("<style>"+data+"</style>");
					});
				//Add iPhone frame and iPhonebar
				$("body").append("<span id=\"iphonebar\"></span>");
			}	
			if (deviceframe=="torch9800") { 
				$.get("build/includes/css/torch9800.css", function(data){					   
					$("body").append("<style>"+data+"</style>");
					});
			}	  
		}
	}
	//detect swipe and go to page and transition in title	
	$('area').bind("swipe",function(event, info) {
		if (tapReady) {
			direction = info.direction;
			ttarget = ($(this).attr('title'));
			if (ttarget.indexOf("swipe") > -1) {
				doswipe(direction,ttarget);
			}
		}
	});
	//for testing swipe in browser, click and hold area and press (Chrome only at the moment)
	$('area').bind('keydown',function(e){
		if (e.which == 188){
			direction = "left";
			ttarget = ($(this).attr('title'));
			doswipe(direction,ttarget);
		}
		if (e.which == 190){
			direction = "right";
			ttarget = ($(this).attr('title'));
			doswipe(direction,ttarget);
		}
	});
	
	//memory slots m1, m2, m3 enz.
	$('area').bind('tap', function(){
		
		var pagePattern = new RegExp("^m[0-9]+$");
		
		if (pagePattern.test( $(this).attr('title') )){ 
 			window[ $(this).attr('title') ] = "#" + $("div.current").attr('id'); 
		}

		var hrefPattern = new RegExp("^#m[0-9]+$");
		
		if ( hrefPattern.test( $(this).attr("href") ) ){ 
			var pageName = $(this).attr("href");  
			tclass = $(this).attr('class');
			jQT.goTo(window[pageName.substr(1)], tclass); 
		}
		
		
		//keep
		if ($(this).attr('title').indexOf("keep")>=0) {
			$(".current").addClass('keep');
		}
		//remove kept images
		if ($(this).attr('title').indexOf("clear")>=0) {
			$("div").removeClass('keep');
		}
	});

	
	//if the orientation of the device changed, do something with it
	document.body.onorientationchange = (function(){
		rotateto = orientation % 180 == 0 ? 'portrait' : 'landscape';
		rotate(rotateto);
		}
	);	

	//Add class "previous" to current div before animation
	$('body').bind('pageAnimationStart', function(e, info){
		//tremember = ($(".current").attr('id'));
		if (info.direction === "in") {
			window.clearTimeout(autoClose);
			//stop scroll function while animating (good for clean swiping)
			$('body').bind('touchmove', function(e){
				e.preventDefault();
				});
			
			//Against flicker on iPad
			if (prototype == "ipad"){
				$("#jqt div:not(.temp)").addClass("animating");
			}		
		}
	});
	$('body').bind('pageAnimationEnd', function(e, info){
    	if (info.direction === "out") {
			
			//scroll up
			if (hide_address == "on") {
				$('html, body').animate({scrollTop:0}, 'slow');

			}
			//Against flicker on iPad
			if (prototype == "ipad"){
				$('#jqt> #'+ $(".current").attr("id")+"temp").show();
				
				$("#jqt div").removeClass("animating");

				$('#jqt .temp').fadeOut(500, function () {
					//$('#jqt .temp').hide();
				});
			}
			//enable scroll function
			$('body').unbind('touchmove');
			timeout();
			rotate(rotateto);
		}
	});
	
	//Show intro screen if prototyping an app
	if (homescreenmessage=="on") {
		if ($(window).height() == browserheight || $(window).height() == browserheight_l  || $(window).height() == browserheight_iOS5  || $(window).height() == browserheight_l_iOS5 ) {
			//show instructions
			if (showintroscreen=="true") {
				if ($(window).height() > $(window).width()) {
					rotateto="portrait";
				} else {
					rotateto="landscape";	
				}
				if (prototype=="ipad" || prototype=="ipadretina") { 
					if (rotateto=="landscape"){
						$("body").append("<div id=\"introduction\" ><img src=\"build/includes/img/introduction_" + prototype + "_"+ rotateto +".jpg\" alt=\"intro\" width=\"1024px\" height=\"672px\"></div>");
					} else {
						$("body").append("<div id=\"introduction\"><img src=\"build/includes/img/introduction_" + prototype + "_"+ rotateto +".jpg\" alt=\"intro\" width=\"768px\" height=\"928px\"></div>");
						}
				} else {
					$("body").append("<div id=\"introduction\"><img src=\"build/includes/img/introduction_" + prototype + "_"+ rotateto +".jpg\" alt=\"intro\" width=\"356px\" height=\"320px\"></div>");	
				}
			} else {
			alert (introductionmessage);
				}
			$('#jqt').hide();
			}
	} 
	//add "fadefast" transistions to areas without a class/transition
	$("area:not([class])").addClass('fadefast');
	
	if ($("div").height()==browserheight){
		$(this).addClass("exactheight")
		}
	
	//Check if there is an automatic (timeout) transition on the first page
	timeout(StartPage);
	
	//check if in regular browser and if not start with landscape or portrait mode (not in regular browser)
	if (window.navigator.userAgent.indexOf('Mobile') >-1) {
			if (window.innerWidth>window.innerHeight){
				rotateto ="landscape";
			} else {
				rotateto ="portrait";	
			}
			rotate(rotateto);
	}

	//Set start page
	currentPage=StartPage;
	
	//scroll up
	if (hide_address == "on") {
		$('html, body').animate({scrollTop:0}, 'slow');
	}
	
	//Shortcuts
	$('body').bind('keydown',function(e){ 
		//Rotate device in browser by clicking left or right arrow
		if ((e.which == 37)||(e.which == 39)){
			browserrotate();
		}  	
		//shortcut to the build page (press b)
		if (e.which == 66){
			 window.location = "build/index.php";
		} 	
	});
	
	//Enable rotation in regular browser by clicking on th edevice
	$('#device').click(function() {
		browserrotate();
	});
	//Against flicker on iPad: Set up a bunch of new divs that are overlay the current div. 
	if (prototype == "ipad"){
		$('#jqt > div').clone().appendTo($('#jqt')).addClass('temp').removeClass('current').attr('id', function(){ return $(this).attr('id')+'temp'});
		$('#jqt .temp').css('display','none');
	}
} 

//Edited by Sebastian, longer array for up and down swipes
function doswipe(direction,ttarget){
	
	//scrollTo(0,0);
	var exploded = ttarget.split(',');
	var thref1 = "#"+exploded[1];
	var tclass1 = exploded[2];
	var thref2 = "#"+exploded[4];
	var tclass2 = exploded[5];
	var thref3 = "#"+exploded[7];
	var tclass3 = exploded[8];
	var thref4 = "#"+exploded[10];
	var tclass4 = exploded[11];
	
	if (exploded[0] .indexOf(direction) >= 0) {
		jQT.goTo(thref1, tclass1);
	}
	if (exploded[3]){
		if (exploded[3] .indexOf(direction) >= 0) {
			jQT.goTo(thref2, tclass2);
		}
	}
	if (exploded[6]){
		if (exploded[6] .indexOf(direction) >= 0) {
			jQT.goTo(thref3, tclass3);
		}
	}
	if (exploded[9]){
		if (exploded[9] .indexOf(direction) >= 0) {
			jQT.goTo(thref4, tclass4);
		}overzov
	}	
}


function browserrotate(){
	if ($("body").attr('class')==='portrait') {
			rotateto="landscape"
			} else {
			rotateto="portrait"
		}	
		rotate(rotateto);
	}

//function to show another page when rotating
function rotate(rotateto) {
	
	//set the body class to the right orientation
	$("body").attr('class',rotateto);
	
	//automatically find page if landscape/portrait version found
	tcurrentid = $(".current").attr('id');
	if (rotateto === "landscape") {
		trotateid = tcurrentid + "_l";
		if ($("div[id="+trotateid+"]").length != 0) {
			jQT.goTo("#"+trotateid, "fadefast");
			return false;
		}
	}
	if (rotateto === "portrait") {
		if (tcurrentid.lastIndexOf("_l") === (tcurrentid.length - 2)) {
			trotateid = tcurrentid.slice(0, -2);
			if ($("div[id="+trotateid+"]").length != 0) {	
				jQT.goTo("#"+trotateid, "fadefast");
				return false;
			}
		}
	}
	
	//If rotate target landscape is found (I changed target (In FW) to title)
	$(".current area[title*='landscape']").each(function(i) {
		if (rotateto === "landscape") {
			var thref = $(this).attr('href');
			var tclass = $(this).attr('class');
			jQT.goTo(thref, tclass);
			return false;
		}
    });
	//If rotate target portrait is found
	$(".current area[title*='portrait']").each(function(i) {
		if (rotateto === "portrait") {
			var thref = $(this).attr('href');
			var tclass = $(this).attr('class');
			jQT.goTo(thref, tclass);
			return false;
		}
    });
}

//function to go to a different page after a timeout
function timeout() {
    window.clearTimeout(autoClose);
    $(".current area[title*='timeout']").each(function(i) {
        var ttarget = $(this).attr('title');
		var thref = $(this).attr('href');
		var tclass = $(this).attr('class');
        var tindex = ttarget.split('=');
        if (tindex.length && (tindex[0] === 'timeout')) {
			autoClose = window.setTimeout(
            function() {
               jQT.goTo(thref, tclass);
            }, tindex[1]);
        }
    });
	return false;
}
//Make JQtouch work
var jQT = new $.jQTouch({
	//slideleftSelector: 'area.slide',
	useFastTouch: true
});
var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

jQuery(document).ready(function($){

	/*comportement du menu en tablette*/
	var ua = navigator.userAgent.toLowerCase();
	var istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|touch|tablet|kindle/i.test(ua));
	//alert(ua);
	
	// if (istablet) {
		//alert ("je suis une tablette !");
		//var event = (ua.match(/(iphone|ipod|ipad)/)) ? "touchstart" : "click";
		
		$('#mainmenu li.deeper.first').addClass('selected');
		//clic sur un onglet
		$('#mainmenu > .parent > a').click(function() {
			//masque les autres onglets
			$(this).parent().siblings().children('a').removeClass('sfhover');
			$(this).parent().siblings().removeClass('sfhover');
			//$(".sfhover").removeClass('sfhover');
			
			$(this).toggleClass('sfhover','');
			if ( $(this).hasClass('sfhover') ) {
				//affiche le sous-menu
				$(this).parent(".parent").addClass('sfhover');
			}
			
			//clic sous-menu
			if ( $(this).parent("li").hasClass("parent") &&  $(this).hasClass('sfhover') ) {
				return false;
			}else{
				return true;
			}
		
		});	
		
		// clic sur une entrée du sous-menu
		$('#mainmenu > .parent > ul > .deeper > a').click(function() {
			if ( !$(this).parent('li').hasClass('selected') ) {
				$(this).parent('li').siblings().removeClass('selected');	
				$(this).parent('li').toggleClass('selected');
			}
			return false;
		});	
		
		// clic en dehors du menu pour masquer le sous-menu	
		$('html,.headerbis,.content,#mainmenu').click(function() {
			$(".sfhover").removeClass('sfhover');
		});


	//}


});

}
/*
     FILE ARCHIVED ON 06:46:27 Mar 04, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:39:26 Jul 05, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  PetaboxLoader3.resolve: 59.86 (2)
  LoadShardBlock: 154.237 (3)
  esindex: 0.01
  RedisCDXSource: 3.49
  captures_list: 185.368
  CDXLines.iter: 23.124 (3)
  exclusion.robots.policy: 0.142
  PetaboxLoader3.datanode: 102.881 (4)
  exclusion.robots: 0.152
  load_resource: 80.092
*/
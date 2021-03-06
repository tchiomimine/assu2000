// comportement du menu en mobile
jQuery.noConflict();

jQuery(document).ready(function($){
		
function getScrollY() {
  var scrOfY = 0;
  if( typeof(window.pageYOffset) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
  } else if(document.body && document.body.scrollTop) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
  } else if(document.documentElement && document.documentElement.scrollTop) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
  }
  return scrOfY;
}
		
	//swipe tactile
	$('.home #page').on('swiperight',function(e) {
		$('.menumobile').css('top',getScrollY());	
		$('.headerbis, .content, .footer').animate({left:'272px'},800);	
		$('#form_box_locator .lf_geoloc').animate({left:'436px'},800);	
	});
	$('.home .menumobile').on('swipeleft', function(e) {  
		$('.headerbis, .content, .footer').animate({left:'0px'},800);
		$('#form_box_locator .lf_geoloc').animate({left:'58%'},800); 
	});
	$('.home #page, .home .menumobile').on('movestart', function(e) {
		// si on scroll on desactive le swipe
		if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
			e.preventDefault();
		}
	});
	
	//clic sur menu transverse	
	$('.headerbis .menu_haut > li').click(function() {
		//ouverture/fermeture du sous menu
		$('.menumobile').css('top',getScrollY());
		$('.headerbis, .content, .footer').animate({left:'272px'},800);	
		$('#form_box_locator .lf_geoloc').animate({left:'436px'},800);		
		/*$('.menu_haut').animate({right:'210px'},1500);	*/		
	});	
	$('.menumobile .menu_haut').click(function() {
		//ouverture/fermeture du sous menu
		$('.headerbis, .content, .footer').animate({left:'0px'},800);
		$('#form_box_locator .lf_geoloc').animate({left:'58%'},800); 
		/*$('.menu_haut').animate({right:'-40px'},1500);	*/	
	});	
	$('.menumobile .menu_haut .first').click(function() {
		$('.menumobile').css('top','0');		
	});	
	
	
	//clic sur menu transverse	v2
	$('.headerbis .menu_hautv2 > li, .home_v2 .content > .menumobile .menu > li > ul > li > a, .home_v2 #headerv2 li.last').click(function() {
		//ouverture/fermeture du sous menu
		$('.menumobile').toggleClass('show','');
		$('..headerbis .menu_hautv2 > li').toggleClass('active','');
		var htmloverflowy = $('html').css('overflow-y');
		if(htmloverflowy == 'hidden') {
			$('html').css('overflow-y', 'scroll');
		} else {
			$('html').css('overflow-y', 'hidden');
		}
		
		/*$('.menumobile').css('top',getScrollY());
		$('.headerbis, .content, .footer').animate({left:'272px'},800);	
		$('#form_box_locator .lf_geoloc').animate({left:'436px'},800);		
		$('.menu_haut').animate({right:'210px'},1500);	*/		
	});	
	$('.menumobile .menu_hautv2').click(function() {
		//ouverture/fermeture du sous menu
		/*$('.headerbis, .content, .footer').animate({left:'0px'},800);
		$('#form_box_locator .lf_geoloc').animate({left:'58%'},800); 
		$('.menu_haut').animate({right:'-40px'},1500);	*/	
	});	
	$('.menumobile .menu_hautv2 .first').click(function() {
		//$('.menumobile').css('top','0');		
	});	
	
	$('.lf_storeLocatorWidget h3').click(function() {
		//ouverture/fermeture du module agence
		$('#introsearch').toggle();	
		$('.lf_storeLocatorWidget input').toggle();		
	});
	
	//remplacement de tous les liens callback et d??clenchement de son ouverture
	$('a:contains("Parler ?? un conseiller")').each(function(){$(this).attr("href","#etrerappele"); $(this).addClass("liencallback");});
	
	$('.liencallback').click(function() {
		$('.callback label').css("display","inline");
		$('.callback fieldset').css("display","block");
	});
	
	$('.callback h3').click(function() {
		//ouverture/fermeture du module callback
		$('.callback label').toggle();	
		$('.callback fieldset').toggle();		
	});

	
	//menu produit
	$('#mainmenu a.onglet, #mainmenu .div_inter').click(function() {
		//masque les autres onglets
		$(this).parent().siblings().removeClass('onselect');
		$(this).parent().siblings().children("ul").css("display","none");
		//ouverture/fermeture du sous menu	
		$(this).parent(".parent").toggleClass('onselect','');
		$(this).parent(".parent").children("ul").toggle();
		return false;
	});	
	
});

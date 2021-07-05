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
	$('#page').on('swiperight',function(e) {
		$('.menumobile').css('top',getScrollY());	
		$('.headerbis, .content, .footer').animate({left:'272px'},800);	
		$('#form_box_locator .lf_geoloc').animate({left:'436px'},800);	
	});
	$('.menumobile').on('swipeleft', function(e) {  
		$('.headerbis, .content, .footer').animate({left:'0px'},800);
		$('#form_box_locator .lf_geoloc').animate({left:'58%'},800); 
	});
	$('#page, .menumobile').on('movestart', function(e) {
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
	
	$('.lf_storeLocatorWidget h3').click(function() {
		//ouverture/fermeture du module agence
		$('#introsearch').toggle();	
		$('.lf_storeLocatorWidget input').toggle();		
	});
	
	//remplacement de tous les liens callback et déclenchement de son ouverture
	$('a:contains("Parler à un conseiller")').each(function(){$(this).attr("href","#etrerappele"); $(this).addClass("liencallback");});
	
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

	//accordeon blocs page contact
	$('.item-page.contact p.titre ').on('click', function(){
		blocinfocontact = $(this).parent();
		$(this).next().slideToggle();
		blocinfocontact.toggleClass('open');
	});
	$('.item-page.contact .infocontact.assistance').toggleClass('open');
	
});

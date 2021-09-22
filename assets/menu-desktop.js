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
		
		// clic sur une entr�e du sous-menu
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
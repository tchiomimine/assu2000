	function readCookie(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function setCookie(c_name,value,exdays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value+"; path=/";
	}
	
	function PrmUrl() {
		var prm = new Array();
		var tmp = unescape(window.location.search).substr(1).split("&");
		var inter;
		for ( i=0; i<tmp.length; i++) {
			inter=tmp[i].indexOf("=");
			if ( inter>=0 ) {
				prm[tmp[i].substr(0,inter)]=tmp[i].substr(inter+1)
			} else {
				prm[tmp[i]]="";
			}
		}
		return prm;
	}
	
	/*Chargement devis*/
	function buildSrcAll() {
		var src = document.getElementById('iframe').src ;
		var reload = 0;
		if (src.indexOf("/chargement-emailing-auto.html")>=0){
		src="https://"+window.location.hostname+"/proxidirect/recherche/pages/recherche.do?";
		reload = 1;
		} else if(src.indexOf("/chargement-emailing-moto.html")>=0){
		src="https://"+window.location.hostname+"/proxidirect/recherche/pages/recherche.do?";
		reload = 1;
		} else if(src.indexOf("/chargement-emailing-mrh.html")>=0){
		src="https://"+window.location.hostname+"/proxidirect/recherche/pages/recherche.do?";
		reload = 1;
		} else if(src.indexOf("/chargement-emailing-sante.html")>=0){
		src="https://"+window.location.hostname+"/proxidirect/recherche/pages/recherche.do?";
		reload = 1;
		} else if(src.indexOf("/chargement-emailing-animal.html")>=0){
		src="https://"+window.location.hostname+"/proxidirect/recherche/pages/recherche.do?";
		reload = 1;
		} else if(src.indexOf("/chargement-devis.html")>=0){
		src="https://"+window.location.hostname+"/proxidirect/recherche/pages/recherche.do?";
		reload = 1;
		}
		
		var cookieapporteur=readCookie("apporteur");
		if ( window.location.search ) {	
			var $_GET=PrmUrl(); // param??tres dans l'URL
			var site=$_GET["site"];
			if(src.indexOf("site=default") < 0) {
				if((site=="")||(typeof(site)=='undefined') ){  
					src = src + "&site=default";
				}
					src = src + "&" +unescape(window.location.search).substr(1) ; 
			}
			var marque=$_GET["marque"];
			if (src.indexOf("&marque=ASSU2000") < 0 ) {
				if((marque=="")||(typeof(marque)=='undefined')){ 
					  src = src + "&marque=ASSU2000";
				} else if(marque!=""){ src = src.replace(marque,marque.toUpperCase()); }
			}
			
			var apporteur=$_GET["app"];			
			if((apporteur!="") && (typeof(apporteur)!='undefined')){ 
				/*if(src.indexOf("&app=") < 0) {
					src = src.replace('app','codeApporteur');
				}else{*/
					src = src + "&codeApporteur=" + apporteur ;	
				//}
			} 
			var codePostal=$_GET["codePostal"];
			if((codePostal!="") && (typeof(codePostal)!='undefined')){
				src = src + "&codePostal=" + codePostal ;
			}
			var express=$_GET["express"];
			if((express!="") && (typeof(express)!='undefined')){
				if (src.indexOf("express=") < 0 ) {
					src = src + "&express=" + express ;
				} else {
					src = src.replace("&express=true",'');
					src = src.replace("&express=false",'');
					src = src + "&express=" + express ;
				}
			}
			reload = 1;
		}else{
			if(cookieapporteur!='undefined' && cookieapporteur!='' && cookieapporteur!=null) {
				src = src + "&codeApporteur=" + cookieapporteur ;
				reload = 1;
			}
		}	
		if(reload == 1) {
			document.getElementById('iframe').src=src ;
		}
	}

jQuery(document).ready(function($){
	/*espace client*/	 
	/*if (readCookie('utilisateurConnecte') == 'yes') {
		var loc = window.location.pathname;
		var result = loc.indexOf('Proximeo');
		$('a.espaceperso').attr('href','/Proximeo/accueil.do');
		if (result>0) {
			$('#menu663').hide();
			$('#menu689').show();
			$('#menu1092').hide();
			$('#espace li a').attr('href','#');
		}else{
			$('#menu689').hide();
			$('#menu663').hide();
			$('#menu1092').show();
			$('#espace a').attr('href', function(i,attr){return 'http://'+location.hostname+attr});
			/*page contact
			var element = $('.client-connecte');
			if(element.length){
				$('.client-connecte').show();
				$('.client-non-connecte').hide();
			}
		}
	}else{
		$('#menu663').show();
		$('#menu1092').hide();
		$('#menu689').hide();
		$('#espace a').attr('href','/espace-personnel');
		$('a.espaceperso').attr('href','/espace-personnel');
	}*/
	if (readCookie('utilisateurConnecte') == 'yes') {
		var loc = window.location.pathname;
		var result = loc.indexOf('Proximeo');
		if (result>0) {
			$('#Espace_personnel').html('<a class="espaceperso" href="/Proximeo/deconnexion.do">Se d??connecter <span id="contact_picto"></span></a>');
			$('li.item1279 a').attr("href", "/Proximeo/deconnexion.do");
		}else{
			$('#Espace_personnel').html('<a class="espaceperso" href="/Proximeo/accueil.do">Connect?? <span id="contact_picto"></span></a>');
			$('li.item1279 a').attr("href", "/Proximeo/accueil.do");
		}
	}else{
		$('#Espace_personnel').html('<a class="espaceperso" href="/espace-personnel">Espace Personnel <span id="contact_picto"></span></a>');
		$('li.item1279 a').attr("href", "/espace-personnel");
	}
		
	// pour le template client-login
	if (document.location.href.indexOf('connexionProspect') > -1 ) {
		$('#onglet_devis').show();
		$('#onglet_client').hide();
	}else{
		$('#onglet_devis').hide();
		$('#onglet_client').show();
	}
	
	//pour les num??ros de t??l??phone
	if (readCookie('deviceview') != 'smartphone') {
		$('a.tel').removeAttr('href');
		$('a.tel').attr('title','');
		$('a.tel').css('cursor','default');
		$('a.tel').css('text-decoration','none');
	}
	
	/* APPORTEUR */
	var $_GET=PrmUrl();
	if ($_GET['app'] != undefined && $_GET['app'] != '' ) { 
		if ( readCookie('apporteur') != $_GET['app'] ) {
			setCookie('apporteur', $_GET['app'], 3);
		}
	}
	
	/*nouvelles pages produits*/
		/* info bulle */
		$('.bulle').hide();
		$('.hasTip').click(function(){
			$(this).parent().siblings().find('.bulle').hide();
			$(this).parent().parent().parent().parent().siblings().find('.bulle').hide();
			$(this).parent().parent().parent().siblings().find('.bulle').hide();
			$(this).parent().siblings().find('.hasTip').css('z-index','1');
			$(this).css('z-index','9999');
			$(this).children('.bulle').toggle();
			return false;
		});
		
		/* nav */
		if($('#nav').length){
        $('#nav').find('> li a').click( function () {
            $(this).parent().addClass( 'active' ).siblings().removeClass( 'active' );
            $('#garanties > div').hide().filter(this.hash).show();
            return false;
        });
		}
		/* slider */
	if($('#slide').length){
		$('.offre #slider #slide .listeformule .formule1').css('background-position','left bottom');
		$("#slider.step3 #slide").slider({
				range:"min",
				min: 1,
				value: 1,
				slide: function( event, ui ) {
					if(ui.value > 50){$('.offre #slider #slide .listeformule .formule2').addClass("actif");}
					if(ui.value > 97){$('.offre #slider #slide .listeformule .formule3').addClass("actif");}					
					if(ui.value < 50){$('.offre #slider #slide .listeformule .formule2').removeClass("actif");}
					if(ui.value < 97){$('.offre #slider #slide .listeformule .formule3').removeClass("actif");}
				},				
				stop: function( event, ui ) {
					if(ui.value < 26){
						$(this).slider( "option", "value", 1 );
						$( ".t" ).addClass("actif");
						$( ".tc, .tvi, .tr" ).removeClass("actif");}
					if(ui.value > 25 && ui.value < 75){
						$(this).slider( "option", "value", 50 );
						$( ".t, .tr" ).removeClass("actif");
						$( ".tvi, .tc" ).addClass("actif");}
					if(ui.value > 74){
						$(this).slider( "option", "value", 100 );
						$( ".tvi, .tc, .tr" ).addClass("actif");
						$( ".t, .titreformules .formule2" ).removeClass("actif");
						}
				}
			});
			$("#slider.step2 #slide").slider({
				range:"min",
				min: 1,
				value: 1,
				slide: function( event, ui ) {					
					if(ui.value < 85){$('.offre #slider #slide .listeformule .formule3').removeClass("actif");}					
				},				
				stop: function( event, ui ) {
					if(ui.value < 50){
						$(this).slider( "option", "value", 1 );
						$( ".t" ).addClass("actif");
						$( ".tc, .tr" ).removeClass("actif");}					
					if(ui.value > 50){
						$(this).slider( "option", "value", 100 );
						$( ".tc, .tr" ).addClass("actif");
						$( ".t" ).removeClass("actif");
						}
				}
			});
			$("#slider.step4 #slide").slider({
				range:"min",
				min: 1,
				value: 1,
				slide: function( event, ui ) {
					if(ui.value > 32){$('.offre #slider #slide .listeformule .formule2').addClass("actif");}
					if(ui.value > 67){$('.offre #slider #slide .listeformule .formule3').addClass("actif");}			
					if(ui.value > 95){$('.offre #slider #slide .listeformule .formule4').addClass("actif");}					
					if(ui.value < 33){$('.offre #slider #slide .listeformule .formule2').removeClass("actif");}
					if(ui.value < 67){$('.offre #slider #slide .listeformule .formule3').removeClass("actif");}
					if(ui.value < 95){$('.offre #slider #slide .listeformule .formule4').removeClass("actif");}
				},				
				stop: function( event, ui ) {
					if(ui.value < 16){
						$(this).slider( "option", "value", 1 );
						$( ".t" ).addClass("actif");
						$( ".tc, .tbdg, .tr" ).removeClass("actif");}
					if(ui.value > 15 && ui.value < 51){
						$(this).slider( "option", "value", 32 );
						$( ".t, .tr, .formule3" ).removeClass("actif");
						$( ".tc, .tbdg" ).not('.formule3').addClass("actif");}
					if(ui.value > 50 && ui.value < 86){
						$(this).slider( "option", "value", 67 );
						$( ".tc, .tbdg" ).addClass("actif");
						$( ".t, .titreformules .formule2, .tr" ).removeClass("actif");
						}
					if(ui.value > 85){
						$(this).slider( "option", "value", 100 );
						$( ".tc, .tr, .tbdg" ).addClass("actif");
						$( ".t, .titreformules .formule2, .titreformules .formule3" ).removeClass("actif");
						}
				}
			});
			$("#slide a").html("<span></span>");
			$(".titreformules .formule1").click(function() {
				$("#slide").slider("value", 1 );
				$( ".t" ).addClass("actif");
				$( ".tc, .tbdg, .tr" ).removeClass("actif");
			});
			$("#slider.step3 .titreformules .formule2").click(function() {
				$("#slide").slider("value", 50 );
				$( ".t, .tr" ).removeClass("actif");
				$( ".tc" ).addClass("actif");
			});
			$("#slider.step4 .titreformules .formule2").click(function() {
				$("#slide").slider("value", 32 );
				$( ".t, .tr, .formule3" ).removeClass("actif");
				$( ".tc, .tbdg").not('.formule3').addClass("actif");
			});
			$("#slider.step4 .titreformules .formule3").click(function() {
				$("#slide").slider("value", 67 );
				$( ".t, .tr" ).removeClass("actif");
				$( ".tc" ).addClass("actif");
				$( "#slider.step4 .titreformules .formule2").removeClass("actif");
			});
			$("#slider.step3 .titreformules .formule3, #slider.step2 .titreformules .formule2, #slider.step4 .titreformules .formule4").click(function() {
				$("#slide").slider("value", 100 );
				$( ".tc, .tr" ).addClass("actif");
				$( ".t, #slider.step3 .titreformules .formule2, #slider.step4 .titreformules span" ).not('.formule4').removeClass("actif");
			});
	}
	
	if(!$('#tableau2').length) {
		/*tableau de garanties v1*/
		$('#garanties .details').addClass('ferme'); 
		$('.nomgroupe .col-puce').html('+');
		
		$('.nomgroupe, .details').hover( function() {
			$( this ).css('cursor', 'pointer');	
		});
	
		/*$('#groupe1 .col-puce').html('-');
		$('.groupe1.details').toggleClass('ferme');	*/
	
		
		$('.details').click(function() {
			nomgroupe = $(this).parent().children('.nomgroupe').attr('id');	 
			$('.'+nomgroupe+'.details').toggleClass('ferme');
			$('.'+nomgroupe+'.resume').toggleClass('ferme'); 		 
			 
			puce = $('#'+nomgroupe+' .col-puce');
			if( puce.text()=='+' ){
				puce.html('-');
				puce.attr('rowspan',$('.'+nomgroupe+'.details').length+1);
			}else{
				puce.html('+');
				puce.attr('rowspan',1);
			} 
		});	
			
		$('.nomgroupe').click(function() {
			nomgroupe = $(this).attr('id');
			$('.'+nomgroupe+'.details').toggleClass('ferme');
			$('.'+nomgroupe+'.resume').toggleClass('ferme'); 		 
			 
			puce = $('#'+nomgroupe+' .col-puce');
			if( puce.text()=='+' ){
				puce.html('-');
				puce.attr('rowspan',$('.'+nomgroupe+'.details').length+1);
			}else{
				puce.html('+');
				puce.attr('rowspan',1);
			} 
		});	 
	} // end else ($('.tableau').length) 
	
	
	// quand on atteint le top timeline est ??gale ?? 0 on remonte la liste des ancres
	if ($('#timeline').length) {
			$(window).scroll( function() {
				if ($(window).scrollTop() > $('#timeline').offset().top-120){
					$('#timeline-anchor').addClass('floating', {duration:500});
				}else{
					$('#timeline-anchor').removeClass('floating', {duration:500});
				}
			} );
	}

	$('#cd-vertical-nav a').on('click', function(){
		$('#cd-vertical-nav a').removeClass('is-selected');
		$(this).addClass('is-selected');
	});

	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	contentSections.attr("id", function(i){
		i++;
		return 'section' + i;
	});

	navigationItems.on('click', function(event){
		event.preventDefault();
		smoothScroll($(this.hash));
	});
	//smooth scroll to second section
	$('.cd-scroll-down').on('click', function(event){
		event.preventDefault();
		smoothScroll($(this.hash));
	});

	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
		if($(document).width() > 767) {
			var pixelPoint = 80;
		} else if($(document).width() <= 767) {
			var pixelPoint = 50;
		}


		$('body,html').animate(
			{'scrollTop':target.offset().top - pixelPoint},
			600
		);
	}

	$('.contact .infocontact h3').on('click', function(){
		blocinfocontact = $(this).parent();
		$(this).next().slideToggle();
		blocinfocontact.toggleClass('open');
	});

	$('.cd-nav-trigger').on('click', function(){
		$('#cd-vertical-nav').toggleClass('open');
	});
	// close navigation on touch devices when selecting an element from the list
	$('#cd-vertical-nav a').on('click', function(){
		$('#cd-vertical-nav').removeClass('open');
	});

});

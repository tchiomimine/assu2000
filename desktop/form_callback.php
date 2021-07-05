<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>RAPPEL Imm&eacute;diat et gratuit</title>
<meta name="robots" content="noindex, nofollow">
<script type="text/javascript">
var bloc=false;function blocage(){bloc=true;}
var largeur="550";var hauteur="350";function openwcb(url) {window.open(url+"?"+window.location,"popup","width="+largeur+",height="+hauteur+",top=5,left=5,toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no");}
function remwcb(url) {if (!bloc) openwcb('WCB/index.htm');}
function ValidSaisieNombre(champ){var chiffres = new RegExp("[0-9]"); var verif;
   for(i=0; i<champ.value.length; i++)
   {  verif = chiffres.test(champ.value.charAt(i));if(verif == false){champ.value = champ.value.substr(0,i) + champ.value.substr(i+1,champ.value.length-i+1); i--;} }}
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
function checkwcb(form,type) {$_GET=PrmUrl();form.MAILAGENCE.value = $_GET["lib"];form.ANNONCEUR.value = $_GET["annonceur"];var messageErreur=""; 
if (isNaN(form.TELEPHONE.value) || form.TELEPHONE.value.length != 10 || form.TELEPHONE.value.substr(0,1)!="0" || form.TELEPHONE.value.substr(1,1)=="0")
	{messageErreur += '- Num\351ro de t\351l\351phone erron\351.\n';}
if(form.TELEPHONE.value.substr(0,4)=='0899'){messageErreur+= '- D\351sol\351, nous ne rappelons pas les num\351ros surtax\351s.\n'; }
if (messageErreur != "") {alert(messageErreur);	return false;}
return true;}
</script>
<script src="/templates/accueil/js/jquery-1.7.2.min.js" type="text/javascript"></script>
<link type="text/css" rel="stylesheet" href="/dyn/popup_callback.css" />
</head>

<body>
<script>

jQuery(document).ready(function ($) {
    $("#form_callback").submit(function(){
	$_GET=PrmUrl();
	var parameters = {TELEPHONE:$('#TELEPHONE').val(),ANNONCEUR: $_GET["annonceur"],MAILAGENCE:$_GET["lib"]};	
	$.ajax({
			url : '/dyn/client_callback.php',
			type: "POST",
			data: parameters,
			dataType:"html",
			beforeSend: function(){ 
			$('#contenu').html('<div style="color:#6d6a63;" class="message">Demande en cours...</div><img width="1" height="1" alt="" src="http://logi4.xiti.com/hit.xiti?s=291820&s2=&p=Demande de rappel Immediat&di=&" >');},
			success : function(data){ $('#contenu').html(data);},
			error : function(data){ $('#contenu').html(data);}
		});
		return false;
	});
	
});
</script>
<div id="integre">
	<form  method="post" action="/dyn/client_callback.php" name="formWCB" id="form_callback">
	  <input type="hidden" value="" name="Open">
    <p id="contenu" class="texte">Vous souhaitez &ecirc;tre rappel&eacute; <font color="#009d9c"><strong>Immédiatemment</strong></font> ?</p>
	  <input type="hidden" value="1" name="POPUP">
	  <input type="hidden" value="" name="MAILAGENCE">
      <input type="hidden" value="" name="ANNONCEUR">
      <div id="bloc" class="texte"><p>Inscrivez votre téléphone puis validez.</p><input type="text" class="txt" onkeyup="ValidSaisieNombre(this)" id="TELEPHONE" name="TELEPHONE"></div>
      <div id="btValider"><input type="submit" class="ok" alt="Valider" src="/dyn/images/valider_callback.gif" name="image" value=" "></div>
  </form>
 </div>
<script type="text/javascript">
<!--
xtnv = document;        //parent.document or top.document or document         
xtsd = "http://logi4";
xtsite = "291820";
xtn2 = "";        // level 2 site 
xtpage = "Demande de rappel Immediat";        //page name (with the use of :: to create chapters)
xtdi = "";        //implication degree
//-->
</script>
<script type="text/javascript" src="/xtclicks.js"></script>
<script type="text/javascript" src="/xtcore.js"></script>
<noscript>
<img width="1" height="1" alt="" src="http://logi4.xiti.com/hit.xiti?s=291820&s2=&p=Demande de rappel Immediat&di=&" >
</noscript> 
</body>
</html>

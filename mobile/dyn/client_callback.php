<?php

define('_JEXEC', 1);
define('JPATH_BASE', '.' );
define('DS', DIRECTORY_SEPARATOR);

//error_reporting(0);
$idGroupe_rct = 'GRPTEL0';
$idGroupe_prd = 'GRPTEL1';
$debug = 0;
$maintenance = 0;

$errorTel = 'Erreur: Votre num&eacute;ro de t&eacute;l&eacute;phone est incorrect. Veuillez ressaisir votre num&eacute;ro.';

$error_webserv['ALL_LINE_BUSY']='Tous nos conseillers sont occup&eacute;s. Merci de r&eacute;essayer ult&eacute;rieurement.';
$error_webserv['HORS_HORAIRE']="Ce service n'est disponible qu'entre 9h30 et 19h du lundi apr&egrave;s-midi au samedi matin. Un mail a &eacute;t&eacute; envoy&eacute; afin de prendre en charge votre demande d&egrave;s l'ouverture du service.";
$error_webserv['HORS_HORAIRE_MAIL_ERROR']="Ce service n'est disponible qu'entre 9h30 et 19h du lundi apr&egrave;s-midi au samedi matin. Merci de r&eacute;essayer d&egrave;s l'ouverture du service.";

$msgReussite = 'Votre demande a &eacute;t&eacute; prise en compte.';
$thanksTextColor = '#3FB93F';
$errorTextColor = '#FF0000';

if (strpos($_SERVER['SERVER_NAME'], 'recette') !== false) {
	$idGroupe=$idGroupe_rct;
	$pre_sujet_mail = "[TEST en interne] ";
	$suffix = "_rct";
	$destinataires = "mdavid@assu2000.fr";
}else {	 
	$idGroupe=$idGroupe_prd;
	$pre_sujet_mail = "";	
	$suffix = "";
	$destinataires = $_POST['MAILAGENCE'].'@assu2000.fr';
}
$webservicepath = 'http://'.$_SERVER['SERVER_NAME'].'/Proximeo/WS/ws-DemandeDeRappel?wsdl'; 
$teltocall = $_REQUEST['TELEPHONE'];

if ($_POST["ANNONCEUR"] == "annonces-jaunes")
	$provenance ="Annonces jaunes";
else
	$provenance = "ASSU 2000" .$pre_sujet_mail;

require_once (dirname(__FILE__).DS.'modules'.DS.'mod_callback'.DS.'helper.php');

$htmlresult = modWebcallBackHelper::appelCallback($webservicepath, $provenance, $idGroupe, $errorTel, $error_webserv, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $teltocall);

 
if($maintenance) {
	echo "<div class=\"message\"> Votre demande a bien &eacute;t&eacute; prise en compte.</div>";
} else {
	if(isset($_POST['TELEPHONE'])){
 echo stripslashes($htmlresult);}
}

	?>
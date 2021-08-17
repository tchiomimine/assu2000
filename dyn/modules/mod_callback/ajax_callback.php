<?php
define('_JEXEC', 1);
define( '_VALID_MOS', 1 );
define('JPATH_BASE', '../..' );
define('DS', DIRECTORY_SEPARATOR);	
session_start();

/*require_once ( JPATH_BASE .DS.'includes'.DS.'defines.php' );
require_once ( JPATH_BASE .DS.'includes'.DS.'framework.php' );
$mainframe =& JFactory::getApplication('site');

jimport( 'joomla.application.module.helper' );
$monmodule = JModuleHelper::getModule('mod_callback'); 
$moduleParams = new JRegistry();
$moduleParams->loadString($monmodule->params);*/
//print_r( $moduleParams);

//error_reporting(0);
$distribution = $_REQUEST['distrib']?$_REQUEST['distrib']:"avaya";

$idGroupe = $_REQUEST['idGroupe']?$_REQUEST['idGroupe']:"GRPTEL1";
$skillSet_tr = "OB_A2_WCB_STD_0830_2030";

$currentTime = date('H:i');
$morningFirstTime = '06:00';
$morningLastTime = '08:30';
$eveningTime = '20:30';
$currentTime < $morningFirstTime ? $skillSet = "OB_A2_WCB_STD_2030_0559" : $skillSet = $skillSet_tr; // nuit
$currentTime > $eveningTime ? $skillSet = "OB_A2_WCB_STD_2030_0559" : $skillSet = $skillSet_tr; // nuit
(($currentTime < $morningLastTime) && ($currentTime > $morningFirstTime)) ? $skillSet = "OB_A2_WCB_STD_0600_0829" : $skillSet = $skillSet_tr; // matin
$provenance = 'assu';
$debug = 0;
$maintenance = $_REQUEST['maintenance']?$_REQUEST['maintenance']:"0";

$errorTel = 'Erreur: Votre num&eacute;ro de t&eacute;l&eacute;phone est incorrect. Veuillez ressaisir votre num&eacute;ro.';

$error_webserv['ALL_LINE_BUSY']='Tous nos conseillers sont occup&eacute;s. Merci de r&eacute;essayer ult&eacute;rieurement.';
$error_webserv['HORS_HORAIRE']="Ce service n'est disponible qu'entre 9h30 et 19h du lundi apr&egrave;s-midi au samedi matin. Un mail a &eacute;t&eacute; envoy&eacute; afin de prendre en charge votre demande d&egrave;s l'ouverture du service.";
$error_webserv['HORS_HORAIRE_MAIL_ERROR']="Ce service n'est disponible qu'entre 9h30 et 19h du lundi apr&egrave;s-midi au samedi matin. Merci de r&eacute;essayer d&egrave;s l'ouverture du service.";

$msgReussite = 'Votre demande a &eacute;t&eacute; prise en compte.';
$thanksTextColor = '#3FB93F';
$errorTextColor = '#FF0000';
strpos($_SERVER['SERVER_NAME'], 'recette') !== false ? $rootrct = ".recette" : $rootrct = "";
strpos($_SERVER['SERVER_NAME'], 'preprod') !== false ? $rootrct = ".preprod" : $rootrct = "";
$webservicepath = 'http://proximeo'.$rootrct.'.assu2000.fr/Proximeo/WS/ws-DemandeDeRappel?wsdl';
$teltocall = $_REQUEST['telInterloc'];

require_once (dirname(__FILE__).DS.'helper.php');
if($distribution == 'proxi') {
	$htmlresult = modWebcallBackHelper::appelCallback($webservicepath, $provenance, $idGroupe, $errorTel, $error_webserv, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $teltocall);
} else {
	$htmlresult = modWebcallBackHelper::appelCallbackAvaya($provenance, $skillSet, $errorTel, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $teltocall);
}
session_write_close();

if($maintenance) {
	echo "<div class=\"message\" style=\"color:".$errorTextColor."\"> Le service est en maintenance. Merci de renouveler votre demande ultérieurement.</div>";
} else {
	if(isset($_POST['telInterloc'])){
		echo stripslashes($htmlresult);}
	else if(isset($_GET['telInterloc'])){
		echo stripslashes('<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8" /><title>Demande de rappel telephonique | ASSU 2000</title></head><body>'.$htmlresult.'</body></html>');
	}
}
?>

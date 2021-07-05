<?php
define('_JEXEC', 1);
define( '_VALID_MOS', 1 );
define('JPATH_BASE', '../..' );
define('DS', DIRECTORY_SEPARATOR);	
session_start();

//error_reporting(0);
$provenance = 'assu';
$debug = 0;
$maintenance = 0;
$maintenance = $_REQUEST['maintenance']?$_REQUEST['maintenance']:"0";

$errorMail = 'Erreur: Votre email est incorrect. Veuillez ressaisir votre email.';

$msgReussite = '<strong>F&eacute;licitation !</strong> Votre inscription a bien &eacute;t&eacute; prise en compte.';
$thanksTextColor = '#FFFFFF';
$errorTextColor = '#FF0000';
$mailSubscribe = $_REQUEST['mailSuscribe'];


function connectBDD(){
 if (strpos($_SERVER['SERVER_NAME'], 'recette')  !== false) {
  $host = 'mysqldmznoprd.amae';
  $user = 'FRA2_RCT_INSTIT';
  $password = '93r1DiTQ';
  $db = 'fra2_data_rct';
 }else if (strpos($_SERVER['SERVER_NAME'], 'preprod')  !== false) {
  $host = 'mysqldmznoprd.amae';
  $user = 'FRA2_RCT_INSTIT';
  $password = '93r1DiTQ';
  $db = 'fra2_data_rct';
 }else if (strpos($_SERVER['SERVER_NAME'], 'www')  !== false) {
  $host = 'mysqldmz.amae';
  $user = 'A2FR_WWW_PRD2';
  $password = 'S3ta9A6s';
  $db = 'FRA2_DATA';
 }
 try
 {
  $connexion = new PDO('mysql:host='.$host.';dbname='.$db, $user, $password);  
  return $connexion;
 }
 catch (Exception $e)
 {
  die('Connexion impossible à la base : ' . $e->getMessage());
 }
}

function validEmail($email){
 if(preg_match('#^[\w.-]+@[\w.-]+\.[a-z]{2,6}$#i', $email)){return true;}else{return false;}
}

function saveInscription($mail){
 $erreur = "";
 $connPDO = connectBDD();
 
 //premier champ date à remplir par défaut
 $champs = "inscription_date";
 $valeurs = "CURRENT_TIMESTAMP";

  if($mail != null && $mail != ""){
   $champs .= ",email";
   $valeurs .=",:email";
  }

 $requete = "INSERT INTO inscription_newsletter (".$champs.") VALUES (".$valeurs.")";

 if($stmt = $connPDO->prepare($requete)){
   if($mail != null && $mail != ""){
    if(!$stmt->bindValue(':email', $mail)){
     $erreur .= $stmt->errorInfo();
    }
  }
 } else {
  $erreur .=$connPDO->errorInfo();
 }
 
 if(!$stmt->execute()){
  $erreur .= $stmt->errorInfo();
 }
 
 return $connPDO->lastInsertId();
 
 $connPDO = null;
}

function sendInscription($suscriber) {
 include('../../../libraries/phpmailer/phpmailer.php');
 $mail = new PHPMailer();
 $mail->IsSMTP();
 $mail->Host = "mail";
 $mail->CharSet = "UTF-8";
 $mail->Port = 25;
 $mail->From = "technique@assu2000.fr";
 $mail->FromName = "ASSU 2000";
 $recipient = "severine.hang@groupeassu2000.fr";
 
 $sujet = "Nouvelle inscription sur le site ASSU 2000";
 
 $html = "Bonjour,<br><br> Une nouvelle demande d'inscription à la Newsletter vient d'être envoyée sur le site ASSU 2000<br>";
 $html .="L'email de la personne à inscrire est :<br><br>";
 $html .= $suscriber."<br><br>";
 $shfile = createListeFile();
 //var_dump($list_file);
 $nomFichier = "liste_inscription_newsletter.csv";
 $size = shmop_size($shfile);
 $mail->AddStringAttachment(shmop_read($shfile, 0, $size),$nomFichier,'base64','text/csv');
 $mail->SetFrom($mail->From, 'Site ASSU 2000');
 $mail->MsgHTML($html);
 
 if(strpos($_SERVER['HTTP_HOST'],'www')!== false){
  $mail->Subject = $sujet;
  $mail->AddAddress($recipient);
  $mail->AddBCC("mdavid@assu2000.fr");
 } else {
  $mail->Subject = "[RECETTE] ".$sujet;
  $mail->AddAddress("mdavid@assu2000.fr");
 }
 
 if(!$mail->Send()) {
  return "L'envoi n'a pas abouti. Veuillez rééssayer ultérieurement.";
 } else {
  shmop_delete($shfile);
  return "Un message vient de vous être envoyé avec votre demande.";
 }
 
}

function createListeFile(){
 $list = array ();
 
 $connPDO = connectBDD();
 $requete = "SELECT inscription_date, email FROM inscription_newsletter";
 $result = $connPDO->prepare($requete);
 
 $result->execute();
 $dataline= array();
 while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
  array_push($dataline, implode(';',$row));
 }
 $connPDO = null;

 $data = implode("\n",$dataline);
 $dataLength = (ceil(strlen(serialize($data)) / 4) * 4) + 16;
 $shmid = shmop_open(864, 'c', 0755, $dataLength);
 $shm_bytes_written = shmop_write($shmid, $data, 0);
 
 return $shmid;
}

function inscriptionNewsletter ($provenance, $errorMail, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $mailSubscribe){

	$error = "";
	$result = "";
	
	/**
	infos
	**/
	date_default_timezone_set('Europe/Paris');	
	
	$heurelocale = date('d/m/Y H:i:s'); 	
	$ip = $_SERVER['REMOTE_ADDR'];
	
	/**
	PHASE 1 : controle du mail
	**/
	if(validEmail($mailSubscribe))  {
		/*****
		COMPTABILISE LE NOMBRE DE TENTATIVE
		******/
		if(!isset($_SESSION['tentative'])){
			$_SESSION['tentative'] = 0;
		}
		
		$tentative = $_SESSION['tentative'];	
		$tentative ++;
		$_SESSION['tentative'] = $tentative;
		if($tentative >=3){
			$error ="Votre inscription a déjà été prise en compte.";
		}else{
			//sauvegarde en base			
			$save = saveInscription($mailSubscribe);
			//print_r($params);
			
		}
	}else{
	
		if (isset($mailSubscribe)) {
			$error = $errorMail ;
		}
	}
	
	/**
	PHASE 2 : envoi les infos
	**/
	if(isset($save)){
		try{
			$result = sendInscription($mailSubscribe);
		}catch(Exception  $e){
			//print_r($e);
			$error = "Le service d'inscription est indisponible";
			//error_log($ip." [".$heurelocale."] [ERR] ".$e."\n", 3, $_SERVER['DOCUMENT_ROOT'].'logs/webcallback-'.date('YmW').'.log'); 
			if ($debug) {
			$error .= "<br />Erreur :<br />".$e;
			}
			//$error = $e;
		}
	}
	return afficheResult($error,$result, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance);
	}

	function afficheResult($error,$result, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance){
		/*******
	PHASE 3 : Affiche résultat de l'inscription
	********/
	$msgresult ="";
	
	if($error != '')
		{
		$msgerror = '<div class="message" style="color:'.$errorTextColor.'">'.$error.'</div>';
		return $msgerror;
		}elseif(isset($result)){	
			if($result == "Un message vient de vous être envoyé avec votre demande."){
				$msgresult = '<div class="message success" style="color:'.$thanksTextColor.'">'.$msgReussite.'</div>';
			}else{		
				$msgresult = '<div class="message" style="color:'.$errorTextColor.'">'.$result.'</div>';
			}
			if($maintenance) { $msgresult = '<div class="message">Votre demande a bien été prise en compte.</div>';}	
			return $msgresult;
		}
	}

$htmlresult = inscriptionNewsletter($provenance, $errorMail, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $mailSubscribe);
session_write_close();
 
if($maintenance) {
	echo "<div class=\"message\" style=\"color:".$errorTextColor."\"> Le service est en maintenance. Merci de renouveler votre demande ultérieurement.</div>";
} else {
	if(isset($_GET['mailSuscribe'])){
		 echo stripslashes($htmlresult);
	}
}
?>

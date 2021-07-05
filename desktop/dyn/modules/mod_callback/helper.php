<?php 
defined('_JEXEC') or die('Restricted access');
define('AMAE_SERVICE_STATUS_INACCESSIBLE', 'inaccessible');
define('AMAE_SERVICE_STATUS_SUCCESS', 'success');
define('AMAE_SERVICE_STATUS_SERVICE_ERROR', 'service error');
define('AMAE_SERVICE_STATUS_SYSTEM_ERROR', 'system error');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAEServiceXML.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'WebcallbackService.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAE_AVAYAServiceXMLSession.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAE_AVAYAServiceXMLSkillset.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAE_AVAYAServiceXMLRegister.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAE_AVAYAServiceXMLLogin.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAE_AVAYAServiceXMLCustomer.class.php');
require_once (dirname(__FILE__).DS.'includes'.DS.'AMAE_AVAYAServiceXMLWebcallback.class.php');

class modWebcallBackHelper {
  function connectBDD() {
    if (strpos($_SERVER['SERVER_NAME'], 'recette') !== FALSE) {
      $host = 'mysqldmznoprd.amae';
      $user = 'FRA2_RCT_INSTIT';
      $password = '93r1DiTQ';
      $db = 'fra2_data_rct';
    }
    else {
      if (strpos($_SERVER['SERVER_NAME'], 'preprod') !== FALSE) {
        $host = 'mysqldmznoprd.amae';
        $user = 'FRA2_RCT_INSTIT';
        $password = '93r1DiTQ';
        $db = 'fra2_data_rct';
      }
      else {
        if (strpos($_SERVER['SERVER_NAME'], 'www') !== FALSE) {
          $host = 'mysqldmz.amae';
          $user = 'A2FR_WWW_PRD2';
          $password = 'S3ta9A6s';
          $db = 'FRA2_DATA';
        }
      }
    }
    try {
      $connexion = new PDO('mysql:host=' . $host . ';dbname=' . $db, $user, $password);
      return $connexion;
    } catch (Exception $e) {
      die('Connexion impossible à la base : ' . $e->getMessage());
    }
  }

  function saveCallbackLog($tel, $status) {
    $erreur = "";
    $connPDO = modWebcallBackHelper::connectBDD();

    if($tel != null && $tel != ""){
      $champs = "telephone";
      $valeurs =":tel";
    }
    else {
      return false;
    }

    if($status != null && $status != ""){
      $champs .= ",status";
      $valeurs .=",:status";
    }

    //dernier champ date à remplir par défaut
    $champs .= ",date";
    $valeurs .= ",CURRENT_TIMESTAMP";

    $requete = "INSERT INTO webcallback_logs (".$champs.") VALUES (".$valeurs.")";

    if($stmt = $connPDO->prepare($requete)){
      if($tel != null && $tel != ""){
        if(!$stmt->bindValue(':tel', $tel)){
          $erreur .= $stmt->errorInfo();
        }
      }
      if($status != null && $status != ""){
        if(!$stmt->bindValue(':status', $status)){
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

  function checkTelOnLogs($tel){
    $erreur = "";
    $connPDO = modWebcallBackHelper::connectBDD();

    $requete = "SELECT COUNT(*) FROM webcallback_logs WHERE status = 'OK' AND  telephone = :telephone AND date > NOW() - INTERVAL 1 HOUR";

    if($stmt = $connPDO->prepare($requete)){
      if($tel != null && $tel != ""){
        if(!$stmt->bindValue(':telephone', $tel)){
          $erreur .= $stmt->errorInfo();
        }
      }
    } else {
      $erreur .=$connPDO->errorInfo();
    }

    if(!$stmt->execute()){
      $erreur .= $stmt->errorInfo();
    }

    //return $past_time_limit;
    return $stmt->fetchColumn();

    $connPDO = null;
  }


  function appelCallback ($webservicepath, $provenance, $idGroupe, $errorTel, $error_webserv, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $teltocall){

    $error = "";

    /**
    infos pour la log
     **/
    date_default_timezone_set('Europe/Paris');

    $heurelocale = date('d/m/Y H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    /**
    PHASE 0 : soap est installé ?
     **/
    if (!extension_loaded("soap")) {
      die("Extension soap n'est pas installée\n");
    }

    /**
    PHASE 1 : réecrire et controle du téléphone
     **/
    if (isset($teltocall)) {
      $teltocall = preg_replace("/[^0-9]/","",$teltocall);
    }

    /* interdire les numéros commençant par 08 99
    !preg_match("/^0899/i", $teltocall)
    */
    if(strlen($teltocall) == 10  )  {
      /*
      if ( preg_match("/^0899/i", $teltocall) ) {
        $error = 'Désolé, nous ne rappelons pas les numéros surtaxés.';
      }else {
      */

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
        $error ="Votre demande a déjà été prise en compte.";
      }else{
        //arg0:idGroupe, arg1:nomAgence, arg2:telephoneInterlocuteur, arg3:provenance
        $args = array(
          'idGroupe'=>$idGroupe,
          'telephoneInterlocuteur'=>$teltocall,
          'provenance'=>$provenance
        );
        $operationName = "demandeRappelGroupe";
        //print_r($params);

      }
    }else{

      if (isset($teltocall)) {
        $error = $errorTel ;
      }
    }

    /**
    PHASE 2 : envoi les infos et ouverture du call
     **/
    if(isset($args) && isset($operationName)){
      try{
        $client = new SoapClient($webservicepath, array('trace' => 0, 'cache_wsdl' => WSDL_CACHE_NONE));
        if ($debug) {
          $error='';
          $error .= "<br />Fonctions : <br />";
          $error .= print_r($client->__getFunctions());
          $error .= "<br />Types : <br />";
          $types = $client->__getTypes();
          $error .= print_r($types);
          $error .= "<br /><br /> Operation = $operationName : params=";
        }

        $parameters = array($operationName => $args);

        $result= $client->__call($operationName,$parameters)->return;

        if ($debug) {
          $error .= "parametres : ";
          $error .= print_r($parameters);
          $error .= "<br/>result : ";
          $error .= print_r($result);
        }

      }catch(SoapFault  $sf){
        //print_r($sf);
        $error = "Le service est indisponible ";
        $webFaultDemandeDeRappel = $sf->detail->webFaultDemandeDeRappel->webFaultDemandeDeRappel;
        $code_error = $webFaultDemandeDeRappel->code." => ".$webFaultDemandeDeRappel->message;
        if ($debug) {
          $error .= "<br />Erreur :<br />".$code_error;
        }
        $error = $webFaultDemandeDeRappel->message;
        $result = '';
      }catch(Exception  $e){
        //print_r($e);
        $error = "Le service est indisponible";
        if ($debug) {
          $error .= "<br />Erreur :<br />".$e;
        }
        $result = '';
        //$error = $e;
      }
    }
    return modWebcallBackHelper::afficheResult($error,$result, $errorTextColor, $error_webserv, $thanksTextColor, $msgReussite, $maintenance);
  }

  /**
   * Get XML for AVAYA->Session request.
   */
  function amae_avaya_convert_session_to_avaya_xml() {
    // Generate XML for Lead if not given.
    $xml_obj = new AMAE_AVAYAServiceXMLSession();
    $xml_data = $xml_obj->getXmlString();

    if (empty($xml_data)) {
      return FALSE;
    }
    // Just XML build.
    return $xml_data;
  }

  /**
   * Get XML for AVAYA->skillset request.
   */
  function amae_avaya_convert_skillset_to_avaya_xml($skillsetName, $sessionkey) {

    // Generate XML for Lead if not given.
    $xml_obj = new AMAE_AVAYAServiceXMLSkillset($skillsetName, $sessionkey);
    $xml_data = $xml_obj->getXmlString();

    if (empty($xml_data)) {
      return FALSE;
    }

    // Just XML build.
    return $xml_data;
  }

  /**
   * Get XML for AVAYA->register request.
   */
  function amae_avaya_convert_register_to_avaya_xml($phone, $username, $password) {

    // Generate XML for Lead if not given.
    $xml_obj = new AMAE_AVAYAServiceXMLRegister($phone, $username, $password);
    $xml_data = $xml_obj->getXmlString();

    if (empty($xml_data)) {
      return FALSE;
    }

    // Just XML build.
    return $xml_data;
  }

  /**
   * Get XML for AVAYA->login request.
   */
  function amae_avaya_convert_login_to_avaya_xml($username, $password) {

    // Generate XML for Lead if not given.
    $xml_obj = new AMAE_AVAYAServiceXMLLogin($username, $password);
    $xml_data = $xml_obj->getXmlString();

    if (empty($xml_data)) {
      return FALSE;
    }

    // Just XML build.
    return $xml_data;
  }

  /**
   * Get XML for AVAYA->customerId request.
   */
  function amae_avaya_convert_customer_to_avaya_xml($username, $custsession) {

    // Generate XML for Lead if not given.
    $xml_obj = new AMAE_AVAYAServiceXMLCustomer($username, $custsession);
    $xml_data = $xml_obj->getXmlString();

    if (empty($xml_data)) {
      return FALSE;
    }

    // Just XML build.
    return $xml_data;
  }

  /**
   * Get XML for AVAYA->Webcallback request.
   */
  function amae_avaya_convert_callback_to_avaya_xml($custId, $skillsetId, $sessionkey) {

    // Generate XML for Lead if not given.
    $xml_obj = new AMAE_AVAYAServiceXMLWebcallback($custId, $skillsetId, $sessionkey);
    $xml_data = $xml_obj->getXmlString();

    if (empty($xml_data)) {
      return FALSE;
    }

    // Just XML build.
    return $xml_data;
  }


  function appelCallbackAvaya($provenance, $skillSet, $errorTel, $debug, $errorTextColor, $thanksTextColor, $msgReussite, $maintenance, $teltocall) {
    $error = "";
    $error_webserv = '';
    $affiche_result = '';
    define('AMAE_AVAYA_URI', 'http://webservices.ci.ccmm.applications.nortel.com');
    define('AMAE_AVAYA_LOCATION', 'http://framaesr671.grpassu.fr/ccmmwebservices/');
    define('AMAE_AVAYA_UTILITY_WSDL_URL', 'http://framaesr671.grpassu.fr/ccmmwebservices/CIUtilityWs.asmx?WSDL');
    define('AMAE_AVAYA_UTILITY_ENDPOINT_URL', 'http://framaesr671.grpassu.fr/ccmmwebservices/CIUtilityWs.asmx');
    define('AMAE_AVAYA_SKILLSET_WSDL_URL', 'http://framaesr671.grpassu.fr/ccmmwebservices/CISkillsetWs.asmx?WSDL');
    define('AMAE_AVAYA_SKILLSET_ENDPOINT_URL', 'http://framaesr671.grpassu.fr/ccmmwebservices/CISkillsetWs.asmx');

    // Service variable - initial session.
    define('AMAE_AVAYA_SESSIONKEY_SERVICE', 'GetAnonymousSessionKey');

    // Service variable - get skillset Id.
    define('AMAE_AVAYA_SKILLSETID_SERVICE', 'ReadSkillsetByName');
    define('CALL_BACK_SKILLSET', $skillSet);

    define('AMAE_AVAYA_LOGIN_SERVICE', 'CustomerLogin');

    // AVAYA Services connection callback.
    define('AMAE_AVAYA_CUSTOMER_WSDL_URL', 'http://framaesr671.grpassu.fr/ccmmwebservices/CICustomerWs.asmx?WSDL');
    define('AMAE_AVAYA_CUSTOMER_ENDPOINT_URL', 'http://framaesr671.grpassu.fr/ccmmwebservices/CICustomerWs.asmx');
    define('AMAE_AVAYA_REGISTER_SERVICE', 'RegisterNewCustomer');
    define('AMAE_AVAYA_CUSTOMER_SERVICE', 'GetCustomerByEmailAddress');

    // Service variables - WEBCALLBACK.
    define('AMAE_AVAYA_WEBCALLBACK_SERVICE', 'RequestImmediateCallback');

    /**
     * infos pour la log
     **/
    date_default_timezone_set('Europe/Paris');
    $heurelocale = date('d/m/Y H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    /**
     * PHASE 0 : soap est installé ?
     **/
    if (!extension_loaded("soap")) {
      die("Extension soap n'est pas installée\n");
    }

    /**
     * PHASE 1 : réecrire et controle du téléphone
     **/
    if (isset($teltocall)) {
      $teltocall = preg_replace("/[^0-9]/", "", $teltocall);
    }

    /* interdire les numéros commençant par 08 99
     !preg_match("/^0899/i", $teltocall)
     */
    if (strlen($teltocall) == 10) {

      /*****
       * COMPTABILISE LE NOMBRE DE TENTATIVE
       ******/
      if (!isset($_SESSION['tentative'])) {
        $_SESSION['tentative'] = 0;
      }


      $tentative = $_SESSION['tentative'];
      $tentative++;
      $_SESSION['tentative'] = $tentative;
      if ($tentative >= 3) {
        $error = "Votre demande a déjà été prise en compte.";
        //ajout insert KO tentatives session
        modWebcallBackHelper::saveCallbackLog($teltocall, "KO - too many requests (session)");
      }
      else {
        if(modWebcallBackHelper::checkTelOnLogs($teltocall) > 0) {
        //$req = modWebcallBackHelper::checkTelOnLogs($teltocall);
          $error ="Votre demande a déjà été prise en compte.";
          //ajout insert KO tentatives temporelles
          modWebcallBackHelper::saveCallbackLog($teltocall, 'KO - too many requests (frequency)');
        } else {
        //arg0:idGroupe, arg1:nomAgence, arg2:telephoneInterlocuteur, arg3:provenance
        $args = array(
          'skillSet'=>$skillSet,
          'telephoneInterlocuteur'=>$teltocall
         );
        }

      }
    }
    else {
      if (isset($teltocall)) {
        $error = $errorTel;
      }
    }

      /**
       * PHASE 2 : envoi les infos et appel avaya
       **/
    if (isset($args)) {
      $username = "webcallback Assu2000_" . time() . "@.";
      $password = time();
      // xml session request.
      $xml_session_data = modWebcallBackHelper::amae_avaya_convert_session_to_avaya_xml();
      if (!empty($xml_session_data)) {
        // Send xml session request.
        $AVsession = WebcallbackService::doRequest('sessionkey', $xml_session_data, array('service' => 'sessionkey'));
      }

      // xml skillsetId request.
      $xml_skillset_data = modWebcallBackHelper::amae_avaya_convert_skillset_to_avaya_xml(CALL_BACK_SKILLSET, $AVsession['sessionkey']);
      if (!empty($xml_skillset_data)) {
        // Send xml skillset request.
        $AVskillset = WebcallbackService::doRequest('skillset', $xml_skillset_data, array('service' => 'skillset', 'session_id' =>  $AVsession['session_id']));
      }

      // xml Register request.
      $xml_register_data = modWebcallBackHelper::amae_avaya_convert_register_to_avaya_xml($teltocall, $username, $password);
      if (!empty($xml_register_data)) {
        // Send xml register request.
        WebcallbackService::doRequest('create_customer', $xml_register_data, array('service' => 'create_customer', 'session_id' =>  $AVsession['session_id']));
      }

      // xml Login request.
      $xml_login_data = modWebcallBackHelper::amae_avaya_convert_login_to_avaya_xml($username, $password);
      if (!empty($xml_login_data)) {
        // Send xml login request.
        $custSession = WebcallbackService::doRequest('login', $xml_login_data,  array('service' => 'login', 'session_id' =>  $AVsession['session_id']));
      }

      // xml Customer request.
      $xml_customer_data = modWebcallBackHelper::amae_avaya_convert_customer_to_avaya_xml($username, $custSession['login']);
      if (!empty($xml_customer_data)) {
        // Send xml login request.
        $customer = WebcallbackService::doRequest('customer', $xml_customer_data, array('service' => 'customer', 'session_id' =>  $AVsession['session_id']));
      }
      // Send request.
      $xml_data = modWebcallBackHelper::amae_avaya_convert_callback_to_avaya_xml($customer['id'], $AVskillset['id'], $custSession['login']);

      if (!empty($xml_data)) {
        // Send request.
        $result = WebcallbackService::doRequest('callbacknow', $xml_data, array('service' => 'callbacknow', 'session_id' =>  $AVsession['session_id']));
      }

      if($result['status'] == AMAE_SERVICE_STATUS_SUCCESS) {
        $affiche_result->success = 1;
        error_log($ip." [".$heurelocale."] [INFO] Tel : ".$teltocall." Retour du Soap: ". serialize($result)."\n", 3, '/var/log/httpd/webcallback/webcallback-'.date('YmW').'.log');
        //ajout insert OK
        modWebcallBackHelper::saveCallbackLog($teltocall, 'OK');
      } else {
        $affiche_result->success = 0;
        $affiche_result->message = $result['comment'];
        //ajout insert KO Avaya
        modWebcallBackHelper::saveCallbackLog($teltocall, 'KO - technical (ws Avaya)');
      }
    }


    return modWebcallBackHelper::afficheResult($error,$affiche_result, $errorTextColor, $error_webserv, $thanksTextColor, $msgReussite, $maintenance);
  }

  function afficheResult($error, $result, $errorTextColor, $error_webserv, $thanksTextColor, $msgReussite, $maintenance) {
    /*******
     * PHASE 3 : Affiche résultat du callback
     ********/
    $msgresult = "";
    /*** param xiti ***/

    /*** end param xiti ***/
    if ($error != '') {
      $msgerror = '<div class="message" style="color:' . $errorTextColor . '">' . $error . '</div>';
      return $msgerror;
    }
    elseif (isset($result) && $result != '') {
      if ($result->success == 1) {
        $msgresult = '<div class="message succes" style="color:' . $thanksTextColor . '">' . $msgReussite . '</div>';
      }
      else {
        $msgresult = '<div class="message" style="color:' . $errorTextColor . '">' . $result->message . '</div>';
      }
      if ($maintenance) {
        $msgresult = '<div class="message">Votre demande a bien été prise en compte.</div>';
      }
      return $msgresult;
    }
  }
}
?>
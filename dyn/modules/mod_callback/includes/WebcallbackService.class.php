<?php
/**
 * @file
* WebcallbackService class used for "Avaya Client Call back resquests".
*/

/**
 * WebcallbackService caller.
*/
class WebcallbackService {

  // Soap version.
  protected $version;
  // Soap client.
  protected $client;
  // Soap WSDL url.
  protected $wsdl;
  // SOAP endpoint.
  protected $endpoint;
  // SOAP service.
  protected $service;

  protected $request;
  protected $response = '';
  protected $session_id;
  
  /**
   * Constructor.
   *
   * @param string $service_name
   *   Service name.
   * @param mixed $lead
   *   Lead object or FALSE if lead not exists.
   * @param array $extra_properties
   *   Extra properties array keyed by property name.
   *
   * @throws Exception
   *   If couldn't initiate SOAP Client connection with endpoint.
   * @throws SoapFault
   *   If DrupalSoapClient init failed.
   */
  public function __construct($service_name = '', $extra_properties = array()) {
    try {
      foreach ($extra_properties as $property => $value) {
        if (property_exists(get_class($this), $property)) {
          $this->{$property} = $value;
        }
      }
  
      $selected_service = $this->getServiceData($service_name);
 
      // Disable/Enable cache for wsdl files.
      ini_set("soap.wsdl_cache_enabled", "1");
      $this->version = SOAP_1_1;
      $client_options = array(
          'trace' => 1,
          'exceptions' => TRUE,
          'cache_wsdl' => WSDL_CACHE_BOTH,
          // Important for BizTalk version must be 1.2.
          'soap_version' => $this->version,
      );
      /*if (!empty($selected_service['login']) && !empty($selected_service['password'])) {
        $client_options += array(
            'login' => $selected_service['login'],
            'password' => $selected_service['password'],
        );
      }*/
  
      $soapclient = new SoapClient($selected_service['wsdl'], $client_options);
      if (!is_object($soapclient)) {
        $error = "Le service est indisponible";
        error_log("[INFO] Retour du service: ". serialize($soapclient)."\n", 3, $_SERVER['DOCUMENT_ROOT'].'/logs/webcallback-'.date('YmW').'.log');
      }
  
      // Set SOAP configuration.
      $this->client = $soapclient;
      $this->wsdl = $selected_service['wsdl'];
      $this->endpoint = $selected_service['endpoint'];
      $this->service = $selected_service['service'];
    }
    catch (SoapFault $fault) {
      $error = "Le service est indisponible";
    }
  }
  
  /**
   * Service data getter.
   *
   * @param string $service_name
   *   Service name.
   *
   * @return array
   *   Service data.
   */
  private function getServiceData($service_name) {
    $service_data = $this->serviceData();
    return isset($service_data[$service_name]) ? $service_data[$service_name] : array();
  }

  /**
   *
   * {@inheritdoc}
   *
   */
  protected function serviceData() {
    return array (
        'sessionkey' => array (
            'service' => AMAE_AVAYA_SESSIONKEY_SERVICE,
            'endpoint' => AMAE_AVAYA_UTILITY_ENDPOINT_URL,
            'wsdl' => AMAE_AVAYA_UTILITY_WSDL_URL,
            'version' => SOAP_1_1
        ),
        'create_customer' => array (
            'service' => AMAE_AVAYA_REGISTER_SERVICE,
            'endpoint' => AMAE_AVAYA_CUSTOMER_ENDPOINT_URL,
            'wsdl' => AMAE_AVAYA_CUSTOMER_WSDL_URL,
            'version' => SOAP_1_1
        ),
        'skillset' => array (
            'service' => AMAE_AVAYA_SKILLSETID_SERVICE,
            'endpoint' => AMAE_AVAYA_SKILLSET_ENDPOINT_URL,
            'wsdl' => AMAE_AVAYA_SKILLSET_WSDL_URL,
            'version' => SOAP_1_1
        ),
        'login' => array (
            'service' => AMAE_AVAYA_LOGIN_SERVICE,
            'endpoint' => AMAE_AVAYA_UTILITY_ENDPOINT_URL,
            'wsdl' => AMAE_AVAYA_UTILITY_WSDL_URL,
            'version' => SOAP_1_1
        ),
        'customer' => array (
            'service' => AMAE_AVAYA_CUSTOMER_SERVICE,
            'endpoint' => AMAE_AVAYA_CUSTOMER_ENDPOINT_URL,
            'wsdl' => AMAE_AVAYA_CUSTOMER_WSDL_URL,
            'version' => SOAP_1_1
        ),
        'callbacknow' => array (
            'service' => AMAE_AVAYA_WEBCALLBACK_SERVICE,
            'endpoint' => AMAE_AVAYA_CUSTOMER_ENDPOINT_URL,
            'wsdl' => AMAE_AVAYA_CUSTOMER_WSDL_URL,
            'version' => SOAP_1_1
        )
    );
  }

  /**
   * Perform Service call.
   */
  public static function doRequest($service, $_request, $extra_properties = array()) {
    global $user;
     
    try {
      $start_time = microtime(TRUE);
      $caller_class = get_called_class();
      $caller = new $caller_class($service, $extra_properties);
      $caller->request = $_request;
      $result = $caller->sendRequest();
      return $result;
    }
    catch (Exception $e) {
      return FALSE;
    }
  }

  /**
   * Send SOAP Request.
   */
  protected function sendRequest() {
    global $user;
    if (!empty($this->client)) {
      try {
        $this->response = $this->client->__doRequest($this->request, $this->endpoint, AMAE_AVAYA_URI .'/'. $this->service, $this->version);
      }
      catch (SoapFault $fault) {
        error_log("[INFO] Retour du request erreur : ". serialize($fault)."\n", 3, $_SERVER['DOCUMENT_ROOT'].'/logs/webcallback-'.date('YmW').'.log');
        return FALSE;
      }
      // Parse response.
      $result = $this->parseResponse($this->response);

      // Check Response status.
      if (AMAE_SERVICE_STATUS_SUCCESS != $result['status']) {
        error_log("[INFO] Retour du request error : ". $result['comment']."\n", 3, $_SERVER['DOCUMENT_ROOT'].'/logs/webcallback-'.date('YmW').'.log');
      }
      return $result;
    }
    else {
      return FALSE;
    }
    return FALSE;
  }

  /**
   * Helper to get Xpath attribute value.
   */
  protected function getXpathAttr(&$xml, $xpath) {
    $result = $xml->xpath($xpath);
    while (list(, $value) = each($result)) {
      return (string) $value;
    }

    // Not found.
    return FALSE;
  }


  /**
   * Get Result from XML Response.
   *
   * @return array
   *   Array['status'] shows whether request succeeded or not.
   */
  protected function parseResponse($response) {
    $data = array(
        'status' => 0,
        'result' => '',
        'req_data'  => $this->request,
        'resp_data' => $this->response,
    );

    if (empty($this->client)) {
      $data['status'] = AMAE_SERVICE_STATUS_SYSTEM_ERROR;
      $data['comment'] = "Can't send request.";
      return $data;
    }

    // Check soap fault.
    if (is_soap_fault($this->client)) {
      $data['status'] = AMAE_SERVICE_STATUS_SYSTEM_ERROR;
      $data['comment'] = "Unexpected result code.";
      return $data;
    }

    // Check response.
    if (empty($response) || !is_string($response)) {
      $data['status'] = AMAE_SERVICE_STATUS_SYSTEM_ERROR;
      $data['comment'] = "parseResponse: Response is empty.";
      return $data;
    }

    try {
      $xml = new SimpleXMLElement($response);

      $soapFaultData = $this->parseSoapFaultdata($xml);

      if($soapFaultData) {
        $data['status'] = AMAE_SERVICE_STATUS_SERVICE_ERROR;
        $data['comment'] = 'Votre demande n\'a pas pu aboutir.<br /> Merci de réessayer ultérieurement.';
        return $data;
      }

      switch ($this->service) {
        case AMAE_AVAYA_SESSIONKEY_SERVICE :
          $sessionData = $this->parseSessionData($xml);
          $data = array_merge($data, $sessionData);
          break;
        case AMAE_AVAYA_SKILLSETID_SERVICE :
          $data['id'] = $this->parseSkillsetData($xml);
          break;
        case AMAE_AVAYA_LOGIN_SERVICE :
          $data['login'] = $this->parseLoginData($xml);
          break;
        case AMAE_AVAYA_CUSTOMER_SERVICE :
          $data['id'] = $this->parseCustomerData($xml);
          break;
        case AMAE_AVAYA_WEBCALLBACK_SERVICE :
          $data['callbacknow'] = $this->parseCallbacknowData($xml);
          break;
      }
      $data['status'] = AMAE_SERVICE_STATUS_SUCCESS;
      $data['comment'] = 'Success Request';
      if(isset($this->session_id)) {
        $data['session_id'] = $this->session_id;
      }
      return $data;
    }
    catch (Exception $e) {
      $data['status'] = AMAE_SERVICE_STATUS_SYSTEM_ERROR;
      $data['comment'] = 'Exception: parse xml invalide: ';
    }

    return $data;
  }

  protected function parseSoapFaultData($xml) {
    $soapfault = array();
    if ($xml->xpath("//*[local-name()='faultcode']") != NULL) {
      $xml_fault = $xml->xpath("//*[local-name()='faultcode']");
      $soapfault['code'] = (string) $xml_fault[0];
      $xml_fault_string = $xml->xpath("//*[local-name()='faultstring']");
      $soapfault['message'] = (string) $xml_fault_string[0];

      // Return soapfault.
      if ($soapfault['code'] != '') {
        return $soapfault;
      }
    }
    return false;
  }
  /**
   * Helper function to parse Skillset data out of xml response.
   */
  protected function parseSkillsetData(&$xml) {
    $xml_id = $xml->xpath("//*[local-name()='ReadSkillsetByNameResult']/*[local-name()='id']");
    $id = (string) $xml_id[0];
    $xml_tag = $xml->xpath("//*[local-name()='ReadSkillsetByNameResult']/*[local-name()='tag']");
    $webTag = (string) $xml_tag[0];
  
    // Return SkillsetId.
    return $id;
  }
  
  /**
   * Helper function to parse Session data out of xml response.
   */
  protected function parseSessionData(&$xml) {
    $xml_sessionkey = $xml->xpath("//*[local-name()='GetAnonymousSessionKeyResult']/*[local-name()='SessionKey']");
    $anonymSession['sessionkey'] = (string) $xml_sessionkey[0];
    $xml_sessionid = $xml->xpath("//*[local-name()='GetAnonymousSessionKeyResult']/*[local-name()='AnonymousID']");
    $anonymSession['session_id'] = (string) $xml_sessionid[0];
  
    // Return Anonyme SessionKey.
    return $anonymSession;
  }
  
  /**
   * Helper function to parse Login data out of xml response.
   */
  protected function parseLoginData(&$xml) {
    $xml_login = $xml->xpath("//*[local-name()='CustomerLoginResult']");
    $sessionKey = (string) $xml_login[0];
  
    // Return customer SessionKey.
    return $sessionKey;
  }
  
  /**
   * Helper function to parse Customer data out of xml response.
   */
  protected function parseCustomerData(&$xml) {
    $xml_customer_id = $xml->xpath("//*[local-name()='GetCustomerByEmailAddressResult']/*[local-name()='id']");
    $id = (string) $xml_customer_id[0];
  
    // Return CustomerId.
    return $id;
  }
 
  /**
   * Helper function to parse Session data out of xml response.
   */
  protected function parseCallbacknowData(&$xml) {

    // Return results.
    return;
  }

}

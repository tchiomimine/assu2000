<?php

/**
 * @file
 * Helper class for converting data to XML string for request.
 */

/**
 * Class AMAE_AVAYAServiceXMLWebcallback.
 */
class AMAE_AVAYAServiceXMLWebcallback extends AMAEServiceXML {

  private $custId;
  private $skillsetId;
  private $sessionkey;

  /**
   * {@inheritdoc}
   */
  public function __construct($custId, $skillsetId, $sessionkey) {
    parent::__construct();

    $this->custId = $custId;
    $this->skillsetId = $skillsetId;
    $this->sessionkey = $sessionkey;
  }

  /**
   * {@inheritdoc}
   */
  protected function getRootStucture() {
    // Mapping array.
    return array(
      'ea_template' => array(
        SOAP_1_1 => 'soap_webcallback_template_1_1.xml',
      ),
      'ea_data' => array(
        '!__custId__!' => $this->custId,
        '!__skillsetId__!' => $this->skillsetId,
        '!__sessionkey__!' => $this->sessionkey,
      ),
    );
  }
}

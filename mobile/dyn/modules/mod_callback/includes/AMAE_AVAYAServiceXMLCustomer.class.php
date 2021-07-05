<?php

/**
 * @file
* Helper class for converting data to XML string for request.
*/

/**
 * Class AMAE_AVAYAServiceXMLCustomer.
*/
class AMAE_AVAYAServiceXMLCustomer extends AMAEServiceXML {

  private $username;
  private $custsession;

  /**
   * {@inheritdoc}
   */
  public function __construct($username, $custsession) {
    parent::__construct();

    $this->username = $username;
    $this->custsession = $custsession;
  }

  /**
   * {@inheritdoc}
   */
  protected function getRootStucture() {
    // Mapping array.
    return array(
        'ea_template' => array(
            SOAP_1_1 => 'soap_customer_template_1_1.xml',
        ),
        'ea_data' => array(
            '!__username__!' => $this->username,
            '!__sessionkey__!' => $this->custsession,
        ),
    );
  }
}

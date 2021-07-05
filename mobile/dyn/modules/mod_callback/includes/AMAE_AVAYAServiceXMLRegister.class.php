<?php

/**
 * @file
 * Helper class for converting data to XML string for request.
 */

/**
 * Class AMAE_AVAYAServiceXMLRegister.
 */
class AMAE_AVAYAServiceXMLRegister extends AMAEServiceXML {

  private $phone;

  /**
   * {@inheritdoc}
   */
  public function __construct($phone, $username, $password) {
    parent::__construct();

    $this->phone = $phone;
    $this->username = $username;
    $this->password = $password;
  }

  /**
   * {@inheritdoc}
   */
  protected function getRootStucture() {
    // Mapping array.
    return array(
      'ea_template' => array(
        SOAP_1_1 => 'soap_register_template_1_1.xml',
      ),
      'ea_data' => array(
        '!__username__!' => $this->username,
        '!__password__!' => $this->password,
        '!__number__!' => $this->phone,
        '!__email__!' => $this->username,
      ),
    );
  }
}

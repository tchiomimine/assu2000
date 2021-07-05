<?php

/**
 * @file
 * Helper class for converting data to XML string for request.
 */

/**
 * Class AMAE_AVAYAServiceXMLLogin.
 */
class AMAE_AVAYAServiceXMLLogin extends AMAEServiceXML {

  private $username;
  private $password;

  /**
   * {@inheritdoc}
   */
  public function __construct($username, $password) {
    parent::__construct();

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
        SOAP_1_1 => 'soap_login_template_1_1.xml',
      ),
      'ea_data' => array(
        '!__username__!' => $this->username,
        '!__password__!' => $this->password,
      ),
    );
  }
}

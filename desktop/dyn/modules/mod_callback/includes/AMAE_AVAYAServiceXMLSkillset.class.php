<?php

/**
 * @file
 * Helper class for converting data to XML string for request.
 */

/**
 * Class AMAE_AVAYAServiceXMLSkillset.
 */
class AMAE_AVAYAServiceXMLSkillset extends AMAEServiceXML {

  private $skillsetName;
  private $sessionkey;

  /**
   * {@inheritdoc}
   */
  public function __construct($skillsetName, $sessionkey) {
    parent::__construct();

    $this->skillsetName = $skillsetName;
    $this->sessionkey = $sessionkey;
  }

  /**
   * {@inheritdoc}
   */
  protected function getRootStucture() {
    // Mapping array.
    return array(
      'ea_template' => array(
        SOAP_1_1 => 'soap_skillset_template_1_1.xml',
      ),
      'ea_data' => array(
        '!__skillsetName__!' => $this->skillsetName,
        '!__sessionkey__!' => $this->sessionkey,
      ),
    );
  }
}

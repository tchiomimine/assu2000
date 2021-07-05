<?php

/**
 * @file
 * Helper class for converting data to XML string for request.
 */

/**
 * Class AMAE_AVAYAServiceXMLSession.
 */
class AMAE_AVAYAServiceXMLSession extends AMAEServiceXML {

  /**
   * {@inheritdoc}
   */
  public function __construct() {
    parent::__construct();
  }

  /**
   * {@inheritdoc}
   */
  protected function getRootStucture() {
    // Mapping array.
    return array(
      'ea_template' => array(
        SOAP_1_1 => 'soap_anonymousSession_template_1_1.xml',
      ),
      'ea_data' => array(
      ),
    );
  }
}

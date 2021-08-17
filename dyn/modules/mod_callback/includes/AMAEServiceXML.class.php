<?php

/**
 * @file
 * Helper class for converting data to XML string for request.
 */

/**
 * Class AMAEServiceXML.
 */
abstract class AMAEServiceXML {
  protected $external;
  protected $folder;
  protected $subtype = '';
  protected $executionData;
  protected $module;

  /**
   * AMAEServiceXML constructor.
   */
  public function __construct() {
    $this->module = '';
  }

  /**
   * XML from template.
   */
  public function dataToXml($template, &$data) {

    foreach ($data as $segment => $segment_data) {
      if (is_array($segment_data) && isset($segment_data['ea_template']) && is_string($segment_data['ea_template'])) {
        if (isset($segment_data['ea_data']) && is_array($segment_data['ea_data']) && !empty($segment_data['ea_data'])) {
          $segment_data['ea_data'] = array_map('amae_trim_callback', $segment_data['ea_data']);
          $data[$segment] = $this->getXmlString($segment_data['ea_template'], $segment_data['ea_data']);
        }
        else {
          $data[$segment] = '';
        }
      }
    }

    $xml = file_get_contents(dirname(__FILE__) . '/xml/' . $template);

    // @TODO: ensure that XML doesn't have
    // any unprocessed placeholders in template.
    $data = (array) $data;
    if (isset($data['!__list__!']) && is_array($data['!__list__!']) && count($data) == 1) {
      $list_xml = '';
      foreach ($data['!__list__!'] as $item) {
        $list_xml .= $this->getXmlString($item['ea_template'], $item['ea_data']);
      }
      $data['!__list__!'] = $list_xml;
    }
    // Process tockens.
    // Process tockens.
    if(!empty($data) ) {
      $string = AMAEServiceXML::format_string($xml, $data);
    }
    else {
      $string = $xml;
    }
    // Remove unprocessed tockens.
    $string = preg_replace('/!__[0-9a-zA-Z_]*__!/', '', $string);
    // Remove empty tags.
    return $this->removeEmptyTagsRecursive($string);
  }
  
  public function format_string($string, array $args = array()) {
  
    // Transform arguments before inserting them.
    foreach ($args as $key => $value) {
      switch ($key[0]) {
        case '@':
  
          // Escaped only.
          $args[$key] = AMAEServiceXML::check_plain($value);
          break;
        case '%':
        default:
  
          // Escaped and placeholder.
          $args[$key] = AMAEServiceXML::add_placeholder($value);
          break;
        case '!':
      }
    }
    return strtr($string, $args);
  }
  
  public function add_placeholder($text) {
    return '<em class="placeholder">' . check_plain($text) . '</em>';
  }

  /**
   * Get root structure array of xml.
   *
   * @return array
   *   Root structure array of xml.
   */
  protected abstract function getRootStucture();

  /**
   * Convert Entity to XML string.
   */
  public final function getXmlString($template = '', $data = array()) {
    if (empty($data)) {
      // Log perfomance data.
      $start_time = microtime(TRUE);
      $mem = memory_get_usage();

      // Mapping array.
      $root = $this->getRootStucture();

      $data = $root['ea_data'];
      $version = SOAP_1_1;
      $template = $root['ea_template'][$version];
    }

    // Generate xml string.
    $xml = $this->dataToXml($template, $data);
    $this->xmlString = $xml;

    // Return updated xml template.
    return $xml;
  }

  /**
   * XML list from template.
   */
  protected function generateListXml($xml_tamplate, $data) {
    $xml = '';
    // Generate xml string.
    foreach ($data as $key => $value) {
      $xml .= $this->dataToXml($xml_tamplate, $value);
    }

    return $xml;
  }

  // GET VALUE HELPERS.
  /**
   * Get execution performance data.
   */
  public function getExecutionData() {
    if (!empty($this->executionData)) {
      return $this->executionData;
    }
    else {
      return FALSE;
    }
  }

  /**
   * A bit different `check_plain`.
   */
  public function checkPlain($text) {
    return htmlspecialchars($text, ENT_NOQUOTES, 'UTF-8');
  }

  /**
   * Remove the nested HTML empty tags from the string.
   */
  public function removeEmptyTagsRecursive($str, $repto = '') {
    // Return if string not given or empty.
    if (!is_string($str) || trim($str) == '') {
      return $str;
    }
    // Recursive empty HTML tags.
    $res = preg_replace(
      // Pattern written by Junaid Atari.
      '/<([^<\/>]*)>([\s\r\n]*?|(?R))<\/\1>/imsU',
      // Replace with nothing if string empty.
      !is_string($repto) ? '' : $repto,
      // Source string.
      $str
    );
    // Check if we need to repeat cleanup
    // to remove empty parents.
    if ($res != $str) {
      return $this->removeEmptyTagsRecursive($res);
    }
    return $res;
  }

  /**
   * Simple list XML generator.
   *
   * @param array $list
   *   Array of elements.
   * @param string $item_template
   *   List item template path.
   *
   * @return array
   *   Data array for xml generator.
   */
  protected function simpleListXml(array $list, $item_template) {
    $data = array();
    if (is_array($list) && !empty($item_template)) {
      foreach ($list as $element) {
        $data[] = array(
          'ea_template' => $item_template,
          'ea_data' => array(
            '!__element__!' => $element,
          ),
        );
      }
    }

    return array('!__list__!' => $data);
  }

}

<?php

/**
 * GMaps
 *
 * @package   GMaps
 * @author    Linus Lundahl
 * @license   http://www.opensource.org/licenses/mit-license.php
 * @link      https://github.com/linuslundahl/GMaps-Craft
 */

namespace Craft;

class GMaps_LatLngFieldType extends BaseFieldType
{
  /**
   * [getName description]
   * @return [type] [description]
   */
  public function getName()
  {
    return Craft::t('GeoPosition');
  }

  /**
   * [prepValue description]
   * @param  [type] $value [description]
   * @return [type]        [description]
   */
  // public function prepValue($value)
  // {
  //   return $this->_encodeValue($value);
  // }

  /**
   * [getInputHtml description]
   * @param  [type] $name  [description]
   * @param  [type] $value [description]
   * @return [type]        [description]
   */
  public function getInputHtml($name, $value)
  {
    $settings = craft()->plugins->getPlugin('gmaps')->getSettings();

    $active = FALSE;
    if (!empty($settings->GMapsAPIKey)) {
      $active = TRUE;
      $valueJson = $this->_encodeValue($value);
      $mapId = craft()->templates->namespaceInputId('map');
      craft()->templates->includeJsFile('https://maps.googleapis.com/maps/api/js?key=' . $settings->GMapsAPIKey);
      craft()->templates->includeJsResource('gmaps/js/GMaps.js');
      craft()->templates->includeJs("var GMaps = {
        pos : $valueJson,
        mapId : '$mapId'
      }");
    }

    return craft()->templates->render('gmaps/latlng', array(
      'name'   => $name,
      'id'     => craft()->templates->formatInputId($name),
      'value'  => $value,
      'active' => $active,
    ));
  }

  /**
   * [_decodeValue description]
   * @param  [type] $value [description]
   * @return [type]        [description]
   */
  public function _decodeValue($value)
  {
    return implode(' ', (array) json_decode($value));
  }

  /**
   * [_encodeValue description]
   * @param  [type] $value [description]
   * @return [type]        [description]
   */
  public function _encodeValue($value)
  {
    $value = explode(' ', $value);
    return json_encode(empty($value[0]) || empty($value[1]) ? array() : array(
      'lat' => $value[0],
      'lng' => $value[1],
    ));
  }

}

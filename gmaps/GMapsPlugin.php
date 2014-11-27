<?php

namespace Craft;

class GMapsPlugin extends BasePlugin
{
  public function getName()
  {
      return Craft::t('Google Maps');
  }

  public function getVersion()
  {
      return '1.0';
  }

  public function getDeveloper()
  {
      return 'Linus Lundahl';
  }

  public function getDeveloperUrl()
  {
      return 'http://unwi.se';
  }

  /**
   * [addTwigExtension description]
   * @return [type] [description]
   */
  public function addTwigExtension()
  {
    Craft::import('plugins.gmaps.twigextensions.GMapsTwigExtension');
    return new GMapsTwigExtension();
  }

  /**
   * [getSettingsHtml description]
   * @return [type] [description]
   */
  public function getSettingsHtml()
  {
    return craft()->templates->render('gmaps/settings', array(
      'settings' => $this->getSettings()
    ));
  }

  /**
   * [defineSettings description]
   * @return [type] [description]
   */
  protected function defineSettings()
  {
    return array(
      'GMapsAPIKey' => array(AttributeType::String)
    );
  }
}

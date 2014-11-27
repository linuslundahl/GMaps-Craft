<?php

namespace Craft;

class GMapsVariable
{
  public function APIKey()
  {
    $settings = craft()->plugins->getPlugin('gmaps')->getSettings();
    return $settings->GMapsAPIKey;
  }
}

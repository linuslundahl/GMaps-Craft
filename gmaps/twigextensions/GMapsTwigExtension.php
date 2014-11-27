<?php

namespace Craft;

use Twig_Extension;
use Twig_SimpleFilter;

class GMapsTwigExtension extends Twig_Extension
{
  public function getName()
  {
    return 'GMaps';
  }

  public function getFilters()
  {
    return array(
      new \Twig_SimpleFilter('getLat', array($this, 'getLatFilter')),
      new \Twig_SimpleFilter('getLng', array($this, 'getLngFIlter')),
    );
  }

  public function getLatFilter($latlng)
  {
    $latlng = explode(' ', $latlng);
    return $latlng[0];
  }

  public function getLngFilter($latlng)
  {
    $latlng = explode(' ', $latlng);
    return $latlng[1];
  }
}

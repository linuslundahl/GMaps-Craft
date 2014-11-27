Google Maps for Craft
---------------------

A super simple Google Maps plugin for [Craft CMS](http://buildwithcraft.com/).

This plugin only provides admin functionality, template implementations must be done by the developer.

It provides a new field type called GeoPosition. It shows a map that allows users to easily add a marker and save the position to an entry, it also provides two twig filters to get the latitude and longitude in your template files.

Example:

	entry.fieldHandle|getLat
	entry.fieldHandle|getLng

You must save your Google Maps API Key in the plugin settings.

Getting the saved API Key in your template:

	craft.GMaps.APIKey();

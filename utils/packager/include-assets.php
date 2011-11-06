<?php
/**
 * Asset include script for BTM-Packager
 *
 * @package BTM-Packager
 */

function include_packager_assets($packageName, $packageLang, $linkMode = false) { 

	$configFile = dirname(__FILE__) . '/btm-packager.xml';
	
	
	try {
		$dom = @ new SimpleXMLElement(basename($configFile), NULL, true);
	}
	catch (Exception $e) {
		exit ("The specified file ({$configFile}) could not be parsed as XML");
	}
	
	
	$packageSearch = $dom->xpath("//package[@name='{$packageName}'][@language='{$packageLang}']");
	
	if (count($packageSearch) === 0) {
		exit ("Could not find a matching Package");
	}
	
	$package = $packageSearch[0];
	
	$baseURL = rtrim(dirname($_SERVER['PHP_SELF']) . '/' . (string) $package->source['dir'], '/') . '/';
	
	if ($linkMode) {
	
		switch($packageLang) {
			case 'js':
				header("Content-Type: text/javascript");
			break;
			
			case 'css':
				header("Content-Type: text/css");
			break;
		}
	
	}
	
	foreach($package->source->file as $file) {
		
		$file = (string) $file;
		
		switch($packageLang) {
			case 'js':
				
				$jsLine = '<script type="text/javascript" src="' . $baseURL . $file . '"></script>';
				if ($linkMode) {
					echo "document.write('{$jsLine}');\n";
				}
				else {
					echo $jsLine . "\n";
				}
			break;
	
			case 'css':
				if ($linkMode) {
					echo "@import '{$file}';\n";
				}
				else {
					echo '<link rel="stylesheet" type="text/css" href="' . $baseURL . (string) $file . '" />' . "\n";
				}
			break;
		}
	}
}

if (basename(__FILE__) === basename($_SERVER['PHP_SELF'])) {

	$packageName = @ $_REQUEST['name'] or exit ('Please specify a package name to load');
	$packageLang = @ $_REQUEST['lang'] or exit ('Please specify the package language to load');


	include_packager_assets($packageName, $packageLang, true);
}

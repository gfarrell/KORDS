<?php
/**
 * Build script for BTM-Packager
 *
 * @package BTM-Packager
 */
require_once('BTMPackager.class.php');
require_once('BTMGrowl.class.php');

$command = PHP_OS == 'WINNT' ? 'build.bat' : 'build.sh';

if ($argc === 1) {
	echo "No config file specified\n";
	echo "Usage: $command configFile\n";
	exit;
}
elseif($argc > 1 && (in_array('-h', $argv) || in_array('--help', $argv))) {
	echo "Usage: $command configFile\n";
	exit;
}

$growl = new BTMGrowl();
$package = new BTMPackager($argv[1]);

$result = $package->run();

if ($growl->available()) {
	foreach ($result as $p => $files) {
		foreach ($files as $f) {
			$growl->notify($p, $f);
		}
	}
}
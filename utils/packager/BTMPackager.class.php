<?php
/*
Copyright (c) 2009-2010, Stephen Reay, http://www.bobs-bits.com
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Stephen Reay nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * BTM-Packager - combines and compresses JavaScript and CSS files
 * @package BTM-Packager
 * @version 1.3.0
 *
 * @todo Implement URL rewriting in CSS source files - use {less} for this ?
 * @todo Implement pattern rewriting in CSS - use {less} for this ?
 */

/**
 * BTM-Packager class.
 * Combines and optionally compresses multiple CSS/JS files into a "packaged" version.
 */
class BTMPackager {
		
	/**
	 * Progress message templates
	 * Order of fields is: Package Name, Name, Type, Size, Compression
	 */
	private $progressMessage = '%2$s (%3$s) has been packaged.\nFile size: %4$s\nCompression: %5$.2f%%';

	/**
	 * File types to get
	 */
	private $get_file_types = array('source',
									'license');

	/**
	 * Default settings
	 */
	private $defaults = array('encoding' => 0);
	
	/**
	 * Format a number into a human readable file size
	 *
	 * @param integer|string $bytes the number to format
	 * @param integer $precision the precision to round the number to
	 * @return string
	 */
	private static function formatBytes($bytes, $precision = 2) { 
	    $units = array('B', 'KB', 'MB', 'GB', 'TB'); 
	   
	    $bytes = max($bytes, 0); 
	    $pow = floor(($bytes ? log($bytes) : 0) / log(1024)); 
	    $pow = min($pow, count($units) - 1); 
	   
	    $bytes /= pow(1024, $pow); 
	   
	    return round($bytes, $precision) . ' ' . $units[$pow]; 
	}
	
	/**
	 * Class constructor
	 * @param string|bool $configFile filename of XML config document or false to use default filename (btm-packager.xml)
	 */
	public function __construct($configFile = 'btm-packager.xml') {
		
		// Change to the same directory as the XML file
		chdir(dirname($configFile));

		// Import the XML file
		try {
			$this->dom = @ new SimpleXMLElement(basename($configFile), NULL, true);
		}
		catch (Exception $e) {
			$this->displayMessage("The specified file ({$configFile}) could not be parsed as XML");
			exit;
		}
	}

	/**
	 * Method to display either a Growl message or a CLI message
	 * @param string $package name of the Package being processed
	 * @param string $name the name of the item
	 * @param string $type the type of item
	 * @param mixed $compression the amount of compression that was achieved for this item
	 * @param int $size the size of the item in bytes
	 */
	private function progress($package = null, $name = null, $type = null, $size = null, $compression = null) {
		
		$message = str_replace('\n', "\n", sprintf($this->progressMessage, $package, $name, $type, $size, $compression));
		
		return $message;
	}
		
	/**
	 * Parse the XML config and build each defined 'package'
	 */
	public function run() {
		$results = array();
	
		// Loop through each "package"
		foreach($this->dom->package as $package) {
			$source = array();
			// Loop through each type of source file
			foreach($this->get_file_types as $type) {
				if($package->{$type}) {
					$source[$type] = array();
					$source_dir = $package->{$type}['dir'] ? (string) $package->{$type}['dir'] . DIRECTORY_SEPARATOR : '';
					
					// Get the source files of this type
					foreach($package->{$type}->file as $file) {
						$filename = $source_dir . (string) $file;
						$source[$type][] = preg_replace("/\r/", '', file_get_contents($filename));
					}
				}
			}		
		
			// Calculate the package-level output directory
			$output_dir = $package->output['dir'] ? (string) $package->output['dir'] . DIRECTORY_SEPARATOR : '';
		
			// Loop through each output definition
			foreach($package->output->file as $file) {
				
				// Combine any required license files
				$license_str = isset($source['license']) && (!isset($file['license']) || $file['license'] != 'false') ? implode("\n", $source['license']) . "\n" : '';
				
				// Combine the source files
				$source_str = isset($source['source']) ? implode("\n", $source['source']) : '';
				
				// Uncompressed size
				$full_size = strlen($source_str);
				
				// Compress the source
				if($file['compression'] == 'enabled') {
					require_once('YUICompressor.php');
					
					$packer = new YUICompressor('/Users/gideon/Library/Application\ Support/Coda/Plug-ins/BTM\ Packager.codaplugin/Contents/Resources/F7D99312-2D5F-4784-8508-FEC65BAE4386/Support\ Files/yuicompressor-2.4.6.jar', '/tmp', array(
						'type'		=>	(string)$package['language'],
						'linebreak'	=>	true
					));
					
					$packer->addString($source_str);
					$source_str = $packer->compress();
				}
				
				// Compressed size
				$compressed_size = strlen($source_str);
				
				// Compression ratio
				$compression = round((1-($compressed_size/$full_size))*100, 2);

				// Calculate absolute output filename
				$filename = dirname($output_dir . (string)$file) . DIRECTORY_SEPARATOR . basename((string)$file);

				// Check for existing output directory and create it if necessary							
				$file_dir = dirname($filename);
				if (!is_dir($file_dir)) {
					mkdir($file_dir, 0777, true);
				}

				// Write output to the filename
				$bytes = self::formatBytes(file_put_contents($filename, $license_str . $source_str));
				$results[(string) $package['name']][] = $this->progress($package['name'], basename($filename), $package['language'], $bytes, $compression);
			}
		}
	
		return $results;
	}
}
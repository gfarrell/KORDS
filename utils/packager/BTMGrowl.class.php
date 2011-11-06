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
 * BTM-Growl - send messages to a local Growl installation
 * @package BTM-Growl
 * @version 1.0
 *
 */

/**
 * BTM-Growl class.
 * Sends messages to a local Growl installation
 */
class BTMGrowl {

	/**
	 * Flag to indicate if Growl is available
	 */
	private $growlInstalled = false;
	
	/**
	 * The location for the growlnotify binary
	 */
	private $growlPath = null;
	
	/**
	 * Application paths, arguments and URLs for Growl
	 */
	private $growlPlatforms = array(
		'Darwin' => array(
			'path' => '/usr/local/bin/growlnotify',
			'url' => 'http://www.growl.info',
			'name' => 'Mac',
			'args' => array(
				'help' => '-h',
				'name' => '-n "%s"',
				'sticky' => '-s',
				'icon' => '--image "%s"',
				'message' => '-m "%s"',
				'priority' => '-p %d',
				'title' => '-t "%s"'
			),
			'arg_order' => array('sticky', 'priority', 'icon', 'message', 'title')
		),
		'WINNT' => array(
			'path' => 'C:\Program Files\Growl for Windows\growlnotify.com',
			'url' => 'http://www.growlforwindows.com',
			'name' => 'Windows',
			'args' => array(
				'help' => '/?',
				'name' => '/a:"%s"',
				'sticky' => '/s:true',
				'icon' => '/i:"%s"',
				'message' => '"%s"',
				'priority' => '/p:%d',
				'title' => '/t:"%s"'			
			),
			'arg_order' => array('title', 'sticky', 'priority', 'icon', 'message')
		)
	);
	
	/**
	 * Class Constructor
	 */
	public function __construct() {
	
		if (!array_key_exists(PHP_OS, $this->growlPlatforms)) {
			return;
		}
		
		$this->checkGrowl();
	}

	public function available() {
		return $this->growlInstalled;
	}

	/**
	 * Display a Growl Notification
	 * @param string $title The Notification title
	 * @param string $message The Notification message
	 * @param string [$icon] Icon for the Notification. This should be an absolute path to a local image for maximum compatibility
	 * @param int [$priority=0] Priority for the Notification, -2 to 2
	 * @param bool [$sticky=false] Whether the Notification should be sticky
	 */
	public function notify($title, $message, $icon = null, $priority = null, $sticky = null) {
	
		if (!$this->growlInstalled) {
			return;
		}
		
		$config = $this->growlPlatforms[PHP_OS];
				
		$arg_str = '';
		
		foreach($config['arg_order'] as $a) {
			if ($$a !== null) {
				$arg_str .= ' ' . sprintf($config['args'][$a], $$a);
			}
		}
		
		$cmd = PHP_OS === 'WINNT' ? 'c: & "' . $this->growlPath . '" ' . str_replace("\n", '\n', $arg_str) : "{$this->growlPath} {$arg_str}";
		
		shell_exec($cmd);
	}

	/**
	 * Check if Growl is available
	 */
	private function checkGrowl() {
		
		if (file_exists($this->growlPlatforms[PHP_OS]['path'])) {
			$this->growlInstalled = true;
			$this->growlPath = $this->growlPlatforms[PHP_OS]['path'];
		}
		else { 
			$findOnPath = shell_exec(basename($this->growlPlatforms[PHP_OS]['path']) . ' ' . $this->growlPlatforms[PHP_OS]['args']['help']);
			
			if (strpos($findOnPath, 'growlnotify') !== false) {
				$this->growlInstalled = true;
				$this->growlPath = basename($this->growlPlatforms[PHP_OS]['path']);
			}
		}
				
		if (!$this->growlInstalled) {
			$message = str_replace(
				array('%url%', '%os%'),
				array(
					$this->growlPlatforms[PHP_OS]['url'],
					$this->growlPlatforms[PHP_OS]['name']
				),
				"You do not appear to have Growl installed.\n" .
				"If it is installed in a non-standard location, please make sure it is in your PATH environment variable.\n" .
				"Growl for %os% is available from %url%\n"
			);
			
			echo $message;
		}
	}
}
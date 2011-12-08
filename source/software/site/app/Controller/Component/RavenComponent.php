<?php
/*

	RavenComponent
	---------------

	@file 		RavenComponent.php
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

App::uses('Component', 'Controller');
App::import('Vendor', 'ucam_webauth');

class RavenComponent extends Component {
	private $key_dir = ''; // !TODO: set key file
	private $Raven = false;
	private $hostname = null;
	
	function initialize(&$controller, $settings = array()) {
		$this->hostname = $settings['hostname'] || $_SERVER['SERVER_NAME'];
		
		$chars = array(
			'abcdefghijklmnopqrstuvwxyz',
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'0123456789'
		);
		
		$entropy = '';
		while(strlen($entropy) < 32) {
			$set = rand(0,2);
			$max = strlen($chars[$set])-1;
			$pos = rand(0, $max);
			
			if($max < 0) continue;
			
			$entropy .= $chars[$set][$pos];
			
			$chars[$set] = substr_replace($chars[$set], '', $pos, 1);
		}
		
		$this->cookie_key = $entropy;
		
		
		$this->_authenticate();
	}
	
	private function _authenticate() {
		if(!$this->Raven) {
			$this->Raven = new Ucam_Webauth(array(
				'hostname'		=>	$this->hostname,
				'key_dir'		=>	$this->key_dir,
				'cookie_key'	=>	$this->cookie_key
			));	
		}
		
		$complete = $this->Raven->authenticate();
		
		if(!$complete) return false;
		
		return $this->Raven->success();
	}
	
	function user() {
		return $this->Raven->principle();
	}
	
	function error() {
		return array('status'=>$this->Raven->status(), 'error'=>$this->Raven->msg());
	}
}
?>
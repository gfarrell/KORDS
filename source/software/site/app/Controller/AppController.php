<?php
/*

	AppController Base Controller
	------------------------------

	@file 		AppController.php
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

App::uses('Controller', 'Controller');

class AppController extends Controller {
	var $components = array('Session', 'Security');
	var $helpers = array('Session', 'Html', 'Form');
	var $uses = array('User');
	var $acl = array('add','edit','delete');

	function isAuthorised() {
		if(isset($_SERVER['REMOTE_USER'])) {
			// Get CRSID from Raven Login
			$crsid = $_SERVER['REMOTE_USER'];
			$this->Session->write('Raven.user', $crsid);
			
			// Check if user exists in users database
			$u = $this->User->findByCrsid($crsid);
			
			if($u) {
				$auth = true;
				$this->Session->write('Kords.user_authorised', true);
			} else {
				$auth = false;
			}
			
			if(in_array($this->request['action'], $this->acl)) {
				return $auth;
			} else {
				return true;
			}
		} else {
			// mod_ucam_webauth isn't enabled, so there is no authentication system...
			$this->Session->write('Kords.user_authorised', true);
			return true;
		}
	}
	
	function beforeFilter() {
		parent::beforeFilter();
		
		if(!$this->isAuthorised()) {
			throw new ForbiddenException('Sorry, you are not authorised to access this');
		}
	}
	
	protected function _title($title) {
		$this->set('title_for_layout', $title . '&lsaquo; KORDS');
	}
}
?>
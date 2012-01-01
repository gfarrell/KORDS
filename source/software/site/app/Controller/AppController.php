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
	var $components = array(/*'Raven',*/ 'Session', 'Security');
	var $helpers = array('Session', 'Html', 'Form');
	
	function isAuthorised() {}
}
?>
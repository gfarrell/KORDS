<?php
/*

	Cambridge University LDAP Lookup by CRSID
	------------------------------------------

	@file 		ucam_ldap.php
	@author 	Andrew Lee <al552@cam.ac.uk>

	Copyright (c) 2011 Andrew Lee

*/

/*
* Attempts to connect to the university's LDAP service at 
* ldap.lookup.cam.ac.uk and retrieve details about the
* user.
*/
public function lookupLDAP($crsid = '') {
	Configure::load('cfg_ucam_ldap');
	$config = Configure::read('ucam.ldap');
	$colleges = $config['colleges'];
	$college_data = $config['college_data'];
	
	if ($crsid != '')
		$this->crsid = strtolower($crsid);

	// Establish the connection
	if (!($ldap_conn = ldap_connect($config['server'],$config['port']))) {
		trigger_error(sprintf('Unable to connect to LDAP service at %s on %d',$config['server'],$config['port']), E_USER_WARNING);
		return false;
	}

	// Bind the LDAP connection
	if (!ldap_bind($ldap_conn)) {
		trigger_error('Unable to bind the LDAP connection', E_USER_WARNING);
		return false;
	}

	// Get the UCS Registered name and the list of instids
	$result = ldap_search($ldap_conn, $config['base'], '(uid=' . $this->crsid . ')', array('cn','sn','instid'));
	$data = ldap_get_entries($ldap_conn, $result);

	if ($data['count'] < 1) {
		trigger_error(sprintf('Unable to find user %s in the LDAP database', $this->crsid), E_USER_WARNING);
		return false;
	}

	// Take the first data entry we got
	$data = $data[0];

	// Set the UCS Registered name

	if ($data['sn'][0] == $this->crsid) {
		// Suppressed surname
		$this->lname = '';
	} else {
		$this->lname = trim($data['sn'][0]);
	}

	if ($data['cn'][0] == $this->crsid) {
		// Suppressed registered name
		$this->fname = '';
	} else {
		$data['cn'][0] = trim($data['cn'][0]);
		if ($this->lname != '' && substr($data['cn'][0],-strlen($this->lname)) == $this->lname) {
			// Try to match the last name to the registered name
			$this->fname = trim(substr($data['cn'][0],0,-strlen($this->lname)));
		} else {
			// Split and take the last word as the last name
			$pos = strrpos($data['cn'][0],' ');
			$this->fname = substr($data['cn'][0],0,$pos);
			$this->lname = substr($data['cn'][0],$pos+1);
		}
	}

	// Filter through institution data till we find one which corresponds to a known
	// college.
	$this->college = 0;
	for ($i = 0; $i < $data['instid']['count']; $i++) {
		if (array_key_exists(strtoupper($data['instid'][$i]), $college_data)) {
			$this->college = $colleges[strtoupper($data['instid'][$i])];	//! This needs to be looked at in terms of matching data formats to config file.
			break;
		}
	}

	// Close the connection
	ldap_close($ldap_conn);

	return true;

}

?>
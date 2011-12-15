<?php
/*

	Cambridge University LDAP Configuration File
	---------------------------------------------

	@file 		cfg_ucam_ldap.php
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

// Server Connection 
Configure::write('Kords.LDAP', array(
	'server'	=>	'ldap.lookup.cam.ac.uk',
	'port'		=>	'389',
	'base'		=>	'o=University of Cambridge,dc=cam,dc=ac,dc=uk'
));

// College list
Configure::write('Kords.Colleges', array(
	0 => 'Not applicable',
	1 => 'Gonville and Caius College',
	2 => 'St Catharine\'s College',
	3 => 'Christ\'s College',
	4 => 'Churchill College',
	5 => 'Clare College',
	6 => 'Clare Hall',
	7 => 'Corpus Christi College',
	8 => 'Darwin College',
	9 => 'Downing College',
	10 => 'St Edmund\'s College',
	11 => 'Emmanuel College',
	12 => 'Fitzwilliam College',
	13 => 'Girton College',
	14 => 'Homerton College',
	15 => 'Hughes Hall',
	16 => 'Jesus College',
	17 => 'St John\'s College',
	18 => 'King\'s College',
	19 => 'Lucy Cavendish College',
	20 => 'Magdalene College',
	21 => 'New Hall',
	22 => 'Newnham College',
	23 => 'Pembroke College',
	24 => 'Peterhouse',
	25 => 'Queens\' College',
	26 => 'Robinson College',
	27 => 'Selwyn College',
	28 => 'Sidney Sussex College',
	29 => 'Trinity College',
	30 => 'Trinity Hall',
	31 => 'Wolfson College'
));

// College institutions
Configure::write('Kords.CollegeData', array(
	//
	// Gonville and Caius College
	//
	1 => array(
		'CAIUS' => 1, 
		'CAIUSPG' => 1, // Graduates and Postgraduates 
		'CAIUSUG' => 1 // Undergraduates
	),
	
	//
	// St Catharine's College
	//
	2 => array(
		'CATH' => 2, 
		'CATHPG' => 2, // Graduates and Postgraduates 
		'CATHUG' => 2 // Undergraduates
	),
	
	//
	// Christ's College
	//
	3 => array(
		'CHRISTS' => 3, 
		'CHRSTPG' => 3, // Graduates and Postgraduates 
		'CHRSTUG' => 3 // Undergraduates
	),
	
	//
	// Churchill College
	//
	4 => array(
		'CHURCH' => 4, 
		'CHURPG' => 4, // Graduates and Postgraduates 
		'CHURUG' => 4 // Undergraduates
	),
	
	//
	// Clare College
	//
	5 => array(
		'CLARE' => 5, 
		'CLAREPG' => 5, // Graduates and Postgraduates 
		'CLAREUG' => 5 // Undergraduates
	),
	
	//
	// Clare Hall
	//
	6 => array(
		'CLAREH' => 6, 
		'CLARHPG' => 6 // Graduates and Postgraduates
	),
	
	//
	// Corpus Christi College
	//
	7 => array(
		'CORPUS' => 7, 
		'CORPPG' => 7, // Graduates and Postgraduates 
		'CORPUG' => 7 // Undergraduates
	),
	
	//
	// Darwin College
	//
	8 => array(
		'DARWIN' => 8, 
		'DARPG' => 8 // Graduates and Postgraduates
	),
	
	//
	// Downing College
	//
	9 => array(
		'DOWN' => 9, 
		'DOWNPG' => 9, // Graduates and Postgraduates 
		'DOWNUG' => 9 // Undergraduates
	),
	
	//
	// St Edmund's College
	//
	10 => array(
		'EDMUND' => 10, 
		'EDMPG' => 10, // Graduates and Postgraduates 
		'EDMUG' => 10, // Undergraduates
		// Faraday Institute
		'FARADAY' => 10,
		// Von Hugel Institute
		'HUGEL' => 10
	),
	
	//
	// Emmanuel College
	//
	11 => array(
		'EMM' => 11, 
		'EMMPG' => 11, // Graduates and Postgraduates 
		'EMMUG' => 11 // Undergraduates
	),
	
	//
	// Fitzwilliam College
	//
	12 => array(
		'FITZ' => 12, 
		'FITZPG' => 12, // Graduates and Postgraduates 
		'FITZUG' => 12 // Undergraduates
	),
	
	//
	// Girton College
	//
	13 => array(
		'GIRTON' => 13, 
		'GIRTPG' => 13, // Graduates and Postgraduates 
		'GIRTUG' => 13 // Undergraduates
	),
	
	//
	// Homerton College
	//
	14 => array(
		'HOM' => 14, 
		'HOMPG' => 14, // Graduates and Postgraduates 
		'HOMUG' => 14 // Undergraduates
	),
	
	//
	// Hughes Hall
	//
	15 => array(
		'HUGHES' => 15, 
		'HUGHPG' => 15, // Graduates and Postgraduates 
		'HUGHUG' => 15 // Undergraduates
	),
	
	//
	// Jesus College
	//
	16 => array(
		'JESUS' => 16, 
		'JESUSPG' => 16, // Graduates and Postgraduates 
		'JESUSUG' => 16 // Undergraduates
	),
	
	//
	// St John's College
	//
	17 => array(
		'JOHNS' => 17, 
		'JOHNSPG' => 17, // Graduates and Postgraduates 
		'JOHNSUG' => 17 // Undergraduates
	),
	
	//
	// King's College
	//
	18 => array(
		'KINGS' => 18,
		'KCRC' => 18, // King's research centre
		'KINGSPG' => 18, // Graduates and Postgraduates 
		'KINGSUG' => 18 // Undergraduates 
	),
	
	//
	// Lucy Cavendish College
	//
	19 => array(
		'LCC' => 19, 
		'LCCPG' => 19, // Graduates and Postgraduates 
		'LCCUG' => 19 // Undergraduates
	),
	
	//
	// Magdalene College
	//
	20 => array(
		'MAGD' => 20, 
		'MAGDPG' => 20, // Graduates and Postgraduates 
		'MAGDUG' => 20 // Undergraduates
	),
	
	//
	// New Hall
	//
	21 => array(
		'NEWH' => 21, 
		'NEWHPG' => 21, // Graduates and Postgraduates 
		'NEWHUG' => 21 // Undergraduates
	),
	
	//
	// Newnham College
	//
	22 => array(
		'NEWN' => 22, 
		'NEWNPG' => 22, // Graduates and Postgraduates 
		'NEWNUG' => 22 // Undergraduates
	),
	
	//
	// Pembroke College
	//
	23 => array(
		'PEMB' => 23, 
		'PEMBPG' => 23, // Graduates and Postgraduates 
		'PEMBUG' => 23 // Undergraduates
	),
	
	//
	// Peterhouse
	//
	24 => array(
		'PET' => 24, 
		'PETPG' => 24, // Graduates and Postgraduates 
		'PETUG' => 24 // Undergraduates
	),
	
	//
	// Queens' College
	//
	25 => array(
		'QUEENS' => 25, 
		'QUENPG' => 25, // Graduates and Postgraduates 
		'QUENUG' => 25 // Undergraduates
	),
	
	//
	// Robinson College
	//
	26 => array(
		'ROBIN' => 26, 
		'ROBINPG' => 26, // Graduates and Postgraduates 
		'ROBINUG' => 26 // Undergraduates
	),
	
	//
	// Selwyn College
	//
	27 => array(
		'SEL' => 27, 
		'SELPG' => 27, // Graduates and Postgraduates 
		'SELUG' => 27 // Undergraduates
	),
	
	//
	// Sidney Sussex College
	//
	28 => array(
		'SID' => 28, 
		'SIDPG' => 28, // Graduates and Postgraduates 
		'SIDUG' => 28 // Undergraduates
	),
	
	//
	// Trinity College
	//
	29 => array(
		'TRIN' => 29,		
		'TRINLIB' => 29, // Trinity College Library
		'TRINPG' => 29, // Graduates and Postgraduates 
		'TRINUG' => 29, // Undergraduates 
		// Isaac Newton Trust
		'TRININT' => 29
	),
	
	//
	// Trinity Hall
	//
	30 => array(
		'TRINH' => 30, 
		'TRINHPG' => 30, // Graduates and Postgraduates 
		'TRINHUG' => 30 // Undergraduates
	),
	
	//
	// Wolfson College
	//
	31 => array(
		'WOLFC' => 31, 
		'WOLFCPG' => 31, // Graduates and Postgraduates 
		'WOLFCUG' => 31 // Undergraduates
	)
));

?>
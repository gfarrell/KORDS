<?php


#	KORDS Landing Page Layout
#	-------------------------

#	@file 		landing.ctp
#	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

#	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>


?>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" language="text/css" href="/css/bootstrap.css" />
		<link rel="stylesheet" language="text/css" href="/css/screen.css" />
		<link href='http://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic,900italic|Sansita+One' rel='stylesheet' type='text/css'>
		
		<script language="javascript" type="text/javascript" src="/js/dep.js"></script>
		<script language="javascript" type="text/javascript" src="/js/uikit.js"></script>
		<script language="javascript" type="text/javascript" src="/js/core.js"></script>
		
		<title>Welcome to KORDS</title>
	</head>
	<body class="tiled_light">
		<div class="container">
			<?= $content_for_layout; ?>
		</div>
	</body>
</html>
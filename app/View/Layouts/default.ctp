<?php


#	KORDS Default Layout
#	---------------

#	@file 		default.ctp
#	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

#	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>


?>
<!DOCTYPE html>
<html>
	<head>
		<link rel="stylesheet" language="text/css" href="/css/bootstrap.css" />
		<link rel="stylesheet" language="text/css" href="/css/responsive.css" />
		<link rel="stylesheet" language="text/css" href="/resources/BaseCSS" />
		<link href='http://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic,900italic|Sansita+One' rel='stylesheet' type='text/css'>
		
		<script language="javascript" type="text/javascript" src="/resources/Dependencies"></script>
		<script language="javascript" type="text/javascript" src="/resources/UIKit"></script>
		<script language="javascript" type="text/javascript" src="/resources/KordsJS"></script>		
		<title><?= $title_for_layout; ?></title>
	</head>
	<body>
		<div class="container-fluid">
			<?= $this->Session->flash('flash', array('element'=>'info_message')); ?>
			<?= $content_for_layout; ?>
		</div>
		<script language="javascript" type="text/javascript" defer="defer">
			var behaviour = new Behavior().apply(document.body);
			var delegator = new Delegator({
				getBehavior: function(){ return behaviour; }
			}).attach(document.body);
		</script>
	</body>
</html>
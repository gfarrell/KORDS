<!DOCTYPE html>
<!--
    KORDS - King's Online Room Database System
    ==========================================

    @author    Gideon Farrell <me@gideonfarrell.co.uk>
    @url       http://github.com/gfarrell/KORDS
    @license   GNU General Public License v3.0 http://opensource.org/licenses/GPL-3.0

    Copyright (C) 2012 Gideon Farrell

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
-->
<html>
	<head>
		<!-- Charset spec -->
		<meta charset="utf-8">

		<!-- Mobile viewport optimized: h5bp.com/viewport -->
		<meta name="viewport" content="width=device-width">

		<!-- Styles -->
		<link rel="stylesheet" language="text/css" href="/css/styles.css" />

		<!-- The only script we run at the start is respond.js -->
		<script src="/js/Lib/respond.js"></script>

		<!-- Load fonts -->
		<link href='http://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic,900italic|Sansita+One' rel='stylesheet' type='text/css'>			

		<!-- Author/Description -->
		<meta name="description" content="King's Online Room Database System">
		<meta name="author" content="Gideon Farrell">

		<!-- Title -->
		<title><?= $title_for_layout; ?></title>
	</head>
	<body>
		<!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
				chromium.org/developers/how-tos/chrome-frame-getting-started -->
		<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
		<div><?php echo $this->Session->flash('flash', array('element'=>'info_message')); ?></div>
		<div><?php echo $this->fetch('content'); ?></div>
		
		<!-- Load application scripts -->
		<?php if(PRODUCTION) { // Loaded at the bottom for page performance
			echo '<script id="AppMainJs" src="js/app.js"></script>';
		} else {
			echo '<script id="AppMainJs" data-main="/js/main" src="/js/Lib/Require/require.js"></script>';
		} ?>
	</body>
</html>
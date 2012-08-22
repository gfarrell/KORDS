<div id="KordsApp" data-view="AppView"></div>

<!-- Load application scripts -->
<?php if(PRODUCTION) { // Loaded at the bottom for page performance
    echo '<script id="AppMainJs" src="js/app_admin.js"></script>';
} else {
    echo '<script id="AppMainJs" data-main="/js/admin" src="/js/Lib/Require/require.js"></script>';
}
?>
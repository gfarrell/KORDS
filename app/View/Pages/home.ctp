<div id="KordsApp" data-view="AppView"></div>

<!-- Load application scripts -->
<?php if(PRODUCTION) { // Loaded at the bottom for page performance
    echo '<script id="AppMainJs" src="js/app.js"></script>';
} else {
    echo '<script id="AppMainJs" src="/js/Lib/Require/require.js"></script>';
}
?>

<script language="javascript">
// Initialise application
define('app_bootstrap', function() {
    return {
        Locations:   <?php echo $locations;    ?>,
        RentBands:   <?php echo $rent_bands;   ?>,
        TenantTypes: <?php echo $tenant_types; ?>
    }
});
</script>

<script src="/js/main.js"></script>
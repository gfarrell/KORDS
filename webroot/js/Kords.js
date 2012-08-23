/*
    Main App Class
    --------------

    @file       Kords.js
    @package    Kords
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/core', 'underscore', 'backbone'],
    function() {
        var Kords = new Class({
            bootstrap: {
                Locations:   {},
                RentBands:   {},
                TenantTypes: {}
            }
        });

        _.extend(Kords.prototype, Backbone.Events);

        return new Kords();
});
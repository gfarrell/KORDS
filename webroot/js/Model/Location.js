/*
    Model:Location
    ----------

    @file     Location.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational', 'Model/AppModel'],
    function(Backbone, AppModel) {
        var Location = AppModel.extend({
            name: 'Location',
            url:  '/json/locations'
        });

        return Location;
    }
);
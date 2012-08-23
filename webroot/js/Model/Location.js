/*
    Model:Location
    ----------

    @file     Location.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational'],
    function(Backbone) {
        var Location = Backbone.RelationalModel.extend({
            url: '/json/locations'
        });

        return Location;
    }
);
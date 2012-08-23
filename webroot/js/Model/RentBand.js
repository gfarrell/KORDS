/*
    Model:RentBand
    ----------

    @file     RentBand.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational'],
    function(Backbone) {
        var RentBand = Backbone.RelationalModel.extend({
            url: '/json/rent_bands'
        });

        return RentBand;
    }
);
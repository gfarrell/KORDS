/*
    Model:RentBand
    ----------

    @file     RentBand.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational', 'Model/AppModel'],
    function(Backbone, AppModel) {
        var RentBand = AppModel.extend({
            name: 'RentBand',
            url: '/json/rent_bands',
            displayAttribute: 'long_cost'
        });

        return RentBand;
    }
);
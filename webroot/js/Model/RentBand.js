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
            displayAttribute: 'long_cost',

            getDisplay: function() {
                var disp = 'Band {id}: £{cost_short} (£{cost_long})';
                return disp.substitute({
                    id: this.get('id'),
                    cost_short: this.get('cost_short')/100,
                    cost_long: this.get('cost_long')/100
                });
            }
        });

        return RentBand;
    }
);
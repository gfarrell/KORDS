/*
    AppModel: Basic inheritance class
    ---------------------------------

    @file       AppModel.js
    @package    Kords/Model
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Kords', 'Backbone/relational'],
    function(Kords) {
        Kords.AppModel = Backbone.RelationalModel.extend({
            displayAttribute: 'name'
        });

        return Kords.AppModel;
    }
);
/*
    AppModel: Basic inheritance class
    ---------------------------------

    @file       AppModel.js
    @package    Kords/Model
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['underscore', 'Backbone/relational'],
    function(_, Backbone) {
        var AppModel = Backbone.RelationalModel.extend({
            displayAttribute: 'name'
        });

        return AppModel;
    }
);
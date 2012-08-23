/*
    View:Rooms/Index
    ----------------

    @file       Index.js
    @package    Kords/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['backbone', 'text!Template/Rooms/Filter.html', 'View/Helper/Form'],
    function(Backbone, FilterControl, filter_html, FormHelper) {
        var RoomsIndexView = Backbone.View.extend({
            tagName: 'div',

            initialize: function(opts) {
                this.__nc = opts.__nc;

                // Set up a side filter

            },

            render: function() {

            }
        });

        return RoomsIndexView;
    }
);
/*
    View:Rooms/Index
    ----------------

    @file       Index.js
    @package    Kords/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/core', 'jquery', 'underscore', 'backbone', 'text!Template/Rooms/Filter.html', 'View/Helper/Form', 'Collection/Locations', 'Collection/RentBands'],
    function(_Mootools, $, _, Backbone, filter_html, FormHelper, LocationsCollection, RentBandsCollection) {
        var RoomsIndexView = Backbone.View.extend({
            tagName: 'div',

            initialize: function(opts) {
                // Set up a side filter
                // We need to template the html (filter_html) and pass in the helper
                // Along with some data that we're going to get now...
                this.Locations = new LocationsCollection();
                this.RentBands = new RentBandsCollection();

                this.Locations.fetch();
                this.RentBands.fetch();

                var filter_temp = _.template(filter_html),
                    filter_form = new FormHelper('Filter', {
                            'inputDefaults': {
                                'options': {
                                    1: 'Yes',
                                    0: 'No'
                                },
                                'class': 'filter'
                            }
                        });

                this.$filter = new Element('div', {
                    'class':    'sidebar left',
                    'html':     filter_temp({
                                    'Form':         filter_form,
                                    'locations':    this.Locations.list(),
                                    'rent_bands':   this.RentBands.list()
                                })
                });

                $(this.$filter).appendTo(this.$el);
            },

            render: function() {

            }
        });

        return RoomsIndexView;
    }
);
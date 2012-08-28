/*
    View:Rooms/Index
    ----------------

    @file       Index.js
    @package    Kords/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['View/Kords', 'text!Template/Rooms/Filter.html', 'Collection/Rooms', 'Collection/Locations', 'Collection/RentBands'],
    function(KordsView, filter_html, RoomsCollection, LocationsCollection, RentBandsCollection) {
        var RoomsIndexView = KordsView.extend({
            tagName: 'div',

            templates: {
                filter: filter_html
            },

            initialize: function(opts) {
                this.processTemplates();

                // Set up a side filter
                // We need to template the html (filter_html) and pass in the helper
                // Along with some data that we're going to get now...
                this.Locations = new LocationsCollection();
                    this.Locations.reset(this.bootstrap().Locations, {parse: true});
                this.RentBands = new RentBandsCollection();
                    this.RentBands.reset(this.bootstrap().RentBands, {parse: true});

                this.$filter = new Element('div', {
                    'class':    'sidebar left',
                    'html':     this.template(this.templates.filter, {
                                    'locations':    this.Locations.list(),
                                    'rent_bands':   this.RentBands.list()
                                })
                });

                $(this.$filter).appendTo(this.$el);

                this.Rooms = new RoomsCollection();
            },

            },

            render: function() {

            }
        });

        return RoomsIndexView;
    }
);
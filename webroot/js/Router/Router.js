/*
    Main Router
    -----------

    @file     Router.js
    @package  Kords/Router
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    [
        'Mootools/core', 'backbone',
        'Model/Room',
        'Collection/Rooms', 'Collection/Locations',
        'View/App',
        'View/Errors/404'
    ],
    function(_Mootools, Backbone, Room, RoomsCollection, LocationsCollection, AppView) {
        var Router = Backbone.Router.extend({
            routes: {
                '':                    'landing',
                'rooms':               'room_index',
                'rooms/for\::type':    'room_index',
                'rooms/:id':           'room_view',
                'rooms/:id/edit':      'room_edit',
                'rooms/add':           'room_add',

                'locations':           'location_index',
                'locations/:id':       'location_view',
                'locations/:id/edit':  'location_edit',
                'locations/add':       'location_add',
                
                'admin':               'load_admin',
                'admin/*page':         'load_admin'
            },

            initialize: function(opts) {
                // Set up the AppView
                this.AppView = new AppView({
                    el: '#KordsApp'
                });

            },

            landing: function() {
                this.AppView.loadView('Pages/Landing');
            },

            // Room Actions
            // ------------

            room_index: function(for_who) {
                this.AppView.loadView('Rooms/Index', function(index_view) {
                    index_view.setFilter('for', for_who);
                });
            },
            room_view: function(id) {
                var _room = new Room({slug: id});
                
                this.AppView.loadView('Rooms/Display', function(view) {
                    view.model = _room;
                    _room.on('change', view.render, view);
                });

                _room.fetch({
                    error: function(_model, xhr, response) {
                        if(xhr.status == 404) {
                            this.AppView.loadView('Errors/404', function(view) {
                                view.item_type = 'Room';
                            });
                        }
                    }.bind(this)
                });
            },
            room_add: function() {},
            room_edit: function(id) {},

            // Location Actions
            // ----------------

            location_index: function() {},
            location_view: function(id) {},
            location_add: function() {},
            location_edit: function(id) {},

            // Admin Actions
            // -------------
            load_admin: function(page) {
                Backbone.history.stop();
                window.location.pathname = '/admin/#' + (page !== undefined ? '/'+page : '/');
            }
        });

        return Router;
    }
);
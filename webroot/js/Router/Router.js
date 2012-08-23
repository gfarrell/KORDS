/*
    Main Router
    -----------

    @file     Router.js
    @package  Kords/Router
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/core', 'backbone', 'Collection/Rooms', 'Collection/Locations', 'View/App'],
    function(_Mootools, Backbone, RoomsCollection, LocationsCollection, AppView) {
        var Router = Backbone.Router.extend({
            routes: {
                '':                     'landing',
                'rooms':               'room_index',
                'rooms/*filter':       'room_index',
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
                // Set up the aggregator
                this.__nc = opts.__nc;

                // Set up the AppView
                this.AppView = new AppView({
                    __nc: opts.__nc,
                    el: '#KordsApp'
                });
            },

            // Room Actions
            // ------------

            room_index: function(filter) {
                var room_list = new RoomsCollection();
                this.AppView.loadView('Rooms/Index');
            },
            room_view: function(id) {},
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
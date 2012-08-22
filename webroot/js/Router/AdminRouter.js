/*
    Admin Router
    -------------

    @file     AdminRouter.js
    @package  Kords/Router
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['backbone'],
    function(Backbone) {
        var Router = Backbone.Router.extend({
            routes: {
                '':               'admin_home',
                '/comments':      'admin_comments',
                '/rooms':         'admin_rooms',
                '/locations':     'admin_locations',
                '/photos':        'admin_photos'
            },

            initialize: function(opts) {
                // Set up the aggregator
                this.__nc = opts.__nc;
            },

            // Admin Actions
            // -------------
            
            admin_home: function() {},
            admin_comments: function() {},
            admin_rooms: function() {},
            admin_locations: function() {},
            admin_photos: function() {}
        });

        return Router;
    }
);
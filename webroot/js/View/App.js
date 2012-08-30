/*
    View:App
    --------

    @file       App.js
    @package    Kords/View
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/core', 'backbone',
        'View/Pages/Landing', 'View/Rooms/Index'
    ],
    function() {
        var AppView = Backbone.View.extend({
            initialize: function() {
                this._loaded = null;

                // Create a structure
                this.$container = $(this.make('div', {'class':'container-fluid'}));
                this.$container.appendTo(this.$el);
            },

            loadView: function(name, bootstrap_function) {
                this.unloadView();

                var _class  = require('View/'+name),                // Let's load the view file
                    pretty  = name.replace('/', ''),                // Prettify the name by removing slashes (should end up with some camelcased niceness)
                    bs_name = '__bootstrap'+pretty,                 // Generate the name of the bootstrap function
                    view    = new _class();                         // Pass the event aggregator in

                // If there is a bootstrap function, bootstrap
                if(typeOf(bootstrap_function) == 'function') {      // Check if one has been passed in
                    bootstrap_function.call(this, view);            // Bootstrap: function(AppView, LoadedView)
                }

                this._loaded = view;                                // Store the view in _loaded

                // Now that we have a view to play with
                // we should insert it into our container object (that sounds dirty)
                view.$el.appendTo(this.$container);
            },

            unloadView: function() {
                if(this._loaded !== null) {
                    this._loaded.remove();
                    this._loaded.unbind();
                    this._loaded = null;
                }
            }
        });

        return AppView;
    }
);
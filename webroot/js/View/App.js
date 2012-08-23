/*
    View:App
    --------

    @file       App.js
    @package    Kords/View
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/Core', 'backbone', 'View/Rooms/Index'],
    function(_Mootools, Backbone, RoomsIndexView) {
        var AppView = Backbone.View.extend({
            initialize: function(opts) {
                this.__nc = opts.__nc;
                this._views = {};

                // Create a structure
                this.$container = $(this.make('div', {'class':'container'}));
                this.$container.appendTo(this.$el);
            },

            loadView: function(name, bootstrap_function) {
                var _class  = require('View/'+name),                    // Let's load the view file
                    pretty  = name.replace('/', ''),                    // Prettify the name by removing slashes (should end up with some camelcased niceness)
                    bs_name = '__bootstrap'+pretty,                     // Generate the name of the bootstrap function
                    view;

                if(!instanceOf(this._views[pretty], _class)) {          // If the class has never been loaded, instantiate it &c..
                    view = new _class({__nc: this.__nc});               // Pass the event aggregator in

                    // If there is a bootstrap function, bootstrap
                    if(typeOf(bootstrap_function) == 'function') {      // Check if one has been passed in, if so, this overrides
                        bootstrap_function.call(this, view);            // Bootstrap: function(AppView, LoadedView)
                    } else if(typeOf(this[bs_name]) == 'function') {    // Otherwise check if one is defined in AppView
                        this[bs_name].call(this, view);                 // Same signature as above
                    }

                    this._views[pretty] = view;                         // Store the view in _views
                } else {
                    view = this._views[pretty];                         // Otherwise just pull in the previously loaded one
                }

                // Now that we definitely have a view to play with
                // we should insert it into our container object (that sounds dirty)
                view.$el.appendTo(this.$container);

                // And render!
                view.render();
            }
        });

        return AppView;
    }
);
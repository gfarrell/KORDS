/*
    AppCollection: Basic inheritance class
    --------------------------------------

    @file       AppCollection.js
    @package    Kords/Collection
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['underscore', 'backbone'],
    function(_, Backbone) {
        var AppCollection = Backbone.Collection.extend({
            list: function() {
                // Iterate over the models, return a hash of key/value pairings
                // Where the key is the ID, the value is the model's display attribute
                var list                = {},
                    display_attribute   = this.model.displayAttribute !== undefined ? this.model.displayAttribute : 'name';
                
                this.each(function(model) {
                    console.log(model);
                    list[model.id] = model.get(display_attribute);
                });

                return list;
            }
        });

        return AppCollection;
    }
);
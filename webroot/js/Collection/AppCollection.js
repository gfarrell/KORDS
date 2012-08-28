/*
    AppCollection: Basic inheritance class
    --------------------------------------

    @file       AppCollection.js
    @package    Kords/Collection
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Kords'],
    function(Kords) {
        Kords.AppCollection = Backbone.Collection.extend({
            list: function() {
                // Iterate over the models, return a hash of key/value pairings
                // Where the key is the ID, the value is the model's display attribute
                var list                = {};
                
                this.each(function(model) {
                    list[model.id] = model.getDisplay();
                });

                return list;
            }
        });

        return Kords.AppCollection;
    }
);
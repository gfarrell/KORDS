/*
    AppModel: Basic inheritance class
    ---------------------------------

    @file       AppModel.js
    @package    Kords/Model
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Kords', 'Backbone/relational'],
    function(Kords) {
        Kords.AppModel = Backbone.RelationalModel.extend({
            name:             'AppModel',
            url:              '/json/models',
            displayAttribute: 'name',

            getDisplay: function() {
                return this.get(this.displayAttribute);
            },

            validate: function() { return; },

            parse: function(response) {
                // The way CakePHP gives us models is:
                // [
                //     {
                //         Model: {},
                //         RelatedModels: [],
                //         RelatedModel: {},
                //         ...
                //     },
                //     ...
                // ]
                //
                // But Backbone wants something slightly different:
                // [
                //      {
                //          id: ...,
                //          attrs: ...,
                //          ...
                //          RelatedModels: [],
                //          RelatedModel: {}
                //      }
                // ]
                // 
                // Thus our parse function will use the name attribute to get the core model data
                // and add in the rest as relational
                
                var data = response[this.name];
                if(data !== undefined) {
                    delete response[this.name];

                    Object.each(response, function(obj, key) {
                        data[key] = obj;
                    });
                } else {
                    data = response;
                }

                return data;
            },

            toJSON: function() {
                // CakePHP expects models as above in parse()
                // Backbone doesn't do things that way...
                // We have to fix it

                var data      = {},
                    related   = [],
                    model_key = this.name;

                data[model_key] = {};
                
                // Related models have keys in this.relations, so we can find out what they are first
                if(this.relations) {
                    related = _.pluck(this.relations, 'key');
                }

                related.each(function(n) {
                    if(this.get(n)) data[n] = this.get(n).toJSON();
                });

                _.each(this.attributes, function(attr, name) {
                    if(related.indexOf(name) == -1) {
                        data[model_key][name] = attr;
                    }
                });

                return data;
            }
        });

        return Kords.AppModel;
    }
);
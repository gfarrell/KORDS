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
                delete response[this.name];

                Object.each(response, function(obj, key) {
                    data[key] = obj;
                });

                return data;
            }
        });

        return Kords.AppModel;
    }
);
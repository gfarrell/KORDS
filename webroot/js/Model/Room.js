/*
    Model:Room
    ----------

    @file     Room.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational'],
    function(Backbone) {
        var Room = Backbone.RelationalModel.extend({
            url:            '/json/rooms/',    // API URL for rooms

            defaults:       {},
            relations:      [
                // BelongsTo
                // ---------
                {// Room belongsTo Location
                    type:               Backbone.HasOne,
                    relatedModel:       'Location',
                    key:                'Location'
                },

                // HasMany / HasAndBelongsToMany
                // -----------------------------
                {// Room hasMany Comment
                    type:               Backbone.HasMany,
                    relatedModel:       'Comment',
                    key:                'Comment',
                    collectionType:     'CommentsCollection'
                },
                {// Room hasAndBelongsToMany RoomImage
                    type:               Backbone.HasMany,
                    relatedModel:       'RoomImage',
                    key:                'RoomImages',
                    collectionType:     'CommentsCollection'
                }
            ],

            validate:       {},

            initialize:     function() {}
            
        });
    }    
);
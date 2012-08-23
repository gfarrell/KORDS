/*
    Model:Room
    ----------

    @file     Room.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational', 'Model/AppModel', 'Model/Location', 'Model/RentBand', 'Model/TenantType', 'Model/Comment', 'Model/RoomImage'],
    function(Backbone, AppModel, Location, RentBand, TenantType, Comment, RoomImage) {
        var Room = AppModel.extend({
            url:              '/json/rooms/',    // API URL for rooms
            displayAttribute: 'number',

            defaults:       {},
            relations:      [
                // BelongsTo
                // ---------
                {// Room belongsTo Location
                    type:               Backbone.HasOne,
                    relatedModel:       Location,
                    key:                'Location',
                    includeInJSON:      'id'
                },
                {// Room belongsTo RentBand
                    type:               Backbone.HasOne,
                    relatedModel:       RentBand,
                    key:                'RentBand',
                    includeInJSON:      'id'
                },
                {// Room belongsTo TenantType
                    type:               Backbone.HasOne,
                    relatedModel:       TenantType,
                    key:                'TenantType',
                    includeInJSON:      'id'
                },

                // HasMany / HasAndBelongsToMany
                // -----------------------------
                {// Room hasMany Comment
                    type:               Backbone.HasMany,
                    relatedModel:       Comment,
                    key:                'Comment',
                    //collectionType:     'CommentsCollection',
                    includeInJSON:      'id'
                },
                {// Room hasMany RoomImage
                    type:               Backbone.HasMany,
                    relatedModel:       RoomImage,
                    key:                'RoomImage',
                    //collectionType:     'RoomImagesCollection',
                    includeInJSON:      'id'
                }
            ],

            validate:       {},

            initialize:     function() {},

            parse: function(response) {
                /* Response structure from Cake:
                        {
                            Room: { ... room attributes ... },
                            Location: { ... location attributes ... },
                            RentBand: { ... rent band attributes ... },

                            --- NOT IN INDEX ---
                            Comment: [ ... array of comments ... ], 
                            RoomImage: [ ... array of roomimages ... ],
                            TenantType: { ... tenant type attributes ... }
                        }
                 */
                
                var room = response.Room;

                delete response.Room;

                Object.each(response, function(item, key) {
                    room[key] = item;
                });

                return room;
            }
        });

        return Room;
    }    
);
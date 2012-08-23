/*
    Model:RoomImage
    ----------

    @file     RoomImage.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational'],
    function(Backbone) {
        var RoomImage = Backbone.RelationalModel.extend({
            url: '/json/room_images'
        });

        return RoomImage;
    }
);
/*
    Model:RoomImage
    ----------

    @file     RoomImage.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational', 'Model/AppModel'],
    function(Backbone, AppModel) {
        var RoomImage = AppModel.extend({
            url: '/json/room_images'
        });

        return RoomImage;
    }
);
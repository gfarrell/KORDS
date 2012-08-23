/*
    Collection:Rooms
    ----------------

    @file     Rooms.js
    @package  Kords/Collection
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['backbone', 'Collection/AppCollection', 'Model/Room'],
    function(Backbone, AppCollection, Room) {
        var RoomsCollection = AppCollection.extend({
            model: Room,
            url: '/json/rooms',

            filterByNumber: function(query, exact) {
                exact = !!exact;                                        // Make sure it's a boolean
                var regex = new RegExp(query, 'gi'),                    // Instantiate Regex obj (for non-exact matching)
                    filt;                                               // The function we're going to use to filter

                if(exact) {
                    filt = function(room) {
                        return (room.get('number') == query);           // Standard equality
                    };
                } else {
                    filt = function(room) {
                        return room.get('number').search(regex) != -1;   // str.search -1 if string is not found
                    };
                }

                return this.filter(filt);                                // Run built-in _ method filter()
            }
        });

        return RoomsCollection;
    }
);
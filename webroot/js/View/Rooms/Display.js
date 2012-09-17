/*
    View:Display
    ------------

    The view for /rooms/id/view.

    @file       Display.js
    @package    js/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['View/Kords', 'Model/Room', 'text!Template/Rooms/Display.html'],
    function(KordsView, Room, display_html) {
        var RoomDisplayView = KordsView.extend({
            tagName: 'div',
            className: 'room-display',
            
            templates: {
                'main': display_html
            },

            initialize: function(opts) {
                
            }
        });

        return RoomDisplayView;
    }
);
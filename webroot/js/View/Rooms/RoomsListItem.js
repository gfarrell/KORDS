/*
    View:RoomsListItem
    ------------------

    Represents a single room as a number with some nice hover information.

    @file       RoomsListItem.js
    @package    js/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Kords', 'View/Kords', 'Model/Room'],
    function(Kords, KordsView, Room) {
        var RoomsListItemView = KordsView.extend({
            tagName: 'li',
            className: 'room',

            events: {
                'click': 'open',
                'hover': 'showInfo'
            },

            initialize: function(opts) {
                this.render();
                this.delegateEvents();
            },

            render: function() {
                // add class indicating whether or not the room is taken
                if(!this.model.get('available')) {
                    this.$el.addClass('taken');
                } else {
                    this.$el.removeClass('taken');
                }

                // Set html content
                this.$el.html(this.model.get('number'));
            },

            open: function() {
                Kords.Router.navigate('/#/rooms/'+this.model.get('number').toLowerCase().underscore());
            },
            showInfo: function() {}
        });

        return RoomsListItemView;
    }
);
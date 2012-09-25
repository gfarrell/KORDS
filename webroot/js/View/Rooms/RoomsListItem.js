/*
    View:RoomsListItem
    ------------------

    Represents a single room as a number with some nice hover information.

    @file       RoomsListItem.js
    @package    js/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Kords', 'View/Kords', 'Model/Room', 'bootstrap/tooltip'],
    function(Kords, KordsView, Room) {
        var RoomsListItemView = KordsView.extend({
            tagName: 'li',
            className: 'room',
            url: '#',

            events: {
                'click a': 'open'
            },

            tt_attributes: ['ensuite','smoking','set','piano'],

            initialize: function(opts) {
                this.render();
                this.delegateEvents();
                this.url = '/#/rooms/'+this.model.get('slug');
            },

            render: function() {
                // add class indicating whether or not the room is taken
                if(!this.model.get('available')) {
                    this.$el.addClass('taken');
                } else {
                    this.$el.removeClass('taken');
                }

                // create the anchor
                this.$a = $(this.make('a', {'href': this.url}));
                this.$a.appendTo(this.$el);

                // Set the tooltip
                this.$a.attr('rel', 'tooltip');
                this.$a.attr('data-placement', 'left');
                var title = '<span class="room-labels">';
                this.tt_attributes.each(function(attrib) {
                    var label_class = !this.model.get(attrib) ? 'label-important' : 'label-success';
                    title += this.helpers.Html.tag('span', attrib, {'class':'label '+label_class});
                }, this);
                title += "</span>";
                this.$a.attr('title', title);
                this.$a.tooltip();

                // Set html content
                this.$a.html(this.model.get('number'));
            },

            open: function(e) {
                e.preventDefault();
                Kords.Router.navigate(this.url);
            },
            showInfo: function() {}
        });

        return RoomsListItemView;
    }
);
/*
    View:Display
    ------------

    The view for /rooms/id/view.

    @file       Display.js
    @package    js/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    [
        'View/Kords', 'Model/Room',
        'text!Template/Rooms/Display.html',
        'View/Comments/Comments',
        'Mootools/more'
    ],
    function(KordsView, Room, display_html, CommentsView) {
        var RoomDisplayView = KordsView.extend({
            tagName: 'div',
            className: 'room-display',
            
            templates: {
                'main':         display_html
            },

            initialize: function(opts) {
                this.processTemplates();
            },

            render: function() {
                this.$el.empty();
                this.undelegateEvents();

                if(this.model) {
                    this.$el.append(this.template('main', {
                        room:      this.model.attributes,
                        location:  this.model.get('Location').attributes,
                        rent_band: this.model.get('RentBand')
                    }));
                    this.Comments = new CommentsView({
                                        el:         this.$el.find('#Comments'),
                                        collection: this.model.get('Comment'),
                                        room_id:    this.model.get('id')
                                    });
                }

                this.delegateEvents();
            }            
        });

        return RoomDisplayView;
    }
);
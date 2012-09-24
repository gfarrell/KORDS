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
        'text!Template/Rooms/Display.html', 'text!Template/Comments/Row.html',
        'Mootools/more'
    ],
    function(KordsView, Room, display_html, comment_html) {
        var RoomDisplayView = KordsView.extend({
            tagName: 'div',
            className: 'room-display',
            
            templates: {
                'main':         display_html,
                'comment_body': comment_html
            },

            initialize: function(opts) {
                this.processTemplates();
            },

            render: function() {
                this.$el.empty();
                if(this.model) {
                    this.$el.append(this.template('main', {
                        room:      this.model.attributes,
                        location:  this.model.get('Location').attributes,
                        comments:  this.model.get('Comment'),
                        rent_band: this.model.get('RentBand'),
                        commenter: function(data) { return this.template('comment_body', data); }.bind(this)
                    }));
                }
            }
        });

        return RoomDisplayView;
    }
);
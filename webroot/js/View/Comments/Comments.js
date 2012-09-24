/*
    View:Comments
    -------------

    @file       Comments.js
    @package    js/View/Comments
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['View/Kords', 'View/Comments/Comment', 'View/Comments/AddComment'],
    function(KordsView, CommentView, AddCommentView) {
        var CommentsView = KordsView.extend({
            tagName:   'section',
            className: 'row hrule',

            initialize: function(opts) {
                this.comments = [];

                this.$rows = $(this.helpers.Html.element('ul', '', {'class':'rows comments'}));
                this.$rows.appendTo(this.$el);

                this.creator = new AddCommentView({room_id: opts.room_id});
                this.creator.$el.appendTo(this.$el);

                this.collection.on('change', this.render, this);
                this.render();
            },

            render: function() {
                this.$rows.empty();

                this.collection.each(function(c, i) {
                    this.comments[i] = new CommentView({model: c});
                    this.comments[i].$el.appendTo(this.$rows);
                }, this);
            }
        });

        return CommentsView;
    }
);
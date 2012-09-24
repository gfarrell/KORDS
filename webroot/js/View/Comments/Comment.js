/*
    View:Comment
    ------------

    @file       Comment.js
    @package    js/View/Comments
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['View/Kords', 'text!Template/Comments/Row.html'],
    function(KordsView, comment_html) {
        var CommentView = KordsView.extend({
            tagName:   'li',
            className: 'comments rows',

            templates: {
                main: comment_html
            },

            events: {
                'click .delete': 'del'
            },

            initialize: function() {
                this.processTemplates();

                this.model.on('change', this.render, this);

                this.render();
            },

            render: function() {
                this.$el.empty();
                this.$el.append(this.template('main', {comment: this.model}));

                this.delegateEvents();
            },

            del: function(e) {
                e.preventDefault();
                this.helpers.Html.Bootstrap.Bootbox.confirm('Are you sure you want to delete this comment? This is not reversible.', function(r) {
                    if(r) {
                        this.model.destroy();
                    }
                }.bind(this));
            }
        });

        return CommentView;
    }
);
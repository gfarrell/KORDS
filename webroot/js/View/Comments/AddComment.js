/*
    View:AddComment
    ---------------

    @file       AddComment.js
    @package    js/View/Comments
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['View/Kords', 'text!Template/Comments/Add.html'],
    function(KordsView, template_html) {
        var AddCommentView = KordsView.extend({
            tagName: 'div',
            id: 'AddComment',

            events: {
                'click .btn-primary': 'post',
                'click .btn-danger':  'reset'
            },

            templates: {
                main: template_html
            },

            initialize: function(opts) {
                this.room_id = opts.room_id;
                this.processTemplates();

                this.render();
            },

            post: function(e) {
                e.preventDefault();

                var value = this.$el.find('textarea').val();

                this.collection.create({
                    body:    value,
                    room_id: this.room_id
                });

                this.reset();
            },
            reset: function(e) {
                if(e) e.preventDefault();

                this.$el.find('textarea').val('');
            },

            render: function() {
                this.$el.append(this.template('main', {room_id: this.room_id}));
            }
        });

        return AddCommentView;
    }
);
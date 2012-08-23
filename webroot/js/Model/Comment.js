/*
    Model:Comment
    ----------

    @file     Comment.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational'],
    function(Backbone) {
        var Comment = Backbone.RelationalModel.extend({
            url: '/json/comments'
        });

        return Comment;
    }
);
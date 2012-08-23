/*
    Model:Comment
    ----------

    @file     Comment.js
    @package  Kords/Model
    @author   Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Backbone/relational', 'Model/AppModel'],
    function(Backbone, AppModel) {
        var Comment = AppModel.extend({
            url: '/json/comments'
        });

        return Comment;
    }
);
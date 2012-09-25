/*
    Collection:Comments
    --------------------

    @file       Comments.js
    @package    Kords/Collection
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Collection/AppCollection', 'Model/Comment'],
    function(AppCollection, Comment) {
        var CommentsCollection = AppCollection.extend({
            model: Comment,
            url:   '/comments.json'
        });

        return CommentsCollection;
    }
)
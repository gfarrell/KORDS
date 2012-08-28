/*
    Helper:Html
    -----------

    Helps with HTML generation in templates. Inspired by CakePHP's HTML helper.

    @file       Html.js
    @package    js/View/Helper
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/core'],
    function() {
        var HtmlHelper = new Class({
            tag: function(tagName, content, attributes) {
                var el = document.createElement(tagName);

                el.innerHTML = content;
                $(el).attr(attributes || {});

                return el.outerHTML;
            },
            link: function(url, title, attributes) {
                return this.tag('a', title || url, Object.merge(attributes || {}, {href: url}));
            }
        });

        return new HtmlHelper();
    }
);
/*
    Helper:Html
    -----------

    Helps with HTML generation in templates. Inspired by CakePHP's HTML helper.

    @file       Html.js
    @package    js/View/Helper
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['bootstrap/button'],
    function() {
        var HtmlHelper = {
            tag: function(tagName, content, attributes) {
                return this.tagFromElement(this.element(tagName, content, attributes));
            },

            element: function(tagName, content, attributes) {
                var el  = document.createElement(tagName),
                    $el = $(el);

                el.innerHTML = content;
                $el.attr(attributes || {});

                return el;
            },

            tagFromElement: function(element) {
                return element.outerHTML;
            },

            link: function(url, title, attributes) {
                return this.tag('a', title || url, Object.merge(attributes || {}, {href: url}));
            }
        };

        return new HtmlHelper();
    }
);
/*
    Helper:Html
    -----------

    Helps with HTML generation in templates. Inspired by CakePHP's HTML helper.

    @file       Html.js
    @package    js/View/Helper
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['bootstrap/button', 'bootstrap/alert', 'Lib/bootbox'],
    function(btn, alt, bootbox) {
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
            },

            image: function(src, alt, attributes) {
                return this.tag('img', '', Object.merge(attributes || {}, {src: src, alt: alt}));
            }
        };

        HtmlHelper.Bootstrap = {
            radioButtons: function(buttons, group_attributes) {
                /*
                    Structure of Bootstrap's radio buttons:
                    <div class="btn-group" data-toggle="buttons-radio">
                        <button type="button" class="btn">Text</button>
                        ...
                    </div>

                    We're also going to add data-value to make it more like a form control
                 */
                
                group_attributes = group_attributes || {};
                
                var attrs  = {'class':'btn-group input-prepend', 'data-toggle':'buttons-radio'},
                    group  = HtmlHelper.element('div', '', group_attributes),
                    $group = $(group);

                $group.addClass(attrs['class']);
                $group.attr('data-toggle', attrs['data-toggle']);

                if(group_attributes.label !== undefined) {
                    $(HtmlHelper.element('span', group_attributes.label, {'class':'add-on'})).prependTo($group);
                }

                if(typeOf(buttons) == 'array') {
                    var btn_tmp = buttons;
                    buttons = {};

                    btn_tmp.each(function(button) { buttons[button] = button; });
                }

                Object.each(buttons, function(title, value) {
                    var props = {'class':'btn', 'data-value':value};

                    if(group_attributes.selected !== undefined){
                        if(group_attributes.selected == value) {
                            props['class'] += ' active';
                        }
                    }

                    if(!instanceOf(title, String)) {
                        props = Object.merge(props, title);
                        title = props.title || value;
                    }
                    var button = HtmlHelper.element('button', title, props);
                    $(button).appendTo($group);
                });

                return HtmlHelper.tagFromElement(group);
            },

            alert: function(content, _class, no_close) {
                _class = 'alert ' + (_class||'');

                var close_button  = no_close === true ? '' : HtmlHelper.tag('a', '&times;', {'href':'#', 'data-dismiss':'alert', 'class':'close'}),
                    alert_element = HtmlHelper.tag('div', close_button+' '+content, {'class':_class});

                return alert_element;
            }
        };

        HtmlHelper.Bootstrap.Bootbox = bootbox;

        return HtmlHelper;
    }
);
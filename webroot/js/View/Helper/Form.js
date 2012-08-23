/*
    Helper:Form
    -----------

    @file       Form.js
    @package    Kords/View/Helper
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Mootools/core', 'Core/String.extend', 'jquery', 'Backbone/relational'],
    function(_mootools, _string, $, Backbone) {
        var FormHelper = new Class({
            Implements: [Options],

            specialAttributes: ['div', 'before', 'after', 'label', 'empty'],

            options: {
                model: null,
                inputDefaults: {
                    'div':        'control-group',
                    'before':     '<div class="controls">',
                    'after':      '</div>',
                    'label':      '',
                    'options':    {},
                    'empty':      'Please select'
                }
            },

            initialize: function(name, attributes) {
                this.setOptions(attributes);
                this.name = name;
                this._elements = {};
            },

            start: function() {
                return '<form id="{name}Form">'.substitute({name: this.name});
            },
            end: function(buttons) {
                if(buttons !== false) {
                    // TODO: implement buttons for submit/cancel etc.
                }
                return '</form>';
            },

            // Form element creation methods
            // -----------------------------

            input: function(name, attributes) {
                return this.__makeFormElement('input', name, attributes);
            },

            select: function(name, attributes) {
                return this.__makeFormElement('select', name, attributes);
            },

            textarea: function(name, attributes) {
                return this.__makeFormElement('textarea', name, attributes);
            },

            button: function(name, attributes) {
                return this.__makeTag('button', attributes);
            },


            // Utility Functions
            // -----------------
            
            __register: function(name, element) {
                this._elements[name] = element;
            },

            __makeTag: function(tag, attributes) {
                if(typeOf(attributes) != 'object') attributes = {};
                return (new Element(tag, attributes));
            },

            __makeHtml: function(tag, attributes) {
                return this.__makeTag(tag, attributes).outerHtml;
            },

            __makeFormElement: function(tag, name, options) {
                // Merge the inputDefaults with the passed options
                options = Object.merge(Object.clone(this.options.inputDefaults), options);

                // Split the names by full stops, this denotes separate fields
                // Create a prettified name for the field id
                // And create a name attribute for the post/get data
                // Extract all options that are not in the inputDefaults and use them as tag attributes

                var names       = name.split('.'),
                    pretty      = names.join('_').camelise().capitalize(),
                    pretty_full = this.name.capitalize() + pretty,
                    data_name   = 'data['+this.name.capitalize()+']['+names.join('][')+']',
                    attributes  = Object.filter(options, function(val, key) { return !this.specialAttributes.contains(key); }, this),
                    parent, enclosure, element, label;

                // Create the element itself
                element = new Element(tag, attributes);
                element.set('id', pretty_full);

                // If the tag is select, checkbox, radio deal with options
                switch(tag) {
                    case 'select':
                        if(options.empty !== false) {
                            var empty = new Element('option', {
                                value: '',
                                html: options.empty
                            });
                            empty.inject(element);
                        }

                        if(typeOf(options.options) == 'array') {
                           options.options.each(function(text, data) {
                                var opt = new Element('option', {
                                    value: data,
                                    html: text,
                                    selected: (options.selected == data)
                                });

                                opt.inject(element);
                            });
                        } else if(typeOf(options.options) == 'object') {
                            Object.each(options.options, function(data, text) {
                                var opt = new Element('option', {
                                    value: data,
                                    html: text,
                                    selected: (options.selected == data)
                                });

                                opt.inject(element);
                            });
                        }
                        
                        break;
                    case 'checkbox':
                        console.warn('Not implemented');
                        break;
                    case 'radio':
                        console.warn('Not implemented');
                        break;
                }

                // Now check (if there is a model set) what the value is for this field and set it on the element
                // BUT only do this if the value hasn't been explicitly set
                if(attributes.value === undefined) {
                    if(instanceOf(this.options.model, Backbone.RelationalModel)) {
                        var value  = null,
                            _names = names.clone(),
                            _tmp   = this.options.model;

                        while(_names.length > 1) {
                            // For relational models we have to cycle through the layers
                            _tmp = _tmp.get(_names.shift());
                        }

                        value = _tmp.get(_names.shift());
                    } else if(instanceOf(this.options.model, Backbone.Model)) {
                        // For normal models it's a bit easier, we just get the attribute
                        element.set('value', this.options.model.get(name));
                    }
                } else {
                    // For some unknown reason, element.set(value, ....) does not explicitly set the value in HTML terms.
                    // Therefore when we get the outerHTML, the value property isn't present.
                    // To get around this we use the native setAttribute method, which seems to do it properly.
                    element.setAttribute('value', attributes.value);
                }

                // Create the enclosure which is just the raw html
                enclosure = element.outerHTML;

                // Add any before/afters
                if(options.before !== false) {
                    enclosure = options.before + enclosure;
                }
                if(options.after !== false) {
                    enclosure = enclosure + options.after;
                }

                // Create a label if required
                if(options.label !== false) {
                    label = new Element('label', {'for': pretty_full, 'html': pretty.humanise()});
                    enclosure = label.outerHTML + enclosure;
                }

                // Process the parent
                if(options.div !== false) {
                    parent = new Element('div', {'class':options.div, 'html':enclosure});
                    enclosure = parent.outerHTML;
                }

                return enclosure;
            }
        });

        return FormHelper;
    }
);
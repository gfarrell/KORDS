/*
    View:Kords
    ----------

    Base View class with some nice utilities.

    @file       Kords.js
    @package    js/View
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['backbone', 'Kords', 'View/Helper/Html', 'View/Helper/Form'],
    function(Backbone, Kords, HtmlHelper, FormHelper) {
        var KordsView = Backbone.View.extend({
            helpers:   {
                Html:     HtmlHelper,
                Form:     FormHelper
            },

            processTemplates: function() {
                if(this.templates === undefined) return this;
                this._templates = {};

                if(Object.getLength(this.templates) > 0) {
                    Object.each(this.templates, function(template, name) {
                        if(this._templates[name] !== undefined) {
                            // Already processed...
                            return;
                        }
                        this._templates[name] = _.template(template);
                    }, this);
                }

                return this;
            },

            template: function(template, data) {
                if(typeOf(template) == 'string' && this._templates[template] !== undefined) {
                    template = this._templates[template];
                }
                return template.call(this, Object.merge(data, this.helpers));
            },

            bootstrap: function() {
                return Object.clone(Kords.bootstrap);
            }
        });

        return KordsView;
    }
);
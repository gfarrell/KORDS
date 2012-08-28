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
            templates: {},
            helpers:   {
                Html:     HtmlHelper,
                Form:     FormHelper
            },

            processTemplates: function() {
                if(Object.getLength(this.templates) > 0) {
                    Object.each(this.templates, function(template, name) {
                        this.templates[name] = _.template(template);
                    }, this);
                }

                return this;
            },

            template: function(template, data) {
                return template.call(this, Object.merge(data, this.helpers));
            },

            bootstrap: function() {
                return Kords.bootstrap;
            }
        });

        return KordsView;
    }
);
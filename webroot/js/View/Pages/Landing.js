/*
    View:Landing
    ------------

    The landing page.

    @file       Landing.js
    @package    js/View/Pages
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['backbone', 'View/Kords', 'text!Template/Pages/Landing.html', 'Collection/TenantTypes'],
    function(Backbone, KordsView, landing_html, TenantTypesCollection) {
        var LandingView = KordsView.extend({
            tagName: 'div',

            templates: {
                'main': landing_html
            },

            events: {
                'change #RoomSelectionTenantTypes': 'goToIndex'
            },

            initialize: function() {
                this.processTemplates();

                var tenant_types = (new TenantTypesCollection()).reset(this.bootstrap().TenantTypes, {parse: true}),
                    types_list = {};

                tenant_types.each(function(tt) {
                    var name = tt.get('name');
                    types_list[name] = name.humanise();
                });

                $(this.template('main', {
                    tenant_types: types_list
                })).appendTo(this.$el);
            },

            goToIndex: function(event) {
                var val = event.target.value;
                if(val !== '') {
                    Backbone.history.navigate('/#/rooms/for:'+event.target.value);
                }
            }
        });

        return LandingView;
    }
);
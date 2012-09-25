define(
    ['View/Kords'],
    function(KordsView) {
        var ErrorPage = KordsView.extend({
            tagName: 'div',
            className: 'error-page 404',

            templates: {
                main: '<h1><%= header %></h1><p><%= message %></p>',

                text: 'The page you were looking for at <%= url %> could not be found.'
            },

            initialize: function() {
                this.processTemplates();
                this.render();
            },

            render: function() {
                this.$el.empty();

                this.$el.append(
                    this.template('main', {
                        header: 'Four Oh Four <small>(that means I couldn\'t find it)</small>',
                        message: this.template('text', {url: window.location.hash.substr(1)})
                    })
                );
            }
        });

        return ErrorPage;
    }
)
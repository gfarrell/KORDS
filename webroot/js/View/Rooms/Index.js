/*
    View:Rooms/Index
    ----------------

    @file       Index.js
    @package    Kords/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    ['Lib/jstorage', 'View/Kords', 'text!Template/Rooms/Filter.html', 'Collection/Rooms', 'Collection/Locations', 'Collection/RentBands'],
    function(jStorage, KordsView, filter_html, RoomsCollection, LocationsCollection, RentBandsCollection) {
        var RoomsIndexView = KordsView.extend({
            tagName: 'div',
            className: 'row',

            templates: {
                filter: filter_html
            },

            events: {
                'change input.filter.search-query':  'searchFilterWithControl',
                'change select.filter':              'setFilterWithControl',
                'click  .filter>button':             'setFilterWithControl'
            },

            _filters: {
                'available': 'yes',
                'contract':  'any',
                'ensuite':   'all',
                'set':       'all',
                'double':    'all',
                'piano':     'all',
                'smoking':   'all',
                'location':  '',
                'rent_band': ''
            },

            initialize: function(opts) {
                this.processTemplates();

                // Set up a side filter
                // We need to template the html (filter_html) and pass in the helper
                // Along with some data that we're going to get now...
                this.Locations = new LocationsCollection();
                    this.Locations.reset(this.bootstrap().Locations, {parse: true});
                this.RentBands = new RentBandsCollection();
                    this.RentBands.reset(this.bootstrap().RentBands, {parse: true});

                this.$filter = $(this.make('div', {'class':'sidebar left span4'}));

                this.$filter.html(this.template(this.templates.filter, {
                                    'locations':    this.Locations.list(),
                                    'rent_bands':   this.RentBands.list()
                                }));

                this.$filter.appendTo(this.$el);

                this.Rooms = new RoomsCollection();

                this.synchroniseFilters();

                this.delegateEvents();
            },

            setFilter: function(filter, state) {
                
            },
            setFilterWithControl: function(event) {
                var control = $(event.target),
                    type    = event.target.nodeName.toLowerCase(),
                    value, filter;

                if(type == 'button') {
                    // buttons are in groups, and thus we need to find out some info
                    var parent = control.parent();
                    value      = control.data('value');
                    filter     = parent.attr('id').replace('Filter', '').underscore();
                } else if(type == 'select') {
                    // selects are more straightforward
                    value  = control.val();
                    filter = control.attr('id').replace('Filter', '').underscore();
                }

                // set the filter value
                this._filters[filter] = value;

                // update the filter in localStorage
                $.jStorage.set('Kords.Index.Filter.'+filter, value);
            },

            searchFilterWithControl: function(event) {

            },

            synchroniseFilters: function() {
                Object.each(this._filters, function(value, filter) {
                    var el    = this.$filter.find('#Filter'+filter.camelise().capitalize()),
                        type  = el[0].nodeName.toLowerCase(),
                        stord = $.jStorage.get('Kords.Index.Filter.'+filter);

                    if(stord === null) {
                        $.jStorage.set('Kords.Index.Filter.'+filter, value);
                    } else if (value != stord) {
                        this._filters[filter] = stord;
                        value = stord;
                    }

                    if(type == 'div') {
                        // a div means it is a button group
                        // thus let's find the appropriate button!
                        var buttons = el.find('button');
                        buttons.removeClass('active');
                        el.find('button[data-value='+value+']').addClass('active');
                    } else if(type == 'select') {
                        // this is easier, set the value directly
                        el.val(value);
                    }
                }, this);
            },

            getFilterState: function(filter) {
                var state;

                if(filter == 'all') {
                    state = {};
                    this._filters.each(function(value, name) {
                        state[name] = value;
                    });
                } else {
                    if(arguments.length > 1) {
                        state = {};
                        arguments.each(function(arg) {
                            ret[arg] = this.getFilterState(arg);
                        });
                    }
                }

                return state;
            },

            render: function() {

            }
        });

        return RoomsIndexView;
    }
);
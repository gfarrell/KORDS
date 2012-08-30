/*
    View:Rooms/Index
    ----------------

    @file       Index.js
    @package    Kords/View/Rooms
    @author     Gideon Farrell <me@gideonfarrell.co.uk>
 */

define(
    [
        'Lib/jstorage', 'View/Kords',
        'text!Template/Rooms/Filter.html', 'text!Template/Preloader.html', 'View/Rooms/RoomsListItem',
        'Collection/Rooms', 'Collection/Locations', 'Collection/RentBands'
    ],
    function(jStorage, KordsView, filter_html, preloader_html, RoomsListItemView, RoomsCollection, LocationsCollection, RentBandsCollection) {
        var RoomsIndexView = KordsView.extend({
            tagName: 'div',
            className: 'row-fluid',

            url: '/json/rooms/index',

            templates: {
                filter:    filter_html,
                preloader: preloader_html
            },

            events: {
                'change input.filter.search-query':  '__searchFilterWithControl',
                'change select.filter':              '__setFilterWithControl',
                'click  .filter>button':             '__setFilterWithControl'
            },

            split_sort: ['Location.name', 'RoomStatus.name', 'Room.rent_band_id'],

            _filters: {
                'available': 'yes',
                'contract':  'any',
                'ensuite':   'all',
                'set':       'all',
                'double':    'all',
                'piano':     'all',
                'smoking':   'all',
                'location':  '',
                'rent_band': '',
                'for':       'all'
            },

            initialize: function(opts) {
                this.processTemplates();

                // An array of all the RoomsListItemViews
                this._rooms = [];

                // Set up a side filter
                // We need to template the html (filter_html) and pass in the helper
                // Along with some data that we're going to get now...
                this.Locations = new LocationsCollection();
                    this.Locations.reset(this.bootstrap().Locations, {parse: true});
                this.RentBands = new RentBandsCollection();
                    this.RentBands.reset(this.bootstrap().RentBands, {parse: true});

                this.$filter = $(this.make('div', {'class':'span5 sidebar left'}));

                this.$filter.html(this.template(this.templates.filter, {
                                    'locations':    this.Locations.list(),
                                    'rent_bands':   this.RentBands.list()
                                }));

                this.$filter.prepend($(this.make('h1', {}, 'KORDS')));

                this.$filter.appendTo(this.$el);

                this.$list = $(this.make('ul', {'class':'offset5 span7 horizontal unstyled item_list'}));
                    this.$list.appendTo(this.$el);

                this.Rooms = new RoomsCollection();
                    this.Rooms.on('all', this.render, this);

                this.synchroniseFilters();

                this.delegateEvents();
            },

            fetch: function() {
                this.showLoading();
                $.get(this.__buildUrl(), this.__parse.bind(this));
            },

            __buildUrl: function() {
                var filter_value_map = {
                        'any': null,
                        'all': null,
                        'yes': true,
                        'no':  false
                    },
                    data             = '/';

                Object.each(this._filters, function(value, filter) {
                    // If the value needs translation for the server, translate it
                    if(filter_value_map[value] !== undefined) value = filter_value_map[value];

                    // if the value is null, ignore the filter
                    if(value === null) return;

                    // add the value to the query string
                    data += 'filter_'+filter+':'+value + '/';
                });

                return this.url+encodeURI(data);
            },

            __parse: function(response) {
                this.Rooms.reset(response, {parse:true});
                this.hideLoading();
            },

            setFilter: function(filter, state) {
                this._filters[filter] = state;
                this.synchroniseFilters();
                this.fetch();
            },
            __setFilterWithControl: function(event) {
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

                // Fetch
                this.fetch();
            },

            __searchFilterWithControl: function(event) {

            },

            synchroniseFilters: function() {
                Object.each(this._filters, function(value, filter) {
                    var el    = this.$filter.find('#Filter'+filter.camelise().capitalize()),
                        stord = $.jStorage.get('Kords.Index.Filter.'+filter);

                    if(el.length === 0) {
                        return;
                    }

                    var type  = el[0].nodeName.toLowerCase();

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

            showLoading: function() {},
            hideLoading: function() {},

            render: function() {
                this.clear();
                var list = this.$list;

                this.Rooms.each(function(room_model) {
                    var room = new RoomsListItemView({
                        model: room_model
                    });

                    room.$el.appendTo(list);
                });
            },

            clear: function() {
                this._rooms.each(function(room) {
                    room.remove();
                    room.unbind();
                });
                this._rooms = [];
                this.$list.empty();
            }
        });

        return RoomsIndexView;
    }
);
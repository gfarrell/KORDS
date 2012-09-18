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
        'Collection/Rooms', 'Collection/TenantTypes', 'Collection/Locations', 'Collection/RentBands'
    ],
    function(jStorage, KordsView, filter_html, preloader_html, RoomsListItemView, RoomsCollection, TenantTypesCollection, LocationsCollection, RentBandsCollection) {
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
            _filter_maps: {
                value_map: {
                        all: {
                            'any': null,
                            'all': null,
                            'yes': true,
                            'no':  false
                        },
                        tenant_type: {},
                        short_contract: {
                            'short': true,
                            'long':  false,
                            'any':   null
                        }
                },
                key_map: {
                    'for':      'tenant_type',
                    'contract': 'short_contract'
                }
            },

            fetch_options: {
                limit: 50,
                page: 1
                //order: 'Room.location_id ASC'
            },

            initialize: function(opts) {
                // Variable declarations
                var bootstrap     = this.bootstrap(),
                    tenant_types  = null;

                // We must process the templates first
                this.processTemplates();

                // An array of all the RoomsListItemViews
                this._rooms = [];

                // Set up all the collections we need
                this.Rooms = new RoomsCollection();                             // RoomsCollection will store our main data
                this.Rooms.on('add',   this.add, this);                         // We have to treat add and reset slightly differently
                this.Rooms.on('reset', this.collectionHasReset, this);          // Reset will clear the view before rendering

                // TenantTypes, Locations and RentBands contain bootstrap data which will be used in the filter
                this.TenantTypes = new TenantTypesCollection();
                this.Locations = new LocationsCollection();
                this.RentBands = new RentBandsCollection();

                // Reset the collections with the bootstrap data
                // Must be called with parse:true to ensure that it is parsed
                this.TenantTypes.reset(bootstrap.TenantTypes, {parse: true});
                this.Locations.reset(bootstrap.Locations, {parse: true});
                this.RentBands.reset(bootstrap.RentBands, {parse: true});

                // We need to process the filter translation maps
                // Tenant Types need to map to the correct id
                tenant_types = this.TenantTypes.list();
                Object.each(tenant_types, function(name, id) {
                    this._filter_maps.value_map.tenant_type[name] = id;
                }, this);

                // Let's move on to making all the elements we need
                // First stop is the filter element, which will use the filter template
                this.$filter = $(this.make('div', {'class':'span5 sidebar left'}));
                this.$filter.html(this.template('filter', {
                                    'locations':    this.Locations.list(),      // list() method on collections gives a list suitable for <select> options
                                    'rent_bands':   this.RentBands.list()
                                }));
                this.$filter.prepend($(this.make('h1', {}, 'KORDS')));          // add a little heading at the top of the element
                this.$filter.appendTo(this.$el);                                // add the filter in

                // the $main element will hold the list and preloader
                // ... and whatever else goes in the RHS of the page
                this.$main = $(this.make('div', {
                    'class': 'offset5 span7'
                })).appendTo(this.$el);

                // Now we create the list that will hold all the rooms
                this.$list = $(this.make('ul', {
                    'class':'horizontal unstyled item_list'                     // quite a complex class definition
                }));
                this.$list.appendTo(this.$main);                                // add the list into the $main el

                // Last but not least, the preload display element
                // this.$preloader = $(this.make('div', {
                //     'class': 'span3 offset5'
                // }, this.template('preloader', {})));

                // Let's quickly process the animation durations on the preloader elements
                // They all need to be random with random durations to achieve the cool effect
                // this.$preloader.find('.block').each(function(index, block) { // non-standard jquery .each syntax
                //     var prefixes = ['-webkit-', '-moz-', '-ms-', '-o-'],
                //         duration = Math.random()+1,
                //         delay    = Math.random(),
                //         $block   = $(block);

                //     prefixes.each(function(pref) {
                //         $block.css(pref+'animation-duration', duration+'s');
                //         $block.css(pref+'animation-delay', delay+'s');
                //     });
                // });

                // Instead of a preloader here we're going to have a load more button
                this.$loadMoreButton = $(this.make('button', {'type':'button', 'class':'btn', 'data-loading-text':'loading...', 'autocomplete':'off'}, 'Load more'));
                this.$loadMoreButton.append(' <i class="icon-refresh"></i>');
                // We have to explicitly set events here because it's not currently in the DOM
                this.$loadMoreButton.on('click', this.loadMoreButtonPressed.bind(this));
                this.$loadMoreButton.appendTo(this.$main);

                // We have to synchronise the filter controls with the values we have stored in localStorage
                // (and those that are set anyway)
                this.synchroniseFilters();

                // Finally delegate events, so that the filter etc. will work properly
                this.delegateEvents();
            },

            /**
             * Fetches data from the server
             * @param  {boolean} append set to true to add the data onto the current set, false to reset the data set
             * @return {this}
             */
            fetch: function(append) {
                this.showLoading();

                append = !!append;          // explicit boolean cast
                
                this.Rooms.fetch({
                    url:     this.__buildUrl(),
                    add:     append,
                    success: append ? this.collectionHasAdded.bind(this) : null
                });

                return this;
            },

            /**
             * A callback for the 'loadMore' button.
             * Fetches another page of data and loads it into the view.
             * @param  {event} e the click event on the button
             * @return {void}
             */
            loadMoreButtonPressed: function(e) {
                e.preventDefault();

                this.fetch_options.page++;
                this.fetch(true);
            },

            /**
             * Builds the URL from which data is to be fetched.
             * @return {string} URL
             */
            __buildUrl: function() {
                var filter_value_map = this._filter_maps.value_map,
                    filter_key_map   = this._filter_maps.key_map,
                    data             = '/';

                Object.each(this._filters, function(value, filter) {
                    // If the key needs translation for the server, translate it
                    if(filter_key_map[filter] !== undefined) filter = filter_key_map[filter];

                    // If the value needs translation for the server, translate it
                    // First we have to check if there are specific rules for this filter
                    // Otherwise we just use the 'all' map which is the default list
                    var map = (filter_value_map[filter] === undefined) ? filter_value_map.all : filter_value_map[filter];
                    if(map[value] !== undefined) value = map[value];                    

                    // if the value is null/undefined, ignore the filter
                    // it's tempting to use !value but that would rule out false values which we'd like to keep
                    if(value === null || value === undefined || value === '') return;

                    // add the value to the query string
                    data += 'filter_'+filter+':'+value + '/';
                });

                // Now deal with pagination options
                Object.each(this.fetch_options, function(val, opt) {
                    data += opt+':'+val + '/';
                });

                return this.url+encodeURI(data);
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

            showLoading: function() {
                this.$loadMoreButton.button('loading');
            },
            hideLoading: function(remove) {
                this.$loadMoreButton.button('reset');

                if(remove === true) {
                    this.$loadMoreButton.remove();
                } else {
                    this.$loadMoreButton.appendTo(this.$main);
                }
            },

            add: function(model, collection, options) {
                this.render([model]);
            },
            collectionHasAdded: function(collection, response) {
                this.hideLoading(response.length < this.fetch_options.limit);
            },
            collectionHasReset: function(collection, response) {
                // If it is a reset we just need to clear the page and add all the models in the collection
                this.clear();
                this.render(collection.models);

                this.hideLoading(collection.models.length < this.fetch_options.limit);
            },

            render: function(models) {
                if(models === undefined) {
                    return this;
                }

                var list = this.$list;

                models.each(function(room_model) {
                    var room = new RoomsListItemView({
                        model: room_model
                    });

                    room.$el.appendTo(list);
                });

                return this;
            },

            clear: function() {
                this._rooms.each(function(room) {
                    room.unbind();
                }, this);
                this._rooms = [];
                this.$list.empty();
            },

            destroy: function() {
                this.clear();
                this.unbind();
                this.remove();

                return this;
            }
        });

        return RoomsIndexView;
    }
);
/*

	RoomFilterController Class
	--------------------------

	@file 		RoomFilterController.js
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

var RoomFilterController = new Class({
	Implements: [Options, Events],

	options: {
		method:				'post',
		data_url:			false,
		room_data_url:		'/json/rooms/view/__id__',
		room_url_format:	'/rooms/#/view/__id__',
		dynamic_page:		true,
		tenant_types:		{'neither': 0, 'undergraduate': 1, 'graduate': 2},
		flags:				['ensuite','piano','smoking','double'],
		split_sort:			['Location.name', 'RoomStatus.name']
	},

	__filters: [],
	__sorter: null,
	sortKey: null,
	__sortKeyCurrent: null,
	hashFilter: null,
	behavior: null,

	initialize: function (form_filter, container, options) {
		this.setOptions(options);
		
		var ul = new Element('ul', {'class':'horizontal unstyled item_list'});
		ul.inject($(container));
		
		this.containers = {
			filter:		$(form_filter),
			content:	ul
		};
		
		this.behavior = new Behavior({container: ul});
		
		this.request = new Request.JSON({
			url:		(!this.options.data_url ? window.location.pathname : this.options.data_url),
			secure:		true,
			link:		'cancel',
			
			onSuccess:	this._reloadData.bind(this),
			onFailure:	this._requestError.bind(this),
			onRequest:	this._showLoading.bind(this),
			onComplete:	this._hideLoading.bind(this)
		});
		
		this.indicator = new UIActivityIndicator({attachTo: document.body});
		
		form_filter.getElements('input.filter, select.filter').each(function (input) {
			this.addFilter(input);
		}, this);
		this.addSorter(form_filter.getElement('input.sorter, select.sorter'));
		window.addEvent('hashchange', this._processHash.bind(this));
		
		this._processHash(window.location.hash);
	},

	addFilter: function (input) {
		if(this.__filters.contains(input)) {
			return;
		} else {
			this.__filters.push(input);
			input.addEvent('change', this.filter.bind(this));
		}
	},
	removeFilter: function (input) {
		if(this.__filters.contains(input)) {
			this.__filters.remove(input);
			input.removeEvent('change', this.filter.bind(this));
		}
	},
	
	addSorter: function(input) {
		if(input !== null && this.__sorter !== input) {
			if(this.__sorter !== null) {
				this.removeSorter();
			}
			this.__sorter = input;
			input.addEvent('change', this.filter.bind(this));
		}
	},
	removeSorter: function() {
		if(this.__sorter !== null) {
			this.__sorter = null;
			this.__sorter.removeEvent('change', this.filter.bind(this));
		}
	},
	
	filter: function() {
		var filters = {};
		this.__filters.each(function(f){
			var name = f.name;
			var val = f.value;
			
			filters[name] = val;
		}, this);
		if(this.__sorter !== null) {
			filters[this.__sorter.name] = this.__sorter.value;
			
			this.sortKey = this.options.split_sort.contains(this.__sorter.value) ? this.__sorter.value : null;
		}
		
		this.fetchData(filters);
	},
	fetchData: function (filter_options) {
		var data_string = '';
		var i = 0;
		for(var filter in filter_options) {
			if(filter_options[filter] == '') continue;
			if(i > 0) data_string += '&';
			data_string += filter + '=' + filter_options[filter];
			i++;
		}
		this.request.send(data_string);
	},
	clearData: function () {
		this.__sortKeyCurrent = null;
		this.behavior.cleanup(this.containers.content);
		this.containers.content.getChildren().destroy();
	},

	loadRoom: function (id) {
		
	},

	_processHash: function (hash) {
		hash = (hash.substr(0,1) == '#') ? hash.substr(1) : hash;
		
		var parts = hash.split('/');
		
		if(parts[0] == '') parts.shift();
		
		if(parts[0] == 'view' && parts.length > 1) {
			this.loadRoom(parts[1]);
		} else if (parts[0].match(/^for=(\w+)$/)) {
			var hVal = parts[0].match(/^for=(\w+)$/)[1];
			if(this.hashFilter === null) {
				this.hashFilter = new Element('input', {
					'name':		'data[Filter][tenant_type]',
					'class':	'filter',
					'type':		'hidden'
				});
				this.hashFilter.inject(this.containers.filter);
				this.addFilter(this.hashFilter);
			}
			if(typeof this.options.tenant_types[hVal] != 'undefined') {
				this.hashFilter.value = this.options.tenant_types[hVal];
			}
			
			this.filter();
		}
	},

	_reloadData: function (json_response) {
		this.clearData();
		
		var container = this.containers.content;
		
		if(this.sortKey !== null) {
			var sort = {model:false, key:false};
			var sortKey_tmp = this.sortKey.split('.');
			
			if(sortKey_tmp.length == 1) {
				sort.key = sortKey_tmp[0];
			} else {
				sort.model = sortKey_tmp[0];
				sort.key = sortKey_tmp[1];
			}
		}
		
		
		for(var i in json_response) {
			var room = json_response[i].Room;
			if(room) {
				if(this.sortKey !== null) {
					var iSortKey = sort.model ? json_response[i][sort.model][sort.key] : room[sort.key];
					if(this.__sortKeyCurrent != iSortKey) {
						this.__sortKeyCurrent = iSortKey;
						(this._generateListSortHeader()).inject(this.containers.content);
						var ncontainer = new Element('ul', {'class':'horizontal unstyled item_list'});
						ncontainer.inject(this.containers.content);
						container = ncontainer;
					}
				}
				
				var el = this._generateRoom(room);
				el.inject(container);
			}
		}
		
		this.behavior.apply(this.containers.content);
	},
	_requestError: function (xhr) {
		
	},

	_showLoading: function () {
		this.indicator.start();
	},
	_hideLoading: function () {
		this.indicator.stop();
	},

	_generateRoom: function (room) {
		var li = new Element('li', {'class':'room'});
		var pcontent = '';
		for(var i = 0; i < this.options.flags.length; i++) {
			var flag = this.options.flags[i];
			var cls = (room[flag] == 1) ? 'label success' : 'label important';
			pcontent += '<span class="'+cls+'">'+flag+'</span> ';
		}
		
		var a = new Element('a', {
				'href': this.options.room_url_format.replace('__id__', room.id),
				'html': room.number,
				'data-behavior': 'BS.Twipsy',
				'title': pcontent,
				'data-bs-twipsy-options': "'location': 'left'"
		});
		
		if(room.available != 1) li.addClass('taken');
		
		a.inject(li);
		
		return li;
	}.protect(),
	
	_generateListSortHeader: function() {
		return new Element('h2', {'html':this.__sortKeyCurrent, 'class':'sortHeader'});
	}.protect(),
	
	_generateRoomPage: function (data) {
		var popup = new Element('div', {
			'class': 'modal fade',
			'data-behavior': 'BS.Popup'
		});
		
		var header = new Element('div', {
			'class': 'modal-header'
		});
		header.adopt(
			(new Element('a', {'class':'close','html':'x'})),
			(new Element('h3', {'html':data.Room.number}))
		);
		header.inject(popup);
		
		var body = new Element('div', {
			'class': 'modal-body'
		});
		body.inject(popup);
		
		var propsTable = new HtmlTable();
		for(var i = 0; i < this.options.flags.length; i++) {
			var flag = this.options.flags[i];
			propsTable.push([flag, data.Room[flag]]);
		}
		propsTable.inject(body);
		
		popup.inject(document.body);
		
		// ! This needs finishing, for the meantime we'll have a page redirect.
		
		this.behavior.apply(popup);
	}.protect()
});
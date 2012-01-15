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
		tenant_types:		{'neither': 0, 'undergraduate': 1, 'graduate': 2}
	},

	__filters: [],

	initialize: function (form_filter, container, options) {
		this.setOptions(options);
		
		var ul = new Element('ul', {'class':'horizontal unstyled item_list'});
		ul.inject($(container));
		
		this.containers = {
			filter:		$(form_filter),
			content:	ul
		};
		
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
		
		form_filter.getChildren('input,select').each(function (input) {
			this.addFilter(input);
		}, this);
		
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

	fetchData: function (filter_options) {
		var data_string = '';
		for(var filter in filter_options) {
			if(filter_options[filter] == '') continue;
			data_string += filter + '=' + filter_options[filter];
		}
		this.request.send(data_string);
	},
	clearData: function () {},

	loadRoom: function (id) {},

	_processHash: function (hash) {
		hash = (hash.substr(0,1) == '#') ? hash.substr(1) : hash;
		
		var parts = hash.split('/');
		
		if(parts[0] == 'view' && parts.length > 1) {
			this.loadRoom(parts[1]);
		} else if (parts[0].match(/^for=(\w+)$/)) {
			this.addFilter
		}
	},

	_reloadData: function (json_response) {
		this.containers.content.getChildren().destroy();
		for(var i in json_response) {
			var room = json_response[i].Room;
			if(room) {
				var el = this._generateRoom(room);
				el.inject(this.containers.content);
			}
		}
	},
	_requestError: function (xhr) {},

	_showLoading: function () {
		this.indicator.start();
	},
	_hideLoading: function () {
		this.indicator.stop();
	},

	_generateRoom: function (room) {
		var li = new Element('li', {'class':'room'});
		var a = new Element('a', {
				'href': this.options.room_url_format.replace('__id__', room.id),
				'html': room.number
		});
		
		a.inject(li);
		
		return li;
	}.protect(),
	_generateRoomPage: function (data) {}.protect()
});
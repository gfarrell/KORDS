/*

	RoomNavigator Class
	-------------------

	@file		RoomNavigator.js
	@author		Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2012 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

var RoomNavigator = new Class({
	Implements: [Events, Options],

	current_index: 0,
	rooms: [],
	url_format: '/rooms/%id',

	initialize: function(current_room) {
		// Get the room list
		this.rooms = this._getData();

		// Find the current index
		this.current_index = this.rooms.indexOf(current_room);

		// Set up key events
		window.addEvent('keydown:keys(left)', this.prevRoom.bind(this));
		window.addEvent('keydown:keys(right)', this.nextRoom.bind(this));
	},

	nextRoom: function() {
		this._changeRoom(1);
	},

	prevRoom: function() {
		this._changeRoom(-1);
	},

	_changeRoom: function(places) {
		var next = this.rooms[this.current_index+places];
		if(typeof next != 'undefined') {
			window.location.assign(this.url_format.replace('%id', this.rooms[this.current_index+places]));
		}
	}.protect(),

	_getData: function() {
		return $.jStorage.get('roomslist');
	}.protect()
});
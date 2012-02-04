/*

	Thumbs Behaviour
	----------------

	@file		Thumbs.js
	@author		Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2012 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

var Thumbs = new Class({
	initialize: function(links, display) {
		this.links = links;
		this.display = $(display);

		this._attach();
	},

	destroy: function() {
		this._detach();
		this.destroyed = true;

		return this;
	},
	_attach: function() {
		this.links.each(function(a) {
			a.addEvent('click', this.open.bind(this, a.href));
		}, this);
	},
	_detach: function() {
		this.links.each(function(a) {
			a.removeEvent('click', this.open.bind(this, a.href));
		}, this);
	},

	open: function(img, e) {
		if(e !== null && typeof(e) !== 'undefined') {
			e.preventDefault();
		}

		this.display.src = img;

		return false;
	}

});

Behavior.addGlobalFilters({
	Thumbs: function(el, api) {
		var th, as;
		
		as = el.getElements('a');
		if(as.length < 1) api.fail('No linked thumbs found');

		th = new Thumbs(as, api.get('display'));
		
		api.onCleanup(th.destroy.bind(th));
		
		return;
	}
});
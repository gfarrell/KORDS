/*

	SelectNavigation Class
	-----------------------

	@file		SelectNavigation.js
	@author		Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

var SelectNavigation = new Class({
	/* Creation and Destruction Methods */
	
	initialize: function(el) {
		var opts, form, select;
		
		this.__original = el;
		
		opts = this._extractOptions(el);
		
		form = new Element('form');
			form.replaces(el);
		select = new Element('select');
			select.inject(form);
		
		for(var i = 0; i<opts.length; i++) {
			var opt, input;
			
			opt = opts[i];
			input = new Element('option', {'value':opt.url, 'html':opt.name});
				input.inject(select);
		}
		
		this.form = form;
		this.select = select;
		
		this._attach(select);
	},
	
	_extractOptions: function(el) {
		var as, opts;
		
		as = el.getElements('a');
		opts = [{'name':'Please select', 'url':''}];
		
		as.each(function(a) {
			opts.push({'name':a.innerHTML, 'url':a.href});
		});
		
		return opts;
	},
	
	destroy: function() {
		this._detach();
		this.destroyed = true;
		return this;
	},
	
	_attach: function(select) {
		select.addEvent('change', this.navigate.bind(this));
	}.protect(),
	
	_detach: function() {
		this.__original.replaces(this.form);
		
		this.select.destroy();
		this.form.destroy();
	}.protect(),
	
	/* --- */
	
	/* Functionality */
	
	navigate: function() {
		if(this.select.value == '') return;
		window.location.href = this.select.value;
	}
});

Behavior.addGlobalFilters({
	SelectNavigation: function(el, api) {
		var as, sel;
		
		as = el.getElements('a');
		if(as.length < 1) api.fail('No links specified');
		
		sel = new SelectNavigation(el);
		
		api.onCleanup(sel.destroy.bind(sel));
		
		return sel;
	}
});
/*

	DeleteModal Functionality
	-------------------------

	@file		DeleteModal.js
	@author		Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2012 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

Behavior.addGlobalFilters({
	modaldelete: function(el, api) {
		var form, submit_fn;

		target_form = api.get('form');

		submit_fn = function(e) {
			e.preventDefault();
			e.stop();
			$(target_form).submit();
		};
		
		el.addEvent('click', submit_fn);
		
		api.onCleanup(function() { el.removeEvent('click', submit_fn); });
		
		return el;
	}
});
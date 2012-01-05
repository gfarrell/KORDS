/*

	UI
	---

	@file 		UI.js
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

var UI = new Class({
	Implements:		[Options],
	__components:	{},
	__elements:		{},
	
	options:		{},
	
	autoStruct:		true,
	autoRender:		true,
	
	initialize: function() {		
		if(arguments.length > 0) {
			var first = ($(arguments[0]) ? $(arguments[0]) : arguments[0]);
			
			if(typeOf(first) == "element") {
				first.store("uikit", this);
	
				if(this.autoStruct === true) {
					this.addElement("root", (new Element("div")).inject(first, "before"));
					first.inject(this.element("root"));
				}
			}
		}
		
		this.preInit();
		this.init.apply(this, Array.from(arguments));
		this.postInit();
		
		if(this.autoRender === true) {
			this.__render();
		}
	},
	
	preInit: function() {}.protect(),
	init: function() {}.protect(),
	postInit: function() {}.protect(),
	
	setDefaults: function(options) {
		if(typeOf(options) == "object") {
			this.options = $merge(this.options, options);
		}
	},
	
	addComponent: function(name, component) {
		this.__components[name] = component;
	},
	
	addComponents: function(components) {
		for(var name in components) {
			this.addComponent(name, components[name]);
		}
	},
	
	component: function(name) {
		if(this.__components.hasOwnProperty(name)) {
			return this.__components[name];
		} else {
			return null;
		}
	},
	
	__getElementParentNode: function(name) {
		var names = name.split(".");
		if(names.length == 1) {
			return (this.__elements.hasOwnProperty(name)) ? this.__elements : null;
		} else {
			var current = this.__elements;
			var iterate = 0;
			do {
				if(iterate == 0) {
					if(!current.hasOwnProperty(names[iterate])) {
						return null;
					}
					current = current[names[iterate]];
				} else {
					if(!current.children.hasOwnProperty(names[iterate])) {
						return null;
					}
					current = current.children[names[iterate]];
				}
				iterate++;
			} while(iterate < names.length-1);
			
			return (!current.children.hasOwnProperty(names[iterate])) ? current : null;
		}
	}.protect(),
	
	__getElementNode: function(name) {
		var names = name.split(".");
		var parent = this.__getElementParentNode(name);
		
		if(names.length == 1) {
			return (this.__elements.hasOwnProperty(name)) ? this.__elements[name] : null;
		} else {		
			return (parent != null && parent.children.hasOwnProperty(names.getLast())) ? parent.children[names.getLast()] : null;
		}
	}.protect(),
	
	addElement: function(name, element, autoStructure) {
		if(typeOf(element) == "element") {
			var names = name.split(".");
			var h = {
				element:	element,
				children:	{}
			};
			this.destroyElement(name);
			if(names.length == 1) {
				this.__elements[name] = h;
				
				if(autoStructure === true && this.__elements.hasOwnProperty("root")) {
					element.inject(this.element("root"));
				}
			} else {
				var current = this.__elements;
				var iterate = 0;
				do {
					if(iterate == 0) {
						current = current[names[iterate]];
					} else {
						current = current.children[names[iterate]];
					}
					iterate++;
				} while(iterate < names.length-1);				
				current.children[names.getLast()] = h;
				
				if(autoStructure === true) {
					element.inject(current.element);
				}
			}
		} else {
			return null;
		}
	},
	
	destroyElement: function(name) {
		if(this.element(name) != null) {
			this.element(name).destroy();
			var names = name.split(".");
			if(names.length == 1) {
				delete this.__elements[name];
			} else {
				delete this.__getElementParentNode(name).children[name.split(".").getLast()];
			}
			return true;
		} else {
			return false;
		}
	},
	
	addElements: function(elements) {
		for(var name in elements) {
			this.addElement(name, elements[name]);
		}
	},
	
	element: function(name) {
		var names = name.split(".");
		if(names.length == 1) {
			return (this.__elements.hasOwnProperty(name)) ? this.__elements[name].element : null;
		} else {
			var current = this.__elements;
			var iterate = 0;
			do {
				if(iterate == 0) {
					if(current.hasOwnProperty(names[iterate])) {
						return null;
					}
					current = current[names[iterate]];
				} else {
					if(current.children.hasOwnProperty(names[iterate])) {
						return null;
					}
					current = current.children[names[iterate]];
				}
				iterate++;
			} while(iterate < names.length-1);
			
			return (current.children.hasOwnProperty(names[iterate])) ? current.children[names[iterate]].element : null;
		}
	},
	
	elements: function(root, include_root) {
		var parent = (root == null) ? this.__getElementNode(root).children : this.__elements;
		
		var prefix = (root == null) ? root+"." : "";
		
		var els = {};
		
		if(include_root != null && include_root === true) {
			els[root] = this.element(root);
		}
		
		for(var name in parent) {
			if(!parent[name].hasOwnProperty(element) || !parent[name].hasOwnProperty(children)) {
				continue;
			} else {
				els[prefix+name] = parent[name].element;
				if(parent[name].children.length > 0);
				els = $merge(els, this.elements(prefix+name));
			}
		}
		
		var arr = [];
		$each(els, function(item) {
			arr.push(item);
		});
		
		return (new Elements(arr));
	},
	
	preRender: function() {}.protect(),
	render: function() {}.protect(),
	postRender: function() {}.protect(),
	
	__render: function() {
		this.preRender();
		this.render();
		this.postRender();
	}.protect(),
	
	parseSettingsFromElement: function(element, attribute) {
		if(typeOf(element) != "element") {
			return false;
		}
		if(attribute == null) { attribute = "rel"; }
		
		var string = element.get(attribute);
		
		if(string === null) {
			return false;
		}
		
		this.setOptions(JSON.decode(string));
		
		return true;
	}.protect(),
	
	onDestroy: function() {}.protect(),
	
	destroy: function() {
		this.onDestroy();
		this.elements().each(function(el) {
			el.destroy();
		}, this);
		delete this.__elements;
		
		this.__components.each(function(component) {
			if(component.hasOwnProperty(destroy) && typeOf(component.destroy) == "function") {
				component.destroy();
			}
		});
		delete this.__components;
	},
	
	toElement: function() {
		if(this.element("root") != null) {
			return this.element("root");
		} else {
			return null;
		}
	}
});
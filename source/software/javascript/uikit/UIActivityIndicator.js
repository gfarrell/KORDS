/*

	UIActivityIndicator
	--------------------

	@file 		UIActivityIndicator.js
	@author 	Gideon Farrell <me@gideonfarrell.co.uk>

	Copyright (c) 2011 Gideon Farrell <http://www.gideonfarrell.co.uk>

*/

var UIActivityIndicator = new Class({
	Extends: UI,
	
	Implements: Options,
	
	autoStruct: false,
	
	options: {
		useOverlay:	true,
		attachTo:	null,
		size:		"normal",
		background:	"#333333",
		foreground:	"#FFFFFF",
		opacity:	{
			foreground:	1,
			background:	0.25
		},
		speed:		1000,
		bars:		12
	},
	
	/**
	 * init method.
	 * Initialises the indicator with relevant options.
	 *
	 * @access	public
	 * @param	object	options. An object containing the class options.
	 * @throws	UIKitException
	 * @return	void
	*/
	
	init: function(options) {
		//Set options
		this.setOptions(options);
		
		//Check attachTo option
		//Since we can't use document.body as an initial value (because the DOM isn't loaded yet) we set it here if no attachTo object has already been set.
		if(this.options.attachTo == null) {
			this.options.attachTo = document.body;
		} else {
			this.options.attachTo = $(this.options.attachTo);
		}
		
		//Let's check that attachTo is a valid element
		if(this.options.attachTo == null) {
			throw new Exception("Invalid element to attach UIActivityIndicator to.");
		}
		
		//Check the opacity value
		//If a single number is given, assume 1 for foreground and the given for the background
		if(typeOf(this.options.opacity) == "number") {
			this.options.opacity = {
				foreground:	1,
				background:	this.options.opacity
			};
		}
		
		//Let's have some nice shortcuts for "size"
		var sizes = {
			large:	500,
			normal:	100,
			small:	50
		};
		
		if(typeOf(this.options.size) == "string") {
			if(sizes.hasOwnProperty(this.options.size)) {
				this.options.size = sizes[this.options.size];
			} else {
				this.options.size = sizes.normal;
			}
		}
		
		//And let's have similar for speeds
		var speeds = {
			fast:	500,
			normal:	1000,
			slow:	2000
		};
		
		if(typeOf(this.options.speed) == "string") {
			if(speeds.hasOwnProperty(this.options.speed)) {
				this.options.speed = speeds[this.options.speed];
			} else {
				this.options.speed = speeds.normal;
			}
		}
		
		//Set this.started to false
		this.started = false;
		
		//Set tick to false
		this.tick = false;
	},
	
	/**
	 * render method.
	 * Renders the SVG indicator as well as the overlay if it is in use.
	 *
	 * @access	protected
	 * @return	void
	*/
	
	render: function() {		
		//If an overlay is to be used, then let's create it.
		if(this.options.useOverlay === true) {
			this.addElement("overlay", new Element("div", {
				"class":	"UIOverlay",
				"styles":	{
					"background":	this.options.background,
					"opacity":		0,
					"width":		"100%",
					"height":		"100%",
					"position":		"absolute",
					"top":			0,
					"left":			0,
					"z-index":		1001,
					"display":		"none"
				}
			}));
			
			this.element("overlay").inject(this.options.attachTo, "bottom");
		}
		
		//Now let's use Raphaël to generate some SVG magic
		//First create a container
		this.addElement("container", new Element("div", {
			"class":	"UIActivityIndicator_canvas-container",
			"styles":	{
				"width":	this.options.size,
				"height":	this.options.size,
				"opacity":	0,
				"display":	"none",
				"position":	"absolute",
				"z-index":	1002
			}
		}));
		
		this.element("container").inject(this.options.attachTo, "bottom");
		
		//Now let's initialise Raphaël
		this.addComponent("paper", new Raphael(this.element("container"), this.options.size, this.options.size));
		
		//Before we start drawing we should calculate some heights/widths and spacing
		var barLength = this.options.size * 0.3;
		var barWidth = this.options.size * 0.075;
		var n = this.options.bars;
		var radius = 0.5*barWidth;
		
		//Let's draw our bars
		//Let's first create an array for them
		var bars = [];
		
		//Let's create a false origin
		var origin = {
			x:	0.5*this.options.size,
			y:	0.5*this.options.size
		};
		//Distance of rectangle centre from false origin is fixed
		var d = 0.5*(this.options.size - barLength);
		
		
		//Let's loop through our bars
		for(var i=0; i<n; i++) {
			//Calculate the angle from the start position
			var theta = (i/n) * (2*Math.PI);
			
			//Calculate the centre's coordinates
			var x = d*Math.sin(theta);
			var y = d*Math.cos(theta);
			
			//Now offset the coordinates to take into account the top left corner and not the centre
			x = x + 0.5*barWidth;
			y = y + 0.5*barLength;
			
			//And adjust to take from top left corner rather than centre
			x = origin.x - x;
			y = origin.y - y;
			
			//Create the rectangle
			var rect = this.component("paper").rect(x, y, barWidth, barLength, radius);
			
			//Rotate the rectangle but first convert theta to degrees
			theta = theta * 180/Math.PI;
			rect.rotate(-theta);
			
			//Calculate the opacity of the bar
			var opacity = this.options.opacity.background + (1-i/n)*(this.options.opacity.foreground-this.options.opacity.background); //Since the indicator should "move" clockwise, we want it to get "lighter" as we progress around
			
			//Mix the colours
			var fg = new Color(this.options.foreground);
			var colour = fg.mix(this.options.background, (i/n)*100); //Since the indicator should "move" clockwise, we want it to get "lighter" as we progress around

			//Colour the rectangle in
			rect.attr({
				'fill':	colour.hex,
				'fill-opacity':	opacity,
				'stroke': 'none'
			});
			
			//Add the rectangle to the array
			bars[i] = rect;
		}
		
		//Add the bars as an attribute
		this.bars = bars;
	}.protect(),
	
	/**
	 * start method.
	 * Starts the indicator animation.
	 *
	 * @access	public
	 * @return	void
	*/
	
	start: function() {
		//Ignore multiple calls to start
		if(this.started) {
			return;
		}
		
		//First fade in the overlay if it exists
		if(this.options.useOverlay === true) {
			this.element("overlay").setStyles({
				"display":	"block",
				"opacity":	0,
				"width":	this.options.attachTo.getSize().x,
				"height":	this.options.attachTo.getSize().y,
				"top":		this.options.attachTo.getPosition().y,
				"left":		this.options.attachTo.getPosition().x
			});
			this.element("overlay").morph({"opacity": this.options.opacity.background});
		}
		
		//Now fade in the canvas container
		this.element("container").setStyles({
			"display":	"block",
			"opacity":	0,
			"width":	this.options.size,
			"height":	this.options.size,
			"top":		(this.options.attachTo.getSize().y - this.options.size)/2 + this.options.attachTo.getPosition().y,
			"left":		(this.options.attachTo.getSize().x - this.options.size)/2 + this.options.attachTo.getPosition().x
		});
		this.element("container").morph({
			"opacity":	this.options.opacity.foreground
		});
		
		//Now animate the indicator
		this.startAnimation();
		
		//Set started to true
		this.started = true;
	},
	
	/**
	 * animate method.
	 * Animates the indicator.
	 *
	 * @access	public
	 * @return	void
	*/
	
	animate: function() {
		//Check if we're supposed to be animating
		if(!this.tick) {
			return;
		}
		
		//Each bar should take the colour and opacity of the bar behind it
		for(var i=0; i< this.bars.length; i++) {
			//If the bar is the last then use 0
			var next;
			if(i == this.bars.length-1) {
				next = this.bars[0];
			} else {
				next = this.bars[i+1];
			}
			
			//Now get the properties of the forward bar
			var colour = next.attr("fill");
			var opacity = next.attr("fill-opacity");
			
			
			//Now animate the properties for this bar
			this.bars[i].attr({
				"fill":	colour,
				"fill-opacity":	opacity
			});
		}
	},
	
	/**
	 * startAnimation method.
	 * Starts the indicator animation.
	 *
	 * @access	public
	 * @return	void
	*/
	
	startAnimation: function startAnimation() {
		//Ignore multiple calls to startAnimation
		if(this.tick !== false) {
			return;
		}
		
		//The duration is the speed over the number of bars to animate
		this.tick = this.animate.periodical(Math.ceil(this.options.speed/this.options.bars), this);
	},
	
	/**
	 * stopAnimation method.
	 * Stops the indicator animation.
	 *
	 * @access	public
	 * @return	void
	*/
	
	stopAnimation: function stopAnimation() {
		window.clearTimeout(this.tick);
		this.tick = false;
	},
	
	/**
	 * stop method.
	 * Stops the indicator and hides it.
	 *
	 * @access	public
	 * @return	void
	*/
	
	stop: function stop() {
		//Ignore multiple calls to stop
		if(!this.started) {
			return;
		}
		
		//Stop the animation
		this.stopAnimation();
		
		//Fade out the container
		this.element("container").morph({
			"opacity":	0
		});
		this.element("container").setStyle.delay(500, this.element("container"), ["display", "none"]);
		
		//And the overlay if applicable
		if(this.options.useOverlay === true) {
			this.element("overlay").morph({
				"opacity":	0
			});
			this.element("overlay").setStyle.delay(500, this.element("overlay"), ["display", "none"]);
		}
		
		//Set started to false
		this.started = false;
	}
});
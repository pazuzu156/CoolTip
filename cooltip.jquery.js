/*
 *
 * CoolTip
 * Tool Tip Plugin for jQuery
 * (c) 2011 Kaleb Klein
 *
 * cooltip.jquery.js
 * 
 */
 
 /**
  *
  * This jQuery plugin is made to create cool looking 
  * tool tip bubbles that replaces the boring tool tip that
  * browsers use by default
  *
  */
$.fn.cooltip = function(options) {
	// The defaults of the tool tip itseft, speed and delay
	// These will be explained later on in the code
	var defaults = {
		speed: 400,
		delay: 1
	};
	
	// Extend the options for the defaults that will be passed through if you wish
	// To use them
	var options = $.extend(defaults, options);
	
	// Quick function to assemble the tool tip
	getTip = function() {
		var tTip = "<div class='tip'><div class='tc'></div><div class='arrow'></div></div>";
		return tTip;
	}
	
	// Prepend the tool tip to the body of the page, to prevent
	// Placement issues on the page
	$("body").prepend(getTip());
	
	// Use the .each() for grabbing each tool tip that is being initialized
	// So they do not interact with each other and mess up any text
	$(this).each(function() {
		var $this = $(this);
		var tip = $('.tip');
		var tipInner = $('.tc');
		var tTitle = (this.title); // The title of the element that needs the tool tip will be used for the text
		this.title = ""; // Remove the text in the title to prevent the browser from shoing the default tool tip
		
		// Create placement instances
		var offset = $(this).offset();
		var tLeft = offset.left;
		var tTop = offset.top;
		var tWidth = $(this).width();
		var tHeight = $(this).height();
		
		// Now, we initialize the tool tip for when the mouse hovers over the element
		$this.hover(function() {
			tipInner.html(tTitle); // Add the text from the element's title into the body of the tool tip
			setTip(tTop, tLeft); // Found in the setTip() function
			setTimer(); // Found in the setTimer() function
		}, function() {
			stopTimer(); // Found in the stopTimer() function
			tip.hide(); // Hide the tooltip once the mouse leaves the element
		});
		
		// This sets the timer of when the mouse hovers over the element 
		// And initializes the tool tip to show up with the default delay time 
		// As defined in the defaults above
		setTimer = function() {
			$this.showTipTimer = setInterval("showTip()", defaults.delay);
		}
		
		// This stops the timer so the tool tip can be hidden
		stopTimer = function() {
			clearInterval($this.showTipTimer);
		}
		
		// This will set the tool tip where the arrow points to the center of the
		// Element that the tool tip shows on, for a clean look
		setTip = function(top, left) {
			var topOffset = tip.height();
			xTip = (left-45)+"px";
			yTip = (top-topOffset)+"px";
			tip.css({
				"top" : yTip,
				"left" : xTip
			});
		}
		
		// Show the tool tip itself by fading it in using the default speed as
		// Defined in the deafults above, and stopping the timer to prevent
		// The tool tip from fading in and being removed over and over again
		showTip = function() {
			stopTimer();
			tip.animate({"opacity" : "toggle"}, defaults.speed);
		}
	});
};
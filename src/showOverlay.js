/**
 *  Plugin showOverlay
 *    Shows a previously created overlay DOM element
 *    @param options - {Set} - Function options as defined below:
 *      @option autoHide - Boolean - True if the overlay should be hidden after a defined delay. Default false.
 *      @option delay - Int - Millisecond delay before hiding the overlay again. Default 1000 (1 Second).
 *      @option animation - String - Animation type to use. Default none. Options 'slide' or 'fade'.
 *      @option animationDuration - Int - Animation duration in Milliseconds. Default 0.
 *
 *    Example function call:
 *    $('#miniCart_overlay').showOverlay({
 *      autoHide:true,
 *      delay:2000,
 *      animation:'fade,
 *      animationDuration:1500
 *    });
 *
*/
$.fn.showOverlay = function(options) {

	//plugin target
	var pluginTarget = this;

	//default settings
	var settings = $.extend({
		autoHide:false,
		delay:1000,
		animation:'none',
		animationDuration:0
	}, options);

	//If the target is NOT an overlay - display an error message
	if (!pluginTarget.data('isAnOverlay')) {
		console.log('Error - target element is not an overlay');
	} else {
	// target is a valid overlay - proceed

		//show the overlay using the defined animation or the default
		switch (settings.animation) {
			case 'slide' : pluginTarget.slideDown(settings.animationDuration, function(){});
				break;
			case 'fade' : pluginTarget.fadeIn(settings.animationDuration, function(){});
				break;
			default : pluginTarget.show();
		}

		//mark the overlay as visible
		pluginTarget.data('visible',true);

		//if autoHide is true - hide the overlay after the specified delay
		if (settings.autoHide) {
			pluginTarget.hideOverlay({
				delay:settings.delay,
				animation:settings.animation,
				animationDuration:settings.animationDuration
			});
		}
	}

	return this;

};
//end showOverlay
//showOverlay
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
//END showOverlay
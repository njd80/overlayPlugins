//hideOverlay
$.fn.hideOverlay = function(options) {

	//plugin target
	var pluginTarget = this;

	//default settings
	var settings = $.extend({
		delay:0,
		animation:'none',
		animationDuration:0
	}, options);

	//If the target is NOT an overlay - display an error message
	if (!pluginTarget.data('isAnOverlay')) {
		console.log('Error - target element is not an overlay');
	} else {
		//hide the overlay after the specified delay using any specified animation
		window.setTimeout(function () {
			switch (settings.animation) {
				case 'slide' : pluginTarget.slideUp(settings.animationDuration, function(){});
					break;
				case 'fade' : pluginTarget.fadeOut(settings.animationDuration, function(){});
					break;
				default : pluginTarget.hide();
			}
		}, settings.delay);

		//mark the overlay as not visible
		pluginTarget.data('visible',false);
	}

	return this;

};
//END hideOverlay
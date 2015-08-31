/**
 *  Plugin positionOverlay
 *    Positions a previously created overlay
 *    @param referenceID - String - ID of DOM element to use as a reference for overlay positioning.
 *    @param options - {Set} - Function options as defined below:
 *      @option offsets - Array[int,int] - [left offset, top offset] - Left and Top Offset to position the overlay relative to the target. Default [5,5].
 *
 *    Example function call - $('#miniCart_overlay').positionOverlay('cart_icon',{
 *      offsets:[100,20]
 *    });
 *
*/
$.fn.positionOverlay = function(referenceID,options) {

	//plugin target
	var pluginTarget = this;

	//default settings
	var settings = $.extend({
		offsets:[5,5]
	}, options);

	//If the target is NOT an overlay - display an error message
	if (!pluginTarget.data('isAnOverlay')) {
		console.log('Error - target element is not an overlay');
	} else {
	// target is a valid overlay - proceed

		//get the reference DOM element
		var reference = $('#' + referenceID);

		//get the offset of the reference
		var referenceOffset = reference.offset();

		//set the target position
		pluginTarget.css({
			'position': 'absolute',
			'top': referenceOffset.top + settings.offsets[1],
			'left': function () {
				if ($('body').width() < 380) {
					//if screen width is narrow mobile - snap to left
					return 5;
				} else {
					return referenceOffset.left - settings.offsets[0];
				}
			}
		});
	}

	return this;

};
//end positionOverlay
//makeOverlay
$.fn.makeOverlay = function(triggerID, options) {

	//plugin target
	var pluginTarget = this;

	//trigger DOM element
	var trigger = $('#' + triggerID);

	//default settings
	var settings = $.extend({
		method:'hover',
		offsets:[5,5],
		delay:1000,
		animation:'none',
		animationDuration:0
	}, options);

	/* *** Initial Setup function *** */
	(function setup() {
		//mark as an overlay
		pluginTarget.data('isAnOverlay',true);
		//position the overlay
		pluginTarget.positionOverlay(triggerID,{
			offsets:settings.offsets
		});
		//hide the overlay
		pluginTarget.hideOverlay();
	})();
	/* *** END Initial Setup function *** */

	/* *** Event Listener Functions *** */
	if (settings.method === 'click') {
		//Method is click - add click listener to trigger element
		trigger.click(function(e) {

			//prevent any default click action on trigger
			e.preventDefault();

			if (pluginTarget.data('visible')) {
				//overlay is visible

				//hide the overlay
				pluginTarget.hideOverlay({
					animation:settings.animation,
					animationDuration:settings.animationDuration
				});

			} else {
				//overlay is NOT visible

				//position the overlay
				pluginTarget.positionOverlay(triggerID,{
					offsets:settings.offsets
				});

				//show the overlay
				pluginTarget.showOverlay({
					animation:settings.animation,
					animationDuration:settings.animationDuration
				});

			}
		});
	} else {
		//Method is NOT 'click' so use hover - apply a hover to the overlay as well via shared timer

		//set shared timer
		var sharedOverlayTimer;

		//target hover function to show overlay
		trigger.hover(function () {

			//clear any still running timers to keep overlay visible
			clearTimeout(sharedOverlayTimer);

			//position the overlay
			pluginTarget.positionOverlay(triggerID,{
				offsets:settings.offsets
			});

			//show the overlay
			pluginTarget.showOverlay({
				animation:settings.animation,
				animationDuration:settings.animationDuration
			});
		}, function () {
			//trigger hover out - set shared timer to hide overlay after specified delay

			sharedOverlayTimer = setTimeout(function () {
				pluginTarget.hideOverlay({
					animation:settings.animation,
					animationDuration:settings.animationDuration
				});
			}, settings.delay);
		});
		//END target hover function

		//overlay hover function to keep overlay visible
		pluginTarget.hover(function () {

			//clear any still running timers to keep overlay visible
			clearTimeout(sharedOverlayTimer);

		}, function () {
			//overlay hover out - set shared timer to hide overlay after specified delay

			sharedOverlayTimer = setTimeout(function () {
				pluginTarget.hideOverlay({
					animation:settings.animation,
					animationDuration:settings.animationDuration
				});
			}, settings.delay);
		});
		//END overlay hover function
	}
	/* *** END Event Listener Functions *** */

	return this;

};
// END makeOverlay
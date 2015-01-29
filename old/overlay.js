/* ****************************************************************************************************************** */
/**
 * Function createOverlay
 *
 * Requires jQuery > 1.7.2
 *
 * @param overlayID - String - ID of DOM element to make into an overlay.
 * @param targetID - String - ID of DOM element to use as a trigger for the overlay.
 * @param method - String - Trigger method, "click" or "hover".
 * @param offset - Array[int,int] - [left offset, top offset] - Left and Top Offset to position the overlay relative to the target.
 * @param delay - Int - Millisecond delay for overlay to disappear after mouseout (not used if method is click)
 *
 * Example function call - createOverlay("cart_summary_overlay", "cart_summary_link", "hover", [70,37], 1000);
 */
function createOverlay(overlayID, targetID, method, offset, delay) {

/* *** Global Variables *** */
//DOM pointers
var overlay = $('#'+overlayID);
var target = $('#'+targetID);

//offsets
var leftOffset = offset[0];
var topOffset = offset[1];
/* *** END Global Variables *** */

/* *** Re-Usable Functions *** */
//position overlay
function positionOverlay() {
	//Get the offset of the target
	var targetOffset = target.offset();

	overlay.css({
		'position':'absolute',
		'left': function() {
			if($('body').width() < 380) {
				return 5;
			} else {
				return targetOffset.left-leftOffset;
			}
		},
		'top':targetOffset.top+topOffset
	});
}

//hide overlay
function hideOverlay() {
	overlay.hide();
	overlay.data("visible", false);
}

//show overlay
function showOverlay() {
	overlay.show();
	overlay.data("visible", true);
}
/* *** END Re-Usable Functions *** */

/* *** Initial Setup function *** */
(function setup() {
	//position the overlay
	positionOverlay();
	//hide the overlay
	hideOverlay();
})();
/* *** END Initial Setup function *** */

/* *** Event Listener Functions *** */
if (method === "click") {
	target.click(function(e) {
		positionOverlay();
		e.preventDefault();
		if (overlay.data("visible")) {
			hideOverlay();
		} else {
			showOverlay();
		}
	});
} else {
	/* If method is NOT "click", then use hover - apply a hover to the overlay as well via shared timer */
	var sharedOverlayTimer;

	//target hover function to show overlay
	target.hover(function() {
		clearTimeout(sharedOverlayTimer);
		positionOverlay();
		showOverlay();
	}, function() {
		sharedOverlayTimer = setTimeout(function() {hideOverlay()}, delay);
	});

	//overlay hover function to keep overlay visible
	overlay.hover(function() {
		clearTimeout(sharedOverlayTimer);
	}, function() {
		sharedOverlayTimer = setTimeout(function() {hideOverlay()}, delay);
	});
}
/* *** END Event Listener Functions *** */

}//End function createOverlay()
/* ****************************************************************************************************************** */

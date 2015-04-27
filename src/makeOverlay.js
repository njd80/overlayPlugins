/**
 *  Plugin makeOverlay
 *    Creates a new overlay based on the target
 *      @param triggerID - String - ID of DOM element to use as a trigger for the overlay and reference for positioning.
 *      @param options - {Set} - Function options as defined below:
 *        @option method - String - Trigger method, 'click' or 'hover'. Default 'hover'.
 *        @option offsets - Array[int,int] - [left offset, top offset] - Left and Top Offset to position the overlay relative to the target. Default [5,5].
 *        @option delay - Int - Millisecond delay for overlay to disappear after mouseout (not used if method is click). Default 1000 (1 Second).
 *        @option animation - String - Animation type to use. Default none. Options 'slide' or 'fade'.
 *        @option animationDuration - Int - Animation duration in Milliseconds. Default 0.
 *
 *      Example function call:
 *      $('#minicart_overlay').makeOverlay("cart_icon", {
 *        method:'click',
 *        offsets:[325,36],
 *        delay:2000,
 *        animation:'slide',
 *        animationDuration:500
 *      });
 *
*/
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
    trigger.click(function(e) {
      e.preventDefault();
      if (pluginTarget.data('visible')) {
        pluginTarget.hideOverlay({
          animation:settings.animation,
          animationDuration:settings.animationDuration
        });
      } else {
        pluginTarget.positionOverlay(triggerID,{
          offsets:settings.offsets
        });
        pluginTarget.showOverlay({
          animation:settings.animation,
          animationDuration:settings.animationDuration
        });
      }
    });
  } else {
    /* If method is NOT 'click', then use hover - apply a hover to the overlay as well via shared timer */
    var sharedOverlayTimer;

    //target hover function to show overlay
    trigger.hover(function () {
      clearTimeout(sharedOverlayTimer);
      pluginTarget.positionOverlay(triggerID,{
        offsets:settings.offsets
      });
      pluginTarget.showOverlay({
        animation:settings.animation,
        animationDuration:settings.animationDuration
      });
    }, function () {
      sharedOverlayTimer = setTimeout(function () {
        pluginTarget.hideOverlay({
          animation:settings.animation,
          animationDuration:settings.animationDuration
        });
      }, settings.delay);
    });

    //overlay hover function to keep overlay visible
    pluginTarget.hover(function () {
      clearTimeout(sharedOverlayTimer);
    }, function () {
      sharedOverlayTimer = setTimeout(function () {
        pluginTarget.hideOverlay({
          animation:settings.animation,
          animationDuration:settings.animationDuration
        });
      }, settings.delay);
    });
  }
  /* *** END Event Listener Functions *** */

  return this;
};
//end makeOverlay
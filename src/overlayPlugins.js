(function ($) {
/**
 *  Overlay Plugins
 *  2015. Neil Donaldson
*/

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
//end of plugin makeOverlay();
  /* ****************************************************************************************************************** */

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

  //check if the target is already an overlay
  if (!pluginTarget.data('isAnOverlay')) {
    console.log('Error - targeted element is not an overlay');
  } else {
    //show the overlay using any specified animation
    switch (settings.animation) {
      case 'slide':pluginTarget.slideDown(settings.animationDuration, function(){});
        break;
      case 'fade':pluginTarget.fadeIn(settings.animationDuration, function(){});
        break;
      default: pluginTarget.show();
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
//end of plugin showOverlay()
  /* ****************************************************************************************************************** */

/**
 *  Plugin hideOverlay
 *    Hides a previously created overlay DOM element
 *    @param options - {Set} - Function options as defined below:
 *      @option delay - Int - Millisecond delay before hiding the overlay. Default 0.
 *      @option animation - String - Animation type to use. Default none. Options 'slide' or 'fade'.
 *      @option animationDuration - Int - Animation duration in Milliseconds. Default 0.
 *
 *    Example function call - $('#miniCart_overlay').hideOverlay({
 *      delay:2000,
 *      animation:'slide',
 *      animationDuration:2000
 *    });
 *
*/
$.fn.hideOverlay = function(options) {

  //plugin target
  var pluginTarget = this;

  //default settings
  var settings = $.extend({
    delay:0,
    animation:'none',
    animationDuration:0
  }, options);

  //check if the target is already an overlay
  if (!pluginTarget.data('isAnOverlay')) {
    console.log('Error - targeted element is not an overlay');
  } else {
    //hide the overlay after the specified delay using any specified animation
    window.setTimeout(function () {
      switch (settings.animation) {
        case 'slide':pluginTarget.slideUp(settings.animationDuration, function(){});
          break;
        case 'fade':pluginTarget.fadeOut(settings.animationDuration, function(){});
          break;
        default: pluginTarget.hide();
      }
    }, settings.delay);

    //mark the overlay as not visible
    pluginTarget.data('visible',false);
  }
  return this;
};
//end of plugin hideOverlay()
/* ****************************************************************************************************************** */

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

  //trigger DOM element
  var reference = $('#' + referenceID);

  //default settings
  var settings = $.extend({
    offsets:[5,5]
  }, options);

  //check if the target is already an overlay
  if (!pluginTarget.data('isAnOverlay')) {
    console.log('Error - targeted element is not an overlay');
  } else {
    //get the offset of the reference
    var referenceOffset = reference.offset();
    //set the target position
    pluginTarget.css({
      'position': 'absolute',
      'left': function () {
        if ($('body').width() < 380) {
          return 5;
        } else {
          return referenceOffset.left - settings.offsets[0];
        }
      },
      'top': referenceOffset.top + settings.offsets[1]
    });
  }
  return this;
};
//end of plugin positionOverlay()
/* ****************************************************************************************************************** */
}(jQuery));
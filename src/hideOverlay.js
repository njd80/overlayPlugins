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
//end hideOverlay
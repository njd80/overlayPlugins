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
//end positionOverlay
### overlayPlugins
**Re-usable jQuery Plugins for creating/manipulating overlays**

#### Version History
##### 0.8 (29/01/2015)
- Beta Release  
  https://github.com/njd80/overlayPlugins/releases/tag/v0.8

##### 0.8.1 (27/04/2015)
- Added Grunt Build & Serve support
- Added test index.html

##### 0.8.2 (31/08/2015)
- Moved plugin banner comments to README.md
- Updated package.json
- Gruntfile Re-write
- Consolidated Grunt Build tasks
- Added dist/ output during build
- Added JS Minification
- Improved index.html Tester


#### Available Functions

##### makeOverlay()
Creates a new overlay based on the target
- @param triggerID - String - ID of DOM element to use as a trigger for the overlay and reference for positioning.
- @param options - {Set} - Function options as defined below:
  * @option method - String - Trigger method, 'click' or 'hover'. Default 'hover'.
  * @option offsets - Array[int,int] - [left offset, top offset] - Left and Top Offset to position the overlay relative to the target. Default [5,5].
  * @option delay - Int - Millisecond delay for overlay to disappear after mouseout (not used if method is click). Default 1000 (1 Second).
  * @option animation - String - Animation type to use. Default none. Options 'slide' or 'fade'.
  * @option animationDuration - Int - Animation duration in Milliseconds. Default 0.

Example function call:
```javascript
$('#minicart_overlay').makeOverlay("cart_icon", {
	method:'click',
	offsets:[325,36],
	delay:2000,
	animation:'slide',
	animationDuration:500
});
```

##### hideOverlay()
Hides a previously created overlay DOM element
- @param options - {Set} - Function options as defined below:
  * @option delay - Int - Millisecond delay before hiding the overlay. Default 0.
  * @option animation - String - Animation type to use. Default none. Options 'slide' or 'fade'.
  * @option animationDuration - Int - Animation duration in Milliseconds. Default 0.

Example function call:
```javascript
$('#miniCart_overlay').hideOverlay({
	delay:2000,
	animation:'slide',
	animationDuration:2000
});
```

##### showOverlay()
Shows a previously created overlay DOM element
- @param options - {Set} - Function options as defined below:
  * @option autoHide - Boolean - True if the overlay should be hidden after a defined delay. Default false.
  * @option delay - Int - Millisecond delay before hiding the overlay again. Default 1000 (1 Second).
  * @option animation - String - Animation type to use. Default none. Options 'slide' or 'fade'.
  * @option animationDuration - Int - Animation duration in Milliseconds. Default 0.

Example function call:
```javascript
$('#miniCart_overlay').showOverlay({
	autoHide:true,
	delay:2000,
	animation:'fade,
	animationDuration:1500
});
```

##### positionOverlay()
Positions a previously created overlay
- @param referenceID - String - ID of DOM element to use as a reference for overlay positioning.
  * @param options - {Set} - Function options as defined below:
  * @option offsets - Array[int,int] - [left offset, top offset] - Left and Top Offset to position the overlay relative to the target. Default [5,5].

Example function call:
```javascript
$('#miniCart_overlay').positionOverlay('cart_icon',{
	offsets:[100,20]
});
```

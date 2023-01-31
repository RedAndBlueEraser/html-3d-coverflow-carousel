# HTML 3D Coverflow Carousel

An implementation of HTML 3D Coverflow Carousel with CSS and vanilla JavaScript. It displays multiple (at least 2) panels as a 3D coverflow carousel in a HTML document.

## Browser support

The carousel requires a browser that supports CSS 3D transforms (including `transform-style: preserve-3d`) and recommends a browser that supports CSS transitions.

The following desktop browsers were tested and support this carousel.

- Edge 13+ (Internet Explorer is not supported as it does not support `transform-style: preserve-3d`)
- Firefox 10+
- Chrome 12+
- Opera 15+

See http://caniuse.com/#feat=transforms3d for the support of more browsers.

## How to use?

### Setup

Place `coverflowcarousel.css` and `coverflowcarousel.js` next to your HTML document file.

Add the following to your HTML document's head:

```HTML
<link rel="stylesheet" href="coverflowcarousel.css">
<script src="coverflowcarousel.js"></script>
```

You can now create coverflow carousels in your HTML document.

### Writing

Use the following code as an example to structure your content for the coverflow carousel:

```HTML
<div id="my-carousel" class="coverflow-carousel">
  <div class="panels-container">
    <div class="panel">1st panel</div>
    <div class="panel">2nd panel</div>
    <div class="panel">3rd panel</div>
    <div class="panel">4th panel</div>
    <div class="panel">5th panel</div>
    <div class="panel">6th panel</div>
  </div>
</div>
<script>
  var myCarousel = new CoverflowCarousel(document.getElementById('my-carousel'));
</script>
```

You can add or remove `<div class="panel">...</div>` lines to generate more or less panels in the coverflow carousel. You should have at least one panel. You can nest HTML elements or simply insert text inside each panel.

You must specify a fixed width for the panels; best done through adding a new CSS rule for `#my-carousel .panel`, for example:

```CSS
#my-carousel .panel {
  width: 100px;
}
```

Using the default options, the coverflow carousel doesn't automatically interact in anyway.

You can create buttons to scroll the panels using the `CoverflowCarousel.scrollToPrevious()`, `CoverflowCarousel.scrollToNext()` and `CoverflowCarousel.scrollTo()` methods. For example, the following HTML creates three buttons to scroll to the previous, to the next and to the third panel:

```HTML
<a id="previous" href="#">Previous</a>
<a id="next" href="#">Next</a>
<a id="3rd" href="#">3rd</a>
<script>
  document.getElementById('previous').addEventListener('click', function (event) {
      myCarousel.scrollToPrevious();
      event.preventDefault();
  });

  document.getElementById('next').addEventListener('click', function (event) {
      myCarousel.scrollToNext();
      event.preventDefault();
  });

  document.getElementById('3rd').addEventListener('click', function (event) {
      myCarousel.scrollTo(3);
      event.preventDefault();
  });
</script>
```

### Options

When you can create a new CoverflowCarousel object in JavaScript by calling `new CoverflowCarousel(document.getElementById('my-carousel'));`, you can add additional features to the coverflow carousel by including options, for example:

```JavaScript
var mC = document.getElementById('my-carousel');
var myCarousel = new CoverflowCarousel(mC, { startIndex: 1, arrowKeys: true, clickable: true, wheelable: true, timeout: 2000 });
```

The coverflow carousel object would be created with the option `{ startIndex: 1, arrowKeys: true, clickable: true, wheelable: true, timeout: 2000 }`.

Valid options are:

- `startIndex` - Accepts a number; defaults to `0`. The panel, as specified by the index, to be displayed first when the coverflow carousel is created.
- `arrowKeys` - Accepts a boolean; defaults to `false`. Whether using the arrow keys will scroll the coverflow carousel to the previous panel or the next panel.
- `clickable` - Accepts a boolean; defaults to `false`. Whether you can click on a panel to scroll the carousel to the panel.
- `wheelable` - Accepts a boolean; defaults to `false`. Whether using the mouse wheel will scroll the coverflow carousel to the previous panel or the next panel.
- `timeout` - Accepts a number; defaults to `0`. The time interval, in milliseconds, to automatically scroll the carousel. The automatic scrolling **pauses when the user hovers the mouse** over the coverflow carousel.

### Properties and methods

#### Properties

Each coverflow carousel object has the following properties which are all **readonly**:

- `CoverflowCarousel.element` - A `HTMLElement` object. The HTML element of the carousel.
- `CoverflowCarousel.currentIndex` - A number. The index of the panel currently displayed.
- `CoverflowCarousel.panelsContainer` - A `HTMLElement` object. The HTML element of the carousel's panels container.
- `CoverflowCarousel.intervalID` - A number or `null`. The interval ID of the interval used to automatically scroll the carousel. `null` if there is no such interval (or the interval wasn't created with the CoverflowCarousel object).
- `CoverflowCarousel.panels` - A `HTMLCollection` object. The HTML elements of the panels in the carousel.
- `CoverflowCarousel.panelWidth` - A number. The total width, in pixels, of the first panel in the carousel.

#### Methods

Each coverflow carousel object has the following methods which can manipulate the carousel:

##### `CoverflowCarousel.addPanel`
`CoverflowCarousel.addPanel(panel)` appends the specified panel, as a HTML element, to the end of the carousel.
`CoverflowCarousel.addPanel(index, panel)` adds the specified panel, as a HTML element, at the specified position, as a number, in the carousel.

##### `CoverflowCarousel.removePanel`
`CoverflowCarousel.removePanel()` removes the panel at the end of the carousel.
`CoverflowCarousel.removePanel(index)` removes the panel at the specified position, as a number, in the carousel.
`CoverflowCarousel.removePanel(panel)` removes the specified panel, as a HTML element, from the carousel.

##### `CoverflowCarousel.orientate`
`CoverflowCarousel.orientate()` orientates and transforms the carousel's panels.

##### `CoverflowCarousel.scrollToNext`
`CoverflowCarousel.scrollToNext()` scrolls the carousel to show the next panel.

##### `CoverflowCarousel.scrollToPrevious`
`CoverflowCarousel.scrollToPrevious()` scrolls the carousel to show the previous panel.

##### `CoverflowCarousel.scrollTo`
`CoverflowCarousel.scrollTo(index)` scrolls the carousel to show the panel at the specified position.

##### `CoverflowCarousel.setTimeout`
`CoverflowCarousel.setTimeout(timeout)` automatically scrolls the carousel at specified time intervals.

##### `CoverflowCarousel.clearTimeout`
`CoverflowCarousel.clearTimeout()` stops automatically scrolling the carousel.

### Tweaks

You may want to use these CSS rules or JS code to tweak the appearance of the coverflow carousel.

#### Perspective

Change the perspective (distance) from where the carousel is viewed. 

```CSS
.coverflow-carousel {
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  perspective: 1000px;
}
```

#### Scroll speed

Change the speed of scrolling the carousel.

```CSS
.coverflow-carousel > .panels-container > .panel {
    -webkit-transition: 1000ms;
    -moz-transition: 1000ms;
    -o-transition: 1000ms;
    transition: 1000ms;
}
```

#### Space above and below the carousel

Add space before and after the carousel. If you add margins to `.coverflow-carousel` instead, you would find that the panels are still hidden if they overlap the the `.panels-container` boundaries.

```CSS
.panels-container {
  margin-bottom: 16px;
  margin-top: 16px;
}
```

#### Spacing between panels

Add space in between panels.

```CSS
.panel {
  margin-left: 16px;
  margin-right: 16px;
}
```

#### Margin fix

Sometimes the first panel might not have its contents wrapped. In this case, add padding to the panels.

```CSS
.panel {
  padding: 16px;
}
```

#### Orientation algorithm

Change the orientation algorithm used to position panels in the carousel.

```JavaScript
(function () {
    var ALPHA = 90, BETA = 1, GAMMA = 4 / 3, DELTA = 1, ZETA = 0.5,
        PAPWF = [0],
        gPAPWF = function (i) {
            if (i >= PAPWF.length) {
                PAPWF[i] = gPAPWF(i - 1) + Math.cos(i * Math.PI / 2 / (i + DELTA));
            }
            return PAPWF[i];
        },
        getPanelsAccumulatedProjectedWidthFactor = function (i) {
            return gPAPWF(Math.abs(i));
        };

    /**
     * Orientates and transforms the carousel.
     */
    CoverflowCarousel.prototype.orientate = function () {
        var panelsLength = this.panels.length,
            panelWidth = this.panelWidth;
        for (var i = 0; i < panelsLength; i++) {
            var pStyle = this.panels[i].style;
            var relativePanelIndex = i - this.currentIndex;
            relativePanelIndex = (relativePanelIndex % panelsLength + panelsLength) % panelsLength;
            if (relativePanelIndex > panelsLength / 2) {
                relativePanelIndex -= panelsLength;
            }
            var rotateYInDeg = -ALPHA * relativePanelIndex / (Math.abs(relativePanelIndex) + BETA),
                rotateYInRad = rotateYInDeg * Math.PI / 180;
            var translateX = GAMMA * panelWidth * Math.sign(relativePanelIndex) * getPanelsAccumulatedProjectedWidthFactor(relativePanelIndex);
            var translateZ = -ZETA * panelWidth * Math.sign(rotateYInRad) * Math.sin(rotateYInRad) * Math.sqrt(Math.abs(relativePanelIndex));

            pStyle.msTransform = pStyle.webkitTransform = pStyle.MozTransform = pStyle.OTransform = pStyle.transform =
                'translateX(' + translateX + 'px)' + 'translateZ(' + translateZ + 'px)' + 'rotateY(' + rotateYInDeg + 'deg)';
        }
    };
})();
```

You may redefine the constants `ALPHA`, `BETA`, `GAMMA`, `DELTA` and `ZETA` to your liking. These constants control the angles, changes in angles, space between, changes in space between, and "into the distance" of panels, respectively.

You may even rewrite the entire function to change translateX, translateZ and rotateY CSS properties of the panels.


## Warnings

- The carousel sets `text-align` of its contents to `center`. You can override this behaviour by specifying further `text-align` CSS rules.
- You must specify a **fixed** width for panels (best through adding a new CSS rule for `.panel`) before calling `new CoverflowCarousel()`. You cannot use a relative width (for example, `50%`).

## Author

RedAndBlueEraser

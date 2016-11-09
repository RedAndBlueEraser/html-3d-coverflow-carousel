/**
 * @fileoverview Operates on HTML elements to display a 3D coverflow carousel.
 * @author Harry Wong (RedAndBlueEraser)
 * @version 20161109
 */

'use strict';

/**
 * Creates a new CoverflowCarousel.
 * @constructor
 * @param {HTMLElement} element The HTML element of the carousel.
 * @param {Object} [options] The options used to create the carousel.
 * @param {number} [options.startIndex=0] The index of the first panel displayed.
 * @param {boolean} [options.arrowKeys=false] Whether keyboard arrow keys can scroll the carousel.
 * @param {boolean} [options.clickable=false] Whether mouse clicks can scroll the carousel.
 * @param {number} [options.timeout=0] The time interval, in milliseconds, to automatically scroll the carousel.
 */
function CoverflowCarousel(element, options) {
    /**
     * The HTML element of the carousel.
     * @type {HTMLElement}
     * @public
     * @readonly
     */
    this.element = element;

    /**
     * The index of the current panel displayed.
     * @type {number}
     * @default 0
     * @public
     * @readonly
     */
    this.currentIndex = 0;
    if (options && options.startIndex) {
        this.currentIndex = options.startIndex;
    }

    /**
     * The HTML element of the panels container.
     * @type {HTMLElement}
     * @public
     * @readonly
     */
    this.panelsContainer = this.element.getElementsByClassName('panels-container')[0];

    /* Add keydown event listeners to scroll the carousel. */
    if (options && options.arrowKeys) {
        (function (coverflowCarousel) {
            var LEFT = 37, RIGHT = 39;
            document.addEventListener('keydown', function (event) {
                var key = event.which;
                if (key == LEFT) {
                    coverflowCarousel.scrollToPrevious();
                    event.preventDefault();
                } else if (key == RIGHT) {
                    coverflowCarousel.scrollToNext();
                    event.preventDefault();
                }
            });
        })(this);
    }

    /* Add mouse event listeners to scroll the carousel. */
    if (options && options.clickable) {
        // TODO.
    }

    /**
     * The interval ID of the interval to scroll the carousel periodically.
     * @type {number}
     * @default null
     * @public
     * @readonly
     */
    this.intervalID = null;
    /* Set intervals to scroll the carousel periodically. */
    if (options && options.timeout) {
        this.setTimeout(options.timeout);
    }

    this.orientate();
}

/* Properties. */
/**
 * The HTML elements of the panels in the carousel.
 * @memberof {CoverflowCarousel}
 * @type {HTMLCollection}
 * @public
 * @readonly
 */
Object.defineProperty(CoverflowCarousel.prototype, 'panels',
    { get: function () { return this.panelsContainer.getElementsByClassName('panel'); } });

/**
 * The total width, in pixels, of the first panel in the carousel.
 * @memberof {CoverflowCarousel}
 * @type {number}
 * @public
 * @readonly
 */
Object.defineProperty(CoverflowCarousel.prototype, 'panelWidth',
    { get: function () {
            var panel = this.panels[0], panelStyle = getComputedStyle(panel);
            return panel.offsetWidth + parseFloat(panelStyle.marginLeft) +
                parseFloat(panelStyle.marginRight);
        }
    });

/* Methods. */
/**
 * Appends the specified panel to the end of the carousel.
 * @param {HTMLElement} panel The panel to append.
 *//**
 * Inserts the specified panel at the specified position in the carousel.
 * @param {number} index The position at which the panel is to be inserted.
 * @param {HTMLElement} panel The panel to insert.
 */
CoverflowCarousel.prototype.addPanel = function (panelOrIndex, panel) {
    if (panelOrIndex instanceof HTMLElement) {
        this.currentIndex += Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.appendChild(panelOrIndex);
        this.orientate();
    } else if (typeof panelOrIndex === 'number' && panel instanceof HTMLElement) {
        this.currentIndex += Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.insertBefore(panel, this.panels[panelOrIndex]);
        this.orientate();
    }
};

/**
 * Removes the panel at the end of the carousel.
 *//**
 * Removes the panel at the specified position in the carousel. Shifts any subsequent panels to the left (subtracts one from their indices).
 * @param {number} index The position of the panel to be removed.
 *//**
 * Removes the specified panel from the carousel.
 * @param {HTMLElement} panel The panel to remove.
 */
CoverflowCarousel.prototype.removePanel = function (indexOrPanel) {
    if (typeof indexOrPanel === 'undefined') {
        this.currentIndex -= Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.removeChild(this.panelsContainer.lastElementChild);
        this.orientate();
    } else if (typeof indexOrPanel === 'number') {
        this.currentIndex -= Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.removeChild(this.panels[indexOrPanel]);
        this.orientate();
    } else if (indexOrPanel instanceof HTMLElement) {
        this.currentIndex -= Math.floor(this.currentIndex / this.panels.length);
        this.panelsContainer.removeChild(indexOrPanel);
        this.orientate();
    }
};

/**
 * Orientates and transforms the carousel.
 */
CoverflowCarousel.prototype.orientate = function () {
    // TODO.
    var sumFn = function (i) {
        var sum = 0;
        while (i > 0) {
            sum += Math.cos(i * Math.PI / 2 / (i + 0.5));
            i--;
        }
        return sum;
    };
    var panelsLength = this.panels.length,
        panelWidth = this.panelWidth;
    for (var i = 0; i < panelsLength; i++) {
        var pStyle = this.panels[i].style;
        var relativePanelIndex = (i - this.currentIndex) % panelsLength;
        if (relativePanelIndex > panelsLength / 2) {
            relativePanelIndex -= panelsLength;
        }
        var rotateYAsDeg = -90 * relativePanelIndex / (Math.abs(relativePanelIndex) + 1),
            rotateYAsRad = rotateYAsDeg * Math.PI / 180;
        var translateX = 0.75 * panelWidth * sumFn(Math.abs(relativePanelIndex)) * Math.sign(relativePanelIndex);
        var translateZ = -0.5 * panelWidth * Math.sin(rotateYAsRad) * Math.sign(rotateYAsRad);

        pStyle.msTransform = pStyle.webkitTransform = pStyle.MozTransform = pStyle.OTransform = pStyle.transform =
            'translateX(' + translateX + 'px)' + 'translateZ(' + translateZ + 'px)' + 'rotateY(' + rotateYAsDeg + 'deg)';
    }
};

/**
 * Scrolls the carousel to show the next panel.
 */
CoverflowCarousel.prototype.scrollToNext = function () {
    this.currentIndex++;
    this.orientate();
};

/**
 * Scrolls the carousel to show the previous panel.
 */
CoverflowCarousel.prototype.scrollToPrevious = function () {
    this.currentIndex--;
    this.orientate();
};

/**
 * Scrolls the carousel to show the panel at the specified position.
 * @param {number} index The position of the panel to be shown.
 */
CoverflowCarousel.prototype.scrollTo = function (index) {
    this.currentIndex = index;
    this.orientate();
};

(function () {
    var isMouseOver = false, isMouseDown = false,
        setIsMouseOverToTrueEL = function (event) { isMouseOver = true; },
        setIsMouseOverToFalseEL = function (event) { isMouseOver = false; },
        setIsMouseDownToTrueEL = function (event) { isMouseDown = true; },
        setIsMouseDownToFalseEL = function (event) { isMouseDown = false; };

    /**
     * Set an interval to automatically scroll the carousel.
     * @param {number} timeout The time interval, in milliseconds, to automatically scroll the carousel.
     */
    CoverflowCarousel.prototype.setTimeout = function (timeout) {
        /* Clear interval if it already exists. */
        if (this.intervalID) {
            this.clearTimeout();
        }

        /* Create a new interval. */
        this.intervalID = setInterval(function (coverflowCarousel) {
            if (!document.hidden && !isMouseOver && !isMouseDown) {
                coverflowCarousel.scrollToNext();
            }
        }, timeout, this);

        /* Pause auto scrolling if hovering over or dragging on the carousel. */
        this.element.addEventListener('mouseenter', setIsMouseOverToTrueEL);
        this.element.addEventListener('mouseleave', setIsMouseOverToFalseEL);
        this.element.addEventListener('mousedown', setIsMouseDownToTrueEL);
        document.addEventListener('mouseup', setIsMouseDownToFalseEL);
    };

    /**
     * Clear the interval to stop automatically scrolling the carousel.
     */
    CoverflowCarousel.prototype.clearTimeout = function () {
        clearInterval(this.intervalID);
        this.intervalID = null;

        /* Remove unused event listeners. */
        this.element.removeEventListener('mouseenter', setIsMouseOverToTrueEL);
        this.element.removeEventListener('mouseleave', setIsMouseOverToFalseEL);
        this.element.removeEventListener('mousedown', setIsMouseDownToTrueEL);
        document.removeEventListener('mouseup', setIsMouseDownToFalseEL);
    };
})();

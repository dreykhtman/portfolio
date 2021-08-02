/* global getIdentifier */

// [x, y]. These ratios must be set up manually based on the images
const arrowheadRatios = {
  nav: [0.02, 0.84],
  player: [0.89, 0.75],
  sticky: [0.25, 0.25],
  svg: [0.24, 0.71],
  domrect: [0.888, 0.631],
  checkmark: [0.27, 0.12],
};

// Set up the element map. That allows to automatically map out all of the
// required elements for the script to work, based on tags, IDs, and classes.
const elementMap = new Map();

// Find every <img> element that has an ID that starts with "screenshot--"
document.querySelectorAll('img[id^="screenshot--"]').forEach((screenshot) =>
  // Set up the map where keys are the screenshot elements, and values are objects "fromElements" and "svgArrows"
  elementMap.set(screenshot, {
    // fromElements is a NodeList of <span> elements with IDs that start with "from-${screenshot identifier}"
    fromElements: document.querySelectorAll(
      `span[id^=from-${getIdentifier(screenshot.id)}`
    ),
    // svgArrows is an object where keys are the identifying parts of IDs (nav, player, etc.),
    // and values are the <path> elements themselves.
    svgArrows: [
      ...document.querySelectorAll(
        `path[id^=svg-${getIdentifier(screenshot.id)}]`
      ),
    ].reduce(
      (obj, element) => ({
        ...obj,
        [getIdentifier(element.id)]: element,
      }),
      {}
    ),
  })
);

/*
Cubic Bezier points:
P0 - start coordinates
P1 and P2 - coordinates of points that determine the curve
P3 - end coordinates
*/
class Arrow {
  constructor(fromElement, toImage, xRatio, yRatio) {
    ({ p0x: this.p0x, p0y: this.p0y } = Arrow.getP0(fromElement));
    ({ p3x: this.p3x, p3y: this.p3y } = Arrow.getP3(toImage, xRatio, yRatio));
    ({
      p1x: this.p1x,
      p1y: this.p1y,
      p2x: this.p2x,
      p2y: this.p2y,
    } = Arrow.getP1P2(this.p0x, this.p0y, this.p3x, this.p3y));
  }

  static getP0(fromElement) {
    let { right, left, bottom } = fromElement.getBoundingClientRect();
    [right, left, bottom] = [right, left, bottom].map((num) => Math.round(num));

    return {
      p0x: Math.round((left + right) / 2),
      p0y: bottom,
    };
  }

  static getP3(toImage, xRatio, yRatio) {
    let { right, left, top, bottom } = toImage.getBoundingClientRect();
    [right, left, top, bottom] = [right, left, top, bottom].map((num) =>
      Math.round(num)
    );

    const p3x = Math.round((right - left) * xRatio + left);
    const p3y = Math.round((bottom - top) * yRatio + top);

    return { p3x, p3y };
  }

  static getP1P2(p0x, p0y, p3x, p3y) {
    const distance = Math.round(Math.sqrt((p3x - p0x) ** 2 + (p3y - p0y) ** 2));

    return {
      p1x: p0x,
      p1y: p0y + Math.round(distance / 4),
      p2x: p3x - Math.round(distance / 3),
      p2y: p3y + Math.round(distance / 15),
    };

    /*
    const screenHeight = window.innerHeight;
    const p1VerticalOffset = Math.round(screenHeight / 3);
    const p2OffsetRadius = Math.round(screenHeight / 5);
    const p2XOffset = p2OffsetRadius * Math.round(Math.cos(31));
    const p2YOffset = p2OffsetRadius * Math.round(Math.sin(31));

    return {
      p1x: p0x,
      p1y: p0y + p1VerticalOffset,
      p2x: p3x - p2XOffset,
      p2y: p3y + p2YOffset,
    };

    */
  }
}

const drawArrows = () => {
  // This is the Map.prototype.forEach(), not the Array forEach
  elementMap.forEach((elements, screenshot) => {
    if (screenshot.classList.contains('active')) {
      elements.fromElements.forEach((from) => {
        const arrow = new Arrow(
          from,
          screenshot,
          ...arrowheadRatios[getIdentifier(from.id)]
        );

        elements.svgArrows[getIdentifier(from.id)].setAttribute(
          'd',
          `M ${arrow.p0x} ${arrow.p0y} C ${arrow.p1x} ${arrow.p1y} ${arrow.p2x} ${arrow.p2y} ${arrow.p3x} ${arrow.p3y}`
        );
      });
    }
  });
};

document.addEventListener('scroll', () => {
  drawArrows();
});

window.addEventListener('resize', () => {
  drawArrows();
});

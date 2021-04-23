// <span> elements where the arrows start
const cotillionNavFrom = document.getElementById('from-cotillion-nav');
const cotillionPlayerFrom = document.getElementById('from-cotillion-player');
const cotillionStickyFrom = document.getElementById('from-cotillion-sticky');
const portfolioSvgFrom = document.getElementById('from-portfolio-svg');

// Screenshots to where the arrows point
const screenshotCotillion = document.getElementById('screenshot-cotillion');
const screenshotPortfolio = document.getElementById('screenshot-portfolio');

// SVG arrows (<path> elements)
const svgCotillionNav = document.getElementById('svg-cotillion-nav');
const svgCotillionPlayer = document.getElementById('svg-cotillion-player');
const svgCotillionSticky = document.getElementById('svg-cotillion-sticky');
const svgPortfolioSvg = document.getElementById('svg-portfolio-svg');

// Set up the element map. This allows to automatically map all of the required elements for the script to work based on tags, IDs, and classes.

const elementMap = new Map();

// Find every <img> element that has an ID that starts with "screenshot-"
document.querySelectorAll('img[id^="screenshot-"]').forEach((screenshot) =>
  // Set up a map where keys are the screenshot elements, and values are objects that have keys "fromElements" and "svgArrows"
  elementMap.set(screenshot, {
    // fromElements is a NodeList of <span> elements with IDs that start with "from-${screenshot ID minus the substring "screenshot-"}"
    fromElements: document.querySelectorAll(
      `span[id^=from-${screenshot.id.substring(11)}`
    ),
    // svgArrows is a similar NodeList of the <path> elements
    svgArrows: [
      ...document.querySelectorAll(
        `path[id^=svg-${screenshot.id.substring(11)}]`
      ),
    ].reduce(
      (obj, element) => ({
        ...obj,
        [element.id.substring(14)]: element,
      }),
      {}
    ),
  })
);

console.log(elementMap);

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

  // Cubic Bezier:
  // P0 - start coordinates
  // P1 and P2 - coordinates of points that determine the curve
  // P3 - end coordinates

  static getP0(fromElement) {
    let { right, left, bottom } = fromElement.getBoundingClientRect();
    [right, left, bottom] = [right, left, bottom].map((v) => Math.round(v));

    return {
      p0x: Math.round((left + right) / 2),
      p0y: bottom,
    };
  }

  static getP3(toImage, xRatio, yRatio) {
    let { right, left, top, bottom } = toImage.getBoundingClientRect();
    [right, left, top, bottom] = [right, left, top, bottom].map((v) =>
      Math.round(v)
    );

    const p3x = Math.round((right - left) * xRatio + left);
    const p3y = Math.round((bottom - top) * yRatio + top);

    return { p3x, p3y };
  }

  static getP1P2(p0x, p0y, p3x, p3y) {
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
  }
}

// [x, y]
const arrowheadRatios = {
  nav: [0.05, 0.93],
  player: [0.88, 0.7],
  sticky: [0.5, 0.15],
  svg: [0.1, 0.2],
};

const setAttr = () => {
  if (screenshotCotillion.classList.contains('active')) {
    const cotillionNavArrow = new Arrow(
      cotillionNavFrom,
      screenshotCotillion,
      0.05,
      0.93
    );

    const cotillionPlayerArrow = new Arrow(
      cotillionPlayerFrom,
      screenshotCotillion,
      0.88,
      0.7
    );

    const cotillionStickyArrow = new Arrow(
      cotillionStickyFrom,
      screenshotCotillion,
      0.5,
      0.15
    );

    svgCotillionNav.setAttribute(
      'd',
      `M ${cotillionNavArrow.p0x} ${cotillionNavArrow.p0y} C ${cotillionNavArrow.p1x} ${cotillionNavArrow.p1y} ${cotillionNavArrow.p2x} ${cotillionNavArrow.p2y} ${cotillionNavArrow.p3x} ${cotillionNavArrow.p3y}`
    );

    svgCotillionPlayer.setAttribute(
      'd',
      `M ${cotillionPlayerArrow.p0x} ${cotillionPlayerArrow.p0y} C ${cotillionPlayerArrow.p1x} ${cotillionPlayerArrow.p1y} ${cotillionPlayerArrow.p2x} ${cotillionPlayerArrow.p2y} ${cotillionPlayerArrow.p3x} ${cotillionPlayerArrow.p3y}`
    );

    svgCotillionSticky.setAttribute(
      'd',
      `M ${cotillionStickyArrow.p0x} ${cotillionStickyArrow.p0y} C ${cotillionStickyArrow.p1x} ${cotillionStickyArrow.p1y} ${cotillionStickyArrow.p2x} ${cotillionStickyArrow.p2y} ${cotillionStickyArrow.p3x} ${cotillionStickyArrow.p3y}`
    );
  }

  if (screenshotPortfolio.classList.contains('active')) {
    const portfolioSvgArrow = new Arrow(
      portfolioSvgFrom,
      screenshotPortfolio,
      0.1,
      0.2
    );

    svgPortfolioSvg.setAttribute(
      'd',
      `M ${portfolioSvgArrow.p0x} ${portfolioSvgArrow.p0y} C ${portfolioSvgArrow.p1x} ${portfolioSvgArrow.p1y} ${portfolioSvgArrow.p2x} ${portfolioSvgArrow.p2y} ${portfolioSvgArrow.p3x} ${portfolioSvgArrow.p3y}`
    );
  }
};

document.addEventListener('scroll', () => {
  setAttr();

  elementMap.forEach((elements, screenshot) => {
    if (screenshot.classList.contains('active')) {
      // Create arrows:
      const arrows = [];
      elements.fromElements.forEach((from) => {
        arrows.push(
          new Arrow(
            from,
            screenshot,
            ...arrowheadRatios[from.id.substring(screenshot.id.length - 5)]
          )
        );
      });
    }
  });
});

window.addEventListener('resize', () => {
  setAttr();
});

// <span> elements from which the arrows start
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

// Cubic Bezier functions:
// P0 - start coordinates
// P1 and P2 - coordinates of points that determine the curve
// P3 - end coordinates

const getP0 = (fromElement) => {
  let { right, left, bottom } = fromElement.getBoundingClientRect();
  [right, left, bottom] = [right, left, bottom].map((v) => Math.round(v));

  return {
    x: Math.round((left + right) / 2),
    y: bottom,
  };
};

const getP1P2 = (p0, p3) => {
  const screenHeight = window.innerHeight;
  const p1YOffset = Math.round(screenHeight / 3);
  const p2offsetRadius = Math.round(screenHeight / 5);
  const p2XOffset = p2offsetRadius * Math.round(Math.cos(31));
  const p2YOffset = p2offsetRadius * Math.round(Math.sin(31));

  return {
    p1x: p0.x,
    p1y: p0.y + p1YOffset,
    p2x: p3.x - p2XOffset,
    p2y: p3.y + p2YOffset,
  };
};

const getP3 = (toImage, xRatio, yRatio) => {
  let { right, left, top, bottom } = toImage.getBoundingClientRect();
  [right, left, top, bottom] = [right, left, top, bottom].map((v) =>
    Math.round(v)
  );

  const x = Math.round((right - left) * xRatio + left);
  const y = Math.round((bottom - top) * yRatio + top);

  return { x, y };
};

let intObsStartPoint = getP0(cotillionNavFrom);
let intObsEndPoint = getP3(screenshotCotillion, 0.05, 0.93);
let intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);

let playerStartPoint = getP0(cotillionPlayerFrom);
let playerEndPoint = getP3(screenshotCotillion, 0.88, 0.7);
let playerMidPoints = getP1P2(playerStartPoint, playerEndPoint);

let stickyStartPoint = getP0(cotillionStickyFrom);
let stickyEndPoint = getP3(screenshotCotillion, 0.5, 0.15);
let stickyMidPoints = getP1P2(stickyStartPoint, stickyEndPoint);

const setAttr = () => {
  svgCotillionNav.setAttribute(
    'd',
    `M ${intObsStartPoint.x} ${intObsStartPoint.y} C ${intObsMidPoints.p1x} ${intObsMidPoints.p1y} ${intObsMidPoints.p2x} ${intObsMidPoints.p2y} ${intObsEndPoint.x} ${intObsEndPoint.y}`
  );

  svgCotillionPlayer.setAttribute(
    'd',
    `M ${playerStartPoint.x} ${playerStartPoint.y} C ${playerMidPoints.p1x} ${playerMidPoints.p1y} ${playerMidPoints.p2x} ${playerMidPoints.p2y} ${playerEndPoint.x} ${playerEndPoint.y}`
  );

  svgCotillionSticky.setAttribute(
    'd',
    `M ${stickyStartPoint.x} ${stickyStartPoint.y} C ${stickyMidPoints.p1x} ${stickyMidPoints.p1y} ${stickyMidPoints.p2x} ${stickyMidPoints.p2y} ${stickyEndPoint.x} ${stickyEndPoint.y}`
  );

  svgPortfolioSvg.setAttribute(
    'd',
    `M ${
      (portfolioSvgFrom.getBoundingClientRect().left +
        portfolioSvgFrom.getBoundingClientRect().right) /
      2
    } ${portfolioSvgFrom.getBoundingClientRect().bottom} C 500 800 1300 800 ${
      screenshotPortfolio.getBoundingClientRect().left
    } ${screenshotPortfolio.getBoundingClientRect().bottom}`
  );
};

// This code is an example of straigt SVG lines instead of Cubic Bezier curves

// const setAttr = () => {
//   svgCotillionNav.setAttribute(
//     'd',
//     `M ${intObsStartPoint.x} ${intObsStartPoint.y}, L ${intObsEndPoint.x} ${intObsEndPoint.y}`
//   );

//   svgCotillionPlayer.setAttribute(
//     'd',
//     `M ${playerStartPoint.x} ${playerStartPoint.y}, L ${
//       screenshotCotillion.getBoundingClientRect().right
//     } ${playerEndPoint.y}`
//   );

//   svgPortfolioSvg.setAttribute(
//     'd',
//     `M ${
//       (portfolioSvgFrom.getBoundingClientRect().left +
//         portfolioSvgFrom.getBoundingClientRect().right) /
//       2
//     } ${portfolioSvgFrom.getBoundingClientRect().bottom} C 500 800, 1300 800 ${
//       screenshotPortfolio.getBoundingClientRect().left
//     } ${screenshotPortfolio.getBoundingClientRect().bottom}`
//   );
// };

setAttr();

document.addEventListener('scroll', () => {
  setAttr();
  intObsStartPoint = getP0(cotillionNavFrom);
  intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);
  intObsEndPoint = getP3(screenshotCotillion, 0.05, 0.93);

  stickyStartPoint = getP0(cotillionStickyFrom);
  stickyEndPoint = getP3(screenshotCotillion, 0.5, 0.15);
  stickyMidPoints = getP1P2(stickyStartPoint, stickyEndPoint);

  playerStartPoint = getP0(cotillionPlayerFrom);
  playerEndPoint = getP3(screenshotCotillion, 0.88, 0.7);
  playerMidPoints = getP1P2(playerStartPoint, playerEndPoint);
});

window.addEventListener('resize', () => {
  intObsStartPoint = getP0(cotillionNavFrom);
  intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);
  intObsEndPoint = getP3(screenshotCotillion, 0.05, 0.93);

  stickyStartPoint = getP0(cotillionStickyFrom);
  stickyEndPoint = getP3(screenshotCotillion, 0.5, 0.15);
  stickyMidPoints = getP1P2(stickyStartPoint, stickyEndPoint);

  playerStartPoint = getP0(cotillionPlayerFrom);
  playerEndPoint = getP3(screenshotCotillion, 0.88, 0.7);
  playerMidPoints = getP1P2(playerStartPoint, playerEndPoint);
  setAttr();
});

// Testing classes

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
    const p1YOffset = Math.round(screenHeight / 3);
    const p2offsetRadius = Math.round(screenHeight / 5);
    const p2XOffset = p2offsetRadius * Math.round(Math.cos(31));
    const p2YOffset = p2offsetRadius * Math.round(Math.sin(31));

    return {
      p1x: p0x,
      p1y: p0y + p1YOffset,
      p2x: p3x - p2XOffset,
      p2y: p3y + p2YOffset,
    };
  }
}

const arrow = new Arrow(cotillionNavFrom, screenshotCotillion, 0.1, 0, 5);
console.log(arrow);

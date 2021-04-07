// Spans from which the arrows start
const intObsFrom = document.getElementById('from-cotillion-int-obs');
const playerFrom = document.getElementById('from-cotillion-player');
const svgFrom = document.getElementById('from-portfolio-svg');

// Screenshots to where the arrows point
const screenshotCotillion = document.getElementById('screenshot-cotillion');
const screenshotPortfolio = document.getElementById('screenshot-portfolio');

// SVG arrows (<path> elements)
const svgCotillionNav = document.getElementById('svg-cotillion-nav');
const svgCotillionSticky = document.getElementById('svg-cotillion-sticky');
const svgPortfolioSvg = document.getElementById('svg-portfolio-svg');

// P0 - start coordinates
// P1 and P2 - coordinates of points that determine the curve
// P3 - end coordinates

const getP0 = (fromPoint) => {
  const rectangle = fromPoint.getBoundingClientRect();

  // return `${(rectangle.left + rectangle.right) / 2} ${rectangle.bottom}`;
  return {
    x: (rectangle.left + rectangle.right) / 2,
    y: rectangle.bottom,
  };
};

const getP1P2 = (p0, p3) => {
  const screenHeight = window.innerHeight;
  const p1YOffset = Math.round(screenHeight / 3);
  const p2offsetRadius = Math.round(screenHeight / 5);
  const p2XOffset = Math.round(p2offsetRadius * Math.cos(31));
  const p2YOffset = Math.round(p2offsetRadius * Math.sin(31));

  return {
    p1x: p0.x,
    p1y: p0.y + p1YOffset,
    p2x: p3.x - p2XOffset,
    p2y: p3.y + p2YOffset,
  };
};

const getP3 = (toPoint, xRatio, yRatio) => {
  const rect = toPoint.getBoundingClientRect();
  const x = (rect.right - rect.left) * xRatio + rect.left;
  const y = (rect.bottom - rect.top) * yRatio + rect.top;

  return { x, y };

  //   return {
  //     x: toPoint.getBoundingClientRect().left,
  //     y: toPoint.getBoundingClientRect().bottom,
  //  }
};

let intObsStartPoint = getP0(intObsFrom);
let intObsEndPoint = getP3(screenshotCotillion, 0.05, 0.93);
let intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);

let playerStartPoint = getP0(playerFrom);
let playerEndPoint = getP3(screenshotCotillion, 0.88, 0.7);
let playerMidPoints = getP1P2(playerStartPoint, playerEndPoint);

const setAttr = () => {
  svgCotillionNav.setAttribute(
    'd',
    `M ${intObsStartPoint.x} ${intObsStartPoint.y}, C ${intObsMidPoints.p1x} ${intObsMidPoints.p1y}, ${intObsMidPoints.p2x} ${intObsMidPoints.p2y} ${intObsEndPoint.x} ${intObsEndPoint.y}`
  );

  svgCotillionSticky.setAttribute(
    'd',
    `M ${playerStartPoint.x} ${playerStartPoint.y}, C ${playerMidPoints.p1x} ${playerMidPoints.p1y}, ${playerMidPoints.p2x} ${playerMidPoints.p2y} ${playerEndPoint.x} ${playerEndPoint.y}`
  );

  svgPortfolioSvg.setAttribute(
    'd',
    `M ${
      (svgFrom.getBoundingClientRect().left +
        svgFrom.getBoundingClientRect().right) /
      2
    } ${svgFrom.getBoundingClientRect().bottom} C 500 800, 1300 800 ${
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

//   svgCotillionSticky.setAttribute(
//     'd',
//     `M ${playerStartPoint.x} ${playerStartPoint.y}, L ${
//       screenshotCotillion.getBoundingClientRect().right
//     } ${playerEndPoint.y}`
//   );

//   svgPortfolioSvg.setAttribute(
//     'd',
//     `M ${
//       (svgFrom.getBoundingClientRect().left +
//         svgFrom.getBoundingClientRect().right) /
//       2
//     } ${svgFrom.getBoundingClientRect().bottom} C 500 800, 1300 800 ${
//       screenshotPortfolio.getBoundingClientRect().left
//     } ${screenshotPortfolio.getBoundingClientRect().bottom}`
//   );
// };

setAttr();

document.addEventListener('scroll', () => {
  setAttr();
  intObsStartPoint = getP0(intObsFrom);
  intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);
  intObsEndPoint = getP3(screenshotCotillion, 0.05, 0.93);

  playerStartPoint = getP0(playerFrom);
  playerEndPoint = getP3(screenshotCotillion, 0.88, 0.7);
  playerMidPoints = getP1P2(playerStartPoint, playerEndPoint);
});

window.addEventListener('resize', () => {
  intObsStartPoint = getP0(intObsFrom);
  intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);
  intObsEndPoint = getP3(screenshotCotillion, 0.05, 0.93);

  playerStartPoint = getP0(playerFrom);
  playerEndPoint = getP3(screenshotCotillion, 0.88, 0.7);
  playerMidPoints = getP1P2(playerStartPoint, playerEndPoint);
  setAttr();
});

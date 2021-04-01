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
  const p1verticalOffset = Math.round(screenHeight / 3);
  const p2offsetRadius = Math.round(screenHeight / 10);
  const p2offset = Math.round(p2offsetRadius * Math.sin(45));

  console.log(p2offset);

  return {
    p1x: p0.x,
    p1y: p0.y + p1verticalOffset,
    p2x: p3.x - p2offset,
    p2y: p3.y + p2offset,
  };
};

const getP3 = (toPoint) => ({
  x: toPoint.getBoundingClientRect().x,
  y: toPoint.getBoundingClientRect().bottom,
});

let intObsStartPoint = getP0(intObsFrom);
let intObsEndPoint = getP3(screenshotCotillion);
let intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);

console.log(intObsMidPoints);

const setAttr = () => {
  let cotillionNavbarCoordinates;

  svgCotillionNav.setAttribute(
    'd',
    `M ${intObsStartPoint.x} ${intObsStartPoint.y}, C ${intObsMidPoints.p1x} ${intObsMidPoints.p1y}, ${intObsMidPoints.p2x} ${intObsMidPoints.p2y} ${intObsEndPoint.x} ${intObsEndPoint.y}`
  );

  svgCotillionSticky.setAttribute(
    'd',
    `M ${
      (playerFrom.getBoundingClientRect().left +
        playerFrom.getBoundingClientRect().right) /
      2
    } ${playerFrom.getBoundingClientRect().bottom} C 500 800, 1300 800 ${
      screenshotCotillion.getBoundingClientRect().right
    } ${screenshotCotillion.getBoundingClientRect().bottom}`
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

setAttr();

document.addEventListener('scroll', () => {
  setAttr();
  intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);
  intObsEndPoint = getP3(screenshotCotillion);
});

window.addEventListener('resize', () => {
  intObsStartPoint = getP0(intObsFrom);
  intObsMidPoints = getP1P2(intObsStartPoint, intObsEndPoint);
  intObsEndPoint = getP3(screenshotCotillion);
  setAttr();
});

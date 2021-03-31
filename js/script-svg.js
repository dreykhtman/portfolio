// Spans from which the arrows start
const intObsFrom = document.getElementById('from-cotillion-int-obs');
const playerFrom = document.getElementById('from-cotillion-player');
const svgFrom = document.getElementById('from-portfolio-svg');

console.log(intObsFrom.tagName);

// Screenshots to where the arrows point
const screenshotCotillion = document.getElementById('screenshot-cotillion');
const screenshotPortfolio = document.getElementById('screenshot-portfolio');

// SVG arrows (<path> elements)
const svgCotillionNav = document.getElementById('svg-cotillion-nav');
const svgCotillionSticky = document.getElementById('svg-cotillion-sticky');
const svgPortfolioSvg = document.getElementById('svg-portfolio-svg');

const calculateStartingCoordinates = (fromPoint) => {
  const rectangle = fromPoint.getBoundingClientRect();

  return (rectangle.left + rectangle.right) / 2;
};

let intObsStart = calculateStartingCoordinates(intObsFrom);

const setAttr = () => {
  let cotillionNavbarCoordinates;

  svgCotillionNav.setAttribute(
    'd',
    `M ${intObsStart} ${
      intObsFrom.getBoundingClientRect().bottom
    } C 400 300, 1200 900 ${screenshotCotillion.getBoundingClientRect().x} ${
      screenshotCotillion.getBoundingClientRect().bottom
    }`
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
});

window.addEventListener('resize', () => {
  intObsStart = calculateStartingCoordinates(intObsFrom);
  setAttr();
});

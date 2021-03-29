// spans from which arrows start
const ioFrom = document.getElementById('description-cotillion-io-from');
const playerFrom = document.getElementById('description-cotillion-player-from');
const svgFrom = document.getElementById('description-portfolio-svg-from');

// screenshots where arrows point
const screenshotCotillion = document.getElementById('screenshot-cotillion');
const screenshotPortfolio = document.getElementById('screenshot-portfolio');

// svg arrows (<path> elements)
const svgCotillionNav = document.getElementById('svg-cotillion-nav');
const svgCotillionSticky = document.getElementById('svg-cotillion-sticky');
const svgPortfolioSvg = document.getElementById('svg-portfolio-svg');

const setAttr = () => {
  svgCotillionNav.setAttribute(
    'd',
    `M ${
      (ioFrom.getBoundingClientRect().left +
        ioFrom.getBoundingClientRect().right) /
      2
    } ${ioFrom.getBoundingClientRect().bottom} C 400 300, 1200 900 ${
      screenshotCotillion.getBoundingClientRect().x
    } ${screenshotCotillion.getBoundingClientRect().bottom}`
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
  setAttr();
});

const ioFrom = document.getElementById('description-cotillion-io-from');
const playerFrom = document.getElementById('description-cotillion-player-from');
const to = document.getElementById('screenshot-cotillion');
const svgCotillionNav = document.getElementById('svg-cotillion-nav');
const svgCotillionSticky = document.getElementById('svg-cotillion-sticky');

const setAttr = () => {
  svgCotillionNav.setAttribute(
    'd',
    `M ${
      (ioFrom.getBoundingClientRect().left +
        ioFrom.getBoundingClientRect().right) /
      2
    } ${ioFrom.getBoundingClientRect().bottom} C 400 300, 1200 900 ${
      to.getBoundingClientRect().x
    } ${to.getBoundingClientRect().bottom}`
  );

  svgCotillionSticky.setAttribute(
    'd',
    `M ${
      (playerFrom.getBoundingClientRect().left +
        playerFrom.getBoundingClientRect().right) /
      2
    } ${playerFrom.getBoundingClientRect().bottom} C 500 800, 1300 800 ${
      to.getBoundingClientRect().right
    } ${to.getBoundingClientRect().bottom}`
  );
};

setAttr();

document.addEventListener('scroll', () => {
  setAttr();
});

window.addEventListener('resize', () => {
  setAttr();
});

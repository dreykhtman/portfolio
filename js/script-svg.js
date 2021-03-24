const from = document.getElementById('cotillion-from');
const to = document.getElementById('screenshot-cotillion');
const svgCotillionNav = document.getElementById('svg-cotillion-nav');
const svgCotillionSticky = document.getElementById('svg-cotillion-sticky');

const setAttr = () => {
  svgCotillionNav.setAttribute(
    'd',
    `M ${
      (from.getBoundingClientRect().left + from.getBoundingClientRect().right) /
      2
    } ${from.getBoundingClientRect().bottom} C 400 900, 1200 900 ${
      to.getBoundingClientRect().x
    } ${to.getBoundingClientRect().bottom}`
  );
};

setAttr();

document.addEventListener('scroll', () => {
  console.log(to.getBoundingClientRect());

  setAttr();
});

window.addEventListener('resize', () => {
  setAttr();
});

// 1. get
console.log('hello');

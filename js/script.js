console.log('script.js is connected...');

const from = document.getElementById('from');
const to = document.getElementById('to');
const svgFrom = document.getElementById('svg-from');

svgFrom.setAttribute(
  'd',
  `M ${from.getBoundingClientRect().x} ${
    from.getBoundingClientRect().y
  } C 400 700, 800 500 ${to.getBoundingClientRect().x + 80} ${
    to.getBoundingClientRect().bottom - 60
  }`
);

document.addEventListener('scroll', () => {
  svgFrom.setAttribute(
    'd',
    `M ${from.getBoundingClientRect().x} ${
      from.getBoundingClientRect().y
    } C 400 700, 800 500, ${to.getBoundingClientRect().x + 80} ${
      to.getBoundingClientRect().bottom - 60
    }`
  );
});

window.addEventListener('resize', () => {
  svgFrom.setAttribute(
    'd',
    `M ${from.getBoundingClientRect().x} ${
      from.getBoundingClientRect().y
    } C 400 700, 800 500, ${to.getBoundingClientRect().x + 80} ${
      to.getBoundingClientRect().bottom - 60
    }`
  );
});

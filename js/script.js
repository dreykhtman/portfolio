console.log('script.js is connected...');

const from = document.getElementById('from');
const to = document.getElementById('to');
const svgFrom = document.getElementById('svg-from');
const svgTo = document.getElementById('svg-to');

svgFrom.setAttribute(
  'd',
  `M ${from.getBoundingClientRect().x} ${
    from.getBoundingClientRect().y
  } Q 400 700 ${to.getBoundingClientRect().x + 80} ${
    to.getBoundingClientRect().bottom - 60
  }`
);

document.addEventListener('scroll', function () {
  svgFrom.setAttribute(
    'd',
    `M ${from.getBoundingClientRect().x} ${
      from.getBoundingClientRect().y
    } Q 400 700 ${to.getBoundingClientRect().x + 80} ${
      to.getBoundingClientRect().bottom - 60
    }`
  );
});

window.addEventListener('resize', function () {
  svgFrom.setAttribute(
    'd',
    `M ${from.getBoundingClientRect().x} ${
      from.getBoundingClientRect().y
    } Q 400 700 ${to.getBoundingClientRect().x + 80} ${
      to.getBoundingClientRect().bottom - 60
    }`
  );
});

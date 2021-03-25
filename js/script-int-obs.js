'use strict';

const screenshots = document.querySelectorAll('.screenshot');
const descriptions = document.querySelectorAll('.description');
// const arrows = document.querySelectorAll('.arrow');

// arrows.forEach((arrow) => {
//   console.log(arrow.id);
// });

const descriptionList = {};

descriptions.forEach((description) => {
  const arrows = document.querySelectorAll(
    `.arrow-${description.id.substring(12)}`
  );

  descriptionList[description.id] = [description, ...arrows];
});

console.log(descriptionList);

const options = {
  root: null,
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      descriptionList[`description-${entry.target.id.substring(11)}`].forEach(
        (description) => {
          description.classList.add('hidden');
        }
      );
    } else {
      descriptionList[`description-${entry.target.id.substring(11)}`].forEach(
        (description) => {
          description.classList.remove('hidden');
        }
      );
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);

screenshots.forEach((screenshot) => {
  observer.observe(screenshot);
});

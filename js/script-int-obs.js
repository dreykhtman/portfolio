console.log('Intersection Observer script is running...');

const screenshots = document.querySelectorAll('.screenshot');
const descriptions = document.querySelectorAll('.description');

const descriptionList = {};

descriptions.forEach((description) => {
  descriptionList[description.id] = description;
});

console.log(descriptionList);

const options = {
  root: null,
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0,
};

console.log(descriptionList);

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      descriptionList[
        `description-${entry.target.id.substring(11)}`
      ].classList.add('hidden');
      entry.target.classList.add('back-color');
    } else {
      descriptionList[
        `description-${entry.target.id.substring(11)}`
      ].classList.remove('hidden');
      entry.target.classList.remove('back-color');
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);

screenshots.forEach((screenshot) => {
  observer.observe(screenshot);
});

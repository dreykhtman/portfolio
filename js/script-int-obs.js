const screenshotContainers = document.querySelectorAll('.screenshot-container');
const descriptions = document.querySelectorAll('.description');

const descriptionList = {};

// Create the descriptionList object, where the keys are names of the description IDs ("description-cotillion", "description-portfolio", etc), and the values are arrays of elements to which the class "hidden" is removed or added.

// Simplified example:
/*
{
  description-cotillion: [
    div#description-cotillion.description.hidden,
    path#svg-cotillion-nav.arrow.arrow-cotillion.hidden,
    path#svg-cotillion-sticky.arrow.arrow-cotillion.hidden,
  ],
  description-portfolio: [
    div#description-portfolio.description,
    path#svg-portfolio-svg.arrow.arrow-portfolio,
  ]
}
*/

descriptions.forEach((description) => {
  const arrows = document.querySelectorAll(
    // In substring(12), 12 is the length of "description-"
    `.arrow-${description.id.substring(12)}`
  );

  descriptionList[description.id] = [description, ...arrows];
});

const options = {
  root: null,
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // In substring(21), 21 is the length of "screenshot-container-"
      descriptionList[`description-${entry.target.id.substring(21)}`].forEach(
        (description) => {
          description.classList.add('hidden', 'back-color');
        }
      );
    } else {
      descriptionList[`description-${entry.target.id.substring(21)}`].forEach(
        (description) => {
          description.classList.remove('hidden', 'back-color');
        }
      );
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);

screenshotContainers.forEach((container) => {
  observer.observe(container);
});

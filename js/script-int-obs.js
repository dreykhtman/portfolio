// screenshotContainers will be observed by the Intersection Observer
const screenshotContainers = document.querySelectorAll('.screenshot-container');
const descriptions = document.querySelectorAll('.description');

const descriptionList = {};

// Create the descriptionList object, where the keys are names of the description IDs ("description-cotillion", "description-portfolio", etc), and the values are arrays of elements to which the class "visible" is removed or added.

// Simplified example:
/*
{
  description-cotillion: [
    div#description-cotillion.description,
    g#arrows-cotillion.arrows
  ],
  description-portfolio: [
    div#description-portfolio.description,
    g#arrows-portfolio.arrows
  ]
}
*/

descriptions.forEach((description) => {
  const arrows = document.getElementById(
    // In substring(12), 12 is the length of "description-"
    `arrows-${description.id.substring(12)}`
  );

  descriptionList[description.id] = [description, arrows];
});

const options = {
  root: null,
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0,
};

const timeoutIDs = {};

// Each entry is the screenshot container div
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    // In substring(21), 21 is the length of "screenshot-container-"
    if (entry.isIntersecting) {
      // Add class 'active' to the <img> element containing the screenshot
      entry.target.children[0].classList.add('active');
      clearTimeout(timeoutIDs[entry.target.id]);

      descriptionList[`description-${entry.target.id.substring(21)}`].forEach(
        (description) => {
          description.classList.add('visible');
        }
      );
    } else {
      descriptionList[`description-${entry.target.id.substring(21)}`].forEach(
        (description) => {
          description.classList.remove('visible');
        }
      );

      timeoutIDs[entry.target.id] = setTimeout(() => {
        // Remove class 'active' from the <img> element containing the screenshot
        entry.target.children[0].classList.remove('active');
      }, 400);
    }
  });

  // setAttr is in script-svg.js
  // eslint-disable-next-line no-undef
  setAttr();
};

const observer = new IntersectionObserver(observerCallback, options);

screenshotContainers.forEach((container) => {
  observer.observe(container);
});

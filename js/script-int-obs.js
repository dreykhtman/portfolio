/* global getIdentifier */

// screenshotContainers will be observed by the Intersection Observer
const screenshotContainers = document.querySelectorAll('.screenshot-container');
const descriptions = document.querySelectorAll('.description');

// Create the descriptionList object, where the keys are names of the description IDs ("description--cotillion", "description--portfolio", etc.), and the values are arrays of elements where the class "visible" will be removed or added.
const descriptionList = {};

descriptions.forEach((description) => {
  const arrows = document.getElementById(
    `arrows--${getIdentifier(description.id)}`
  );

  descriptionList[description.id] = [description, arrows];
});

const timeoutIDs = {};

// Each entry is the screenshot container div
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add class 'active' to the <img> element containing the screenshot
      entry.target.querySelector('img').classList.add('active');
      clearTimeout(timeoutIDs[entry.target.id]);

      descriptionList[`description--${getIdentifier(entry.target.id)}`].forEach(
        (element) => {
          element.classList.add('visible');
        }
      );
    } else {
      descriptionList[`description--${getIdentifier(entry.target.id)}`].forEach(
        (element) => {
          element.classList.remove('visible');
        }
      );

      timeoutIDs[entry.target.id] = setTimeout(() => {
        // Remove class 'active' from the <img> element containing the screenshot
        entry.target.querySelector('img').classList.remove('active');
      }, 400);
    }
  });

  // drawArrows is in script-svg.js
  // eslint-disable-next-line no-undef
  drawArrows();
};

// Intersection Observer options and initialization
const options = {
  root: null,
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0,
};

const observer = new IntersectionObserver(observerCallback, options);

screenshotContainers.forEach((container) => {
  observer.observe(container);
});

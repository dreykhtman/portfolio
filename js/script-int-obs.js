console.log('Intersection Observer script is running...');

const projects = document.querySelectorAll('.project');

const options = {
  root: null,
  rootMargin: '-50% 0% -50% 0%',
  threshold: 0,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('back-color');
      // console.log(entry.target.alt, 'intersecting');
    } else {
      entry.target.classList.remove('back-color');
    }
  });
};

const observer = new IntersectionObserver(observerCallback, options);

projects.forEach((project) => {
  observer.observe(project);
});

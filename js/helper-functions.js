// Returns "nav" from "svg-cotillion--nav".
// eslint-disable-next-line no-unused-vars
const getIdentifier = (str) => str.split('--').pop();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

document.getElementById('btn-scroll').addEventListener('click', scrollToTop);

const btnEmail = document.getElementById('btn-email');

const showEmail = () => {
  const contact = document.getElementById('contact');
  const html = '<a href="mailto:dreykhtman@gmail.com">dreykhtman@gmail.com</a>';
  contact.insertAdjacentHTML('beforeend', html);
  btnEmail.hidden = true;
};

btnEmail.addEventListener('click', showEmail);

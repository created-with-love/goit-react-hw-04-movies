import './preload.scss';

window.onload = function () {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 3000);
};

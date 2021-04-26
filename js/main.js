const $scoreCount = document.querySelector('.score-count');
const $lifeCount = document.querySelector('.life-count');
const $keyboard = document.querySelector('.keyboard');
const $keys = document.querySelectorAll('.key');

window.addEventListener('keydown', e => {
  const $key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  $key.classList.add('key-hit');
});

const removeTransition = e => {
  if (e.propertyName !== 'transform') return;
  e.srcElement.classList.remove('key-hit');
};
$keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);
});

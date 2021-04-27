const $scoreCount = document.querySelector('.score-count');
const $lifeCount = document.querySelector('.life-count');
const $keyboard = document.querySelector('.keyboard');
const $keys = document.querySelectorAll('.key');

window.addEventListener('keydown', e => {
  const selectedKey = document.querySelector(`.key[data-code="${e.code}"]`);
  const filterKey = [...$keys].filter(key => key === selectedKey);
  if (!filterKey.length) return; // html에 없는 키 눌렀을 때 예외처리
  selectedKey.classList.add('key-hit');
});

const removeTransform = e => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('key-hit');
};

$keys.forEach(key => {
  key.addEventListener('transitionend', removeTransform);
});

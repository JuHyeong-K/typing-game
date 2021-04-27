const $scoreCount = document.querySelector('.score-count');
const $lifeCount = document.querySelector('.life-count');
const $keyboard = document.querySelector('.keyboard');
const $keys = document.querySelectorAll('.key');
let lastKey;
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

// random key
const randomKey = () => {
  const randomIndex = Math.floor(Math.random() * $keys.length); // 0 ~ length-1
  const selectedKey = $keys[randomIndex];
  if (lastKey === selectedKey) {
    // 중복되는 키 무시
    console.log('reduplication!!!!');
    return randomKey();
  }
  lastKey = selectedKey;
  return selectedKey;
};

const randomPeep = () => {
  const selectedKey = randomKey();
  selectedKey.classList.add('key-sign');
  setTimeout(() => {
    selectedKey.classList.remove('key-sign');
    randomPeep();
  }, 1300);
};
randomPeep();

const $scoreCount = document.querySelector('.score-count');
const $lifeCount = document.querySelector('.life-count');
const $keyboard = document.querySelector('.keyboard');
const $keys = document.querySelectorAll('.key');
let lastKey;

const setLifeCount = () => {
  $lifeCount.textContent = 5;
};
const setScoreCount = () => {
  $scoreCount.textContent = 0;
};
const countLife = () => {
  $lifeCount.textContent = +$lifeCount.textContent - 1;
  if ($lifeCount.textContent < 1) {
    console.log($lifeCount.textContent);
    alert('gameover');
    setLifeCount();
    setScoreCount();
  }
};
const countScore = () => {
  $scoreCount.textContent = +$scoreCount.textContent + 1;
};

const removePeep = key => {
  key.classList.remove('key-sign');
};

// start
setLifeCount();
window.addEventListener('keydown', e => {
  const selectedKey = document.querySelector(`.key[data-code="${e.code}"]`);
  if (!selectedKey) return; // html에 없는 키 눌렀을 때 예외처리
  selectedKey.classList.add('key-hit');
  if (selectedKey.classList.contains('key-sign')) {
    console.log('hitPeep!!');
    removePeep(selectedKey);
    countScore();
  }
});

const removeTransform = e => {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('key-hit');
};

// transition이 끝났을 때 transform 삭제
$keyboard.addEventListener('transitionend', removeTransform);

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
    if (selectedKey.classList.contains('key-sign')) {
      selectedKey.classList.remove('key-sign');
      countLife();
    }
    randomPeep();
  }, 1000);
};
randomPeep();

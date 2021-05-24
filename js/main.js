const $scoreCount = document.querySelector('.score-count');
const $lifeCount = document.querySelector('.life-count');
const $keyboard = document.querySelector('.keyboard');
const $keys = document.querySelectorAll('.key');
let lastKey;
const $hands = document.querySelector('.hands');
const $space = document.querySelector('.keyboard-special .key');

const blockKey = key => {
  key.classList.add('block-key');
};
$keyboard.onclick = e => {
  if (e.target.classList.contains('block-key')) {
    e.target.classList.remove('block-key');
    return;
  }
  if (e.target.tagName === 'KBD') blockKey(e.target.parentNode);
  if (!e.target.classList.contains('key')) return;
  blockKey(e.target);
};
const setLifeCount = () => {
  $lifeCount.textContent = 5;
};
const setScoreCount = () => {
  $scoreCount.textContent = 0;
};
const countLife = () => {
  $lifeCount.textContent = +$lifeCount.textContent - 1;
};
const countScore = () => {
  $scoreCount.textContent = +$scoreCount.textContent + 1;
};

const removePeep = key => {
  key.classList.remove('key-sign');
};

// start
window.addEventListener('keydown', e => {
  const selectedKey = document.querySelector(`.key[data-code="${e.code}"]`);
  if (!selectedKey) return; // html에 없는 키 눌렀을 때 예외처리
  if (
    selectedKey.getAttribute('data-code') === 'Slash' ||
    selectedKey.getAttribute('data-code') === 'Quote'
  ) {
    e.preventDefault(); // firefox 브라우저 quick find 키(',/) 예외처리
  }
  if (selectedKey.classList.contains('block-key')) return; // block된 key 무시
  selectedKey.classList.add('key-hit');
  if (selectedKey.classList.contains('key-sign')) {
    console.log('hitPeep!!');
    removePeep(selectedKey);
    countScore();
  }
});

const removeAnimation = e => {
  e.target.classList.remove('key-hit');
};
// animation이 끝났을 때 'key-hit' 삭제
$keyboard.addEventListener('animationend', removeAnimation);

// const removeTransform = e => {
//   // if (e.propertyName !== 'transform') return;
//   e.target.classList.remove('key-hit');
// };

// // transition이 끝났을 때 'key-hit' 삭제
// $keyboard.addEventListener('transitionend', removeTransform);

// random key
const randomKey = () => {
  const randomIndex = Math.floor(Math.random() * $keys.length); // 0 ~ length-1
  const selectedKey = $keys[randomIndex];
  if (lastKey === selectedKey) {
    // 중복되는 키 무시
    console.log('reduplication!!!!');
    return randomKey();
  }
  if (selectedKey.classList.contains('block-key')) {
    return randomKey();
  }
  lastKey = selectedKey;
  return selectedKey;
};

async function gameCountdown() {
  const countElement = document.createElement('div');
  countElement.classList.add('count');
  document.body.appendChild(countElement);
  countElement.textContent = 3;
  await new Promise(resolve => setTimeout(() => resolve(3), 1000));
  countElement.textContent = 2;
  await new Promise(resolve => setTimeout(() => resolve(2), 1000));
  countElement.textContent = 1;
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  document.body.removeChild(countElement);
  randomPeep();
}

const randomPeep = () => {
  const selectedKey = randomKey();
  selectedKey.classList.add('key-sign');
  console.log('start');
  setTimeout(() => {
    if (selectedKey.classList.contains('key-sign')) {
      selectedKey.classList.remove('key-sign');
      countLife();
      console.log('end');
    }
    if ($lifeCount.textContent === '0') {
      console.log('finish');
      if (confirm('try agin?')) {
        gameCountdown();
      } else {
        $space.classList.add('press');
      }
      setLifeCount();
      setScoreCount();
      return;
    }
    randomPeep();
  }, 1000);
};

async function gameCountdown() {
  const countElement = document.createElement('div');
  countElement.classList.add('count');
  document.body.appendChild(countElement);
  countElement.textContent = 3;
  await new Promise(resolve => setTimeout(() => resolve(3), 1000));
  countElement.textContent = 2;
  await new Promise(resolve => setTimeout(() => resolve(2), 1000));
  countElement.textContent = 1;
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  document.body.removeChild(countElement);
  randomPeep();
}

window.addEventListener('keydown', e => {
  const selectedKey = document.querySelector(`.key[data-code="${e.code}"]`);
  if (selectedKey !== $space) return;
  if (selectedKey.classList.contains('press')) {
    selectedKey.classList.remove('press');
    gameCountdown();
  }
});

// getReady();
// randomPeep();

// const StartGame = setInterval(() => {
//   const selectedKey = randomKey();
//   selectedKey.classList.add('key-sign');
//   console.log('start');
//   setTimeout(() => {
//     if (selectedKey.classList.contains('key-sign')) {
//       selectedKey.classList.remove('key-sign');
//       countLife();
//       console.log('end');
//     }
//     if ($lifeCount.textContent === '0') {
//       alert('aaaaa');
//     }
//     if ($lifeCount.textContent === '1') {
//       clearInterval(StartGame);
//       console.log('finish');
//     }
//   }, 1000);
// }, 1000);

// StartGame();

$hands.addEventListener('change', e => {
  const targetFingers = document.querySelectorAll(`.${e.target.id}`);
  targetFingers.forEach(targetFinger =>
    targetFinger.classList.toggle('block-key')
  );
});

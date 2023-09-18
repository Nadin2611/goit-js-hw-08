import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

// const iframe = document.querySelector('#vimeo-player');
// const player = new VimeoPlayer(iframe);

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

// //Записує час в локальне сховище
// const onPlay = function (data) {
//   const currentTime = data.seconds;
//   localStorage.setItem('videoplayer-current-time', currentTime);
// };

// //Додає обробник подій на timeupdate з врахуванням обмежень
// player.on('timeupdate', throttle(onPlay, 1000));
// console.log(currentTime);

// //Отримує збережений час
// const savedTime = localStorage.getItem('videoplayer-current-time');

// if (savedTime) {
//   player
//     .setCurrentTime(parseFloat(savedTime))
//     .then(function (seconds) {})
//     .catch(function (error) {
//       switch (error.name) {
//         case 'RangeError':
//           break;
//         default:
//           break;
//       }
//     });
// }

// Функція для збереження часу в локальне сховище
const saveCurrentTime = currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
};

// Функція для відновлення часу відтворення з локального сховища
const restoreCurrentTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    return parseFloat(savedTime);
  }
  return 0; // За замовчуванням, якщо час не було збережено раніше
};

document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.querySelector('#vimeo-player');
  const player = new VimeoPlayer(iframe);

  // Отримання часу відтворення відео з локального сховища
  const initialTime = restoreCurrentTime();

  // Ініціалізація плеєра зі збереженим часом відтворення
  player.setCurrentTime(initialTime).catch(error => {
    switch (error.name) {
      case 'RangeError':
        console.error('Invalid initial time:', initialTime);
        break;
      default:
        console.error('Error setting initial time:', error);
        break;
    }
  });

  // Встановлення обробника події для оновлення часу в локальному сховищі
  player.on(
    'timeupdate',
    throttle(data => {
      const currentTime = data.seconds;
      saveCurrentTime(currentTime);
    }, 1000)
  );
});

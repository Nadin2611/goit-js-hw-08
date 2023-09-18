import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new VimeoPlayer(iframe);

const saveTimeToLocalStorage = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  saveTimeToLocalStorage(currentTime);
});

document.addEventListener('DOMContentLoaded', function () {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    player
      .setCurrentTime(storedTime)
      .then(function (seconds) {
        console.log(`Відтворення відео відновлено через ${seconds} секунд.`);
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            console.error('Час не в межах діапазону.');
            break;
          default:
            console.error('Під час пошуку сталася помилка.');
            break;
        }
      });
  }
});

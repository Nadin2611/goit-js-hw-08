import VimeoPlayer from '@vimeo/player';

const iframe = document.querySelector('#vimeo-player'); // посилання
const player = new VimeoPlayer(iframe); // створює об'єкт плеєра Vimeo

// Додає обробник подій на play
player.on('play', function () {
  console.log('played the video!');
});

//Отримує назву відео
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

//Записує час в локальне сховище
const onPlay = function (data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
};

//Додає обробник подій на timeupdate з врахуванням обмежень
player.on('timeupdate', throttle(onPlay, 1000));
console.log(currentTime);

//Отримує збережений час
const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime) {
  player
    .setCurrentTime(parseFloat(savedTime))
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
}

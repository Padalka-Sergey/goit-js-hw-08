import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
// const iframe = document.querySelector('iframe');

const TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(TIME_KEY, JSON.stringify(data));
  }, 1000)
);

const time = localStorage.getItem(TIME_KEY);
const timeSec = JSON.parse(time);
// console.log(time);
// console.log(timeSec.seconds);

player
  .setCurrentTime(timeSec.seconds)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
    console.log(seconds);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

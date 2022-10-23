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

player.on('timeupdate', throttle(followEvent, 1000));

function followEvent(data) {
  localStorage.setItem(TIME_KEY, JSON.stringify(data));
}

const time = localStorage.getItem(TIME_KEY);
const timeSec = JSON.parse(time);

// function startCurrentTime() {
//   player.setCurrentTime(timeSec.seconds);
// }
// startCurrentTime();

const currentTime = player.setCurrentTime(timeSec.seconds);

currentTime
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

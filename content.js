chrome.runtime.onMessage.addListener((message) => {
    if (message.speed) {
      const video = document.querySelector('video');
      if (video) {
        video.playbackRate = message.speed;
        console.log(`Playback speed set to ${message.speed}`);
      } else {
        console.error('No video element found!');
      }
    }
  });
  
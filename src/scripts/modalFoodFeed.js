function pauseVideo() {
    const video = document.getElementById('videoFoodFeed');
    
    if (video) {
        video.pause();
        video.currentTime = 0;
        video.load();
    }
}

const modal = document.getElementById('foodFeedModal');
// También detecta clic fuera del contenido del modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
      pauseVideo();
    }
  });
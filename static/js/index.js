// Mobile navbar burger menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const burgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  burgers.forEach(function (el) {
    el.addEventListener('click', function () {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  // Initialize Bulma carousels if available
  if (typeof bulmaCarousel !== 'undefined') {
    var options = {
      slidesToScroll: 1,
      slidesToShow: 1,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    };
    var carousels = bulmaCarousel.attach('.carousel', options);
  }

  // Video tab switching with synchronized playback
  function playVideos(panel, reset) {
    var videos = Array.from(panel.querySelectorAll('video'));
    if (reset) {
      videos.forEach(function(v) { v.currentTime = 0; });
    }
    videos.forEach(function(v) {
      var p = v.play();
      if (p !== undefined) p.catch(function() {});
    });
  }

  function pauseVideos(panel) {
    panel.querySelectorAll('video').forEach(function(v) { v.pause(); });
  }

  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = btn.dataset.group;
      const target = btn.dataset.target;

      // Deactivate all tabs in group, pause their videos
      document.querySelectorAll('.tab-btn[data-group="' + group + '"]').forEach(function (b) {
        b.parentElement.classList.remove('is-active');
        b.classList.remove('is-active');
      });
      document.querySelectorAll('.tab-panel[data-group="' + group + '"]').forEach(function (p) {
        pauseVideos(p);
        p.classList.add('is-hidden');
      });

      // Activate selected tab, reset all videos to t=0 and play together
      btn.parentElement.classList.add('is-active');
      btn.classList.add('is-active');
      const panel = document.getElementById(target);
      if (panel) {
        panel.classList.remove('is-hidden');
        playVideos(panel, true);
      }
    });
  });

  // On initial load: reset to t=0 so autoplay stagger doesn't cause desync
  document.querySelectorAll('.tab-panel:not(.is-hidden)').forEach(function(p) {
    playVideos(p, true);
  });
});

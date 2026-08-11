(function () {
  function init() {
    var images = Array.prototype.slice.call(document.querySelectorAll('.case-hero-image img, .gallery-item img, .case-thumb img, [data-lightbox]'));
    if (!images.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" type="button" aria-label="Previous">&larr;</button>' +
      '<button class="lb-next" type="button" aria-label="Next">&rarr;</button>' +
      '<figure class="lb-stage"><img alt="" draggable="false"></figure>' +
      '<div class="lb-count"></div>';
    document.body.appendChild(overlay);

    var stageImg = overlay.querySelector('.lb-stage img');
    var countEl = overlay.querySelector('.lb-count');
    var current = 0;
    var startX = 0;
    var startY = 0;

    function render(i) {
      current = (i + images.length) % images.length;
      stageImg.src = images[current].getAttribute('src');
      stageImg.alt = images[current].getAttribute('alt') || '';
      countEl.textContent = (current + 1) + ' / ' + images.length;
    }

    function open(i) {
      render(i);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function next() { render(current + 1); }
    function prev() { render(current - 1); }

    images.forEach(function (img, i) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function (e) {
        e.preventDefault();
        open(i);
      });
    });

    overlay.querySelector('.lb-close').addEventListener('click', close);
    overlay.querySelector('.lb-next').addEventListener('click', next);
    overlay.querySelector('.lb-prev').addEventListener('click', prev);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
    overlay.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    overlay.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next(); else prev();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
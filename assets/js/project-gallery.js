document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slideSources = (gallery.dataset.slides || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const webpSources = (gallery.dataset.webp || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const altPrefix = gallery.dataset.altPrefix || 'Project';
    const viewport = gallery.querySelector('.gallery-viewport');
    const indexLabel = gallery.querySelector('[data-gallery-index]');
    const totalLabel = gallery.querySelector('[data-gallery-total]');
    const prevButton = gallery.querySelector('[data-gallery-prev]');
    const nextButton = gallery.querySelector('[data-gallery-next]');

    if (!viewport || slideSources.length === 0) {
      return;
    }

    viewport.innerHTML = '';

    const slides = slideSources.map((source, index) => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-slide';

      const picture = document.createElement('picture');
      const webpSource = webpSources[index];

      if (webpSource) {
        const sourceElement = document.createElement('source');
        sourceElement.type = 'image/webp';
        sourceElement.srcset = webpSource;
        picture.appendChild(sourceElement);
      }

      const image = document.createElement('img');
      image.src = source;
      image.alt = `${altPrefix} screenshot ${index + 1}`;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      picture.appendChild(image);
      figure.appendChild(picture);
      viewport.appendChild(figure);
      return figure;
    });

    let currentIndex = 0;

    const showSlide = (nextIndex) => {
      currentIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === currentIndex);
      });

      if (indexLabel) {
        indexLabel.textContent = String(currentIndex + 1);
      }

      if (totalLabel) {
        totalLabel.textContent = String(slides.length);
      }
    };

    if (prevButton) {
      prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
    }

    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        showSlide(currentIndex - 1);
      }
      if (event.key === 'ArrowRight') {
        showSlide(currentIndex + 1);
      }
    });

    showSlide(0);
    gallery.tabIndex = 0;
  });
});

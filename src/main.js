import './styles/index.scss';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video-player');
  const activateSound = document.getElementById('activate-sound');
  const progressBar = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const btnMuteToggle = document.getElementById('btn-mute-toggle');
  const hiddenOffers = document.querySelectorAll('.hidden-offer');
  const header = document.querySelector('header');
  const counters = document.querySelectorAll('.countdown');
  const orderButtons = document.querySelectorAll('.order-btn');
  const orderModal = document.getElementById('orderModal');
  const form = document.querySelector('form');

  let totalSeconds = 20 * 60;
  let countdownInterval = null;

  const updateCounter = () => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    counters.forEach(el => (el.textContent = `${minutes}:${seconds}`));
    if (totalSeconds > 0) totalSeconds--;
  };

  const startCountdown = () => {
    if (!countdownInterval) {
      updateCounter();
      countdownInterval = setInterval(updateCounter, 1000);
    }
  };

  const adjustHeaderLayout = () => {
    if (!header) return;

    const isVisible = Array.from(hiddenOffers).some(
      el => !el.classList.contains('hidden-offer')
    );

    if (isVisible) {
      header.classList.remove('justify-content-center');
      header.classList.add('justify-content-between');
    } else {
      header.classList.remove('justify-content-between');
      header.classList.add('justify-content-center');
    }
  };

  adjustHeaderLayout();

  hiddenOffers.forEach(el => {
    const observer = new MutationObserver(adjustHeaderLayout);
    observer.observe(el, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });

  if (video && activateSound) {
    activateSound.addEventListener('click', () => {
      video.muted = false;
      btnMuteToggle.textContent = video.muted ? '🔇' : '🔊';
      video.play();
      activateSound.style.display = 'none';
    });

    video.addEventListener('timeupdate', () => {
      const percentage = (video.currentTime / video.duration) * 100;
      if (progressBar) {
        progressBar.style.width = `${percentage}%`;
      }

      if (video.currentTime >= 1214) {
        hiddenOffers.forEach(el => {
          if (el.classList.contains('hidden-offer')) {
            el.classList.remove('hidden-offer');
          }
        });
        adjustHeaderLayout();
        startCountdown();
      }
    });

    if (progressContainer) {
      progressContainer.addEventListener('click', e => {
        const clickX = e.offsetX;
        const width = progressContainer.offsetWidth;
        const duration = video.duration;
        video.currentTime = (clickX / width) * duration;
      });
    }

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          btnPlayPause.textContent = '⏸️';
        } else {
          video.pause();
          btnPlayPause.textContent = '▶️';
        }
      });
    }

    if (btnMuteToggle) {
      btnMuteToggle.addEventListener('click', () => {
        video.muted = !video.muted;
        btnMuteToggle.textContent = video.muted ? '🔇' : '🔊';
      });
    }

    video.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        if (btnPlayPause) btnPlayPause.textContent = '⏸️';
      } else {
        video.pause();
        if (btnPlayPause) btnPlayPause.textContent = '▶️';
      }
    });
  }

  orderButtons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.getAttribute('data-product');
      const price = button.getAttribute('data-price');
      const discount = button.getAttribute('data-discount');

      document.getElementById('modal-product').value = product;
      document.getElementById('modal-price').value = price;
      document.getElementById('modal-discount').value = discount;
    });
  });

  if (orderModal) {
    orderModal.addEventListener('hidden.bs.modal', () => {
      document.getElementById('modal-product').removeAttribute('value');
      document.getElementById('modal-price').removeAttribute('value');
      document.getElementById('modal-discount').removeAttribute('value');
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const product = document.getElementById('modal-product').value;
    const price = document.getElementById('modal-price').value;
    const discount = document.getElementById('modal-discount').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const orderData = { name, email, product, price, discount };

    localStorage.setItem('orderData', JSON.stringify(orderData));

    window.location.href = 'thankyou.html';
  });
});

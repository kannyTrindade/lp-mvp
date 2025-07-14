import './styles/index.scss';
import 'bootstrap';

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  if (header) {
    header.classList.remove('justify-content-between');
    header.classList.add('justify-content-center');
  }

  const savedOrder = localStorage.getItem('orderData');
  if (!savedOrder) return;

  const orderData = JSON.parse(savedOrder);
  const productSpan = document.querySelector('.product');
  const priceSpan = document.querySelector('.price-total');
  const discountSpan = document.querySelector('.discount');
  const clientNameSpan = document.querySelector('.client-name');
  const clientEmailSpan = document.querySelector('.client-email');
  const productQuantitySpan = document.querySelector('.product-quantity');
  const productImg = document.querySelector('.product-img');
  const bonusSection = document.querySelector('.bonus');

  if (productSpan) productSpan.textContent = orderData.product || '';
  if (priceSpan) priceSpan.textContent = `$${orderData.price || ''}`;
  if (discountSpan) discountSpan.textContent = orderData.discount || '';
  if (clientNameSpan)
    clientNameSpan.textContent = orderData.name || 'Valued Customer';
  if (clientEmailSpan)
    clientEmailSpan.textContent = orderData.email || 'your email';

  let bottleCount = 0;
  if (orderData.product) {
    const match = orderData.product.match(/^(\d+)/);
    if (match) bottleCount = parseInt(match[1]);
    if (productQuantitySpan) productQuantitySpan.textContent = match[1];
  }

  if (productImg && bottleCount) {
    productImg.src = `/img-${bottleCount}-bottles.webp`;
    productImg.alt = `${bottleCount} Bottles Pack`;
  }
  if (bonusSection) {
    bonusSection.innerHTML = '';
    const bonusText = document.createElement('p');
    const bonusImg = document.createElement('img');

    bonusImg.style.maxWidth = '350px';
    bonusImg.style.width = '100%';

    bonusSection.appendChild(bonusText);
    bonusSection.appendChild(bonusImg);

    switch (bottleCount) {
      case 2:
        bonusText.innerHTML = `For your purchase of <strong>2 bottles</strong>, you’ll receive the ebook <strong>“Lean & Clean: 7-Day Detox”</strong>, ENJOY!`;
        bonusImg.src = '/bonus3.webp';
        bonusImg.alt = 'Bonus for 2 Bottles';
        break;
      case 3:
        bonusText.innerHTML = `For your purchase of <strong>3 bottles</strong>, you’ll receive the ebook <strong>“21-Day Fat Burn Challenge”</strong>, ENJOY!`;
        bonusImg.src = '/bonus2.webp';
        bonusImg.alt = 'Bonus for 3 Bottles';
        break;
      case 6:
        bonusText.innerHTML = `For your purchase of <strong>6 bottles</strong>, you’ll receive the ebook <strong>“Ultimate Weight Loss Blueprint”</strong>, ENJOY!`;
        bonusImg.src = '/bonus1.webp';
        bonusImg.alt = 'Bonus for 6 Bottles';
        break;
      default:
        bonusText.innerHTML = `Enjoy your bonus gift!`;
        bonusImg.src = 'https://via.placeholder.com/300';
        bonusImg.alt = 'Generic Bonus';
    }
  }
});

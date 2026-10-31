/**
 * AT YOUR DOOR PAINTING
 * Simple, Fun & Clean Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initPaintSplatterEngine();
  initRoomColorizer();
  initEstimateCalculator();
  initBookingModal();
});

/* --------------------------------------------------------------------------
   1. Interactive Click Splatter (Easter Egg)
   -------------------------------------------------------------------------- */
const paintColors = ['#FF533D', '#FFB800', '#00C6FF', '#7928CA', '#10B981', '#FF0080'];

function initPaintSplatterEngine() {
  document.addEventListener('click', (e) => {
    // Avoid triggering when clicking form elements or buttons
    if (e.target.closest('input, textarea, select, button, a')) return;

    createSplatter(e.clientX, e.clientY);
  });
}

function createSplatter(x, y) {
  const color = paintColors[Math.floor(Math.random() * paintColors.length)];
  const size = Math.floor(Math.random() * 35) + 30; // 30px to 65px
  const rotation = Math.floor(Math.random() * 360);

  const splat = document.createElement('div');
  splat.className = 'paint-splat-cursor';
  splat.style.left = `${x}px`;
  splat.style.top = `${y}px`;
  splat.style.width = `${size}px`;
  splat.style.height = `${size}px`;

  splat.innerHTML = `
    <svg viewBox="0 0 100 100" fill="${color}" style="transform: rotate(${rotation}deg); width: 100%; height: 100%;">
      <path d="M50 20 C60 10 75 18 70 35 C85 30 95 45 85 60 C92 75 75 90 60 85 C45 95 30 90 25 75 C10 80 5 60 15 45 C5 35 15 15 35 25 C42 15 48 15 50 20 Z" />
      <circle cx="85" cy="18" r="4" />
      <circle cx="15" cy="85" r="5" />
      <circle cx="92" cy="72" r="3.5" />
    </svg>
  `;

  document.body.appendChild(splat);
  setTimeout(() => splat.remove(), 700);
}

/* --------------------------------------------------------------------------
   2. Interactive Room Colorizer
   -------------------------------------------------------------------------- */
const swatchNames = {
  '#FF533D': 'Sunset Coral',
  '#00C6FF': 'Ocean Blue',
  '#10B981': 'Sage Green',
  '#FFB800': 'Sunshine Gold',
  '#7928CA': 'Lavender Chic',
  '#1E293B': 'Modern Slate'
};

function initRoomColorizer() {
  const wallLayer = document.getElementById('room-wall-element');
  const overlaySweep = document.getElementById('roller-sweep-overlay');
  const swatchButtons = document.querySelectorAll('.color-swatch-btn');
  const customColorInput = document.getElementById('custom-color-picker');
  const paintNameEl = document.getElementById('display-paint-name');
  const paintPillEl = document.getElementById('display-color-pill');

  function applyColor(hex, name) {
    if (!wallLayer) return;

    // Trigger roller sweep animation
    if (overlaySweep) {
      overlaySweep.style.backgroundColor = hex;
      overlaySweep.classList.remove('active');
      void overlaySweep.offsetWidth; // reflow
      overlaySweep.classList.add('active');
    }

    wallLayer.style.backgroundColor = hex;

    if (paintNameEl) paintNameEl.textContent = name || 'Custom Color';
    if (paintPillEl) paintPillEl.style.backgroundColor = hex;
  }

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const hex = btn.getAttribute('data-color');
      applyColor(hex, swatchNames[hex] || 'Custom Shade');
    });
  });

  if (customColorInput) {
    customColorInput.addEventListener('input', (e) => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      applyColor(e.target.value, 'Custom Tint');
    });
  }
}

/* --------------------------------------------------------------------------
   3. Simple Price Estimator
   -------------------------------------------------------------------------- */
function initEstimateCalculator() {
  const slider = document.getElementById('calc-sqft-slider');
  const display = document.getElementById('calc-sqft-display');
  const priceMin = document.getElementById('calc-price-min');
  const priceMax = document.getElementById('calc-price-max');
  const daysEl = document.getElementById('calc-days');
  const paintersEl = document.getElementById('calc-painters');

  if (!slider) return;

  function calculate() {
    const sqft = parseInt(slider.value, 10);
    if (display) display.textContent = sqft.toLocaleString();

    const min = Math.round(sqft * 1.90);
    const max = Math.round(sqft * 2.30);

    let days = '⚡ 1 Day Job';
    let crew = '👥 2 Master Painters';

    if (sqft > 1000 && sqft <= 1800) {
      days = '⚡ 2 Days Job';
      crew = '👥 3 Master Painters';
    } else if (sqft > 1800) {
      days = '⚡ 3-4 Days Job';
      crew = '👥 4 Master Painters';
    }

    if (priceMin) priceMin.textContent = `$${min.toLocaleString()}`;
    if (priceMax) priceMax.textContent = `$${max.toLocaleString()}`;
    if (daysEl) daysEl.textContent = days;
    if (paintersEl) paintersEl.textContent = crew;
  }

  slider.addEventListener('input', calculate);
  calculate();
}

/* --------------------------------------------------------------------------
   4. Booking Modal with Confetti
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const openBtns = document.querySelectorAll('.open-booking-modal-btn');
  const form = document.getElementById('doorstep-quote-form');
  const success = document.getElementById('booking-success');

  function open() {
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  function close() {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  openBtns.forEach(btn => btn.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF533D', '#FFB800', '#00C6FF', '#7928CA', '#10B981']
        });
      }

      if (success) {
        success.classList.remove('hidden');
        form.classList.add('hidden');
      }

      setTimeout(() => {
        close();
        if (success) success.classList.add('hidden');
        form.reset();
        form.classList.remove('hidden');
      }, 3000);
    });
  }
}

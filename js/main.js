/**
 * AT YOUR DOOR PAINTING & HOME RENOVATION
 * Interactive Animation & Logic Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initPaintSplatterEngine();
  initRoomColorizer();
  initBeforeAfterSlider();
  initEstimateCalculator();
  initFaqAccordion();
  initMobileMenu();
  initBookingModal();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Interactive Click-to-Splatter Engine (Fun Painting Element)
   -------------------------------------------------------------------------- */
let splatterModeActive = true;
const paintColors = [
  '#FF533D', // Coral Red
  '#FFB800', // Sunny Yellow
  '#00C6FF', // Sky Blue
  '#0072FF', // Royal Blue
  '#7928CA', // Purple
  '#10B981', // Emerald Green
  '#FF0080', // Hot Pink
  '#F97316'  // Bright Orange
];

function initPaintSplatterEngine() {
  const toggleBtn = document.getElementById('toggle-splat-mode');
  
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      splatterModeActive = !splatterModeActive;
      toggleBtn.classList.toggle('bg-amber-100', splatterModeActive);
      toggleBtn.classList.toggle('text-amber-800', splatterModeActive);
      toggleBtn.innerHTML = splatterModeActive 
        ? `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-2"></span> Splatter FX: ON`
        : `<span class="inline-block w-2.5 h-2.5 rounded-full bg-slate-400 mr-2"></span> Splatter FX: OFF`;
    });
  }

  // Splatter trigger on click (ignores interactive inputs/buttons to avoid accidental disruption)
  document.addEventListener('click', (e) => {
    if (!splatterModeActive) return;
    
    // Don't trigger when clicking directly inside input, select, textarea, or buttons unless specifically hero/splat zone
    const target = e.target;
    if (target.closest('input, textarea, select, .comparison-handle, .color-swatch-btn')) return;

    createSplatter(e.clientX, e.clientY);
  });
}

function createSplatter(x, y) {
  const color = paintColors[Math.floor(Math.random() * paintColors.length)];
  const size = Math.floor(Math.random() * 45) + 35; // 35px to 80px
  const rotation = Math.floor(Math.random() * 360);

  const splat = document.createElement('div');
  splat.className = 'paint-splat-cursor';
  splat.style.left = `${x}px`;
  splat.style.top = `${y}px`;
  splat.style.width = `${size}px`;
  splat.style.height = `${size}px`;

  // Playful multi-blob splatter SVG
  splat.innerHTML = `
    <svg viewBox="0 0 100 100" fill="${color}" style="transform: rotate(${rotation}deg); width: 100%; height: 100%; filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2));">
      <path d="M50 20 C60 10 75 18 70 35 C85 30 95 45 85 60 C92 75 75 90 60 85 C45 95 30 90 25 75 C10 80 5 60 15 45 C5 35 15 15 35 25 C42 15 48 15 50 20 Z" />
      <circle cx="85" cy="18" r="4" />
      <circle cx="15" cy="85" r="5" />
      <circle cx="92" cy="72" r="3.5" />
      <circle cx="12" cy="22" r="3" />
      <circle cx="35" cy="94" r="3.5" />
    </svg>
  `;

  document.body.appendChild(splat);

  setTimeout(() => {
    splat.remove();
  }, 750);
}

/* --------------------------------------------------------------------------
   2. Interactive Room Colorizer
   -------------------------------------------------------------------------- */
const roomPalettes = {
  '#FF533D': { name: 'Sunset Coral Pop', hex: '#FF533D', mood: 'Vibrant, welcoming & energetic', finish: 'Velvet Satin' },
  '#00C6FF': { name: 'Pacific Coast Lagoon', hex: '#00C6FF', mood: 'Airy, peaceful & expansive', finish: 'Soft Eggshell' },
  '#10B981': { name: 'Botanical Sage Garden', hex: '#10B981', mood: 'Organic, restorative & calming', finish: 'Matte Luxe' },
  '#FFB800': { name: 'Golden Honey Mimosa', hex: '#FFB800', mood: 'Sunny, cheerful & creative', finish: 'Satin Pearl' },
  '#7928CA': { name: 'Royalty Orchid Purple', hex: '#7928CA', mood: 'Sophisticated & boutique chic', finish: 'High Sheen Gloss' },
  '#E2E8F0': { name: 'Scandinavian Cloud Mist', hex: '#E2E8F0', mood: 'Bright, minimalist & timeless', finish: 'Chalk Matte' },
  '#1E293B': { name: 'Midnight Charcoal Shadow', hex: '#1E293B', mood: 'Dramatic, bold & ultra-modern', finish: 'Deep Velvet' },
  '#D97706': { name: 'Tuscan Terracotta Warmth', hex: '#D97706', mood: 'Rustic warmth & earthy luxury', finish: 'Eggshell Finish' }
};

function initRoomColorizer() {
  const wallLayer = document.getElementById('room-wall-element');
  const overlaySweep = document.getElementById('roller-sweep-overlay');
  const swatchButtons = document.querySelectorAll('.color-swatch-btn');
  const customColorInput = document.getElementById('custom-color-picker');
  
  const paintNameEl = document.getElementById('display-paint-name');
  const paintHexEl = document.getElementById('display-paint-hex');
  const paintMoodEl = document.getElementById('display-paint-mood');
  const paintFinishEl = document.getElementById('display-paint-finish');
  const paintSamplePill = document.getElementById('display-color-pill');

  function applyColor(colorHex, colorData) {
    if (!wallLayer) return;

    // Trigger roller sweep effect
    if (overlaySweep) {
      overlaySweep.style.backgroundColor = colorHex;
      overlaySweep.classList.remove('active');
      void overlaySweep.offsetWidth; // trigger reflow
      overlaySweep.classList.add('active');
    }

    // Set wall color
    wallLayer.style.backgroundColor = colorHex;

    // Update textual information
    const data = colorData || {
      name: 'Custom Tailored Shade',
      hex: colorHex.toUpperCase(),
      mood: 'Personalized bespoke interior choice',
      finish: 'Custom Sheen'
    };

    if (paintNameEl) paintNameEl.textContent = data.name;
    if (paintHexEl) paintHexEl.textContent = data.hex;
    if (paintMoodEl) paintMoodEl.textContent = data.mood;
    if (paintFinishEl) paintFinishEl.textContent = data.finish;
    if (paintSamplePill) paintSamplePill.style.backgroundColor = colorHex;
  }

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const hex = btn.getAttribute('data-color');
      const data = roomPalettes[hex];
      applyColor(hex, data);
    });
  });

  if (customColorInput) {
    customColorInput.addEventListener('input', (e) => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      const hex = e.target.value;
      applyColor(hex, {
        name: 'Custom Swatch Match',
        hex: hex.toUpperCase(),
        mood: 'Custom client mixed formulation',
        finish: 'Master Select'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Before & After Comparison Slider
   -------------------------------------------------------------------------- */
function initBeforeAfterSlider() {
  const container = document.getElementById('comparison-container');
  const beforeLayer = document.getElementById('comparison-before');
  const handle = document.getElementById('comparison-handle');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  handle.addEventListener('mousedown', () => { isDragging = true; });
  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Events
  handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  }, { passive: true });

  // Direct click on container
  container.addEventListener('click', (e) => {
    updateSliderPosition(e.clientX);
  });
}

/* --------------------------------------------------------------------------
   4. Instant Doorstep Painting Cost Estimator
   -------------------------------------------------------------------------- */
function initEstimateCalculator() {
  const sqftSlider = document.getElementById('calc-sqft-slider');
  const sqftValueDisplay = document.getElementById('calc-sqft-display');
  const projectTypeSelect = document.getElementById('calc-project-type');
  const prepLevelSelect = document.getElementById('calc-prep-level');
  
  // Addon Checkboxes
  const addonDrywall = document.getElementById('addon-drywall');
  const addonTrim = document.getElementById('addon-trim');
  const addonZeroVoc = document.getElementById('addon-zerovoc');

  // Outputs
  const outputPriceMin = document.getElementById('calc-price-min');
  const outputPriceMax = document.getElementById('calc-price-max');
  const outputGallons = document.getElementById('calc-gallons');
  const outputDays = document.getElementById('calc-days');
  const outputPainters = document.getElementById('calc-painters');
  const bucketFill = document.getElementById('calc-bucket-fill');

  function calculate() {
    if (!sqftSlider) return;

    const sqft = parseInt(sqftSlider.value, 10);
    if (sqftValueDisplay) sqftValueDisplay.textContent = sqft.toLocaleString();

    // Base rates per sqft
    let baseRate = 2.10;
    const projectType = projectTypeSelect ? projectTypeSelect.value : 'interior-standard';
    
    switch (projectType) {
      case 'single-room':
        baseRate = 1.90;
        break;
      case 'interior-standard':
        baseRate = 2.25;
        break;
      case 'exterior-siding':
        baseRate = 2.60;
        break;
      case 'cabinets':
        baseRate = 2.95;
        break;
      case 'full-reno':
        baseRate = 3.20;
        break;
    }

    // Prep multipliers
    let prepMultiplier = 1.0;
    const prep = prepLevelSelect ? prepLevelSelect.value : 'standard';
    if (prep === 'smooth-flawless') prepMultiplier = 1.15;
    if (prep === 'heavy-repair') prepMultiplier = 1.30;

    // Addons
    let addonMultiplier = 1.0;
    if (addonDrywall && addonDrywall.checked) addonMultiplier += 0.12;
    if (addonTrim && addonTrim.checked) addonMultiplier += 0.10;
    if (addonZeroVoc && addonZeroVoc.checked) addonMultiplier += 0.08;

    const computedBase = sqft * baseRate * prepMultiplier * addonMultiplier;
    const minPrice = Math.round(computedBase * 0.92);
    const maxPrice = Math.round(computedBase * 1.08);

    // Gallons rule of thumb: ~350 sqft per gallon with 2 coats
    const gallonsNeeded = Math.max(1, Math.ceil((sqft * 2) / 350));

    // Turnaround time
    let daysEst = '1 Day';
    let crewSize = '2 Pros';
    if (sqft > 1200 && sqft <= 2200) {
      daysEst = '2 Days';
      crewSize = '3 Pros';
    } else if (sqft > 2200) {
      daysEst = '3-4 Days';
      crewSize = '4 Pros';
    }

    if (outputPriceMin) outputPriceMin.textContent = `$${minPrice.toLocaleString()}`;
    if (outputPriceMax) outputPriceMax.textContent = `$${maxPrice.toLocaleString()}`;
    if (outputGallons) outputGallons.textContent = `${gallonsNeeded} Gal`;
    if (outputDays) outputDays.textContent = daysEst;
    if (outputPainters) outputPainters.textContent = crewSize;

    // Fill meter: percentage of max 3500 sqft
    if (bucketFill) {
      const percentage = Math.min(100, Math.max(15, (sqft / 3500) * 100));
      bucketFill.style.height = `${percentage}%`;
    }
  }

  if (sqftSlider) sqftSlider.addEventListener('input', calculate);
  if (projectTypeSelect) projectTypeSelect.addEventListener('change', calculate);
  if (prepLevelSelect) prepLevelSelect.addEventListener('change', calculate);
  if (addonDrywall) addonDrywall.addEventListener('change', calculate);
  if (addonTrim) addonTrim.addEventListener('change', calculate);
  if (addonZeroVoc) addonZeroVoc.addEventListener('change', calculate);

  calculate();
}

/* --------------------------------------------------------------------------
   5. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');

      // Close all others
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/* --------------------------------------------------------------------------
   7. Booking Modal & Confetti Celebration
   -------------------------------------------------------------------------- */
function initBookingModal() {
  const bookingModal = document.getElementById('booking-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const openModalBtns = document.querySelectorAll('.open-booking-modal-btn');
  const quoteForm = document.getElementById('doorstep-quote-form');
  const successMessage = document.getElementById('booking-success');

  function openModal() {
    if (bookingModal) {
      bookingModal.classList.remove('hidden');
      bookingModal.classList.add('flex');
    }
  }

  function closeModal() {
    if (bookingModal) {
      bookingModal.classList.add('hidden');
      bookingModal.classList.remove('flex');
    }
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Fire Confetti explosion!
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF533D', '#FFB800', '#00C6FF', '#7928CA', '#10B981']
        });
      }

      // Show success state
      if (successMessage) {
        successMessage.classList.remove('hidden');
        quoteForm.classList.add('hidden');
      }

      setTimeout(() => {
        closeModal();
        if (successMessage) successMessage.classList.add('hidden');
        if (quoteForm) {
          quoteForm.reset();
          quoteForm.classList.remove('hidden');
        }
      }, 3500);
    });
  }
}

/* --------------------------------------------------------------------------
   8. Scroll Animations & Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
    observer.observe(el);
  });
}

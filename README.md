# At Your Door Painting & Home Renovation 🎨🏡

A vibrant, animation-packed, one-page mockup website for **At Your Door Painting & Home Renovation** — a premier on-site residential house painting and home renovation service (*"Ghar jaa kar paint aur renovation karne ki complete service"*).

> **Public Repository:** [https://github.com/Go-Execution/atyourdoorpainting](https://github.com/Go-Execution/atyourdoorpainting)

---

## 💡 Painting Job vs. Painting Services (Explained)

In the industry, there is an important distinction:
- **A "Painting Job":** Typically refers to a simple one-off gig, day labor, or single task (e.g., painting one fence or room without prep).
- **"Painting Services":** A professional, end-to-end doorstep business. Master painters arrive at the client's home with mobile workshop vans, perform complete surface renovations (patching drywall cracks, sealing water damage, masking floors and furniture), apply premium two-coat finishes, conduct a white-glove walkthrough, and provide a multi-year warranty with zero mess left behind.

This website is custom-crafted around this **doorstep residential painting & renovation service model**.

---

## ✨ Features & Fun Interactive Elements

### 1. 🎨 Interactive Click-to-Splatter Engine (Easter Egg)
- Click anywhere on the webpage to burst playful, multi-colored paint splatters!
- Includes an on/off toggle button (`Splatter FX: ON`) in the top navigation bar.

### 2. 🖌️ Live Room Colorizer Studio
- An interactive Scandinavian living room interior mockup with dynamic wall coatings.
- **8 Pre-set Designer Swatches:** Sunset Coral, Pacific Lagoon, Botanical Sage, Golden Mimosa, Royalty Purple, Cloud Mist, Charcoal Velvet, and Tuscan Terracotta.
- **Custom Color Picker:** Homeowners can choose any custom color using the HTML5 color wheel.
- **Roller Sweep Animation:** Trigger a virtual paint roller wipe across the wall whenever a color is selected.
- Displays live paint codes, aesthetic moods, and recommended sheen types (Matte, Satin, Eggshell).

### 3. ↔️ Interactive Before & After Transformation Slider
- Smooth drag-and-touch split slider comparing a scuffed, dated, faded room against a radiant, fresh, modern renovation coat.

### 4. 📐 Real-Time Doorstep Cost Estimator
- Dynamic square footage slider (200 sq ft to 3,500 sq ft).
- Project scope selectors (Single Room, Full Interior, Exterior Siding, Kitchen Cabinets, Complete Renovation).
- Wall condition prep levels and add-ons (Drywall repair, Trim enamel, Zero-VOC paint).
- Live calculation of:
  - Estimated price range
  - Gallons of paint required
  - Estimated project duration
  - Painter crew size dispatched
  - **Animated Paint Bucket Meter:** Fills up visually based on project size!

### 5. 🛠️ 6 Doorstep Renovation & Painting Service Cards
- Interior Walls, Ceilings & Accent Murals
- Kitchen Cabinet Spray Makeover (Save 75% over new cabinets)
- Drywall Repair, Mudding & Plaster Renovation
- Exterior Siding, Stucco & Weatherproof Coatings
- Doors, Baseboards & Gloss Trim Enameling
- Doorstep Color Consultation (300+ physical swatches brought to your home)

### 6. 🚚 The 4-Step Doorstep Journey
- Step 1: Doorstep Knock & Swatch Match
- Step 2: Mask, Prep & Plaster Repair
- Step 3: Precision Two-Coat Application
- Step 4: Spotless Walkthrough & 3-Year Warranty

### 7. 🏷️ Paint-Chip Styled Client Reviews
- Real homeowner testimonials designed like oversized Pantone paint chips with color swatch headers and 5-star ratings.

### 8. ❓ Interactive FAQ Accordion
- Answers common questions regarding doorstep logistics, furniture protection, pet-safe paints, and turnaround times.

### 9. 🎉 Doorstep Booking Modal with Confetti
- Instant quote request form with date picker and address input.
- Fires a vibrant canvas confetti celebration upon confirmation!

---

## 🚀 Tech Stack

- **HTML5:** Semantic, accessible markup.
- **Tailwind CSS (CDN):** Responsive utility-first styling with custom extended palettes.
- **Custom CSS (`css/style.css`):** Fluid animations (drips, roller sweeps, floating cans, wobbles, and smooth glow).
- **JavaScript (`js/main.js`):** Modular logic for the Splatter Engine, Room Colorizer, Slider, Estimator, and Accordions.
- **Lucide Icons:** Clean modern iconography.
- **Canvas-Confetti:** Interactive celebratory particle effects.

---

## 📁 Project Structure

```
atyourdoorpainting/
├── css/
│   └── style.css       # Custom animations, drips, swatches & styles
├── js/
│   └── main.js         # Interactive engines, sliders & calculators
├── index.html          # Main responsive one-page mockup
└── README.md           # Documentation & feature overview
```

---

## 💻 How to Run Locally

1. Simply double-click `index.html` or open it with any web browser (Chrome, Edge, Safari, Firefox).
2. Alternatively, serve via any local static server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

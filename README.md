# Garibook Homepage – React Recreation

> Responsive Frontend Engineering Project & Clean Architecture Showcase

A pixel-fidelity, responsive recreation of the [Garibook](https://garibook.com/) homepage built from scratch with **React 18**, **Tailwind CSS**, and **GSAP** animations.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd garibook-homepage

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

The dev server starts at **http://localhost:3000**.

---

## 🏗️ Tech Stack & Rationale

| Technology | Why |
|---|---|
| **React 18** | Industry standard, required by the assessment. Functional components with hooks for clean state management. |
| **Vite** | Lightning-fast HMR and builds (~1.2s). No webpack configuration overhead. |
| **Tailwind CSS 3** | Utility-first styling that matches the original Bootstrap-based Garibook layout while being more composable and responsive. |
| **GSAP + ScrollTrigger** | Professional-grade animation library for the hero entrance timeline, scroll-triggered counter animations, and section reveal effects. |
| **Zero UI libraries** | No Bootstrap, no Material UI, no pre-built component libraries — everything is hand-crafted to demonstrate frontend competency. |

---

## 📁 Project Structure

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # Root component – section orchestrator
├── index.css                   # Global styles, animations, Tailwind directives
├── data/
│   └── index.js                # Static data (cars, airports, stats, reviews)
└── components/
    ├── Navbar.jsx              # Sticky header + mobile offcanvas drawer
    ├── Hero.jsx                # Hero with GSAP entrance + typewriter effect
    ├── BookingWidget.jsx       # Car Rental & Airport Rental tabbed form
    ├── StatsCounter.jsx        # GSAP scroll-triggered animated counters
    ├── Services.jsx            # Tabbed services (Rides/Business/Club/VMS)
    ├── FreedomSection.jsx      # "Freedom in Every Journey" feature cards
    ├── PeopleTogether.jsx      # Image cards (Airport/Family/Tours)
    ├── BookingArrival.jsx      # "From Booking to Arrival" image grid
    ├── SmartDriver.jsx         # 0% Commission driver CTA banner
    ├── NewsroomSlider.jsx      # Press/newsroom horizontal slider
    ├── PassengerReviews.jsx    # Video testimonials + YouTube modal
    ├── BlogSection.jsx         # Blog preview cards
    ├── DownloadApp.jsx         # App download promotional banner
    └── Footer.jsx              # Full corporate footer
```

---

## ✨ Key Features & GSAP Animations

### 🎬 Hero Typewriter Effect
- Custom character-by-character typing animation that cycles through 3 headlines
- HTML-aware rendering: highlighted keywords (e.g., "Travel", "Trips", "Journey") appear in Garibook yellow (#FEC200) as they're typed
- Configurable typing speed (80ms), deletion speed (40ms), and pause duration (2s)

### 📊 Scroll-Triggered Stats Counter
- GSAP `ScrollTrigger` detects when the counter section enters the viewport
- Numbers animate from 0 → target (300,000+ / 850,000+ / 35,000+ / 64) over 2 seconds
- Locale-formatted numbers with smooth easing

### 🎞️ Section Reveal Animations
- `gsap.from()` with `ScrollTrigger` progressively reveals sections as the user scrolls
- Staggered card animations in Services, Freedom, and People Together sections

### 📱 Interactive Features
- **Booking Widget**: Functional tab switching between Car Rental and Airport Rental, custom car selector dropdown with vehicle images, radio button trip-type selection
- **Sliders**: Horizontal scroll-snap sliders with prev/next navigation for Newsroom and Passenger Reviews
- **Video Modal**: Click-to-play YouTube video overlay with backdrop blur
- **Mobile Navigation**: Animated off-canvas drawer with smooth slide-in transition

---

## 📱 Responsive Breakpoints

| Viewport | Width | Layout |
|---|---|---|
| Mobile | < 640px | Single column, stacked sections |
| Tablet | 640–1023px | 2-column grids |
| Desktop | 1024px+ | Full multi-column layouts |

---

## 📄 License

This project is created as a frontend technical demonstration. All brand assets belong to Garibook.

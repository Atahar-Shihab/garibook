# Garibook Landing Page – Frontend Technical Assessment Recreation

> **Live Demo:** [https://garibook.vercel.app/](https://garibook.vercel.app/)  
> **Original Reference Website:** [https://garibook.com/](https://garibook.com/)  
> **Author:** Atahar Shihab ([GitHub](https://github.com/Atahar-Shihab) • [Email](mailto:shihabatahar@gmail.com))

A high-fidelity, pixel-accurate, and responsive recreation of the official **Garibook** homepage built from scratch with **React 18**, **Tailwind CSS**, **Vite**, and smooth **GSAP / AOS** animations.

---

## ⚖️ Disclaimer & Attribution (Important)

> [!NOTE]
> **Educational & Evaluation Purpose Only:**  
> This project is developed exclusively as a **frontend engineering demonstration and technical skills assessment**. It is **not** affiliated with, endorsed by, or operated as an official service of Garibook or NRB Solution Ltd.
> 
> - **Intellectual Property:** All brand names, logos, vehicle photographs, press article headlines, and registered trademarks belong entirely to **Garibook** ([garibook.com](https://garibook.com/)) and its respective partners.
> - **Non-Commercial:** This codebase and its live deployment are strictly non-commercial and hosted solely for technical code review and portfolio evaluation purposes.

---

## 🚀 Key Highlights & Implemented Features

### 1. 🚖 Interactive Hero Booking Engine
- **Multi-Tab Mode**: Seamlessly toggle between **Car Rental**, **Airport Rental**, and **Hourly Rental**.
- **Dynamic Trip Configurator**: Toggle between **One Way** and **Round Trip**, dynamically revealing the return date/time selectors.
- **Auto-Selected Fleet Browser**: Interactive vehicle cards featuring real Garibook fleet models (Sedan, Noah, HiAce, Alphard) with auto-selection on first load, hover previews, and seat/luggage specifications.
- **Date & Time Controls**: Integrated date and time pickers matching Garibook's layout.

### 2. 🧭 Pixel-Accurate Navigation & Header
- **Floating Language Switcher**: `[ 🌐 English ]` toggle bar placed cleanly above the navbar.
- **Smooth Underline Hover Effect**: Dynamic blue underline indicator (`.nav-theme-link`) that smoothly animates on mouse hover and never sticks to arbitrary menu items.
- **Scroll-Aware Sticky Header**: Automatically transitions to a sticky, elevated shadow navigation bar when scrolling past 80px.
- **Responsive Mobile Drawer**: Off-canvas menu with branded royal blue background and smooth slide-in animations.

### 3. 📰 Infinite Looping Newsroom Slider
- Continuous looping carousel cycling through authentic Garibook press publications (Kaler Kantho, Ittefaq, Tech in Asia with live GIF, Prothom Alo, Dhaka Tribune).
- Dual-layer infinite loop logic with smooth boundary jumping and responsive card layout.
- Active navigation arrows with dark hover states.

### 4. 🎥 Authentic Video Testimonials
- Video testimonial slider featuring authentic passenger reviews.
- Interactive modal overlay to play YouTube interviews directly without page reloads.

### 5. 🦶 Full Corporate Footer
- 4-column navigational layout with dynamic hover underlines.
- App store download links (Google Play & Apple App Store).
- Legal and corporate credentials: NRB Solution Ltd., Link 3 Technologies, and Trade License information.
- Full-width SSLCommerz payment partner banner.

### 6. 📱 Floating Action Controls
- **Scroll to Top**: Smooth upward scroll button positioned at bottom-right.
- **Live Support Chat**: Fixed floating chat launcher icon.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose |
|---|---|
| **React 18** | Modular component-driven architecture with clean custom hooks |
| **Vite** | Blazing-fast development environment and optimized production bundling (~1.3s build) |
| **Tailwind CSS 3** | Highly customized utility-first styling reproducing Garibook's design system |
| **GSAP & AOS** | Fluid viewport entrance animations and scroll reveal effects |
| **Vanilla Architecture** | Hand-crafted UI components without relying on heavy external UI frameworks |

---

## 📁 Repository Structure

```
d:/Garibook/
├── public/
│   ├── assets/images/          # Authentic brand assets, fleet pictures & logos
│   ├── blogs.json              # Garibook blog articles data
│   ├── newsrooms.json          # Live press coverage data
│   ├── favicon.ico             # Official circular pin favicon
│   └── favicon.svg             # Vector brand tab icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header, navigation & mobile drawer
│   │   ├── Hero.jsx            # Hero banner & headline animations
│   │   ├── BookingWidget.jsx   # Multi-tab ride booking configurator
│   │   ├── StatsCounter.jsx    # Animated metrics counter
│   │   ├── Services.jsx        # Service tiers & feature highlights
│   │   ├── FreedomSection.jsx  # Travel freedom promotional cards
│   │   ├── PeopleTogether.jsx  # Community & corporate travel showcase
│   │   ├── BookingArrival.jsx  # Process & ride guarantee guide
│   │   ├── SmartDriver.jsx     # Driver onboarding CTA section
│   │   ├── NewsroomSlider.jsx  # Infinite auto-looping press slider
│   │   ├── PassengerReviews.jsx# Video testimonial carousel & modal
│   │   ├── BlogSection.jsx     # Travel blogs & tips grid
│   │   ├── DownloadApp.jsx     # Mobile app download section
│   │   └── Footer.jsx          # Corporate footer with SSLCommerz bar
│   ├── data/
│   │   └── index.js            # Structured fleet data, navigation links & metadata
│   ├── App.jsx                 # Page composition & scroll observers
│   ├── main.jsx                # Application root mount
│   └── index.css               # Tailwind directives & custom CSS animations
├── index.html                  # HTML entry point with official SEO metadata
├── package.json
└── README.md
```

---

## 💻 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Atahar-Shihab/garibook.git
   cd garibook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 👨‍💻 Developer Information

- **Developer:** Atahar Shihab
- **Email:** [shihabatahar@gmail.com](mailto:shihabatahar@gmail.com)
- **GitHub:** [@Atahar-Shihab](https://github.com/Atahar-Shihab)
- **Live Deployment:** [https://garibook.vercel.app/](https://garibook.vercel.app/)

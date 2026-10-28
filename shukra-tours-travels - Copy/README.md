# Shukra Tours & Travels — Modern Rebuilt Website

This project is a complete, mobile-friendly, and SEO-optimized website rebuilt specifically for **Shukra Tours & Travels** (Unit of Coimbatore Taxi Shukra), focusing exclusively on holiday packages, curated travel itineraries, interest-based tours, and seamless outstation travel bookings from Coimbatore.

---

## 🌟 Key Features & Requirements Delivered

1. **Focused on Tours & Travels**:
   - Rebuilt purely for holiday and tour packages originating from Coimbatore.
   - Comprehensive packages for South India, All-India, Hill Stations, Pilgrimages, and 1-Day Getaways.

2. **Navigation & Core Sections**:
   - **Home**: High-converting hero banner with trust badges (4.9★ rating, 15+ years experience, 12,000+ completed tours), quick trip search widget, and verified customer testimonials.
   - **Tour Packages Dropdown**:
     - *All India Trips* (Golden Triangle Delhi-Agra-Jaipur, Kashmir, Rajasthan, Goa)
     - *South India Classics* (Ooty & Coonoor, Misty Munnar & Thekkady, Kodaikanal)
     - *Hill Station Escapes* (Valparai & Topslip, Nilgiris, Yercaud)
     - *Pilgrimage Circuits* (Navagraha 9 Temples, Rameshwaram, Madurai, Palani, Guruvayur)
     - *1-Day Gateway Trips* (Coimbatore to Ooty, Munnar, Kodaikanal, Palani same-day return)
   - **Travel by Interest Dropdown**:
     - *Family Holidays* (Comfortable pacing, kid-friendly spots, spacious AC Innova Crysta / Tempo)
     - *Honeymoon Trips* (Romantic hill retreats, scenic viewpoints, luxury resort stays)
     - *Adventure & Wildlife* (Parambikulam Tiger Reserve safari, Topslip, 40 hairpin curves of Valparai, waterfalls)
     - *Pilgrimage & Spiritual* (Temple timing coordination, rituals, senior citizen care)
     - *Heritage & Culture* (Mysore Palace, Chettinad, Chola architecture)
     - *Group & Corporate Outings* (AC Tempo Travellers, team bonding retreats)
   - **Why Choose Us**:
     - Transparent, fixed pricing with zero hidden charges
     - Sanitized AC fleet (Sedans, SUVs, Innova Crysta, Tempo Travellers)
     - Experienced chauffeurs specialized in mountain and hairpin ghat driving
     - 24/7 on-road concierge support
     - 4.9★ verified rating on JustDial and Google Reviews
   - **Plan Your Trip**:
     - Interactive multi-step trip planner modal & section that automatically formats inquiries into pre-filled WhatsApp chat messages directed to `+91 94876 41616`.
   - **Call Us & Direct Action**:
     - Click-to-call buttons in the header, floating contact buttons, and a sticky bottom bar for mobile users.
   - **Contact Us**:
     - Full address: 10/30G, KNG Pudur Road, Subramaniyampalayam, G.N. Mills Post, Coimbatore – 641029.
     - Direct phones: `+91 94876 41616` / `+91 94878 41616`.
     - Direct email: `info@coimbatoretaxishukra.com`.

3. **Tech Stack & Mobile/SEO Optimization**:
   - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
   - Tailwind CSS framework loaded via CDN with custom brand color palette (`brand-navy`, `brand-gold`, `brand-teal`).
   - Clean, lightweight vanilla JavaScript (`assets/js/main.js`) powering:
     - Mobile slide-over drawer with accordion dropdowns
     - Package category filtering
     - Interactive Plan Your Trip modal with validation
     - Dynamic Package Details modal with day-wise itinerary
     - FAQ accordion expansion
     - Sticky header scroll elevation
     - Toast notifications
   - Complete SEO meta tags (title, description, keywords, OpenGraph, Twitter Cards, canonical URL).
   - Structured JSON-LD schema markup (`TravelAgency`, `TouristInformationCenter`, `AggregateRating`, `GeoCoordinates`).

---

## 📁 Project Structure

```
shukra-tours-travels/
│
├── index.html                  # Master flagship landing page with all sections
├── packages.html               # Dedicated Tour Packages catalog page
├── travel-by-interest.html     # Dedicated Travel by Interest page
├── why-choose-us.html          # Detailed About & Why Choose Us page
├── contact.html                # Dedicated Contact Us & Booking page
├── README.md                   # Documentation & setup guide
│
└── assets/
    ├── css/
    │   └── style.css           # Custom styling, fonts, animations & glassmorphism
    ├── js/
    │   └── main.js             # Mobile menu, modals, filters, accordions & WhatsApp link generation
    └── images/                 # Image assets placeholder
```

---

## 🚀 How to Run Locally

You can open `index.html` directly in any web browser, or launch a lightweight local server:

### Option 1: Python HTTP Server
```powershell
cd C:\Users\akash\.gemini\antigravity\scratch\shukra-tours-travels
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

### Option 2: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 🌐 Deployment Options
- **Netlify / Vercel**: Simply drag and drop the `shukra-tours-travels` folder or connect via GitHub.
- **cPanel / Web Hosting**: Upload all files to the `public_html` directory via FTP or File Manager.
- **GitHub Pages**: Push this directory to a repository and enable GitHub Pages on `main` branch.

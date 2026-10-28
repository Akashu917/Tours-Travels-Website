/**
 * Shukra Tours & Travels - Interactive Client Website Script
 * Official Contact: +91 94876 41616 / +91 94878 41616
 * Email: info@coimbatoretaxishukra.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStickyHeader();
  initPackageFilters();
  initFaqAccordion();
  initPlanTripModal();
  initPackageDetailsModal();
  initCarModelSwitchers();
  initLiveTourCalculator();
  initWhatsAppBookingForms();
  initBackToTop();
  setDefaultDates();
});

// Set sensible default dates for booking inputs (tomorrow)
function setDefaultDates() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split('T')[0];
  
  document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.value) {
      input.value = formattedDate;
      input.min = formattedDate;
    }
  });
}

// Mobile Menu Drawer & Submenu Accordions
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-backdrop');

  function openDrawer() {
    if (drawer && backdrop) {
      drawer.classList.remove('translate-x-full');
      backdrop.classList.remove('hidden');
      setTimeout(() => backdrop.classList.add('opacity-100'), 10);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && backdrop) {
      drawer.classList.add('translate-x-full');
      backdrop.classList.remove('opacity-100');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
      document.body.style.overflow = '';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Mobile Accordion Dropdowns
  document.querySelectorAll('.mobile-dropdown-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const content = document.getElementById(targetId);
      const icon = btn.querySelector('.dropdown-chevron');
      
      if (content) {
        const isOpen = content.classList.contains('open');
        // Close other open mobile accordions
        document.querySelectorAll('.mobile-dropdown-content').forEach(c => {
          c.classList.remove('open');
        });
        document.querySelectorAll('.dropdown-chevron').forEach(i => {
          i.classList.remove('rotate-180');
        });

        if (!isOpen) {
          content.classList.add('open');
          if (icon) icon.classList.add('rotate-180');
        }
      }
    });
  });

  // Close drawer on link click
  document.querySelectorAll('#mobile-drawer a:not(.mobile-dropdown-trigger)').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// Sticky Header Dynamic Styling on Scroll
function initStickyHeader() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-lg', 'py-3');
      navbar.classList.remove('py-4');
    } else {
      navbar.classList.remove('shadow-lg', 'py-3');
      navbar.classList.add('py-4');
    }
  });
}

// Tour Packages Filter Tabs
function initPackageFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const packageCards = document.querySelectorAll('.package-card');

  if (!filterBtns.length || !packageCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-slate-900', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
      });
      btn.classList.add('bg-amber-500', 'text-slate-900', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-200');

      // Filter cards
      packageCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 200);
        }
      });
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const content = parent.querySelector('.accordion-content');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = content.classList.contains('open');

      // Close all other FAQs
      document.querySelectorAll('.faq-item .accordion-content').forEach(item => {
        item.classList.remove('open');
      });
      document.querySelectorAll('.faq-item .faq-icon').forEach(i => {
        i.classList.remove('rotate-180');
      });

      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// Comprehensive Master Tour Package & Multi-Car Pricing Data
const packageData = {
  'ooty-coonoor': {
    title: 'Ooty & Coonoor Hill Romance Tour',
    duration: '3 Days / 2 Nights',
    route: 'Coimbatore – Ooty – Coonoor – Pykara – Coimbatore',
    distanceEst: '320 KM Total',
    image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=1200&auto=format&fit=crop',
    prices: {
      sedan: { name: 'Prime Sedan (Dzire / Etios)', seats: '4 Seats', price: 7499, perPerson: 1875, luggage: '2-3 Bags', desc: 'Economical, ideal for couples & small families' },
      ertiga: { name: 'Prime SUV (Ertiga / Xylo)', seats: '6 Seats', price: 9999, perPerson: 1666, luggage: '4 Bags', desc: 'Spacious legroom with dual AC' },
      innova: { name: 'Luxury (Toyota Innova Crysta)', seats: '7 Seats', price: 12499, perPerson: 1785, luggage: '5 Bags', desc: 'Supreme hill-climbing comfort with captain seats' },
      tempo: { name: 'AC Tempo Traveller (14-Seater)', seats: '14 Seats', price: 16999, perPerson: 1214, luggage: '8 Bags', desc: 'Best value for extended family & group outings' }
    },
    highlights: [
      'Scenic drive through Nilgiri Ghat roads with Nilgiri mountain tea gardens',
      'Visit Government Botanical Garden, Rose Garden & Doddabetta Peak',
      'Historic Nilgiri Mountain Toy Train joyride to Coonoor',
      'Sims Park, Lambs Rock & Dolphin Nose viewpoints in Coonoor',
      'Pykara Lake boating and Pykara Waterfalls'
    ],
    inclusions: [
      'Dedicated AC vehicle throughout the 3 days',
      'Experienced mountain-route chauffeur & driver allowance (bata)',
      'All toll gate charges, parking fees, fuel & hill permits included',
      'Doorstep pickup and drop anywhere in Coimbatore'
    ],
    itinerary: [
      { day: 'Day 1', text: 'Pickup from Coimbatore, drive to Ooty via Mettupalayam ghat. Check-in, visit Ooty Lake & Botanical Garden.' },
      { day: 'Day 2', text: 'Full day sightseeing: Doddabetta Peak, Tea Factory & Museum, Toy Train ride to Coonoor, Sims Park.' },
      { day: 'Day 3', text: 'Visit Pykara Lake & Falls, Pine Forest, 6th & 9th Mile shooting spots. Return drive to Coimbatore drop.' }
    ]
  },
  'kerala-gods-own': {
    title: 'Misty Munnar & Thekkady Kerala Escape',
    duration: '4 Days / 3 Nights',
    route: 'Coimbatore – Munnar – Thekkady – Coimbatore',
    distanceEst: '540 KM Total',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    prices: {
      sedan: { name: 'Prime Sedan (Dzire / Etios)', seats: '4 Seats', price: 12999, perPerson: 3250, luggage: '2-3 Bags', desc: 'Comfortable private sedan' },
      ertiga: { name: 'Prime SUV (Ertiga / Xylo)', seats: '6 Seats', price: 15999, perPerson: 2666, luggage: '4 Bags', desc: 'Extra space for hill travel' },
      innova: { name: 'Luxury (Toyota Innova Crysta)', seats: '7 Seats', price: 19999, perPerson: 2857, luggage: '5 Bags', desc: 'Ultimate comfort on winding Kerala roads' },
      tempo: { name: 'AC Tempo Traveller (14-Seater)', seats: '14 Seats', price: 26999, perPerson: 1928, luggage: '8 Bags', desc: 'Most affordable per head for groups' }
    },
    highlights: [
      'Cheeyappara & Valara cascading waterfalls en route to Munnar',
      'Eravikulam National Park (Home of endangered Nilgiri Tahr)',
      'Mattupetty Dam, Echo Point, Kundala Lake & tea estate strolls',
      'Periyar Tiger Reserve boat safari at Thekkady',
      'Spice plantation spice walk & cultural martial art shows'
    ],
    inclusions: [
      'Dedicated AC vehicle throughout the 4 days tour',
      'Inter-state Kerala permit charges and road taxes fully included',
      'Experienced English / Tamil / Malayalam / Hindi speaking driver',
      'All fuel, driver bata, tolls, and tourist parking fees'
    ],
    itinerary: [
      { day: 'Day 1', text: 'Morning pickup from Coimbatore, drive to Munnar. En route view waterfalls and lush tea hills. Evening at leisure.' },
      { day: 'Day 2', text: 'Munnar sightseeing: Eravikulam National Park, Mattupetty Dam, Echo Point, Photo Point & Tea Museum.' },
      { day: 'Day 3', text: 'Drive to Thekkady (Periyar). Afternoon boat safari in Periyar Lake, spice plantation tour, cultural show.' },
      { day: 'Day 4', text: 'Morning elephant ride/spice shopping. Scenic return journey to Coimbatore with evening drop.' }
    ]
  },
  'kodaikanal-princess': {
    title: 'Kodaikanal - Princess of Hill Stations',
    duration: '3 Days / 2 Nights',
    route: 'Coimbatore – Palani – Kodaikanal – Coimbatore',
    distanceEst: '410 KM Total',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
    prices: {
      sedan: { name: 'Prime Sedan (Dzire / Etios)', seats: '4 Seats', price: 7999, perPerson: 1999, luggage: '2-3 Bags', desc: 'Cozy for romantic getaways' },
      ertiga: { name: 'Prime SUV (Ertiga / Xylo)', seats: '6 Seats', price: 10499, perPerson: 1750, luggage: '4 Bags', desc: 'Comfortable family SUV' },
      innova: { name: 'Luxury (Toyota Innova Crysta)', seats: '7 Seats', price: 12999, perPerson: 1857, luggage: '5 Bags', desc: 'Premium luxury on hairpin climbs' },
      tempo: { name: 'AC Tempo Traveller (14-Seater)', seats: '14 Seats', price: 17999, perPerson: 1285, luggage: '8 Bags', desc: 'Group fun with pushback comfort' }
    },
    highlights: [
      'Star-shaped Kodai Lake cycling & shikara boating',
      'Breathtaking cliff-edge walk along Coakers Walk & Bryant Park',
      'Pillar Rocks, Green Valley View & Guna Caves (Devil’s Kitchen)',
      'Pine Forest and Silver Cascade Waterfalls photo stops',
      'Option for Palani Murugan Temple darshan on the way'
    ],
    inclusions: [
      'Private AC Cab for the entire circuit',
      'All toll, parking, driver bata and fuel expenses included',
      'Customized photo stops along scenic Palani ghat roads'
    ],
    itinerary: [
      { day: 'Day 1', text: 'Pickup from Coimbatore, optional Palani ropeway darshan, ascend to Kodaikanal. Evening Kodai lake stroll.' },
      { day: 'Day 2', text: 'Full day tour: Coakers Walk, Bryant Park, Pillar Rocks, Green Valley, Guna Caves, Pine Forest.' },
      { day: 'Day 3', text: 'Visit Kurinji Andavar Temple, Silver Cascade falls. Descend and return to Coimbatore drop.' }
    ]
  },
  'all-india-golden': {
    title: 'All India Golden Triangle & Royal Heritage',
    duration: '6 Days / 5 Nights',
    route: 'Delhi – Agra – Jaipur (Royal Rajasthan)',
    distanceEst: '1,150 KM Circuit',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
    prices: {
      sedan: { name: 'Prime Sedan (Dzire / Etios)', seats: '4 Seats', price: 21999, perPerson: 5499, luggage: '3 Bags', desc: 'Luxury private touring' },
      ertiga: { name: 'Prime SUV (Ertiga / Xylo)', seats: '6 Seats', price: 28999, perPerson: 4833, luggage: '4 Bags', desc: 'Spacious for royal Rajasthan journeys' },
      innova: { name: 'Luxury (Toyota Innova Crysta)', seats: '7 Seats', price: 36999, perPerson: 5285, luggage: '5 Bags', desc: 'VIP highway comfort' },
      tempo: { name: 'AC Tempo Traveller (14-Seater)', seats: '14 Seats', price: 48999, perPerson: 3499, luggage: '10 Bags', desc: 'Unbeatable price for large tourist groups' }
    },
    highlights: [
      'Marvel at the iconic Taj Mahal at sunrise & Agra Fort',
      'Explore Jaipur Amber Fort, Hawa Mahal, City Palace & Jantar Mantar',
      'Delhi India Gate, Qutub Minar, Red Fort & Chandni Chowk',
      'Complete end-to-end luxury vehicle, verified chauffeur & hotel coordination'
    ],
    inclusions: [
      'Air-conditioned private cab for all transfers and inter-city travel',
      'All interstate road taxes, toll taxes, parking fees & chauffeur allowance',
      'Assistance with domestic flight/train bookings from Coimbatore'
    ],
    itinerary: [
      { day: 'Day 1', text: 'Arrival in Delhi. Sightseeing: India Gate, Rashtrapati Bhavan, Qutub Minar.' },
      { day: 'Day 2', text: 'Drive to Agra via Yamuna Expressway. Visit Agra Fort & sunset view of Taj Mahal from Mehtab Bagh.' },
      { day: 'Day 3', text: 'Sunrise visit to Taj Mahal. Drive to Jaipur with stop at Fatehpur Sikri.' },
      { day: 'Day 4', text: 'Full day Jaipur: Amber Fort with elephant/jeep, Jal Mahal, City Palace, Hawa Mahal.' },
      { day: 'Day 5', text: 'Jaipur shopping for blue pottery & gems. Drive back to Delhi.' },
      { day: 'Day 6', text: 'Delhi local shopping and drop at Delhi Airport/Railway Station for flight back to Coimbatore.' }
    ]
  },
  'temple-heritage': {
    title: 'South India Spiritual & Heritage Circuit',
    duration: '5 Days / 4 Nights',
    route: 'Coimbatore – Madurai – Rameshwaram – Kanyakumari – Coimbatore',
    distanceEst: '1,020 KM Total',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop',
    prices: {
      sedan: { name: 'Prime Sedan (Dzire / Etios)', seats: '4 Seats', price: 14499, perPerson: 3624, luggage: '3 Bags', desc: 'Peaceful private pilgrimage' },
      ertiga: { name: 'Prime SUV (Ertiga / Xylo)', seats: '6 Seats', price: 18499, perPerson: 3083, luggage: '4 Bags', desc: 'Ideal for parents & elders' },
      innova: { name: 'Luxury (Toyota Innova Crysta)', seats: '7 Seats', price: 23499, perPerson: 3357, luggage: '5 Bags', desc: 'Maximum comfort for long-distance darshans' },
      tempo: { name: 'AC Tempo Traveller (14-Seater)', seats: '14 Seats', price: 31999, perPerson: 2285, luggage: '8 Bags', desc: 'Family group temple yatra' }
    },
    highlights: [
      'World-famous Madurai Meenakshi Amman Temple darshan',
      'Rameshwaram Ramanathaswamy Temple 22 Holy Theertham holy bath',
      'Dhanushkodi ghost town & Arichal Munai (India-Sri Lanka border ocean view)',
      'Scenic ride across the engineering marvel Pamban Bridge',
      'Kanyakumari Sunset & Sunrise, Vivekananda Rock Memorial & Thiruvalluvar Statue'
    ],
    inclusions: [
      'Dedicated AC vehicle throughout the 5 days spiritual circuit',
      'Chauffeur well-versed in temple timings, pooja traditions and local protocols',
      'Toll gates, parking, permit & driver allowance fully included'
    ],
    itinerary: [
      { day: 'Day 1', text: 'Coimbatore to Madurai. Evening darshan at Meenakshi Amman Temple and Thirumalai Nayakar Mahal.' },
      { day: 'Day 2', text: 'Drive to Rameshwaram via Pamban Sea Bridge. Temple darshan & Agni Theertham bath.' },
      { day: 'Day 3', text: 'Early morning visit to Dhanushkodi & Ram Setu viewpoint. Drive to Kanyakumari. Sunset viewing.' },
      { day: 'Day 4', text: 'Kanyakumari sunrise, boat to Vivekananda Rock, Thiruvalluvar Statue, Suchindram Temple. Drive to Madurai/Dindigul.' },
      { day: 'Day 5', text: 'Palani Murugan Temple darshan and return drive to Coimbatore drop.' }
    ]
  },
  'valparai-topslip': {
    title: 'Valparai & Topslip Wild Eco-Safari',
    duration: '2 Days / 1 Night',
    route: 'Coimbatore – Pollachi – Topslip – Valparai – Coimbatore',
    distanceEst: '260 KM Total',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    prices: {
      sedan: { name: 'Prime Sedan (Dzire / Etios)', seats: '4 Seats', price: 5999, perPerson: 1499, luggage: '2 Bags', desc: 'Quick weekend escape' },
      ertiga: { name: 'Prime SUV (Ertiga / Xylo)', seats: '6 Seats', price: 7999, perPerson: 1333, luggage: '3 Bags', desc: 'SUV capability on 40 hairpins' },
      innova: { name: 'Luxury (Toyota Innova Crysta)', seats: '7 Seats', price: 9999, perPerson: 1428, luggage: '4 Bags', desc: 'Smooth mountain power' },
      tempo: { name: 'AC Tempo Traveller (14-Seater)', seats: '14 Seats', price: 13999, perPerson: 999, luggage: '6 Bags', desc: 'Unbeatable value for group trek / safari' }
    },
    highlights: [
      'Thrilling climb up 40 Hairpin Bends with panoramic Aliyar Dam view',
      'Topslip Anamalai Tiger Reserve & Parambikulam Forest Safari',
      'Elephant camp interaction and lush rainforest canopy walk',
      'Sprawling tea gardens, Sholayar Dam & misty tea valley sunsets'
    ],
    inclusions: [
      'Sturdy AC SUV / Sedan for mountain hairpin curves',
      'Forest entry guidance and permit coordination',
      'Coimbatore pickup & drop with all car expenses covered'
    ],
    itinerary: [
      { day: 'Day 1', text: 'Coimbatore to Topslip forest safari, Elephant camp. Afternoon climb to Valparai via 40 hairpins. Sholayar Dam sunset.' },
      { day: 'Day 2', text: 'Morning tea estate walk, Koolangal river, Aliyar Dam park visit. Return to Coimbatore by evening.' }
    ]
  }
};

// 1. Interactive Car Model Switcher on Every Package Card
function initCarModelSwitchers() {
  document.querySelectorAll('.package-card').forEach(card => {
    const pkgKey = card.getAttribute('data-package-key');
    if (!pkgKey || !packageData[pkgKey]) return;

    const data = packageData[pkgKey];
    const pills = card.querySelectorAll('.car-pill');
    const priceDisplay = card.querySelector('.dynamic-package-price');
    const perPersonDisplay = card.querySelector('.dynamic-per-person');
    const carNameDisplay = card.querySelector('.dynamic-car-name');
    const bookBtn = card.querySelector('.dynamic-book-btn');

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        // Active pill toggle
        pills.forEach(p => p.classList.remove('active', 'bg-brand-navy', 'text-amber-400', 'border-brand-navy'));
        pills.forEach(p => p.classList.add('bg-slate-100', 'text-slate-600', 'border-slate-200'));
        
        pill.classList.remove('bg-slate-100', 'text-slate-600', 'border-slate-200');
        pill.classList.add('active', 'bg-brand-navy', 'text-amber-400', 'border-brand-navy');

        const model = pill.getAttribute('data-model');
        const carInfo = data.prices[model];
        if (!carInfo) return;

        // Animated price update
        if (priceDisplay) {
          priceDisplay.classList.remove('price-update-animate');
          void priceDisplay.offsetWidth; // trigger reflow
          priceDisplay.classList.add('price-update-animate');
          priceDisplay.innerHTML = `₹${carInfo.price.toLocaleString('en-IN')}`;
        }

        if (perPersonDisplay) {
          perPersonDisplay.textContent = `(₹${carInfo.perPerson.toLocaleString('en-IN')} / head)`;
        }

        if (carNameDisplay) {
          carNameDisplay.textContent = `${carInfo.name} • ${carInfo.seats}`;
        }

        // Update booking WhatsApp link
        if (bookBtn) {
          const msg = `Hi Shukra Tours & Travels, I want to book the *${data.title}* (${data.duration}) with *${carInfo.name}* at package price *₹${carInfo.price.toLocaleString('en-IN')}*. Please confirm availability from Coimbatore.`;
          bookBtn.setAttribute('data-whatsapp-msg', msg);
        }
      });
    });

    // Handle card book button click
    if (bookBtn) {
      bookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const activePill = card.querySelector('.car-pill.active');
        const model = activePill ? activePill.getAttribute('data-model') : 'sedan';
        const carInfo = data.prices[model];
        const msg = bookBtn.getAttribute('data-whatsapp-msg') || 
          `Hi Shukra Tours & Travels, I want to book the *${data.title}* (${data.duration}) with *${carInfo.name}* at *₹${carInfo.price.toLocaleString('en-IN')}*. Please share dates & tariff from Coimbatore.`;
        window.open(`https://wa.me/919487641616?text=${encodeURIComponent(msg)}`, '_blank');
      });
    }
  });
}

// 2. Interactive "Tour Tariff & Car Model Fare Calculator" Widget
function initLiveTourCalculator() {
  const calcContainer = document.getElementById('tour-fare-calculator');
  if (!calcContainer) return;

  const destSelect = document.getElementById('calc-destination');
  const durationBadge = document.getElementById('calc-duration-badge');
  const distanceBadge = document.getElementById('calc-distance-badge');
  const carRadios = document.querySelectorAll('input[name="calc-car-model"]');
  const resultPrice = document.getElementById('calc-result-price');
  const resultPerPerson = document.getElementById('calc-result-per-person');
  const resultCarDetails = document.getElementById('calc-result-car-details');
  const resultInclusions = document.getElementById('calc-result-inclusions');
  const bookBtn = document.getElementById('calc-book-whatsapp');

  // Master database for calculator locations
  const calcDatabase = {
    'ooty-3d': {
      title: 'Ooty & Coonoor Hill Tour',
      duration: '3 Days / 2 Nights',
      distance: '320 KM Total',
      sedan: { price: 7499, perPerson: 1875, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '2-3 Bags' },
      ertiga: { price: 9999, perPerson: 1666, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 12499, perPerson: 1785, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 16999, perPerson: 1214, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: 'Coimbatore pickup, fuel, driver bata, ghat permits, toll & parking'
    },
    'munnar-4d': {
      title: 'Munnar & Thekkady Kerala Escape',
      duration: '4 Days / 3 Nights',
      distance: '540 KM Total',
      sedan: { price: 12999, perPerson: 3250, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '2-3 Bags' },
      ertiga: { price: 15999, perPerson: 2666, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 19999, perPerson: 2857, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 26999, perPerson: 1928, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: 'Kerala inter-state permit, hill entry, fuel, driver bata, tolls'
    },
    'kodai-3d': {
      title: 'Kodaikanal Misty Magic',
      duration: '3 Days / 2 Nights',
      distance: '410 KM Total',
      sedan: { price: 7999, perPerson: 1999, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '2-3 Bags' },
      ertiga: { price: 10499, perPerson: 1750, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 12999, perPerson: 1857, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 17999, perPerson: 1285, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: 'Palani ghat route, fuel, driver allowance, toll taxes, parking'
    },
    'valparai-2d': {
      title: 'Valparai & Topslip Wild Safari',
      duration: '2 Days / 1 Night',
      distance: '260 KM Total',
      sedan: { price: 5999, perPerson: 1499, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '2-3 Bags' },
      ertiga: { price: 7999, perPerson: 1333, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 9999, perPerson: 1428, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 13999, perPerson: 999, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: '40 Hairpin curves drive, Topslip entry coordination, fuel & bata'
    },
    'rameshwaram-5d': {
      title: 'Madurai, Rameshwaram & Kanyakumari Pilgrimage',
      duration: '5 Days / 4 Nights',
      distance: '1,020 KM Total',
      sedan: { price: 14499, perPerson: 3624, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '3 Bags' },
      ertiga: { price: 18499, perPerson: 3083, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 23499, perPerson: 3357, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 31999, perPerson: 2285, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: 'Pamban bridge, 22 theerthams, Dhanushkodi, full tolls, driver bata'
    },
    'mysore-coorg-4d': {
      title: 'Mysore & Coorg Heritage Explorer',
      duration: '4 Days / 3 Nights',
      distance: '650 KM Total',
      sedan: { price: 13499, perPerson: 3374, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '3 Bags' },
      ertiga: { price: 16999, perPerson: 2833, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 21499, perPerson: 3071, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 28999, perPerson: 2071, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: 'Karnataka state permit, Brindavan gardens, Abbey falls, tolls & fuel'
    },
    'navagraha-3d': {
      title: 'Navagraha 9 Temples Pilgrimage',
      duration: '3 Days / 2 Nights',
      distance: '680 KM Total',
      sedan: { price: 9999, perPerson: 2499, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '3 Bags' },
      ertiga: { price: 12999, perPerson: 2166, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 15999, perPerson: 2285, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 21999, perPerson: 1571, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '8 Bags' },
      inclusions: 'All 9 temple darshan schedule, Kumbakonam stay route, driver bata & tolls'
    },
    'ooty-1d': {
      title: 'Coimbatore to Ooty Same-Day Tour',
      duration: '1 Day (6 AM to 9 PM)',
      distance: '190 KM Total',
      sedan: { price: 3499, perPerson: 874, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: 'Day Bags' },
      ertiga: { price: 4499, perPerson: 749, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: 'Day Bags' },
      innova: { price: 5499, perPerson: 785, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: 'Day Bags' },
      tempo: { price: 7999, perPerson: 571, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: 'Group Luggage' },
      inclusions: 'Same-day return, Doddabetta, Botanical Garden, Coonoor, fuel & driver bata'
    },
    'golden-triangle-6d': {
      title: 'All India Golden Triangle (Delhi-Agra-Jaipur)',
      duration: '6 Days / 5 Nights',
      distance: '1,150 KM Total',
      sedan: { price: 21999, perPerson: 5499, name: 'Swift Dzire / Toyota Etios (4 Seater AC)', luggage: '3 Bags' },
      ertiga: { price: 28999, perPerson: 4833, name: 'Maruti Ertiga / Mahindra Xylo (6 Seater AC)', luggage: '4 Bags' },
      innova: { price: 36999, perPerson: 5285, name: 'Toyota Innova Crysta (7 Seater Luxury AC)', luggage: '5 Bags' },
      tempo: { price: 48999, perPerson: 3499, name: 'AC Tempo Traveller (14 Seater Luxury)', luggage: '10 Bags' },
      inclusions: 'Delhi airport pickup, Taj Mahal, Amber fort, expressway toll & permits'
    }
  };

  function updateCalculator() {
    const locKey = destSelect.value;
    const dest = calcDatabase[locKey] || calcDatabase['ooty-3d'];

    let selectedCar = 'sedan';
    carRadios.forEach(r => {
      if (r.checked) selectedCar = r.value;
    });

    const carData = dest[selectedCar];
    if (!carData) return;

    if (durationBadge) durationBadge.textContent = dest.duration;
    if (distanceBadge) distanceBadge.textContent = dest.distance;

    if (resultPrice) {
      resultPrice.classList.remove('price-update-animate');
      void resultPrice.offsetWidth;
      resultPrice.classList.add('price-update-animate');
      resultPrice.textContent = `₹${carData.price.toLocaleString('en-IN')}`;
    }

    if (resultPerPerson) {
      resultPerPerson.textContent = `≈ ₹${carData.perPerson.toLocaleString('en-IN')} / person`;
    }

    if (resultCarDetails) {
      resultCarDetails.textContent = `${carData.name} • ${carData.luggage}`;
    }

    if (resultInclusions) {
      resultInclusions.textContent = dest.inclusions;
    }

    if (bookBtn) {
      const msg = `Hi Shukra Tours & Travels, I calculated a tour for *${dest.title}* (${dest.duration}) using your calculator. Vehicle: *${carData.name}*, Estimated Package Price: *₹${carData.price.toLocaleString('en-IN')}*. Please share upcoming departure dates and booking confirmation.`;
      bookBtn.onclick = () => {
        window.open(`https://wa.me/919487641616?text=${encodeURIComponent(msg)}`, '_blank');
      };
    }
  }

  destSelect.addEventListener('change', updateCalculator);
  carRadios.forEach(r => r.addEventListener('change', updateCalculator));

  // Run on load
  updateCalculator();
}

// 3. Package Details Modal with Multi-Car Selection
function initPackageDetailsModal() {
  const modal = document.getElementById('package-details-modal');
  const openBtns = document.querySelectorAll('.open-package-modal');
  const closeBtn = document.getElementById('close-package-modal');
  const backdrop = document.getElementById('package-modal-backdrop');

  if (!modal) return;

  let currentPkg = null;
  let selectedModel = 'sedan';

  function showPackageDetails(packageKey) {
    const data = packageData[packageKey];
    if (!data) return;
    currentPkg = data;
    selectedModel = 'sedan';

    // Populate modal fields
    document.getElementById('modal-package-title').textContent = data.title;
    document.getElementById('modal-package-duration').textContent = data.duration;
    document.getElementById('modal-package-route').textContent = data.route;
    document.getElementById('modal-package-image').src = data.image;

    // Highlights list
    const hlContainer = document.getElementById('modal-package-highlights');
    hlContainer.innerHTML = '';
    data.highlights.forEach(hl => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-xs sm:text-sm text-slate-700';
      li.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-600 mt-1 mr-2 flex-shrink-0"></i><span>${hl}</span>`;
      hlContainer.appendChild(li);
    });

    // Inclusions list
    const incContainer = document.getElementById('modal-package-inclusions');
    incContainer.innerHTML = '';
    data.inclusions.forEach(inc => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-xs sm:text-sm text-slate-700';
      li.innerHTML = `<i class="fa-solid fa-check text-amber-500 mt-1 mr-2 flex-shrink-0"></i><span>${inc}</span>`;
      incContainer.appendChild(li);
    });

    // Day-wise Itinerary
    const itinContainer = document.getElementById('modal-package-itinerary');
    itinContainer.innerHTML = '';
    data.itinerary.forEach(it => {
      const div = document.createElement('div');
      div.className = 'border-l-2 border-amber-500 pl-4 py-1 relative';
      div.innerHTML = `
        <span class="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-amber-500"></span>
        <h5 class="text-xs sm:text-sm font-bold text-slate-900">${it.day}</h5>
        <p class="text-xs text-slate-600 mt-0.5">${it.text}</p>
      `;
      itinContainer.appendChild(div);
    });

    // Multi-Car Selector inside modal
    const carContainer = document.getElementById('modal-car-options');
    if (carContainer) {
      carContainer.innerHTML = '';
      const models = [
        { key: 'sedan', label: 'Prime Sedan', sub: 'Dzire / Etios (4 Pax)' },
        { key: 'ertiga', label: 'Prime SUV', sub: 'Ertiga (6 Pax)' },
        { key: 'innova', label: 'Luxury SUV', sub: 'Innova Crysta (7 Pax)' },
        { key: 'tempo', label: 'Group Van', sub: 'Tempo (14 Pax)' }
      ];

      models.forEach(m => {
        const c = data.prices[m.key];
        if (!c) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `modal-car-pill p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${m.key === selectedModel ? 'border-brand-navy bg-brand-navy text-white shadow-sm' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400'}`;
        btn.setAttribute('data-model', m.key);
        btn.innerHTML = `
          <div>
            <span class="text-xs font-bold block ${m.key === selectedModel ? 'text-amber-400' : 'text-brand-navy'}">${m.label}</span>
            <span class="text-[10px] ${m.key === selectedModel ? 'text-slate-300' : 'text-slate-500'} block">${m.sub}</span>
          </div>
          <div class="mt-2 text-xs font-black ${m.key === selectedModel ? 'text-white' : 'text-brand-navy'}">
            ₹${c.price.toLocaleString('en-IN')}
          </div>
        `;
        btn.addEventListener('click', () => {
          selectedModel = m.key;
          carContainer.querySelectorAll('.modal-car-pill').forEach(b => {
            b.className = 'modal-car-pill p-2.5 rounded-xl border text-left flex flex-col justify-between transition border-slate-200 bg-slate-50 text-slate-700 hover:border-amber-400';
            b.querySelector('span:first-child').className = 'text-xs font-bold block text-brand-navy';
            b.querySelector('span:nth-child(2)').className = 'text-[10px] text-slate-500 block';
            b.querySelector('div:last-child').className = 'mt-2 text-xs font-black text-brand-navy';
          });
          btn.className = 'modal-car-pill p-2.5 rounded-xl border text-left flex flex-col justify-between transition border-brand-navy bg-brand-navy text-white shadow-sm';
          btn.querySelector('span:first-child').className = 'text-xs font-bold block text-amber-400';
          btn.querySelector('span:nth-child(2)').className = 'text-[10px] text-slate-300 block';
          btn.querySelector('div:last-child').className = 'mt-2 text-xs font-black text-white';

          updateModalPrice();
        });
        carContainer.appendChild(btn);
      });
    }

    updateModalPrice();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function updateModalPrice() {
    if (!currentPkg) return;
    const car = currentPkg.prices[selectedModel];
    if (!car) return;

    const priceEl = document.getElementById('modal-package-price');
    if (priceEl) {
      priceEl.innerHTML = `₹${car.price.toLocaleString('en-IN')} <span class="text-xs text-slate-500 font-normal">(${car.name})</span>`;
    }

    const bookBtn = document.getElementById('modal-book-now-btn');
    if (bookBtn) {
      bookBtn.onclick = () => {
        const text = `Hi Shukra Tours & Travels, I want to book the *${currentPkg.title}* (${currentPkg.duration}) with *${car.name}* at tariff *₹${car.price.toLocaleString('en-IN')}*. Please share available dates from Coimbatore.`;
        const url = `https://wa.me/919487641616?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        hideModal();
      };
    }
  }

  function hideModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkgKey = btn.getAttribute('data-package');
      showPackageDetails(pkgKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', hideModal);
  if (backdrop) backdrop.addEventListener('click', hideModal);
}

// 4. Plan Your Trip & Lead Forms
function initPlanTripModal() {
  const modal = document.getElementById('plan-trip-modal');
  const openBtns = document.querySelectorAll('.open-plan-trip-modal');
  const closeBtn = document.getElementById('close-plan-trip-modal');
  const backdrop = document.getElementById('modal-backdrop');

  function openModal(defaultDestination = '', defaultVehicle = '') {
    if (modal) {
      if (defaultDestination) {
        const destSelect = modal.querySelector('select[name="destination"]');
        if (destSelect) {
          for (let option of destSelect.options) {
            if (option.value.toLowerCase().includes(defaultDestination.toLowerCase()) || 
                option.text.toLowerCase().includes(defaultDestination.toLowerCase())) {
              destSelect.value = option.value;
              break;
            }
          }
        }
      }
      if (defaultVehicle) {
        const vehSelect = modal.querySelector('select[name="vehicle"]');
        if (vehSelect) {
          for (let option of vehSelect.options) {
            if (option.value.toLowerCase().includes(defaultVehicle.toLowerCase()) ||
                option.text.toLowerCase().includes(defaultVehicle.toLowerCase())) {
              vehSelect.value = option.value;
              break;
            }
          }
        }
      }
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dest = btn.getAttribute('data-destination') || '';
      const veh = btn.getAttribute('data-vehicle') || '';
      openModal(dest, veh);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// 5. WhatsApp Form Submissions
function initWhatsAppBookingForms() {
  const planTripForms = document.querySelectorAll('.plan-trip-form');
  planTripForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || 'Traveler';
      const phone = formData.get('phone') || '';
      const email = formData.get('email') || 'N/A';
      const destination = formData.get('destination') || 'Custom Tour';
      const travelStyle = formData.get('travelStyle') || 'Custom';
      const travelDate = formData.get('travelDate') || 'Upcoming';
      const duration = formData.get('duration') || 'Flexible';
      const passengers = formData.get('passengers') || '2';
      const vehicle = formData.get('vehicle') || 'Any AC Cab';
      const notes = formData.get('notes') || 'None';

      const whatsappMessage = 
`*NEW TOUR INQUIRY - Shukra Tours & Travels*
---------------------------------------
👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📍 *Destination:* ${destination}
🎯 *Travel Style:* ${travelStyle}
📅 *Travel Date:* ${travelDate}
⏳ *Duration:* ${duration}
👥 *Travelers:* ${passengers} Persons
🚗 *Car Model Preference:* ${vehicle}
📝 *Special Requests:* ${notes}
---------------------------------------
Sent via Shukra Tours & Travels Website`;

      showToast('Redirecting to WhatsApp to send your trip details...');
      
      setTimeout(() => {
        const whatsappUrl = `https://wa.me/919487641616?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        form.reset();
        const modal = document.getElementById('plan-trip-modal');
        if (modal && !modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      }, 1000);
    });
  });

  // Contact Form
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || 'Guest';
      const phone = formData.get('phone') || '';
      const message = formData.get('message') || '';
      const destination = formData.get('destination') || 'General Inquiry';

      const msg = `Hi Shukra Tours & Travels, my name is ${name} (${phone}). I have an inquiry regarding: *${destination}*. Message: "${message}". Please contact me with tariff details.`;
      
      showToast('Redirecting to WhatsApp chat with Shukra Tours...');
      setTimeout(() => {
        window.open(`https://wa.me/919487641616?text=${encodeURIComponent(msg)}`, '_blank');
        contactForm.reset();
      }, 1000);
    });
  }

  // Quick Hero Search Form
  const heroSearchForm = document.getElementById('hero-quick-search');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(heroSearchForm);
      const destination = formData.get('destination') || 'Top South India Tours';
      const date = formData.get('travelDate') || 'Soon';
      const passengers = formData.get('passengers') || '2';
      const interest = formData.get('interest') || 'Family Holiday';

      const text = `Hi Shukra Tours & Travels, I am planning a *${interest}* to *${destination}* starting around *${date}* for *${passengers}*. Please suggest best packages and cab tariff from Coimbatore.`;
      window.open(`https://wa.me/919487641616?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 text-sm font-medium border border-amber-500 pointer-events-none opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber-400 text-lg"></i><span>${message}</span>`;
  toast.classList.remove('opacity-0', '-translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', '-translate-y-4');
  }, 3500);
}

// Back to Top Button
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.remove('opacity-100');
      btn.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

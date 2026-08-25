// Data Models
const SLIDES_DATA = [
  {
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80",
    tag: "Campus & Infrastructure",
    title: "10-Story Clinical Tower & 2-Story Diagnostic Wing",
    desc: "Featuring expansive recovery lawns with evening rest benches for patient rejuvenation, backed by uninterrupted electrical power stations and organized multi-tier vehicle parking."
  },
  {
    image: "images/beds.jpg",
    tag: "Ground Floor Services",
    title: "Central Reception, MI Triage & 24/7 Dispensary",
    desc: "Rapid first-contact assessment, pharmacy dispensing, and an intelligent triage routing system built to ensure smooth crowd management even during peak weekend patient inflow."
  },
  {
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    tag: "Imaging & Departmental Floors",
    title: "Basement High-Field Radiology & Floor-Wise OPDs",
    desc: "State-of-the-art MRI, CT scanners, and nuclear imaging in the specialized basement wing, with distributed OPD units on every floor and executive suites for Administration, Accounts, and Quality Assurance."
  },
  {
    image: "images/doctors-team.jpg.webp",
    tag: "Care & Sanitation",
    title: "Renowned Medical Specialists & Sanitized Inpatient Suites",
    desc: "A dedicated ecosystem of veteran physicians, certified nurses, patient assistants, and professional hygienists maintaining sterile, HEPA-filtered wards for complete recovery."
  }
];

const SERVICES_DATA = [
  { id: "service-find-doctor", label: "Find a Doctor" },
  { id: "service-book-appointment", label: "Book Appointment" },
  { id: "service-diagnostic-reports", label: "Diagnostic & Lab Reports" },
  { id: "service-pharmacy", label: "Pharmacy / Medicine Order" },
  { id: "service-health-check", label: "Book Health Check" },
  { id: "service-blood-bank", label: "Blood Bank" }
];

const DEPARTMENT_LIST = [
  { name: "Cardiology", desc: "Comprehensive cardiac diagnostics, interventional catheterization, and post-op rehabilitation." },
  { name: "Neurology", desc: "Advanced stroke management, neuro-imaging, spinal therapeutics, and neuro-critical care." },
  { name: "Obstetrics & Gynaecology", desc: "Maternal-fetal medicine, high-risk birthing suites, and neonatal intensive support." },
  { name: "Oncology", desc: "Precision medical oncology, targeted chemotherapy suites, and surgical oncology care." },
  { name: "Dermatology", desc: "Clinical skin diagnostics, dermatosurgery, laser therapy, and allergy management." },
  { name: "Ophthalmology", desc: "Microsurgical cataract suites, vitreo-retinal therapies, and complete visual rehabilitation." },
  { name: "Nephrology", desc: "Round-the-clock hemodialysis, chronic kidney management, and renal care units." },
  { name: "Orthopaedics", desc: "Joint reconstruction, robotic arthroplasty, poly-trauma stabilization, and physiotherapy." },
  { name: "Paediatrics", desc: "Specialized pediatric emergency response, neonatal care (NICU), and child wellness." },
  { name: "Endocrinology", desc: "Advanced metabolic management, thyroid care, and tailored hormone balance programs." },
  { name: "Gastroenterology", desc: "Diagnostic endoscopy, hepatology care, and advanced digestive health therapies." },
  { name: "Haematology", desc: "Blood disorders, coagulopathy management, transfusion therapy, and marrow screening." },
  { name: "Nuclear Medicine", desc: "Theranostic radionuclide procedures, PET/SPECT diagnostic scanning and therapy." },
  { name: "Radiology", desc: "High-field 3T MRI, 128-slice CT scans, ultrasonography, and interventional radiography." },
  { name: "Pathology", desc: "Automated biochemistry, histopathology, molecular genetics, and clinical cytology." },
  { name: "Anesthesiology", desc: "Advanced perioperative care, multimodal pain management, neuro-anesthesia, and critical surgical resuscitation." }
];

const PATIENTS_GUIDE_LIST = [
  {
    title: "Hospital Operational Timings",
    desc: "General hospital operational timings are from morning 6:00 AM to evening 6:00 PM. The dedicated Trauma Centre and MI (Medical Inspection) Room operate 24x7x365 round the clock for all critical emergencies."
  },
  {
    title: "OPD Patient Guidelines",
    desc: "First-time patients must register at the central reception by providing a valid government identity card (such as Aadhaar Card, PAN Card, Voter ID, or Ration Card), open a new patient record file, and pay the registration fees. Returning/old patients can directly proceed to their respective OPD for consultation, follow-up opinions, or ongoing treatment."
  },
  {
    title: "Inpatient Admission Protocol",
    desc: "Hospital admission must be processed compulsorily through the central reception and not at the respective OPD counters. A valid doctor's prescription and government identity proof are mandatory along with payment of the admission fees."
  },
  {
    title: "Room, Dietary & Comfort Preferences",
    desc: "Admitted patients can select their preferred room category (General, Semi-Private, Deluxe Private, or Suites), customized food and dietary preferences, and tailored attendant accommodation options."
  },
  {
    title: "Medical & Health Insurance Affiliations",
    desc: "We are empaneled with major health insurance networks and aggregators including PolicyBazaar, Tata AIA, Star Health, HDFC ERGO, ICICI Lombard, Care Health, and leading TPAs for hassle-free cashless hospitalization and claim processing."
  },
  {
    title: "Visiting Hours & Entry Passes",
    desc: "Standard ward visiting slots are 10:00 AM – 12:00 PM and 05:00 PM – 07:00 PM. Entry to critical zones (ICU/NICU) is restricted strictly to one attendant with an authorized entry pass."
  },
  {
    title: "Patient Rights & Responsibilities",
    desc: "Guaranteed rights to informed clinical consent, privacy, medical records access, and second opinions, paired with the responsibility of accurate disclosure and respect for hospital quiet hours."
  },
  {
    title: "Campus Facilities & Amenities",
    desc: "We provide dedicated multi-tier vehicle parking, a 24/7 cafeteria, a clean canteen, spacious waiting halls, and affiliated rest rooms for attendants available at applicable nominal charges."
  },
  {
    title: "Discharge Procedure & Ambulance Service",
    desc: "Presence of an attendant is mandatory during discharge. The procedure includes clearance of all due charges, receipt of the final doctor's prescription along with prescribed medicines, and post-discharge instructions. Hospital ambulance support is available upon request if needed."
  },
  {
    title: "Emergency & Helpline Support",
    desc: "Instant round-the-clock emergency response via Helpline 1088, rapid trauma stabilization, and prioritized critical care dispatch teams."
  },
  {
    title: "Feedback & Grievance Redressal",
    desc: "Dedicated patient relation executives and quality assurance desks to record recommendations, feedback, and prompt grievance resolutions."
  }
];

const INVENTORIES_LIST = [
  {
    title: "Inpatient Hospital Rooms",
    desc: "Total Room Capacity: 280 suites comprising 40 Ultra-Deluxe Suites, 90 Single Private Rooms, 80 Semi-Private Twin Sharing Rooms, and 70 General/Triage Inpatient Wards."
  },
  {
    title: "Hospital Beds & Intensive Care Units",
    desc: "Total Bed Strength: 450 certified hospital beds, including 80 motorized 5-function ICU/CCU critical care beds and 370 multi-position Fowler ward beds."
  },
  {
    title: "Ward Furniture & Patient Support Stations",
    desc: "Equipped with 450 hydraulic overbed food tables, 450 anti-microbial bedside locker cabinets, and 700 ergonomic reclining attendant chairs across all wings."
  },
  {
    title: "Bed Linen, Sterile Sheets & Patient Clothing",
    desc: "Stock of 2,400 thermal-disinfected cotton bedsheets, 1,800 sanitized patient hospital gowns, 1,200 heavy thermal fleece blankets, and 1,000 waterproof medical pillows."
  },
  {
    title: "Cardiovascular, Respiratory & Critical Medicines",
    desc: "32,000 strips of antihypertensives/statins, 6,500 vials of heparin/enoxaparin thrombolytics, and 12,000 unit-dose respiratory nebulization solutions."
  },
  {
    title: "Antibiotics, Pain Formulations & General Medicines",
    desc: "45,000 strips/vials of broad-spectrum antibiotics, 50,000 strips of analgesics/antipyretics (Paracetamol, Tramadol), and 38,000 gastrointestinal formulations."
  },
  {
    title: "Emergency Life-Saving Injections & Sedatives",
    desc: "18,000 ampoules of critical emergency injectables (Adrenaline, Atropine, Noradrenaline, Dopamine) and 8,500 vials of general anesthetic/sedative injectables."
  },
  {
    title: "IV Infusions, Cannulas & Supporting Medical Materials",
    desc: "22,000 bottles of IV fluids (Normal Saline, Ringer's Lactate, Dextrose 5%), 95,000 disposable sterile syringes, 30,000 IV cannulas, and 25,000 micro-drip infusion sets."
  },
  {
    title: "Kitchen Cooking Equipment & Heavy Utensils",
    desc: "16 commercial heavy-duty dual induction and flame burners, 65 large-capacity stainless steel cooking vessels, steam soup caldrons, and industrial rice steamers."
  },
  {
    title: "Dry Grains, Dairy & Raw Food Supplies",
    desc: "4,500 kg reserve buffer of certified organic food grains, pulses, clinical dietary supplements, pure dairy reserves, and cold-stored vegetables managed under FSSAI norms."
  },
  {
    title: "Dining Trays, Crockery & Attendant Cutlery",
    desc: "1,200 sets of hospital-grade stainless steel portion trays with thermal lids, 3,500 sanitized spoons/forks, and 250 insulated bedside food delivery carriers."
  },
  {
    title: "Commercial Gas Reserves & Potable Water Utilities",
    desc: "45 commercial 47.5 kg LPG cylinders on an automated manifold system, backed by a 2,00,000-liter dedicated treated water reservoir with dual 5,000 LPH RO purification units."
  }
];

// Navigation Drawer Items Structure
const DRAWER_ITEMS = [
  { id: "drawer-btn-home", label: "Home", interactive: true },
  { id: "drawer-btn-departments", label: "Departments", interactive: true },
  { id: "drawer-btn-inventories", label: "Inventories", interactive: true },
  { id: "drawer-btn-blood-bank", label: "Blood Bank", interactive: false },
  { id: "drawer-btn-doctors", label: "Doctors and faculties", interactive: false },
  { id: "drawer-btn-patients-corner", label: "Patient's Corner", interactive: true },
  { id: "drawer-btn-about-us", label: "About Us", interactive: true },
  { id: "drawer-btn-contact-us", label: "Contact Us", interactive: true }
];

// App State & Mounting
const appRoot = document.getElementById("app-root");
let activeIndex = 0;
let autoPlayTimer = null;

// Helper: Update Navigation Header Active State
function setActiveNavButton(activeId) {
  const navButtons = ["btn-home", "btn-departments", "btn-patients-guide", "btn-discover", "btn-research"];
  navButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === activeId) {
        btn.classList.add("nav-active");
      } else {
        btn.classList.remove("nav-active");
      }
    }
  });
}

// Template Generators
function createHomeViewTemplate() {
  const slidesHTML = SLIDES_DATA.map((slide, idx) => `
    <div class="slide ${idx === 0 ? "active" : ""}" data-index="${idx}">
      <div class="slide-media" style="background-image: url('${slide.image}');"></div>
      <div class="slide-content-overlay">
        <span class="slide-tag">${slide.tag}</span>
        <h2 class="slide-headline">${slide.title}</h2>
        <p class="slide-description">${slide.desc}</p>
      </div>
    </div>
  `).join("");

  const dotsHTML = SLIDES_DATA.map((_, idx) => `
    <button class="dot-btn ${idx === 0 ? "active" : ""}" data-slide="${idx}" aria-label="Slide ${idx + 1}"></button>
  `).join("");

  const servicesHTML = SERVICES_DATA.map((svc) => `
    <button class="service-item" id="${svc.id}" type="button">${svc.label}</button>
  `).join("");

  return `
    <div id="home-view">
      <section class="hero-slider-section">
        <div class="slider-frame" id="slider-frame">
          ${slidesHTML}
          <button class="slider-arrow-btn prev" id="btn-prev-slide" aria-label="Previous Slide">&#10094;</button>
          <button class="slider-arrow-btn next" id="btn-next-slide" aria-label="Next Slide">&#10095;</button>
          <div class="slider-progress-line running" id="progress-line"></div>
        </div>
        <div class="slider-dots">${dotsHTML}</div>
      </section>

      <section class="services-section">
        <div class="services-flexbox">${servicesHTML}</div>
      </section>

      <section class="info-section">
        <h2 class="info-heading">Clinical Excellence at Evercare Hospitals – Mumbai’s Leading Multispeciality Healthcare Network</h2>
        <p class="info-paragraph">
          From preventive health check-ups and routine consultations to complex tertiary treatments, Evercare Hospitals is trusted for personalized, compassionate, and high-quality care across every stage of the medical journey. Our hospital houses world-class departments offering specialized interventions in <strong>Cardiology, Neurology, Obstetrics & Gynaecology, Oncology, Dermatology, Ophthalmology, Nephrology, Orthopaedics, Paediatrics, Endocrinology, Gastroenterology, Haematology, Nuclear Medicine, Radiology, Pathology,</strong> and <strong>Anesthesiology</strong>.
        </p>
        <p class="info-paragraph">
          To ensure clinical precision and timely treatments, our 24/7 diagnostic network offers an exhaustive range of advanced blood investigations, molecular pathology tests, biochemistry profiles, histopathology screenings, and microbiological cultures. Complemented by next-generation imaging—including high-resolution MRI, multi-slice CT scanners, digital mammography, and modern nuclear medicine suites—our laboratory ecosystem ensures rapid, unerring diagnostic outcomes alongside an accredited round-the-clock Blood Bank.
        </p>
        <p class="info-paragraph">
          Behind our clinical excellence stands a team of nationally and internationally renowned doctors, veteran surgeons, certified nurses, and dedicated paramedical professionals committed to individualized, empathetic care. Every inpatient ward, ICU, and private suite is designed to maintain the highest standards of sterilization, HEPA-filtered air circulation, automated climate control, and ergonomic patient monitoring to ensure optimal healing, safety, and utmost comfort during recovery.
        </p>
      </section>
    </div>
  `;
}

function createDepartmentsViewTemplate() {
  const cardsHTML = DEPARTMENT_LIST.map((dept, index) => {
    const formattedNum = (index + 1).toString().padStart(2, "0");
    return `
      <div class="dept-card">
        <div class="dept-number-badge">${formattedNum}</div>
        <div class="dept-details">
          <h3>${dept.name}</h3>
          <p>${dept.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  return `
    <section class="departments-page-section" id="departments-view" style="display: block;">
      <div class="dept-page-header">
        <h2 class="dept-page-title">Specialised Medical Departments</h2>
        <p class="dept-page-subtitle">Evercare Hospital houses premier multispeciality divisions providing comprehensive tertiary consultations, surgical interventions, and advanced diagnostic monitoring.</p>
      </div>
      <div class="departments-series-grid">${cardsHTML}</div>
    </section>
  `;
}

function createPatientsGuideViewTemplate() {
  const cardsHTML = PATIENTS_GUIDE_LIST.map((guide, index) => {
    const formattedNum = (index + 1).toString().padStart(2, "0");
    return `
      <div class="dept-card">
        <div class="dept-number-badge">${formattedNum}</div>
        <div class="dept-details">
          <h3>${guide.title}</h3>
          <p>${guide.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  return `
    <section class="departments-page-section" id="patients-guide-view" style="display: block;">
      <div class="dept-page-header">
        <h2 class="dept-page-title">Patient & Visitor Comprehensive Guide</h2>
        <p class="dept-page-subtitle">Essential protocols, operational hours, admission workflows, and hospital guidelines designed to ensure a seamless healthcare experience.</p>
      </div>
      <div class="departments-series-grid">${cardsHTML}</div>
      <div style="margin-top: 35px; text-align: center; color: #64748b; font-size: 1.05rem; font-style: italic;">
        * Terms and Conditions Apply. Hospital protocols and service charges are subject to clinical and administrative review.
      </div>
    </section>
  `;
}

function createAboutUsViewTemplate() {
  return `
    <section class="departments-page-section" id="about-us-view" style="display: block;">
      <div class="info-section" style="margin: 0 auto; opacity: 1; animation: none;">
        <h2 class="info-heading">About Evercare Hospital – Advanced Multispeciality Healthcare Network</h2>
        
        <p class="info-paragraph">
          Evercare Hospital stands as a premier multispeciality healthcare institution dedicated to delivering world-class tertiary medicine, cutting-edge clinical interventions, and compassionate healing across Western India. Established with a visionary mandate to bridge specialized surgical precision with accessible patient-first care, our state-of-the-art medical tower in Mumbai integrates advanced diagnostic ecosystems, robotic-assisted surgical theaters, and specialized intensive care units designed under stringent international healthcare benchmarks.
        </p>

        <p class="info-paragraph">
          Governed by a distinguished medical advisory board of veteran physicians, internationally trained surgeons, and certified clinical administrators, Evercare Hospital prioritizes patient safety, clinical transparency, and evidence-based diagnostics across every touchpoint. Fully accredited by leading national and international quality bodies (NABH & NABL), our infrastructure boasts high-field 3T MRI, 128-slice multi-detector CT imaging, automated laminar-flow HEPA-filtered operating rooms, accredited 24x7 blood bank reserves, and rapid trauma resuscitation units. Beyond advanced clinical treatments, we remain deeply invested in community health, organizing regular preventive health checkup drives, medical camps, and wellness initiatives to nurture lifelong community vitality.
        </p>

        <p class="info-paragraph">
          At Evercare, our overarching ethos centers on providing seamless physical and psychological comfort for patients and their families. From transparent treatment billing frameworks and dedicated cashless insurance desks to ergonomic inpatient recovery suites and individualized nutritional support, our entire medical family remains steadfast in its pledge: Advanced Medicine, Trusted Care, and Lifelong Healing.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1.5px solid #bae6fd;">
          <h3 style="color: #0369a1; font-size: 1.35rem; font-weight: 700; margin-bottom: 12px;">Get in Touch / Hospital Contact Details</h3>
          <p style="font-size: 1.1rem; line-height: 1.8; color: #334155;">
            📍 <strong>Address:</strong> EverCare Hospital Campus, Dr. Ernest Borges Road, Parel, Mumbai, Maharashtra 400012<br>
            📞 <strong>Direct Board Lines:</strong> <a href="tel:+912224177000" style="color: #0284c7; text-decoration: none; font-weight: 600;">+91-22-24177000</a>, <a href="tel:+912224177300" style="color: #0284c7; text-decoration: none; font-weight: 600;">+91-22-24177300</a><br>
            🚨 <strong>24/7 Emergency & Ambulance Helpline:</strong> <span style="color: #dc2626; font-weight: 700;">1088 / 108</span><br>
            ✉️ <strong>General Enquiry & Support:</strong> <a href="mailto:support@evercarehospital.org" style="color: #0284c7; text-decoration: none; font-weight: 600;">support@evercarehospital.org</a>
          </p>
        </div>
      </div>
    </section>
  `;
}

function createInventoriesViewTemplate() {
  const cardsHTML = INVENTORIES_LIST.map((item, index) => {
    const formattedNum = (index + 1).toString().padStart(2, "0");
    return `
      <div class="dept-card">
        <div class="dept-number-badge">${formattedNum}</div>
        <div class="dept-details">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  return `
    <section class="departments-page-section" id="inventories-view" style="display: block;">
      <div class="dept-page-header">
        <h2 class="dept-page-title">Hospital Inventories & Clinical Supplies</h2>
        <p class="dept-page-subtitle">Real-time breakdown of our hospital infrastructure, medical supplies, pharmaceuticals, clinical consumables, and food utility stocks.</p>
      </div>
      <div class="departments-series-grid">${cardsHTML}</div>
    </section>
  `;
}

// Drawer Injection
function renderDrawer() {
  const drawerContainer = document.getElementById("drawer-nav-list");
  if (!drawerContainer) return;
  drawerContainer.innerHTML = DRAWER_ITEMS.map((item) => `
    <li class="drawer-nav-item">
      <button class="drawer-nav-btn ${item.interactive ? "" : "drawer-static"}" id="${item.id}">
        ${item.label} <span>&rsaquo;</span>
      </button>
    </li>
  `).join("");
}

// Slider Functionality
function initSlider() {
  const allSlides = document.querySelectorAll(".slide");
  const allDots = document.querySelectorAll(".dot-btn");
  const progressBar = document.getElementById("progress-line");
  const sliderFrame = document.getElementById("slider-frame");
  const prevBtn = document.getElementById("btn-prev-slide");
  const nextBtn = document.getElementById("btn-next-slide");

  if (!sliderFrame) return;

  function resetProgressBar() {
    if (!progressBar) return;
    progressBar.classList.remove("running");
    void progressBar.offsetWidth;
    progressBar.classList.add("running");
  }

  function selectSlide(targetIndex) {
    if (!allSlides.length) return;
    allSlides[activeIndex].classList.remove("active");
    allDots[activeIndex].classList.remove("active");

    activeIndex = (targetIndex + SLIDES_DATA.length) % SLIDES_DATA.length;

    allSlides[activeIndex].classList.add("active");
    allDots[activeIndex].classList.add("active");
    resetProgressBar();
  }

  function goToNextSlide() { selectSlide(activeIndex + 1); }
  function goToPrevSlide() { selectSlide(activeIndex - 1); }

  function startSliderAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(goToNextSlide, 7000);
  }

  nextBtn?.addEventListener("click", (e) => { e.stopPropagation(); goToNextSlide(); startSliderAutoPlay(); });
  prevBtn?.addEventListener("click", (e) => { e.stopPropagation(); goToPrevSlide(); startSliderAutoPlay(); });
  allDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-slide"), 10);
      selectSlide(idx);
      startSliderAutoPlay();
    });
  });

  sliderFrame.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    goToNextSlide();
    startSliderAutoPlay();
  });

  startSliderAutoPlay();
}

// Wait for Smooth Scroll to Finish, then trigger Slow Blink
function navigateAndHighlightContact() {
  const footerContainer = document.querySelector(".bottom-container");
  if (!footerContainer) return;

  footerContainer.scrollIntoView({ behavior: "smooth" });

  let scrollTimeout;
  const onScrollEnd = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      window.removeEventListener("scroll", onScrollEnd);

      footerContainer.classList.remove("footer-container-blink");
      void footerContainer.offsetWidth; // Force DOM reflow
      footerContainer.classList.add("footer-container-blink");
    }, 150);
  };

  window.addEventListener("scroll", onScrollEnd);
  scrollTimeout = setTimeout(onScrollEnd, 600);
}

// Router & View Mount Functions
function renderHome() {
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createHomeViewTemplate();
  setActiveNavButton("btn-home");
  initSlider();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDepartments() {
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createDepartmentsViewTemplate();
  setActiveNavButton("btn-departments");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPatientsGuide() {
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createPatientsGuideViewTemplate();
  setActiveNavButton("btn-patients-guide");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAboutUs() {
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createAboutUsViewTemplate();
  setActiveNavButton("btn-discover");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderInventories() {
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createInventoriesViewTemplate();
  setActiveNavButton(null);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Navigation & Events
function initAppEvents() {
  renderDrawer();

  // Header Nav Actions
  document.getElementById("btn-home")?.addEventListener("click", renderHome);
  document.getElementById("btn-discover")?.addEventListener("click", renderAboutUs);
  document.getElementById("btn-departments")?.addEventListener("click", renderDepartments);
  document.getElementById("btn-patients-guide")?.addEventListener("click", renderPatientsGuide);
  document.getElementById("header-logo-btn")?.addEventListener("click", renderHome);
  document.getElementById("footer-logo-btn")?.addEventListener("click", renderHome);
  document.getElementById("footer-link-home")?.addEventListener("click", renderHome);

  // Drawer Toggles
  const navDrawer = document.getElementById("nav-drawer");
  const navDrawerBackdrop = document.getElementById("nav-drawer-backdrop");
  const navToggleBtn = document.getElementById("nav-toggle-btn");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");

  const openDrawer = () => {
    navDrawer?.classList.add("active");
    navDrawerBackdrop?.classList.add("active");
  };

  const closeDrawer = () => {
    navDrawer?.classList.remove("active");
    navDrawerBackdrop?.classList.remove("active");
  };

  navToggleBtn?.addEventListener("click", openDrawer);
  drawerCloseBtn?.addEventListener("click", closeDrawer);
  navDrawerBackdrop?.addEventListener("click", closeDrawer);

  // Drawer Nav Button Actions
  document.getElementById("drawer-btn-home")?.addEventListener("click", () => { closeDrawer(); renderHome(); });
  document.getElementById("drawer-btn-departments")?.addEventListener("click", () => { closeDrawer(); renderDepartments(); });
  document.getElementById("drawer-btn-inventories")?.addEventListener("click", () => { closeDrawer(); renderInventories(); });
  document.getElementById("drawer-btn-patients-corner")?.addEventListener("click", () => { closeDrawer(); renderPatientsGuide(); });
  document.getElementById("drawer-btn-about-us")?.addEventListener("click", () => { closeDrawer(); renderAboutUs(); });

  // Contact Us Buttons (Header & Navigation Drawer)
  document.getElementById("btn-contact-us")?.addEventListener("click", () => {
    navigateAndHighlightContact();
  });

  document.getElementById("drawer-btn-contact-us")?.addEventListener("click", () => {
    closeDrawer();
    navigateAndHighlightContact();
  });

  // Footer static dialogs
  document.getElementById("footer-link-disclaimer")?.addEventListener("click", () => {
    alert("Evercare Hospital Disclaimer: The medical information provided on this portal is for general awareness and emergency assistance.");
  });

  document.getElementById("footer-link-terms")?.addEventListener("click", () => {
    alert("Evercare Hospital Terms & Conditions: All patient booking services, diagnostics, and appointments are subject to clinical verification.");
  });

  // Live Timestamp
  function updateLiveTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    const el = document.getElementById("live-last-update");
    if (el) el.textContent = `last update: ${formatted}`;
  }
  updateLiveTimestamp();
  setInterval(updateLiveTimestamp, 1000);
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initAppEvents();
  renderHome();
});
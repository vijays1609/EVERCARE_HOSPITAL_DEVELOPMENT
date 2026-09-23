// --- Data Models ---
const SLIDES_DATA = [
  {
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=80",
    tag: "Campus & Infrastructure",
    title: "10-Story Clinical Tower & 2-Story Diagnostic Wing",
    desc: "Featuring expansive recovery lawns with evening rest benches for patient rejuvenation, backed by uninterrupted electrical power stations and organized multi-tier vehicle parking.",
  },
  {
    image: "images/beds.jpg",
    tag: "Ground Floor Services",
    title: "Central Reception, MI Triage & 24/7 Dispensary",
    desc: "Rapid first-contact assessment, pharmacy dispensing, and an intelligent triage routing system built to ensure smooth crowd management even during peak weekend patient inflow.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    tag: "Imaging & Departmental Floors",
    title: "Basement High-Field Radiology & Floor-Wise OPDs",
    desc: "State-of-the-art MRI, CT scanners, and nuclear imaging in the specialized basement wing, with distributed OPD units on every floor and executive suites for Administration, Accounts, and Quality Assurance.",
  },
  {
    image: "images/doctors-team.jpg.webp",
    tag: "Care & Sanitation",
    title: "Renowned Medical Specialists & Sanitized Inpatient Suites",
    desc: "A dedicated ecosystem of veteran physicians, certified nurses, patient assistants, and professional hygienists maintaining sterile, HEPA-filtered wards for complete recovery.",
  },
];

const SERVICES_DATA = [
  { id: "service-find-doctor", label: "Find a Doctor" },
  { id: "service-book-appointment", label: "Book Appointment" },
  { id: "service-diagnostic-reports", label: "Diagnostic & Lab Reports" },
  { id: "service-pharmacy", label: "Pharmacy / Medicine Order" },
  { id: "service-health-check", label: "Book Health Check" },
  { id: "service-blood-bank", label: "Blood Bank" },
];

const DOCTORS_DATA = [
  [
    "Dr. Aarav Mehta",
    "MD, DM Cardiology",
    "AIIMS New Delhi",
    "Interventional Cardiology",
    "18 years",
    1800,
    "Cardiology",
  ],
  [
    "Dr. Ananya Iyer",
    "MBBS, MD Neurology",
    "Christian Medical College, Vellore",
    "Stroke and epilepsy care",
    "14 years",
    1500,
    "Neurology",
  ],
  [
    "Dr. Rohan Kulkarni",
    "MS, DNB Orthopaedics",
    "Seth GS Medical College, Mumbai",
    "Joint replacement and sports injury",
    "16 years",
    1600,
    "Orthopaedics",
  ],
  [
    "Dr. Kavya Nair",
    "MD, DNB Obstetrics & Gynaecology",
    "Kasturba Medical College, Manipal",
    "High-risk pregnancy and fertility",
    "12 years",
    1400,
    "Obstetrics & Gynaecology",
  ],
  [
    "Dr. Vikram Rao",
    "MD, DM Oncology",
    "Tata Memorial Centre, Mumbai",
    "Medical oncology and immunotherapy",
    "21 years",
    2200,
    "Oncology",
  ],
  [
    "Dr. Ishita Sen",
    "MD Dermatology",
    "PGIMER Chandigarh",
    "Clinical dermatology and dermatosurgery",
    "11 years",
    1300,
    "Dermatology",
  ],
  [
    "Dr. Nikhil Bansal",
    "MS Ophthalmology",
    "Aravind Eye Hospital, Madurai",
    "Cataract and retinal surgery",
    "15 years",
    1200,
    "Ophthalmology",
  ],
  [
    "Dr. Meera Joshi",
    "DM Nephrology",
    "Institute of Kidney Diseases, Ahmedabad",
    "Dialysis and transplant medicine",
    "19 years",
    1700,
    "Nephrology",
  ],
  [
    "Dr. Aditya Deshpande",
    "MD Paediatrics",
    "King Edward Memorial Hospital, Pune",
    "Child health and neonatology",
    "13 years",
    1100,
    "Paediatrics",
  ],
  [
    "Dr. Sanya Kapoor",
    "MD Endocrinology",
    "AIIMS Rishikesh",
    "Diabetes and thyroid disorders",
    "10 years",
    1400,
    "Endocrinology",
  ],
  [
    "Dr. Harsh Vardhan",
    "DM Gastroenterology",
    "PGIMER Chandigarh",
    "Endoscopy and liver disease",
    "17 years",
    1800,
    "Gastroenterology",
  ],
  [
    "Dr. Priya Menon",
    "MD Haematology",
    "Christian Medical College, Vellore",
    "Blood disorders and transfusion medicine",
    "15 years",
    1550,
    "Haematology",
  ],
  [
    "Dr. Sameer Chatterjee",
    "MD Radiology",
    "R G Kar Medical College, Kolkata",
    "Cross-sectional and emergency imaging",
    "20 years",
    1000,
    "Radiology",
  ],
  [
    "Dr. Neelam Patil",
    "MD Pathology",
    "BJ Medical College, Pune",
    "Molecular pathology and cytology",
    "12 years",
    900,
    "Pathology",
  ],
  [
    "Dr. Manav Suri",
    "MD Nuclear Medicine",
    "AIIMS New Delhi",
    "PET-CT and theranostics",
    "14 years",
    1700,
    "Nuclear Medicine",
  ],
  [
    "Dr. Aditi Verma",
    "MD Anaesthesiology",
    "Banaras Hindu University, Varanasi",
    "Critical care and pain medicine",
    "16 years",
    1300,
    "Anesthesiology",
  ],
  [
    "Dr. Rajiv Khanna",
    "MS General Surgery",
    "Maulana Azad Medical College, Delhi",
    "Laparoscopic and gastrointestinal surgery",
    "23 years",
    1900,
    "General Surgery",
  ],
  [
    "Dr. Tanvi Shah",
    "MD Pulmonology",
    "B J Medical College, Ahmedabad",
    "Asthma, COPD and sleep medicine",
    "13 years",
    1450,
    "Pulmonology",
  ],
  [
    "Dr. Arjun Pillai",
    "MD Psychiatry",
    "NIMHANS Bengaluru",
    "Adult psychiatry and addiction care",
    "15 years",
    1250,
    "Psychiatry",
  ],
  [
    "Dr. Swati Gupta",
    "MD General Medicine",
    "Lady Hardinge Medical College, Delhi",
    "Preventive medicine and chronic care",
    "18 years",
    1000,
    "General Medicine",
  ],
].map(
  ([
    name,
    qualification,
    education,
    specialization,
    experience,
    fees,
    department,
  ]) => ({
    name,
    qualification,
    education,
    specialization,
    experience,
    fees,
    department,
  }),
);

const APPOINTMENT_TYPES = [
  { id: "regular", label: "Regular Appointments" },
  { id: "health-check", label: "Health Check-up Appointments" },
  { id: "blood-donation", label: "Blood Donation Appointments" },
];

const REPORT_DATA = [
  {
    patientId: "EVR-1001",
    date: "2026-08-12",
    name: "Aarav Mehta",
    age: 42,
    phone: "9876543210",
    doctor: "Dr. Vikram Rao",
    department: "Haematology",
    test: "Complete Blood Count",
    values: [
      ["Haemoglobin", "13.8 g/dL", "12-16"],
      ["WBC", "7,400 /uL", "4,000-11,000"],
      ["Platelets", "2.42 lakh/uL", "1.5-4.5 lakh"],
    ],
    conclusion:
      "Haematology values are within the stated reference ranges. Clinical correlation is advised.",
  },
  {
    patientId: "EVR-1002",
    date: "2026-08-18",
    name: "Isha Nair",
    age: 29,
    phone: "9812345670",
    doctor: "Dr. Kavya Nair",
    department: "Obstetrics & Gynaecology",
    test: "Liver Function Test",
    values: [
      ["Bilirubin Total", "0.8 mg/dL", "0.3-1.2"],
      ["ALT", "24 U/L", "7-35"],
      ["Albumin", "4.1 g/dL", "3.5-5.0"],
    ],
    conclusion:
      "Liver function markers are within the stated reference ranges. Discuss with the treating clinician.",
  },
  {
    patientId: "EVR-1003",
    date: "2026-08-22",
    name: "Mohan Joshi",
    age: 67,
    phone: "9988776655",
    doctor: "Dr. Meera Joshi",
    department: "Nephrology",
    test: "Renal Function Test",
    values: [
      ["Creatinine", "0.98 mg/dL", "0.7-1.3"],
      ["Urea", "28 mg/dL", "15-45"],
      ["eGFR", "82 mL/min/1.73m2", ">60"],
    ],
    conclusion:
      "Reported renal markers are within the stated reference ranges. Continue clinical follow-up as prescribed.",
  },
  {
    patientId: "EVR-1004",
    date: "2026-08-25",
    name: "Ritesh Sinha",
    age: 51,
    phone: "9765432109",
    doctor: "Dr. Sameer Chatterjee",
    department: "Radiology",
    test: "CT Chest",
    values: [
      ["Study", "HRCT chest", "See impression"],
      ["Dose", "Standard protocol", "Recorded"],
      ["Report status", "Verified", "Radiologist signed"],
    ],
    conclusion:
      "No acute abnormality is identified in the submitted study. Clinical correlation is recommended.",
  },
  {
    patientId: "EVR-1005",
    date: "2026-08-27",
    name: "Leela Rao",
    age: 58,
    phone: "9898989898",
    doctor: "Dr. Tanvi Shah",
    department: "Pulmonology",
    test: "Pulmonary Function Test (PFT)",
    values: [
      ["FVC", "3.12 L", "Predicted range"],
      ["FEV1", "2.61 L", "Predicted range"],
      ["FEV1/FVC", "83.7%", "Expected >70%"],
    ],
    conclusion:
      "Spirometry values are preserved in this test. Interpret with symptoms and examination findings.",
  },
  {
    patientId: "EVR-1006",
    date: "2026-08-30",
    name: "Suresh Patil",
    age: 72,
    phone: "9822001122",
    doctor: "Dr. Rohan Kulkarni",
    department: "Orthopaedics",
    test: "DEXA Bone Mineral Density",
    values: [
      ["Lumbar spine T-score", "-1.4", "-1 to -2.5 osteopenia"],
      ["Total hip T-score", "-1.1", "-1 to -2.5 osteopenia"],
      ["Quality", "Acceptable", "Technically valid"],
    ],
    conclusion:
      "Bone density is in the osteopenia range at the measured sites. Please discuss fall prevention and follow-up.",
  },
];

const MEDICINES_DATA = [
  {
    id: "paracetamol",
    name: "Paracetamol 500 mg",
    category: "Pain & fever",
    price: 35,
    prescription: false,
  },
  {
    id: "ors",
    name: "ORS Lemon Sachets",
    category: "Hydration",
    price: 60,
    prescription: false,
  },
  {
    id: "vitamin-d",
    name: "Vitamin D3 60K",
    category: "Wellness",
    price: 120,
    prescription: false,
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin 500 mg",
    category: "Antibiotic",
    price: 160,
    prescription: true,
  },
  {
    id: "insulin",
    name: "Human Insulin 100 IU",
    category: "Diabetes care",
    price: 480,
    prescription: true,
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin 10 mg",
    category: "Cardiac care",
    price: 90,
    prescription: true,
  },
];

const MEDICINE_LINKS = [
  ["Aciclovir (Zovirax)", "aciclovir"],
  ["Acrivastine", "acrivastine"],
  ["Adalimumab", "adalimumab"],
  ["Alendronic acid", "alendronic-acid"],
  ["Allopurinol", "allopurinol"],
  ["Alogliptin", "alogliptin"],
  ["Amitriptyline for depression", "amitriptyline-for-depression"],
  ["Amitriptyline for pain and migraine", "amitriptyline-for-pain"],
  ["Amlodipine", "amlodipine"],
  ["Amoxicillin", "amoxicillin"],
  ["Anastrozole", "anastrozole"],
  ["Antacids", "antacids"],
  ["Antibiotics", "antibiotics"],
  ["Anticoagulant medicines", "anticoagulants"],
  ["Antidepressants", "antidepressants"],
  ["Antifungal medicines", "antifungal-medicines"],
  ["Antihistamines", "antihistamines"],
  ["Apixaban", "apixaban"],
  ["Aripiprazole", "aripiprazole"],
  ["Aspirin", "aspirin"],
  ["Atenolol", "atenolol"],
  ["Atorvastatin", "atorvastatin"],
  ["Azathioprine", "azathioprine"],
  ["Azithromycin", "azithromycin"],
  ["Baclofen", "baclofen"],
  ["Beclometasone inhalers", "beclometasone-inhalers"],
  ["Beclometasone nasal spray", "beclometasone-nasal-sprays"],
  ["Beclometasone skin cream", "beclometasone-skin-creams"],
  ["Bendroflumethiazide", "bendroflumethiazide"],
  ["Benzoyl peroxide", "benzoyl-peroxide"],
  ["Benzydamine", "benzydamine"],
  ["Beta blockers", "beta-blockers"],
  ["Betahistine", "betahistine"],
  ["Betamethasone for eyes, ears and nose", "betamethasone-eyes-ears-and-nose"],
  ["Betamethasone for skin", "betamethasone-skin"],
  ["Bimatoprost (Lumigan)", "bimatoprost"],
  ["Bisacodyl", "bisacodyl"],
  ["Bismuth subsalicylate", "pepto-bismol"],
  ["Bisoprolol", "bisoprolol"],
  ["Brinzolamide", "brinzolamide"],
  ["Budesonide inhalers", "budesonide-inhalers"],
  ["Budesonide nasal spray", "budesonide-nasal-sprays"],
  ["Bumetanide", "bumetanide"],
  ["Buprenorphine for pain", "buprenorphine-for-pain"],
  ["Buscopan", "buscopan-hyoscine-butylbromide"],
  ["Calcipotriol", "calcipotriol"],
  ["Candesartan", "candesartan"],
  ["Carbamazepine", "carbamazepine"],
  ["Carbimazole", "carbimazole"],
  ["Carbocisteine", "carbocisteine"],
  ["Carmellose sodium eye drops", "carmellose-sodium"],
  ["Carvedilol", "carvedilol"],
  ["Cefalexin", "cefalexin"],
  ["Cetirizine", "cetirizine"],
  ["Chloramphenicol", "chloramphenicol"],
  ["Chlorhexidine", "chlorhexidine"],
  ["Chlorphenamine", "chlorphenamine-including-piriton"],
  ["Cinnarizine", "cinnarizine"],
  ["Ciprofloxacin", "ciprofloxacin"],
  ["Citalopram", "citalopram"],
  ["Clarithromycin", "clarithromycin"],
  ["Clobetasol", "clobetasol"],
  ["Clobetasone", "clobetasone"],
  ["Clonazepam", "clonazepam"],
  ["Clonidine", "clonidine"],
  ["Clopidogrel", "clopidogrel"],
  ["Clotrimazole", "clotrimazole"],
  ["Co-amoxiclav", "co-amoxiclav"],
  ["Codeine", "codeine"],
  ["Colchicine", "colchicine"],
  ["Colecalciferol", "colecalciferol"],
  ["Cyclizine", "cyclizine"],
  ["Dapagliflozin", "dapagliflozin"],
  ["Decongestants", "decongestants"],
  ["Dexamethasone eye drops", "dexamethasone-eye-drops"],
  ["Dexamethasone tablets and liquid", "dexamethasone-tablets-and-liquid"],
  ["Diazepam", "diazepam"],
  ["Diclofenac", "diclofenac"],
  ["Digoxin", "digoxin"],
  ["Diltiazem", "diltiazem"],
  ["Diphenhydramine", "diphenhydramine"],
  ["Doxycycline", "doxycycline"],
  ["Duloxetine", "duloxetine"],
  ["Edoxaban", "edoxaban"],
  ["Empagliflozin", "empagliflozin"],
  ["Enalapril", "enalapril"],
  ["Erythromycin", "erythromycin"],
  ["Escitalopram", "escitalopram"],
  ["Esomeprazole", "esomeprazole"],
  ["Felodipine", "felodipine"],
  ["Fentanyl", "fentanyl"],
  ["Ferrous fumarate", "ferrous-fumarate"],
  ["Fexofenadine", "fexofenadine"],
  ["Finasteride", "finasteride"],
  ["Flucloxacillin", "flucloxacillin"],
  ["Fluconazole", "fluconazole"],
  ["Fluoxetine", "fluoxetine"],
  ["Folic acid", "folic-acid"],
  ["Furosemide", "furosemide"],
  ["Gabapentin", "gabapentin"],
  ["Gaviscon", "gaviscon"],
  ["Gliclazide", "gliclazide"],
  ["Hydrocortisone", "hydrocortisone"],
  ["Hydroxychloroquine", "hydroxychloroquine"],
  ["Ibuprofen for adults", "ibuprofen-for-adults"],
  ["Insulin", "insulin"],
  ["Ketoconazole", "ketoconazole"],
  ["Lactulose", "lactulose"],
  ["Lansoprazole", "lansoprazole"],
  ["Levothyroxine", "levothyroxine"],
  ["Lisinopril", "lisinopril"],
  ["Losartan", "losartan"],
  ["Metformin", "metformin"],
  ["Methotrexate", "methotrexate"],
  ["Metoprolol", "metoprolol"],
  ["Montelukast", "montelukast"],
  ["Morphine", "morphine"],
  ["Naproxen", "naproxen"],
  ["Omeprazole", "omeprazole"],
  ["Pantoprazole", "pantoprazole"],
  ["Paracetamol for adults", "paracetamol-for-adults"],
  ["Prednisolone", "prednisolone"],
  ["Pregabalin", "pregabalin"],
  ["Propranolol", "propranolol"],
  ["Ramipril", "ramipril"],
  ["Rivaroxaban", "rivaroxaban"],
  ["Rosuvastatin", "rosuvastatin"],
  ["Salbutamol inhalers", "salbutamol-inhaler"],
  ["Sertraline", "sertraline"],
  ["Sildenafil", "sildenafil"],
  ["Simvastatin", "simvastatin"],
  ["Sitagliptin", "sitagliptin"],
  ["Spironolactone", "spironolactone"],
  ["Tadalafil", "tadalafil"],
  ["Tamsulosin", "tamsulosin"],
  ["Terbinafine", "terbinafine"],
  ["Tramadol", "tramadol"],
  ["Trimethoprim", "trimethoprim"],
  ["Valproic acid", "valproic-acid"],
  ["Valsartan", "valsartan"],
  ["Venlafaxine", "venlafaxine"],
  ["Verapamil", "verapamil"],
];

const MEDICINE_CATALOG = [
  ...MEDICINES_DATA,
  ...MEDICINE_LINKS.map(([name, slug], index) => ({
    id: `nhs-${slug}`,
    name,
    category: "Medicine catalogue",
    price: 100 + ((index * 37) % 450),
    prescription: true,
    url: `https://www.nhs.uk/medicines/${slug}/`,
  })),
].filter(
  (medicine, index, medicines) =>
    medicines.findIndex(
      (item) => item.name.toLowerCase() === medicine.name.toLowerCase(),
    ) === index,
);

function getStoredList(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}
function saveStoredList(key, list) {
  localStorage.setItem(key, JSON.stringify(list));
}
function currentUser() {
  return getAuthenticatedUser() || DEFAULT_ACCOUNT;
}
function appointmentDates() {
  return ["2026-10-02", "2026-10-03", "2026-10-05", "2026-10-07", "2026-10-10"];
}

const DEPARTMENT_LIST = [
  {
    name: "Cardiology",
    desc: "Comprehensive cardiac diagnostics, interventional catheterization, and post-op rehabilitation.",
  },
  {
    name: "Neurology",
    desc: "Advanced stroke management, neuro-imaging, spinal therapeutics, and neuro-critical care.",
  },
  {
    name: "Obstetrics & Gynaecology",
    desc: "Maternal-fetal medicine, high-risk birthing suites, and neonatal intensive support.",
  },
  {
    name: "Oncology",
    desc: "Precision medical oncology, targeted chemotherapy suites, and surgical oncology care.",
  },
  {
    name: "Dermatology",
    desc: "Clinical skin diagnostics, dermatosurgery, laser therapy, and allergy management.",
  },
  {
    name: "Ophthalmology",
    desc: "Microsurgical cataract suites, vitreo-retinal therapies, and complete visual rehabilitation.",
  },
  {
    name: "Nephrology",
    desc: "Round-the-clock hemodialysis, chronic kidney management, and renal care units.",
  },
  {
    name: "Orthopaedics",
    desc: "Joint reconstruction, robotic arthroplasty, poly-trauma stabilization, and physiotherapy.",
  },
  {
    name: "Paediatrics",
    desc: "Specialized pediatric emergency response, neonatal care (NICU), and child wellness.",
  },
  {
    name: "Endocrinology",
    desc: "Advanced metabolic management, thyroid care, and tailored hormone balance programs.",
  },
  {
    name: "Gastroenterology",
    desc: "Diagnostic endoscopy, hepatology care, and advanced digestive health therapies.",
  },
  {
    name: "Haematology",
    desc: "Blood disorders, coagulopathy management, transfusion therapy, and marrow screening.",
  },
  {
    name: "Nuclear Medicine",
    desc: "Theranostic radionuclide procedures, PET/SPECT diagnostic scanning and therapy.",
  },
  {
    name: "Radiology",
    desc: "High-field 3T MRI, 128-slice CT scans, ultrasonography, and interventional radiography.",
  },
  {
    name: "Pathology",
    desc: "Automated biochemistry, histopathology, molecular genetics, and clinical cytology.",
  },
  {
    name: "Anesthesiology",
    desc: "Advanced perioperative care, multimodal pain management, neuro-anesthesia, and critical surgical resuscitation.",
  },
];

const PATIENTS_GUIDE_LIST = [
  {
    title: "Hospital Operational Timings",
    desc: "General hospital operational timings are from morning 6:00 AM to evening 6:00 PM. The dedicated Trauma Centre and MI (Medical Inspection) Room operate 24x7x365 round the clock for all critical emergencies.",
  },
  {
    title: "OPD Patient Guidelines",
    desc: "First-time patients must register at the central reception by providing a valid government identity card (such as Identity Proof, PAN Card, Voter ID, or Ration Card), open a new patient record file, and pay the registration fees. Returning/old patients can directly proceed to their respective OPD for consultation, follow-up opinions, or ongoing treatment.",
  },
  {
    title: "Inpatient Admission Protocol",
    desc: "Hospital admission must be processed compulsorily through the central reception and not at the respective OPD counters. A valid doctor's prescription and government identity proof are mandatory along with payment of the admission fees.",
  },
  {
    title: "Room, Dietary & Comfort Preferences",
    desc: "Admitted patients can select their preferred room category (General, Semi-Private, Deluxe Private, or Suites), customized food and dietary preferences, and tailored attendant accommodation options.",
  },
  {
    title: "Medical & Health Insurance Affiliations",
    desc: "We are empaneled with major health insurance networks and aggregators including PolicyBazaar, Tata AIA, Star Health, HDFC ERGO, ICICI Lombard, Care Health, and leading TPAs for hassle-free cashless hospitalization and claim processing.",
  },
  {
    title: "Visiting Hours & Entry Passes",
    desc: "Standard ward visiting slots are 10:00 AM – 12:00 PM and 05:00 PM – 07:00 PM. Entry to critical zones (ICU/NICU) is restricted strictly to one attendant with an authorized entry pass.",
  },
  {
    title: "Patient Rights & Responsibilities",
    desc: "Guaranteed rights to informed clinical consent, privacy, medical records access, and second opinions, paired with the responsibility of accurate disclosure and respect for hospital quiet hours.",
  },
  {
    title: "Campus Facilities & Amenities",
    desc: "We provide dedicated multi-tier vehicle parking, a 24/7 cafeteria, a clean canteen, spacious waiting halls, and affiliated rest rooms for attendants available at applicable nominal charges.",
  },
  {
    title: "Discharge Procedure & Ambulance Service",
    desc: "Presence of an attendant is mandatory during discharge. The procedure includes clearance of all due charges, receipt of the final doctor's prescription along with prescribed medicines, and post-discharge instructions. Hospital ambulance support is available upon request if needed.",
  },
  {
    title: "Emergency & Helpline Support",
    desc: "Instant round-the-clock emergency response via Helpline 1088, rapid trauma stabilization, and prioritized critical care dispatch teams.",
  },
  {
    title: "Feedback & Grievance Redressal",
    desc: "Dedicated patient relation executives and quality assurance desks to record recommendations, feedback, and prompt grievance resolutions.",
  },
];

const INVENTORIES_LIST = [
  {
    title: "Inpatient Hospital Rooms",
    desc: "Total Room Capacity: 280 suites comprising 40 Ultra-Deluxe Suites, 90 Single Private Rooms, 80 Semi-Private Twin Sharing Rooms, and 70 General/Triage Inpatient Wards.",
  },
  {
    title: "Hospital Beds & Intensive Care Units",
    desc: "Total Bed Strength: 450 certified hospital beds, including 80 motorized 5-function ICU/CCU critical care beds and 370 multi-position Fowler ward beds.",
  },
  {
    title: "Ward Furniture & Patient Support Stations",
    desc: "Equipped with 450 hydraulic overbed food tables, 450 anti-microbial bedside locker cabinets, and 700 ergonomic reclining attendant chairs across all wings.",
  },
  {
    title: "Bed Linen, Sterile Sheets & Patient Clothing",
    desc: "Stock of 2,400 thermal-disinfected cotton bedsheets, 1,800 sanitized patient hospital gowns, 1,200 heavy thermal fleece blankets, and 1,000 waterproof medical pillows.",
  },
  {
    title: "Cardiovascular, Respiratory & Critical Medicines",
    desc: "32,000 strips of antihypertensives/statins, 6,500 vials of heparin/enoxaparin thrombolytics, and 12,000 unit-dose respiratory nebulization solutions.",
  },
  {
    title: "Antibiotics, Pain Formulations & General Medicines",
    desc: "45,000 strips/vials of broad-spectrum antibiotics, 50,000 strips of analgesics/antipyretics (Paracetamol, Tramadol), and 38,000 gastrointestinal formulations.",
  },
  {
    title: "Emergency Life-Saving Injections & Sedatives",
    desc: "18,000 ampoules of critical emergency injectables (Adrenaline, Atropine, Noradrenaline, Dopamine) and 8,500 vials of general anesthetic/sedative injectables.",
  },
  {
    title: "IV Infusions, Cannulas & Supporting Medical Materials",
    desc: "22,000 bottles of IV fluids (Normal Saline, Ringer's Lactate, Dextrose 5%), 95,000 disposable sterile syringes, 30,000 IV cannulas, and 25,000 micro-drip infusion sets.",
  },
  {
    title: "Kitchen Cooking Equipment & Heavy Utensils",
    desc: "16 commercial heavy-duty dual induction and flame burners, 65 large-capacity stainless steel cooking vessels, steam soup caldrons, and industrial rice steamers.",
  },
  {
    title: "Dry Grains, Dairy & Raw Food Supplies",
    desc: "4,500 kg reserve buffer of certified organic food grains, pulses, clinical dietary supplements, pure dairy reserves, and cold-stored vegetables managed under FSSAI norms.",
  },
  {
    title: "Dining Trays, Crockery & Attendant Cutlery",
    desc: "1,200 sets of hospital-grade stainless steel portion trays with thermal lids, 3,500 sanitized spoons/forks, and 250 insulated bedside food delivery carriers.",
  },
  {
    title: "Commercial Gas Reserves & Potable Water Utilities",
    desc: "45 commercial 47.5 kg LPG cylinders on an automated manifold system, backed by a 2,00,000-liter dedicated treated water reservoir with dual 5,000 LPH RO purification units.",
  },
];

const DRAWER_ITEMS = [
  { id: "drawer-btn-home", label: "Home", interactive: true },
  { id: "drawer-btn-departments", label: "Departments", interactive: true },
  { id: "drawer-btn-inventories", label: "Inventories", interactive: true },
  { id: "drawer-btn-blood-bank", label: "Blood Bank", interactive: false },
  {
    id: "drawer-btn-doctors",
    label: "Doctors and faculties",
    interactive: false,
  },
  {
    id: "drawer-btn-patients-corner",
    label: "Patient's Corner",
    interactive: true,
  },
  { id: "drawer-btn-about-us", label: "About Us", interactive: true },
  { id: "drawer-btn-contact-us", label: "Contact Us", interactive: true },
];

// --- User Storage & Default Account ---
const DEFAULT_ACCOUNT = {
  email: "singhvj1609@gmail.com",
  password: "root@1234",
  name: "Vijay Singh",
  age: 22,
  phone: "9820112233",
  department: "Cardiology",
};

function getRegisteredUsers() {
  const users = localStorage.getItem("evercare_users");
  if (!users) {
    const initialUsers = [DEFAULT_ACCOUNT];
    localStorage.setItem("evercare_users", JSON.stringify(initialUsers));
    return initialUsers;
  }
  return JSON.parse(users);
}

function saveUser(user) {
  const users = getRegisteredUsers();
  users.push(user);
  localStorage.setItem("evercare_users", JSON.stringify(users));
}

// Multi-step Registration State
let regState = {
  step: 1,
  data: { email: "", name: "", age: "", phone: "", department: "" },
  generatedOtp: null,
};

// Password Policy Validation (Min 10 chars, uppercase, lowercase, digit, special char)
function validateStrongPassword(password) {
  const minLength = 10;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (password.length < minLength) {
    return {
      valid: false,
      message: "Password must be at least 10 characters long.",
    };
  }
  if (!hasUpperCase) {
    return {
      valid: false,
      message: "Password must include at least one uppercase letter (A-Z).",
    };
  }
  if (!hasLowerCase) {
    return {
      valid: false,
      message: "Password must include at least one lowercase letter (a-z).",
    };
  }
  if (!hasDigit) {
    return {
      valid: false,
      message: "Password must include at least one numerical digit (0-9).",
    };
  }
  if (!hasSpecialChar) {
    return {
      valid: false,
      message:
        "Password must include at least one special character (!@#$%^&* etc.).",
    };
  }

  return { valid: true, message: "" };
}

// JWT Token Utilities
function setAuthToken(token) {
  localStorage.setItem("evercare_jwt_token", token);
}

function getAuthToken() {
  return localStorage.getItem("evercare_jwt_token");
}

function removeAuthToken() {
  localStorage.removeItem("evercare_jwt_token");
}

function getAuthenticatedUser() {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      removeAuthToken();
      return null;
    }

    return (
      getRegisteredUsers().find(
        (user) => user.email.toLowerCase() === payload.sub.toLowerCase(),
      ) || null
    );
  } catch {
    removeAuthToken();
    return null;
  }
}

function generateMockJWT(payload) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(
    JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 }),
  );
  const signature = btoa("evercare_secure_signature");
  return `${header}.${body}.${signature}`;
}

// App State
const appRoot = document.getElementById("app-root");
let activeIndex = 0;
let autoPlayTimer = null;

function setActiveNavButton(activeId) {
  const navButtons = [
    "btn-home",
    "btn-departments",
    "btn-patients-guide",
    "btn-discover",
    "btn-research",
  ];
  navButtons.forEach((id) => {
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

function pageShell(title, intro, body, returnService = "") {
  return `<section class="patient-page" data-return-service="${returnService}"><div class="patient-page-heading"><button class="patient-back" data-patient-back type="button">&larr; Back to Home</button><h2>${title}</h2><p>${intro}</p></div>${body}</section>`;
}

function doctorOptions() {
  return DOCTORS_DATA.map(
    (doctor) =>
      `<option value="${doctor.name}">${doctor.name} - ${doctor.department}</option>`,
  ).join("");
}
function departmentOptions() {
  return DEPARTMENT_LIST.map(
    (department) => `<option>${department.name}</option>`,
  ).join("");
}
function dateOptions() {
  return appointmentDates()
    .map(
      (date) =>
        `<option value="${date}">${new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</option>`,
    )
    .join("");
}

function patientForm(title, type, returnService = "service-book-appointment") {
  const health = type === "health-check";
  return pageShell(
    title,
    health
      ? "A structured preventive assessment with a doctor-led report consultation."
      : "Choose a convenient hospital slot. No consultation fee is collected during regular booking.",
    `<form class="patient-form" data-patient-form="${type}">
    <div class="patient-form-grid"><label>Full name<input name="name" placeholder="Enter name" required></label><label>Age<input name="age" type="number" min="1" max="120" placeholder="Enter age" required></label><label>Contact number<input name="phone" type="tel" pattern="[0-9]{10}" placeholder="Enter 10-digit contact number" required></label><label>Address<input name="address" placeholder="Enter address" required></label></div>
    <label>Purpose of visit / personal concern<textarea name="purpose" required placeholder="Tell the care team what you need help with"></textarea></label>
    ${health ? `<div class="health-detail"><h3>What the basic health check includes</h3><p>Height and weight are recorded to calculate BMI and screen for obesity risk. Blood pressure and blood sugar are checked for hypertension and diabetes risk. Basic blood tests may include CBC, LFT and RFT, along with a routine urine test. Mammography may be advised for women based on age and clinical need, DEXA scanning may be advised for senior citizens, and personal concerns can be discussed during the final doctor consultation.</p><p>The visit includes a review of findings and a final consultation with a doctor. The basic package is INR 2,000 paid in advance; clinically indicated add-on tests are discussed separately.</p></div>` : `<div class="patient-form-grid"><label>Department (optional)<select name="department"><option value="">No preference</option>${departmentOptions()}</select></label><label>Preferred doctor (optional)<select name="doctor"><option value="">No preference</option>${doctorOptions()}</select></label></div>`}
    <div class="patient-form-grid"><label>Preferred date<select name="date">${dateOptions()}</select></label><label>Preferred time<select name="time"><option>09:00 AM</option><option>11:30 AM</option><option>02:00 PM</option><option>04:30 PM</option></select></label></div>
    <button class="patient-submit" type="submit">${health ? "Pay INR 2,000 & Book Health Check" : "Book Appointment"}</button><div class="patient-status"></div></form>`,
    returnService,
  );
}

function createDoctorsViewTemplate() {
  const cards = DOCTORS_DATA.map(
    (doctor, index) =>
      `<article class="doctor-card"><span class="doctor-number">${String(index + 1).padStart(2, "0")}</span><h3>${doctor.name}</h3><p class="doctor-department">${doctor.department}</p><dl><dt>Qualification</dt><dd>${doctor.qualification}</dd><dt>Education</dt><dd>${doctor.education}</dd><dt>Specialization</dt><dd>${doctor.specialization}</dd><dt>Experience</dt><dd>${doctor.experience}</dd></dl><strong class="doctor-fee">Consultation: INR ${doctor.fees.toLocaleString("en-IN")}</strong><button class="patient-submit compact" data-book-doctor="${doctor.name}" type="button">Book with doctor</button></article>`,
  ).join("");
  return pageShell(
    "Find a Doctor",
    "Compare qualifications, departments, experience and consultation fees across our specialist team.",
    `<div class="doctor-grid">${cards}</div>`,
    "service-find-doctor",
  );
}

function createDiagnosticsViewTemplate() {
  return pageShell(
    "Diagnostics & Blood Reports",
    "Enter the patient ID and report date exactly as provided by the hospital laboratory.",
    `<form class="patient-form report-search-form"><div class="patient-form-grid"><label>Unique patient ID<input name="patientId" placeholder="EVR-1001" required></label><label>Date of test / sample<select name="date">${REPORT_DATA.map((report) => `<option value="${report.date}">${report.date}</option>`).join("")}</select></label></div><button class="patient-submit" type="submit">Generate Report</button><div class="patient-status"></div></form><div id="report-result"></div>`,
    "service-diagnostic-reports",
  );
}

function renderReport(report) {
  if (!report)
    return `<div class="patient-status error">No report found for that patient ID and date. Please check the details supplied by the hospital.</div>`;
  const rows = report.values
    .map(
      (row) =>
        `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`,
    )
    .join("");
  return `<article class="report-result"><div class="report-result-head"><div><span class="portal-eyebrow">Verified hospital report</span><h3>${report.test}</h3></div><button class="patient-submit compact" data-book-consultation type="button">Book report consultation</button></div><div class="report-meta"><span><b>Patient ID</b>${report.patientId}</span><span><b>Patient</b>${report.name}, ${report.age} years</span><span><b>Contact</b>${report.phone}</span><span><b>Doctor</b>${report.doctor}</span><span><b>Department</b>${report.department}</span><span><b>Date of report</b>${report.date}</span></div><table class="report-table"><thead><tr><th>Parameter</th><th>Observed value</th><th>Reference / note</th></tr></thead><tbody>${rows}</tbody></table><div class="report-conclusion"><b>Conclusion / note</b><p>${report.conclusion}</p></div></article>`;
}

function createPharmacyViewTemplate() {
  const cards = MEDICINE_CATALOG.map(
    (medicine) =>
      `<article class="medicine-card"><span>${medicine.category}</span><h3>${medicine.name}</h3>${medicine.url ? `<a class="medicine-reference" href="${medicine.url}" target="_blank" rel="noopener">Read medicine information</a>` : ""}<strong>INR ${medicine.price}</strong>${medicine.prescription ? `<small class="rx-badge">Prescription required</small>` : `<small>Over-the-counter item</small>`}<label class="medicine-quantity">Quantity<input type="number" min="1" value="1" data-medicine-quantity="${medicine.id}"></label><button class="patient-submit compact" data-add-medicine="${medicine.id}" type="button">Add to cart</button></article>`,
  ).join("");
  return pageShell(
    "Evercare Dispensary",
    "Order everyday medicines and prescribed treatment items for home delivery or collection.",
    `<div class="pharmacy-toolbar"><strong id="cart-count">Cart: 0 items</strong><button class="patient-submit compact" data-review-cart type="button">Review order</button></div><div class="medicine-grid">${cards}</div><div id="cart-items" class="cart-items"></div><form class="patient-form prescription-review-form" hidden><h3>Prescription medicine review</h3><p>This medicine requires a doctor's prescription before ordering.</p><label>Disease or reason for treatment<textarea name="disease" required placeholder="Enter disease or treatment reason"></textarea></label><label>Doctor's prescription<input name="prescriptionReview" type="file" accept="image/*,.pdf" required></label><button class="patient-submit" type="button" data-review-doctor>Review with doctor</button><div class="patient-status"></div></form><form class="patient-form pharmacy-order-form" hidden><h3>Prescription and delivery details</h3><label>Reason for buying medicines<textarea name="reason" required placeholder="Tell us why you need this order"></textarea></label><label>Doctor's prescription ${`<input name="prescription" type="file" accept="image/*,.pdf">`}</label><label>Delivery address<input name="address" required></label><button class="patient-submit" type="submit">Pay & Place Order</button><div class="patient-status"></div></form>`,
    "service-pharmacy",
  );
}

function createBloodBankViewTemplate() {
  return pageShell(
    "Blood Bank",
    "Every donation is tested, carefully processed and connected to patients who need it.",
    `<div class="blood-bank-hero"><button class="blood-choice" data-blood-view="donate" type="button">Donate Blood<span>Give one unit. Help up to three people.</span></button><button class="blood-choice" data-blood-view="demand" type="button">Blood Demand<span>Request support for a hospitalized patient.</span></button></div><div class="blood-story"><h3>Why blood donation matters</h3><p>Blood cannot be manufactured and hospitals depend on voluntary donors every day. A single donation is separated into components such as red cells, plasma and platelets, so it can support as many as three patients. It can help someone facing trauma, surgery, childbirth complications, severe anaemia, cancer treatment or a blood disorder. Donating is a carefully screened process: the team confirms your identity, checks your haemoglobin and vital signs, collects the unit with sterile equipment, observes you during recovery and provides refreshments. A healthy eligible adult generally completes the visit in under an hour. The body replaces the fluid portion quickly and gradually replenishes the donated cells. Donors should eat a normal meal, drink water, carry identification and tell staff about medicines or recent illness. There is no payment for donation, and the service is based on voluntary, confidential participation. Every collected unit is tested for safety before it enters the blood bank. Families can also request blood through the hospital team when a patient has a documented clinical need. Blood groups, compatibility testing and stock availability are confirmed by trained staff, and emergency requests should always be routed through the hospital reception or 108/1088. Your decision to donate can make a practical difference on the day another family needs help.</p></div><div id="blood-form-area"></div>`,
    "service-blood-bank",
  );
}

function createBloodForm(type) {
  const demand = type === "demand";
  return `<form class="patient-form blood-form" data-patient-form="blood-${type}"><h3>${demand ? "Request blood support" : "Reserve a donation slot"}</h3><div class="patient-form-grid"><label>Full name<input name="name" placeholder="Enter name" required></label><label>Contact number<input name="phone" type="tel" pattern="[0-9]{10}" placeholder="Enter 10-digit contact number" required></label><label>Your blood group<select name="currentGroup"><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option></select></label><label>${demand ? "Blood group required" : "Preferred donation group"}<select name="requiredGroup"><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option></select></label></div>${demand ? `<div class="patient-form-grid"><label>Diagnosis (optional)<input name="diagnosis" placeholder="Optional diagnosis"></label><label>Department<input name="department" required placeholder="Enter department"></label><label>Doctor (optional)<select name="doctor"><option value="">No doctor selected</option>${doctorOptions()}</select></label><label>Prescription / supporting document (optional)<input name="document" type="file" accept="image/*,.pdf"></label></div>` : `<label>Have you donated blood before?<select name="previousDonation"><option>No</option><option>Yes</option></select></label><div class="patient-form-grid"><label>Available date<select name="date">${dateOptions()}</select></label><label>Available time<select name="time"><option>09:00 AM</option><option>11:00 AM</option><option>02:00 PM</option><option>04:00 PM</option></select></label></div><p class="form-note">The visit includes an initial health check, collection, recovery observation, refreshments and donor certificate collection. No payment is required.</p>`}<button class="patient-submit" type="submit">${demand ? "Submit blood request" : "Reserve donation slot"}</button><div class="patient-status"></div></form>`;
}

// --- Dynamic Templates ---
function createHomeViewTemplate() {
  const slidesHTML = SLIDES_DATA.map(
    (slide, idx) => `
    <div class="slide ${idx === 0 ? "active" : ""}" data-index="${idx}">
      <div class="slide-media" style="background-image: url('${slide.image}');"></div>
      <div class="slide-content-overlay">
        <span class="slide-tag">${slide.tag}</span>
        <h2 class="slide-headline">${slide.title}</h2>
        <p class="slide-description">${slide.desc}</p>
      </div>
    </div>
  `,
  ).join("");

  const dotsHTML = SLIDES_DATA.map(
    (_, idx) => `
    <button class="dot-btn ${idx === 0 ? "active" : ""}" data-slide="${idx}" aria-label="Slide ${idx + 1}"></button>
  `,
  ).join("");

  const servicesHTML = SERVICES_DATA.map(
    (svc) => `
    <button class="service-item" id="${svc.id}" type="button">${svc.label}</button>
  `,
  ).join("");

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

// --- Auth Views Templates ---
function createSignInViewTemplate() {
  return `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h2>Sign In</h2>
        <p class="auth-subtitle">Access your Evercare patient portal</p>
        <form id="signin-form" class="auth-form">
          <div class="auth-group">
            <label for="signin-email">Email Address</label>
            <input type="email" id="signin-email" placeholder="e.g. singhvj1609@gmail.com" required autocomplete="username">
          </div>
          <div class="auth-group">
            <label for="signin-password">Password</label>
            <input type="password" id="signin-password" placeholder="••••••••" required autocomplete="current-password">
          </div>
          <button type="submit" class="btn-auth-submit">Sign In</button>
          <div id="auth-status" class="auth-status-msg"></div>
        </form>
        <p class="auth-switch-text">
          New user? <button class="auth-switch-btn" id="btn-goto-register">Register Now</button>
        </p>
      </div>
    </div>
  `;
}

function createRegisterStep1Template() {
  const departmentOptions = DEPARTMENT_LIST.map(
    (d) => `
    <option value="${d.name}" ${regState.data.department === d.name ? "selected" : ""}>${d.name}</option>
  `,
  ).join("");

  return `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="step-indicator">Step 1 of 3: Personal & Department Details</div>
        <h2>Create Account</h2>
        <p class="auth-subtitle">Enter your profile information</p>
        <form id="register-step1-form" class="auth-form">
          <div class="auth-group">
            <label for="reg-email">Email Address</label>
            <input type="email" id="reg-email" value="${regState.data.email}" placeholder="name@example.com" required>
          </div>
          <div class="auth-group">
            <label for="reg-name">Full Name</label>
            <input type="text" id="reg-name" value="${regState.data.name}" placeholder="Rohan Sharma" required>
          </div>
          <div class="auth-group">
            <label for="reg-department">Select Department</label>
            <select id="reg-department" required>
              <option value="" disabled ${!regState.data.department ? "selected" : ""}>Select Preferred Department</option>
              ${departmentOptions}
            </select>
          </div>
          <div class="auth-row">
            <div class="auth-group" style="flex: 1;">
              <label for="reg-age">Age</label>
              <input type="number" id="reg-age" value="${regState.data.age}" min="1" max="120" placeholder="28" required>
            </div>
            <div class="auth-group" style="flex: 2;">
              <label for="reg-phone">Mobile Number</label>
              <input type="tel" id="reg-phone" value="${regState.data.phone}" placeholder="9876543210" pattern="[0-9]{10}" required>
            </div>
          </div>
          <button type="submit" class="btn-auth-submit">Send OTP to Email</button>
          <div id="auth-status" class="auth-status-msg"></div>
        </form>
        <p class="auth-switch-text">
          Already have an account? <button class="auth-switch-btn" id="btn-goto-signin">Sign In</button>
        </p>
      </div>
    </div>
  `;
}

function createRegisterStep2Template() {
  return `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="step-indicator">Step 2 of 3: Email Verification</div>
        <h2>Verify OTP</h2>
        <p class="auth-subtitle">A 6-digit code has been sent to <strong>${regState.data.email}</strong></p>
        <div class="otp-notice">For testing, your OTP is: <strong>${regState.generatedOtp}</strong></div>
        <form id="register-step2-form" class="auth-form">
          <div class="auth-group">
            <label for="reg-otp">Enter 6-Digit OTP</label>
            <input type="text" id="reg-otp" maxlength="6" placeholder="123456" required style="letter-spacing: 4px; text-align: center; font-size: 1.2rem;">
          </div>
          <button type="submit" class="btn-auth-submit">Verify & Proceed</button>
          <button type="button" class="btn-auth-secondary" id="btn-resend-otp">Resend OTP</button>
          <div id="auth-status" class="auth-status-msg"></div>
        </form>
      </div>
    </div>
  `;
}

function createRegisterStep3Template() {
  return `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="step-indicator">Step 3 of 3: Security</div>
        <h2>Set Secure Password</h2>
        <p class="auth-subtitle">Password is case-sensitive and must meet complexity criteria</p>
        <form id="register-step3-form" class="auth-form">
          <div class="auth-group">
            <label for="reg-password">Create Password</label>
            <input type="password" id="reg-password" placeholder="e.g. Evercare@2026Secure" required>
          </div>
          <div class="auth-group">
            <label for="reg-confirm-password">Confirm Password</label>
            <input type="password" id="reg-confirm-password" placeholder="Repeat exact password" required>
          </div>
          <div class="password-guidelines-box">
            <span class="guide-title">Password must contain:</span>
            <ul class="guide-list">
              <li>&bull; Minimum 10 characters</li>
              <li>&bull; At least one uppercase letter (A-Z)</li>
              <li>&bull; At least one lowercase letter (a-z)</li>
              <li>&bull; At least one number (0-9)</li>
              <li>&bull; At least one special character (!@#$%^&* etc.)</li>
            </ul>
          </div>
          <button type="submit" class="btn-auth-submit">Complete Registration</button>
          <div id="auth-status" class="auth-status-msg"></div>
        </form>
      </div>
    </div>
  `;
}

// --- Authenticated Full-Page Workspace Template ---
const PORTAL_LOCATIONS = [
  { id: "mi-room", label: "MI Room", description: "Medical Inspection Room" },
  {
    id: "trauma-center",
    label: "Trauma Center",
    description: "24/7 emergency response",
  },
  ...DEPARTMENT_LIST.map((department) => ({
    id: `department-${department.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    label: department.name,
    description: department.desc,
  })),
];

function createPortalLocationTemplate(location) {
  return `
    <div class="portal-location-heading">
      <span class="portal-eyebrow">Selected care unit</span>
      <h3>${location.label}</h3>
      <p>${location.description}</p>
    </div>
    <div class="portal-action-grid">
      <button class="portal-action-card" type="button" data-portal-action="register">
        <span class="portal-action-icon">+</span>
        <span><strong>Register a Patient</strong><small>Create a new patient record</small></span>
        <span class="portal-action-arrow">&rsaquo;</span>
      </button>
      <button class="portal-action-card" type="button" data-portal-action="admission">
        <span class="portal-action-icon">&#8594;</span>
        <span><strong>Admission</strong><small>Start an inpatient admission</small></span>
        <span class="portal-action-arrow">&rsaquo;</span>
      </button>
      <button class="portal-action-card" type="button" data-portal-action="registered-list">
        <span class="portal-action-icon">&#128100;</span>
        <span><strong>Registered Patients</strong><small>View today's or this week's visits</small></span>
        <span class="portal-action-arrow">&rsaquo;</span>
      </button>
      <button class="portal-action-card" type="button" data-portal-action="admitted-list">
        <span class="portal-action-icon">&#9776;</span>
        <span><strong>Admitted Patients</strong><small>View patients in this unit</small></span>
        <span class="portal-action-arrow">&rsaquo;</span>
      </button>
    </div>
  `;
}

function getPortalRecords(storageKey, location, period) {
  const records = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const now = Date.now();
  const periodStart =
    period === "week"
      ? now - 7 * 24 * 60 * 60 * 1000
      : new Date().setHours(0, 0, 0, 0);
  return records.filter((record) => {
    const belongsToLocation =
      record.department === location.label ||
      record.careUnit === location.label;
    return (
      belongsToLocation &&
      (!period || new Date(record.createdAt).getTime() >= periodStart)
    );
  });
}

function createPortalRecordsTemplate(type, location, period = "day") {
  const isAdmissions = type === "admitted-list";
  const records = getPortalRecords(
    isAdmissions ? "evercare_admissions" : "evercare_patient_records",
    location,
    isAdmissions ? null : period,
  );
  const rows = records.length
    ? records
        .map(
          (record) => `
    <div class="portal-record-row">
      <div><strong>${record.fullName}</strong><small>${record.id} &bull; ${record.phone}</small>${isAdmissions ? `<button class="portal-record-btn treatment-plan" type="button" data-treatment-edit="${record.id}">Treatment Plan</button>` : ""}</div>
      <div class="portal-record-meta">
        <span>${new Date(record.createdAt).toLocaleDateString()}</span>
        ${isAdmissions ? `<button class="portal-record-btn" type="button" data-admission-edit="${record.id}">Edit Details</button><button class="portal-record-btn payment ${record.paymentCleared ? "paid" : ""}" type="button" data-record-payment="${record.id}" ${record.paymentCleared ? "disabled" : ""}>${record.paymentCleared ? "Paid / No Due" : "Make Payment"}</button><button class="portal-record-btn discharge" type="button" data-record-discharge="${record.id}" ${record.paymentCleared ? "" : "disabled"}>${record.paymentCleared ? "Discharge (No Due Payment)" : "Discharge"}</button>` : `<button class="portal-record-btn" type="button" data-record-edit="${record.id}">Edit</button><button class="portal-record-btn delete" type="button" data-record-delete="${record.id}">Delete</button>`}
      </div>
    </div>
  `,
        )
        .join("")
    : `<div class="portal-empty-state">No ${isAdmissions ? "admitted patients found in this unit" : `registered patients found for this ${period}`}.</div>`;

  return `
    <div class="portal-form-heading">
      <button class="portal-back-btn" type="button" data-portal-back>&larr; Back to ${location.label}</button>
      <span class="portal-eyebrow">${isAdmissions ? "Inpatient census" : "Consultation register"}</span>
      <h3>${isAdmissions ? "Admitted Patients" : "Registered Patients"}</h3>
      <p>${location.label} patient records for the selected period.</p>
    </div>
    ${
      !isAdmissions
        ? `<div class="portal-record-filters">
      <button class="portal-filter-btn ${period === "day" ? "active" : ""}" type="button" data-record-type="${type}" data-record-period="day">Today</button>
      <button class="portal-filter-btn ${period === "week" ? "active" : ""}" type="button" data-record-type="${type}" data-record-period="week">This Week</button>
    </div>`
        : ""
    }
    <div class="portal-record-list">${rows}</div>
  `;
}

function createPortalFormTemplate(type, location, record = null) {
  const isRegistration = type === "register";
  const isEditingAdmission = type === "admission-edit";
  const fieldValue = (field) =>
    record?.[field] ? `value="${record[field]}"` : "";
  const selected = (field, value) =>
    record?.[field] === value ? "selected" : "";
  return `
    <div class="portal-form-heading">
      <button class="portal-back-btn" type="button" data-portal-back>&larr; Back to ${location.label}</button>
      <span class="portal-eyebrow">${isRegistration ? "Patient intake" : "Inpatient intake"}</span>
      <h3>${isRegistration ? (record ? "Edit Registered Patient" : "Register a Patient") : isEditingAdmission ? "Edit Admission Details" : "Admission"}</h3>
      <p>${isRegistration ? "Create a patient record for consultation at " + location.label + "." : "Request admission for the selected department or care unit."}</p>
    </div>
    <form class="portal-form" id="${isRegistration ? "patient-registration-form" : "patient-admission-form"}">
      <div class="portal-form-section">
        <h4>Patient Details</h4>
        <div class="portal-form-grid">
          <label>Full Name<input name="fullName" type="text" required placeholder="Patient full name" ${fieldValue("fullName")}></label>
          <label>Age<input name="age" type="number" min="0" max="120" required placeholder="Age" ${fieldValue("age")}></label>
          <label>Phone Number<input name="phone" type="tel" required placeholder="10-digit phone number" ${fieldValue("phone")}></label>
          <label>Email Address<input name="email" type="email" placeholder="patient@example.com" ${fieldValue("email")}></label>
          ${isRegistration ? `<label>Gender<select name="gender" required><option value="" disabled ${record ? "" : "selected"}>Select gender</option><option ${selected("gender", "Female")}>Female</option><option ${selected("gender", "Male")}>Male</option><option ${selected("gender", "Other")}>Other</option></select></label><input name="careUnit" type="hidden" value="${record?.careUnit || location.label}">` : `<label>Department / Unit<input name="department" type="text" value="${location.label}" readonly></label>`}
          ${isRegistration ? `<label>Visit Type<select name="visitType" required><option ${selected("visitType", "Consultation")}>Consultation</option><option ${selected("visitType", "Follow-up")}>Follow-up</option><option ${selected("visitType", "Emergency")}>Emergency</option></select></label>` : `<label>Doctor Assigned<input name="doctor" type="text" required placeholder="Doctor's name" ${fieldValue("doctor")}></label>`}
        </div>
      </div>
      ${
        isRegistration
          ? `
        <div class="portal-form-section">
          <h4>Doctor Notes</h4>
          <div class="portal-form-grid portal-form-grid-wide">
            <label>Diagnosis<textarea name="diagnosis" rows="3" placeholder="Add diagnosis or clinical notes">${record?.diagnosis || ""}</textarea></label>
            <label>Prescription<textarea name="prescription" rows="3" placeholder="Add prescribed medicines and instructions">${record?.prescription || ""}</textarea></label>
          </div>
        </div>
      `
          : `
        <div class="portal-form-section">
          <h4>Admission Details</h4>
          <div class="portal-form-grid">
            <label>Room Type<select name="roomType" id="admission-room-type" required><option value="8-bed" ${record?.roomType === "8-bed" ? "selected" : ""}>8-bed sharing room (INR 5,000)</option><option value="4-bed" ${record?.roomType === "4-bed" ? "selected" : ""}>4-bed sharing room (INR 6,500)</option><option value="single" ${record?.roomType === "single" ? "selected" : ""}>Single bed room (INR 8,000)</option></select></label>
            <label>Bed Preference<input name="bed" type="text" placeholder="Optional bed number" ${fieldValue("bed")}></label>
            <label>Linens Required<select name="linens" required><option ${selected("linens", "Standard")}>Standard</option><option ${selected("linens", "Extra set")}>Extra set</option><option ${selected("linens", "Patient-provided")}>Patient-provided</option></select></label>
            <label>Dietary Preference<select name="diet" id="admission-diet" required><option value="Vegetarian" ${record?.diet !== "Non-vegetarian" ? "selected" : ""}>Vegetarian (included)</option><option value="Non-vegetarian" ${selected("diet", "Non-vegetarian")}>Non-vegetarian (+INR 200)</option></select></label>
            <label>Expected Stay (days)<input name="stay" id="admission-stay" type="number" min="1" required placeholder="Number of days" ${fieldValue("stay")}></label>
          </div>
        </div>
      `
      }
      ${
        !isEditingAdmission
          ? `<div class="portal-payment-box">
        <div><h4>Payment</h4><p id="admission-payment-amount">${isRegistration ? "Consultation fee: INR 500" : "Select stay duration for total"}</p></div>
        <button class="portal-pay-btn" type="button" data-pay-form="${isRegistration ? "registration" : "admission"}">Complete Payment</button>
        <span class="portal-payment-status" aria-live="polite">Payment pending</span>
      </div>`
          : ""
      }
      <button class="portal-final-btn" type="submit" ${isEditingAdmission ? "" : "disabled"}>${isRegistration ? (record ? "Save Patient Changes" : "Register Patient") : isEditingAdmission ? "Save Admission Changes" : "Confirm Admission"}</button>
      <div class="portal-form-status" aria-live="polite"></div>
    </form>
  `;
}

function createTreatmentFormTemplate(location, record) {
  return `
    <div class="portal-form-heading">
      <button class="portal-back-btn" type="button" data-portal-back>&larr; Back to Admitted Patients</button>
      <span class="portal-eyebrow">Clinical care</span>
      <h3>Edit Treatment Plan</h3>
      <p>${record.fullName} &bull; ${record.id}</p>
    </div>
    <form class="portal-form" id="treatment-plan-form">
      <div class="portal-form-section">
        <h4>Treatment Details</h4>
        <div class="portal-form-grid portal-form-grid-wide">
          <label>Treatment Plan<textarea name="treatmentPlan" rows="6" placeholder="Describe the ongoing treatment plan">${record.treatmentPlan || ""}</textarea></label>
          <label>Medicines<textarea name="medicines" rows="6" placeholder="List medicines and dosage instructions">${record.medicines || ""}</textarea></label>
          <label>Injections<textarea name="injections" rows="4" placeholder="List injections, dosage, and schedule">${record.injections || ""}</textarea></label>
          <label>Blood Tests<textarea name="bloodTests" rows="4" placeholder="List required blood tests and results">${record.bloodTests || ""}</textarea></label>
          <label>Other Tests<textarea name="otherTests" rows="4" placeholder="List scans or other tests">${record.otherTests || ""}</textarea></label>
        </div>
      </div>
      <button class="portal-final-btn" type="submit">Save Treatment Plan</button>
      <div class="portal-form-status" aria-live="polite"></div>
    </form>
  `;
}

function createPortalRecordId(prefix) {
  return `${prefix}-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
}

function savePortalRecord(storageKey, record) {
  const records = JSON.parse(localStorage.getItem(storageKey) || "[]");
  records.push(record);
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function updatePortalRecord(storageKey, recordId, updates) {
  const records = JSON.parse(localStorage.getItem(storageKey) || "[]");
  const updatedRecords = records.map((record) =>
    record.id === recordId ? { ...record, ...updates } : record,
  );
  localStorage.setItem(storageKey, JSON.stringify(updatedRecords));
}

function deletePortalRecord(storageKey, recordId) {
  const records = JSON.parse(localStorage.getItem(storageKey) || "[]");
  localStorage.setItem(
    storageKey,
    JSON.stringify(records.filter((record) => record.id !== recordId)),
  );
}

function createAuthenticatedBlankViewTemplate(userData) {
  const defaultLocation = PORTAL_LOCATIONS[0];

  return `
    <section class="auth-blank-page">
      <div class="auth-blank-container">
        <div class="auth-welcome-bar">
          <div>
            <h2>Welcome Back</h2>
            <p>Evercare Portal &bull; ${userData?.email || ""} ${userData?.department ? `&bull; Dept: ${userData.department}` : ""}</p>
          </div>
          <div class="portal-header-actions"><button class="btn-portal-appointments" id="btn-portal-appointments" type="button">Appointments</button><button class="btn-portal-signout" id="btn-portal-logout">Sign Out</button></div>
        </div>
        <div class="portal-layout">
          <aside class="portal-sidebar" aria-label="Care units">
            <div class="portal-sidebar-heading">
              <span class="portal-eyebrow">Evercare Portal</span>
              <h3>Care Units</h3>
            </div>
            <nav class="portal-location-list">
              <div class="scheduled-label">Scheduled Appointments</div>
              <button class="portal-location-btn appointment-nav" type="button" data-appointment-type="regular"><span>Regular Appointments</span><span class="portal-location-arrow">&rsaquo;</span></button>
              <button class="portal-location-btn appointment-nav" type="button" data-appointment-type="health-check"><span>Health Check-up Appointments</span><span class="portal-location-arrow">&rsaquo;</span></button>
              <button class="portal-location-btn appointment-nav" type="button" data-appointment-type="blood-donation"><span>Blood Donation Appointments</span><span class="portal-location-arrow">&rsaquo;</span></button>
              <div class="scheduled-divider"></div>
              ${PORTAL_LOCATIONS.map(
                (location) => `
                <button class="portal-location-btn ${location.id === defaultLocation.id ? "active" : ""} ${location.id === "trauma-center" ? "emergency" : ""}" type="button" data-location-id="${location.id}" aria-pressed="${location.id === defaultLocation.id}">
                  <span>${location.label}</span><span class="portal-location-arrow">&rsaquo;</span>
                </button>
              `,
              ).join("")}
            </nav>
          </aside>
          <section class="auth-blank-canvas" id="portal-content" aria-live="polite">
            ${createPortalLocationTemplate(defaultLocation)}
          </section>
        </div>
      </div>
      <div class="signout-dialog-backdrop" id="signout-dialog" hidden>
        <div class="signout-dialog" role="dialog" aria-modal="true" aria-labelledby="signout-dialog-title">
          <h2 id="signout-dialog-title">Are you sure you want to sign out?</h2>
          <p>Your portal session will end on this device.</p>
          <div class="signout-dialog-actions">
            <button class="signout-cancel-btn" id="signout-cancel-btn" type="button">Cancel</button>
            <button class="signout-confirm-btn" id="signout-confirm-btn" type="button">Continue</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderAuthenticatedBlankPage(userData) {
  clearInterval(autoPlayTimer);
  document.body.classList.add("auth-mode");
  appRoot.innerHTML = createAuthenticatedBlankViewTemplate(userData);
  window.scrollTo({ top: 0, behavior: "smooth" });

  const signoutDialog = document.getElementById("signout-dialog");
  if (signoutDialog) document.body.appendChild(signoutDialog);
  const closeSignoutDialog = () => {
    if (signoutDialog) signoutDialog.hidden = true;
  };

  document
    .getElementById("btn-portal-logout")
    ?.addEventListener("click", () => {
      if (signoutDialog) signoutDialog.hidden = false;
    });

  document
    .getElementById("btn-portal-appointments")
    ?.addEventListener("click", () => {
      document.querySelector("[data-appointment-type=regular]")?.click();
    });

  document
    .getElementById("signout-cancel-btn")
    ?.addEventListener("click", closeSignoutDialog);
  document
    .getElementById("signout-confirm-btn")
    ?.addEventListener("click", () => {
      removeAuthToken();
      renderHome();
    });
  signoutDialog?.addEventListener("click", (event) => {
    if (event.target === signoutDialog) closeSignoutDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && signoutDialog && !signoutDialog.hidden)
      closeSignoutDialog();
  });

  document.querySelectorAll(".portal-location-btn").forEach((button) => {
    if (button.dataset.appointmentType) return;
    button.addEventListener("click", () => {
      const selectedLocation = PORTAL_LOCATIONS.find(
        (location) => location.id === button.dataset.locationId,
      );
      if (!selectedLocation) return;

      document
        .querySelectorAll(".portal-location-btn")
        .forEach((locationButton) => {
          const isSelected = locationButton === button;
          locationButton.classList.toggle("active", isSelected);
          locationButton.setAttribute("aria-pressed", String(isSelected));
        });
      document.getElementById("portal-content").innerHTML =
        createPortalLocationTemplate(selectedLocation);
    });
  });

  document.querySelectorAll("[data-appointment-type]").forEach((button) =>
    button.addEventListener("click", () => {
      const type = button.dataset.appointmentType;
      const key =
        type === "health-check"
          ? "evercare_health_check_appointments"
          : type === "blood-donation"
            ? "evercare_blood_donation_appointments"
            : "evercare_appointments";
      const records = getStoredList(key).filter(
        (record) => record.userEmail === userData.email,
      );
      const label =
        APPOINTMENT_TYPES.find((item) => item.id === type)?.label ||
        "Appointments";
      const rows = records.length
        ? records
            .map(
              (record) =>
                `<div class="appointment-record"><strong>${record.name || userData.name}</strong><span>${record.date || "Date to be confirmed"} ${record.time || ""}</span><small>${record.department || (type === "blood-donation" ? "Blood Bank" : "To be assigned")} &bull; ${record.doctor || record.requiredGroup || "Hospital team"}</small><em>${record.id}</em></div>`,
            )
            .join("")
        : `<div class="portal-empty-state">No ${label.toLowerCase()} are scheduled for this account.</div>`;
      document.getElementById("portal-content").innerHTML =
        `<div class="portal-form-heading"><span class="portal-eyebrow">Scheduled appointments</span><h3>${label}</h3><p>These bookings are linked to ${userData.name} and remain available on this device.</p></div><div class="appointment-record-list">${rows}</div>`;
    }),
  );

  const portalContent = document.getElementById("portal-content");
  portalContent?.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-portal-action]");
    const backButton = event.target.closest("[data-portal-back]");
    const payButton = event.target.closest("[data-pay-form]");
    const recordPaymentButton = event.target.closest("[data-record-payment]");
    const dischargeButton = event.target.closest("[data-record-discharge]");
    const editButton = event.target.closest("[data-record-edit]");
    const deleteButton = event.target.closest("[data-record-delete]");
    const treatmentEditButton = event.target.closest("[data-treatment-edit]");
    const admissionEditButton = event.target.closest("[data-admission-edit]");
    const filterButton = event.target.closest("[data-record-period]");
    const selectedButton = document.querySelector(
      ".portal-location-btn.active",
    );
    const selectedLocation =
      PORTAL_LOCATIONS.find(
        (location) => location.id === selectedButton?.dataset.locationId,
      ) || PORTAL_LOCATIONS[0];

    if (treatmentEditButton || admissionEditButton) {
      const recordId =
        treatmentEditButton?.dataset.treatmentEdit ||
        admissionEditButton?.dataset.admissionEdit;
      const records = JSON.parse(
        localStorage.getItem("evercare_admissions") || "[]",
      );
      const record = records.find((item) => item.id === recordId);
      if (record) {
        portalContent.innerHTML = treatmentEditButton
          ? createTreatmentFormTemplate(selectedLocation, record)
          : createPortalFormTemplate(
              "admission-edit",
              selectedLocation,
              record,
            );
        portalContent.querySelector("form").dataset.editingId = recordId;
      }
    } else if (recordPaymentButton) {
      const recordRow = recordPaymentButton.closest(".portal-record-row");
      recordPaymentButton.disabled = true;
      recordPaymentButton.textContent = "Paid / No Due";
      recordPaymentButton.classList.add("paid");
      recordRow.querySelector("[data-record-discharge]").disabled = false;
      recordRow.querySelector("[data-record-discharge]").textContent =
        "Discharge (No Due Payment)";
      const admissions = JSON.parse(
        localStorage.getItem("evercare_admissions") || "[]",
      );
      localStorage.setItem(
        "evercare_admissions",
        JSON.stringify(
          admissions.map((record) =>
            record.id === recordPaymentButton.dataset.recordPayment
              ? { ...record, paymentCleared: true }
              : record,
          ),
        ),
      );
    } else if (dischargeButton) {
      const admissions = JSON.parse(
        localStorage.getItem("evercare_admissions") || "[]",
      );
      localStorage.setItem(
        "evercare_admissions",
        JSON.stringify(
          admissions.filter(
            (record) => record.id !== dischargeButton.dataset.recordDischarge,
          ),
        ),
      );
      dischargeButton.closest(".portal-record-row").remove();
    } else if (editButton || deleteButton) {
      const recordId =
        editButton?.dataset.recordEdit || deleteButton?.dataset.recordDelete;
      const records = JSON.parse(
        localStorage.getItem("evercare_patient_records") || "[]",
      );
      const record = records.find((item) => item.id === recordId);
      if (editButton && record) {
        portalContent.innerHTML = createPortalFormTemplate(
          "register",
          selectedLocation,
          record,
        );
        portalContent.querySelector("form").dataset.editingId = recordId;
        portalContent.querySelector("form").dataset.paymentComplete = "true";
        portalContent.querySelector(".portal-pay-btn").disabled = true;
        portalContent.querySelector(".portal-pay-btn").textContent =
          "Payment Complete";
        portalContent.querySelector(".portal-payment-status").textContent =
          "Payment received";
        portalContent
          .querySelector(".portal-payment-status")
          .classList.add("paid");
        portalContent.querySelector(".portal-final-btn").disabled = false;
      } else if (deleteButton) {
        deletePortalRecord("evercare_patient_records", recordId);
        deleteButton.closest(".portal-record-row").remove();
      }
    } else if (filterButton) {
      portalContent.innerHTML = createPortalRecordsTemplate(
        filterButton.dataset.recordType,
        selectedLocation,
        filterButton.dataset.recordPeriod,
      );
    } else if (
      actionButton &&
      ["register", "admission"].includes(actionButton.dataset.portalAction)
    ) {
      portalContent.innerHTML = createPortalFormTemplate(
        actionButton.dataset.portalAction,
        selectedLocation,
      );
    } else if (
      actionButton &&
      ["admitted-list", "registered-list"].includes(
        actionButton.dataset.portalAction,
      )
    ) {
      portalContent.innerHTML = createPortalRecordsTemplate(
        actionButton.dataset.portalAction,
        selectedLocation,
      );
    } else if (backButton) {
      portalContent.innerHTML = createPortalLocationTemplate(selectedLocation);
    } else if (payButton) {
      const form = payButton.closest("form");
      form.dataset.paymentComplete = "true";
      form.querySelector(".portal-final-btn").disabled = false;
      payButton.disabled = true;
      payButton.textContent = "Payment Complete";
      form.querySelector(".portal-payment-status").textContent =
        "Payment received";
      form.querySelector(".portal-payment-status").classList.add("paid");
    }
  });

  portalContent?.addEventListener("change", (event) => {
    if (
      !["admission-room-type", "admission-diet", "admission-stay"].includes(
        event.target.id,
      )
    )
      return;
    const roomPrices = { "8-bed": 5000, "4-bed": 6500, single: 8000 };
    const form = event.target.closest("form");
    const roomType = form.querySelector("#admission-room-type").value;
    const diet = form.querySelector("#admission-diet").value;
    const days = Number(form.querySelector("#admission-stay").value) || 0;
    const total =
      (roomPrices[roomType] + (diet === "Non-vegetarian" ? 200 : 0)) * days;
    form.querySelector("#admission-payment-amount").textContent = days
      ? `INR ${total.toLocaleString("en-IN")} total for ${days} day${days === 1 ? "" : "s"}`
      : "Select stay duration for total";
  });

  portalContent?.addEventListener("submit", (event) => {
    const form = event.target.closest("form");
    if (!form) return;
    event.preventDefault();
    const status = form.querySelector(".portal-form-status");
    if (!form.dataset.editingId && form.dataset.paymentComplete !== "true") {
      status.textContent = "Complete payment before submitting this form.";
      status.className = "portal-form-status error";
      return;
    }

    const formData = Object.fromEntries(new FormData(form).entries());
    const isRegistration = form.id === "patient-registration-form";
    const isTreatmentUpdate = form.id === "treatment-plan-form";
    if (
      !isRegistration &&
      !isTreatmentUpdate &&
      (!formData.stay || Number(formData.stay) < 1)
    )
      return;
    const recordId = createPortalRecordId(isRegistration ? "EVR" : "EVA");
    if (!isRegistration && !isTreatmentUpdate) {
      const roomPrices = { "8-bed": 5000, "4-bed": 6500, single: 8000 };
      formData.paymentAmount =
        roomPrices[formData.roomType] +
        (formData.diet === "Non-vegetarian" ? 200 : 0);
    }
    const storageKey = isRegistration
      ? "evercare_patient_records"
      : "evercare_admissions";
    if (form.dataset.editingId) {
      updatePortalRecord(storageKey, form.dataset.editingId, formData);
    } else {
      savePortalRecord(storageKey, {
        id: recordId,
        ...formData,
        paymentCleared: false,
        createdAt: new Date().toISOString(),
      });
    }
    status.textContent = isTreatmentUpdate
      ? "Treatment plan and medicines updated successfully."
      : isRegistration
        ? `Patient registered successfully. Registration ID: ${recordId}`
        : `Admission confirmed successfully. Admission ID: ${recordId}`;
    status.className = "portal-form-status success";
    if (!isTreatmentUpdate)
      form.querySelector(".portal-final-btn").disabled = true;
  });
}

// --- Drawer & Slider Helpers ---
function renderDrawer() {
  const drawerContainer = document.getElementById("drawer-nav-list");
  if (!drawerContainer) return;
  drawerContainer.innerHTML = DRAWER_ITEMS.map(
    (item) => `
    <li class="drawer-nav-item">
      <button class="drawer-nav-btn ${item.interactive ? "" : "drawer-static"}" id="${item.id}">
        ${item.label} <span>&rsaquo;</span>
      </button>
    </li>
  `,
  ).join("");
}

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

  function goToNextSlide() {
    selectSlide(activeIndex + 1);
  }
  function goToPrevSlide() {
    selectSlide(activeIndex - 1);
  }

  function startSliderAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(goToNextSlide, 7000);
  }

  nextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    goToNextSlide();
    startSliderAutoPlay();
  });
  prevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    goToPrevSlide();
    startSliderAutoPlay();
  });
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
      void footerContainer.offsetWidth;
      footerContainer.classList.add("footer-container-blink");
    }, 150);
  };

  window.addEventListener("scroll", onScrollEnd);
  scrollTimeout = setTimeout(onScrollEnd, 600);
}

function renderPatientView(template, setup = () => {}) {
  document.body.classList.remove("auth-mode");
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = template;
  setup();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindPatientBack() {
  document
    .querySelector("[data-patient-back]")
    ?.addEventListener("click", () => {
      const serviceId =
        document.querySelector(".patient-page")?.dataset.returnService;
      renderHome(serviceId === "service-book-appointment" ? serviceId : null);
    });
}

function createBookingQr(record) {
  const qrData = `Evercare booking ${record.id} | ${record.name} | ${record.date || "Blood donation slot"} | ${record.time || ""}`;
  return `<div class="booking-qr"><img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}" alt="QR code for booking ${record.id}"><small>Show this QR code at reception</small></div>`;
}

function printReceipt(receipt) {
  receipt.classList.add("printable-receipt");
  document.body.classList.add("printing-receipt");
  window.print();
  window.setTimeout(() => {
    receipt.classList.remove("printable-receipt");
    document.body.classList.remove("printing-receipt");
  }, 500);
}

function renderDoctors() {
  renderPatientView(createDoctorsViewTemplate(), () => {
    bindPatientBack();
    document.querySelectorAll("[data-book-doctor]").forEach((button) =>
      button.addEventListener("click", () =>
        renderPatientView(
          patientForm(
            "Book a Regular Appointment",
            "regular",
            "service-find-doctor",
          ),
          () => {
            bindPatientBack();
            bindPatientForm(document.querySelector("[data-patient-form]"));
          },
        ),
      ),
    );
  });
}

function renderBookAppointment() {
  renderPatientView(
    patientForm("Book an Appointment", "regular", "service-book-appointment"),
    () => {
      bindPatientBack();
      bindPatientForm(document.querySelector("[data-patient-form]"));
    },
  );
}
function renderHealthCheck() {
  renderPatientView(
    patientForm("Book a Health Check", "health-check", "service-health-check"),
    () => {
      bindPatientBack();
      bindPatientForm(document.querySelector("[data-patient-form]"));
    },
  );
}

function renderDiagnostics() {
  renderPatientView(createDiagnosticsViewTemplate(), () => {
    bindPatientBack();
    document
      .querySelector(".report-search-form")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = Object.fromEntries(
          new FormData(event.currentTarget).entries(),
        );
        const report = REPORT_DATA.find(
          (item) =>
            item.patientId.toLowerCase() ===
              data.patientId.trim().toLowerCase() && item.date === data.date,
        );
        document.getElementById("report-result").innerHTML =
          renderReport(report);
        document
          .querySelector("[data-book-consultation]")
          ?.addEventListener("click", renderBookAppointment);
      });
  });
}

function renderPharmacy() {
  renderPatientView(createPharmacyViewTemplate(), () => {
    bindPatientBack();
    const cart = [];
    const count = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const prescriptionReview = document.querySelector(
      ".prescription-review-form",
    );
    const renderCart = () => {
      count.textContent = `Cart: ${cart.reduce((total, item) => total + item.quantity, 0)} item${cart.reduce((total, item) => total + item.quantity, 0) === 1 ? "" : "s"}`;
      cartItems.innerHTML = cart
        .map(
          (item) =>
            `<div class="cart-row"><span><strong>${item.name}</strong><small>INR ${item.price} each</small></span><span class="cart-controls"><button type="button" data-cart-minus="${item.id}" aria-label="Decrease ${item.name}">-</button><b>${item.quantity}</b><button type="button" data-cart-plus="${item.id}" aria-label="Increase ${item.name}">+</button></span></div>`,
        )
        .join("");
    };
    document.querySelectorAll("[data-add-medicine]").forEach((button) =>
      button.addEventListener("click", () => {
        const medicine = MEDICINE_CATALOG.find(
          (item) => item.id === button.dataset.addMedicine,
        );
        const quantityInput = document.querySelector(
          `[data-medicine-quantity="${medicine?.id}"]`,
        );
        const quantity = Math.max(1, Number(quantityInput?.value) || 1);
        const existing = cart.find((item) => item.id === medicine?.id);
        if (medicine && existing) existing.quantity += quantity;
        else if (medicine) cart.push({ ...medicine, quantity });
        renderCart();
        button.textContent = "Added";
        if (medicine?.prescription) {
          prescriptionReview.hidden = false;
          prescriptionReview.dataset.medicineId = medicine.id;
          prescriptionReview.querySelector("h3").textContent =
            `Prescription review: ${medicine.name}`;
          prescriptionReview.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }),
    );
    cartItems.addEventListener("click", (event) => {
      const plus = event.target.closest("[data-cart-plus]");
      const minus = event.target.closest("[data-cart-minus]");
      const id = plus?.dataset.cartPlus || minus?.dataset.cartMinus;
      const item = cart.find((entry) => entry.id === id);
      if (!item) return;
      item.quantity = Math.max(1, item.quantity + (plus ? 1 : -1));
      renderCart();
    });
    document
      .querySelector("[data-review-doctor]")
      ?.addEventListener("click", () => {
        const reviewForm = prescriptionReview;
        if (!reviewForm.checkValidity()) {
          reviewForm.reportValidity();
          return;
        }
        reviewForm.querySelector(".patient-status").textContent =
          "Prescription and disease details sent for doctor review. You may continue reviewing the order.";
        reviewForm.querySelector(".patient-status").className =
          "patient-status success";
      });
    document
      .querySelector("[data-review-cart]")
      ?.addEventListener("click", () => {
        if (!cart.length) {
          count.textContent = "Cart is empty - choose a medicine first";
          return;
        }
        const form = document.querySelector(".pharmacy-order-form");
        form.hidden = false;
        form.dataset.cart = JSON.stringify(cart);
        form.scrollIntoView({ behavior: "smooth" });
      });
    document
      .querySelector(".pharmacy-order-form")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const items = JSON.parse(form.dataset.cart || "[]");
        const needsPrescription = items.some((item) => item.prescription);
        const prescription = form.querySelector("[name=prescription]");
        if (needsPrescription && !prescription.files.length) {
          form.querySelector(".patient-status").textContent =
            "A doctor's prescription is mandatory for one or more selected medicines.";
          form.querySelector(".patient-status").className =
            "patient-status error";
          return;
        }
        const orderId = `EC-${Date.now().toString().slice(-7)}`;
        form.innerHTML = `<div class="confirmation-box"><span class="success-mark">&#10003;</span><h3>Order placed successfully</h3><p>Order ${orderId} has been placed for ${items.map((item) => item.name).join(", ")}.</p><p>Payment is simulated for this frontend prototype. The dispensary team will confirm fulfilment.</p><button class="patient-submit" data-patient-back type="button">Back to Home</button></div>`;
        form
          .querySelector("[data-patient-back]")
          .addEventListener("click", renderHome);
      });
  });
}

function renderBloodBank() {
  renderPatientView(createBloodBankViewTemplate(), () => {
    bindPatientBack();
    document.querySelectorAll("[data-blood-view]").forEach((button) =>
      button.addEventListener("click", () => {
        const area = document.getElementById("blood-form-area");
        area.innerHTML = createBloodForm(button.dataset.bloodView);
        area.scrollIntoView({ behavior: "smooth" });
        area.querySelector("form").addEventListener("submit", (event) => {
          event.preventDefault();
          const data = Object.fromEntries(
            new FormData(event.currentTarget).entries(),
          );
          const type =
            button.dataset.bloodView === "demand"
              ? "regular"
              : "blood-donation";
          const record = {
            id: `BLOOD-${Date.now().toString().slice(-6)}`,
            type,
            ...data,
            userEmail: currentUser().email,
            createdAt: new Date().toISOString(),
          };
          const key =
            type === "blood-donation"
              ? "evercare_blood_donation_appointments"
              : "evercare_appointments";
          saveStoredList(key, [...getStoredList(key), record]);
          event.currentTarget.innerHTML = `<div class="confirmation-box ${type === "blood-donation" ? "printable-receipt" : ""}"><span class="success-mark">&#10003;</span><h3>${type === "blood-donation" ? "Donation slot reserved" : "Blood request submitted"}</h3><p>Reference ${record.id}. Our blood bank team will contact you after verifying availability and documents.</p>${type === "blood-donation" ? `${createBookingQr(record)}<div class="confirmation-actions"><button class="patient-submit" data-print-confirmation type="button">Print / Save receipt as PDF</button><button class="patient-submit" data-patient-back type="button">Back to Home</button></div>` : `<button class="patient-submit" data-patient-back type="button">Back to Home</button>`}</div>`;
          event.currentTarget
            .querySelector("[data-print-confirmation]")
            ?.addEventListener("click", (printEvent) =>
              printReceipt(
                printEvent.currentTarget.closest(".printable-receipt"),
              ),
            );
          event.currentTarget
            .querySelector("[data-patient-back]")
            .addEventListener("click", () => renderHome("service-blood-bank"));
        });
      }),
    );
  });
}

function bindPatientForm(form) {
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const type = form.dataset.patientForm;
    const record = {
      id: `APT-${Date.now().toString().slice(-7)}`,
      type: type === "health-check" ? "health-check" : "regular",
      ...data,
      userEmail: currentUser().email,
      createdAt: new Date().toISOString(),
    };
    const key =
      record.type === "health-check"
        ? "evercare_health_check_appointments"
        : "evercare_appointments";
    saveStoredList(key, [...getStoredList(key), record]);
    const department =
      data.department ||
      (data.doctor
        ? DOCTORS_DATA.find((doctor) => doctor.name === data.doctor)
            ?.department || "To be assigned"
        : "To be assigned");
    const doctor = data.doctor || "To be assigned by the hospital";
    form.innerHTML = `<div class="confirmation-box printable-receipt"><span class="success-mark">&#10003;</span><h3>Booking successful</h3><div class="confirmation-grid"><span><b>Patient</b>${data.name}, ${data.age} years</span><span><b>Contact</b>${data.phone}</span><span><b>Date & time</b>${data.date} at ${data.time}</span><span><b>Department</b>${department}</span><span><b>Doctor</b>${doctor}</span><span><b>Reference</b>${record.id}</span></div><p>Carry previous prescriptions, reports, medicines list and a valid photo ID. Please arrive 20 minutes early for registration.</p>${createBookingQr(record)}<div class="confirmation-actions"><button class="patient-submit" data-print-confirmation type="button">Print / Save receipt as PDF</button><button class="patient-submit" data-patient-back type="button">Back to Home</button></div></div>`;
    form
      .querySelector("[data-print-confirmation]")
      .addEventListener("click", (event) =>
        printReceipt(event.currentTarget.closest(".printable-receipt")),
      );
    form.querySelector("[data-patient-back]").addEventListener("click", () => {
      const serviceId = form.closest(".patient-page")?.dataset.returnService;
      renderHome(serviceId === "service-book-appointment" ? serviceId : null);
    });
  });
}

// --- Routing Functions ---
function renderHome(returnService = null) {
  document.getElementById("signout-dialog")?.remove();
  document.body.classList.remove("auth-mode");
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createHomeViewTemplate();
  setActiveNavButton("btn-home");
  initSlider();
  const serviceActions = {
    "service-find-doctor": renderDoctors,
    "service-book-appointment": renderBookAppointment,
    "service-diagnostic-reports": renderDiagnostics,
    "service-pharmacy": renderPharmacy,
    "service-health-check": renderHealthCheck,
    "service-blood-bank": renderBloodBank,
  };
  Object.entries(serviceActions).forEach(([id, handler]) =>
    document.getElementById(id)?.addEventListener("click", handler),
  );
  if (returnService) {
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => {
        const target =
          document.getElementById(returnService) ||
          document.querySelector(".services-section");
        target?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }),
    );
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function renderDepartments() {
  document.body.classList.remove("auth-mode");
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createDepartmentsViewTemplate();
  setActiveNavButton("btn-departments");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPatientsGuide() {
  document.body.classList.remove("auth-mode");
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createPatientsGuideViewTemplate();
  setActiveNavButton("btn-patients-guide");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAboutUs() {
  document.body.classList.remove("auth-mode");
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createAboutUsViewTemplate();
  setActiveNavButton("btn-discover");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderInventories() {
  document.body.classList.remove("auth-mode");
  clearInterval(autoPlayTimer);
  appRoot.innerHTML = createInventoriesViewTemplate();
  setActiveNavButton(null);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Auth Controllers ---
function renderSignIn() {
  clearInterval(autoPlayTimer);
  document.body.classList.add("auth-mode");
  appRoot.innerHTML = createSignInViewTemplate();
  window.scrollTo({ top: 0, behavior: "smooth" });

  document
    .getElementById("btn-goto-register")
    ?.addEventListener("click", () => renderRegisterStep(1));

  const form = document.getElementById("signin-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document
      .getElementById("signin-email")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("signin-password").value;
    const statusBox = document.getElementById("auth-status");

    const users = getRegisteredUsers();
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === email && u.password === password,
    );

    if (matchedUser) {
      const token = generateMockJWT({
        sub: matchedUser.email,
        name: matchedUser.name,
        role: "patient",
      });
      setAuthToken(token);

      statusBox.className = "auth-status-msg success";
      statusBox.textContent = "Authentication successful! Opening portal...";

      setTimeout(() => {
        renderAuthenticatedBlankPage(matchedUser);
      }, 900);
    } else {
      statusBox.className = "auth-status-msg error";
      statusBox.textContent =
        "Invalid email or password. Passwords are case-sensitive.";
    }
  });
}

function renderRegisterStep(step) {
  clearInterval(autoPlayTimer);
  document.body.classList.add("auth-mode");

  if (step === 1) {
    appRoot.innerHTML = createRegisterStep1Template();
    document
      .getElementById("btn-goto-signin")
      ?.addEventListener("click", renderSignIn);

    const form = document.getElementById("register-step1-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("reg-email").value.trim();
      const name = document.getElementById("reg-name").value.trim();
      const department = document.getElementById("reg-department").value;
      const age = document.getElementById("reg-age").value.trim();
      const phone = document.getElementById("reg-phone").value.trim();
      const statusBox = document.getElementById("auth-status");

      if (!department) {
        statusBox.className = "auth-status-msg error";
        statusBox.textContent = "Please select a department.";
        return;
      }

      const existingUsers = getRegisteredUsers();
      if (
        existingUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())
      ) {
        statusBox.className = "auth-status-msg error";
        statusBox.textContent =
          "An account with this email already exists. Please Sign In.";
        return;
      }

      regState.data = { email, name, age, phone, department };
      regState.generatedOtp = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      renderRegisterStep(2);
    });
  } else if (step === 2) {
    appRoot.innerHTML = createRegisterStep2Template();

    document.getElementById("btn-resend-otp")?.addEventListener("click", () => {
      regState.generatedOtp = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      renderRegisterStep(2);
    });

    const form = document.getElementById("register-step2-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const enteredOtp = document.getElementById("reg-otp").value.trim();
      const statusBox = document.getElementById("auth-status");

      if (enteredOtp === regState.generatedOtp) {
        renderRegisterStep(3);
      } else {
        statusBox.className = "auth-status-msg error";
        statusBox.textContent = "Invalid OTP code. Please check and try again.";
      }
    });
  } else if (step === 3) {
    appRoot.innerHTML = createRegisterStep3Template();

    const form = document.getElementById("register-step3-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const pwd = document.getElementById("reg-password").value;
      const confirmPwd = document.getElementById("reg-confirm-password").value;
      const statusBox = document.getElementById("auth-status");

      // Password Complexity Validation
      const validation = validateStrongPassword(pwd);
      if (!validation.valid) {
        statusBox.className = "auth-status-msg error";
        statusBox.textContent = validation.message;
        return;
      }

      if (pwd !== confirmPwd) {
        statusBox.className = "auth-status-msg error";
        statusBox.textContent =
          "Passwords do not match. Please verify case sensitivity.";
        return;
      }

      const newUser = {
        ...regState.data,
        password: pwd,
      };
      saveUser(newUser);

      const token = generateMockJWT({
        sub: newUser.email,
        name: newUser.name,
        role: "patient",
      });
      setAuthToken(token);

      statusBox.className = "auth-status-msg success";
      statusBox.textContent =
        "Account verified & registered successfully! Opening portal...";

      const registeredUser = { ...newUser };
      regState = {
        step: 1,
        data: { email: "", name: "", age: "", phone: "", department: "" },
        generatedOtp: null,
      };

      setTimeout(() => {
        renderAuthenticatedBlankPage(registeredUser);
      }, 1000);
    });
  }
}

// --- Event Binding ---
function initAppEvents() {
  renderDrawer();

  // Header Nav Actions
  document.getElementById("btn-home")?.addEventListener("click", renderHome);
  document
    .getElementById("btn-discover")
    ?.addEventListener("click", renderAboutUs);
  document
    .getElementById("btn-departments")
    ?.addEventListener("click", renderDepartments);
  document
    .getElementById("btn-patients-guide")
    ?.addEventListener("click", renderPatientsGuide);
  document
    .getElementById("btn-signin")
    ?.addEventListener("click", renderSignIn);
  document
    .getElementById("header-logo-btn")
    ?.addEventListener("click", renderHome);
  document
    .getElementById("footer-logo-btn")
    ?.addEventListener("click", renderHome);
  document
    .getElementById("footer-link-home")
    ?.addEventListener("click", renderHome);

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

  // Drawer Buttons
  document.getElementById("drawer-btn-home")?.addEventListener("click", () => {
    closeDrawer();
    renderHome();
  });
  document
    .getElementById("drawer-btn-departments")
    ?.addEventListener("click", () => {
      closeDrawer();
      renderDepartments();
    });
  document
    .getElementById("drawer-btn-inventories")
    ?.addEventListener("click", () => {
      closeDrawer();
      renderInventories();
    });
  document
    .getElementById("drawer-btn-patients-corner")
    ?.addEventListener("click", () => {
      closeDrawer();
      renderPatientsGuide();
    });
  document
    .getElementById("drawer-btn-about-us")
    ?.addEventListener("click", () => {
      closeDrawer();
      renderAboutUs();
    });

  // Contact Us Buttons
  document.getElementById("btn-contact-us")?.addEventListener("click", () => {
    navigateAndHighlightContact();
  });

  document
    .getElementById("drawer-btn-contact-us")
    ?.addEventListener("click", () => {
      closeDrawer();
      navigateAndHighlightContact();
    });

  // Footer static dialogs
  document
    .getElementById("footer-link-disclaimer")
    ?.addEventListener("click", () => {
      alert(
        "Evercare Hospital Disclaimer: The medical information provided on this portal is for general awareness and emergency assistance.",
      );
    });

  document
    .getElementById("footer-link-terms")
    ?.addEventListener("click", () => {
      alert(
        "Evercare Hospital Terms & Conditions: All patient booking services, diagnostics, and appointments are subject to clinical verification.",
      );
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
      hour12: true,
    });
    const el = document.getElementById("live-last-update");
    if (el) el.textContent = `last update: ${formatted}`;
  }
  updateLiveTimestamp();
  setInterval(updateLiveTimestamp, 1000);
}

// Initial Boot
document.addEventListener("DOMContentLoaded", () => {
  initAppEvents();
  const authenticatedUser = getAuthenticatedUser();
  if (authenticatedUser) {
    renderAuthenticatedBlankPage(authenticatedUser);
  } else {
    renderHome();
  }
});
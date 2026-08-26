# Evercare Hospital Portal

Evercare Hospital Portal is a responsive frontend hospital management application built with HTML, CSS, and JavaScript.

The application provides a public hospital website along with an authenticated hospital staff portal for patient registration, admissions, payments, treatment plans, and department-based patient management.

## Features

### Public Hospital Website

- Evercare Hospital branding and responsive header
- Hospital information and healthcare services
- Departments page
- Patient's guide
- Research and publication section
- Contact information and emergency helpline
- Image-based hospital hero slider
- Navigation drawer
- Language selection interface
- Responsive footer and hospital details

### Authentication

- Sign-in screen
- Multi-step user registration
- Email and password validation
- OTP verification simulation
- Strong password validation
- Mock JWT authentication
- Default demo account
- Sign-out functionality

### Hospital Staff Portal

After successful login, users are taken to an in-page hospital portal.

The portal includes:

- MI Room
- Trauma Center
- Cardiology
- Neurology
- Obstetrics & Gynaecology
- Oncology
- Dermatology
- Ophthalmology
- Nephrology
- Orthopaedics
- Paediatrics
- Endocrinology
- Gastroenterology
- Haematology
- Nuclear Medicine
- Radiology
- Pathology
- Anesthesiology

The Trauma Center is visually highlighted as an emergency department.

## Portal Dashboard

The dashboard contains four primary options arranged in a 2x2 layout:

| Position | Option |
|----------|--------|
| A11 | Register a Patient |
| A12 | Admission |
| A21 | Registered Patients |
| A22 | Admitted Patients |

The displayed information changes according to the selected department or care unit.

## Patient Registration

The registration form includes:

- Full name
- Age
- Phone number
- Email address
- Gender
- Visit type
- Diagnosis
- Prescription
- Consultation payment

The final registration button remains disabled until consultation payment is completed.

After registration, the application:

- Generates a unique registration ID
- Saves the patient record locally
- Associates the patient with the selected department
- Makes the patient available in the Registered Patients list

## Admission Management

The admission form includes:

- Full name
- Age
- Phone number
- Email address
- Department or care unit
- Assigned doctor
- Room type
- Optional bed preference
- Linen preference
- Dietary preference
- Expected stay in days
- Admission payment

### Room Pricing

| Room Type | Daily Price |
|-----------|-------------|
| 8-bed sharing room | INR 5,000 |
| 4-bed sharing room | INR 6,500 |
| Single bed room | INR 8,000 |

Vegetarian dietary service is included in the room price.

Non-vegetarian dietary service adds INR 200 per day.

The total admission amount is calculated using:

```text
(room price + dietary surcharge) x number of days
```

The admission confirmation button remains disabled until payment is completed.

## Registered Patients

The Registered Patients section supports:

- View patients registered today
- View patients registered during the current week
- Edit patient details
- Edit diagnosis and prescription
- Delete patient records
- View unique registration IDs

## Admitted Patients

The Admitted Patients section displays all active admissions for the selected department.

Each admitted patient includes:

- Patient name
- Admission ID
- Phone number
- Registration date
- Treatment Plan option
- Edit Details option
- Make Payment option
- Discharge option

### Treatment Plan

The Treatment Plan form allows doctors to repeatedly update:

- Treatment plan
- Medicines and dosage instructions
- Injections
- Blood tests
- Other tests

The treatment plan save button remains active after saving, allowing doctors to update the same patient multiple times.

### Discharge Workflow

Patients cannot be discharged until payment is cleared.

The workflow is:

1. Select `Make Payment`.
2. Payment status changes to `Paid / No Due`.
3. Discharge becomes enabled.
4. The button changes to `Discharge (No Due Payment)`.
5. Selecting discharge removes the patient from the active admitted-patient list.

## Data Storage

This project currently uses browser `localStorage` instead of a backend database.

The following localStorage keys are used:

| Key | Purpose |
|-----|---------|
| `evercare_users` | Stores registered user accounts |
| `evercare_jwt_token` | Stores the mock authentication token |
| `evercare_patient_records` | Stores registered patient records |
| `evercare_admissions` | Stores active admission records |

Because the data is stored locally:

- Data is available only in the same browser.
- Clearing browser storage removes the records.
- The application is intended as a frontend prototype.
- Payment processing is simulated.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage
- Responsive Flexbox and CSS Grid
- SVG logo graphics
- Unsplash image resources
- Mock authentication and payment workflows

## Project Structure

```text
Full Stack Project/
├── index.html
├── script.js
├── style.css
├── README.md
└── images/
    ├── beds.jpg
    └── doctors-team.jpg.webp
```

## Running the Project Locally

### Option 1: Open Directly

Open `index.html` in a web browser.

### Option 2: Use Visual Studio Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the Live Server extension.
3. Right-click `index.html`.
4. Select `Open with Live Server`.

## Demo Login

The default demo account is:

```text
Email: singhvj1609@gmail.com
Password: root@1234
```

For production use, these credentials should be removed and authentication should be connected to a secure backend.

## Important Notes

This is a frontend demonstration project. It does not currently include:

- A production database
- Real payment gateway integration
- Real email delivery
- Real OTP delivery
- Backend authentication
- Role-based access control
- Server-side validation
- Medical data encryption
- Production patient privacy controls

Do not use this application with real patient information.

## Future Improvements

Possible future enhancements include:

- Node.js or Java backend
- MongoDB, MySQL, or PostgreSQL database
- Secure user authentication
- Doctor and administrator roles
- Real payment gateway integration
- Email and SMS notifications
- Real OTP verification
- Patient search and filtering
- Printable receipts
- PDF prescriptions
- Bed availability tracking
- Doctor scheduling
- Medical record history
- Audit logs
- Database backups
- HIPAA/GDPR-compliant security controls

## License

This project is intended for educational and demonstration purposes.

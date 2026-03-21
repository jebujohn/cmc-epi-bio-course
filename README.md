# EpiBio CMC 2026

A modern, responsive Next.js application for the Two-Week Course on Epidemiology and Biostatistics at Christian Medical College (CMC), Vellore.

## 🎯 Features

- **Modern UI**: Built with Tailwind CSS and Framer Motion for a dynamic, glassmorphic aesthetic.
- **Fully Responsive**: Optimized for Desktop, Tablet, and Mobile.
- **Pages**:
  - Landing Page: Course overview, highlights, and testimonials.
  - Faculty Profile: Dynamic grid with modal details for expert faculty.
  - Agenda: Interactive, expandable daily schedule.
  - Registration Form: Robust validation and responsive UI.
  - Daily Feedback System: Interactive Likert-scale feedback form for participants.
  - Payment Mockup: Simulated Razorpay payment flow.
- **Modular Architecture**: Reusable components (`Navbar`, `Footer`) utilizing Next.js 15 App Router.

## ⚙️ Tech Stack

- **Frontend Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Dependencies Management**: npm

## 📂 Folder Structure

```text
cmc-epi-bio-course/
├── src/
│   ├── app/                    # Next.js App Router (Pages & Layout)
│   │   ├── globals.css         # Global Styles & Tailwind Configuration
│   │   ├── layout.tsx          # Root Layout (Navbar, Footer, Font)
│   │   ├── page.tsx            # Landing Page
│   │   ├── agenda/             # Agenda Page
│   │   ├── faculty/            # Faculty Profile Pages
│   │   ├── feedback/           # Daily Feedback System
│   │   ├── payment/            # Payment Checkout Mockup
│   │   └── registration/       # Registration Form Pages
│   ├── components/             # Reusable React Components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
├── package.json
└── tailwind.config.ts          # Exists internally as part of Next.js Tailwind configuration
```

## 🚀 Setup & Installation

Follow these steps to run the application locally:

### 1. Pre-requisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or newer) installed.

### 2. Install Dependencies
Run the following command in the project root:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
npm start
```

## 🔐 Additional Integrations Required (For Backend)

Currently, the forms and payment systems are simulated within the UI to demonstrate user flow. To make this fully functional in a production environment:

1. **Database Integration**: Connect `src/app/registration/page.tsx` and `src/app/feedback/page.tsx` to a backend (like MongoDB or Firebase Firestore).
2. **Payments**: Integrate Razorpay or Stripe API keys into backend server actions to generate real transaction tokens for `src/app/payment/page.tsx`.
3. **Email Handling**: Use tools like SendGrid or AWS SES to send registration confirmation emails.

## 🎨 Design Guidance Followed

- **Theme**: Institutional CMC branding with clean white, professional blue (`#0e4b85`), and muted green (`#166534`).
- **Typography**: Inter (Sans-serif) for clean readability.
- **UX**: Emphasized clarity, fast-loading interactions without clutter.

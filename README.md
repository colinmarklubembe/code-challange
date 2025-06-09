# Skip Selection Page Redesign - README

## Overview

This project is a redesign of WeWantWaste's "Choose Your Skip Size" page while maintaining all original functionality. The implementation focuses on an improved UI and responsive design.

**Live Demo:** [_CodeSandbox Link_](https://codesandbox.io/p/github/colinmarklubembe/code-challange/main?import=true)

---

## Key Design Decisions

### Modern Visual Identity

- Replaced original design with dark-themed gradient background
- Added dynamic particle background for visual depth
- Implemented glass-morphism cards with subtle animations
- Used vibrant gradient accents for interactive elements

### Enhanced User Experience

- Added clear step progression indicator
- Implemented animated card selection with hover effects
- Created sticky summary bar for selected skip
- Added visual badges for popular options
- Included feature tags with descriptive icons

### Responsive Implementation

- Mobile-first grid system (1 → 2 → 3 → 4 columns)
- Touch-friendly interactive elements

### Technical Improvements

- VAT calculation helper function
- Dynamic image selection based on skip size
- Comprehensive loading/error states

---

## Features Retained from Original

- Skip size selection functionality
- Price display (including VAT calculations)
- Hire period information
- Road placement permissions
- Heavy waste allowances
- Progressive step navigation

---

## Technical Stack

- Next.jsc
- React 19
- TypeScript
- Tailwind CSS
- Lucide-React Icons
- Fetch API for data retrieval

---

## Installation

```bash
npm install
npm run dev
```

---

## API Integration

Fetches skip data from:

[https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft](https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft)

---

## Responsive Breakpoints

- **Mobile:** < 640px (1 column)
- **Tablet:** 640-1024px (2 columns)
- **Desktop:** 1024-1280px (3 columns)
- **Large Desktop:** > 1280px (4-5 columns)

---

## Areas for possible Future Improvement

- Real skip images from API
- Price comparison visualizations
- Waste type capacity indicators
- Interactive size recommender
- Local storage for selection persistence

---

This implementation delivers a complete visual overhaul while maintaining original functionality and providing enhanced user experience across the different device sizes.

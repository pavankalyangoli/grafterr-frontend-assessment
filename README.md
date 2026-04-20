# Grafterr Landing Page - Front-End Assessment

## Chosen Stack
**Option B: React** (Vite + Functional Components + Custom Hooks + CSS Variables)

## Setup Instructions
1. Clone the repository: `git clone <your-repo-link>`
2. Navigate to the directory: `cd grafterr-landing`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

## Explanation of Approach
* **Architecture:** Used component-based architecture with separate UI components (`Skeleton`, `Carousel`, `ProductCard`) and Section components (`HeroSection`, `FeaturesSection`).
* **State Management & API:** Created a mock API service with a 1.2s delay to simulate network requests. Used custom hooks (`useContent`, `useCarousel`) to handle fetching, loading states, error handling, and carousel logic cleanly.
* **Styling:** Strictly avoided CSS frameworks. Used pure CSS with variables (`variables.css`) for design tokens to ensure a pixel-perfect match with the Figma design.
* **Responsiveness:** Implemented mobile-first media queries to handle breakpoints (Desktop, Tablet, Mobile) smoothly.

## Assumptions (Optional - Add this only if you kept the Drag-Text Carousel)
* *Note on Carousel:* Instead of a standard product carousel, I implemented a native, drag-to-scroll text carousel for a more modern, app-like user experience, complete with a dynamic scroll indicator.

## Live URL
[https://grafterr-frontend-assessment.vercel.app/]
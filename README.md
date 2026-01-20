# Developer's Day 2026 - Brand Ambassador Portal

This project is the official registration and information portal for the **Developer's Day 2026 (DD26)** Brand Ambassador program. It features a "Dark Luxury Tech" aesthetic, utilizing a deep red, black, and cream color palette to convey prestige and innovation.

The application is built using **React**, **Tailwind CSS**, and **Framer Motion**, ensuring a highly responsive and animated user experience.

---

## 🎨 Design System & Visual Identity

The design follows a strict brand kit to ensure consistency:

*   **Primary Background**: `#000000` (Pure Black)
*   **Brand Reds**:
    *   Dark: `#4d0303` (Used for depth, shadows, and gradients)
    *   Light: `#760404` (Used for accents, buttons, and geometric shapes)
*   **Highlight/Text**: `#ffeac7` (Cream/Beige - Used for high-contrast text and glowing borders)
*   **Typography**:
    *   **Headings**: *Syne* (Geometric, bold, futuristic)
    *   **Body**: *Plus Jakarta Sans* (Clean, modern, legible)

---

## 🧩 Component Documentation

The application is structured into modular functional components within `App.tsx`. Below is a comprehensive breakdown of each:

### 1. Core Visual Assets

#### `DD26Logo`
*   **Description**: A pure SVG implementation of the DD26 geometric logo.
*   **Design**: Features complex paths representing a stylized "DD" or abstract shape with gradients matching the brand's red and cream palette. It includes specific gradients (`logoGradTop`, `logoGradHighlight`, etc.) to create a 3D folded paper effect.

#### `GeometricBackground`
*   **Description**: The foundational background layer used throughout the app (specifically in the Hero section) to set the mood.
*   **Features**:
    *   **Hexagonal Pattern**: A subtle, repeating hexagonal grid SVG pattern (`#pattern-hex`) overlaid with low opacity and `mix-blend-screen` to provide a "tech" texture without overwhelming the content.
    *   **Dotted Grids**: Animated grids of dots in the corners that fade in and out using Framer Motion.
    *   **Geometric Pills**: Large, floating "pill" shapes layered with blurs and gradients (`#pillGrad`, `#pillGradLight`) to create depth and the signature "Dark Luxury" atmosphere.

### 2. Layout & Navigation

#### `Navbar`
*   **Description**: A sticky navigation bar that adapts to scroll state.
*   **Behavior**:
    *   Starts transparent and becomes a blurred, semi-transparent black bar (`bg-brand-black/80 backdrop-blur-lg`) when the user scrolls down.
    *   Includes a mobile hamburger menu that expands into a full-width drawer using `AnimatePresence`.
*   **Elements**: Logo, Navigation Links (Mission, Perks), and a primary "Register Now" CTA button.

#### `Footer`
*   **Description**: The footer section containing social links and copyright info.
*   **Design**: Includes a decorative dotted grid pattern in the top right and a clean layout separating the logo/brand from social navigation links.

### 3. Page Sections

#### `Hero`
*   **Description**: The landing section designed to make a strong first impression.
*   **Key Features**:
    *   **Animations**: Staggered entrance animations for text and buttons using Framer Motion (`initial`, `animate`).
    *   **Typography**: Massive, responsive headings using *Syne*. The word "AMBASSADOR" features a custom animated gradient background (`animate-gradient`).
    *   **Parallax**: A large, low-opacity version of the logo in the background moves at a different speed than the scroll (`useScroll`, `useTransform`).

#### `MissionSection` & `MissionCard`
*   **Description**: Outlines the responsibilities of a Brand Ambassador.
*   **Layout**: A 2-column grid on desktop.
    *   **Left**: Text content and a stack of `MissionCard` components.
    *   **Right**: A purely decorative visual element featuring floating 3D glassmorphism-style pills and a central "Inner Circle" card to symbolize exclusivity.
*   **`MissionCard`**: A reusable component featuring an icon within a gradient box, a title, and a description. It has a hover effect that lights up the border.

#### `PerksSection` & `PerkCard`
*   **Description**: displays the incentives for joining the program.
*   **Layout**: A Bento-grid style layout where the first and last cards span two columns on large screens for visual variety.
*   **`PerkCard`**: A highly interactive card component.
    *   **Hover State**: On hover, a large, faint stroke version of the icon appears in the background, the card lifts up (`-translate-y-2`), and a red gradient overlay fades in.

#### `CTASection`
*   **Description**: The final "Call to Action" before the footer.
*   **Design**: Features a simple, centered layout with a large, shimmering "Register Now" button.
*   **Button Animation**: The button includes a continuous "shimmer" effect (a white gradient moving across the surface) to draw attention.

### 4. Main Container

#### `App`
*   **Description**: The root component that composes all sections together.
*   **Global Styles**: It injects a `<style>` block for custom CSS animations that couldn't be easily handled by Tailwind alone (e.g., `keyframes shimmer`, `animate-gradient`).

---

## 🛠 Technical Details

*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS v3 (Configured via `tailwind.config.js` and `postcss.config.js`)
*   **Icons**: `lucide-react`
*   **Animation**: `framer-motion`
*   **Routing**: Single Page Application (SPA) handled via `vercel.json` rewrite rules.

## 🚀 Running the Project

This project uses a standard Vite build setup.

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or yarn

### Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173` (or similar).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder containing the bundled assets.

## ☁️ Deployment (Vercel)

The project is configured for seamless deployment on Vercel.

1.  Push your code to a Git repository (GitHub/GitLab).
2.  Import the project into Vercel.
3.  Vercel will automatically detect the **Vite** framework settings.
4.  **Important**: The included `vercel.json` handles SPA routing, ensuring that refreshing on sub-paths works correctly.

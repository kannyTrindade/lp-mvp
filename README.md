# Landing Page - MVP - Natty Lean

A modern, responsive landing page built with Vite, modular HTML using Handlebars, and custom styling via SCSS and Bootstrap 5.

## 🚀 Live Demo

🔗 [Visit the site](https://kannytrindade.github.io/lp-mvp)

## 🛠️ Technologies Used

- [Vite](https://vitejs.dev/) – Fast, modern front-end build tool
- [Bootstrap 5](https://getbootstrap.com/) – Modular CSS framework (used via SCSS)
- [SCSS](https://sass-lang.com/) – CSS preprocessor for organized and reusable styles
- [Handlebars](https://handlebarsjs.com/) – Template engine for HTML partials
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Native JS for client-side logic
- [GitHub Pages](https://pages.github.com/) – Free hosting for the project

## 📁 Project Structure

```
lp-mvp/
├── src/
│   ├── assets/              # Images and icons
│   ├── partials/            # Handlebars HTML partials
│   ├── scripts/             # JavaScript files
│   ├── styles/              # SCSS files
│   ├── index.html           # Main landing page
│   └── thankyou.html        # Thank you page
├── docs/                    # Production build output / Github Pages Structure
├── package.json             # Project metadata and dependencies
├── postcss.config.cjs       # PostCSS configuration
├── README.md
├── vite.config.js           # Vite configuration
├── .env.production          # Github Pages Environment for deploy
└── .prettierrc              # Prettier configuration to set default pattern
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kannyTrindade/lp-mvp.git
cd lp-mvp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview Build

After build finished:

```bash
npm run preview
```

## ✨ Features

- Responsive layout optimized for mobile
- Modular HTML using Handlebars partials
- Custom SCSS styling with Bootstrap 5 components
- Good performance and accessibility score in Google Lighthouse

## 📄 License

This project is licensed under the [MIT License](LICENSE).

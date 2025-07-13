# Prasad Rane - Portfolio Website

A professional portfolio website showcasing software engineering experience, built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation & Setup

1. **Clone or download this repository**
2. **Update repository name** in these files:
   - `vite.config.ts`: Update the `base` configuration with your repository name
   - `package.json`: Update the `homepage` field
   - `index.html`: Update Open Graph URLs

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📦 GitHub Pages Deployment

### Automatic Deployment

1. **Create a new GitHub repository**
2. **Upload all files** from this folder to your repository
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"
4. **Push to main branch** - automatic deployment will start

### Manual Deployment

```bash
npm run deploy
```

## 🎨 Customization

### Update Personal Information

Edit `src/pages/Portfolio.tsx` to update:
- Personal details in hero section
- Work experience
- Skills and technologies
- Project descriptions
- Contact information

### Add Resume

Place your resume PDF in the `public` folder as `resume.pdf`

### Colors & Theme

Update CSS variables in `src/index.css`:
- `--github-accent`: Primary blue color
- `--purple-accent`: Secondary purple color
- `--success`: Green accent color

## 📁 Project Structure

```
├── src/
│   ├── components/ui/     # UI components
│   ├── pages/            # Page components
│   ├── lib/              # Utilities
│   ├── hooks/            # Custom hooks
│   └── index.css         # Global styles
├── public/               # Static assets
├── .github/workflows/    # GitHub Actions
└── README.md
```

## 🛠️ Technologies

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React, React Icons
- **Routing**: Wouter
- **Build**: Vite
- **Deployment**: GitHub Pages

## 📄 License

MIT License

## 📞 Contact

Update contact information in the portfolio to reflect your details.

---

Built with ❤️ using React and deployed on GitHub Pages
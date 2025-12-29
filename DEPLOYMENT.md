# EggHatch Timer - Deployment

A quirky Pokemon GBA-style timer where you incubate an egg that wobbles and hatches when time is up!

---

## Live App

**Production URL:** https://egghatch-timer.vercel.app

---

## Repository

**GitHub:** https://github.com/Vishal2602/egghatch-timer

---

## Build Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server (Vite HMR) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** CSS Modules
- **Font:** Press Start 2P (Google Fonts)
- **Audio:** Web Audio API (8-bit chiptunes)

---

## Deployment Platform

- **Host:** Vercel
- **Build:** Automatic via GitHub integration
- **CDN:** Vercel Edge Network (global)

---

## Environment Notes

- No environment variables required
- No backend/database dependencies
- Static site - pure client-side React
- Fully serverless - zero runtime costs

---

## Automatic Deployments

The project is connected to GitHub. Any push to `master` triggers:
1. Automatic build on Vercel
2. Preview deployment for PRs
3. Production deployment for merges to master

---

## Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod
```

---

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Respects `prefers-reduced-motion` for accessibility

---

*Last deployed: 2025-12-29*

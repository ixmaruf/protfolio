# MARUF HASAN — Web3 Community Manager Portfolio

A professional portfolio website for **Maruf Hasan**, a Web3 Community Manager and Community Builder. Built with a Japanese editorial / magazine-inspired design aesthetic featuring bold typography, sakura animations, and a clean red-black-cream color scheme.

---

## ✅ Completed Features

### Design & Visual
- **Japanese Editorial Style** — Magazine/newspaper layout with bold typography, color blocking, and geometric accents
- **Color Scheme** — Red (#E63946), Black (#0A0A0A), Light Cream (#FFF8F0) only
- **Bold Typography** — Montserrat, Inter, Poppins, Plus Jakarta Sans fonts with large display headings
- **Sakura Petals** — Floating petal animation across the page
- **Canvas Background** — Interactive dot grid that reacts to mouse movement (desktop)
- **Grid Overlay** — Subtle editorial grid texture
- **Kanji Decorations** — Japanese characters as subtle background accents (丸, 信, 技, 歴, 繋, 学)
- **Neo-Brutalist Elements** — Sharp edges, color blocks, geometric shapes

### Sections
1. **Preloader** — Animated loading screen with kanji mark and progress bar
2. **Sticky Header** — Always visible navigation with logo, links, and "Open to Work" status badge
3. **Hero Section** — Large name typography, tagline, animated stats (170K+, 500+, 5+), CTA buttons, profile image
4. **About Section** — Drop-cap editorial style, quote block, goal & work style cards
5. **Skills Section** — 6 skill cards with hover fill animation and 3D tilt effect (Telegram, Content, Twitter/X, Discord, Growth, Design)
6. **Experience Section** — Timeline with 3 career stages (2018, 2020, 2024)
7. **Education Block** — BBA Honours info with red accent block
8. **Contact Section** — Social links cards + contact form (First Name, Last Name, Email, Project URL, Budget Range, Message)
9. **Footer** — Brand info, social icons, real visitor counter (Today + Total)

### Interactions & Animations
- **Scroll fade-up animations** on all sections (Intersection Observer)
- **Number counter animation** on hero stats
- **Profile image B&W toggle** — Click to switch between grayscale and color
- **Skill card 3D tilt** on hover (desktop)
- **Parallax kanji decorations** on scroll
- **Smooth scroll** for all anchor links
- **Mobile hamburger menu** with full-screen overlay
- **Back to top button**
- **Button hover animations** with background sweep effect
- **Card hover animations** with border color change and slide

### Data & Backend
- **Real Visitor Counter** — Tracks daily and total visits using RESTful Table API
- **Contact Form** — Saves messages to `contact_messages` table
- **Tables**: `visitors` (visit_date, timestamp), `contact_messages` (firstName, lastName, email, projectUrl, budget, message)

### Responsive Design
- Fully responsive on all devices (desktop, tablet, mobile)
- Canvas animations disabled on mobile for performance
- Optimized for 2GB RAM mobile devices
- iOS Safari compatible

---

## 📁 File Structure

```
index.html              — Main portfolio page
css/style.css           — All styles (Japanese editorial theme)
js/main.js              — All JavaScript (animations, counter, interactions)
images/profile.webp     — Profile picture
README.md               — This file
```

## 🔗 Entry URIs

| Path | Description |
|------|-------------|
| `/` or `/index.html` | Main portfolio page |
| `#hero` | Hero section (top) |
| `#about` | About Me section |
| `#skills` | Skills section |
| `#experience` | Experience & Education section |
| `#contact` | Contact & Hire Me section |

## 📊 Data Models

### `visitors` Table
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique visit ID (auto) |
| visit_date | text | Date of visit (YYYY-MM-DD) |
| timestamp | number | Unix timestamp of visit |

### `contact_messages` Table
| Field | Type | Description |
|-------|------|-------------|
| id | text | Unique message ID (auto) |
| firstName | text | First name |
| lastName | text | Last name |
| email | text | Email address |
| projectUrl | text | Project URL (optional) |
| budget | text | Budget range selection |
| message | rich_text | Message content |

---

## 🚀 Recommended Next Steps

1. **Add project showcase section** — Display past community management projects with screenshots
2. **Add testimonials** — Quotes from people you've worked with
3. **Blog/Articles section** — Share crypto insights and community tips
4. **SEO optimization** — Add Open Graph meta tags, structured data
5. **Analytics integration** — Add more detailed visitor analytics
6. **Custom domain** — Connect a custom domain name

---

Built with ❤️ using HTML, CSS, and JavaScript. Japanese editorial design inspired by Azuki anime aesthetics.

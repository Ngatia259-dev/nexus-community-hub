# CommunityHub — Frontend Implementation Plan
### Group Final Project | 12-Week Web Dev Bootcamp

---

## 🎯 Project Overview

**CommunityHub** is a full-stack community platform that blends **networking**, **project collaboration**, and **career opportunities** for developers. Think of it as a hybrid of LinkedIn + GitHub Discussions + Dev.to — purpose-built for the tech community.

### Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React (Vite) + React Router v6 |
| Styling | Tailwind CSS + CSS Modules |
| State Management | Context API + useReducer |
| API (Phase 1) | JSONPlaceholder (mock) → own API later |
| Deployment | Vercel / Netlify |

---

## 🗂️ Full Project Structure

```
communityHub/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Post/
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostList.jsx
│   │   │   └── CreatePost.jsx
│   │   ├── User/
│   │   │   ├── UserCard.jsx
│   │   │   └── UserProfile.jsx
│   │   ├── Network/
│   │   │   ├── ConnectionCard.jsx
│   │   │   └── ConnectionList.jsx
│   │   ├── Career/
│   │   │   ├── JobCard.jsx
│   │   │   └── JobList.jsx
│   │   └── shared/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       ├── Avatar.jsx
│   │       ├── Modal.jsx
│   │       └── Loader.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Posts.jsx
│   │   ├── PostDetail.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Network.jsx
│   │   ├── Careers.jsx
│   │   ├── Profile.jsx
│   │   └── About.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useLocalStorage.js
│   │   ├── useAuth.js
│   │   └── useSearch.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── PostContext.jsx
│   ├── utils/
│   │   ├── formatDate.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 📄 Pages & Features

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero banner, recent posts, featured members, job highlights |
| Posts | `/posts` | All community posts with search & tag filter |
| Post Detail | `/posts/:id` | Full post view + comments |
| Create Post | `/posts/create` | Rich post creation form |
| Network | `/network` | Browse & connect with developers |
| Careers | `/careers` | Job board / opportunities |
| Profile | `/profile/:username` | User profile, skills, projects |
| About | `/about` | About the community hub |

---

## 👥 Task Distribution

> Team of 7 | Sprint Duration: 2 weeks

---

### 🔴 Member 1 — `Ngatia259-dev`
**Role: Lead Frontend Architect & Core Infrastructure**

This is the most critical role — responsible for the app's foundation, routing, state management, and integration layer that all other members depend on.

#### Tasks:
- **Project Initialization**
  - Initialize Vite + React project
  - Configure Tailwind CSS, React Router v6, folder structure
  - Set up ESLint, Prettier, `.env` setup

- **App Entry Point & Routing**
  - Build `main.jsx` and `App.jsx`
  - Define all routes using React Router v6 (`createBrowserRouter`)
  - Implement protected route wrapper (`PrivateRoute.jsx`)
  - Handle 404 Not Found page

- **Global State Management**
  - Implement `AuthContext.jsx` — user login state, mock auth logic
  - Implement `PostContext.jsx` — posts CRUD, likes, search state
  - Wire context providers into `App.jsx`

- **Core Custom Hooks**
  - `useFetch.js` — generic data fetcher with loading/error states
  - `useLocalStorage.js` — persist liked posts, user session
  - `useSearch.js` — debounced search across posts/users
  - `useAuth.js` — expose auth context helpers

- **Design System & Global Styles**
  - Define `global.css` + `variables.css` (color tokens, typography, spacing)
  - Configure `tailwind.config.js` with custom brand theme
  - Set consistent dark/light mode toggle (localStorage-based)

- **Home Page (`Home.jsx`)**
  - Hero section with CTA
  - Featured/recent posts section (uses PostContext)
  - "Top Networkers" preview section
  - Job highlights teaser section

- **Deployment**
  - Configure `vite.config.js` for production
  - Set up Vercel/Netlify deployment pipeline
  - Configure environment variable handling

---

### 🟠 Member 2 — `kmwota-hub`
**Role: Layout Components (Header, Sidebar, Footer)**

#### Tasks:
- **`Header.jsx`**
  - Logo + brand name "CommunityHub"
  - Navigation links: Home, Posts, Network, Careers, About
  - Auth-aware: show Login button or User avatar dropdown
  - Mobile hamburger menu (responsive)
  - Dark mode toggle button

- **`Sidebar.jsx`**
  - "About the Hub" blurb
  - Popular/Trending Posts list (from PostContext)
  - Tags/Category filter links
  - "Top Members" mini-cards (avatar + name)

- **`Footer.jsx`**
  - Brand logo + tagline
  - Navigation columns: Community, Resources, Legal
  - Social media links (GitHub, Twitter/X, LinkedIn)
  - Copyright notice

- Wire Header and Footer into the global layout shell used by all pages

---

### 🟡 Member 3 — `bella1234-ai`
**Role: Post Feature Components**

#### Tasks:
- **`PostCard.jsx`**
  - Display: title, excerpt (150 chars), author avatar + name, date, tags, like count
  - Like/Unlike button with optimistic UI update (via PostContext)
  - "Read More" link to `/posts/:id`
  - Smooth hover animation

- **`PostList.jsx`**
  - Render list of `PostCard` components
  - Accept `posts`, `loading`, `error` as props
  - Show `Loader.jsx` on loading state
  - Show empty state illustration when no posts

- **`CreatePost.jsx` / `CreatePost.jsx` page**
  - Form fields: Title, Content (textarea), Tags (multi-select), Category
  - Client-side validation (required fields, min length)
  - On submit: dispatch to PostContext + show success toast

- **Posts Page (`Posts.jsx`)**
  - Fetch all posts via `useFetch`
  - Search bar (uses `useSearch` hook)
  - Tag filter chips
  - Render `PostList`

---

### 🟢 Member 4 — `essyken`
**Role: Post Detail Page & Comments UI**

#### Tasks:
- **`PostDetail.jsx` page**
  - Fetch single post by ID from JSONPlaceholder
  - Full post body rendered (support markdown-style formatting)
  - Author info with avatar, bio, follow button
  - Tags display
  - Like button (full-size)
  - Share button (copy link to clipboard)

- **Comments Section**
  - Fetch comments for post from JSONPlaceholder `/comments?postId=`
  - Render list of comments (author, body, date)
  - "Add a Comment" form (local state, appends to list)
  - Show comment count

- **Related Posts**
  - Sidebar-style "You may also like" — 3 post cards from same category

---

### 🔵 Member 5 — `muriithikennedy443-sudo`
**Role: User Profiles & Networking Page**

#### Tasks:
- **`UserCard.jsx`**
  - Avatar, name, username, role/title badge
  - Skills tags
  - Connect / Following button
  - Link to full profile

- **`UserProfile.jsx` page (`/profile/:username`)**
  - Cover photo + avatar
  - Name, username, bio, location, website
  - Skills section (badge list)
  - Projects section (card grid)
  - Posts by this user
  - Social links

- **`Network.jsx` page**
  - "People You May Know" grid
  - Search/filter by skill or role
  - `ConnectionCard.jsx` — compact user card with connect button
  - Connection count stats

- **`ConnectionList.jsx`**
  - Renders list of `ConnectionCard` components
  - Filter: All | Connected | Pending

---

### 🟣 Member 6 — `wynnexdev`
**Role: Careers Page & Shared UI Components**

#### Tasks:
- **`Careers.jsx` page (`/careers`)**
  - Job board layout — search + filter by type (Full-time, Remote, Internship)
  - Job listing cards: company, role, location, salary range, tags, posted date
  - "Apply Now" external link
  - Filter chips (Remote, Frontend, Backend, Full Stack)

- **`JobCard.jsx`**
  - Company logo placeholder, role title, company name
  - Location + type badges
  - Tech stack tags
  - Quick-apply button

- **`JobList.jsx`**
  - Renders `JobCard` list
  - Loading + empty state

- **Reusable Shared Components:**
  - `Button.jsx` — variants: primary, secondary, ghost, danger
  - `Input.jsx` — text, search, password variants with label + error
  - `Badge.jsx` — tag/status chips with color variants
  - `Loader.jsx` — animated spinner + skeleton card variant

---

### 🩷 Member 7 — `Markchege10-ux`
**Role: UI/UX Polish, About Page & Shared Components**

#### Tasks:
- **`About.jsx` page**
  - Mission statement + community values
  - Team/Contributors section (grid of member cards)
  - Stats banner: Members count, Posts, Projects, Jobs
  - Call-to-Action section: "Join the Hub"

- **Reusable Shared Components:**
  - `Card.jsx` — base card with optional header, body, footer
  - `Avatar.jsx` — image with initials fallback, size variants (sm/md/lg)
  - `Modal.jsx` — accessible modal with overlay, close button

- **Global UI Animations & Micro-interactions**
  - Page transition fade-in animation (CSS)
  - Button hover/focus styles
  - Skeleton loading screens for post and user cards
  - Toast notification component (success / error)

- **Responsive Design Audit**
  - Ensure all pages are fully responsive (mobile → desktop)
  - Test breakpoints: 375px, 768px, 1024px, 1280px

---

## 🗓️ Sprint Timeline

```
Week 1: Foundation + Components
├── Day 1-2:  Ngatia259-dev → Project setup, routing, context, hooks
├── Day 2-3:  kmwota-hub    → Header, Sidebar, Footer
├── Day 2-4:  bella1234-ai  → PostCard, PostList, CreatePost
├── Day 2-4:  essyken       → PostDetail page + Comments
└── Day 2-4:  muriithikennedy443-sudo → User components + Network page

Week 2: Integration + Polish + Deployment
├── Day 5-7:  wynnexdev     → Careers page + shared components
├── Day 5-6:  Markchege10-ux → About page + UI polish + animations
├── Day 6-7:  Ngatia259-dev → Context wiring, integration, dark mode
├── Day 7:    ALL           → Code review, merge conflicts, bug fixes
└── Day 8:    Ngatia259-dev → Production build + Vercel deployment
```

---

## 🔀 Git Workflow

```bash
# Branch naming convention
feature/<username>/<feature-name>

# Examples:
feature/kmwota-hub/header-component
feature/bella1234-ai/post-card
feature/essyken/post-detail-page
feature/ngatia259-dev/auth-context
```

**Pull Request Rules:**
- Every PR must have at least **1 reviewer** before merging
- Merge to `develop` branch first, then `main` for releases
- No direct pushes to `main`

---

## ✅ Definition of Done (Per Feature)

- [ ] Component renders without console errors
- [ ] Responsive on mobile + desktop
- [ ] Loading and error states handled
- [ ] Props properly validated (PropTypes or JSDoc)
- [ ] Code reviewed and approved by lead

---

## 🚀 Deployment Checklist (Phase 1)

- [ ] `npm run build` passes without errors
- [ ] All env variables documented in `.env.example`
- [ ] React Router configured with proper base URL
- [ ] Vercel/Netlify project linked to GitHub repo
- [ ] Preview deployment tested before merging to `main`

---

## 📦 Phase 2 Preview (Backend)

> Backend planning will follow after frontend is complete.

| Feature | Technology |
|---|---|
| REST API | Node.js + Express |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt |
| File Upload | Cloudinary |
| Deployment | Render / Railway |

---

*Phase 1 Frontend plan complete. Backend integration plan to follow.*

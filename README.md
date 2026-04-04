# ◈ CineTrack

A clean, minimal **Movie & TV Show Watchlist** web app built with React.  
Browse titles, save what you want to watch, and track your progress — all in your browser.

> 🎓 Web Programming Project — VIT Vellore | 24BDS0225

---

## 🖥️ Live Demo

🔗 [View Live on GitHub Pages](#)

---

## 📸 Screenshots

| Home Page | Watchlist | About |
|-----------|-----------|-------|
| Browse & search 13 titles | Track your saved titles | React concepts used |

---

## ✨ Features

- 🔍 **Search & Filter** — search by title or genre, filter by type (Movie / Series) and genre
- 📋 **Personal Watchlist** — add/remove titles with one click, saved in your browser
- 🏷️ **Status Tracking** — mark titles as *Want to Watch*, *Watching*, or *Watched*
- 📊 **Watchlist Stats** — see a count breakdown of your progress
- 🎬 **Detail Pages** — individual page for each title with cast, director, rating & more
- 📱 **Responsive Design** — works on mobile, tablet, and desktop
- 💾 **Persistent Storage** — watchlist saved via `localStorage`, survives page refresh

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| React Router v6 | Client-side routing |
| Context API | Global state management |
| PropTypes | Props validation |
| useState / useEffect / useMemo | React Hooks |
| localStorage | Persistent watchlist data |
| CSS (custom) | Styling with CSS variables |

---

## 📂 Project Structure

```
cinetrack/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js / Navbar.css
│   │   ├── MovieCard.js / MovieCard.css
│   │   ├── SearchBar.js / SearchBar.css
│   │   └── FilterBar.js / FilterBar.css
│   ├── context/
│   │   └── WatchlistContext.js
│   ├── data/
│   │   └── movies.js
│   ├── pages/
│   │   ├── Home.js / Home.css
│   │   ├── MovieDetail.js / MovieDetail.css
│   │   ├── Watchlist.js / Watchlist.css
│   │   ├── About.js / About.css
│   │   └── NotFound.js / NotFound.css
│   ├── App.js / App.css
│   └── index.js / index.css
└── package.json
```

---

## ⚛️ React Concepts Covered

- ✅ **React JSX** — used throughout all components and pages
- ✅ **Class Components & Constructors** — `NavBrand` (Navbar) and `About` page use class components with constructors
- ✅ **Functional Components** — `Home`, `Watchlist`, `MovieDetail`, `MovieCard`, etc.
- ✅ **State & Props** — `useState` for local state, props passed between parent/child components
- ✅ **Props Validation** — `PropTypes` used in `MovieCard`, `SearchBar`, and `FilterBar`
- ✅ **Styling in React** — separate CSS files per component, CSS variables for theming
- ✅ **Hooks** — `useState`, `useEffect`, `useMemo`, `useContext`, `useParams`, `useNavigate`
- ✅ **React Router v6** — multi-page routing with `<Routes>`, `<Route>`, `useParams`
- ✅ **Context API** — `WatchlistContext` for global watchlist state shared across all pages
- ✅ **Deploying** — deployed via GitHub Pages

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cinetrack.git

# 2. Go into the project folder
cd cinetrack

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at `http://localhost:3000`

---

## 📦 Deployment (GitHub Pages)

```bash
# 1. Install gh-pages
npm install gh-pages --save-dev

# 2. Add this to package.json
"homepage": "https://your-username.github.io/cinetrack"

# 3. Deploy
npm run deploy
```

---

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Browse and search all movies & shows |
| `/movie/:id` | Movie Detail | Individual title detail page |
| `/watchlist` | Watchlist | Your saved titles with status |
| `/about` | About | About the app and React concepts used |
| `*` | 404 Not Found | Fallback page for unknown routes |

---

## 👤 Author

**Himanshu Yadav**  
Registration No: 24BDS0225  
B.Tech CSE (Data Science) — VIT Vellore  

---

## 📝 License

This project was made for educational purposes as part of the Web Programming course at VIT Vellore.
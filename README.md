# TechAI Blog — Complete File Structure

## 📁 Project Files

```
techai-blog/
│
├── index.html          ← Homepage (Featured post + Articles grid + Sidebar)
├── about.html          ← About page with team grid
├── contact.html        ← Contact form page
├── post.html           ← Single blog post page
│
├── css/
│   ├── style.css       ← Main stylesheet (CSS Custom Properties + CSS Grid)
│   └── responsive.css  ← Mobile/Tablet responsive overrides
│
└── js/
    └── main.js         ← All JavaScript (nav, search, filter, newsletter, etc.)
```

## 🗂️ What Each File Does

| File | Purpose |
|------|---------|
| `index.html` | Main homepage: sticky header, hero featured post, 3-column CSS Grid article cards, sidebar, newsletter, footer |
| `about.html` | Team profiles using CSS Grid, mission statement |
| `contact.html` | Contact form with validation and toast notification |
| `post.html` | Full blog post with sidebar, tags, blockquote |
| `css/style.css` | CSS Variables, CSS Grid layout, card styles, header, footer, modals |
| `css/responsive.css` | Media queries for 960px, 720px, 480px breakpoints |
| `js/main.js` | Hamburger nav, live search modal, category filter, load more cards, newsletter subscribe, sticky header, toast notifications |

## 🧱 Key CSS Grid Uses

### Main Layout (index.html)
```css
.main-layout {
  display: grid;
  grid-template-columns: 1fr 300px;  /* Content + Sidebar */
  gap: 32px;
}
```

### Articles Grid (3 columns)
```css
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

### Hero Card (split layout)
```css
.hero-card {
  display: grid;
  grid-template-columns: 1fr 1fr;  /* Image + Text */
}
```

### Popular Posts in Sidebar
```css
.popular-item {
  display: grid;
  grid-template-columns: 64px 1fr;  /* Thumbnail + Text */
}
```

## ⚙️ JavaScript Features

- **Mobile hamburger menu** — toggle with animation
- **Live search modal** — filters articles by title/category as you type
- **Category filter** — click sidebar categories to show/hide cards with fade animation
- **Load more articles** — dynamically appends 3 more cards to the grid
- **Newsletter subscribe** — form with email validation + toast notification
- **Sticky header shadow** — adds shadow on scroll
- **Keyboard accessibility** — ESC key closes modals

## 🚀 How to Run

1. Open `index.html` directly in any modern browser — **no server needed**.
2. All pages link to each other: Home → Post → About → Contact
3. External dependencies loaded via CDN (fonts, Font Awesome icons)

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 960px | 2-column (content + sidebar), 3-column article grid |
| ≤ 960px | Single column, 2-column article grid |
| ≤ 720px | Mobile nav, 1-column article grid || ≤ 480px | Compact spacing, hidden elements |

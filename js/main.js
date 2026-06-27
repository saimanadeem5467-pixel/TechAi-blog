/* =============================================
   TechAI Blog — main.js
   All interactive features
   ============================================= */

'use strict';

/* ---- DOM References ---- */
const hamburger    = document.getElementById('hamburger');
const nav          = document.getElementById('nav');
const overlay      = document.getElementById('overlay');
const searchBtn    = document.getElementById('searchBtn');
const searchModal  = document.getElementById('searchModal');
const closeSearch  = document.getElementById('closeSearch');
const modalSearch  = document.getElementById('modalSearch');
const searchResults= document.getElementById('searchResults');
const categoryLinks= document.querySelectorAll('.cat-link[data-filter]');
const articlesGrid = document.getElementById('articlesGrid');
const loadMoreBtn  = document.getElementById('loadMoreBtn');
const newsletterForm = document.getElementById('newsletterForm');
const header       = document.getElementById('header');

/* =============================================
   1. MOBILE NAV TOGGLE
   ============================================= */
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
  overlay.classList.toggle('show');
});

overlay?.addEventListener('click', closeAll);

function closeAll() {
  hamburger?.classList.remove('active');
  nav?.classList.remove('open');
  searchModal?.classList.remove('open');
  overlay?.classList.remove('show');
}

/* =============================================
   2. SEARCH MODAL
   ============================================= */
searchBtn?.addEventListener('click', openSearch);

function openSearch() {
  searchModal.classList.add('open');
  overlay.classList.add('show');
  setTimeout(() => modalSearch?.focus(), 100);
}

closeSearch?.addEventListener('click', () => {
  searchModal.classList.remove('open');
  overlay.classList.remove('show');
  searchResults.innerHTML = '';
  if (modalSearch) modalSearch.value = '';
});

/* Live Search filtering */
const allArticles = [
  { title: 'The Future of AI: Trends That Will Shape 2025 and Beyond', category: 'Artificial Intelligence', url: 'post.html' },
  { title: 'Top 10 AI Tools Every Developer Should Know in 2025', category: 'Artificial Intelligence', url: 'post.html' },
  { title: 'React 19: New Features and Everything You Need to Know', category: 'Web Development', url: 'post.html' },
  { title: 'Cloud Computing Trends to Watch in 2025', category: 'Cloud Computing', url: 'post.html' },
  { title: "Beginner's Guide to Neural Networks in Python", category: 'Machine Learning', url: 'post.html' },
  { title: 'TypeScript 5.5: What\'s New and Why It Matters', category: 'Programming', url: 'post.html' },
  { title: 'How to Use GPT-4 API to Build Real Applications', category: 'Artificial Intelligence', url: 'post.html' },
  { title: 'How ChatGPT is Revolutionizing Software Development', category: 'Artificial Intelligence', url: 'post.html' },
  { title: "A Beginner's Guide to Machine Learning", category: 'Machine Learning', url: 'post.html' },
  { title: 'JavaScript ES2025: Top New Features', category: 'Programming', url: 'post.html' },
];

modalSearch?.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (!query) { searchResults.innerHTML = ''; return; }

  const matches = allArticles.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    searchResults.innerHTML = '<p style="color:var(--text-light);font-size:.875rem">No articles found.</p>';
    return;
  }

  searchResults.innerHTML = matches.map(a => `
    <div class="search-result-item">
      <a href="${a.url}">${a.title}</a>
      <span style="font-size:.75rem;color:var(--text-light);margin-left:8px">${a.category}</span>
    </div>
  `).join('');
});

/* =============================================
   3. CATEGORY FILTER
   ============================================= */
categoryLinks?.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;

    // Update active state
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Filter cards
    const cards = articlesGrid?.querySelectorAll('.card');
    cards?.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.style.display = show ? '' : 'none';

      /* Fade animation */
      if (show) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity .3s ease, transform .3s ease';
          card.style.opacity   = '1';
          card.style.transform = 'translateY(0)';
        });
      }
    });
  });
});

/* =============================================
   4. LOAD MORE / VIEW ALL ARTICLES
   ============================================= */
const extraCards = [
  {
    category: 'ai', labelClass: 'ai', label: 'Artificial Intelligence',
    img: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=600&q=80',
    title: 'Large Language Models Explained for Developers',
    excerpt: 'Understand the mechanics behind LLMs and how to apply them in your projects.',
    author: 'David Kim', date: 'May 19, 2025', read: '6 min read',
    avatar: 'https://i.pravatar.cc/28?img=33'
  },
  {
    category: 'web', labelClass: 'web', label: 'Web Development',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80',
    title: 'CSS Grid vs Flexbox: Which Should You Use?',
    excerpt: 'A comprehensive comparison to help you pick the right layout tool for every situation.',
    author: 'Nina Scott', date: 'May 18, 2025', read: '5 min read',
    avatar: 'https://i.pravatar.cc/28?img=47'
  },
  {
    category: 'programming', labelClass: 'prog', label: 'Programming',
    img: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&q=80',
    title: '10 Python Tricks That Will Make You a Better Developer',
    excerpt: 'Practical Python tips from clean code to performance optimizations.',
    author: 'Carlos G.', date: 'May 17, 2025', read: '4 min read',
    avatar: 'https://i.pravatar.cc/28?img=52'
  }
];

let loaded = false;
loadMoreBtn?.addEventListener('click', () => {
  if (!loaded) {
    extraCards.forEach(c => {
      const card = document.createElement('article');
      card.className = 'card';
      card.dataset.category = c.category;
      card.style.opacity = '0';
      card.innerHTML = `
        <div class="card-image"><img src="${c.img}" alt="${c.title}" loading="lazy"/></div>
        <div class="card-body">
          <span class="category-label ${c.labelClass}">${c.label}</span>
          <h3 class="card-title"><a href="post.html">${c.title}</a></h3>
          <p class="card-excerpt">${c.excerpt}</p>
          <div class="card-meta">
            <img src="${c.avatar}" alt="${c.author}" />
            <span>${c.author}</span>
            <span class="meta-divider">·</span>
            <span>${c.date}</span>
            <span class="meta-divider">·</span>
            <span>${c.read}</span>
          </div>
        </div>`;
      articlesGrid.appendChild(card);
      requestAnimationFrame(() => {
        card.style.transition = 'opacity .4s ease, transform .4s ease';
        card.style.transform  = 'translateY(12px)';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
      });
    });
    loadMoreBtn.textContent = 'No More Articles';
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.opacity = '.5';
    loaded = true;
  }
});

/* =============================================
   5. NEWSLETTER SUBSCRIBE
   ============================================= */
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput')?.value;
  if (email) {
    showToast(`✓ You're subscribed with ${email}`);
    newsletterForm.reset();
  }
});

/* =============================================
   6. STICKY HEADER SHADOW
   ============================================= */
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header?.classList.add('scrolled');
    header?.style.setProperty('box-shadow', '0 2px 12px rgba(0,0,0,.1)');
  } else {
    header?.style.removeProperty('box-shadow');
  }
}, { passive: true });

/* =============================================
   7. TOAST NOTIFICATION HELPER
   ============================================= */
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =============================================
   8. KEYBOARD: ESC CLOSES MODAL
   ============================================= */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAll();
});
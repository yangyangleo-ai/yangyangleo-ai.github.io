'use strict';
const films = {
  brand: {
    title: 'C3plus / C³ HUB+ — Corporate Brand Film',
    category: 'BRAND FILM / 03:41',
    file: 'brand',
    portrait: false,
    description: 'Flagship enterprise brand film combining generative AI visuals, product messaging, subtitles, and commercial post-production packaging. Original brand assets and captions preserved.'
  },
  cyber: {
    title: 'The Only Exit in Cyber City',
    category: 'AI NARRATIVE / 00:29',
    file: 'cyber',
    portrait: true,
    description: 'Sci-fi AI narrative short for C3plus focusing on character continuity, cyberpunk environment staging, storyboard-driven shot matching, and commercial edit pacing.'
  },
  darknet: {
    title: 'Connected to the Deep Darknet',
    category: 'AI NARRATIVE / 00:35',
    file: 'darknet',
    portrait: true,
    description: 'Dialogue-driven AI creative short solving character/scene consistency, complex action shot breakdowns, reference-driven motion, and sound design.'
  },
  moon: {
    title: 'C3plus Mid-Autumn Brand Short',
    category: 'EMOTIONAL BRAND SHORT / 00:34',
    file: 'moon',
    portrait: true,
    description: 'Seasonal lifestyle brand short balancing warm emotional storytelling, moonlight atmosphere, audio pacing, and clean brand closure.'
  },
  tutorial: {
    title: 'C3plus AI Brand Creation Walkthrough',
    category: 'PRODUCT EXPLAINER / 01:19',
    file: 'tutorial',
    portrait: true,
    description: 'Vertical SaaS product walkthrough combining real UI capture, explanatory narration, motion callouts, and structured subtitles.'
  },
  leo: {
    title: '@羊羊Leo — Dynamic 3D Typography & Presenter System',
    category: 'PERSONAL IP / PROGRAMMATIC MOTION / 00:12',
    file: 'leo',
    portrait: false,
    description: 'Reusable kinetic typography wall and modular presenter system built for OpenFilm + FFmpeg workflows, featuring counter-scrolling depth layers and soft-focus parallax.'
  },
  jarvis: {
    title: 'Jarvis — International Brand Film',
    category: 'INTERNATIONAL PROJECT / 06:36',
    file: 'jarvis',
    portrait: false,
    description: 'International client project owned end-to-end from client brief: creative concepting, visual storytelling, dynamic motion graphics, editing, and full-film delivery.'
  },
  nebura: {
    title: 'Nebura — International Brand Film',
    category: 'INTERNATIONAL PROJECT / 02:58',
    file: 'nebura',
    portrait: false,
    description: 'International brand production translating technology positioning into visual narrative across scenes, motion graphics, and sound design.'
  },
  'one-cubic': {
    title: 'One Cubic — International Brand Visual',
    category: 'INTERNATIONAL PROJECT / 00:55',
    file: 'one-cubic',
    portrait: false,
    description: 'High-impact international brand film combining 3D visual identity, rhythmic cutting, and futuristic sound design from concept to final master.'
  }
};

const dialog = document.querySelector('#film-dialog');
const player = document.querySelector('#film-player');
const ambient = document.querySelector('#hero-video');
const ambientToggle = document.querySelector('#ambient-toggle');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let returnFocus = null;
let ambientWanted = !reduceMotion.matches;
let ambientVisible = true;

function syncAmbientLabel() {
  const playing = !ambient.paused;
  ambientToggle.setAttribute('aria-pressed', String(playing));
  ambientToggle.innerHTML = playing ? 'Pause Preview <span aria-hidden="true">Ⅱ</span>' : 'Play Preview <span aria-hidden="true">▷</span>';
}
async function syncAmbient() {
  if (ambientWanted && ambientVisible && !document.hidden && !dialog.open) {
    try { await ambient.play(); } catch {}
  } else {
    ambient.pause();
  }
  syncAmbientLabel();
}
ambient.addEventListener('play', syncAmbientLabel);
ambient.addEventListener('pause', syncAmbientLabel);
ambientToggle.addEventListener('click', () => { ambientWanted = ambient.paused; syncAmbient(); });
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => { ambientVisible = entries[0].isIntersecting; syncAmbient(); }, { threshold: 0.12 }).observe(ambient);
}
document.addEventListener('visibilitychange', syncAmbient);
reduceMotion.addEventListener('change', () => { ambientWanted = !reduceMotion.matches; syncAmbient(); });

function openFilm(key, trigger) {
  const film = films[key];
  if (!film) return;
  returnFocus = trigger;
  document.querySelector('#film-title').textContent = film.title;
  document.querySelector('#film-category').textContent = film.category;
  document.querySelector('#film-description').textContent = film.description;
  document.querySelector('#film-error').hidden = true;
  document.querySelector('#film-download').href = `assets/video/${film.file}.mp4`;
  player.className = film.portrait ? 'portrait-film' : 'landscape-film';
  player.poster = `assets/images/${film.file}.jpg`;
  player.src = `assets/video/${film.file}.mp4`;
  dialog.showModal();
  document.body.classList.add('modal-open');
  ambient.pause();
  player.play().catch(() => {});
}
document.querySelectorAll('[data-film]').forEach(btn => btn.addEventListener('click', () => openFilm(btn.dataset.film, btn)));
document.querySelector('#close-film').addEventListener('click', () => dialog.close());
dialog.addEventListener('cancel', () => player.pause());
dialog.addEventListener('click', e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
  }
});
dialog.addEventListener('close', () => {
  player.pause();
  player.removeAttribute('src');
  player.load();
  document.body.classList.remove('modal-open');
  if (returnFocus) returnFocus.focus({ preventScroll: true });
  syncAmbient();
});
player.addEventListener('error', () => { if (dialog.open) document.querySelector('#film-error').hidden = false; });

const approaches = {
  brand: {
    image: 'brand',
    alt: 'Futuristic cityscape frame from commercial brand film',
    label: 'BRAND / CLARITY FIRST',
    kicker: 'Make the product clear, and make the craft unmistakable.',
    heading: ['Lock the message first,', 'then choose the pipeline.'],
    description: 'Start from business positioning, audience, budget, and turnaround. Combine generative visuals with real UI captures and motion graphics—testing hero shots early so every dollar and render serves the commercial message.',
    route: ['Brief & Script', 'Hero Shot Tests', 'Generation & Final Master']
  },
  story: {
    image: 'cyber-screens',
    alt: 'Cyberpunk control room screen frame study',
    label: 'STORY / SHOT BY SHOT',
    kicker: 'Keep characters, world, and emotion holding together.',
    heading: ['Break every scene down', 'before hitting generate.'],
    description: 'Decompose complex shots by character continuity, lighting, camera move, and transition. Match each shot to image-to-video, reference control, or hybrid compositing—then finish with tight pacing and sound design.',
    route: ['Character & Storyboard', 'Multi-Model Shot Gen', 'Edit, Fix & Sound']
  },
  ip: {
    image: 'leo-brand',
    alt: 'Modular presenter framing and 3D typography workflow',
    label: 'PIPELINES / REPEATABLE SYSTEMS',
    kicker: 'Turn one-off craft into scalable, auditable workflows.',
    heading: ['Ship real outputs,', 'codify repeatable templates.'],
    description: 'Use OpenFilm, Three.js 3D camera choreography, FFmpeg, and cross-AI memory templates so recurring explainers, product demos, and automated short-form pipelines ship faster without sacrificing visual standards.',
    route: ['Modular Template', 'Automated Batch / Edit', 'QA & Reusable Assets']
  }
};
const tabs = Array.from(document.querySelectorAll('[data-approach]'));
function setApproach(key, focus = false) {
  const info = approaches[key];
  tabs.forEach(tab => {
    const selected = tab.dataset.approach === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  document.querySelector('#approach-panel').setAttribute('aria-labelledby', `tab-${key}`);
  const picture = document.querySelector('#approach-picture');
  picture.src = `assets/images/${info.image}.jpg`;
  picture.alt = info.alt;
  document.querySelector('#approach-image-label').textContent = info.label;
  document.querySelector('#approach-kicker').textContent = info.kicker;
  const title = document.querySelector('#approach-subtitle');
  title.replaceChildren(document.createTextNode(info.heading[0]), document.createElement('br'), document.createTextNode(info.heading[1]));
  document.querySelector('#approach-description').textContent = info.description;
  const route = document.querySelector('#approach-route');
  route.replaceChildren();
  info.route.forEach((label, idx) => {
    if (idx) {
      const arrow = document.createElement('i');
      arrow.textContent = '→';
      arrow.setAttribute('aria-hidden', 'true');
      route.append(arrow);
    }
    const span = document.createElement('span');
    span.textContent = label;
    route.append(span);
  });
}
tabs.forEach((tab, idx) => {
  tab.addEventListener('click', () => setApproach(tab.dataset.approach));
  tab.addEventListener('keydown', e => {
    let next = null;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== null) { e.preventDefault(); setApproach(tabs[next].dataset.approach, true); }
  });
});

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  const email = 'solissky0@gmail.com';
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(email);
    } else {
      const input = document.createElement('textarea');
      input.value = email;
      input.style.position = 'fixed';
      input.style.top = '-1000px';
      document.body.append(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    status.textContent = `Email copied: ${email}`;
  } catch {
    status.textContent = `Copy email: ${email}`;
  }
});
syncAmbient();

const galleryCases = {
  ecommerce: {
    title: 'E-Commerce Product Visual System',
    category: 'ECOMMERCE / PRODUCT DETAIL',
    description: 'Commercial product detail page design and visual hierarchy system across 11 full-page slices.',
    images: Array.from({ length: 11 }, (_, i) => `assets/images/portfolio/ecommerce-${String(i + 1).padStart(2, '0')}.jpg`)
  },
  beauty: {
    title: 'Beauty Brand Outdoor Ad Campaign',
    category: 'BEAUTY / BRAND CAMPAIGN',
    description: 'Commercial outdoor beauty campaign photography and key visual direction.',
    images: Array.from({ length: 6 }, (_, i) => `assets/images/portfolio/beauty-${String(i + 1).padStart(2, '0')}.jpg`)
  },
  tea: {
    title: 'Tea Brand Campaign Key Visuals',
    category: 'BEVERAGE / CAMPAIGN VISUAL',
    description: 'Brand poster series combining portrait direction, product styling, and color grading.',
    images: Array.from({ length: 5 }, (_, i) => `assets/images/portfolio/tea-${String(i + 1).padStart(2, '0')}.jpg`)
  },
  events: {
    title: 'VPHOTO — Live Brand Events',
    category: 'PHOTOGRAPHY / LIVE EVENTS',
    description: 'Commercial event and brand launch photography covering keynote moments and portrait storytelling.',
    images: Array.from({ length: 5 }, (_, i) => `assets/images/portfolio/events-${String(i + 1).padStart(2, '0')}.jpg`)
  },
  drama: {
    title: 'Journey to the West: Awakening (Concept)',
    category: 'AI SHORT DRAMA / IN DEVELOPMENT',
    description: 'Original AI narrative concept currently in pre-production. Key visual poster exploration only.',
    images: ['assets/images/portfolio/drama-01.jpg']
  }
};

const photoDialog = document.querySelector('#gallery-dialog');
const photoStage = document.querySelector('#gallery-stage');
const photoImage = document.querySelector('#gallery-image');
let currentGallery = null, photoIndex = 0, photoFocus = null;
function showPhoto(index) {
  const info = galleryCases[currentGallery];
  photoIndex = (index + info.images.length) % info.images.length;
  photoImage.src = info.images[photoIndex];
  photoImage.alt = `${info.title} — Image ${photoIndex + 1}`;
  document.querySelector('#gallery-count').textContent = `${photoIndex + 1} / ${info.images.length}`;
  photoStage.scrollTop = 0;
}
document.querySelectorAll('[data-gallery]').forEach(btn => btn.addEventListener('click', () => {
  currentGallery = btn.dataset.gallery;
  photoFocus = btn;
  const info = galleryCases[currentGallery];
  document.querySelector('#gallery-title').textContent = info.title;
  document.querySelector('#gallery-category').textContent = info.category;
  document.querySelector('#gallery-description').textContent = info.description;
  photoStage.classList.remove('zoomed');
  document.querySelector('#gallery-zoom').setAttribute('aria-pressed', 'false');
  document.querySelector('#gallery-zoom').textContent = 'Zoom In';
  showPhoto(0);
  photoDialog.showModal();
  document.body.classList.add('modal-open');
  ambient.pause();
}));
document.querySelector('#close-gallery').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('close', () => {
  photoImage.removeAttribute('src');
  document.body.classList.remove('modal-open');
  if (photoFocus) photoFocus.focus({ preventScroll: true });
  syncAmbient();
});
document.querySelector('#gallery-prev').addEventListener('click', () => showPhoto(photoIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showPhoto(photoIndex + 1));
photoDialog.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); showPhoto(photoIndex - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); showPhoto(photoIndex + 1); }
});
document.querySelector('#gallery-zoom').addEventListener('click', e => {
  const active = photoStage.classList.toggle('zoomed');
  e.currentTarget.setAttribute('aria-pressed', String(active));
  e.currentTarget.textContent = active ? 'Fit Screen' : 'Zoom In';
});

// Inicializar iconos
lucide.createIcons();

const ARTICLE_STORAGE_KEY = 'smd-article-data';
const ARTICLE_FALLBACK = {
    title: 'Cuando la comunidad se vuelve abrigo',
    category: 'Iglesia en el Mundo',
    body: 'Un relato sereno sobre personas que se acompanan para sostener la fe en medio de la prisa.',
    excerpt: 'Lectura larga para quienes buscan contexto sin ruido.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
    author: 'Redaccion SMD',
    highlights: [
        'Texto amplio y limpio en una sola columna.',
        'Una unica imagen protagonista con el branding de SMD.',
        'CTA final para apoyar la mision periodistica.'
    ],
    callout: 'La fe crece cuando se vuelve historia compartida.',
    paragraphs: [
        'Las comunidades catolicas que acompanamos aman la calma: leen con tiempo, hablan despacio y se dejan tocar por historias reales.',
        'En esta pieza bajamos la velocidad para entender el trasfondo pastoral y humano de una noticia que merece ser saboreada.',
        'La voz de los protagonistas llega limpia: sin ventanas emergentes, sin videos que interrumpan, solo palabras e imagen.',
        'El cierre es un puente hacia la accion: si algo de lo leido te movio, puedes sumar tu aporte para que sigamos investigando.',
        'Gracias por leer y por sostener un periodismo que respira hondo antes de hablar.'
    ]
};

// Categorías permitidas y normalización
const ALLOWED_CATEGORIES = {
    'vaticano': 'Vaticano',
    'iglesia en el mundo': 'Iglesia en el Mundo',
    'mundo': 'Iglesia en el Mundo',
    'tecnologia y fe': 'Iglesia en el Mundo',
    'reportajes': 'Iglesia en el Mundo',
    'cultura': 'Iglesia en el Mundo',
    'solidaridad': 'Iglesia en el Mundo',
    'actualidad': 'Iglesia en el Mundo',
    'jovenes': 'Iglesia en el Mundo',
    'smd radio': 'Iglesia en el Mundo',
    'iglesia en el salvador': 'Iglesia en el Salvador',
    'iglesia en el el salvador': 'Iglesia en el Salvador',
    'liturgia': 'Liturgia',
    'siervas de la misericordia de dios': 'Siervas de la Misericordia de Dios',
    'opinion': 'Opinión'
};

function normalizeCategory(value = '') {
    const normalized = value.trim().toLowerCase();
    if (ALLOWED_CATEGORIES[normalized]) return ALLOWED_CATEGORIES[normalized];
    return '';
}

function applyAllowedCategories() {
    const categoryPills = document.querySelectorAll('.pill');
    categoryPills.forEach((pill) => {
        const raw = pill.textContent || pill.dataset.category || '';
        const cleaned = normalizeCategory(raw);
        if (cleaned) {
            pill.textContent = cleaned;
        } else {
            pill.classList.add('pill--hidden');
        }
    });

    const articleCards = document.querySelectorAll('[data-article]');
    articleCards.forEach((card) => {
        const dataCat = card.dataset.category || '';
        const pill = card.querySelector('.pill');
        const fallbackText = pill ? pill.textContent : '';
        const cleaned = normalizeCategory(dataCat || fallbackText);
        card.dataset.category = cleaned;
        if (pill) {
            if (cleaned) {
                pill.textContent = cleaned;
                pill.classList.remove('pill--hidden');
            } else {
                pill.classList.add('pill--hidden');
            }
        }
    });
}

function saveArticleData(data = {}) {
    try {
        sessionStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn('No se pudo guardar el articulo en sesion', error);
    }
}

function loadArticleData() {
    try {
        const raw = sessionStorage.getItem(ARTICLE_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        console.warn('No se pudo leer el articulo en sesion', error);
        return null;
    }
}

function buildArticlePayload(article = {}) {
    const merged = { ...ARTICLE_FALLBACK, ...article };
    const baseParagraphs = Array.isArray(merged.paragraphs) && merged.paragraphs.length ? merged.paragraphs : ARTICLE_FALLBACK.paragraphs;
    const paragraphs = merged.body ? [merged.body, ...baseParagraphs.slice(1)] : baseParagraphs;

    return {
        ...merged,
        category: normalizeCategory(merged.category || ARTICLE_FALLBACK.category) || ARTICLE_FALLBACK.category,
        excerpt: merged.excerpt || merged.body || ARTICLE_FALLBACK.excerpt,
        paragraphs
    };
}

function redirectToArticlePage(article) {
    if (!article) return;
    const payload = buildArticlePayload(article);
    saveArticleData(payload);
    window.location.href = 'article.html';
}

// Menu movil
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let lastFocusedElement = null;

function toggleMenu() {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open');
    if (isOpen) {
        document.body.classList.remove('no-scroll');
    } else {
        document.body.classList.add('no-scroll');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
}

if (mobileMenu) {
    mobileMenu.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
            toggleMenu();
        }
    });
}

// Animaciones de entrada suaves
function initRevealAnimations() {
    const revealTargets = document.querySelectorAll('.hero__feature, .hero__latest, .news-card, .category-block, .radio__panel, .newsletter, .footer__inner');
    if (!revealTargets.length) return;

    const supportObserver = 'IntersectionObserver' in window;

    if (!supportObserver) {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

    revealTargets.forEach((el) => {
        el.classList.add('js-reveal');
        observer.observe(el);
    });
}

// Imagenes con blur-up ligero
function initImagePlaceholders() {
    const fallbackSrc = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop';
    const images = document.querySelectorAll('.feature__media img, .news-card__media img');
    images.forEach((img) => {
        img.loading = 'lazy';
        img.decoding = 'async';
        const markLoaded = () => {
            img.classList.remove('image-loading');
            img.classList.add('image-loaded');
        };

        if (img.complete && img.naturalWidth !== 0) {
            markLoaded();
        } else {
            img.classList.add('image-loading');
            img.addEventListener('load', markLoaded, { once: true });
            img.addEventListener('error', () => {
                if (img.dataset.fallbackApplied) {
                    markLoaded();
                    return;
                }
                img.dataset.fallbackApplied = 'true';
                img.src = fallbackSrc;
            }, { once: true });
        }
    });
}

initRevealAnimations();
initImagePlaceholders();
applyAllowedCategories();
initHeroStickyButton();
initArticlePage();

// Boton sticky del hero que desaparece al llegar al destacado
function initHeroStickyButton() {
    const button = document.getElementById('hero-sticky-btn');
    const buttonWrap = document.getElementById('hero-sticky-wrap');
    const hero = document.querySelector('.hero');
    const target = document.querySelector('.feature__card');

    if (!button || !buttonWrap || !hero || !target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let heroVisible = true;
    let targetVisible = false;

    const updateState = () => {
        const shouldHide = targetVisible || !heroVisible;
        button.classList.toggle('is-hidden', shouldHide);
        buttonWrap.classList.toggle('is-hidden', shouldHide);
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            heroVisible = entry.isIntersecting;
            updateState();
        });
    }, { threshold: 0.1 });

    const targetObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            targetVisible = entry.isIntersecting;
            updateState();
        });
    }, { threshold: 0.25 });

    heroObserver.observe(hero);
    targetObserver.observe(target);

    button.addEventListener('click', () => {
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        const header = document.getElementById('main-header');
        const offset = header ? header.offsetHeight + 16 : 16; /* Offset para evitar que el header tape el destacado */
        const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior });
        button.classList.add('is-hidden');
    });
}

// Menu desplegable de secciones
const sectionsDropdown = document.getElementById('sections-dropdown');
const sectionsDropdownToggle = document.getElementById('sections-dropdown-toggle');
const sectionsDropdownMenu = document.getElementById('sections-dropdown-menu');

function closeSectionsDropdown() {
    if (!sectionsDropdown || !sectionsDropdownToggle) return;
    sectionsDropdown.classList.remove('is-open');
    sectionsDropdownToggle.setAttribute('aria-expanded', 'false');
}

if (sectionsDropdown && sectionsDropdownToggle) {
    sectionsDropdownToggle.addEventListener('click', () => {
        const isOpen = sectionsDropdown.classList.contains('is-open');
        sectionsDropdown.classList.toggle('is-open');
        sectionsDropdownToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });

    if (sectionsDropdownMenu) {
        sectionsDropdownMenu.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link) {
                closeSectionsDropdown();
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (!sectionsDropdown.contains(event.target)) {
            closeSectionsDropdown();
        }
    });

    document.addEventListener('focusin', (event) => {
        if (!sectionsDropdown.contains(event.target)) {
            closeSectionsDropdown();
        }
    });
}

// Modal de articulo
const articleModal = document.getElementById('article-modal');
const closeArticleModalBtn = document.getElementById('close-article-modal');
const articleModalTitle = document.getElementById('article-modal-title');
const articleModalCategory = document.getElementById('article-modal-category');
const articleModalBody = document.getElementById('article-modal-body');
const articleModalImageWrap = document.getElementById('article-modal-image-wrap');
const articleModalImage = document.getElementById('article-modal-image');
const articleModalDialog = articleModal ? articleModal.querySelector('.modal__dialog') : null;

function trapModalFocus(event) {
    if (event.key !== 'Tab' || !articleModal || !articleModal.classList.contains('is-open')) return;
    const focusables = articleModal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
        if (active === first || active === articleModal) {
            event.preventDefault();
            last.focus();
        }
    } else if (active === last) {
        event.preventDefault();
        first.focus();
    }
}

function openArticleModal(data, invoker) {
    if (!articleModal) return;
    lastFocusedElement = invoker || document.activeElement;
    const { title, body, category, image } = data;
    articleModalTitle.textContent = title || 'Noticia';
    articleModalBody.textContent = body || 'Contenido no disponible para esta noticia.';
    articleModalCategory.textContent = category || '';

    if (image && articleModalImage && articleModalImageWrap) {
        articleModalImage.src = image;
        articleModalImage.alt = title || 'Imagen de noticia';
        articleModalImageWrap.classList.add('is-visible');
    } else if (articleModalImageWrap) {
        articleModalImageWrap.classList.remove('is-visible');
    }

    articleModal.classList.add('is-open');
    document.body.classList.add('no-scroll');

    if (articleModalDialog) {
        articleModalDialog.focus();
    } else if (closeArticleModalBtn) {
        closeArticleModalBtn.focus();
    }
}

function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove('is-open');
    const menuOpen = mobileMenu && mobileMenu.classList.contains('is-open');
    if (!menuOpen) {
        document.body.classList.remove('no-scroll');
    }
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

if (closeArticleModalBtn) {
    closeArticleModalBtn.addEventListener('click', closeArticleModal);
}

if (articleModal) {
    articleModal.addEventListener('click', (event) => {
        if (event.target === articleModal) {
            closeArticleModal();
        }
    });
    articleModal.addEventListener('keydown', trapModalFocus);
}

function getArticleData(card) {
    const titleNode = card.querySelector('h1, h2, h3, h4');
    const bodyNode = card.querySelector('p');
    const categoryNode = card.querySelector('span');

    const title = card.dataset.title || (titleNode ? titleNode.textContent.trim() : 'Noticia');
    const body = card.dataset.body || (bodyNode ? bodyNode.textContent.trim() : 'Contenido no disponible para esta noticia.');
    const category = card.dataset.category || (categoryNode ? categoryNode.textContent.trim() : '');
    const image = card.dataset.image || (card.querySelector('img') ? card.querySelector('img').src : '');
    const excerpt = card.dataset.excerpt || body;
    const author = card.dataset.author || 'Redaccion SMD';

    return { title, body, category, image, excerpt, author };
}

const articleCards = document.querySelectorAll('[data-article]');
articleCards.forEach((card) => {
    card.tabIndex = 0;
    const open = () => redirectToArticlePage(getArticleData(card));
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open();
        }
    });
});

function setReadingTime(paragraphs = []) {
    const readingTimeEl = document.getElementById('article-reading-time');
    if (!readingTimeEl) return;
    const text = Array.isArray(paragraphs) ? paragraphs.join(' ') : String(paragraphs || '');
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(3, Math.round(words / 180));
    readingTimeEl.textContent = `${minutes} min de lectura`;
}

function initReadingProgress(articleBody) {
    const bar = document.getElementById('reading-progress-bar');
    if (!bar || !articleBody) return;

    const clamp = (value) => Math.min(Math.max(value, 0), 100);

    const update = () => {
        const start = articleBody.offsetTop || 0;
        const max = Math.max(articleBody.offsetHeight - window.innerHeight, 1);
        const progress = ((window.scrollY - start) / max) * 100;
        const percent = clamp(progress);
        bar.style.width = `${percent}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
}

function initArticlePage() {
    const articlePage = document.querySelector('.article-page');
    if (!articlePage) return;

    const stored = loadArticleData() || {};
    const data = buildArticlePayload(stored);
    const { title, excerpt, category, image, author, paragraphs, callout } = data;

    const titleEl = document.getElementById('article-title');
    if (titleEl) {
        titleEl.textContent = title || ARTICLE_FALLBACK.title;
    }

    if (title) {
        document.title = `SMD | ${title}`;
    }

    const excerptEl = document.getElementById('article-excerpt');
    if (excerptEl) {
        excerptEl.textContent = excerpt || ARTICLE_FALLBACK.excerpt;
    }

    const categoryEl = document.getElementById('article-category');
    if (categoryEl) {
        categoryEl.textContent = category || ARTICLE_FALLBACK.category;
        categoryEl.classList.remove('pill--hidden');
    }

    const authorEl = document.getElementById('article-author');
    if (authorEl) {
        authorEl.textContent = author || ARTICLE_FALLBACK.author;
    }

    const imageEl = document.getElementById('article-image');
    if (imageEl) {
        imageEl.src = image || ARTICLE_FALLBACK.image;
        imageEl.alt = title || 'Imagen de noticia';
    }

    const bodyEl = document.getElementById('article-body');
    if (bodyEl) {
        bodyEl.innerHTML = '';
        const story = Array.isArray(paragraphs) && paragraphs.length ? paragraphs : ARTICLE_FALLBACK.paragraphs;
        story.forEach((paragraph, index) => {
            if (index === 2 && callout) {
                const calloutEl = document.createElement('div');
                calloutEl.className = 'article-callout';
                calloutEl.textContent = callout;
                bodyEl.appendChild(calloutEl);
            }
            const p = document.createElement('p');
            p.textContent = paragraph;
            bodyEl.appendChild(p);
        });

        const donateWrap = document.createElement('div');
        donateWrap.className = 'article-donate';

        const donateText = document.createElement('p');
        donateText.textContent = 'Asi como en esta noticia, las obras necesitan recursos para seguir. Si quieres donar a Si Mi Dios, el boton esta abajo.';
        donateWrap.appendChild(donateText);

        const donateBtn = document.createElement('a');
        donateBtn.className = 'button button--donate';
        donateBtn.href = '#';
        donateBtn.textContent = 'Donar a Si Mi Dios';
        donateWrap.appendChild(donateBtn);

        bodyEl.appendChild(donateWrap);
    }

    setReadingTime(paragraphs);
    initReadingProgress(bodyEl);
}

// Atajos de teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeArticleModal();
        if (mobileMenu && mobileMenu.classList.contains('is-open')) {
            toggleMenu();
        }
        closeSectionsDropdown();
    }
});

// Header compacto al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (!header) return;
    if (window.scrollY > 40) {
        header.classList.add('is-compact');
    } else {
        header.classList.remove('is-compact');
    }
});

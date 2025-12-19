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
    'iglesia en el mundo': 'Mundo',
    'mundo': 'Mundo',
    'tecnologia y fe': 'Mundo',
    'reportajes': 'Reportajes',
    'cultura': 'Cultura',
    'solidaridad': 'Solidaridad',
    'actualidad': 'Actualidad',
    'jovenes': 'Jovenes',
    'smd radio': 'SMD Audio',
    'iglesia en el salvador': 'Iglesia en el Salvador',
    'iglesia en el el salvador': 'Iglesia en el Salvador',
    'liturgia': 'Liturgia',
    'siervas de la misericordia de dios': 'Siervas de la Misericordia de Dios',
    'opinion': 'Opinion'
};

const SECTION_STORAGE_KEY = 'smd-section-data';
const SECTION_FALLBACKS = {
    'Vaticano': [
        {
            title: 'El Papa Francisco llama a una revolucion de la ternura',
            category: 'Vaticano',
            excerpt: 'Carta pastoral sobre tecnologia y dignidad humana.',
            image: 'https://images.unsplash.com/photo-1548625361-17d47225c50c?q=80&w=2000&auto=format&fit=crop',
            body: 'Analisis de la carta y sus llamados a la cultura del encuentro.'
        },
        {
            title: 'Agenda del Papa para la semana',
            category: 'Vaticano',
            excerpt: 'Audiencias con universidades catolicas y delegaciones.',
            image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=800&auto=format&fit=crop',
            body: 'Resumen de los principales encuentros previstos en Roma.'
        }
    ],
    'Iglesia en el Salvador': [
        {
            title: 'Parroquias organizan jornadas de servicio',
            category: 'Iglesia en el Salvador',
            excerpt: 'Convocatoria para apoyar comedores sociales el fin de semana.',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
            body: 'Pastoral social busca sumar voluntarios en las principales zonas.'
        },
        {
            title: 'Vocaciones que nacen en la red',
            category: 'Iglesia en el Salvador',
            excerpt: 'Testimonios de seminaristas que encontraron acompanamiento en linea.',
            image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=800&auto=format&fit=crop',
            body: 'Relatos que muestran la fuerza de las comunidades digitales.'
        }
    ],
    'Mundo': [
        {
            title: 'Caritas lanza campana global contra el hambre',
            category: 'Mundo',
            excerpt: 'Recaudacion internacional para regiones afectadas por la sequia.',
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
            body: 'Organizaciones locales coordinan la logistica de la ayuda.'
        },
        {
            title: 'Los Museos Vaticanos abren en horario nocturno',
            category: 'Mundo',
            excerpt: 'Visitas guiadas y recitales en patios principales durante el verano.',
            image: 'https://images.unsplash.com/photo-1544163994-1a9e992955f2?q=80&w=800&auto=format&fit=crop',
            body: 'La propuesta busca ofrecer una experiencia mas serena a los visitantes.'
        }
    ],
    'Liturgia': [
        {
            title: 'Agenda liturgica de la semana',
            category: 'Liturgia',
            excerpt: 'Celebraciones y solemnidades destacadas con horarios locales.',
            image: 'https://images.unsplash.com/photo-1444522652181-6a46f8c21839?q=80&w=1200&auto=format&fit=crop',
            body: 'Guia para acompanarte en las principales fiestas y memorias.'
        },
        {
            title: 'Cantos recomendados para Adviento',
            category: 'Liturgia',
            excerpt: 'Selecciones coral y guias de partituras para coros parroquiales.',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop',
            body: 'Recursos sencillos para animar las celebraciones comunitarias.'
        }
    ],
    'Opinion': [
        {
            title: 'El silencio como disciplina espiritual',
            category: 'Opinion',
            excerpt: 'Una invitacion a recuperar momentos de retiro.',
            image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1200&auto=format&fit=crop',
            body: 'Reflexion sobre limites sanos en el consumo de pantallas.'
        },
        {
            title: 'Fratelli tutti: tres anos despues',
            category: 'Opinion',
            excerpt: 'Balance de los frutos sociales y pastorales de la enciclica.',
            image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200&auto=format&fit=crop',
            body: 'Como las comunidades locales aterrizan el llamado a la fraternidad.'
        }
    ]
};

const SECTION_GROUPS = {
    'Vaticano': ['Vaticano'],
    'Iglesia en el Salvador': ['Iglesia en el Salvador'],
    'Mundo': ['Mundo', 'Reportajes', 'Cultura', 'Solidaridad', 'Actualidad', 'Jovenes', 'SMD Audio', 'Siervas de la Misericordia de Dios'],
    'Liturgia': ['Liturgia'],
    'Opinion': ['Opinion']
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

function saveSectionData(data = {}) {
    try {
        sessionStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn('No se pudo guardar la seccion en sesion', error);
    }
}

function loadSectionData() {
    try {
        const raw = sessionStorage.getItem(SECTION_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        console.warn('No se pudo leer la seccion en sesion', error);
        return null;
    }
}

function collectArticles() {
    return Array.from(document.querySelectorAll('[data-article]')).map((card) => getArticleData(card));
}

function filterArticlesByCategory(category = '') {
    const target = normalizeCategory(category) || category;
    if (!target) return collectArticles();
    const groups = SECTION_GROUPS[target] || [target];
    return collectArticles().filter((article) => {
        const cleaned = normalizeCategory(article.category) || article.category;
        return groups.includes(cleaned);
    });
}

function getSectionFallback(category = '') {
    const cleaned = normalizeCategory(category) || category;
    return SECTION_FALLBACKS[cleaned] || [];
}

function navigateToSection(rawCategory = '', href = '') {
    const category = normalizeCategory(rawCategory) || rawCategory || 'Noticias';
    const articles = filterArticlesByCategory(category);
    saveSectionData({ category, articles });
    const targetHref = href || `section.html?category=${encodeURIComponent(category)}`;
    window.location.href = targetHref;
}

function handleSectionLinks() {
    const links = document.querySelectorAll('.js-section-link');
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const raw = link.dataset.category || link.textContent || '';
            if (!raw) return;
            event.preventDefault();
            navigateToSection(raw, link.getAttribute('href'));
        });
    });
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
handleSectionLinks();
initHeroStickyButton();
initSectionPage();
initArticlePage();

// Boton sticky del hero que desaparece al llegar al destacado
function initHeroStickyButton() {
    const button = document.getElementById('hero-sticky-btn');
    const buttonWrap = document.getElementById('hero-sticky-wrap');
    const hero = document.querySelector('.hero');
    const target = document.querySelector('.feature__card');

    if (!button || !buttonWrap || !hero || !target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    let heroVisible = true;
    let targetVisible = false;

    const updateState = () => {
        if (isMobile) {
            button.classList.remove('is-hidden');
            buttonWrap.classList.remove('is-hidden');
            return;
        }
        const shouldHide = targetVisible || !heroVisible;
        button.classList.toggle('is-hidden', shouldHide);
        buttonWrap.classList.toggle('is-hidden', shouldHide);
    };

    button.addEventListener('click', () => {
        const behavior = prefersReducedMotion ? 'auto' : 'smooth';
        const header = document.getElementById('main-header');
        const offset = header ? header.offsetHeight + 16 : 16; /* Offset para evitar que el header tape el destacado */
        const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior });
        if (!isMobile) {
            button.classList.add('is-hidden');
        }
    });

    if (isMobile) {
        updateState();
        return;
    }

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

function bindArticleCards(scope = document) {
    const cards = scope.querySelectorAll('[data-article]');
    cards.forEach((card) => {
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
}

bindArticleCards();

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

function createSectionCard(article = {}, fallbackCategory = '') {
    const card = document.createElement('article');
    card.className = 'news-card article-card';
    card.dataset.article = 'true';
    card.dataset.category = article.category || fallbackCategory || '';
    card.dataset.title = article.title || 'Noticia';
    card.dataset.body = article.body || article.excerpt || '';
    card.dataset.image = article.image || ARTICLE_FALLBACK.image;

    const media = document.createElement('div');
    media.className = 'news-card__media';

    const pill = document.createElement('span');
    pill.className = 'pill pill--line';
    pill.textContent = article.category || fallbackCategory || '';
    media.appendChild(pill);

    const img = document.createElement('img');
    img.src = article.image || ARTICLE_FALLBACK.image;
    img.alt = article.title || 'Imagen de noticia';
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'news-card__body';

    const title = document.createElement('h3');
    title.className = 'news-card__title';
    title.textContent = article.title || 'Noticia';

    const summary = document.createElement('p');
    summary.className = 'news-card__summary';
    summary.textContent = article.excerpt || article.body || ARTICLE_FALLBACK.excerpt;

    body.appendChild(title);
    body.appendChild(summary);

    card.appendChild(media);
    card.appendChild(body);
    return card;
}

function renderSectionPage(category = '', articles = []) {
    const grid = document.getElementById('section-grid');
    const empty = document.getElementById('section-empty');
    const kicker = document.getElementById('section-kicker');
    const title = document.getElementById('section-title');
    const lead = document.getElementById('section-lead');

    const displayCategory = normalizeCategory(category) || category || 'Seccion';
    if (kicker) kicker.textContent = displayCategory;
    if (title) title.textContent = `Noticias de ${displayCategory}`;
    if (lead) lead.textContent = `Explora todas las publicaciones de ${displayCategory}.`;

    if (!grid) return;
    grid.innerHTML = '';

    if (!articles.length) {
        if (empty) empty.hidden = false;
        return;
    }

    if (empty) empty.hidden = true;

    articles.forEach((article) => {
        const card = createSectionCard(article, displayCategory);
        grid.appendChild(card);
    });

    bindArticleCards(grid);
    applyAllowedCategories();
    initImagePlaceholders();
}

function initSectionPage() {
    const sectionPage = document.querySelector('.section-page');
    if (!sectionPage) return;

    const params = new URLSearchParams(window.location.search);
    const rawCategory = params.get('category') || '';
    const category = normalizeCategory(rawCategory) || rawCategory || 'Noticias';

    const stored = loadSectionData();
    const storedCategory = stored ? normalizeCategory(stored.category) || stored.category : '';
    const articles = stored && storedCategory === category ? stored.articles || [] : [];
    const finalArticles = Array.isArray(articles) && articles.length ? articles : getSectionFallback(category);

    renderSectionPage(category, finalArticles);
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

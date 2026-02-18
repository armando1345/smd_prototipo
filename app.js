if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
}

const ARTICLE_STORAGE_KEY = 'smd-article-data';
const SECTION_STORAGE_KEY = 'smd-section-data';
const DEFAULT_SECTION_CATEGORY = 'Mundo';
const SECTION_OVERVIEW_TITLE = 'Ultimas noticias';

const ARTICLE_FALLBACK = {
    title: 'Cuando la comunidad se vuelve abrigo',
    category: 'Iglesia en el Mundo',
    body: 'Un relato sereno sobre personas que se acompanan para sostener la fe en medio de la prisa.',
    excerpt: 'Lectura larga para quienes buscan contexto sin ruido.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1400&auto=format&fit=crop',
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
    'smd audio': 'SMD Audio',
    'iglesia en el salvador': 'Iglesia en El Salvador',
    'iglesia en el el salvador': 'Iglesia en El Salvador',
    'liturgia': 'Liturgia',
    'siervas de la misericordia de dios': 'Siervas de la Misericordia de Dios',
    'opinion': 'Opinion'
};

const SECTION_FALLBACKS = {
    'Vaticano': [
        {
            title: 'El Papa Francisco llama a una revolucion de la ternura',
            category: 'Vaticano',
            excerpt: 'Carta pastoral sobre tecnologia y dignidad humana.',
            image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2000&auto=format&fit=crop',
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
    'Iglesia en El Salvador': [
        {
            title: 'Parroquias organizan jornadas de servicio',
            category: 'Iglesia en El Salvador',
            excerpt: 'Convocatoria para apoyar comedores sociales el fin de semana.',
            image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
            body: 'Pastoral social busca sumar voluntarios en las principales zonas.'
        },
        {
            title: 'Vocaciones que nacen en la red',
            category: 'Iglesia en El Salvador',
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
            image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop',
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
    'Iglesia en El Salvador': ['Iglesia en El Salvador'],
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
        const cleaned = normalizeCategory(raw) || raw;
        if (cleaned) {
            pill.textContent = cleaned;
            pill.classList.remove('pill--hidden');
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
        card.dataset.category = cleaned || dataCat;
        if (!pill) return;
        if (cleaned) {
            pill.textContent = cleaned;
            pill.classList.remove('pill--hidden');
        } else if (!pill.textContent.trim()) {
            pill.classList.add('pill--hidden');
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

function getArticleData(card) {
    const titleNode = card.querySelector('h1, h2, h3, h4');
    const bodyNode = card.querySelector('p');
    const categoryNode = card.querySelector('.pill, span');

    const title = card.dataset.title || (titleNode ? titleNode.textContent.trim() : 'Noticia');
    const body = card.dataset.body || (bodyNode ? bodyNode.textContent.trim() : 'Contenido no disponible para esta noticia.');
    const category = normalizeCategory(card.dataset.category || (categoryNode ? categoryNode.textContent.trim() : '')) || card.dataset.category || '';
    const image = card.dataset.image || (card.querySelector('img') ? card.querySelector('img').src : '');
    const excerpt = card.dataset.excerpt || body;
    const author = card.dataset.author || 'Redaccion SMD';

    return { title, body, category, image, excerpt, author };
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

function getAllSectionFallbacks() {
    return Object.values(SECTION_FALLBACKS).flat();
}

function navigateToSection(rawCategory = '', href = '') {
    const category = normalizeCategory(rawCategory) || DEFAULT_SECTION_CATEGORY;
    const articles = filterArticlesByCategory(category);
    saveSectionData({ category, articles });
    const targetHref = href || `section.html?category=${encodeURIComponent(category)}`;
    window.location.href = targetHref;
}

function handleSectionLinks() {
    const links = document.querySelectorAll('.js-section-link');
    links.forEach((link) => {
        if (link.dataset.sectionBound) return;
        link.dataset.sectionBound = 'true';
        link.addEventListener('click', (event) => {
            const raw = link.dataset.category || link.textContent || '';
            if (!raw) return;
            event.preventDefault();
            navigateToSection(raw, link.getAttribute('href') || '');
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

let lastFocusedElement = null;

const mobileMenuTriggers = Array.from(document.querySelectorAll('#mobile-menu-btn, [data-mobile-menu-trigger]'));
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
    if (!mobileMenu) return;
    lastFocusedElement = document.activeElement;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    if (closeMenuBtn) closeMenuBtn.focus();
}

function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    const anyModalOpen = Boolean(document.querySelector('.modal.is-open'));
    if (!anyModalOpen) {
        document.body.classList.remove('no-scroll');
    }
    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
}

function toggleMenu() {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
    } else {
        openMenu();
    }
}

mobileMenuTriggers.forEach((trigger) => {
    if (trigger.dataset.menuBound) return;
    trigger.dataset.menuBound = 'true';
    trigger.addEventListener('click', toggleMenu);
});

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
}

if (mobileMenu) {
    mobileMenu.addEventListener('click', (event) => {
        if (event.target === mobileMenu) {
            closeMenu();
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

function initMobileSubmenus() {
    const toggles = document.querySelectorAll('.mobile-menu__group-toggle');
    toggles.forEach((toggle) => {
        if (toggle.dataset.bound) return;
        toggle.dataset.bound = 'true';
        toggle.addEventListener('click', () => {
            const parent = toggle.closest('.mobile-menu__group');
            if (!parent) return;
            const isOpen = parent.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });
}

const sectionsDropdown = document.getElementById('sections-dropdown');
const sectionsDropdownToggle = document.getElementById('sections-dropdown-toggle');
const sectionsDropdownMenu = document.getElementById('sections-dropdown-menu');

function closeSectionsDropdown() {
    if (!sectionsDropdown || !sectionsDropdownToggle) return;
    sectionsDropdown.classList.remove('is-open');
    sectionsDropdownToggle.setAttribute('aria-expanded', 'false');
}

function initSectionsDropdown() {
    if (!sectionsDropdown || !sectionsDropdownToggle) return;

    sectionsDropdownToggle.addEventListener('click', () => {
        const isOpen = sectionsDropdown.classList.contains('is-open');
        sectionsDropdown.classList.toggle('is-open', !isOpen);
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

const articleModal = document.getElementById('article-modal');
const closeArticleModalBtn = document.getElementById('close-article-modal');
const articleModalTitle = document.getElementById('article-modal-title');
const articleModalCategory = document.getElementById('article-modal-category');
const articleModalBody = document.getElementById('article-modal-body');
const articleModalImageWrap = document.getElementById('article-modal-image-wrap');
const articleModalImage = document.getElementById('article-modal-image');
const articleModalDialog = articleModal ? articleModal.querySelector('.modal__dialog') : null;

function trapModalFocus(modalElement, event) {
    if (event.key !== 'Tab' || !modalElement.classList.contains('is-open')) return;
    const focusables = modalElement.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
        if (active === first || active === modalElement) {
            event.preventDefault();
            last.focus();
        }
    } else if (active === last) {
        event.preventDefault();
        first.focus();
    }
}

function openModal(modal, focusTarget) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
    if (focusTarget) {
        focusTarget.focus();
    }
}

function closeModal(modal) {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    const menuOpen = mobileMenu && mobileMenu.classList.contains('is-open');
    const otherModalOpen = Boolean(document.querySelector('.modal.is-open'));
    if (!menuOpen && !otherModalOpen) {
        document.body.classList.remove('no-scroll');
    }
    if (lastFocusedElement instanceof HTMLElement) {
        lastFocusedElement.focus();
    }
}

function openArticleModal(data, invoker) {
    if (!articleModal) return;
    lastFocusedElement = invoker || document.activeElement;
    const { title, body, category, image } = data;
    if (articleModalTitle) articleModalTitle.textContent = title || 'Noticia';
    if (articleModalBody) articleModalBody.textContent = body || 'Contenido no disponible para esta noticia.';
    if (articleModalCategory) articleModalCategory.textContent = category || '';

    if (image && articleModalImage && articleModalImageWrap) {
        articleModalImage.src = image;
        articleModalImage.alt = title || 'Imagen de noticia';
        articleModalImageWrap.classList.add('is-visible');
    } else if (articleModalImageWrap) {
        articleModalImageWrap.classList.remove('is-visible');
    }

    openModal(articleModal, articleModalDialog || closeArticleModalBtn);
}

function closeArticleModal() {
    closeModal(articleModal);
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
    articleModal.addEventListener('keydown', (event) => trapModalFocus(articleModal, event));
}

function bindArticleCards(scope = document) {
    const cards = scope.querySelectorAll('[data-article]');
    cards.forEach((card) => {
        if (card.dataset.articleBound) return;
        card.dataset.articleBound = 'true';
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

function createSectionCard(article = {}, fallbackCategory = '') {
    const card = document.createElement('article');
    card.className = 'news-card article-card';
    card.dataset.article = 'true';
    card.dataset.category = article.category || fallbackCategory || '';
    card.dataset.title = article.title || 'Noticia';
    card.dataset.body = article.body || article.excerpt || '';
    card.dataset.image = article.image || ARTICLE_FALLBACK.image;
    card.dataset.excerpt = article.excerpt || article.body || ARTICLE_FALLBACK.excerpt;

    const media = document.createElement('div');
    media.className = 'news-card__media';

    const img = document.createElement('img');
    img.src = article.image || ARTICLE_FALLBACK.image;
    img.alt = article.title || 'Imagen de noticia';
    img.loading = 'lazy';
    img.decoding = 'async';
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'news-card__body';

    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = article.category || fallbackCategory || '';

    const title = document.createElement('h3');
    title.className = 'news-card__title';
    title.textContent = article.title || 'Noticia';

    const summary = document.createElement('p');
    summary.className = 'news-card__summary';
    summary.textContent = article.excerpt || article.body || ARTICLE_FALLBACK.excerpt;

    body.appendChild(pill);
    body.appendChild(title);
    body.appendChild(summary);

    card.appendChild(media);
    card.appendChild(body);

    return card;
}

function renderSectionPage(category = '', articles = [], options = {}) {
    const { overview = false } = options;
    const grid = document.getElementById('section-grid');
    const empty = document.getElementById('section-empty');
    const kicker = document.getElementById('section-kicker');
    const title = document.getElementById('section-title');
    const lead = document.getElementById('section-lead');

    const displayCategory = normalizeCategory(category) || category || DEFAULT_SECTION_CATEGORY;
    if (kicker) kicker.textContent = overview ? 'Secciones' : displayCategory;
    if (title) title.textContent = overview ? SECTION_OVERVIEW_TITLE : `Noticias de ${displayCategory}`;
    if (lead) {
        lead.textContent = overview
            ? 'Explora una seleccion de publicaciones recientes de SMD.'
            : `Explora todas las publicaciones de ${displayCategory}.`;
    }

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
    const normalizedCategory = normalizeCategory(rawCategory);
    const hasExplicitCategory = Boolean(normalizedCategory);
    const category = normalizedCategory || DEFAULT_SECTION_CATEGORY;

    const stored = loadSectionData();
    const storedCategory = stored ? normalizeCategory(stored.category) || stored.category : '';
    const canUseStored = hasExplicitCategory && stored && storedCategory === category;
    const storedArticles = canUseStored ? stored.articles || [] : [];

    let finalArticles = Array.isArray(storedArticles) && storedArticles.length ? storedArticles : getSectionFallback(category);
    if (!hasExplicitCategory) {
        finalArticles = getAllSectionFallbacks();
    }

    renderSectionPage(category, finalArticles, { overview: !hasExplicitCategory });
}

function initArticlePage() {
    const articlePage = document.querySelector('.article-page');
    if (!articlePage) return;

    const stored = loadArticleData() || {};
    const data = buildArticlePayload(stored);
    const { title, excerpt, category, image, author, paragraphs, callout } = data;

    const titleEl = document.getElementById('article-title');
    if (titleEl) titleEl.textContent = title || ARTICLE_FALLBACK.title;

    const excerptEl = document.getElementById('article-excerpt');
    if (excerptEl) excerptEl.textContent = excerpt || ARTICLE_FALLBACK.excerpt;

    const categoryEl = document.getElementById('article-category');
    if (categoryEl) {
        categoryEl.textContent = category || ARTICLE_FALLBACK.category;
        categoryEl.classList.remove('pill--hidden');
    }

    const authorEl = document.getElementById('article-author');
    if (authorEl) authorEl.textContent = author || ARTICLE_FALLBACK.author;

    const imageEl = document.getElementById('article-image');
    const mediaWrapEl = document.querySelector('.article-hero__media');
    if (imageEl) {
        if (mediaWrapEl) {
            const markEmpty = () => mediaWrapEl.classList.add('is-empty');
            const markReady = () => mediaWrapEl.classList.remove('is-empty');

            imageEl.addEventListener('load', () => {
                if (imageEl.naturalWidth > 0) markReady();
            });

            imageEl.addEventListener('error', () => {
                window.setTimeout(() => {
                    if (imageEl.naturalWidth === 0) markEmpty();
                }, 1200);
            });

            window.setTimeout(() => {
                if (imageEl.naturalWidth === 0) markEmpty();
            }, 6200);
        }

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

    if (title) {
        document.title = `SMD | ${title}`;
    }

    setReadingTime(paragraphs);
    initReadingProgress(bodyEl);
}

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    let isHidden = false;
    const hide = () => {
        if (isHidden) return;
        isHidden = true;
        preloader.classList.add('is-hidden');
        window.setTimeout(() => {
            preloader.style.display = 'none';
        }, 420);
    };

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hide();
        return;
    }

    const fallbackTimer = window.setTimeout(hide, 1600);

    if (document.readyState === 'complete') {
        window.clearTimeout(fallbackTimer);
        setTimeout(hide, 80);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(hide, 900);
        }, { once: true });

        window.addEventListener('load', () => {
            window.clearTimeout(fallbackTimer);
            setTimeout(hide, 180);
        }, { once: true });
    }
}

function initHeroCarousel() {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;

    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const dots = Array.from(carousel.querySelectorAll('.hero-dot'));
    if (slides.length < 2) return;

    let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (index < 0) index = 0;
    let timer = null;
    let touchStartX = null;

    const showSlide = (nextIndex) => {
        index = (nextIndex + slides.length) % slides.length;
        slides.forEach((slide, idx) => {
            slide.classList.toggle('is-active', idx === index);
        });
        dots.forEach((dot, idx) => {
            dot.classList.toggle('is-active', idx === index);
            dot.setAttribute('aria-current', idx === index ? 'true' : 'false');
        });
    };

    const nextSlide = () => showSlide(index + 1);
    const prevSlide = () => showSlide(index - 1);

    const startAutoplay = () => {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 10400);
    };

    const stopAutoplay = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const target = Number(dot.dataset.slideTo || '0');
            showSlide(target);
            startAutoplay();
        });
    });

    carousel.addEventListener('touchstart', (event) => {
        if (!event.touches.length) return;
        touchStartX = event.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
        if (touchStartX === null || !event.changedTouches.length) return;
        const endX = event.changedTouches[0].clientX;
        const delta = endX - touchStartX;
        touchStartX = null;

        if (Math.abs(delta) < 36) return;
        if (delta < 0) nextSlide();
        if (delta > 0) prevSlide();
        startAutoplay();
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    showSlide(index);
    startAutoplay();
}

function initRevealAnimations() {
    const revealTargets = document.querySelectorAll('.reveal-block, .news-card, .internal-block, .section-hero, .article-hero, .article-body, .footer__inner');
    if (!revealTargets.length) return;

    const supportObserver = 'IntersectionObserver' in window;
    const hasHashNavigation = Boolean(window.location.hash);
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallViewport = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;

    if (!supportObserver || hasHashNavigation || reducedMotion || isSmallViewport) {
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
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((el) => {
        el.classList.add('js-reveal');
        observer.observe(el);
    });
}

function initImagePlaceholders() {
    const fallbackSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#e6ebf2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="46" fill="#4f6074">Imagen no disponible</text></svg>';
    const fallbackSrc = `data:image/svg+xml;base64,${window.btoa(fallbackSvg)}`;
    const images = document.querySelectorAll('img');
    const applyFallback = (img) => {
        if (!img || img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = 'true';
        img.src = fallbackSrc;
    };

    images.forEach((img) => {
        if (img.dataset.placeholderBound) return;
        img.dataset.placeholderBound = 'true';

        if (!img.hasAttribute('loading')) img.loading = 'lazy';
        if (!img.hasAttribute('decoding')) img.decoding = 'async';

        if (img.complete) {
            if (img.naturalWidth > 0) return;
            applyFallback(img);
            return;
        }

        img.addEventListener('error', () => {
            applyFallback(img);
        }, { once: true });

        window.setTimeout(() => {
            if (img.naturalWidth === 0) {
                applyFallback(img);
            }
        }, 4500);
    });
}

function updateHeaderState() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const hero = document.getElementById('hero-carousel');
    const compactThreshold = hero ? Math.max(80, hero.offsetHeight * 0.12) : 24;

    header.classList.toggle('is-compact', scrollY > compactThreshold);
}

const videoModal = document.getElementById('video-modal');
const closeVideoModalBtn = document.getElementById('close-video-modal');
const videoIframe = document.getElementById('video-modal-iframe');
const videoDialog = videoModal ? videoModal.querySelector('.modal__dialog') : null;

function closeVideoModal() {
    if (!videoModal) return;
    if (videoIframe) videoIframe.src = '';
    closeModal(videoModal);
}

function initVideoModal() {
    const triggers = document.querySelectorAll('[data-video-open]');
    if (!triggers.length || !videoModal) return;

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const url = trigger.dataset.videoUrl || '';
            if (videoIframe) videoIframe.src = url;
            openModal(videoModal, videoDialog || closeVideoModalBtn);
        });
    });

    if (closeVideoModalBtn) {
        closeVideoModalBtn.addEventListener('click', closeVideoModal);
    }

    videoModal.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            closeVideoModal();
        }
    });

    videoModal.addEventListener('keydown', (event) => trapModalFocus(videoModal, event));
}

const lightboxModal = document.getElementById('gallery-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const lightboxPrevBtn = document.getElementById('lightbox-prev');
const lightboxNextBtn = document.getElementById('lightbox-next');
const lightboxDialog = lightboxModal ? lightboxModal.querySelector('.modal__dialog') : null;

function initLightboxGallery() {
    if (!lightboxModal || !lightboxImage || !lightboxCaption) return;

    const items = Array.from(document.querySelectorAll('[data-lightbox]'));
    if (!items.length) return;

    let current = 0;

    const updateView = (index) => {
        current = (index + items.length) % items.length;
        const item = items[current];
        const src = item.dataset.full || item.querySelector('img')?.src || '';
        const caption = item.dataset.caption || item.querySelector('img')?.alt || '';

        lightboxImage.src = src;
        lightboxImage.alt = caption || 'Imagen ampliada';
        lightboxCaption.textContent = caption;
    };

    const open = (index, invoker) => {
        updateView(index);
        lastFocusedElement = invoker || document.activeElement;
        openModal(lightboxModal, lightboxDialog || lightboxCloseBtn);
    };

    const close = () => {
        closeModal(lightboxModal);
    };

    items.forEach((item, index) => {
        item.addEventListener('click', () => open(index, item));
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', close);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', () => updateView(current - 1));
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', () => updateView(current + 1));

    lightboxModal.addEventListener('click', (event) => {
        if (event.target === lightboxModal) {
            close();
        }
    });

    lightboxModal.addEventListener('keydown', (event) => {
        trapModalFocus(lightboxModal, event);
        if (event.key === 'ArrowLeft') updateView(current - 1);
        if (event.key === 'ArrowRight') updateView(current + 1);
    });
}

function initCustomAudioPlayer() {
    const wrapper = document.querySelector('[data-audio-player]');
    if (!wrapper) return;

    const audio = document.getElementById('audio-element');
    const toggleBtn = document.getElementById('audio-toggle');
    const progress = document.getElementById('audio-progress');
    const currentEl = document.getElementById('audio-current');
    const durationEl = document.getElementById('audio-duration');

    if (!audio || !toggleBtn || !progress || !currentEl || !durationEl) return;

    const formatTime = (seconds = 0) => {
        if (!Number.isFinite(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${String(secs).padStart(2, '0')}`;
    };

    const updateToggle = () => {
        const playing = !audio.paused;
        toggleBtn.setAttribute('aria-label', playing ? 'Pausar audio' : 'Reproducir audio');
        toggleBtn.innerHTML = `<i data-lucide="${playing ? 'pause' : 'play'}"></i><span id="audio-toggle-label">${playing ? 'Pausa' : 'Reproducir'}</span>`;
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    };

    const syncProgress = () => {
        if (!audio.duration) return;
        const value = (audio.currentTime / audio.duration) * 100;
        progress.value = String(value);
        currentEl.textContent = formatTime(audio.currentTime);
    };

    const updateDuration = () => {
        durationEl.textContent = formatTime(audio.duration);
    };

    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateToggle();
    });

    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', syncProgress);
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        progress.value = '0';
        updateToggle();
    });

    progress.addEventListener('input', () => {
        if (!audio.duration) return;
        const targetTime = (Number(progress.value) / 100) * audio.duration;
        audio.currentTime = targetTime;
        syncProgress();
    });

    updateToggle();
    updateDuration();
}

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    closeArticleModal();
    closeVideoModal();
    closeModal(lightboxModal);
    closeSectionsDropdown();

    if (mobileMenu && mobileMenu.classList.contains('is-open')) {
        closeMenu();
    }
});

window.addEventListener('scroll', updateHeaderState, { passive: true });
window.addEventListener('resize', updateHeaderState);

initPreloader();
initMobileSubmenus();
initSectionsDropdown();
initHeroCarousel();
initVideoModal();
initLightboxGallery();
initCustomAudioPlayer();
initRevealAnimations();
initImagePlaceholders();
applyAllowedCategories();
handleSectionLinks();
bindArticleCards();
initSectionPage();
initArticlePage();
updateHeaderState();

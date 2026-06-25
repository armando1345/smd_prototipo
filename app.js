if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
}

const ARTICLE_STORAGE_KEY = 'smd-article-data';
const SECTION_STORAGE_KEY = 'smd-section-data';
const DEFAULT_SECTION_CATEGORY = 'Mundo';
const SECTION_OVERVIEW_TITLE = 'Últimos artículos';
const SANCTUARY_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20Jes%C3%BAs%20de%20la%20Divina%20Misericordia%2C%20Osicala%2C%20Moraz%C3%A1n%2C%20El%20Salvador';
const TEMPLE_PROJECT_URL = 'https://www.templodejesusdeladivinamisericordiaelsalvador.com/';
const GENERAL_CONTACT_EMAIL = 'razdiazsiervas@yahoo.es';
const GENERAL_CONTACT_PHONE = '+503 7746 9440';
const GENERAL_CONTACT_TEL = '+50377469440';
const GENERAL_WHATSAPP_URL = 'https://wa.me/50377469440';
const VOCATIONAL_PHONE = '7679-6343';
const VOCATIONAL_TEL = '+50376796343';

function shouldOpenNewTab(link) {
    if (!link || !link.href) return false;
    return link.href === SANCTUARY_MAP_URL || (link.href === TEMPLE_PROJECT_URL && link.classList.contains('button'));
}

function normalizeLinkTargets(root = document) {
    const links = root.querySelectorAll ? root.querySelectorAll('a') : [];
    links.forEach((link) => {
        if (shouldOpenNewTab(link)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            return;
        }
        link.removeAttribute('target');
    });
}

function initLinkTargetPolicy() {
    normalizeLinkTargets();
    document.addEventListener('click', (event) => {
        const link = event.target.closest?.('a');
        if (!link || shouldOpenNewTab(link)) return;
        link.removeAttribute('target');
        link.target = '_self';
    }, true);
}

const ARTICLE_FALLBACK = {
    title: 'Cuando la comunidad se vuelve abrigo',
    category: 'Iglesia en el Mundo',
    body: 'Un relato sereno sobre personas que se acompañan para sostener la fe en medio de la prisa.',
    excerpt: 'Lectura larga para quienes buscan contexto sin ruido.',
    image: 'siervas-donacion-comunidad.jpg',
    author: 'Redacción SMD',
    highlights: [
        'Texto amplio y limpio en una sola columna.',
        'Una única imagen protagonista con la identidad visual de SMD.',
        'CTA final para apoyar la misión periodística.'
    ],
    callout: 'La fe crece cuando se vuelve historia compartida.',
    paragraphs: [
        'Las comunidades católicas que acompañamos aman la calma: leen con tiempo, hablan despacio y se dejan tocar por historias reales.',
        'En esta pieza bajamos la velocidad para entender el trasfondo pastoral y humano de un artículo que merece ser leído con atención.',
        'La voz de los protagonistas llega limpia: sin ventanas emergentes, sin videos que interrumpan, solo palabras e imagen.',
        'El cierre es un puente hacia la acción: si algo de lo leído te movió, puedes sumar tu aporte para que sigamos investigando.',
        'Gracias por leer y por sostener un periodismo que respira hondo antes de hablar.'
    ]
};

const ALLOWED_CATEGORIES = {
    'vaticano': 'Vaticano',
    'iglesia en el mundo': 'Mundo',
    'mundo': 'Mundo',
    'presencia en el mundo': 'Presencia en el Mundo',
    'tecnología y fe': 'Mundo',
    'reportajes': 'Reportajes',
    'cultura': 'Cultura',
    'solidaridad': 'Solidaridad',
    'actualidad': 'Actualidad',
    'jóvenes': 'Jóvenes',
    'smd radio': 'SMD Audio',
    'smd audio': 'SMD Audio',
    'iglesia en el salvador': 'Iglesia en El Salvador',
    'iglesia en el el salvador': 'Iglesia en El Salvador',
    'santuario': 'Santuario',
    'pastoral vocacional': 'Pastoral Vocacional',
    'san oscar romero': 'San Óscar Romero',
    'san óscar romero': 'San Óscar Romero',
    'liturgia': 'Liturgia',
    'siervas de la misericordia de dios': 'Siervas de la Misericordia de Dios',
    'opinión': 'Opinión'
};

const SECTION_FALLBACKS = {
    'Vaticano': [
        {
            title: 'El Papa Francisco llama a una revolución de la ternura',
            category: 'Vaticano',
            excerpt: 'Carta pastoral sobre tecnología y dignidad humana.',
            image: 'papa-vaticano.jpg',
            body: 'Análisis de la carta y sus llamados a la cultura del encuentro.'
        },
        {
            title: 'Agenda del Papa para la semana',
            category: 'Vaticano',
            excerpt: 'Audiencias con universidades católicas y delegaciones.',
            image: 'vaticano-noche.jpg',
            body: 'Resumen de los principales encuentros previstos en Roma.'
        }
    ],
    'Santuario': [
        {
            title: 'El Santuario de la Divina Misericordia en Osicala',
            category: 'Santuario',
            excerpt: 'Un lugar de fe, oración y comunidad en Morazán Sur.',
            image: 'templo-exterior.jpg',
            body: 'En Osicala, Morazán Sur, se encuentra un espacio de oración que nació de una inspiración compartida. El santuario recibe a peregrinos que buscan paz, recogimiento y un espacio para reconciliarse con Dios.'
        },
        {
            title: 'La obra del santuario continúa',
            category: 'Santuario',
            excerpt: 'La construcción avanza gracias a donaciones voluntarias y a la generosidad de quienes apoyan esta labor.',
            image: 'altar-divina-misericordia.jpg',
            body: 'El 21 de noviembre de 2019 se colocó la primera piedra y el 7 de abril de 2024, Fiesta de la Divina Misericordia, se realizó la Consagración y Dedicación del templo.'
        }
    ],
    'Pastoral Vocacional': [
        {
            title: 'El llamado a la vida religiosa',
            category: 'Pastoral Vocacional',
            excerpt: 'Un camino de fe, gracia y entrega generosa al plan del Creador.',
            image: 'madre-coronada.jpg',
            body: 'Para las jóvenes que experimentan una inquietud espiritual o sienten el llamado del Señor, la congregación ofrece un espacio eclesial y formativo para descubrir y consolidar la vocación a la vida consagrada.'
        },
        {
            title: 'Etapas del itinerario formativo',
            category: 'Pastoral Vocacional',
            excerpt: 'Aspirantado, Postulantado, Noviciado y Juniorado acompañan la maduración de la respuesta vocacional.',
            image: 'jovenes-cruces.jpg',
            body: 'El proceso vocacional ayuda a la joven a discernir su inquietud, experimentar las exigencias de la vida consagrada y afirmar su identidad dentro de la vida fraterna y los apostolados de la congregación.'
        }
    ],
    'Presencia en el Mundo': [
        {
            title: 'La misión que cruza fronteras',
            category: 'Presencia en el Mundo',
            excerpt: 'La congregación sirve desde El Salvador y extiende su presencia pastoral a otras comunidades.',
            image: 'bandera-el-salvador.jpg',
            body: 'La presencia de las Siervas une evangelización, servicio y acompañamiento donde la Iglesia las necesita.'
        },
        {
            title: 'Comunidades sostenidas por la misericordia',
            category: 'Presencia en el Mundo',
            excerpt: 'Obras, visitas y proyectos pastorales que expresan el carisma fuera del templo.',
            image: 'siervas-donacion-comunidad.jpg',
            body: 'La misión se vuelve concreta cuando acompaña a familias, jóvenes y comunidades vulnerables.'
        }
    ],
    'San Óscar Romero': [
        {
            title: 'San Óscar Romero, pastor y testigo',
            category: 'San Óscar Romero',
            excerpt: 'Memoria de un santo salvadoreño que sigue iluminando la vida de la Iglesia.',
            image: 'oscar-romero.jpg',
            body: 'Su palabra permanece viva como llamada a la fidelidad, la justicia y la caridad pastoral.'
        },
        {
            title: 'El legado espiritual de Romero',
            category: 'San Óscar Romero',
            excerpt: 'Claves para comprender su testimonio desde la fe, la historia y el servicio al pueblo.',
            image: 'cardenal-rosa-chavez.jpg',
            body: 'La memoria de San Óscar Romero ayuda a leer los desafíos actuales con esperanza cristiana.'
        }
    ],
    'Iglesia en El Salvador': [
        {
            title: 'Parroquias organizan jornadas de servicio',
            category: 'Iglesia en El Salvador',
            excerpt: 'Convocatoria para apoyar comedores sociales el fin de semana.',
            image: 'siervas-donacion-comunidad.jpg',
            body: 'Pastoral social busca sumar voluntarios en las principales zonas.'
        },
        {
            title: 'Vocaciónes que nacen en la red',
            category: 'Iglesia en El Salvador',
            excerpt: 'Testimonios de seminaristas que encontraron acompañamiento en línea.',
            image: 'templo-exterior.jpg',
            body: 'Relatos que muestran la fuerza de las comunidades digitales.'
        }
    ],
    'Mundo': [
        {
            title: 'Cáritas lanza campaña global contra el hambre',
            category: 'Mundo',
            excerpt: 'Recaudación internacional para regiones afectadas por la sequía.',
            image: 'misericordia-agua.jpg',
            body: 'Organizaciones locales coordinan la logística de la ayuda.'
        },
        {
            title: 'Los Museos Vaticaños abren en horario nocturno',
            category: 'Mundo',
            excerpt: 'Visitas guíadas y recitales en patios principales durante el verano.',
            image: 'jovenes-cruces.jpg',
            body: 'La propuesta busca ofrecer una experiencia más serena a los visitantes.'
        }
    ],
    'Liturgia': [
        {
            title: 'Agenda litúrgica de la semana',
            category: 'Liturgia',
            excerpt: 'Celebraciones y solemnidades destacadas con horarios locales.',
            image: 'agenda-liturgica.jpg',
            body: 'Guía para acompañarte en las principales fiestas y memorias.'
        },
        {
            title: 'Cantos recomendados para Adviento',
            category: 'Liturgia',
            excerpt: 'Selecciones coral y guías de partituras para coros parroquiales.',
            image: 'siervas-liturgia.jpg',
            body: 'Recursos sencillos para animar las celebraciones comunitarias.'
        }
    ],
    'Opinión': [
        {
            title: 'El silencio como disciplina espiritual',
            category: 'Opinión',
            excerpt: 'Una invitación a recuperar momentos de retiro.',
            image: 'biblia-cruz.jpg',
            body: 'Reflexión sobre límites saños en el consumo de pantallas.'
        },
        {
            title: 'Fratelli tutti: tres años después',
            category: 'Opinión',
            excerpt: 'Balance de los frutos sociales y pastorales de la encíclica.',
            image: 'fratelli-tutti.jpg',
            body: 'Cómo las comunidades locales aterrizan el llamado a la fraternidad.'
        }
    ]
};

const SECTION_GROUPS = {
    'Vaticano': ['Vaticano'],
    'Santuario': ['Santuario', 'Liturgia'],
    'Pastoral Vocacional': ['Pastoral Vocacional', 'Iglesia en El Salvador', 'Jóvenes'],
    'Presencia en el Mundo': ['Presencia en el Mundo', 'Mundo', 'Reportajes', 'Cultura', 'Solidaridad', 'Actualidad', 'Siervas de la Misericordia de Dios'],
    'San Óscar Romero': ['San Óscar Romero', 'Opinión', 'Iglesia en El Salvador'],
    'Iglesia en El Salvador': ['Iglesia en El Salvador'],
    'Mundo': ['Mundo', 'Reportajes', 'Cultura', 'Solidaridad', 'Actualidad', 'Jóvenes', 'SMD Audio', 'Siervas de la Misericordia de Dios'],
    'Liturgia': ['Liturgia'],
    'Opinión': ['Opinión']
};

const PRESENCE_COUNTRIES = [
    {
        id: 'SV',
        name: 'El Salvador',
        started: 'Cuna de la congregación, fundada el 29 de junio de 1995',
        work: 'Comunidades Juan Pablo II, Madre Camila, Monseñor Romero, San Pedro y San Pablo, San Francisco y el Albergue Casa Madre de la Misericordia.',
        contactLabel: 'Contacto en El Salvador',
        phone: GENERAL_CONTACT_PHONE,
        tel: GENERAL_CONTACT_TEL,
        email: GENERAL_CONTACT_EMAIL,
        communities: [
            { name: 'Comunidad Juan Pablo II', place: 'Barrio San Felipe, San Miguel', founded: 'Fundada el 29 de agosto de 2011', phone: '+503 7860 4686', tel: '+50378604686' },
            { name: 'Comunidad Madre Camila', place: 'Sesori, San Miguel', founded: 'Fundada el 7 de marzo de 2024', phone: '+503 7850 3128', tel: '+50378503128' },
            { name: 'Comunidad Monseñor Romero', place: 'Osicala, Morazán', founded: 'Fundada el 25 de marzo de 2014', phone: '+503 7600 3412', tel: '+50376003412' },
            {
                name: 'Albergue Casa Madre de la Misericordia',
                place: 'Pasaje y residencial San Carlos, N. 8 y 9, San Salvador, El Salvador',
                founded: 'Fundada el 15 de octubre de 2007',
                phones: [
                    { label: '+503 2235 5033', href: '+50322355033' },
                    { label: '+503 2221 4759', href: '+50322214759' }
                ],
                email: GENERAL_CONTACT_EMAIL
            },
            { name: 'Comunidad San Pedro y San Pablo', place: 'Nunciatura Apostólica de El Salvador', founded: 'Fundada el 4 de enero de 2015' },
            { name: 'Comunidad San Francisco', place: 'Parroquia San Francisco, San Salvador', founded: 'Fundada el 5 de enero de 2014' }
        ],
        note: 'La imagen aportada incluye contactos locales para Casa Madre, Osicala, Barrio San Felipe y Sesori; para las demás casas se conserva el contacto general disponible.'
    },
    {
        id: 'HN',
        name: 'Honduras',
        started: 'Presencia desde el 22 de febrero de 2017',
        work: 'Comunidades Divina Misericordia en Valle de Ángeles, Santa Faustina en Cerro Grande y San Andrés.',
        contactLabel: 'Contacto en Honduras',
        phone: '+504 9717 1302',
        tel: '+50497171302',
        email: GENERAL_CONTACT_EMAIL,
        communities: [
            { name: 'Comunidad Divina Misericordia', place: 'Valle de Ángeles', founded: 'Fundada el 22 de febrero de 2017' },
            { name: 'Comunidad Santa Faustina', place: 'Cerro Grande, Tegucigalpa', founded: 'Fundada el 7 de noviembre de 2020', phone: '+504 9717 1302', tel: '+50497171302' },
            { name: 'Comunidad San Andrés', place: 'Gracias, Lempira', founded: 'Fundada el 14 de noviembre de 2021', phone: '+504 8960 2442', tel: '+50489602442' }
        ],
        note: 'La imagen aportada incluye contactos locales para Cerro Grande y Gracias; para Valle de Ángeles se mantiene el canal general disponible.'
    },
    {
        id: 'AR',
        name: 'Argentina',
        started: 'Presencia desde el 15 de marzo de 2019',
        work: 'Comunidades San Óscar Romero en la Nunciatura Apostólica, Divino Salvador en Cruz del Eje, Córdoba, y Reina de la Paz en Mar de Plata.',
        contactLabel: 'Contacto en Argentina',
        phone: '',
        tel: '',
        email: GENERAL_CONTACT_EMAIL,
        communities: [
            { name: 'Comunidad de San Óscar Romero', place: 'Nunciatura Apostólica', founded: 'Fundada el 15 de marzo de 2019' },
            { name: 'Comunidad Divino Salvador', place: 'Cruz del Eje, Córdoba', founded: 'Fundada el 29 de enero de 2022' },
            { name: 'Comunidad Reina de la Paz', place: 'Mar de Plata', founded: 'Fundada el 5 de febrero de 2022' }
        ],
        note: 'El material fuente deja el campo de contacto de Argentina sin número específico; se muestra el correo general para consultas.'
    },
    {
        id: 'CL',
        name: 'Chile',
        started: 'Comunidad San José, fundada el 3 de mayo de 2026',
        work: 'Presencia misionera en Santiago de Chile.',
        contactLabel: 'Contacto en Chile',
        phone: '+56 9 7437 0277',
        tel: '+56974370277',
        email: GENERAL_CONTACT_EMAIL,
        communities: [
            { name: 'Comunidad San José', place: 'Santiago de Chile', founded: 'Fundada el 3 de mayo de 2026' }
        ],
        note: 'Contacto indicado en el material fuente para Chile.'
    },
    {
        id: 'IT',
        name: 'Italia',
        started: 'Comunidad San Pedro, fundada el 21 de junio de 2026',
        work: 'Nueva presencia de las Siervas de la Misericordia de Dios en Italia.',
        contactLabel: 'Contacto en Italia',
        phone: '',
        tel: '',
        email: GENERAL_CONTACT_EMAIL,
        communities: [
            { name: 'Comunidad San Pedro', place: 'Italia', founded: 'Fundada el 21 de junio de 2026' }
        ],
        note: 'El material fuente deja el campo de contacto de Italia sin número específico; se muestra el correo general para consultas.'
    }
];

const PRESENCE_MAP_DEFAULT_VIEWBOX = '0 0 960 520';
const PRESENCE_MAP_FOCUS_VIEWBOX = '135 85 460 350';

function getPresenceMapData() {
    return window.SMD_WORLD_MAP && Array.isArray(window.SMD_WORLD_MAP.countries)
        ? window.SMD_WORLD_MAP
        : { viewBox: PRESENCE_MAP_DEFAULT_VIEWBOX, countries: [], presencePoints: {} };
}

function parsePresenceViewBox(viewBox = PRESENCE_MAP_DEFAULT_VIEWBOX) {
    const parts = viewBox.split(/\s+/).map(Number);
    return {
        x: Number.isFinite(parts[0]) ? parts[0] : 0,
        y: Number.isFinite(parts[1]) ? parts[1] : 0,
        width: Number.isFinite(parts[2]) ? parts[2] : 960,
        height: Number.isFinite(parts[3]) ? parts[3] : 520
    };
}

function getPresenceMapSize() {
    const viewBox = parsePresenceViewBox(getPresenceMapData().viewBox || PRESENCE_MAP_DEFAULT_VIEWBOX);
    return { width: viewBox.width, height: viewBox.height };
}

function getPresenceDisplayViewBox() {
    return getPresenceMapData().focusViewBox || PRESENCE_MAP_FOCUS_VIEWBOX;
}

function getPresenceDisplayBox() {
    return parsePresenceViewBox(getPresenceDisplayViewBox());
}

function getPresencePoint(countryId = '') {
    const points = getPresenceMapData().presencePoints || {};
    return points[countryId] || null;
}

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
        console.warn('No se pudo guardar el artículo en sesión', error);
    }
}

function loadArticleData() {
    try {
        const raw = sessionStorage.getItem(ARTICLE_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        console.warn('No se pudo leer el artículo en sesión', error);
        return null;
    }
}

function saveSectionData(data = {}) {
    try {
        sessionStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn('No se pudo guardar la sección en sesión', error);
    }
}

function loadSectionData() {
    try {
        const raw = sessionStorage.getItem(SECTION_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        console.warn('No se pudo leer la sección en sesión', error);
        return null;
    }
}

function getArticleData(card) {
    const titleNode = card.querySelector('h1, h2, h3, h4');
    const bodyNode = card.querySelector('p');
    const categoryNode = card.querySelector('.pill, span');

    const title = card.dataset.title || (titleNode ? titleNode.textContent.trim() : 'Artículo');
    const body = card.dataset.body || (bodyNode ? bodyNode.textContent.trim() : 'Contenido no disponible para este artículo.');
    const category = normalizeCategory(card.dataset.category || (categoryNode ? categoryNode.textContent.trim() : '')) || card.dataset.category || '';
    const image = card.dataset.image || (card.querySelector('img') ? card.querySelector('img').src : '');
    const excerpt = card.dataset.excerpt || body;
    const author = card.dataset.author || 'Redacción SMD';

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
    if (articleModalTitle) articleModalTitle.textContent = title || 'Artículo';
    if (articleModalBody) articleModalBody.textContent = body || 'Contenido no disponible para este artículo.';
    if (articleModalCategory) articleModalCategory.textContent = category || '';

    if (image && articleModalImage && articleModalImageWrap) {
        articleModalImage.src = image;
        articleModalImage.alt = title || 'Imagen del artículo';
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
    card.dataset.title = article.title || 'Artículo';
    card.dataset.body = article.body || article.excerpt || '';
    card.dataset.image = article.image || ARTICLE_FALLBACK.image;
    card.dataset.excerpt = article.excerpt || article.body || ARTICLE_FALLBACK.excerpt;

    const media = document.createElement('div');
    media.className = 'news-card__media';

    const img = document.createElement('img');
    img.src = article.image || ARTICLE_FALLBACK.image;
    img.alt = article.title || 'Imagen del artículo';
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
    title.textContent = article.title || 'Artículo';

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

function getPresenceMapCountryByIso(iso2 = '') {
    return getPresenceMapData().countries.find((country) => country.iso2 === iso2) || null;
}

function renderPresenceBaseCountry(mapCountry = {}, presenceCountry = null) {
    if (!mapCountry.path) return '';

    if (!presenceCountry) {
        return `
                    <path class="presence-map__country" d="${mapCountry.path}" aria-hidden="true"/>`;
    }

    const point = getPresencePoint(presenceCountry.id);
    if (!point) return '';

    const targetRadius = point.radius || 18;
    const classSuffix = presenceCountry.id.toLowerCase();

    return `
                    <g class="presence-country presence-country--${classSuffix}" role="button" tabindex="0" data-country-id="${presenceCountry.id}" aria-label="Ver información de ${presenceCountry.name}">
                        <path d="${mapCountry.path}"/>
                        <circle class="presence-country__target" cx="${point.x}" cy="${point.y}" r="${targetRadius}"/>
                        <circle class="presence-country__pin" cx="${point.x}" cy="${point.y}" r="5"/>
                        <text x="${point.labelX}" y="${point.labelY}">${presenceCountry.name}</text>
                    </g>`;
}

function renderPresenceWorldCountries() {
    const presenceByIso = new Map(PRESENCE_COUNTRIES.map((country) => [country.id, country]));
    return getPresenceMapData().countries
        .map((mapCountry) => renderPresenceBaseCountry(mapCountry, presenceByIso.get(mapCountry.iso2) || null))
        .join('');
}

function escapeHtml(value = '') {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderPhoneLink(phone = '', tel = '') {
    if (!phone) return '';
    return `<a class="contact-chip" href="tel:${escapeHtml(tel || phone.replace(/\s+/g, ''))}"><i data-lucide="phone"></i>${escapeHtml(phone)}</a>`;
}

function renderEmailLink(email = '') {
    if (!email) return '';
    return `<a class="contact-chip" href="mailto:${escapeHtml(email)}"><i data-lucide="mail"></i>${escapeHtml(email)}</a>`;
}

function renderCommunityContacts(community = {}, country = {}) {
    const phones = Array.isArray(community.phones)
        ? community.phones
        : (community.phone ? [{ label: community.phone, href: community.tel || community.phone }] : []);
    const phoneLinks = phones
        .map((phone) => renderPhoneLink(phone.label, phone.href))
        .join('');
    const emailLink = renderEmailLink(community.email || '');
    const fallback = !phoneLinks && !emailLink
        ? `<span class="contact-chip contact-chip--muted"><i data-lucide="info"></i>Consultar por ${country.phone ? 'contacto general' : 'correo general'}</span>`
        : '';
    return `${phoneLinks}${emailLink}${fallback}`;
}

function renderCountryCommunities(country = {}) {
    const communities = Array.isArray(country.communities) ? country.communities : [];
    if (!communities.length) return '';

    return `
        <div class="presence-dialog__communities">
            <h4>Comunidades y contactos</h4>
            <ul>
                ${communities.map((community) => `
                    <li>
                        <strong>${escapeHtml(community.name)}</strong>
                        <span>${escapeHtml(community.place || '')}</span>
                        <em>${escapeHtml(community.founded || '')}</em>
                        <div class="presence-dialog__contact-row">${renderCommunityContacts(community, country)}</div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

function renderCountryContact(country = {}) {
    const links = [
        renderPhoneLink(country.phone, country.tel),
        renderEmailLink(country.email)
    ].filter(Boolean).join('');

    if (!links) return '';

    return `
        <div class="presence-dialog__contact">
            <h4>${escapeHtml(country.contactLabel || 'Contacto')}</h4>
            <div class="presence-dialog__contact-row">${links}</div>
        </div>
    `;
}

const SECTION_INFO = {
    'Santuario': {
        kicker: 'Contacto del santuario',
        title: 'Santuario de la Divina Misericordia en Osicala',
        lead: 'En Osicala, Morazán Sur, el templo recibe peregrinos que buscan paz, silencio, oración, conversión y celebración de la Eucaristía.',
        contacts: [
            { icon: 'map-pin', label: 'Ubicación', value: 'Osicala, Morazán Sur, El Salvador', href: SANCTUARY_MAP_URL },
            { icon: 'phone', label: 'Teléfono en Osicala', value: '+503 7600 3412', href: 'tel:+50376003412' },
            { icon: 'mail', label: 'Correo', value: GENERAL_CONTACT_EMAIL, href: `mailto:${GENERAL_CONTACT_EMAIL}` },
            { icon: 'phone', label: 'Casa Madre', value: '+503 2235 5033 / +503 2221 4759', href: 'tel:+50322355033' }
        ],
        groups: [
            {
                title: 'Historia y construcción',
                items: [
                    'En 1993, Madre Reina Angélica Zelaya Díaz sintió el llamado de fundar una comunidad religiosa en Osicala.',
                    'Once años después inició la inspiración de construir un templo como espacio de encuentro con Jesús.',
                    'El 21 de noviembre de 2019 se colocó la primera piedra, en el día de Nuestra Señora Reina de la Paz.',
                    'En diciembre de 2020 se celebró una misa en memoria de las personas fallecidas por el COVID-19.',
                    'En 2022 avanzó la instalación del techo y en agosto se colocó la cúpula en la fiesta de Santa María Reina.',
                    'El 7 de abril de 2024, Fiesta de la Divina Misericordia, se realizó la Consagración y Dedicación del templo.'
                ]
            },
            {
                title: 'Estado actual',
                items: [
                    'El templo está abierto y recibe a cientos de peregrinos.',
                    'La obra continúa en proceso y se sostiene con donaciones voluntarias.'
                ]
            }
        ]
    },
    'Pastoral Vocacional': {
        kicker: 'Contacto vocacional',
        title: 'Acompañamiento para el llamado a la vida religiosa',
        lead: 'La congregación ofrece un espacio eclesial y formativo para jóvenes con inquietud espiritual o deseo de discernir la vida consagrada.',
        contacts: [
            { icon: 'user', label: 'Atiende', value: 'Pastoral Vocacional de las Siervas' },
            { icon: 'phone', label: 'Atención telefónica', value: VOCATIONAL_PHONE, href: `tel:${VOCATIONAL_TEL}` },
            { icon: 'message-circle', label: 'Facebook', value: 'Karol Wojtyla Siervas y Vocacional Siervas' },
            { icon: 'mail', label: 'Correo', value: GENERAL_CONTACT_EMAIL, href: `mailto:${GENERAL_CONTACT_EMAIL}` }
        ],
        groups: [
            {
                title: 'Identidad, carisma y espiritualidad',
                items: [
                    'La espiritualidad eclesial brota del Corazón Misericordioso de Dios.',
                    'El carisma consiste en difundir la devoción a la Divina Misericordia y ser instrumento vivo de ella.',
                    'La vida comunitaria se desarrolla en espíritu de familia, oración constante y comunión con la Madre Iglesia.',
                    'La misión se ejerce en parroquias, hospitales, mercados, albergues y zonas marginales.'
                ]
            },
            {
                title: 'Itinerario formativo',
                items: [
                    'Aspirantado y Postulantado: discernimiento y profundización de la inquietud vocacional.',
                    'Noviciado: formación intensa para asumir los votos de castidad, pobreza y obediencia.',
                    'Juniorado: consolidación de la identidad dentro de la vida fraterna y los apostolados.'
                ]
            }
        ]
    }
};

function renderSectionInfoPanel(displayCategory = '', overview = false) {
    const panel = document.getElementById('section-info');
    if (!panel) return;

    const info = !overview ? SECTION_INFO[displayCategory] : null;
    if (!info) {
        panel.hidden = true;
        panel.innerHTML = '';
        return;
    }

    panel.hidden = false;
    panel.innerHTML = `
        <div class="section-info-panel__intro">
            <p class="section-kicker">${escapeHtml(info.kicker)}</p>
            <h2>${escapeHtml(info.title)}</h2>
            <p>${escapeHtml(info.lead)}</p>
        </div>
        <div class="section-info-panel__contacts">
            ${(info.contacts || []).map((item) => {
                const content = `<span><strong>${escapeHtml(item.label)}</strong><em>${escapeHtml(item.value)}</em></span>`;
                const icon = `<i data-lucide="${escapeHtml(item.icon || 'info')}"></i>`;
                return item.href
                    ? `<a href="${escapeHtml(item.href)}" class="section-contact-card">${icon}${content}</a>`
                    : `<div class="section-contact-card">${icon}${content}</div>`;
            }).join('')}
        </div>
        <div class="section-info-panel__groups">
            ${(info.groups || []).map((group) => `
                <article>
                    <h3>${escapeHtml(group.title)}</h3>
                    <ul>
                        ${(group.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
                    </ul>
                </article>
            `).join('')}
        </div>
    `;
    normalizeLinkTargets(panel);
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

function renderPresenceMap(displayCategory = '') {
    const mapMount = document.getElementById('section-world-map');
    if (!mapMount) return;

    if (displayCategory !== 'Presencia en el Mundo') {
        mapMount.hidden = true;
        mapMount.innerHTML = '';
        return;
    }

    const mapSize = getPresenceMapSize();
    const displayViewBox = getPresenceDisplayViewBox();

    mapMount.hidden = false;
    mapMount.innerHTML = `
        <section class="presence-map" aria-labelledby="presence-map-title">
            <header class="presence-map__header">
                <p class="section-kicker">Mapa interactivo</p>
                <h2 id="presence-map-title">Países donde están las Siervas</h2>
            </header>
            <div class="presence-map__canvas" aria-label="Mapa interactivo de presencia de las Siervas">
                <div class="presence-map__viewport" tabindex="0" aria-label="Desplazar mapa de presencia">
                <svg class="presence-map__svg" viewBox="${displayViewBox}" role="img" aria-labelledby="presence-map-svg-title presence-map-svg-desc">
                    <title id="presence-map-svg-title">Mapa de presencia mundial</title>
                    <desc id="presence-map-svg-desc">Mapa geográfico mundial con Honduras, El Salvador, Argentina, Chile e Italia destacados.</desc>
                    <defs>
                        <filter id="presence-shadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f2538" flood-opacity="0.18"/>
                        </filter>
                    </defs>
                    <rect class="presence-map__ocean" width="${mapSize.width}" height="${mapSize.height}"/>
                    <path class="presence-map__graticule" d="M120 0V520M240 0V520M360 0V520M480 0V520M600 0V520M720 0V520M840 0V520M0 86.7H960M0 173.3H960M0 260H960M0 346.7H960M0 433.3H960"/>
${renderPresenceWorldCountries()}
                </svg>
                </div>

                <aside class="presence-dialog" aria-live="polite" aria-labelledby="presence-dialog-title" hidden>
                    <p class="presence-dialog__eyebrow">País seleccionado</p>
                    <h3 id="presence-dialog-title"></h3>
                    <dl>
                        <div>
                            <dt>Inicio de la obra</dt>
                            <dd data-presence-started></dd>
                        </div>
                        <div>
                            <dt>Qué hacen</dt>
                            <dd data-presence-work></dd>
                        </div>
                    </dl>
                    <div data-presence-communities></div>
                    <div data-presence-contact></div>
                    <p data-presence-note></p>
                </aside>
            </div>
        </section>
    `;
    const canvas = mapMount.querySelector('.presence-map__canvas');
    const dialog = mapMount.querySelector('.presence-dialog');
    const dialogTitle = mapMount.querySelector('#presence-dialog-title');
    const started = mapMount.querySelector('[data-presence-started]');
    const work = mapMount.querySelector('[data-presence-work]');
    const communities = mapMount.querySelector('[data-presence-communities]');
    const contact = mapMount.querySelector('[data-presence-contact]');
    const note = mapMount.querySelector('[data-presence-note]');
    const countryButtons = Array.from(mapMount.querySelectorAll('[data-country-id]'));

    const clearCountry = () => {
        countryButtons.forEach((button) => {
            button.classList.remove('is-active');
            button.setAttribute('aria-pressed', 'false');
        });
        if (dialog) dialog.hidden = true;
    };

    const isCompactMap = () => window.matchMedia && window.matchMedia('(max-width: 760px)').matches;

    const positionDialog = (countryId = '') => {
        const point = getPresencePoint(countryId);
        if (!point || !canvas || !dialog) return;

        dialog.hidden = false;

        if (isCompactMap()) {
            dialog.style.left = '';
            dialog.style.top = '';
            return;
        }

        window.requestAnimationFrame(() => {
            const canvasRect = canvas.getBoundingClientRect();
            const dialogRect = dialog.getBoundingClientRect();
            const displayBox = getPresenceDisplayBox();
            const pinX = ((point.x - displayBox.x) / displayBox.width) * canvasRect.width;
            const pinY = ((point.y - displayBox.y) / displayBox.height) * canvasRect.height;
            const gap = 18;
            let left = pinX + gap;
            let top = pinY - (dialogRect.height / 2);

            if (left + dialogRect.width > canvasRect.width - 16) {
                left = pinX - dialogRect.width - gap;
            }

            top = Math.max(16, Math.min(top, canvasRect.height - dialogRect.height - 16));
            left = Math.max(16, Math.min(left, canvasRect.width - dialogRect.width - 16));

            dialog.style.left = `${left}px`;
            dialog.style.top = `${top}px`;
        });
    };

    const selectCountry = (countryId = '') => {
        const country = PRESENCE_COUNTRIES.find((item) => item.id === countryId);
        if (!country) return;

        countryButtons.forEach((button) => {
            button.classList.toggle('is-active', button.dataset.countryId === country.id);
            button.setAttribute('aria-pressed', button.dataset.countryId === country.id ? 'true' : 'false');
        });
        if (dialogTitle) dialogTitle.textContent = country.name;
        if (started) started.textContent = country.started;
        if (work) work.textContent = country.work;
        if (communities) communities.innerHTML = renderCountryCommunities(country);
        if (contact) contact.innerHTML = renderCountryContact(country);
        if (note) note.textContent = country.note;
        positionDialog(country.id);
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
        if (isCompactMap() && dialog) {
            window.requestAnimationFrame(() => {
                dialog.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    };

    countryButtons.forEach((button) => {
        const handleSelect = (event) => {
            if (event) event.stopPropagation();
            selectCountry(button.dataset.countryId || '');
        };
        button.addEventListener('click', handleSelect);
        button.querySelectorAll('*').forEach((child) => {
            child.addEventListener('click', handleSelect);
        });
        button.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            selectCountry(button.dataset.countryId || '');
        });
    });

    if (dialog) {
        dialog.addEventListener('click', (event) => event.stopPropagation());
    }

    if (canvas) {
        canvas.addEventListener('click', clearCountry);
    }

    document.addEventListener('click', (event) => {
        if (!dialog || dialog.hidden) return;
        const target = event.target;
        if (target.closest?.('.presence-dialog') || target.closest?.('.presence-country')) return;
        clearCountry();
    });

    window.addEventListener('resize', () => {
        const activeCountry = mapMount.querySelector('.presence-country.is-active');
        if (activeCountry && !dialog?.hidden) {
            positionDialog(activeCountry.dataset.countryId || '');
        }
    });

    clearCountry();
}

function renderSectionPage(category = '', articles = [], options = {}) {
    const { overview = false } = options;
    const grid = document.getElementById('section-grid');
    const empty = document.getElementById('section-empty');
    const kicker = document.getElementById('section-kicker');
    const title = document.getElementById('section-title');
    const lead = document.getElementById('section-lead');
    const actions = document.getElementById('section-actions');
    const sectionHero = document.querySelector('.section-hero');

    const displayCategory = normalizeCategory(category) || category || DEFAULT_SECTION_CATEGORY;
    const isPresenceMap = !overview && displayCategory === 'Presencia en el Mundo';

    if (sectionHero) sectionHero.hidden = isPresenceMap;

    if (kicker) kicker.textContent = overview ? 'Secciones' : displayCategory;
    if (title) {
        title.textContent = overview
            ? SECTION_OVERVIEW_TITLE
            : displayCategory === 'Santuario'
                ? 'Información sobre el templo de Jesús de la Divina Misericordia'
                : (displayCategory === 'Opinión' ? 'Artículos de opinión' : `Artículos de ${displayCategory}`);
    }
    if (lead) {
        lead.textContent = overview
            ? 'Explora una selección de artículos recientes de SMD.'
            : `Explora todas las publicaciones de ${displayCategory}.`;
    }
    if (actions) {
        actions.innerHTML = '';
        const shouldShowSanctuaryMap = !overview && displayCategory === 'Santuario';
        actions.hidden = !shouldShowSanctuaryMap;
        if (shouldShowSanctuaryMap) {
            actions.innerHTML = `<a class="button button--solid button--map" href="${SANCTUARY_MAP_URL}" rel="noopener noreferrer"><i data-lucide="map-pin"></i> Abrir ubicación en Google Maps</a>`;
            normalizeLinkTargets(actions);
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
        }
    }

    renderSectionInfoPanel(displayCategory, overview);
    renderPresenceMap(overview ? '' : displayCategory);

    if (!grid) return;
    const listingSection = grid.closest('section');
    if (listingSection) listingSection.hidden = isPresenceMap;
    if (isPresenceMap) return;

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
        imageEl.alt = title || 'Imagen del artículo';
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
        donateText.textContent = 'Así como en este artículo, las obras necesitan recursos para seguir. Si quieres donar a Si Mi Dios, el botón está abajo.';
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

        if (!img.hasAttribute('loading')) img.loading = 'lazy';
        if (!img.hasAttribute('decoding')) img.decoding = 'async';

        if (!img.getAttribute('src')) return;

        img.dataset.placeholderBound = 'true';

        if (img.complete) {
            if (img.naturalWidth > 0) return;
            applyFallback(img);
            return;
        }

        img.addEventListener('error', () => {
            applyFallback(img);
        }, { once: true });

        img.addEventListener('load', () => {
            if (img.naturalWidth > 0) img.dataset.imageReady = 'true';
        }, { once: true });
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

function initMobileFabDonateVisibility() {
    const fabDonate = document.querySelector('.mobile-fab-donate');
    if (!fabDonate) return;

    const premiumSection = document.querySelector('.audio-section--premium');
    let rafId = 0;

    const isPremiumVisible = () => {
        if (!premiumSection) return false;
        const rect = premiumSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
        return rect.bottom > 0 && rect.top < viewportHeight;
    };

    const syncFabVisibility = () => {
        rafId = 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const atPageStart = scrollY <= 0;
        const showFab = !atPageStart && !isPremiumVisible();
        fabDonate.style.display = showFab ? 'inline-flex' : 'none';
    };

    const scheduleSync = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(syncFabVisibility);
    };

    syncFabVisibility();

    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);

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
initLinkTargetPolicy();
initMobileSubmenus();
initSectionsDropdown();
initHeroCarousel();
initVideoModal();
initLightboxGallery();
initCustomAudioPlayer();
initMobileFabDonateVisibility();
initRevealAnimations();
initImagePlaceholders();
applyAllowedCategories();
handleSectionLinks();
bindArticleCards();
initSectionPage();
initArticlePage();
updateHeaderState();

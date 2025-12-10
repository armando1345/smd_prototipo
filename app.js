// Inicializar iconos
lucide.createIcons();

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
    const images = document.querySelectorAll('.hero__media img, .news-card__media img');
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

    return { title, body, category, image };
}

const articleCards = document.querySelectorAll('[data-article]');
articleCards.forEach((card) => {
    card.tabIndex = 0;
    const open = () => openArticleModal(getArticleData(card), card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open();
        }
    });
});

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

// Cerrar barra de ultima hora
const breakingBar = document.getElementById('breaking-bar');
const closeBreaking = document.getElementById('close-breaking');
const BREAKING_DISMISS_KEY = 'breakingDismissedAt';
const BREAKING_DISMISS_WINDOW = 24 * 60 * 60 * 1000;

function hideBreakingBar() {
    if (breakingBar) {
        breakingBar.style.display = 'none';
    }
}

if (breakingBar && closeBreaking) {
    const storedDismiss = localStorage.getItem(BREAKING_DISMISS_KEY);
    if (storedDismiss && Date.now() - Number(storedDismiss) < BREAKING_DISMISS_WINDOW) {
        hideBreakingBar();
    }

    closeBreaking.addEventListener('click', () => {
        localStorage.setItem(BREAKING_DISMISS_KEY, Date.now().toString());
        hideBreakingBar();
    });
}

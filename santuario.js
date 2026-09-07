const sanctuaryPages = [
    { id: 'devocion', href: 'santuario-devocion.html', label: 'Divina Misericordia' },
    { id: 'templo', href: 'santuario-templo.html', label: 'Templo' },
    { id: 'peregrinos', href: 'santuario-peregrinos.html', label: 'Peregrinos de la Misericordia' },
    { id: 'recorrido', href: 'santuario-recorrido.html', label: 'Recorrido virtual' },
    { id: 'santos', href: 'santuario-santos.html', label: 'Santos y Mártires' }
];

function renderSanctuaryNavigation() {
    const mount = document.querySelector('[data-sanctuary-nav]');
    if (!mount) return;

    const active = document.body.dataset.sanctuaryPage || 'recorrido';
    mount.innerHTML = `
        <div class="layout sanctuary-nav__inner">
            <a class="sanctuary-nav__brand" href="santuario-recorrido.html">
                <strong>Templo de Jesús de la Divina Misericordia</strong>
            </a>
            <nav class="sanctuary-nav__links" aria-label="Secciones del santuario">
                ${sanctuaryPages.map((page) => `
                    <a href="${page.href}"${page.id === active ? ' class="is-active" aria-current="page"' : ''}>${page.label}</a>
                `).join('')}
            </nav>
        </div>
    `;

    const links = mount.querySelector('.sanctuary-nav__links');
    const current = links?.querySelector('[aria-current="page"]');
    if (links && current && links.scrollWidth > links.clientWidth) {
        links.scrollLeft = Math.max(0, current.offsetLeft - ((links.clientWidth - current.offsetWidth) / 2));
    }
}

function initSanctuaryJumpMenu() {
    const select = document.querySelector('[data-sanctuary-jump]');
    if (!select) return;

    select.addEventListener('change', () => {
        const target = document.querySelector(select.value);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function initSanctuaryMediaFallbacks() {
    document.querySelectorAll('[data-embed]').forEach((frame) => {
        const wrapper = frame.closest('.sanctuary-embed');
        if (!wrapper) return;
        frame.addEventListener('load', () => wrapper.classList.add('is-loaded'));
    });
}

function initExpandedSanctuaryVideos() {
    const frames = document.querySelectorAll('.sanctuary-embed iframe[data-embed]');
    if (!frames.length) return;

    const dialog = document.createElement('dialog');
    dialog.className = 'sanctuary-video-dialog';
    dialog.setAttribute('aria-labelledby', 'sanctuary-video-title');
    dialog.innerHTML = `
        <header class="sanctuary-video-dialog__bar">
            <h2 id="sanctuary-video-title"></h2>
            <button type="button" class="sanctuary-video-dialog__close" aria-label="Cerrar video" autofocus>✕ <span>Cerrar</span></button>
        </header>
        <div class="sanctuary-video-dialog__player"></div>`;
    document.body.append(dialog);
    const title = dialog.querySelector('h2');
    const player = dialog.querySelector('.sanctuary-video-dialog__player');
    let invoker;
    let previousOverflow;
    let previousRootOverflow;

    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
        // Removing the player stops both playback and audio, including cross-origin embeds.
        player.replaceChildren();
        document.body.style.overflow = previousOverflow;
        document.documentElement.style.overflow = previousRootOverflow;
        invoker?.focus({ preventScroll: true });
    });

    frames.forEach((frame) => {
        const wrapper = frame.closest('.sanctuary-embed');
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'sanctuary-video-trigger';
        trigger.setAttribute('aria-label', `Ver en pantalla completa: ${frame.title}`);
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.innerHTML = '<span class="sanctuary-video-trigger__play" aria-hidden="true">▶</span><span class="sanctuary-video-trigger__label">Ver en pantalla completa</span>';
        frame.tabIndex = -1;
        frame.setAttribute('aria-hidden', 'true');
        wrapper.classList.add('sanctuary-embed--expandable');
        wrapper.append(trigger);

        trigger.addEventListener('click', () => {
            invoker = trigger;
            title.textContent = frame.title;
            const expandedFrame = document.createElement('iframe');
            const url = new URL(frame.src, document.baseURI);
            url.searchParams.set('autoplay', '1');
            expandedFrame.src = url.href;
            expandedFrame.title = frame.title;
            expandedFrame.allow = 'autoplay; fullscreen; encrypted-media; picture-in-picture';
            expandedFrame.allowFullscreen = true;
            player.replaceChildren(expandedFrame);
            previousOverflow = document.body.style.overflow;
            previousRootOverflow = document.documentElement.style.overflow;
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            dialog.showModal();
        });
    });
}

function initSaintRotations() {
    // Recovered from the original animated GIFs on the published site.
    // Keep the original photo order and six-second rhythm, replacing only the front portrait.
    const galleries = {
        'san-juan-pablo-ii': { name: 'San Juan Pablo II', captions: ['Cuadro de frente', 'Cuadro y visitantes del templo', 'Detalle de la reliquia', 'Lugar de veneración', 'Relicario en el templo', 'Reliquia y placa de autenticidad'] },
        'san-oscar-romero': { name: 'San Óscar Romero', captions: ['Cuadro de frente', 'Cuadro y visitantes del templo', 'Detalle de la reliquia', 'Cuadro y relicario en la pared', 'Otra vista del cuadro'] },
        'san-maximiliano-kolbe': { name: 'San Maximiliano Kolbe', captions: ['Cuadro de frente', 'Visitantes junto al cuadro', 'Detalle de la reliquia', 'Cuadro y relicario en la pared', 'Veneración en el templo'] },
        'santa-faustina': { name: 'Santa Faustina Kowalska', captions: ['Cuadro de frente', 'Cuadro y visitantes del templo', 'Detalle de la reliquia', 'Lugar de veneración', 'Cuadro y flores en el templo'] }
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    document.querySelectorAll('.virtual-tour-card__media--portrait').forEach((mount) => {
        const photo = mount.querySelector('img');
        const slug = photo?.getAttribute('src')?.split('/').pop().split('.')[0];
        const gallery = galleries[slug];
        if (!gallery) return;
        const front = photo.getAttribute('src');
        const slides = gallery.captions.map((caption, index) => ({
            src: index === 0 ? front : `assets/santuario/rotacion/${slug}-${String(index + 1).padStart(2, '0')}.jpg`,
            alt: `${caption} de ${gallery.name}`
        }));
        const controls = document.createElement('div');
        controls.className = 'saint-rotation-controls';
        controls.setAttribute('role', 'group');
        controls.setAttribute('aria-label', `Fotografías de ${gallery.name}`);
        controls.innerHTML = `
            <button type="button" data-previous aria-label="Fotografía anterior de ${gallery.name}">‹</button>
            <span class="saint-rotation-controls__count"></span>
            <button type="button" data-toggle></button>
            <button type="button" data-next aria-label="Fotografía siguiente de ${gallery.name}">›</button>`;
        mount.after(controls);
        mount.classList.add('saint-rotation');
        const counter = controls.querySelector('span');
        const toggle = controls.querySelector('[data-toggle]');
        let current = 0;
        let timer;
        let request = 0;
        let visible = false;
        let paused = reducedMotion.matches;
        let hovered = false;
        let focused = false;
        const refreshControls = () => {
            counter.textContent = `${current + 1} / ${slides.length}`;
            toggle.textContent = paused ? 'Reanudar' : 'Pausar';
            toggle.setAttribute('aria-label', `${paused ? 'Reanudar' : 'Pausar'} rotación de ${gallery.name}`);
        };
        const schedule = () => {
            clearTimeout(timer);
            if (!paused && visible && !hovered && !focused && !document.hidden) {
                timer = setTimeout(() => show(current + 1), 6000);
            }
        };
        const show = async (index) => {
            clearTimeout(timer);
            const token = ++request;
            const next = (index + slides.length) % slides.length;
            const preload = new Image();
            preload.src = slides[next].src;
            try { await preload.decode(); } catch { schedule(); return; }
            if (request !== token) return;
            current = next;
            photo.src = slides[current].src;
            photo.alt = slides[current].alt;
            photo.classList.toggle('saint-rotation__detail', current !== 0);
            if (!reducedMotion.matches) photo.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 450 });
            refreshControls();
            schedule();
        };
        controls.querySelector('[data-previous]').addEventListener('click', () => show(current - 1));
        controls.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
        toggle.addEventListener('click', () => {
            paused = !paused;
            refreshControls();
            schedule();
        });
        const card = mount.closest('.virtual-tour-card');
        card.addEventListener('pointerenter', () => { hovered = true; schedule(); });
        card.addEventListener('pointerleave', () => { hovered = false; schedule(); });
        card.addEventListener('focusin', () => { focused = true; schedule(); });
        card.addEventListener('focusout', (event) => {
            focused = card.contains(event.relatedTarget);
            schedule();
        });
        document.addEventListener('visibilitychange', schedule);
        reducedMotion.addEventListener('change', () => {
            paused = reducedMotion.matches;
            refreshControls();
            schedule();
        });
        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            schedule();
        }, { threshold: 0.15 });
        observer.observe(mount);
        photo.alt = slides[0].alt;
        refreshControls();
    });
}

renderSanctuaryNavigation();
initSanctuaryJumpMenu();
initSanctuaryMediaFallbacks();
initExpandedSanctuaryVideos();
initSaintRotations();

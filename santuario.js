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

renderSanctuaryNavigation();
initSanctuaryJumpMenu();
initSanctuaryMediaFallbacks();

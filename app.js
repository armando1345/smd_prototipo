if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
}

const ARTICLE_STORAGE_KEY = 'smd-article-data';
const SECTION_STORAGE_KEY = 'smd-section-data';
const DEFAULT_SECTION_CATEGORY = 'Mundo';
const SECTION_OVERVIEW_TITLE = 'Últimos artículos';
const SANCTUARY_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Templo%20de%20Jes%C3%BAs%20de%20la%20Divina%20Misericordia%2C%20Osicala%2C%20Moraz%C3%A1n%2C%20El%20Salvador';
const TEMPLE_PROJECT_URL = 'https://www.templodejesusdeladivinamisericordiaelsalvador.com/';

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
            title: 'El santuario como casa de misericordia',
            category: 'Santuario',
            excerpt: 'Un recorrido por la vida de oración, silencio y acogida que sostiene la misión.',
            image: 'templo-exterior.jpg',
            body: 'El santuario es un lugar de encuentro para quienes buscan rezar, agradecer y volver a empezar.'
        },
        {
            title: 'Altar de la Divina Misericordia',
            category: 'Santuario',
            excerpt: 'Signos, imágenes y espacios preparados para acompañar la vida espiritual de los fieles.',
            image: 'altar-divina-misericordia.jpg',
            body: 'Cada detalle del templo invita a contemplar la misericordia de Dios con calma y reverencia.'
        }
    ],
    'Pastoral Vocacional': [
        {
            title: 'Acompañamiento para discernir la vocación',
            category: 'Pastoral Vocacional',
            excerpt: 'Espacios de escucha y guía espiritual para jóvenes que sienten una inquietud vocacional.',
            image: 'sierva-palmas.jpg',
            body: 'La pastoral vocacional ofrece cercanía, oración y criterios concretos para discernir el llamado de Dios.'
        },
        {
            title: 'Jóvenes que buscan servir con alegría',
            category: 'Pastoral Vocacional',
            excerpt: 'Testimonios y encuentros que ayudan a reconocer la voz de Dios en la vida diaria.',
            image: 'jovenes-cruces.jpg',
            body: 'El camino vocacional madura en comunidad, con acompañamiento y una vida espiritual constante.'
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
        id: 'el-salvador',
        name: 'El Salvador',
        started: 'Cuna de la congregación',
        work: 'Casa madre, vida comunitaria, acompañamiento espiritual y servicio pastoral cercano a familias y comunidades.',
        note: 'Desde aquí se sostiene la identidad de las Siervas y se coordina gran parte de la misión.'
    },
    {
        id: 'honduras',
        name: 'Honduras',
        started: 'Obra misionera en expansión',
        work: 'Acompañamiento pastoral, evangelización comunitaria y presencia junto a fieles que buscan formación y consuelo.',
        note: 'La misión se centra en cercanía, escucha y apoyo a comunidades parroquiales.'
    },
    {
        id: 'argentina',
        name: 'Argentina',
        started: 'Presencia en el Cono Sur',
        work: 'Servicio evangelizador, apoyo pastoral y espacios de oración para fortalecer la vida cristiana.',
        note: 'La obra conecta el carisma de misericordia con realidades pastorales locales.'
    },
    {
        id: 'chile',
        name: 'Chile',
        started: 'Misión reciente de acompañamiento',
        work: 'Colaboración pastoral, vida de oración y servicio a comunidades que reciben la espiritualidad de la misericordia.',
        note: 'La presencia busca sembrar acompañamiento estable y comúnión eclesial.'
    }
];

const PRESENCE_COUNTRY_POINTS = {
    "honduras": {
        "x": 323.5,
        "y": 205.4,
        "labelX": 341,
        "labelY": 201
    },
    "el-salvador": {
        "x": 305.2,
        "y": 209.8,
        "labelX": 219,
        "labelY": 225
    },
    "argentina": {
        "x": 501.7,
        "y": 431.2,
        "labelX": 520,
        "labelY": 432
    },
    "chile": {
        "x": 446,
        "y": 412.2,
        "labelX": 387,
        "labelY": 413
    }
};

const PRESENCE_MAP_PATHS = {
    "land": "M491.4 536.2L483.8 536.6L479.8 534.1L475 533.9L466.5 533.9L466.5 518.6L469.5 521.7L473.5 526.8L483.8 531L495 532.7L491.4 536.2ZM495.6 358.2L500.3 361.3L503.4 357.8L512.5 358L513.8 358.9L528.4 366.1L534.9 366.8L544.6 370.1L552.8 371.8L554 373.8L546.1 380.7L554.2 382L563.1 382.7L569.4 381.9L576.6 378.4L577.9 374.4L581.8 373.6L585.8 376.2L585.7 379.8L579 382.3L573.6 384.2L564.7 388.7L554 395L552 398.8L549.9 403.7L550 408.5L548.3 409.6L547.7 412.7L547.1 415.3L557.2 419.6L556.1 423L561.1 425.2L560.7 427.7L553.1 434.2L541.3 437L525.3 438.1L516.6 437.6L518.2 440.7L516.6 444.7L518.1 447.3L513.3 449.2L505.1 450L497.5 448L494.4 449.4L495.5 454.8L500.9 456.5L505.3 454.7L507.6 457.6L500.3 459.3L493.9 462.8L492.7 468.5L490.9 471.5L483.3 471.5L477.1 474.5L474.8 478.9L482.7 483.2L490.3 484.4L487.5 489.8L478.1 493.3L473 500.6L465.7 503.1L462.4 506.1L465 512.8L470.3 516.6L466.9 516.3L459.6 515.3L440.3 514.4L437 510.6L437.2 505.7L431.9 506.1L429.1 503.8L428.4 497.1L434.5 494.4L437 490.5L436.1 487.4L440.3 482.3L443.2 474.6L442.4 471.2L445.9 470.1L445 467.9L441.3 466.8L443.9 464.4L440.3 462.3L438.5 455.9L441.7 454.8L440.3 448.2L442.2 442.7L444.3 438L449.1 436.1L446.7 431.1L446.7 426.4L452.7 423.1L452.5 419L457 414.1L457.1 409.6L455 408.8L451.3 400.5L456.2 395.6L455.5 391.1L458.3 386.8L463.5 382.5L469.1 379.7L466.8 377.9L468.4 376.4L468.2 369L476.8 366.8L479.6 362.2L478.6 361.1L485.2 357.1L495.6 358.2ZM303.3 192.6L303.2 192L304.2 191.8L305.6 192.3L308.5 189.7L310 189.7L310 190.3L311.5 190.3L311.4 191.5L310.1 193.3L310.8 194L310 195.5L310.5 195.9L309.5 198.1L308 199.2L306.5 199.3L305 200.8L302.6 200.8L303.2 196L303.3 192.6ZM512.5 358L503.4 357.8L500.3 361.3L495.6 358.2L485.2 357.1L478.6 361.1L472.9 361.7L469.7 355.6L465.5 350.7L468 346.5L463.8 344.7L462.7 341.6L458.8 338.7L463.9 334.1L460.4 330.6L462.3 329.2L460.8 327.6L463.9 325.5L464.1 322L464.5 319L466.2 317.6L459.3 310.9L465.2 311.3L469.3 311.2L471.1 309.9L478.1 308.3L482.3 306.7L492.7 306L491.8 309.1L492.8 310.7L492.2 313.5L500.8 317.2L509.7 317.9L512.8 319.4L518.2 320.3L521.5 321.5L526.5 321.4L531.1 322.7L531.5 325.1L533 326.3L533.1 328.1L530.8 328.2L533.9 333.1L549.1 333.3L548 335.7L548.8 337.4L553.2 338.6L555 341.3L553.6 344.6L551.5 346.5L552.2 349L549.7 349.9L549.6 348.5L542.2 346.3L534.8 346.3L520.9 347.5L517.1 351.3L516.9 353.7L513.8 358.9L512.5 358ZM554 395L564.7 388.7L573.6 384.2L579 382.3L585.7 379.8L585.8 376.2L581.8 373.6L577.9 374.4L579.5 371.8L580.5 369.2L580.5 366.7L577.7 365.9L574.7 366.7L571.7 366.5L570.8 364.7L570.1 360.7L568.6 359.4L563.2 358.2L560 359.1L551.6 358.2L552.1 352.3L549.7 349.9L552.2 349L551.5 346.5L553.6 344.6L555 341.3L553.2 338.6L548.8 337.4L548 335.7L549.1 333.3L533.9 333.1L530.8 328.2L533.1 328.1L533 326.3L531.5 325.1L531.1 322.7L526.5 321.4L521.5 321.5L518.2 320.3L512.8 319.4L509.7 317.9L500.8 317.2L492.2 313.5L492.8 310.7L491.8 309.1L492.7 306L482.3 306.7L478.1 308.3L471.1 309.9L469.3 311.2L465.2 311.3L459.3 310.9L454.8 311.6L451.2 311.2L451.7 304.9L445.2 307.3L438.2 307.2L435.2 305L429.9 304.8L431.6 303L427.2 300.5L423.9 296.8L426 296.1L426 294.3L430.8 293.2L430 290.9L432 289.5L432.6 287.6L441.7 284.8L448.2 284.1L449.3 283.5L456.4 283.6L460 272.5L460.2 270.7L458.9 268.4L455.4 266.9L455.5 264L459.9 263.3L461.5 263.7L461.8 262.2L457.1 261.7L457 259.2L472.5 259.3L475.2 257.9L477.4 259.2L478.9 261.6L480.4 261.1L484.8 263.2L491 263L492.5 261.7L498.5 260.8L501.7 260.1L502.7 258.4L508.3 257.2L507.9 256.4L501.2 256L500.1 253.5L500.4 250.7L496.8 249.7L498.3 249.3L504.2 249.8L510.5 250.8L512.8 249.9L518.6 249.2L527.5 247.7L530.4 246.2L529.3 245L533.4 244.8L535.3 245.8L534.3 247.6L537 248.2L538.8 250.1L536.6 251.5L535.3 255L537.4 257L538 258.9L542.9 260.8L546.8 261L547.6 260.2L550.2 260L553.8 259.3L556.3 258.2L560.7 258.6L562.7 258.4L567 258.8L567.7 257.9L566.4 257.1L567.2 256L570.4 256.3L574.1 255.9L578.7 256.8L582.2 257.6L584.6 256.5L586.4 256.7L587.5 257.8L591.3 257.5L594.4 256L596.8 253L601.5 249.3L604.2 249.1L606.2 251.3L610.7 258.4L614.9 259.1L615.1 261.9L609.1 265.3L611.6 266.5L625.7 267.1L626 271.2L632 268.5L642 270L655.2 272.5L659.1 274.9L657.8 277.1L667.1 275.8L682.5 278L694.4 277.8L706.2 281.2L716.4 285.8L722.5 286.9L729.3 287.1L732.2 288.4L734.9 293.6L736.2 296.1L733 302.9L729 305.6L717.8 311.3L712.7 316L706.8 319.6L704.8 319.7L702.6 322.7L703.2 330.6L700.9 337.1L700.1 340L697.6 341.6L696.2 347.4L688.1 353L686.7 357.5L680.3 359.4L678.4 362.1L669.8 362.1L657.3 363.8L651.7 365.7L642.8 367L633.4 370.6L626.7 375.1L625.5 378.4L626.8 381L625.4 385.6L623.5 387.8L618 390.4L609.2 398.7L602.2 402.4L596.8 404.7L593.1 409.3L587.9 412.1L585.7 409.3L589.2 407L584.6 403.7L578.3 401.1L570.1 398L567.2 398.2L559.2 394.5L554 395ZM466.5 518.6L466.5 533.9L475 533.9L479.8 534.1L477.1 537L470.3 539.2L466.4 539L461.7 538.4L455.9 536.2L447.6 535.2L437.6 531.3L429.4 527.5L418.5 519.9L425 521.3L436.2 525.9L446.8 528.3L450.9 525.2L453.5 520.5L460.8 517.8L466.5 518.6ZM469.7 355.6L472.9 361.7L478.6 361.1L479.6 362.2L476.8 366.8L468.2 369L468.4 376.4L466.8 377.9L469.1 379.7L463.5 382.5L458.3 386.8L455.5 391.1L456.2 395.6L451.3 400.5L455 408.8L457.1 409.6L457 414.1L452.5 419L452.7 423.1L446.7 426.4L446.7 431.1L449.1 436.1L444.3 438L442.2 442.7L440.3 448.2L441.7 454.8L438.5 455.9L440.3 462.3L443.9 464.4L441.3 466.8L445 467.9L445.9 470.1L442.4 471.2L443.2 474.6L440.3 482.3L436.1 487.4L437 490.5L434.5 494.4L428.4 497.1L429.1 503.8L431.9 506.1L437.2 505.7L437 510.6L440.3 514.4L459.6 515.3L466.9 516.3L459.9 516.3L456 517.9L448.9 520.3L447.6 526.7L444.2 526.8L435.2 524.6L426.1 519.9L426.1 519.9L416.2 516.1L413.7 511.9L416 508.1L412 503.8L411 493.1L414.3 487.3L422.8 482.7L410.7 480.9L418.3 475.7L421 466.2L429.8 468.2L434 456.6L428.6 455.2L426.1 462.1L421.1 461.3L423.6 453.4L426.3 443.4L430 439.8L427.7 434.7L427 429L430.4 428.8L435.3 420.7L440.8 412.7L444.1 405.5L442.3 398.4L444.7 394.5L443.7 388.7L448.4 383.1L449.8 374.3L452.4 365L454.9 355.2L454.3 348.1L452.6 342L456.7 340.9L458.8 338.7L462.7 341.6L463.8 344.7L468 346.5L465.5 350.7L469.7 355.6ZM412.8 266.8L409.4 265.8L405.5 264.5L403.3 265.1L396.5 264.6L394.6 262.8L393.1 262.9L385.1 260.6L384.1 259.3L387 259L386.7 256.9L388.5 255.5L392.5 255.2L395.8 252.6L398.9 250.5L395.9 249.5L397.4 247.2L395.6 243.4L397.4 242.4L396.1 238.9L392.9 236.7L393.9 234.7L396.5 235L398 233.8L396.1 231.4L397.1 230.8L401.2 230.9L407.2 228.1L410.4 227.6L410.5 226.3L412 222.8L416.5 220.9L421.6 220.8L422.2 219.9L428.4 220.3L434.7 218.2L437.8 217.2L441.6 215.2L444.4 215.5L446.5 216.6L445 218L439.9 218.7L437.9 220.7L434.8 221.9L432.5 223.5L431.5 226.4L429.3 228.8L433.4 229.1L434.4 231L436.2 231.9L436.8 233.5L435.9 235.1L436.1 235.9L438.1 236.3L440 237.7L450.2 237.3L454.8 237.8L460.4 241.3L463.7 240.9L469.4 241.1L473.9 240.7L476.7 241.4L475.3 243.6L473.5 244.9L472.9 247.8L474.5 250.6L476.8 251.8L477 252.7L473 254.7L475.9 255.6L478 257L480.4 261.1L478.9 261.6L477.4 259.2L475.2 257.9L472.5 259.3L457 259.2L457.1 261.7L461.8 262.2L461.5 263.7L459.9 263.3L455.5 264L455.4 266.9L458.9 268.4L460.2 270.7L460 272.5L456.4 283.6L452.4 281.5L450.1 281.4L455.2 277.2L449.1 275.3L444.3 275.7L441.5 275L437.1 276.1L431.2 275.5L426.5 271.3L422.8 270.2L420.2 268.3L415 266.4L412.8 266.8ZM352.4 232.6L348.1 231.7L346.5 230.9L347.4 230.1L347.1 229.2L344.9 228.3L341.8 227.4L339 226.9L338.5 225.7L336.4 225L336.9 226.2L335.4 227.2L333.5 226L331 225.6L329.9 224.8L329.9 223.5L331 222.2L328.7 221.6L330.6 220.8L331.8 220.3L337 221.4L338.8 220.9L341.4 221.2L342.7 222.1L345 222.3L346.9 221.5L349 223.7L352 225.4L355.8 227.1L352.7 227.5L352.7 229.1L354.4 229.8L353.2 230.2L353.5 231L352.8 231.8L352.4 232.6ZM373.6 280L377.8 277L376.1 275.2L373.1 277.1L368.3 275.3L369.9 274.1L368.6 270.5L371.4 269.8L372.8 267.3L375.9 264.7L375.3 263L379.7 262.2L385.1 260.6L393.1 262.9L394.6 262.8L396.5 264.6L403.3 265.1L405.5 264.5L409.4 265.8L412.8 266.8L413.9 269.9L411.5 272.5L402.8 276.8L393.2 278.4L388.3 281.9L386.8 284.7L382.3 286.3L379 284.3L375.8 283.8L372.5 284.2L372.3 282.7L374.6 281.7L373.6 280ZM295.7 209.8L291.6 209.1L286.7 209L283 208.2L278.7 206.5L278.9 205.2L279.9 204.2L278.7 203.5L282.6 200L292.8 200L293 198.6L291.7 198.3L290.8 197.4L287.9 196.4L284.9 195L288.5 195L288.5 192.6L295.9 192.6L303.3 192.6L303.2 196L302.6 200.8L305 200.8L307.6 201.5L308.2 200.9L310.6 201.5L307 203.1L303.2 204.2L302.6 205L303.3 205.9L301.6 206.9L299.7 207.2L300.2 207.7L298.7 208.2L295.9 209.2L295.7 209.8ZM594.4 256L591.3 257.5L587.5 257.8L586.4 256.7L584.6 256.5L582.2 257.6L578.7 256.8L580.7 255L581.4 253.2L582.8 251.4L579.7 249L579.1 246.2L583.2 242.7L585.9 243.2L591.8 244.2L600.2 247.6L601.5 249.3L596.8 253L594.4 256ZM537.1 232.1L542.3 233.6L547.2 236.2L547.4 238.3L550.4 238.4L554.7 240.4L557.8 241.9L556.6 245.5L551.7 246.6L552.2 247.6L550.7 249.7L554.2 252.6L556.8 252.6L557.8 254.9L562.7 258.4L560.7 258.6L556.3 258.2L553.8 259.3L550.2 260L547.6 260.2L546.8 261L542.9 260.8L538 258.9L537.4 257L535.3 255L536.6 251.5L538.8 250.1L537 248.2L534.3 247.6L535.3 245.8L533.4 244.8L529.3 245L523.9 241.9L526.1 240.8L525.9 238.9L530.8 238.2L532.8 237.5L530.1 236L530.8 234.5L537.1 232.1ZM317.8 213L316.4 211.7L314 211.3L314.6 209.6L313.5 209.2L311.9 208.9L308.4 209.4L308.1 208.8L305.7 208.1L304 207.3L301.6 206.9L303.3 205.9L302.6 205L303.2 204.2L307 203.1L310.6 201.5L311.4 201.6L313.2 200.9L315.4 200.8L316.2 201.2L317.4 200.9L321.1 201.3L324.8 201.2L327.3 200.8L328.3 200.3L330.8 200.5L332.7 200.8L334.8 200.7L336.4 200.3L340 200.9L341.3 201L343.7 201.8L346 202.7L348.9 203.4L351 204.5L348.3 204.4L347.2 205L344.4 205.6L342.4 205.6L340.6 206.1L339 205.9L337.7 205.3L336.8 205.4L335.8 206.4L335.1 206.4L334.9 207.2L332.1 208.4L330.7 208.9L329.9 209.4L327.5 208.6L325.8 209.7L324.1 209.6L322.3 209.7L322.4 211.8L321.3 211.8L320.3 212.8L317.8 213ZM239.7 157.3L236.6 161.3L235.2 164.5L234.6 170.4L233.8 172.6L235.2 175L237.7 177.1L239.3 180.5L244.5 183.7L246.4 186.1L249.5 188.3L258 189.4L261.3 191.2L268.2 190L274.3 189.6L280.3 188.8L285.3 188.1L290.3 186.3L292.2 183.8L292.9 180.1L294.2 178.9L299.6 177.7L308 176.7L315.1 176.9L319.9 176.5L321.8 177.4L321.6 179.5L317.3 182.1L315.4 184.7L316.9 185.5L315.7 187.3L313.7 190.7L311.7 189.6L310 189.7L308.5 189.7L305.6 192.3L304.2 191.8L303.2 192L303.3 192.6L295.9 192.6L288.5 192.6L288.5 195L284.9 195L287.9 196.4L290.8 197.4L291.7 198.3L293 198.6L292.8 200L282.6 200L278.7 203.5L279.9 204.2L278.9 205.2L278.7 206.5L269.7 201.9L265.6 200.6L259.1 199.5L254.7 199.8L248.3 201.3L244.3 201.8L238.7 200.7L232.7 199.8L225.3 197.9L219.3 197.3L210.3 195.3L203.6 193.3L201.6 192.2L197.2 191.9L189 190.6L185.7 188.6L177.2 186.2L173.2 183.4L171.3 181.3L174 180.9L173.1 179.7L175 178.5L175 177L172.3 175.1L171.6 173.3L168.9 171.1L161.9 166.7L153.9 163.2L150.1 160.4L143.2 158.6L141.8 157.5L143 154.7L138.9 153.6L134.2 151.4L132.2 148.2L128 147.9L123.3 145.4L119.6 143.2L119.3 141.7L115 138.2L112.2 134.6L112.3 132.8L106.5 130.9L103.9 131.1L99.3 129.8L98.1 131.7L99.4 134L100.2 137.5L102.9 139.5L108.8 142.7L110.1 143.8L111.3 144.1L112.4 145.7L113.8 145.6L115.4 148.6L117.8 149.8L119.5 151.4L124.5 153.7L127.1 157.9L129.5 159.9L131.7 162L132.1 164.4L136 164.5L139.2 166.5L142 168.5L141.8 169.3L138.5 170.9L137.1 170.9L135 168.2L129.8 165.7L124 163.5L120 162.4L120.2 159.1L119 156.7L115.2 155.3L109.8 153.2L108.7 153.8L106.7 152.6L101.8 151.5L97.1 148.9L97.7 148.5L101 148.8L103.9 147.1L104.2 145L98.1 141.7L93.4 140.4L90.5 137.5L87.5 134.4L83.9 130.6L80.6 126.3L89.7 125.9L99.8 125.4L99 126.3L111 128.6L129.2 132L145 132L151.3 132L151.3 130L165.1 130L168 131.7L172.1 133.2L176.8 135.3L179.5 137.7L181.4 140.3L185.6 141.7L192.2 143.1L197.2 139.4L203.7 139.3L209.3 141.2L213.3 144.4L216 147.1L220.7 149.7L222.5 152.9L224.7 155L230.9 156.4L236.6 157.4L239.7 157.3ZM330.6 220.8L327.8 219.5L324.1 217.9L322.4 216.5L319 215.1L315 213.3L315.9 212.6L317.2 213.3L317.8 213L320.3 212.8L321.3 211.8L322.4 211.8L322.3 209.7L324.1 209.6L325.8 209.7L327.5 208.6L329.9 209.4L330.7 208.9L332.1 208.4L334.9 207.2L335.1 206.4L335.8 206.4L336.8 205.4L337.7 205.3L339 205.9L340.6 206.1L342.4 205.6L344.4 205.6L347.2 205L348.3 204.4L351 204.5L350.3 204.9L349.9 205.9L350.7 207.4L348.9 208.8L348 210.5L347.8 212.4L348.2 213.4L348.4 215.3L347.2 215.7L346.4 217.5L347 218.6L345.3 219.7L345.7 220.8L346.9 221.5L345 222.3L342.7 222.1L341.4 221.2L338.8 220.9L337 221.4L331.8 220.3L330.6 220.8ZM392.9 236.7L390.2 235.6L388.5 233.3L390.5 232.2L388.5 232L387 230.6L383 229.5L379.5 229.7L377.9 231.2L374.7 232.2L373 232.3L372.2 233.2L376 235.4L373.8 235.9L372.7 236.5L369 236.8L367.6 234.3L366.6 235L363.9 234.8L362.3 233.1L359.1 232.8L357 232.4L353.6 232.4L353.3 233.3L352.4 232.6L352.8 231.8L353.5 231L353.2 230.2L354.4 229.8L352.7 229.1L352.7 227.5L355.8 227.1L358.6 228.6L358.5 229.5L361.6 229.7L362.4 229.3L364.6 230.3L368.5 230L371.9 229L376.7 228.2L379.4 226.9L383.8 227.2L383.5 227.6L387.9 227.7L391.5 228.4L394.1 229.7L397.1 230.8L396.1 231.4L398 233.8L396.5 235L393.9 234.7L392.9 236.7ZM458.8 338.7L456.7 340.9L452.6 342L444.6 339.6L444 337.8L428.2 333.5L413.9 328.9L407.8 326.3L404.5 322.9L405.8 321.7L399 316.2L391.2 308.6L383.7 300.4L380.4 298.5L377.9 295.5L371.7 292.8L366.1 291.1L368.7 289.3L364.8 285.4L367.3 282.6L373.6 280L374.6 281.7L372.3 282.7L372.5 284.2L375.8 283.8L379 284.3L382.3 286.3L386.8 284.7L388.3 281.9L393.2 278.4L402.8 276.8L411.5 272.5L413.9 269.9L412.8 266.8L415 266.4L420.2 268.3L422.8 270.2L426.5 271.3L431.2 275.5L437.1 276.1L441.5 275L444.3 275.7L449.1 275.3L455.2 277.2L450.1 281.4L452.4 281.5L456.4 283.6L449.3 283.5L448.2 284.1L441.7 284.8L432.6 287.6L432 289.5L430 290.9L430.8 293.2L426 294.3L426 296.1L423.9 296.8L427.2 300.5L431.6 303L429.9 304.8L435.2 305L438.2 307.2L445.2 307.3L451.7 304.9L451.2 311.2L454.8 311.6L459.3 310.9L466.2 317.6L464.5 319L464.1 322L463.9 325.5L460.8 327.6L462.3 329.2L460.4 330.6L463.9 334.1L458.8 338.7ZM513.8 358.9L516.9 353.7L517.1 351.3L520.9 347.5L534.8 346.3L542.2 346.3L549.6 348.5L549.7 349.9L552.1 352.3L551.6 358.2L560 359.1L563.2 358.2L568.6 359.4L570.1 360.7L570.8 364.7L571.7 366.5L574.7 366.7L577.7 365.9L580.5 366.7L580.5 369.2L579.5 371.8L577.9 374.4L576.6 378.4L569.4 381.9L563.1 382.7L554.2 382L546.1 380.7L554 373.8L552.8 371.8L544.6 370.1L534.9 366.8L528.4 366.1L513.8 358.9ZM314 211.3L313.1 212.3L308.5 212.2L305.7 211.8L302.4 211L298 210.7L295.7 209.8L295.9 209.2L298.7 208.2L300.2 207.7L299.7 207.2L301.6 206.9L304 207.3L305.7 208.1L308.1 208.8L308.4 209.4L311.9 208.9L313.5 209.2L314.6 209.6L314 211.3ZM557.8 241.9L567.4 242.7L568.2 241.9L574.7 241.6L583.2 242.7L579.1 246.2L579.7 249L582.8 251.4L581.4 253.2L580.7 255.1L578.7 256.8L574.1 255.9L570.4 256.3L567.2 256L566.4 257.1L567.7 257.9L567 258.8L562.7 258.4L557.8 254.9L556.8 252.6L554.2 252.6L550.7 249.7L552.2 247.6L551.7 246.6L556.6 245.5L557.8 241.9ZM554 395L559.2 394.5L567.2 398.2L570.1 398L578.3 401.1L584.6 403.7L589.2 407L585.7 409.3L587.9 412.1L584.4 415.1L575.4 417.9L569.6 416.9L565.3 417.4L557.9 415.3L552.5 415.5L547.7 412.7L548.3 409.6L550 408.5L549.9 403.7L552 398.8L554 395ZM258.1 34.8L259.5 38.2L262 39.2L267.6 39.6L275.7 40.6L283.4 42.4L289.9 41.7L299.6 43.2L302.2 43.2L309.4 41.5L316.8 43.7L324.6 46L331.1 48L337.2 49.9L338 51.5L339.9 52L339.4 52.6L341.5 52.8L343.1 52.2L343.5 53.6L345.1 54.5L347.3 54.5L348.4 55.2L347.4 56.3L355.7 59L357.4 64.2L359 69.1L356.7 72.4L352.9 75.5L351.2 77.4L351 78L351.9 78.7L354.6 79.6L356.6 79.6L365.9 76.7L374.1 75.8L384.5 73.1L384.6 72.5L383.9 70.8L382.6 69.7L386.2 68.8L394 68.8L401.3 68.8L403.9 66.6L404.9 66.2L413.3 62.1L416.9 61L428.9 61L443.6 61L444.4 59.5L447 59.3L450.3 58.4L453.2 55.7L455.6 51.1L461.7 46.6L464.3 48.2L469.6 47.2L473.2 48.9L473.2 56.9L478.4 60.2L479.7 62.1L471.2 64.9L463.1 66.8L454.7 68.5L450.4 71.8L449.1 73.1L449 76L451.6 78.9L454.9 79L454.1 77L456.5 78.2L455.9 79.8L450.5 80.7L446.7 80.6L440.8 81.5L437.3 81.8L432.7 82.1L426.1 83.6L437.8 82.6L440.1 83.6L429 85.2L423.9 85.2L424.1 84.6L421.7 86.1L424.1 86.3L422.3 90.1L416.5 94.2L416 92.8L414.2 92.5L411.6 91.2L413.3 94.1L415.2 95L415.4 97L412.8 99L408.3 103.1L407.6 102.9L410.1 99.4L406 97.4L405.1 93.1L403.5 95.3L405.2 98.6L400 97.8L405.4 99.5L405.8 104.3L408.1 104.7L408.9 106.4L410 111.5L405 115.2L396.7 116.6L391.5 119.5L387.5 119.8L383.5 121.6L382.4 123.2L373.6 126.4L369.1 128.7L365.4 131.5L364.2 134.9L365.6 138.1L368.2 142.1L371.8 145.4L371.8 147.4L375.6 152.7L375.3 155.8L375 157.5L373 160.3L370.6 160.9L366.7 160.3L365.4 158.3L362.4 157.3L358.2 153.4L354.5 149.9L353.3 148.1L354.9 145.1L352.7 142.5L346.5 138.6L343.4 137.9L335.4 140L334 139.8L330.1 137.6L325.1 136.4L316.1 137L309 136.5L303 136.8L299.7 137.6L301.1 138.8L301 140.7L302.7 141.6L301.2 142.2L298.2 141.5L295.2 142.4L289.5 142.3L283.5 139.8L276.6 140.4L270.8 139.3L265.8 139.6L259.1 140.7L251.9 144.2L244 146.2L239.7 148.4L237.8 150.4L237.7 153.6L238.1 155.8L239.7 157.3L236.6 157.4L230.9 156.4L224.7 155L222.5 152.9L220.7 149.7L216 147.1L213.3 144.4L209.3 141.2L203.7 139.3L197.2 139.4L192.2 143.1L185.6 141.7L181.4 140.3L179.5 137.7L176.8 135.3L172.1 133.2L168 131.7L165.1 130L151.3 130L151.3 132L145 132L129.2 132L111 128.6L99 126.3L99.8 125.4L89.7 125.9L80.6 126.3L79.3 123.8L74.1 121L70.4 120.4L69.6 119L65.1 118.8L62.2 117.4L54.9 116.9L52.8 116.1L51.9 113.4L44.1 108.4L37.5 101.3L37.8 100.2L34.3 98.5L28.1 94.1L27 89.8L22.8 86.9L24.5 82.5L24.3 77.8L21.7 73.6L24.8 68.4L25.8 63.2L26.8 58L25.3 50.1L22.8 45L20.5 42.2L21.5 41L33 43.1L37.2 48.7L39.2 47.2L37.9 42.2L35.2 37.2L57.8 37.2L81.4 37.2L89.2 37.2L113.5 37.2L136.9 37.2L160.8 37.2L184.7 37.2L211.7 37.2L238.9 37.2L255.4 37.2L255.4 34.8L258.1 34.8ZM445 218L444.8 219L440.1 219.4L442.7 221.3L442.6 223.5L439.1 225.9L442.1 229.2L445.5 228.9L447.3 225.9L444.8 224.5L444.4 221.3L454.3 219.6L453.2 217.7L456 216.4L458.9 219.3L464.5 219.4L469.6 221.7L470 223L477.1 223.1L485.6 222.7L490.1 224.5L496.2 225L500.7 223.7L500.8 222.7L510.6 222.4L520.2 222.4L513.4 223.6L516.1 225.5L522.5 225.9L528.5 227.9L529.8 231.2L533.9 231.1L537.1 232.1L530.8 234.5L530.1 236L532.8 237.5L530.8 238.2L525.9 238.9L526.1 240.8L523.9 241.9L529.3 245L530.4 246.2L527.5 247.7L518.6 249.2L512.8 249.9L510.5 250.8L504.2 249.8L498.3 249.3L496.8 249.7L500.4 250.7L500.1 253.5L501.2 256L507.9 256.4L508.3 257.2L502.7 258.4L501.7 260.1L498.5 260.8L492.5 261.7L491 263L484.8 263.2L480.4 261.1L478 257L475.9 255.6L473 254.7L477 252.7L476.8 251.8L474.5 250.6L472.9 247.8L473.5 244.9L475.3 243.6L476.7 241.4L473.9 240.7L469.4 241.1L463.7 240.9L460.4 241.3L454.8 237.8L450.2 237.3L440 237.7L438.1 236.3L436.1 235.9L435.9 235.1L436.8 233.5L436.2 231.9L434.4 231L433.4 229.1L429.3 228.8L431.5 226.4L432.5 223.5L434.8 221.9L437.9 220.7L439.9 218.7L445 218Z",
    "honduras": "M317.8 213L316.4 211.7L314 211.3L314.6 209.6L313.5 209.2L311.9 208.9L308.4 209.4L308.1 208.8L305.7 208.1L304 207.3L301.6 206.9L303.3 205.9L302.6 205L303.2 204.2L307 203.1L310.6 201.5L311.4 201.6L313.2 200.9L315.4 200.8L316.2 201.2L317.4 200.9L321.1 201.3L324.8 201.2L327.3 200.8L328.3 200.3L330.8 200.5L332.7 200.8L334.8 200.7L336.4 200.3L340 200.9L341.3 201L343.7 201.8L346 202.7L348.9 203.4L351 204.5L348.3 204.4L347.2 205L344.4 205.6L342.4 205.6L340.6 206.1L339 205.9L337.7 205.3L336.8 205.4L335.8 206.4L335.1 206.4L334.9 207.2L332.1 208.4L330.7 208.9L329.9 209.4L327.5 208.6L325.8 209.7L324.1 209.6L322.3 209.7L322.4 211.8L321.3 211.8L320.3 212.8L317.8 213Z",
    "elSalvador": "M314 211.3L313.1 212.3L308.5 212.2L305.7 211.8L302.4 211L298 210.7L295.7 209.8L295.9 209.2L298.7 208.2L300.2 207.7L299.7 207.2L301.6 206.9L304 207.3L305.7 208.1L308.1 208.8L308.4 209.4L311.9 208.9L313.5 209.2L314.6 209.6L314 211.3Z",
    "argentina": "M491.4 536.2L483.8 536.6L479.8 534.1L475 533.9L466.5 533.9L466.5 518.6L469.5 521.7L473.5 526.8L483.8 531L495 532.7L491.4 536.2ZM495.6 358.2L500.3 361.3L503.4 357.8L512.5 358L513.8 358.9L528.4 366.1L534.9 366.8L544.6 370.1L552.8 371.8L554 373.8L546.1 380.7L554.2 382L563.1 382.7L569.4 381.9L576.6 378.4L577.9 374.4L581.8 373.6L585.8 376.2L585.7 379.8L579 382.3L573.6 384.2L564.7 388.7L554 395L552 398.8L549.9 403.7L550 408.5L548.3 409.6L547.7 412.7L547.1 415.3L557.2 419.6L556.1 423L561.1 425.2L560.7 427.7L553.1 434.2L541.3 437L525.3 438.1L516.6 437.6L518.2 440.7L516.6 444.7L518.1 447.3L513.3 449.2L505.1 450L497.5 448L494.4 449.4L495.5 454.8L500.9 456.5L505.3 454.7L507.6 457.6L500.3 459.3L493.9 462.8L492.7 468.5L490.9 471.5L483.3 471.5L477.1 474.5L474.8 478.9L482.7 483.2L490.3 484.4L487.5 489.8L478.1 493.3L473 500.6L465.7 503.1L462.4 506.1L465 512.8L470.3 516.6L466.9 516.3L459.6 515.3L440.3 514.4L437 510.6L437.2 505.7L431.9 506.1L429.1 503.8L428.4 497.1L434.5 494.4L437 490.5L436.1 487.4L440.3 482.3L443.2 474.6L442.4 471.2L445.9 470.1L445 467.9L441.3 466.8L443.9 464.4L440.3 462.3L438.5 455.9L441.7 454.8L440.3 448.2L442.2 442.7L444.3 438L449.1 436.1L446.7 431.1L446.7 426.4L452.7 423.1L452.5 419L457 414.1L457.1 409.6L455 408.8L451.3 400.5L456.2 395.6L455.5 391.1L458.3 386.8L463.5 382.5L469.1 379.7L466.8 377.9L468.4 376.4L468.2 369L476.8 366.8L479.6 362.2L478.6 361.1L485.2 357.1L495.6 358.2Z",
    "chile": "M466.5 518.6L466.5 533.9L475 533.9L479.8 534.1L477.1 537L470.3 539.2L466.4 539L461.7 538.4L455.9 536.2L447.6 535.2L437.6 531.3L429.4 527.5L418.5 519.9L425 521.3L436.2 525.9L446.8 528.3L450.9 525.2L453.5 520.5L460.8 517.8L466.5 518.6ZM469.7 355.6L472.9 361.7L478.6 361.1L479.6 362.2L476.8 366.8L468.2 369L468.4 376.4L466.8 377.9L469.1 379.7L463.5 382.5L458.3 386.8L455.5 391.1L456.2 395.6L451.3 400.5L455 408.8L457.1 409.6L457 414.1L452.5 419L452.7 423.1L446.7 426.4L446.7 431.1L449.1 436.1L444.3 438L442.2 442.7L440.3 448.2L441.7 454.8L438.5 455.9L440.3 462.3L443.9 464.4L441.3 466.8L445 467.9L445.9 470.1L442.4 471.2L443.2 474.6L440.3 482.3L436.1 487.4L437 490.5L434.5 494.4L428.4 497.1L429.1 503.8L431.9 506.1L437.2 505.7L437 510.6L440.3 514.4L459.6 515.3L466.9 516.3L459.9 516.3L456 517.9L448.9 520.3L447.6 526.7L444.2 526.8L435.2 524.6L426.1 519.9L426.1 519.9L416.2 516.1L413.7 511.9L416 508.1L412 503.8L411 493.1L414.3 487.3L422.8 482.7L410.7 480.9L418.3 475.7L421 466.2L429.8 468.2L434 456.6L428.6 455.2L426.1 462.1L421.1 461.3L423.6 453.4L426.3 443.4L430 439.8L427.7 434.7L427 429L430.4 428.8L435.3 420.7L440.8 412.7L444.1 405.5L442.3 398.4L444.7 394.5L443.7 388.7L448.4 383.1L449.8 374.3L452.4 365L454.9 355.2L454.3 348.1L452.6 342L456.7 340.9L458.8 338.7L462.7 341.6L463.8 344.7L468 346.5L465.5 350.7L469.7 355.6Z"
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

const PRESENCE_COUNTRY_PATH_KEYS = {
    honduras: 'honduras',
    'el-salvador': 'elSalvador',
    argentina: 'argentina',
    chile: 'chile'
};

function renderPresenceCountry(country = {}) {
    const point = PRESENCE_COUNTRY_POINTS[country.id];
    const pathKey = PRESENCE_COUNTRY_PATH_KEYS[country.id];
    const path = PRESENCE_MAP_PATHS[pathKey];

    if (!point || !path) return '';

    const targetRadius = country.id === 'honduras' || country.id === 'el-salvador' ? 14 : 22;

    return `
                    <g class="presence-country presence-country--${country.id}" role="button" tabindex="0" data-country-id="${country.id}" aria-label="Ver información de ${country.name}">
                        <path d="${path}"/>
                        <circle class="presence-country__target" cx="${point.x}" cy="${point.y}" r="${targetRadius}"/>
                        <circle class="presence-country__pin" cx="${point.x}" cy="${point.y}" r="5"/>
                        <text x="${point.labelX}" y="${point.labelY}">${country.name}</text>
                    </g>`;
}

function renderPresenceMap(displayCategory = '') {
    const mapMount = document.getElementById('section-world-map');
    if (!mapMount) return;

    if (displayCategory !== 'Presencia en el Mundo') {
        mapMount.hidden = true;
        mapMount.innerHTML = '';
        return;
    }

    mapMount.hidden = false;
    mapMount.innerHTML = `
        <section class="presence-map" aria-labelledby="presence-map-title">
            <header class="presence-map__header">
                <p class="section-kicker">Mapa interactivo</p>
                <h2 id="presence-map-title">Países donde están las Siervas</h2>
            </header>
            <div class="presence-map__canvas" aria-label="Mapa interactivo de presencia de las Siervas">
                <div class="presence-map__viewport" tabindex="0" aria-label="Desplazar mapa de presencia">
                <svg class="presence-map__svg" viewBox="0 0 760 560" role="img" aria-labelledby="presence-map-svg-title presence-map-svg-desc">
                    <title id="presence-map-svg-title">Mapa de presencia en América</title>
                    <desc id="presence-map-svg-desc">Mapa geográfico de América con Honduras, El Salvador, Argentina y Chile destacados.</desc>
                    <defs>
                        <filter id="presence-shadow" x="-10%" y="-10%" width="120%" height="120%">
                            <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f2538" flood-opacity="0.18"/>
                        </filter>
                    </defs>
                    <rect class="presence-map__ocean" width="760" height="560"/>
                    <path class="presence-map__graticule" d="M80 0V560M210 0V560M340 0V560M470 0V560M600 0V560M730 0V560M0 92H760M0 188H760M0 284H760M0 380H760M0 476H760"/>
                    <path class="presence-map__land" d="${PRESENCE_MAP_PATHS.land}"/>
${PRESENCE_COUNTRIES.map((country) => renderPresenceCountry(country)).join('')}
                </svg>
                </div>

                <aside class="presence-dialog" aria-live="polite" aria-labelledby="presence-dialog-title" hidden>
                    <p class="presence-dialog__eyebrow">País selecciónado</p>
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
        const point = PRESENCE_COUNTRY_POINTS[countryId];
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
            const pinX = (point.x / 760) * canvasRect.width;
            const pinY = (point.y / 560) * canvasRect.height;
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
        if (note) note.textContent = country.note;
        positionDialog(country.id);
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

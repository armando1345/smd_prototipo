# SMD | Si Mi Dios

Sitio web estático preparado para publicarse de forma sencilla en GitHub Pages.

## Estructura

- `index.html`: página principal.
- `styles.css`: estilos globales.
- `app.js`: interacciones del sitio, secciones y artículos.
- `about.html`, `article.html`, `section.html`, `contacto.html`, `etica.html`, `privacidad.html`, `premium.html`: páginas internas.
- `*.jpg`: imágenes locales optimizadas, ubicadas en la raíz del proyecto.
- `.nojekyll`: evita que GitHub Pages procese el sitio con Jekyll.

## Imágenes

Las imágenes pesadas se sustituyeron por versiones JPG optimizadas. Las fotografías de comunidades se conservan en `assets/galerias`, organizadas por país y comunidad.

El recorrido del templo conserva las secuencias de cuadros y reliquias en `assets/santuario/rotacion`. Se recuperaron de los GIF originales publicados (aunque tenían extensión `.jpg`) en https://armando1345.github.io/smd_prototipo/santuario-recorrido.html. Cada secuencia empieza con la nueva fotografía frontal de septiembre de 2026 y continúa en el orden original cada seis segundos. `santuario.js` controla la rotación, la pausa y la navegación manual.

El logo sigue cargando desde Cloudinary. Las imágenes editoriales están incluidas localmente junto a `index.html` y las galerías en `assets/galerias`, para que GitHub Pages pueda servirlas sin configuración adicional.

## Publicación en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos los archivos de esta carpeta a la raíz del repositorio.
3. En GitHub, entra en `Settings > Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Elige la rama `main` o `master`, según el nombre de tu rama.
6. Selecciona la carpeta `/root` y guarda los cambios.

GitHub Pages publicará el sitio como una página estática. No hace falta instalar dependencias ni ejecutar un proceso de compilación.

## Revisión local

Puedes abrir `index.html` directamente en el navegador para una revisión rápida. Si prefieres probarlo con un servidor local, sirve esta carpeta como sitio estático y abre la página principal.

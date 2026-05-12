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

Las imágenes pesadas se sustituyeron por versiones JPG optimizadas. No es necesario subir archivos PNG antiguos ni una carpeta `assets` duplicada.

El logo sigue cargando desde Cloudinary. Las imágenes de contenido están incluidas localmente junto a `index.html`, para que GitHub Pages pueda servirlas sin configuración adicional.

## Publicación en GitHub Pages

1. Crea un repositorio en GitHub.
2. Sube todos los archivos de esta carpeta a la raíz del repositorio.
3. En GitHub, entra en `Settings > Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Elige la rama `main` o `master`, según el nombre de tu rama.
6. Selecciona la carpeta `/ (root)` y guarda los cambios.

GitHub Pages publicará el sitio como una página estática. No hace falta instalar dependencias ni ejecutar un proceso de compilación.

## Revisión local

Puedes abrir `index.html` directamente en el navegador para una revisión rápida. Si prefieres probarlo con un servidor local, sirve esta carpeta como sitio estático y abre la página principal.

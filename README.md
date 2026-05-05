# SMD | Si Mi Dios

Sitio web estatico listo para publicar en GitHub Pages desde la interfaz web de GitHub.

## Estructura

- `index.html`: pagina principal.
- `styles.css`: estilos globales.
- `app.js`: interacciones del sitio, secciones y articulos.
- `*-web.jpg`: imagenes locales optimizadas para GitHub Pages, colocadas en la raiz para poder subirlas como archivos sueltos.
- `about.html`, `article.html`, `section.html`, `contacto.html`, `etica.html`, `privacidad.html`, `premium.html`: paginas internas.

## Publicacion en GitHub Pages

1. Sube todos los archivos de esta carpeta a la raiz del repositorio, incluyendo los archivos `*-web.jpg`.
2. En GitHub, ve a `Settings > Pages`.
3. En `Build and deployment`, selecciona `Deploy from a branch`.
4. Elige la rama `main` y la carpeta `/root`.
5. Guarda los cambios y espera a que GitHub Pages publique el sitio.

El logo se mantiene cargando desde Cloudinary. Las imagenes de contenido estan comprimidas e incluidas localmente en la misma raiz que `index.html`.

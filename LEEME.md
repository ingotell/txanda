# Txanda · publicar en GitHub Pages

Archivos de esta carpeta (los cuatro tienen que ir juntos, sin subcarpetas):

- `index.html` — la aplicación entera
- `manifest.json` — lo que hace que se instale como app
- `sw.js` — la caché para que funcione sin cobertura
- `icon-192.png` / `icon-512.png` — el icono de la pantalla de inicio

## Publicar (desde el navegador, sin instalar nada)

1. Entra en github.com con tu cuenta.
2. Botón **+** arriba a la derecha → **New repository**.
3. Nombre: `txanda`. Visibilidad: **Public** (Pages gratuito solo funciona en repos públicos).
   Marca **Add a README file** y crea el repositorio.
4. Dentro del repo: **Add file** → **Upload files**. Arrastra los cinco archivos.
   Importante: sueltos, no dentro de una carpeta.
5. Abajo, **Commit changes**.
6. Pestaña **Settings** → menú lateral **Pages**.
7. En *Source* elige **Deploy from a branch**. Branch: `main`, carpeta `/ (root)`. **Save**.
8. Espera 1-2 minutos y recarga esa misma página: aparecerá el enlace publicado.

La dirección será:

    https://TU-USUARIO.github.io/txanda/

## Actualizar más adelante

Repite el paso 4 subiendo el `index.html` nuevo y marca *replace*. Sube también `sw.js`
cambiando `txanda-v1` por `txanda-v2` en la primera línea: eso obliga a los móviles a
descargar la versión nueva en vez de servir la vieja de la caché.

## Aviso

El repositorio es público: cualquiera con la dirección puede verlo. Aquí solo hay nombres
de pila y fechas, nada de teléfonos, direcciones ni datos médicos. Si en algún momento se
añade información sensible, hay que cambiar de sistema (Pages no permite repos privados en
el plan gratuito).

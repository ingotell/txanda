# txanda

Calendario de turnos 2026. Aplicación web estática (PWA), sin servidor ni base de datos: todo se guarda en el propio navegador del dispositivo.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | La aplicación completa (interfaz, datos y lógica) |
| `sw.js` | Service worker: funcionamiento sin cobertura y avisos |
| `manifest.json` | Permite instalarla en la pantalla de inicio |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Iconos de la aplicación |

Los seis archivos deben estar juntos en la misma carpeta.

## Publicación

Se sirve con GitHub Pages desde la rama `main`, carpeta raíz (`/`).

Ajustes → Pages → Build and deployment → Source: `Deploy from a branch`, rama `main`, carpeta `/ (root)`.

## Actualizar la aplicación

Al subir una versión nueva de `index.html`, hay que **subir también `sw.js` cambiando el número de versión** de la primera línea:

```js
const VERSION = 'txanda-v1';   // -> 'txanda-v2', 'txanda-v3'...
```

Sin ese cambio, los dispositivos que ya tengan la app instalada pueden seguir mostrando la versión anterior guardada en caché.

## Notas de uso

- Conviene **instalar la app** en la pantalla de inicio, no dejarla como pestaña del navegador. En iPhone, Safari borra los datos de las webs no instaladas tras unos días sin uso, y con ellos se perderían los cambios de turnos guardados.
- Los cambios de turno se comparten entre dispositivos mediante los códigos `TX1.…` que genera la propia app.
- El botón **Exportar** de la pantalla de avisos guarda una copia de seguridad de los cambios.

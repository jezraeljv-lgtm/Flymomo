# Simulador FlyMomo DJI Agras · versión DTS para la expo

Esta carpeta es el simulador **tal como corre hoy en la pantalla de la expo de
DTS** (tableta Sunmi de 27", vertical, sin internet). Sobre esta versión es
donde se sigue mejorando. Cuando tengas una versión nueva, regresa **la carpeta
completa** (o un .zip de ella) con la misma estructura.

## Qué hay aquí

| Archivo / carpeta | Qué es | ¿Se edita? |
|---|---|---|
| `index.html` | El simulador (Three.js, física, escena, control DJI, todo su JS). | Sí |
| `surco/surco.css`, `surco/surco.js` | La capa de diseño de DTS (selector, piezas sobre el vuelo, panel, ventanas, avisos). | Sí, con cuidado (ver abajo) |
| `img/` | Imágenes que antes venían en base64 dentro del HTML. | Sí (agregar o reemplazar) |
| `fuentes/` | Letras de la marca (Archivo, Plus Jakarta Sans, JetBrains Mono). | No |
| `simulador.json` | Título y subtítulo de la tarjeta en la app. | Opcional |
| `LEEME.md` | Esta guía. | — |

## Cómo verlo en tu computadora

Ábrelo con un servidor local (con doble clic se ve, pero sin las letras de la
marca porque el navegador bloquea fuentes en `file://`):

- VS Code con la extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*, o
- en una terminal dentro de la carpeta: `npx serve .` y abre la dirección que te dé.

Para probar el "¿Sigues ahí?" sin esperar 70 s: abre `index.html?inactivo=8`
(segundos). El puente del control de juego de PC: `index.html?puente=1`.

En Chrome: F12 → modo dispositivo (Ctrl+Shift+M) → tamaño **1080 × 1776**. Ese
es el tamaño real del marco en la expo (la app pone arriba su propia barra con
"Regresar" y "Cancelar" de 144 px). Se usa con el dedo.

## Cómo arranca (importante)

1. Al abrir **no se arma el 3D**: `surco/surco.js` muestra el selector (dron →
   escenario → modo) en HTML puro, con fotos fijas en `img/dron-*.webp`.
2. Al elegir el modo, `surco.js` pone `window.__dtsSurco.dron` con el modelo
   elegido y llama `initFlyMomo3()` **una sola vez**, detrás de la pantalla
   "Preparando tu vuelo". Después aplica escenario, carga y modo con los
   métodos de siempre (`setDroneModel`, `setPayloadType`, `switchCropMap`,
   `cargoSystem.activate`…).
3. Por eso en `index.html` hay 5 puntos marcados con `DTS Surco` que **no deben
   volver a su forma anterior**:
   - no hay arranque automático (`DOMContentLoaded`/`load` → `initFlyMomo3`);
   - no se construye `PreludeManager` (el selector viejo);
   - `AgriDrone3` nace con `window.__dtsSurco.dron` (`this.currentModel = …`);
   - `initBridgeConnection()` solo con `?puente=1` (el puente a 127.0.0.1:8099);
   - `preserveDrawingBuffer: false`.
   Si cambias el arranque, avísanos: al integrarlo, el revisor se detiene y
   dice cuál punto ya no encuentra.

## Qué NO tocar

- **Lo basado en DJI se queda como está** (decisión del dueño): el control DJI
  RC Plus dibujado y TODO lo de su pantalla (barra tipo DJI Pilot, área
  cubierta, minimapa, horizonte, radar redondo, altitud/velocidad/distancia),
  la barra de iconos "30m" de arriba a la derecha, la escena 3D y la física.
- **Los nombres (id y clases) de los que cuelga el diseño**. `surco.js` no
  reescribe tu lógica: lee y "pica" tus elementos ocultos. Si renombras uno,
  esa pieza se queda sin conexión. Los principales: `hud-swath-width`,
  `hud-swath-sub`, `cam-cycle-text`, `btn-camera-cycle`, `btn-resume-mission`,
  `btn-toggle-touch`, `takeoff-countdown-modal`, `countdown-number`,
  `btn-cancel-countdown`, `mp-nozzle-count`, `mp-slider-*`, `mp-btn-crop-*`,
  `input-pilot-name`, `help-modal` (`.help-table`), `credits-modal`
  (`.credits-item`), `version-badge`, `btn-open-credits`, `btn-model-*`,
  `btn-t100-payload-*`, `btn-switch-crop-map`, `.crop-pill-btn`,
  `btn-sidebar-rc-calibrar`, `hud-rc-text`, `btn-mode-dose`, `btn-mode-flow`,
  `slider-target-dose`, `slider-flow-rate`, `disp-flow-rate`,
  `disp-flow-calc-hint`, `toggle-water-color`, `sidebar-control`
  (`.sidebar-sections`), y los métodos `initFlyMomo3`, `startTakeoffCountdown`,
  `handleTakeoffOrRTH`, `savePilotName`, `missionPlanner.startMission`,
  `missionPlanner.recalculate`.
- Lo viejo que la capa reemplaza está **oculto, no borrado** (panel lateral
  original, botones del costado, tarjetas Piloto/Franja, ventanas de ayuda,
  piloto, programar vuelo, créditos, cuenta regresiva y avisos). Si mejoras su
  lógica, se aprovecha; si mejoras solo su aspecto, no se verá.

## Reglas de la pantalla

- **Sin internet**: nada de CDN, Google Fonts ni ligas externas. Todo dentro
  de la carpeta.
- **Sin emojis** en nada visible. Iconos de línea en SVG (retícula 24, trazo 2,
  puntas redondas, `currentColor`); `surco.js` tiene su juego en `IC`.
- **Táctil**: botones de al menos 96 × 96 px, texto de lectura de 22 px o más.
- Colores y letras del lenguaje «Surco» de DTS: fondo tinta `#0F1A12`, lima
  `#7AC244` solo para la acción principal (texto tinta encima), naranja
  `#F26522` solo para atención. Sin degradados, neón ni desenfoques (`blur`).
- No pedir pantalla completa: la app ya ocupa toda la pantalla.
- Rendimiento: la Sunmi es más lenta que una PC. Lo que no se ve no se dibuja.

## Qué hace hoy la capa `surco.js` (por si la tocas)

Selector (P01-P02) con Regresar · "Preparando tu vuelo" y su error con
reintento · tarjetas Piloto y Franja · pestaña Panel · columna: Cambiar vuelo,
cámara, Reanudar, Ayuda, Táctil · botón **Despegar** en pantalla mientras el
dron está en tierra · panel Ajustes (con "Más ajustes" = tu panel original) ·
hojas de piloto, Programa tu vuelo, Cómo volar y Créditos · cuenta regresiva ·
avisos (envuelve `showHUDAlert`) · **¿Sigues ahí?** a los 70 s sin tocar
(pausa el dibujo; a los 90 s regresa al inicio) · el nombre del piloto se
borra para cada visitante nuevo.

## Al regresarla

Manda la carpeta completa con un resumen de qué cambiaste. En DTS se integra
con `npm run simulador -- "<carpeta>"`, que revisa los 5 puntos de arranque,
saca imágenes en base64 a `img/`, y avisa si falta alguna pieza de la lista,
si algo pide internet o si hay emojis.

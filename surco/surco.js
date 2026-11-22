/* ============================================================
   DTS · capa «Surco» del simulador FlyMomo DJI Agras (1.43.00)
   Handoff de Josué "HANDOFF REDISEÑO FLIGHT MOMO" (P01-P11).

   1) ARRANQUE RÁPIDO: al abrir solo se ve el selector (HTML puro, sin 3D).
      El simulador se arma UNA vez, ya con el dron, escenario y modo
      elegidos (P03 "Preparando tu vuelo"); si falla, P03b.
   2) Lo "hecho por IA" se reemplaza por piezas nuevas que llaman a las
      MISMAS funciones del simulador (o pican sus botones ocultos): no se
      reescribe su lógica, su física ni su entorno 3D.
   3) Lo basado en DJI (control RC Plus y su pantalla, barra "30m", escena
      3D) no se toca.
   Sin emojis; iconos de línea del handoff (24 × 24, trazo 2).
   ============================================================ */
(function () {
  'use strict';
  var W = window, D = document;
  W.__dtsSurco = W.__dtsSurco || {};

  // ---------------------------------------------------------- iconos
  var IC = {
    alerta: 'M12 3.5L2.5 20h19zM12 10v4.5M12 17.5v.01',
    avanzar: 'M5 12h14M13 6l6 6-6 6',
    ayuda: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.8-2.5 2.3-2.5 3.8M12 17v.01',
    bateria: 'M3 7h15v10H3zM21 10.5v3M6 10v4',
    candado: 'M5.5 11h13v10h-13zM8.5 11V7.5a3.5 3.5 0 0 1 7 0V11M12 15v2.5',
    casa: 'M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5M10 20v-5h4v5',
    cerrar: 'M6 6l12 12M18 6L6 18',
    config: 'M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1',
    control: 'M7 7.5h10a4.5 4.5 0 0 1 4.5 4.5v.5a4 4 0 0 1-7.2 2.4h-4.6A4 4 0 0 1 2.5 12.5V12A4.5 4.5 0 0 1 7 7.5zM7.5 10v3.5M5.75 11.75h3.5M15.5 11h.01M17.5 13h.01',
    despegar: 'M12 18V7M7 12l5-5 5 5M5 21h14',
    dron: 'M9.5 9.5h5v5h-5zM9.5 9.5L7.8 7.8M14.5 9.5l1.7-1.7M9.5 14.5l-1.7 1.7M14.5 14.5l1.7 1.7M6 3.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5M18 3.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5M6 15.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5M18 15.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5',
    girar: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',
    gota: 'M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z',
    lapiz: 'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4',
    mapa: 'M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5zM9 4v13.5M15 6.5V20',
    mas: 'M12 5v14M5 12h14',
    menos: 'M5 12h14',
    obstaculo: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 7.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 1 0 0-9M12 12l6-6',
    orbita: 'M12 10.5v3M3 12c0 2 4 3.5 9 3.5s9-1.5 9-3.5-4-3.5-9-3.5c-2 0-3.8.2-5.2.7M8.5 6.5L6.8 9.2l3 .7',
    palancas: 'M12 2.6v4M10.6 4l1.4-1.4L13.4 4M12 21.4v-4M10.6 20l1.4 1.4 1.4-1.4M2.6 12h4M4 10.6L2.6 12 4 13.4M21.4 12h-4M20 10.6l1.4 1.4-1.4 1.4M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5',
    palomita: 'M5 12.5l4.5 4.5L19 7.5',
    panel: 'M4 5h16v14H4zM9 5v14M13 10l2.5 2-2.5 2',
    persona: 'M12 4a4 4 0 1 0 0 8a4 4 0 1 0 0-8M4.5 21c1-4 3.8-6 7.5-6s6.5 2 7.5 6',
    proceso: 'M12 3a9 9 0 1 0 9 9',
    reanudar: 'M7 4.5v15L19 12z',
    regresar: 'M19 12H5M11 6l-6 6 6 6',
    retroceso: 'M9 5h11v14H9l-6-7zM12 9.5l5 5M17 9.5l-5 5',
    rociar: 'M12 3v4M8 7h8l-1 3H9zM7.5 14v.01M12 15v.01M16.5 14v.01M9.5 18.5v.01M14.5 18.5v.01',
    siguiente: 'M9 6l6 6-6 6',
    tanque: 'M6 5.5a6 2.5 0 1 0 12 0a6 2.5 0 1 0-12 0M6 5.5v13a6 2.5 0 0 0 12 0v-13',
    tocar: 'M9 11.5V5a1.5 1.5 0 0 1 3 0v5.5M12 9.5a1.5 1.5 0 0 1 3 0v1.5M15 10.5a1.5 1.5 0 0 1 3 0V14c0 4-2.6 7-6.2 7-2.6 0-4-1.2-5.4-3.4L4.2 14a1.5 1.5 0 0 1 2.5-1.7L9 15',
    zoom: 'M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13M15.2 15.2L20 20M10.5 7.5v6M7.5 10.5h6',
    pantalla: 'M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4'
  };
  function ico(n, t, o) {
    o = o || {};
    return '<svg class="' + (o.cls || '') + '" width="' + t + '" height="' + t + '" viewBox="0 0 24 24" fill="none" stroke="' +
      (o.color || 'currentColor') + '" stroke-width="' + (o.trazo || 2) + '" stroke-linecap="round" stroke-linejoin="round"><path d="' + IC[n] + '"/></svg>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(id) { return D.getElementById(id); }
  function nodo(html) { var t = D.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function cuadro() { return new Promise(function (r) { requestAnimationFrame(function () { r(); }); }); }
  function espera(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function pica(id) { var b = typeof id === 'string' ? $(id) : id; if (b) b.click(); return !!b; }
  function app() { return W.app || null; }
  function guardado(k, v) { try { if (v === undefined) return JSON.parse(sessionStorage.getItem(k) || 'null'); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } return null; }
  function seguro(fn) { try { return fn(); } catch (e) { if (W.console) console.warn('[surco]', e); return undefined; } }

  // Sin emojis: se quitan de todo texto que la capa toma del simulador.
  var EMOJI = /(?:[⌀-⏿①-⓿■-◿☀-➿⤀-⥿⬀-⯿㊗㊙️‍⃣]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDC00-\uDFFF])/g;
  var EMOJI1 = new RegExp(EMOJI.source);
  function sinEmoji(s) {
    return String(s == null ? '' : s).replace(/➔|➜|->/g, '→').replace(EMOJI, '')
      .replace(/\s*\[(?:[A-Z]|F11|[A-Z]\d)\]/g, '').replace(/[ \t]{2,}/g, ' ').trim();
  }
  // Algunos textos del archivo original vienen con la codificación rota ("Âµm", "â‰ˆ", "ðŸŒ¿"):
  // se vuelven a leer como UTF-8; si no cuadra, se dejan como estaban.
  var CP1252 = { 0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
    0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92, 0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x02DC: 0x98,
    0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C, 0x017E: 0x9E, 0x0178: 0x9F };
  var DEC = W.TextDecoder ? new TextDecoder('utf-8', { fatal: true }) : null;
  function reparar(v) {
    if (!DEC || !/[ÂÃâð][\u0080-¿ŒœŠšŸŽžƒˆ˜–-›€™]/.test(v)) return v;
    var b = [];
    for (var i = 0; i < v.length; i++) {
      var c = v.charCodeAt(i);
      if (c < 256) b.push(c); else if (CP1252[c]) b.push(CP1252[c]); else return v;
    }
    try { return DEC.decode(new Uint8Array(b)); } catch (e) { return v; }
  }
  function limpiarTexto(raiz) {
    if (!raiz) return;
    var w = D.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      var v = n.nodeValue, r = v && reparar(v);
      if (r !== v) { n.nodeValue = v = r; }
      if (v && (EMOJI1.test(v) || /\[[A-Z]\d?\]|\[F11\]/.test(v))) {
        var l = /^\s/.test(v) ? ' ' : '';
        n.nodeValue = l + sinEmoji(v) + (/\s$/.test(v) ? ' ' : '');
      }
    }
  }
  function vigilarEmojis(raiz) {
    limpiarTexto(raiz);
    var pend = false;
    new MutationObserver(function () {
      if (pend) return; pend = true;
      requestAnimationFrame(function () { pend = false; limpiarTexto(raiz); });
    }).observe(raiz, { childList: true, characterData: true, subtree: true });
  }
  // :active en pantallas táctiles
  D.addEventListener('touchstart', function () {}, { passive: true });

  // ---------------------------------------------------------- datos
  // Del simulador de Josué (selector viejo y su panel).
  var DRONES = [
    { id: 'T25P', tanque: '20 L', rotores: '4 coax.', caudal: '24 L/min' },
    { id: 'T55', tanque: '50 L', rotores: '4 · 62"', caudal: '40 L/min' },
    { id: 'T70P', tanque: '70 L', rotores: '4 coax.', caudal: '40 L/min' },
    { id: 'T100', tanque: '100 L', rotores: '8 coax.', caudal: '40 L/min' }
  ];
  var ESCENARIOS = [
    { id: 'default', nombre: 'Alfalfa forrajera', corto: 'Alfalfa', img: 'img/escenario-alfalfa.jpg' },
    { id: 'nopal', nombre: 'Nopal y maíz', corto: 'Nopal y maíz', img: 'img/escenario-nopal.jpg' },
    { id: 'naranjo', nombre: 'Huerto de naranjos', corto: 'Naranjo', img: 'img/escenario-naranjo.jpg' },
    { id: 'potrero', nombre: 'Potrero', corto: 'Potrero', img: 'img/escenario-potrero.jpg' }
  ];
  var ARTE_AB = '<svg width="200" height="150" viewBox="0 0 80 60" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M20 44C30 40 38 26 60 16" stroke="#7AC244" stroke-width="2" stroke-dasharray="3 4"/>' +
    '<circle cx="18" cy="45" r="7" stroke="#F4F4EF" stroke-width="2"/><circle cx="62" cy="15" r="7" stroke="#7AC244" stroke-width="2"/>' +
    '<path d="M15.6 48l2.4-6 2.4 6M16.5 46h3" stroke="#F4F4EF" stroke-width="1.4"/><path d="M60.3 11.8v6.4h2.4a1.6 1.6 0 0 0 0-3.2h-2.4 2.1a1.6 1.6 0 0 0 0-3.2z" stroke="#7AC244" stroke-width="1.3"/>' +
    '<path d="M40 22v7M34.5 29h11v7h-11z" stroke="#C9D6CC" stroke-width="1.6"/></svg>';
  var ARTE_MAS = '<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#8FA394" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="' + IC.dron + '"/><path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2"/></svg>';
  var ARTE_ARBOL = '<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#8FA394" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c3 0 5.5 2.4 5.5 5.4 0 2.8-2.2 5-5.5 5s-5.5-2.2-5.5-5C6.5 5.4 9 3 12 3zM12 13.4V21M8 21h8M3 21h18"/></svg>';
  var MODOS = [
    { id: 'mission', etiqueta: 'Recomendado', lima: true, nombre: 'Modo Ruta', txt: 'El dron vuela solo en surcos, rocía y regresa a casa.', img: 'img/modo-ruta.png' },
    { id: 'manual', etiqueta: 'Control directo', nombre: 'Modo Manual', txt: 'Tú lo manejas con las palancas. El radar te avisa de obstáculos.', img: 'img/modo-manual.png' },
    { id: 'cargo', etiqueta: 'Carga colgada', nombre: 'Punto A a Punto B', txt: 'Lleva una paca de 50 kg con cable de 12 m por el potrero.', arte: ARTE_AB },
    { id: 'mplus', pronto: true, nombre: 'Manual asistido', txt: 'Tú manejas; el dron cuida el rumbo y la franja.', arte: ARTE_MAS },
    { id: 'frutal', pronto: true, nombre: 'Árboles frutales', txt: 'Sigue el terreno y la copa de cada árbol.', arte: ARTE_ARBOL }
  ];
  function escenario(id) { for (var i = 0; i < ESCENARIOS.length; i++) if (ESCENARIOS[i].id === id) return ESCENARIOS[i]; return null; }
  function resumenTxt(sel) {
    var e = escenario(sel.modo === 'cargo' ? 'potrero' : sel.cultivo);
    return (sel.dron || '') + (e ? ' · ' + e.nombre : '');
  }

  // ---------------------------------------------------------- raíz
  var raiz = D.createElement('div');
  raiz.id = 'sc-raiz';
  function escala() {
    var k = Math.min(W.innerWidth / 1080, W.innerHeight / 1776);
    if (!(k > 0)) k = 1;
    D.documentElement.style.setProperty('--sc-k', (Math.abs(k - 1) < 0.01 ? 1 : k).toFixed(4));
  }
  escala();
  W.addEventListener('resize', escala);

  // ---------------------------------------------------------- pantalla completa automática (Android 13 / Kiosco / Web)
  var fsApagadoManual = false;
  function esPantallaCompleta() {
    return !!(D.fullscreenElement || D.webkitFullscreenElement || D.mozFullScreenElement || D.msFullscreenElement);
  }
  function pedirPantallaCompleta() {
    if (esPantallaCompleta()) return;
    var el = D.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (!req) return;
    try {
      var p = req.call(el, { navigationUI: 'hide' });
      if (p && typeof p.catch === 'function') p.catch(function () {});
    } catch (e) {
      try { req.call(el); } catch (e2) { /* requiere gesto táctil */ }
    }
  }
  function salirPantallaCompleta() {
    if (!esPantallaCompleta()) return;
    var sal = D.exitFullscreen || D.webkitExitFullscreen || D.mozCancelFullScreen || D.msExitFullscreen;
    if (sal) {
      try {
        var p = sal.call(D);
        if (p && typeof p.catch === 'function') p.catch(function () {});
      } catch (e) { /* nada */ }
    }
  }
  function alternarPantallaCompleta() {
    if (esPantallaCompleta()) {
      fsApagadoManual = true;
      salirPantallaCompleta();
    } else {
      fsApagadoManual = false;
      pedirPantallaCompleta();
    }
    setTimeout(sincronizar, 80);
  }
  function alCambiarFullscreen() {
    escala();
    var a = app();
    if (a && typeof a.updateFullscreenUI === 'function') seguro(function () { a.updateFullscreenUI(); });
    sincronizar();
  }
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (evName) {
    D.addEventListener(evName, alCambiarFullscreen);
  });
  // Entrar en automático a pantalla completa al primer toque o clic en cualquier parte de la pantalla
  function autoFsEnGesto(ev) {
    if (fsApagadoManual || esPantallaCompleta()) return;
    var t = ev && ev.target;
    if (t && t.closest && (t.closest('#sc-p-fs') || t.closest('input[type="text"]'))) return;
    pedirPantallaCompleta();
  }
  ['click', 'touchend', 'pointerup'].forEach(function (evName) {
    D.addEventListener(evName, autoFsEnGesto, { capture: true, passive: true });
  });
  W.__dtsSurco.pedirPantallaCompleta = pedirPantallaCompleta;
  W.__dtsSurco.alternarPantallaCompleta = alternarPantallaCompleta;

  // ============================================================ SELECTOR
  // Cada visitante empieza sin nada elegido; solo «Elegir otro dron» (P03b) regresa con la elección guardada.
  var SEL = { dron: null, cultivo: null, modo: null };
  var sel = null;   // contenedor #sc-sel

  function pantalla(html, dir) {
    var p = nodo('<div class="sc-pant ' + (dir === 'izq' ? 'sc-izq' : dir === 'der' ? 'sc-der' : '') + '">' + html + '</div>');
    sel.innerHTML = '';
    sel.appendChild(p);
    return p;
  }

  function pintarP01(dir) {
    var h = '<div class="sc-pant-cuerpo">' +
      '<div style="display:flex;flex-direction:column;gap:24px">' +
      '<div class="sc-pasos"><span class="sc-etq">Paso 1 de 2</span><div class="sc-pasos-barra"><i class="sc-on"></i><i></i></div></div>' +
      '<div class="sc-tit" style="font-size:120px">Elige tu dron</div></div>' +
      '<div class="sc-drones">';
    DRONES.forEach(function (d, i) {
      h += '<button type="button" class="sc-tarjeta sc-anim" data-dron="' + d.id + '" style="animation-delay:' + (i * 55) + 'ms">' +
        '<span class="sc-chk">' + ico('palomita', 36, { trazo: 2.6, cls: 'sc-palomita' }) + '</span>' +
        '<span class="sc-foto sc-dron"><img src="img/dron-' + d.id.toLowerCase() + '.webp" alt="" draggable="false"></span>' +
        '<span class="sc-modelo"><span class="sc-tit sc-nombre">' + d.id + '</span><small>DJI Agras</small></span>' +
        '<span class="sc-datos"><div><span>Tanque</span><span>' + d.tanque + '</span></div><div><span>Rotores</span><span>' + esc(d.rotores) +
        '</span></div><div><span>Caudal</span><span>' + d.caudal + '</span></div></span></button>';
    });
    h += '</div><div style="display:flex;flex-direction:column;gap:20px"><span class="sc-etq" style="font-size:22px">Escenario</span><div class="sc-escenarios">';
    ESCENARIOS.forEach(function (e, i) {
      h += '<button type="button" class="sc-esc sc-anim" data-cultivo="' + e.id + '" style="animation-delay:' + (220 + i * 55) + 'ms">' +
        '<span class="sc-chk">' + ico('palomita', 30, { trazo: 2.6, cls: 'sc-palomita' }) + '</span>' +
        '<span class="sc-foto"><img src="' + e.img + '" alt="" draggable="false"></span><span class="sc-nombre">' + e.nombre + '</span></button>';
    });
    h += '</div></div></div>' +
      '<div class="sc-barra-fija"><div class="sc-resumen"><span class="sc-etq">Tu vuelo</span><b id="sc-res"></b></div>' +
      '<button type="button" class="sc-pri" id="sc-siguiente"></button></div>';
    var p = pantalla(h, dir);
    p.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-dron],[data-cultivo],#sc-siguiente');
      if (!t) return;
      if (t.dataset.dron) { SEL.dron = t.dataset.dron; marcarP01(t); }
      else if (t.dataset.cultivo) { SEL.cultivo = t.dataset.cultivo; marcarP01(t); }
      else if (SEL.dron && SEL.cultivo) { pintarP02('der'); }
    });
    marcarP01(null);
  }
  function marcarP01(tocada) {
    sel.querySelectorAll('[data-dron]').forEach(function (b) { b.classList.toggle('sc-eleg', b.dataset.dron === SEL.dron); });
    sel.querySelectorAll('[data-cultivo]').forEach(function (b) { b.classList.toggle('sc-eleg', b.dataset.cultivo === SEL.cultivo); });
    if (tocada) {   // la palomita se dibuja de nuevo solo en la que se tocó
      var chk = tocada.querySelector('.sc-palomita');
      if (chk) { var c = chk.cloneNode(true); chk.parentNode.replaceChild(c, chk); }
    }
    var res = $('sc-res'), btn = $('sc-siguiente');
    var listo = !!(SEL.dron && SEL.cultivo);
    if (res) {
      res.className = (SEL.dron || SEL.cultivo) ? '' : 'sc-falta';
      res.textContent = (SEL.dron || SEL.cultivo) ? [SEL.dron, (escenario(SEL.cultivo) || {}).nombre].filter(Boolean).join(' · ') : 'Elige un dron y un escenario';
    }
    if (btn) {
      btn.classList.toggle('sc-no', !listo);
      btn.innerHTML = listo ? 'Siguiente' + ico('avanzar', 48, { trazo: 2.4 }) : (!SEL.dron ? 'Elige un dron' : 'Elige un escenario');
    }
  }

  function pintarP02(dir) {
    var h = '<div class="sc-pant-cuerpo">' +
      '<div style="display:flex;align-items:center;gap:32px"><button type="button" class="sc-sec" id="sc-regresa">' + ico('regresar', 36) + 'Regresar</button>' +
      '<div class="sc-pasos"><span class="sc-etq">Paso 2 de 2</span><div class="sc-pasos-barra"><i class="sc-on"></i><i class="sc-on"></i></div></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:24px"><div class="sc-tit" style="font-size:112px">¿Cómo quieres volar?</div>' +
      '<div style="display:flex;align-items:center;gap:14px;font-weight:700;font-size:28px;color:var(--sc-t2)">' + ico('dron', 32, { color: '#7AC244' }) +
      '<span>' + esc(resumenTxt({ dron: SEL.dron, cultivo: SEL.cultivo })) + '</span></div></div><div class="sc-modos">';
    MODOS.forEach(function (m, i) {
      var isT25Blocked = (m.id === 'cargo' && SEL.dron === 'T25P');
      var isLocked = m.pronto || isT25Blocked;
      var lockTxt = isT25Blocked ? 'No disponible en Agras T25P' : (m.pronto ? 'Próximamente' : m.etiqueta);
      var foto = m.img ? '<img src="' + m.img + '" alt="" draggable="false">' : '<span class="sc-arte">' + m.arte + '</span>';
      var etq = isLocked ? '<span class="sc-etq" style="font-size:18px;background:rgba(239,68,68,0.15);color:#ef4444">' + lockTxt + '</span>'
        : m.lima ? '<span class="sc-pastilla-lima">' + m.etiqueta + '</span>' : '<span class="sc-etq" style="font-size:18px">' + m.etiqueta + '</span>';
      h += '<button type="button" class="sc-modo sc-anim' + (isLocked ? ' sc-pronto' : '') + '" data-modo="' + m.id + '" style="animation-delay:' + (i * 55) + 'ms">' +
        '<span class="sc-foto">' + foto + '</span><span class="sc-modo-txt">' + etq + '<span class="sc-tit">' + m.nombre + '</span><p>' + (isT25Blocked ? 'El modelo Agras T25P no cuenta con capacidad física ni cabrestante para operaciones de carga suspendida.' : m.txt) + '</p></span>' +
        (isLocked ? '<span style="width:72px;display:flex;justify-content:center;color:#ef4444">' + ico('candado', 40) + '</span>'
          : '<span class="sc-flecha">' + ico('siguiente', 36, { trazo: 2.2 }) + '</span>') + '</button>';
    });
    h += '</div></div>';
    var p = pantalla(h, dir);
    p.addEventListener('click', function (ev) {
      if (ev.target.closest('#sc-regresa')) { pintarP01('izq'); return; }
      var t = ev.target.closest('[data-modo]');
      if (!t) return;
      if (t.classList.contains('sc-pronto')) {
        t.classList.remove('sc-vibra'); void t.offsetWidth; t.classList.add('sc-vibra');
        return;
      }
      if (sel.dataset.ocupado) return;
      sel.dataset.ocupado = '1';
      SEL.modo = t.dataset.modo;
      t.classList.add('sc-eleg');
      setTimeout(function () { arrancar(); }, 140);
    });
  }

  // ---------------------------------------------------------- P03: preparar el vuelo
  var PASOS = ['Preparando el terreno', '', 'Encendiendo el radar', 'Listo'];
  function pintarP03() {
    var e = escenario(SEL.modo === 'cargo' ? 'potrero' : SEL.cultivo) || ESCENARIOS[0];
    PASOS[1] = 'Armando tu ' + SEL.dron;
    var h = '<div class="sc-pant-cuerpo" style="padding-top:120px;gap:56px">' +
      '<div class="sc-prep-foto sc-anim"><img class="sc-fondo" src="' + e.img + '" alt=""><img class="sc-dron-g" src="img/dron-' + SEL.dron.toLowerCase() + '.webp" alt=""></div>' +
      '<div style="display:flex;flex-direction:column;gap:20px"><span class="sc-etq" style="font-size:22px">' + esc(resumenTxt(SEL)) + '</span>' +
      '<div class="sc-tit" style="font-size:120px">Preparando tu vuelo</div></div>' +
      '<div class="sc-avance"><div class="sc-avance-pista"><i id="sc-barra"></i></div><b id="sc-pct">0 %</b></div><div id="sc-pasos">';
    PASOS.forEach(function (t, i) {
      h += '<div class="sc-paso" data-paso="' + i + '"><span class="sc-paso-ic"></span><span>' + esc(t) + '</span></div>';
    });
    h += '</div></div>';
    pantalla(h, 'der');
  }
  function marcarPaso(i, pct) {
    var filas = sel.querySelectorAll('.sc-paso');
    filas.forEach(function (f, j) {
      var ic = f.querySelector('.sc-paso-ic');
      var antes = f.className;
      f.className = 'sc-paso' + (j < i ? ' sc-hecho' : j === i ? ' sc-actual' : '');
      if (antes === f.className) return;
      ic.innerHTML = j < i ? ico('palomita', 32, { trazo: 2.6, cls: 'sc-palomita' })
        : j === i && i < filas.length - 1 ? ico('proceso', 56, { trazo: 2.4, cls: 'sc-ic-gira' }) : '';
    });
    var b = $('sc-barra'), p = $('sc-pct');
    if (b) b.style.width = pct + '%';
    if (p) p.textContent = Math.round(pct) + ' %';
  }
  function pintarP03b(paso, detalle) {
    var e = escenario(SEL.modo === 'cargo' ? 'potrero' : SEL.cultivo) || ESCENARIOS[0];
    var h = '<div class="sc-pant-cuerpo" style="padding-top:120px;gap:56px">' +
      '<div class="sc-prep-foto" style="opacity:.45"><img class="sc-fondo" src="' + e.img + '" alt=""></div>' +
      '<div style="display:flex;flex-direction:column;gap:28px"><span class="sc-error-ic sc-pulso">' + ico('alerta', 64, { trazo: 2.2 }) + '</span>' +
      '<div class="sc-tit" style="font-size:112px">No se pudo preparar el vuelo</div>' +
      '<div style="font-size:32px;line-height:1.4;color:var(--sc-t2);max-width:900px">Se detuvo en «' + esc(paso) + '». Inténtalo otra vez; si se repite, pide ayuda a un asesor de DTS.</div>' +
      (detalle ? '<div class="sc-mono" style="font-size:18px;color:var(--sc-t3)">' + esc(String(detalle).slice(0, 140)) + '</div>' : '') +
      '</div></div>' +
      '<div style="position:absolute;left:48px;right:48px;bottom:48px;display:flex;flex-direction:column;gap:20px">' +
      '<button type="button" class="sc-pri" id="sc-reintenta">' + ico('girar', 48, { trazo: 2.4 }) + 'Intentar de nuevo</button>' +
      '<button type="button" class="sc-sec" id="sc-otro">Elegir otro dron</button></div>';
    var p = pantalla(h, '');
    p.addEventListener('click', function (ev) {
      // la escena quedó a medias: se recarga la página (rápido: el selector no arma 3D)
      if (ev.target.closest('#sc-reintenta')) { guardado('dts-surco-reintento', SEL); location.reload(); }
      else if (ev.target.closest('#sc-otro')) { guardado('dts-surco-volver', { dron: SEL.dron, cultivo: SEL.cultivo, modo: null, paso: 1, piloto: true }); location.reload(); }
    });
  }

  async function arrancar() {
    pintarP03();
    marcarPaso(0, 4);
    await cuadro(); await cuadro(); await espera(60);
    var paso = 0;
    try {
      // 1) el simulador completo, una sola vez, con el dron elegido (patch c)
      W.__dtsSurco.dron = SEL.dron;
      if (typeof W.initFlyMomo3 !== 'function') throw new Error('No cargó el simulador');
      D.documentElement.classList.remove('sc-eligiendo');
      W.initFlyMomo3();
      if (!app()) throw new Error('El simulador no se creó');
      engancharAvisos();
      marcarPaso(1, 55);
      await cuadro(); await cuadro();
      // 2) escenario, carga y modo
      paso = 1;
      aplicarEleccion();
      marcarPaso(2, 78);
      await cuadro(); await cuadro();
      // 3) primer dibujo: se compilan los materiales detrás de esta pantalla
      paso = 2;
      var a = app();
      seguro(function () { if (a.renderer && a.scene && a.camera) { a.renderer.compile(a.scene, a.camera); a.renderer.render(a.scene, a.camera); } });
      await cuadro(); await cuadro(); await cuadro();
      marcarPaso(4, 100);
      await espera(400);
      montarHud();
      sel.classList.add('sc-sale');
      setTimeout(function () { if (sel && sel.parentNode) sel.parentNode.removeChild(sel); sel = null; soltarAvisos(); }, 320);
    } catch (e) {
      if (W.console) console.error('[surco] preparar vuelo', e);
      D.documentElement.classList.add('sc-eligiendo');
      pintarP03b(PASOS[paso], e && e.message);
    }
  }

  // Lo mismo que hacía el selector viejo al terminar (finishPrelude), con la elección.
  function aplicarEleccion() {
    var a = app(), m = SEL.modo, cultivo = m === 'cargo' ? 'potrero' : SEL.cultivo;
    if (typeof a.setDroneModel === 'function') a.setDroneModel(SEL.dron);   // el dron ya nació así: solo pone su panel
    if (typeof a.setPayloadType === 'function') a.setPayloadType(m === 'cargo' ? 'cargo' : 'liquid');
    if (cultivo && cultivo !== a.activeCropMap && typeof a.switchCropMap === 'function') a.switchCropMap(cultivo);
    var limpiaModos = function () {
      if (!a.ui) return;
      [a.ui.modeHover, a.ui.modeManual, a.ui.modeMission].forEach(function (b) { if (b) b.classList.remove('active'); });
    };
    if (m === 'cargo') {
      if (a.cargoSystem && typeof a.cargoSystem.activate === 'function') a.cargoSystem.activate();
      if (a.drone) a.drone.flightMode = 'manual';
      a.showHUDAlert('Sistema de carga Punto A a Punto B · ' + SEL.dron + ' · cabo de 12 m · paca de 50 kg', 4500);
    } else if (m === 'mission') {
      if (a.drone) a.drone.flightMode = 'mission';
      limpiaModos(); if (a.ui && a.ui.modeMission) a.ui.modeMission.classList.add('active');
      if (a.missionPlanner && typeof a.missionPlanner.closeModal === 'function') a.missionPlanner.closeModal();
      a.showHUDAlert('Modo Ruta activo · ' + SEL.dron + ' listo. Programa la ruta en Panel.', 4000);
    } else {
      if (a.drone) a.drone.flightMode = 'manual';
      limpiaModos(); if (a.ui && a.ui.modeManual) a.ui.modeManual.classList.add('active');
      if (a.missionPlanner && typeof a.missionPlanner.closeModal === 'function') a.missionPlanner.closeModal();
      a.showHUDAlert('Modo Manual activo · ' + SEL.dron + ' listo', 3500);
    }
    // vista panorámica limpia y palancas táctiles SIEMPRE visibles al empezar
    D.body.classList.add('sidebar-collapsed'); a.isSidebarCollapsed = true;
    var tc = a.touchControls;
    if (tc) {
      tc.visible = true;
      try { localStorage.setItem('flymomo_touch_sticks_visible', 'true'); } catch (e) { /* sin almacenamiento */ }
      if (tc.container) tc.container.style.display = 'block';
      if (typeof tc.show === 'function') tc.show();
      if (typeof tc.startHUDEmbedWatcher === 'function') tc.startHUDEmbedWatcher();
      if (tc.btnToggle) tc.btnToggle.classList.add('active');
    }
  }

  // ============================================================ AVISOS (P10)
  var avisosRetenidos = [], cajaAviso = null, avisoTimer = null;
  function engancharAvisos() {
    var a = app();
    if (!a || a.__scAvisos) return;
    a.__scAvisos = true;
    a.showHUDAlert = function (msg, dur, icono) {
      if (sel) { avisosRetenidos.push([msg, dur, icono]); return; }
      mostrarAviso(msg, dur, icono);
    };
  }
  function soltarAvisos() {
    var ult = avisosRetenidos.pop();
    avisosRetenidos = [];
    if (ult) mostrarAviso(ult[0], ult[1], ult[2]);
  }
  function clasificar(msg, icono) {
    var t = String(msg || ''), crudo = t + ' ' + (icono || '');
    var atn = /^\s*(⚠|🚨|🚫)/.test(t) || /⚠/.test(icono || '');
    if (/despegue cancelado|rth cancelado|misión automática cancelada|seguimiento de terreno desactivado/i.test(t)) atn = false;
    var titulo = 'Atención', ic = 'alerta';
    if (/bater/i.test(t) && /(baja|crític|agotad|5%|0%)/i.test(t)) { titulo = /baja/i.test(t) ? 'Batería baja' : 'Batería crítica'; ic = 'bateria'; }
    else if (/pesticida|tanque[^.]*vac/i.test(t)) { titulo = 'Tanque vacío'; ic = 'tanque'; }
    else if (/no aplicaci/i.test(t)) { titulo = 'Zona sin aplicar'; ic = 'alerta'; }
    else if (/obst/i.test(t)) { titulo = 'Obstáculo'; ic = 'obstaculo'; }
    else if (/control remoto/i.test(t)) { titulo = 'Control remoto'; ic = 'control'; }
    var nota = 'dron';
    if (/^\s*(✅|🏁|🎉)/.test(t) || /complet|registrad|calibrad|rellen|reemplaz/i.test(t)) nota = 'palomita';
    else if (/aspersi|purga|boquilla|colorante/i.test(crudo)) nota = 'gota';
    else if (/escenario|parcela|ruta|misi/i.test(t)) nota = 'mapa';
    else if (/vista|cámara/i.test(t)) nota = 'orbita';
    else if (/rth|casa|helipuerto/i.test(t)) nota = 'casa';
    else if (/control/i.test(t)) nota = 'control';
    return { atn: atn, titulo: titulo, ic: atn ? ic : nota };
  }
  function mostrarAviso(msg, dur, icono) {
    if (!cajaAviso) return;
    var c = clasificar(msg, icono);
    var txt = sinEmoji(msg).replace(/^(ADVERTENCIA|ATENCIÓN)\s*:\s*/i, '');
    clearTimeout(avisoTimer);
    var h = '<div class="sc-aviso' + (c.atn ? ' sc-atn' : '') + '"><div class="sc-aviso-fila">' +
      '<span class="sc-aviso-ic' + (c.atn ? ' sc-pulso' : '') + '">' + ico(c.ic, c.atn ? 60 : 40, { trazo: 2.2 }) + '</span>' +
      '<div class="sc-aviso-txt">' + (c.atn ? '<span class="sc-etq">Atención</span><span class="sc-tit">' + esc(c.titulo) + '</span>' : '') +
      '<p>' + esc(txt) + '</p></div></div>' +
      (c.atn ? '<div class="sc-aviso-acc"><button type="button" class="sc-sec sc-seguir">Seguir</button></div>' : '') + '</div>';
    cajaAviso.innerHTML = h;
    var caja = cajaAviso.firstElementChild;
    var col = $('sc-columna');
    if (col) col.classList.toggle('sc-baja', c.atn);
    var cerrar = function () {
      clearTimeout(avisoTimer);
      caja.classList.add('sc-sale');
      if (col) col.classList.remove('sc-baja');
      setTimeout(function () { if (caja.parentNode) caja.parentNode.removeChild(caja); }, 320);
    };
    var b = caja.querySelector('.sc-seguir');
    if (b) b.addEventListener('click', cerrar);
    avisoTimer = setTimeout(cerrar, Math.max(c.atn ? 5000 : 2200, Number(dur) || 3000));
  }

  // ============================================================ HUD DEL VUELO (P04)
  var hudListo = false;
  function montarHud() {
    if (hudListo) return;
    hudListo = true;
    var a = app();
    raiz.insertAdjacentHTML('beforeend',
      '<button type="button" class="sc-hud sc-toca" id="sc-piloto"><span class="sc-quien"><span class="sc-etq-ch">' + ico('persona', 20, { trazo: 2.2 }) +
      'Piloto</span><b id="sc-piloto-n">Piloto Invitado</b></span>' + ico('lapiz', 30, { color: '#C9D6CC' }) + '</button>' +
      '<div class="sc-hud" id="sc-franja"><div><span class="sc-etq-ch">Franja</span><span class="sc-grande"><span id="sc-fr-w">0.0</span><small> m</small></span></div>' +
      '<div><span class="sc-etq-ch" style="color:var(--sc-t3)">Visual</span><span class="sc-chico" id="sc-fr-v">0.0 m</span></div></div>' +
      '<button type="button" class="sc-hud sc-toca" id="sc-tab-panel">' + ico('panel', 36, { color: '#F4F4EF' }) + '<span>Panel</span></button>' +
      '<div id="sc-columna" class="sc-toca">' +
      '<button type="button" class="sc-lado" id="sc-b-zoom">' + ico('zoom', 36) + '<span id="sc-b-zoom-t">Zoom Control</span></button>' +
      '<button type="button" class="sc-lado" id="sc-b-cambiar">' + ico('regresar', 36) + 'Cambiar vuelo</button>' +
      '<button type="button" class="sc-lado" id="sc-b-camara">' + ico('orbita', 36) + '<span id="sc-b-camara-t">Órbita</span></button>' +
      '<button type="button" class="sc-lado" id="sc-b-reanudar" hidden>' + ico('reanudar', 36) + 'Reanudar</button>' +
      '<button type="button" class="sc-lado" id="sc-b-ayuda">' + ico('ayuda', 36) + 'Ayuda</button>' +
      '<button type="button" class="sc-lado" id="sc-b-tactil">' + ico('palancas', 36) + 'Táctil</button></div>' +
      // propuesta 1 del handoff (Josué, 7-nov): despegar desde la pantalla mientras el dron está en tierra
      '<button type="button" class="sc-pri sc-toca" id="sc-despegar" hidden>' + ico('despegar', 48, { trazo: 2.4 }) + 'Despegar</button>' +
      '<div id="sc-aviso"></div>' +
      '<div id="sc-cuenta"><div class="sc-cuenta-c"><span class="sc-etq" style="font-size:26px;color:var(--sc-naranja)">Encendiendo rotores</span>' +
      '<div class="sc-aro"><svg width="560" height="560" viewBox="0 0 560 560"><circle cx="280" cy="280" r="260" fill="none" stroke="rgba(244,244,239,.12)" stroke-width="20"/>' +
      '<circle id="sc-aro-c" cx="280" cy="280" r="260" fill="none" stroke="#F26522" stroke-width="20" stroke-linecap="round" stroke-dasharray="1633.6" stroke-dashoffset="0"/></svg>' +
      '<div class="sc-n" id="sc-cuenta-n">3</div></div>' +
      '<div class="sc-tit" style="font-size:96px;text-align:center">Aléjate de las hélices</div></div>' +
      '<button type="button" class="sc-cancel" id="sc-cuenta-x">' + ico('cerrar', 44, { trazo: 2.4 }) + 'Cancelar despegue</button></div>' +
      // propuesta 3 (Josué, 7-nov): ¿Sigues ahí? a los 70 s sin tocar; a los 90 s regresa al inicio
      '<div id="sc-sigues"><div class="sc-cuenta-c"><span class="sc-etq" style="font-size:26px;color:var(--sc-naranja)">Vuelo en pausa</span>' +
      '<div class="sc-aro sc-aro-ch"><svg width="360" height="360" viewBox="0 0 360 360"><circle cx="180" cy="180" r="166" fill="none" stroke="rgba(244,244,239,.12)" stroke-width="16"/>' +
      '<circle id="sc-sigues-aro" cx="180" cy="180" r="166" fill="none" stroke="#F26522" stroke-width="16" stroke-linecap="round" stroke-dasharray="1043" stroke-dashoffset="0"/></svg>' +
      '<div class="sc-n" id="sc-sigues-n">20</div></div>' +
      '<div class="sc-tit" style="font-size:112px;text-align:center">¿Sigues ahí?</div>' +
      '<div style="font-size:30px;line-height:1.4;color:var(--sc-t2);text-align:center">Toca la pantalla para seguir volando. Si no, regresamos al inicio.</div></div>' +
      '<div class="sc-sigues-acc"><button type="button" class="sc-pri" id="sc-sigues-si">Seguir volando</button>' +
      '<button type="button" class="sc-sec" id="sc-sigues-no">Terminar</button></div></div>');
    cajaAviso = $('sc-aviso');
    $('sc-b-zoom').addEventListener('click', alternarZoomControl);
    $('sc-b-cambiar').addEventListener('click', abrirCambiar);
    aplicarZoomRC(zoomActual, true);
    $('sc-despegar').addEventListener('click', function () {
      if (a.drone && !a.drone.isFlying && !a.countdownTimer && typeof a.startTakeoffCountdown === 'function') a.startTakeoffCountdown();
      sincronizar();
    });
    $('sc-sigues').addEventListener('click', function (ev) { if (ev.target.closest('#sc-sigues-no')) terminarVuelo(); else cerrarSigues(); });

    $('sc-piloto').addEventListener('click', abrirPiloto);
    $('sc-tab-panel').addEventListener('click', abrirPanel);
    $('sc-b-camara').addEventListener('click', function () { pica('btn-camera-cycle'); sincronizar(); });
    $('sc-b-reanudar').addEventListener('click', function () { pica('btn-resume-mission'); });
    $('sc-b-ayuda').addEventListener('click', abrirAyuda);
    $('sc-b-tactil').addEventListener('click', function () { pica('btn-toggle-touch'); sincronizar(); });
    $('sc-cuenta-x').addEventListener('click', function () { if (!pica('btn-cancel-countdown') && a.cancelTakeoffCountdown) a.cancelTakeoffCountdown(); });

    // el simulador sigue llamando a sus métodos (teclas, botones del control): se abren las piezas nuevas
    a.openPilotModal = abrirPiloto;
    a.toggleHelp = function (forzar) { var abierta = !!$('sc-hoja-ayuda'); if (forzar === false || (forzar !== true && abierta)) cerrarHoja('sc-hoja-ayuda'); else if (!abierta) abrirAyuda(); };
    a.toggleSidebar = function (forzar) {
      D.body.classList.add('sidebar-collapsed'); a.isSidebarCollapsed = true;
      var abierto = !!$('sc-panel');
      if (forzar === true || (forzar !== false && abierto)) cerrarPanel(); else if (!abierto) abrirPanel();
    };
    if (a.missionPlanner) {
      a.missionPlanner.openModal = function () { seguro(function () { a.missionPlanner.syncInputs(); a.missionPlanner.recalculate(); }); abrirProgramar(); };
    }
    var bc = $('btn-open-credits');
    if (bc) bc.addEventListener('click', function (ev) { ev.stopImmediatePropagation(); abrirCreditos(); }, true);

    vigilarCuenta();
    vigilarInactividad();
    sincronizar();
    setInterval(sincronizar, 300);
  }

  // ---------------------------------------------------------- regresar del vuelo al selector
  // La escena no se rearma en vivo (dos escenas a la vez pesan): se recarga la página
  // y entra directo a elegir, con lo que ya estaba elegido y el nombre del piloto.
  function volverASelector(paso) {
    var a = app(), d = (a && a.drone && a.drone.currentModel) || SEL.dron;
    var c = (a && escenario(a.activeCropMap) && a.activeCropMap) || SEL.cultivo;
    guardado('dts-surco-volver', { dron: d, cultivo: c, modo: null, paso: paso, piloto: true });
    location.reload();
  }
  function abrirCambiar() {
    var h = cabHoja('Cambiar vuelo', '¿Qué quieres cambiar?', 88) +
      '<p style="margin:0;font-size:28px;line-height:1.4;color:var(--sc-t2)">Este vuelo termina y eliges de nuevo. Tu nombre de piloto se queda.</p>' +
      '<button type="button" class="sc-pri" data-volver="2">' + ico('regresar', 48, { trazo: 2.4 }) + 'Otro modo de vuelo</button>' +
      '<button type="button" class="sc-sec" data-volver="1" style="height:120px;font-size:30px">Otro dron o escenario</button>';
    var hoja = abrirHoja('sc-hoja-cambiar', h);
    hoja.addEventListener('click', function (ev) { var b = ev.target.closest('[data-volver]'); if (b) volverASelector(+b.dataset.volver); });
  }

  // ---------------------------------------------------------- Zoom Control (ajuste de tamaño del control remoto en pantalla)
  var ZOOM_MIN = 70, ZOOM_MAX = 155, ZOOM_PREAJ = [75, 100, 115, 130, 150];
  var zoomGuardado = +(guardado('dts-surco-rc-zoom') || 100);
  var zoomActual = (zoomGuardado >= ZOOM_MIN && zoomGuardado <= ZOOM_MAX) ? zoomGuardado : 100;
  var zoomDesl = null;

  function aplicarZoomRC(pct, silencioso) {
    pct = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, Math.round(+pct || 100)));
    zoomActual = pct;
    D.documentElement.style.setProperty('--rc-zoom', (pct / 100).toFixed(3));
    if (!silencioso) guardado('dts-surco-rc-zoom', pct);
    var vEl = $('sc-v-rczoom');
    if (vEl) vEl.innerHTML = pct + '<small> %</small>';
    var pop = $('sc-zoom-pop');
    if (pop) {
      pop.querySelectorAll('[data-rczoom]').forEach(function (b) {
        b.classList.toggle('sc-on', +b.dataset.rczoom === pct);
      });
    }
    if (zoomDesl) zoomDesl.poner(pct);
    sincronizar();
  }

  function cerrarZoomControl(ya) {
    var pop = $('sc-zoom-pop');
    var btn = $('sc-b-zoom');
    if (btn) btn.classList.remove('sc-activo');
    zoomDesl = null;
    if (!pop) return;
    if (ya) { pop.remove(); return; }
    pop.classList.add('sc-sale');
    pop.removeAttribute('id');
    sincronizar();
    setTimeout(function () { pop.remove(); }, 220);
  }

  function alternarZoomControl() {
    if ($('sc-zoom-pop')) {
      cerrarZoomControl();
      return;
    }
    var a = app();
    if (a && a.touchControls && !a.touchControls.visible) {
      pica('btn-toggle-touch');
    }
    var btn = $('sc-b-zoom');
    if (btn) btn.classList.add('sc-activo');

    var h = '<div class="sc-zoom-cab">' +
      '<div><span class="sc-etq">Tamaño en pantalla</span><div class="sc-tit" style="font-size:76px;margin-top:6px">Zoom Control</div></div>' +
      '<button type="button" class="sc-circ" id="sc-zoom-x" aria-label="Cerrar">' + ico('cerrar', 38, { color: '#F4F4EF' }) + '</button></div>' +
      '<div style="display:flex;flex-direction:column;gap:14px">' +
      '<div class="sc-valor-fila"><span>Escala del control remoto</span><span class="sc-valor" id="sc-v-rczoom">' + zoomActual + '<small> %</small></span></div>' +
      '<div class="sc-ajuste">' +
      '<button type="button" class="sc-circ" id="sc-zoom-menos" aria-label="Hacer más pequeño">' + ico('menos', 36, { color: '#F4F4EF', trazo: 2.2 }) + '</button>' +
      '<div style="flex:1;display:flex" id="sc-d-rczoom"></div>' +
      '<button type="button" class="sc-circ" id="sc-zoom-mas" aria-label="Hacer más grande">' + ico('mas', 36, { color: '#F4F4EF', trazo: 2.2 }) + '</button>' +
      '</div></div>' +
      '<div class="sc-preaj">' + ZOOM_PREAJ.map(function (p) {
        return '<button type="button" data-rczoom="' + p + '"' + (p === zoomActual ? ' class="sc-on"' : '') + '>' + p + ' %</button>';
      }).join('') + '</div>' +
      '<div class="sc-zoom-acc">' +
      '<button type="button" class="sc-sec" id="sc-zoom-reset">' + ico('girar', 32) + 'Escala 1:1 (100 %)</button>' +
      '<button type="button" class="sc-pri" id="sc-zoom-ok">' + ico('palomita', 40, { trazo: 2.6 }) + 'Listo</button>' +
      '</div>';

    var pop = nodo('<div id="sc-zoom-pop" class="sc-toca">' + h + '</div>');
    raiz.appendChild(pop);
    sincronizar();

    zoomDesl = deslizador($('sc-d-rczoom'), {
      min: ZOOM_MIN, max: ZOOM_MAX, paso: 1, valor: zoomActual,
      alCambiar: function (v) { aplicarZoomRC(v); }
    });
    repetidor($('sc-zoom-menos'), function () { aplicarZoomRC(zoomActual - 5); });
    repetidor($('sc-zoom-mas'), function () { aplicarZoomRC(zoomActual + 5); });

    pop.addEventListener('click', function (ev) {
      var pr = ev.target.closest('[data-rczoom]');
      if (pr) { aplicarZoomRC(+pr.dataset.rczoom); return; }
      if (ev.target.closest('#sc-zoom-reset')) { aplicarZoomRC(100); return; }
      if (ev.target.closest('#sc-zoom-ok') || ev.target.closest('#sc-zoom-x')) { cerrarZoomControl(); }
    });
  }

  // ---------------------------------------------------------- inactividad en vuelo (propuesta 3)
  var ultimoToque = Date.now(), pausado = false, siguesIni = 0;
  // 70 s sin tocar; para probar en una PC: ?inactivo=8 (segundos). En la expo nunca va.
  var LIMITE_MS = (+((location.search.match(/[?&]inactivo=(\d+)/) || [])[1]) || 70) * 1000;
  function toque() { ultimoToque = Date.now(); }
  function pausar(si) {
    var a = app();
    if (!a) return;
    if (!a.__scAnimar) {
      // se envuelve su bucle de dibujo: en pausa no avanza la física ni se dibuja
      var orig = a.animate;
      a.__scAnimar = true;
      a.animate = function () { if (pausado) { requestAnimationFrame(a.animate); return; } orig(); };
    }
    pausado = si;
    if (!si && a.clock) a.clock.getDelta();   // descarta el tiempo en pausa
  }
  function vigilarInactividad() {
    ['pointerdown', 'pointermove', 'touchstart', 'touchmove', 'keydown', 'wheel'].forEach(function (t) {
      D.addEventListener(t, toque, { capture: true, passive: true });
    });
    setInterval(function () {
      var a = app();
      seguro(function () {
        var pads = (navigator.getGamepads && navigator.getGamepads()) || [];
        var activo = Array.prototype.some.call(pads, function (p) {
          return p && p.connected && (Array.prototype.some.call(p.buttons || [], function (b) { return b && b.pressed; }) ||
            Array.prototype.some.call(p.axes || [], function (x) { return Math.abs(x) > 0.2; }));
        });
        if (activo) toque();
      });
      // viendo una ruta automática o en la cuenta de despegue no se interrumpe
      var mision = a && a.drone && a.drone.isFlying && a.drone.flightMode === 'mission';
      if (mision || (a && a.countdownTimer)) toque();
      var sigues = $('sc-sigues');
      if (!sigues) return;
      if (sigues.classList.contains('sc-on')) {
        var resta = Math.max(0, 20 - Math.floor((Date.now() - siguesIni) / 1000));
        $('sc-sigues-n').textContent = resta;
        if (resta <= 0) terminarVuelo();
      } else if (Date.now() - ultimoToque >= LIMITE_MS) {
        abrirSigues();
      }
    }, 1000);
  }
  function abrirSigues() {
    var s = $('sc-sigues'), aro = $('sc-sigues-aro');
    siguesIni = Date.now();
    $('sc-sigues-n').textContent = '20';
    aro.classList.remove('sc-vacia'); void aro.getBoundingClientRect(); aro.classList.add('sc-vacia');
    s.classList.add('sc-on');
    pausar(true);
  }
  function cerrarSigues() {
    $('sc-sigues').classList.remove('sc-on');
    pausar(false);
    toque();
  }
  // Terminar = el siguiente visitante empieza de cero (sin la elección ni el nombre de este)
  function terminarVuelo() {
    guardado('dts-surco-volver', null);
    guardado('dts-surco-reintento', null);
    try { localStorage.removeItem('flymomo_pilot_name'); } catch (e) { /* sin almacenamiento */ }
    location.reload();
  }

  var cache = {};
  function pon(id, prop, v) {
    if (cache[id + prop] === v) return;
    cache[id + prop] = v;
    var e = $(id);
    if (!e) return;
    if (prop === 'text') e.textContent = v;
    else if (prop === 'hidden') e.hidden = v;
    else if (prop === 'activo') e.classList.toggle('sc-activo', v);
    else if (prop === 'top') e.style.top = v + 'px';
  }
  function nombrePiloto() {
    var a = app(), n = a && String(a.pilotName || '').trim().replace(/^piloto\s+/i, '');
    return n || 'Piloto Invitado';
  }
  function sincronizar() {
    var a = app();
    if (!a) return;
    pon('sc-piloto-n', 'text', nombrePiloto());
    var w = $('hud-swath-width'), v = $('hud-swath-sub');
    if (w) pon('sc-fr-w', 'text', sinEmoji(w.textContent));
    if (v) pon('sc-fr-v', 'text', (sinEmoji(v.textContent).match(/[\d.]+\s*m/) || [''])[0]);
    var cam = $('cam-cycle-text');
    if (cam) pon('sc-b-camara-t', 'text', sinEmoji(cam.textContent) || 'Órbita');
    var rea = $('btn-resume-mission');
    pon('sc-b-reanudar', 'hidden', !rea || !rea.style.display || rea.style.display === 'none');
    var tac = $('btn-toggle-touch');
    pon('sc-b-tactil', 'activo', !!(tac && tac.classList.contains('active')));
    // Despegar: en tierra, sin cuenta en curso; en Modo Ruta solo con la ruta ya programada
    var dr = a.drone;
    var enTierra = !!(dr && !dr.isFlying && !dr.isLanding && !a.countdownTimer && !$('sc-zoom-pop') && (dr.flightMode !== 'mission' || dr.missionProgrammed));
    pon('sc-despegar', 'hidden', !enTierra);
    if (enTierra) {
      var rc = $('virtual-rc-container'), k = parseFloat(getComputedStyle(D.documentElement).getPropertyValue('--sc-k')) || 1;
      var arriba = rc && rc.offsetParent !== null ? rc.getBoundingClientRect().top / k : 1400;
      pon('sc-despegar', 'top', Math.max(760, Math.round(arriba - 144 - 40)));
    }
    if ($('sc-panel')) sincronizarPanel();
  }

  // ---------------------------------------------------------- cuenta regresiva (P09)
  function vigilarCuenta() {
    var modal = $('takeoff-countdown-modal'), num = $('countdown-number'), capa = $('sc-cuenta');
    if (!modal || !capa) return;
    var ultimo = null;
    var revisar = function () {
      var on = modal.style.display && modal.style.display !== 'none';
      capa.classList.toggle('sc-on', !!on);
      if (!on) { ultimo = null; return; }
      var n = sinEmoji(num ? num.textContent : '').replace(/[^\d]/g, '') || '3';
      if (n === ultimo) return;
      ultimo = n;
      var nn = $('sc-cuenta-n'), aro = $('sc-aro-c');
      nn.textContent = n;
      nn.classList.remove('sc-entra'); void nn.offsetWidth; nn.classList.add('sc-entra');
      aro.classList.remove('sc-vacia'); void aro.getBoundingClientRect(); aro.classList.add('sc-vacia');
    };
    var obs = new MutationObserver(revisar);
    obs.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
    if (num) obs.observe(num, { childList: true, characterData: true, subtree: true });
    revisar();
  }

  // ============================================================ HOJAS
  function abrirHoja(id, html, opt) {
    opt = opt || {};
    cerrarZoomControl(true);
    cerrarHoja(id, true);
    var velo = nodo('<div class="sc-velo" data-velo="' + id + '"></div>');
    var hoja = nodo('<div class="sc-hoja' + (opt.alta ? ' sc-alta' : '') + '" id="' + id + '">' + html + '</div>');
    raiz.appendChild(velo);
    raiz.appendChild(hoja);
    velo.addEventListener('click', function () { cerrarHoja(id); });
    hoja.addEventListener('click', function (ev) { if (ev.target.closest('[data-cierra]')) cerrarHoja(id); });
    return hoja;
  }
  function cerrarHoja(id, ya) {
    var hoja = $(id), velo = raiz.querySelector('[data-velo="' + id + '"]');
    [hoja, velo].forEach(function (e) {
      if (!e) return;
      if (ya) { e.remove(); return; }
      e.classList.add('sc-sale'); e.removeAttribute('id');
      setTimeout(function () { e.remove(); }, 300);
    });
  }
  function cabHoja(etq, titulo, tam) {
    return '<div class="sc-hoja-cab"><div><span class="sc-etq">' + etq + '</span><span class="sc-tit" style="font-size:' + (tam || 96) + 'px">' + titulo + '</span></div>' +
      '<button type="button" class="sc-circ" data-cierra aria-label="Cerrar">' + ico('cerrar', 40, { color: '#F4F4EF' }) + '</button></div>';
  }

  // ---------------------------------------------------------- deslizador táctil
  function deslizador(cont, o) {
    // o: {min, max, paso, valor, alCambiar(v)}
    cont.innerHTML = '<div class="sc-desl"><div class="sc-desl-pista"></div><div class="sc-desl-lleno"></div><div class="sc-desl-perilla"></div></div>';
    var d = cont.firstChild, lleno = d.children[1], perilla = d.children[2], val = o.valor;
    var redondea = function (v) { v = Math.round((v - o.min) / o.paso) * o.paso + o.min; return Math.min(o.max, Math.max(o.min, +v.toFixed(4))); };
    var pinta = function () { var f = (val - o.min) / (o.max - o.min); f = Math.min(1, Math.max(0, f)); lleno.style.width = (f * 100) + '%'; perilla.style.left = (f * 100) + '%'; };
    var desde = function (x) { var r = d.getBoundingClientRect(); var f = (x - r.left) / r.width; return redondea(o.min + f * (o.max - o.min)); };
    var mover = function (ev) { var v = desde(ev.clientX); if (v !== val) { val = v; pinta(); o.alCambiar(v); } };
    d.addEventListener('pointerdown', function (ev) { d.setPointerCapture(ev.pointerId); d.classList.add('sc-arrastra'); mover(ev); });
    d.addEventListener('pointermove', function (ev) { if (d.classList.contains('sc-arrastra')) mover(ev); });
    var suelta = function () { d.classList.remove('sc-arrastra'); };
    d.addEventListener('pointerup', suelta); d.addEventListener('pointercancel', suelta);
    pinta();
    return {
      poner: function (v) { if (d.classList.contains('sc-arrastra')) return; val = Math.min(o.max, Math.max(o.min, v)); pinta(); },
      paso: function (s) { var v = redondea(val + s * o.paso); if (v !== val) { val = v; pinta(); o.alCambiar(v); } },
      limites: function (min, max, paso) { o.min = min; o.max = max; if (paso) o.paso = paso; pinta(); }
    };
  }
  // − / + con repetición al mantener (cada 120 ms)
  function repetidor(btn, fn) {
    var t1 = null, t2 = null;
    var para = function () { clearTimeout(t1); clearInterval(t2); t1 = t2 = null; };
    btn.addEventListener('pointerdown', function (ev) {
      ev.preventDefault(); fn();
      t1 = setTimeout(function () { t2 = setInterval(fn, 120); }, 420);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (e) { btn.addEventListener(e, para); });
  }
  // empuja un valor al control original del simulador (su lógica hace el resto)
  function aOriginal(id, v, evento) {
    var e = $(id);
    if (!e) return false;
    if (e.step !== 'any') e.step = 'any';   // si no, el control redondea a su paso (5 L/ha) y se pierde el ajuste fino
    e.value = v;
    e.dispatchEvent(new Event(evento || 'input', { bubbles: true }));
    return true;
  }

  // ---------------------------------------------------------- P06 piloto
  var RAPIDOS = ['FlyMomo', 'Agrícola', 'Comandante', 'Operador T100'];
  function abrirPiloto() {
    var a = app();
    var actual = a ? String(a.pilotName || '').trim().replace(/^piloto\s+/i, '') : '';
    var hoja = abrirHoja('sc-hoja-piloto', cabHoja('Tu perfil', '¿Cómo te llamas?', 88) +
      '<label class="sc-campo"><input id="sc-piloto-in" type="text" maxlength="24" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Escribe tu nombre">' +
      '<span class="sc-cuenta-l" id="sc-piloto-c">0/24</span><button type="button" class="sc-borra" id="sc-piloto-borra" aria-label="Borrar">' + ico('retroceso', 32, { color: '#C9D6CC' }) + '</button></label>' +
      '<div class="sc-chips">' + RAPIDOS.map(function (r) { return '<button type="button" class="sc-chip" data-rapido="' + esc(r) + '">' + esc(r) + '</button>'; }).join('') + '</div>' +
      '<div class="sc-asi"><span class="sc-etq-ch">Así se verá</span><span class="sc-mini"><span class="sc-etq-ch" style="font-size:16px">Piloto</span><span id="sc-piloto-p"></span></span><span id="sc-piloto-m"></span></div>' +
      '<button type="button" class="sc-pri" id="sc-piloto-ok"></button>');
    var inp = $('sc-piloto-in');
    inp.value = actual;
    var pinta = function () {
      var v = inp.value.trim();
      $('sc-piloto-c').textContent = inp.value.length + '/24';
      $('sc-piloto-p').textContent = v || 'Invitado';
      $('sc-piloto-m').textContent = '«¡Bienvenido a bordo, ' + (v || 'Piloto Invitado') + '!»';
      var ok = $('sc-piloto-ok');
      ok.classList.toggle('sc-no', !v);
      ok.textContent = v ? 'Guardar' : 'Escribe tu nombre';
    };
    inp.addEventListener('input', pinta);
    inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); $('sc-piloto-ok').click(); } });
    hoja.addEventListener('click', function (ev) {
      var r = ev.target.closest('[data-rapido]');
      if (r) { inp.value = r.dataset.rapido; pinta(); inp.focus(); return; }
      if (ev.target.closest('#sc-piloto-borra')) { ev.preventDefault(); inp.value = ''; pinta(); inp.focus(); return; }
      if (ev.target.closest('#sc-piloto-ok')) {
        var v = inp.value.trim();
        if (!v || !a) return;
        var orig = a.ui && a.ui.inputPilotName;
        if (orig) { orig.value = v; seguro(function () { a.savePilotName(); }); }
        else { a.pilotName = v; seguro(function () { a.updatePilotHUD(); }); }
        inp.blur();
        cerrarHoja('sc-hoja-piloto');
        sincronizar();
      }
    });
    pinta();
    // la hoja se apoya en el borde de arriba del teclado de Android
    var vv = W.visualViewport;
    var ajusta = function () {
      var h = $('sc-hoja-piloto');
      if (!h || !vv) return;
      var k = parseFloat(getComputedStyle(D.documentElement).getPropertyValue('--sc-k')) || 1;
      var teclado = Math.max(0, W.innerHeight - vv.height - vv.offsetTop);
      h.style.bottom = (teclado / k) + 'px';
    };
    if (vv) { vv.addEventListener('resize', ajusta); vv.addEventListener('scroll', ajusta); }
    setTimeout(function () { inp.focus(); try { inp.setSelectionRange(inp.value.length, inp.value.length); } catch (e) { /* nada */ } }, 80);
  }

  // ---------------------------------------------------------- P07 programar vuelo
  var PARCELAS = [
    { id: 'mp-btn-crop-campo', nombre: 'Campo 2D', w: '2.5 m' },
    { id: 'mp-btn-crop-maiz', nombre: 'Maíz', w: '2.5 m' },
    { id: 'mp-btn-crop-nopal', nombre: 'Nopal', w: '3.0 m' },
    { id: 'mp-btn-crop-naranjo', nombre: 'Naranjos', w: '7.0 m' },
    { id: 'mp-btn-crop-urea', nombre: 'Urea', w: '10 m' }
  ];
  var MAS_PARAM = [
    { id: 'mp-slider-height', prop: 'relativeHeight', nombre: 'Altura sobre el cultivo', uni: 'm', paso: 0.1, dec: 1 },
    { id: 'mp-slider-droplet', prop: 'dropletMicrons', nombre: 'Tamaño de gota', uni: 'µm', paso: 50, dec: 0 },
    { id: 'mp-slider-overshoot', prop: 'overshootMargin', nombre: 'Margen en cabeceras', uni: 'm', paso: 0.5, dec: 1 },
    { id: 'mp-slider-takeoff-alt', prop: 'takeoffAltitude', nombre: 'Altura de despegue y regreso', uni: 'm', paso: 0.5, dec: 1 },
    { id: 'mp-slider-rth-batt', prop: 'rthBatteryThreshold', nombre: 'Regresa a casa con batería de', uni: '%', paso: 1, dec: 0 }
  ];
  var presetElegido = null;
  function abrirProgramar() {
    var a = app(), mp = a && a.missionPlanner;
    if (!mp) return;
    cerrarPanel();
    var modo = { mission: 'Modo Ruta', manual: 'Modo Manual', hover: 'Estacionario' }[(a.drone && a.drone.flightMode) || 'mission'] || 'Modo Ruta';
    var fila = function (key, nombre, extra) {
      return '<div style="display:flex;flex-direction:column;gap:14px"><div class="sc-valor-fila"><span>' + nombre + '</span><span class="sc-valor" id="sc-v-' + key + '"></span></div>' +
        '<div class="sc-ajuste"><button type="button" class="sc-circ" data-menos="' + key + '">' + ico('menos', 36, { color: '#F4F4EF', trazo: 2.2 }) + '</button>' +
        '<div style="flex:1;display:flex" id="sc-d-' + key + '"></div><button type="button" class="sc-circ" data-mas="' + key + '">' + ico('mas', 36, { color: '#F4F4EF', trazo: 2.2 }) + '</button></div>' + (extra || '') + '</div>';
    };
    if (!presetElegido) presetElegido = { default: 'mp-btn-crop-campo', nopal: 'mp-btn-crop-nopal', naranjo: 'mp-btn-crop-naranjo' }[a.activeCropMap] || null;
    var h = cabHoja(modo + ' · ' + esc((a.drone && a.drone.currentModel) || '') + ' · ' + esc(nombrePiloto()), 'Programa tu vuelo', 96) +
      '<div class="sc-hoja-cuerpo">' +
      '<div style="display:flex;flex-direction:column;gap:14px"><div class="sc-valor-fila"><span class="sc-etq">Parcela</span><span class="sc-mono" style="font-size:22px;color:var(--sc-t2)" id="sc-parcela"></span></div>' +
      '<div class="sc-parcelas">' + PARCELAS.map(function (p) { return '<button type="button" data-parcela="' + p.id + '"><b>' + p.nombre + '</b><span>' + p.w + '</span></button>'; }).join('') + '</div></div>' +
      '<div class="sc-fila-bloque"><div><span class="sc-etq" style="font-size:18px">Boquillas</span><b id="sc-boq"></b></div><button type="button" class="sc-chico-btn" id="sc-boq-cambia">Cambiar</button></div>' +
      fila('dosis', 'Dosis') + fila('vel', 'Velocidad') + fila('franja', 'Franja') +
      '<div class="sc-kpis"><div><span class="sc-etq" style="font-size:18px">Caudal</span><b id="sc-k-q"></b></div><div><span class="sc-etq" style="font-size:18px">Vuelos</span><b id="sc-k-v"></b></div>' +
      '<div><span class="sc-etq" style="font-size:18px">Tiempo</span><b id="sc-k-t"></b></div></div>' +
      '<div id="sc-k-aviso"></div>' +
      '<div class="sc-plegable" id="sc-mas-param"><button type="button">Más parámetros<i>' + ico('mas', 32, { color: '#F4F4EF', trazo: 2.2 }) + '</i></button><div class="sc-plegable-c">' +
      MAS_PARAM.map(function (p) { return fila('x' + p.prop, p.nombre); }).join('') + '</div></div>' +
      '</div>' +
      '<button type="button" class="sc-pri" id="sc-programa" style="flex:none">' + ico('despegar', 48, { trazo: 2.4 }) + 'Programar y despegar</button>';
    var hoja = abrirHoja('sc-hoja-prog', h, { alta: true });
    var ctl = {};
    var lim = function (id) { var e = $(id); return e ? { min: +e.min, max: +e.max } : { min: 0, max: 1 }; };
    var conf = {
      dosis: { id: 'mp-slider-dose', prop: 'doseLHa', paso: 0.5 },
      vel: { id: 'mp-slider-speed', prop: 'flightSpeed', paso: 0.1 },
      franja: { id: 'mp-slider-spacing', prop: 'swathSpacing', paso: 0.1 }
    };
    MAS_PARAM.forEach(function (p) { conf['x' + p.prop] = { id: p.id, prop: p.prop, paso: p.paso }; });
    Object.keys(conf).forEach(function (k) {
      var c = conf[k], l = lim(c.id);
      ctl[k] = deslizador($('sc-d-' + k), {
        min: l.min, max: l.max, paso: c.paso, valor: +mp[c.prop] || l.min,
        alCambiar: function (v) { aOriginal(c.id, v); pintarProg(); }
      });
    });
    hoja.querySelectorAll('[data-menos],[data-mas]').forEach(function (b) {
      var k = b.dataset.menos || b.dataset.mas, s = b.dataset.menos ? -1 : 1;
      repetidor(b, function () { ctl[k].paso(s); });
    });
    hoja.addEventListener('click', function (ev) {
      var p = ev.target.closest('[data-parcela]');
      if (p) { presetElegido = p.dataset.parcela; pica(p.dataset.parcela); refrescar(); return; }
      if (ev.target.closest('#sc-mas-param > button')) { $('sc-mas-param').classList.toggle('sc-abierto'); return; }
      if (ev.target.closest('#sc-boq-cambia')) {
        var s = $('mp-nozzle-count');
        if (s && s.options.length > 1) { s.selectedIndex = (s.selectedIndex + 1) % s.options.length; mp.nozzleCount = parseInt(s.value, 10) || mp.nozzleCount; seguro(function () { mp.recalculate(); }); pintarProg(); }
        return;
      }
      if (ev.target.closest('#sc-programa')) {
        cerrarHoja('sc-hoja-prog');
        seguro(function () {
          mp.startMission();
          var dr = a.drone;
          if (dr && !dr.isFlying && dr.missionProgrammed) {      // en tierra: lo mismo que la tecla V (motores y cuenta de 3)
            if (!dr.isArmed) a.handleTakeoffOrRTH();
            if (!a.countdownTimer && !dr.isFlying) a.handleTakeoffOrRTH();
          }
        });
      }
    });
    var refrescar = function () {
      // un preajuste cambia varios valores a la vez: se vuelven a leer del planificador
      Object.keys(conf).forEach(function (k) { ctl[k].poner(+mp[conf[k].prop]); });
      pintarProg();
    };
    refrescar();
  }
  function pintarProg() {
    var a = app(), mp = a && a.missionPlanner;
    if (!mp || !$('sc-hoja-prog')) return;
    var k = mp.kpis || {}, hy = k.hydro || {};
    var esparce = (a.drone && a.drone.payloadType === 'spreader') || a.payloadType === 'spreader';
    var uq = esparce ? 'kg/min' : 'L/min', ud = esparce ? 'kg/ha' : 'L/ha';
    var html = function (id, v) { var e = $(id); if (e) e.innerHTML = v; };
    html('sc-v-dosis', (+mp.doseLHa).toFixed(1) + '<small> ' + ud + '</small>');
    html('sc-v-vel', (+mp.flightSpeed).toFixed(1) + '<small> m/s · ' + (mp.flightSpeed * 3.6).toFixed(1) + ' km/h</small>');
    html('sc-v-franja', (+mp.swathSpacing).toFixed(1) + '<small> m</small>');
    MAS_PARAM.forEach(function (p) { html('sc-v-x' + p.prop, (+mp[p.prop]).toFixed(p.dec) + '<small> ' + p.uni + '</small>'); });
    html('sc-k-q', (hy.Q != null ? (+hy.Q).toFixed(1) : '--') + '<small> ' + uq + '</small>');
    html('sc-k-v', esc(k.flightsNeeded != null ? k.flightsNeeded : (k.singleFlightSufficient ? 1 : '--')));
    html('sc-k-t', esc(k.timeMin != null ? k.timeMin : '--') + '<small> min</small>');
    var b = k.bounds;
    html('sc-parcela', b ? esc(sinEmoji(b.name || '').split('(')[0].trim()) + ' · ' + (+k.totalAreaHa || +b.areaHa || 0).toFixed(1) + ' ha' : '');
    html('sc-k-aviso', hy.isExceeded ? '<div class="sc-nota-atn">' + ico('alerta', 36) + '<span>El caudal pasa el máximo de las boquillas (' + hy.maxQ + ' ' + uq + '). Baja la velocidad o la dosis.</span></div>' : '');
    var s = $('mp-nozzle-count'), o = s && s.options[s.selectedIndex];
    if (o) {
      var t = sinEmoji(o.textContent), nom = t.split('(')[0].replace(/\bBoquillas\s+/i, '').trim(), mx = t.match(/Caudal M[aá]x[^:]*:\s*([\d.]+)\s*([A-Za-z/]+)/);
      html('sc-boq', esc(nom) + (mx ? ' <span class="sc-mono" style="font-size:22px;color:var(--sc-t2)">· máx. ' + (+mx[1]) + ' ' + esc(mx[2]) + '</span>' : ''));
      var cb = $('sc-boq-cambia'); if (cb) cb.hidden = s.options.length < 2;
    }
    var hoja = $('sc-hoja-prog');
    hoja.querySelectorAll('[data-parcela]').forEach(function (p) { p.classList.toggle('sc-on', p.dataset.parcela === presetElegido); });
  }

  // ---------------------------------------------------------- P08 ayuda
  function abrirAyuda() {
    var palanca = function (titulo, arr, ab, izq, der) {
      return '<div class="sc-palanca"><span class="sc-etq">' + titulo + '</span><span>' + arr + '</span><div class="sc-palanca-fila"><span>' + izq + '</span>' +
        '<div class="sc-stick">' + ico('palancas', 214, { color: '#7AC244', trazo: 0.7 }) + '<i></i></div><span>' + der + '</span></div><span>' + ab + '</span></div>';
    };
    var accion = function (ic, t, d) { return '<div class="sc-accion"><i>' + ico(ic, 40, { color: '#7AC244' }) + '</i><div><b>' + t + '</b><span>' + d + '</span></div></div>'; };
    var tecla = function (ks, txt) { return '<div><span>' + ks.map(function (k) { return '<span class="sc-tecla">' + k + '</span>'; }).join('') + '</span><span>' + txt + '</span></div>'; };
    var h = cabHoja('Ayuda', 'Cómo volar', 104) + '<div class="sc-hoja-cuerpo">' +
      '<div class="sc-palancas">' + palanca('Palanca izquierda', 'Subir', 'Bajar', 'Girar', 'Girar') + palanca('Palanca derecha', 'Adelante', 'Atrás', 'Izq.', 'Der.') + '</div>' +
      '<div>' + accion('despegar', 'Despegar', 'Toca el botón de despegue del control. Cuenta 3 y sube.') +
      accion('casa', 'Regresar a casa', 'El mismo botón lo regresa y aterriza en el helipuerto.') +
      accion('rociar', 'Rociar', 'Botón de bomba: enciende o apaga la aspersión.') + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:16px"><div style="display:flex;align-items:center;gap:14px">' + ico('control', 32, { color: '#C9D6CC' }) +
      '<span class="sc-etq">Con teclado o control</span></div><div class="sc-teclas">' +
      tecla(['V', 'Espacio'], 'Despegar / regresar') + tecla(['W', 'S'], 'Subir / bajar') + tecla(['A', 'D'], 'Girar') + tecla(['↑', '↓'], 'Adelante / atrás') +
      tecla(['←', '→'], 'Izquierda / derecha') + tecla(['P'], 'Bomba') + tecla(['Tab'], 'Abrir panel') + tecla(['N', 'L'], 'Noche / luces') + '</div></div>' +
      '<div class="sc-plegable" id="sc-formulas"><button type="button">Fórmulas del simulador<i>' + ico('mas', 32, { color: '#F4F4EF', trazo: 2.2 }) + '</i></button>' +
      '<div class="sc-plegable-c sc-formulas" id="sc-formulas-c"></div></div></div>';
    var hoja = abrirHoja('sc-hoja-ayuda', h, { alta: true });
    hoja.addEventListener('click', function (ev) {
      if (!ev.target.closest('#sc-formulas > button')) return;
      var p = $('sc-formulas'), c = $('sc-formulas-c');
      if (!c.childNodes.length) {
        // el texto de fórmulas y cultivos es el del simulador de Josué (después de su tabla de teclas)
        var orig = D.querySelector('#help-modal .modal-content'), tabla = orig && orig.querySelector('.help-table');
        var tomar = false;
        if (orig) Array.prototype.forEach.call(orig.children, function (n) {
          if (tabla && (n === tabla || n.contains(tabla))) { tomar = true; return; }
          if (tomar) c.appendChild(n.cloneNode(true));
        });
        c.querySelectorAll('[style]').forEach(function (n) { n.removeAttribute('style'); });
        c.querySelectorAll('button, [id]').forEach(function (n) { if (n.tagName === 'BUTTON') n.remove(); else n.removeAttribute('id'); });
        limpiarTexto(c);
        if (!c.childNodes.length) c.textContent = 'Sin fórmulas en esta versión del simulador.';
      }
      p.classList.toggle('sc-abierto');
    });
  }

  // ---------------------------------------------------------- P11 créditos
  function abrirCreditos() {
    cerrarPanel();
    var nombres = Array.prototype.map.call(D.querySelectorAll('#credits-modal .credits-item'), function (n) { return sinEmoji(n.textContent); }).filter(Boolean);
    var ver = sinEmoji(($('version-badge') || {}).textContent || '').replace(/^v/i, '').replace(/\s+/, ' · ').toLowerCase();
    var h = cabHoja('FlyMomo <span class="sc-mono" style="letter-spacing:0">' + esc((ver.split(' ')[0]) || '3.0') + '</span>', 'Créditos', 104) +
      '<div class="sc-creditos">' +
      '<div><span>Para</span><span>DTS · Drone Technology Solutions, distribuidor DJI Agras en México</span></div>' +
      '<div><span>Aeronaves</span><span>DJI Agras T25P, T55, T70P y T100</span></div>' +
      '<div><span>Desarrollo</span><span class="sc-lista" style="color:var(--sc-t2)">' + nombres.map(function (n) { return '<span>' + esc(n) + '</span>'; }).join('') + '</span></div>' +
      '<div><span>Versión</span><span class="sc-mono" style="font-size:28px;font-weight:500">' + esc(ver || '3.0') + '</span></div></div>' +
      '<span style="font-size:22px;line-height:1.45;color:var(--sc-t3)">DJI y Agras son marcas de SZ DJI Technology Co., Ltd. Simulador de demostración; no sustituye la capacitación de piloto.</span>' +
      '<button type="button" class="sc-pri" data-cierra>Volver al vuelo</button>';
    abrirHoja('sc-hoja-creditos', h);
  }

  // ============================================================ PANEL LATERAL (P05)
  var panelCtl = null;
  function abrirPanel() {
    var a = app();
    if (!a || $('sc-panel')) return;
    cerrarZoomControl(true);
    var segDron = '<div class="sc-seg" style="grid-template-columns:repeat(4,1fr)">' + DRONES.map(function (d) { return '<button type="button" data-p-dron="' + d.id + '">' + d.id + '</button>'; }).join('') + '</div>';
    var segCarga = '<div class="sc-seg" style="grid-template-columns:1fr 1fr"><button type="button" data-p-carga="liquid">Aspersión <span class="sc-mono" id="sc-p-l"></span></button>' +
      '<button type="button" data-p-carga="spreader">Esparcidor <span class="sc-mono" id="sc-p-s"></span></button></div>';
    var segCult = '<div class="sc-seg" style="grid-template-columns:repeat(4,1fr);border-radius:44px">' + ESCENARIOS.map(function (e) { return '<button type="button" data-p-cult="' + e.id + '" style="font-size:22px">' + e.corto + '</button>'; }).join('') + '</div>';
    var h = '<div id="sc-panel-velo" class="sc-toca"></div><div id="sc-panel">' +
      '<div class="sc-panel-cab"><span class="sc-tit">Ajustes</span><button type="button" class="sc-circ" id="sc-panel-x" aria-label="Cerrar">' + ico('regresar', 40, { color: '#F4F4EF' }) + '</button></div>' +
      '<div class="sc-panel-cuerpo">' +
      '<div class="sc-bloque"><span class="sc-etq">Aeronave</span>' + segDron + segCarga + '</div><div class="sc-sep"></div>' +
      '<div class="sc-bloque"><div class="sc-bloque-cab"><span class="sc-etq">Cultivo</span><button type="button" class="sc-chico-btn" id="sc-p-mapa">' + ico('mapa', 28) + 'Cambiar mapa</button></div>' + segCult + '</div><div class="sc-sep"></div>' +
      '<div class="sc-rc"><div><span class="sc-etq">Control remoto</span><span class="sc-rc-estado" id="sc-p-rc"><i></i><span id="sc-p-rc-t">Sin conexión</span><small>DJI RC / USB</small></span></div>' +
      '<button type="button" class="sc-sec" id="sc-p-calibrar">' + ico('config', 32) + 'Calibrar</button></div><div class="sc-sep"></div>' +
      '<div class="sc-bloque" style="gap:18px"><span class="sc-etq">Dosificación</span>' +
      '<div class="sc-seg" style="grid-template-columns:1fr 1fr"><button type="button" data-p-modo="dose">Dosis <span class="sc-mono" id="sc-p-ud">L/ha</span></button><button type="button" data-p-modo="flow">Caudal <span class="sc-mono" id="sc-p-uq">L/min</span></button></div>' +
      '<div class="sc-valor-fila"><span style="font-size:24px;font-weight:700;color:var(--sc-t2)" id="sc-p-gl">Dosis objetivo</span><span class="sc-valor" style="font-size:52px" id="sc-p-gv"></span></div>' +
      '<div id="sc-p-desl" style="display:flex"></div>' +
      '<div class="sc-preaj" id="sc-p-pre">' + [15, 30, 50, 70, 100].map(function (v) { return '<button type="button" data-p-pre="' + v + '">' + v + '</button>'; }).join('') + '</div>' +
      '<div class="sc-valor-fila" style="padding-top:8px"><span style="font-size:24px;font-weight:700;color:var(--sc-t2)" id="sc-p-rl">Caudal resultante</span><span class="sc-valor" style="font-size:36px" id="sc-p-rv"></span></div></div><div class="sc-sep"></div>' +
      '<div class="sc-agua"><div><b>Agua teñida de azul</b><span>Apágalo para ver solo lo mojado.</span></div><button type="button" class="sc-switch" id="sc-p-agua" aria-label="Agua teñida de azul"><i></i></button></div><div class="sc-sep"></div>' +
      '<div class="sc-agua"><div><b>Pantalla completa</b><span>Ocupa toda la pantalla de 24" sin barras del navegador.</span></div><button type="button" class="sc-switch" id="sc-p-fs" aria-label="Pantalla completa"><i></i></button></div><div class="sc-sep"></div>' +
      '<div class="sc-bloque"><span class="sc-etq">Más ajustes</span><div id="sc-mas"></div></div>' +
      '<div class="sc-panel-pie"><button type="button" class="sc-sec" id="sc-p-creditos">Créditos</button></div>' +
      '</div></div>';
    raiz.insertAdjacentHTML('beforeend', h);
    raiz.classList.add('sc-con-panel');
    // lo demás del panel original (tanque, batería, viento, radar, RTH, noche, ruta, casos...) se muda aquí con su lógica intacta
    var mas = $('sc-mas'), secc = D.querySelector('.sidebar-sections');
    if (secc) {
      mas.appendChild(secc);
      ['btn-mode-dose', 'group-target-dose', 'group-flow-rate', 'disp-flow-calc-hint', 'toggle-water-color', 'group-mass-tank-sliders'].forEach(function (id) {
        var e = $(id); if (!e) return;
        var g = e.closest('.control-group') || e;
        if (secc.contains(g) && g !== secc) g.classList.add('sc-oculto');
      });
      if (!secc.__sc) { secc.__sc = true; vigilarEmojis(secc); }
    }
    var panel = $('sc-panel');
    var gl = $('sc-p-desl');
    panelCtl = deslizador(gl, { min: 5, max: 350, paso: 1, valor: 70, alCambiar: function (v) {
      var flujo = a.sprayControlMode === 'flow';
      aOriginal(flujo ? 'slider-flow-rate' : 'slider-target-dose', v);
      sincronizarPanel();
    } });
    panel.addEventListener('click', function (ev) {
      var t;
      if (ev.target.closest('#sc-panel-x')) { cerrarPanel(); return; }
      if ((t = ev.target.closest('[data-p-dron]'))) { pica('btn-model-' + t.dataset.pDron.toLowerCase()); }
      else if ((t = ev.target.closest('[data-p-carga]'))) { pica(t.dataset.pCarga === 'liquid' ? 'btn-t100-payload-liquid' : 'btn-t100-payload-spreader'); }
      else if ((t = ev.target.closest('[data-p-cult]'))) { pica(D.querySelector('.crop-pill-btn[data-crop="' + t.dataset.pCult + '"]')); }
      else if (ev.target.closest('#sc-p-mapa')) { pica('btn-switch-crop-map'); }
      else if (ev.target.closest('#sc-p-calibrar')) { pica('btn-sidebar-rc-calibrar'); }
      else if ((t = ev.target.closest('[data-p-modo]'))) { pica(t.dataset.pModo === 'dose' ? 'btn-mode-dose' : 'btn-mode-flow'); }
      else if ((t = ev.target.closest('[data-p-pre]'))) { aOriginal(a.sprayControlMode === 'flow' ? 'slider-flow-rate' : 'slider-target-dose', +t.dataset.pPre); }
      else if (ev.target.closest('#sc-p-agua')) { var c = $('toggle-water-color'); if (c) { c.checked = !c.checked; c.dispatchEvent(new Event('change', { bubbles: true })); } }
      else if (ev.target.closest('#sc-p-fs')) { alternarPantallaCompleta(); }
      else if (ev.target.closest('#sc-p-creditos')) { abrirCreditos(); return; }
      else return;
      setTimeout(sincronizarPanel, 60);
    });
    $('sc-panel-velo').addEventListener('click', cerrarPanel);
    cache = {};
    sincronizarPanel();
  }
  function cerrarPanel() {
    var p = $('sc-panel'), v = $('sc-panel-velo');
    if (!p) return;
    p.classList.add('sc-sale'); p.removeAttribute('id');
    if (v) v.remove();
    raiz.classList.remove('sc-con-panel');
    setTimeout(function () {
      // el contenido original se queda vivo dentro del panel oculto para la próxima vez
      var secc = p.querySelector('.sidebar-sections'), cont = D.querySelector('#sidebar-control .sidebar-content');
      if (secc && cont) cont.appendChild(secc);
      p.remove();
    }, 300);
    panelCtl = null;
  }
  function sincronizarPanel() {
    var a = app(), p = $('sc-panel');
    if (!a || !p) return;
    var on = function (sel, v) { p.querySelectorAll(sel).forEach(function (b) { b.classList.toggle('sc-on', v(b)); }); };
    var dron = a.drone && a.drone.currentModel;
    on('[data-p-dron]', function (b) { return b.dataset.pDron === dron; });
    var carga = (a.drone && a.drone.payloadType) || a.payloadType || 'liquid';
    on('[data-p-carga]', function (b) { return b.dataset.pCarga === carga || (b.dataset.pCarga === 'liquid' && carga === 'cargo'); });
    var cap = function (id) { var e = $(id), m = e && sinEmoji(e.textContent).match(/\((\d+(?:\.\d+)?)\s*(L|kg)/i); return m ? m[1] + ' ' + m[2].replace(/^l$/i, 'L').toLowerCase().replace('l', 'L') : ''; };
    var l = $('sc-p-l'), s = $('sc-p-s');
    if (l) l.textContent = cap('btn-t100-payload-liquid');
    if (s) s.textContent = cap('btn-t100-payload-spreader');
    on('[data-p-cult]', function (b) { return b.dataset.pCult === a.activeCropMap; });
    var rcT = sinEmoji(($('hud-rc-text') || {}).textContent || 'Sin conexión');
    var conectado = !!(a.rcController && a.rcController.connected);
    var rc = $('sc-p-rc'); if (rc) rc.classList.toggle('sc-on', conectado);
    var rct = $('sc-p-rc-t'); if (rct) rct.textContent = rcT;
    var esparce = carga === 'spreader';
    var ud = esparce ? 'kg/ha' : 'L/ha', uq = esparce ? 'kg/min' : 'L/min';
    $('sc-p-ud').textContent = ud; $('sc-p-uq').textContent = uq;
    var flujo = a.sprayControlMode === 'flow';
    on('[data-p-modo]', function (b) { return b.dataset.pModo === (flujo ? 'flow' : 'dose'); });
    var sl = $(flujo ? 'slider-flow-rate' : 'slider-target-dose');
    var v = sl ? +sl.value : 0;
    if (sl && panelCtl) { panelCtl.limites(+sl.min, +sl.max, +sl.step || 1); panelCtl.poner(v); }
    $('sc-p-gl').textContent = flujo ? 'Caudal fijo' : 'Dosis objetivo';
    $('sc-p-gv').innerHTML = (flujo ? v.toFixed(1) : Math.round(v)) + '<small> ' + (flujo ? uq : ud) + '</small>';
    $('sc-p-pre').style.display = flujo ? 'none' : '';
    on('[data-p-pre]', function (b) { return !flujo && +b.dataset.pPre === Math.round(v); });
    $('sc-p-rl').textContent = flujo ? 'Dosis resultante' : 'Caudal resultante';
    var res = '';
    if (flujo) { var hint = sinEmoji(($('disp-flow-calc-hint') || {}).textContent || ''), m = hint.match(/Dosis[^:]*:\s*([\d.]+)/i); res = m ? (+m[1]).toFixed(1) + '<small> ' + ud + '</small>' : '--'; }
    else { var q = sinEmoji(($('disp-flow-rate') || {}).textContent || ''), mq = q.match(/([\d.]+)/); res = mq ? (+mq[1]).toFixed(1) + '<small> ' + uq + '</small>' : '--'; }
    $('sc-p-rv').innerHTML = res;
    var agua = $('toggle-water-color'); $('sc-p-agua').classList.toggle('sc-on', !!(agua && agua.checked));
    var fsSw = $('sc-p-fs'); if (fsSw) fsSw.classList.toggle('sc-on', esPantallaCompleta());
  }

  // ============================================================ ARRANQUE
  function iniciar() {
    D.body.appendChild(raiz);
    pedirPantallaCompleta();
    D.documentElement.classList.add('sc-eligiendo');
    sel = D.createElement('div');
    sel.id = 'sc-sel';
    raiz.appendChild(sel);
    var reintento = guardado('dts-surco-reintento'), volver = guardado('dts-surco-volver');
    guardado('dts-surco-volver', null);
    // propuesta 4 (Josué, 7-nov): el nombre del piloto dura solo lo que dura el visitante.
    // Se conserva al reintentar o al "Cambiar vuelo"; en cualquier otra entrada se borra
    // antes de armar el simulador (él lo lee al nacer).
    var mismoVisitante = !!((volver && volver.piloto) || (reintento && reintento.dron));
    if (!mismoVisitante) { try { localStorage.removeItem('flymomo_pilot_name'); } catch (e) { /* sin almacenamiento */ } }
    if (volver && volver.dron) SEL = { dron: volver.dron, cultivo: volver.cultivo, modo: null };
    if (reintento && reintento.dron && reintento.modo) {
      guardado('dts-surco-reintento', null);
      SEL = reintento;
      arrancar();
    } else if (volver && volver.paso === 2 && SEL.dron && SEL.cultivo) {
      pintarP02('');
    } else {
      pintarP01('');
    }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();

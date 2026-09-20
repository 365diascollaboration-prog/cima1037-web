/* ═══════════════════════════════════════════════════════════════
   CIMA 103.7 · Service Worker mínimo — PWA instalable
   Cache-first para estáticos · network-first para HTML (navegación)
   Sin librerías. No cachea: stream de radio, POST, media range.
   ═══════════════════════════════════════════════════════════════ */
const CACHE = "cima-pwa-v1";

/* Shell esencial precacheado (todo same-origin, rutas relativas al subpath de Pages) */
const PRECACHE = [
  "./",
  "./index.html",
  "./data.js",
  "./manifest.json",
  "./assets/logo-3d-cima.webp",
  "./assets/logo-3d-cima.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/icon-192-maskable.png",
  "./assets/icon-512-maskable.png",
  "./assets/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;

  /* POST (formularios) y demás: directo a la red, sin interferir */
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch { return; }

  /* Streaming de radio y envío de formularios: NUNCA cachear */
  if (/eleden\.net|streamlock\.net|formsubmit\.co/.test(url.hostname)) return;
  /* Media range requests (video de cobertura): al navegador */
  if (req.headers.has("range")) return;

  /* ── Navegación (HTML): network-first, fallback a caché/shell ── */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  /* ── Estáticos: cache-first, con reposición en background ──
     same-origin (assets, data.js, íconos) + fuentes de Google (estables por URL) */
  e.respondWith(
    caches.match(req).then((cached) => {
      const esCacheable = (res) =>
        res && (res.ok || res.type === "opaque") &&
        (url.origin === self.location.origin ||
         /fonts\.(googleapis|gstatic)\.com/.test(url.hostname));

      const fetching = fetch(req)
        .then((res) => {
          if (esCacheable(res)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);

      return cached || fetching;
    })
  );
});

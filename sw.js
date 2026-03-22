/* TradeBaby Pro v11 — Service Worker */
const CACHE = 'pipstart-v11';
const CORE = ['./','./index.html','./manifest.json','./icons/icon.svg','./offline.html',
  './css/theme.css','./css/components.css','./css/screens.css',
  './js/app.js','./js/state.js','./js/data.js','./js/curriculum.js','./js/chatbot.js',
  './js/notifications.js','./js/v8_systems.js','./js/case_studies.js',
  './js/analysis_guides.js',
  './js/trading_encyclopedia.js',
  './js/market_data_extended.js',
  './js/quiz_bank.js',
  './js/extended_content.js',
  './js/ai_brain.js',
  './js/screens/home.js','./js/screens/learn.js','./js/screens/trade.js',
  './js/screens/journal.js','./js/screens/mentor.js','./js/screens/profile.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(CORE.map(u => c.add(u).catch(()=>{}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        if (res && res.ok && res.type !== 'opaque') {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => null);
      return cached || net || caches.match('./offline.html');
    })
  );
});

self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'TradeBaby Pro',body:'Time to trade!'};
  e.waitUntil(self.registration.showNotification(d.title, {
    body: d.body, icon:'./icons/icon-192.png', badge:'./icons/icon-192.png', vibrate:[200,100,200]
  }));
});

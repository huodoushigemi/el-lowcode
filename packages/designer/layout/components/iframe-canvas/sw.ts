self.addEventListener('activate', e => {
    clients.claim();
})

self.addEventListener('fetch', (e: { request: Request }) => {
  const url = new URL('./_template.asset.html', location.href).href
  if (e.request.url == url) {
    e.respondWith(
      new Response(new Blob([template], { type: 'text/html' }))
    )
  }
})

let template
self.addEventListener('message', e => {
  const [type, data] = e.data
  if (type == 'template') template = data.replace(`<script type="module" src="/@vite/client"></script>`, '')
  e.source!.postMessage([type + '_cb'])
})
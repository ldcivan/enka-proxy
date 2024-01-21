addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  const parts = path.split('/')

  // 提取 uid
  const uid = parts[2]

  // 构建要请求的 URL
  let apiUrl = ''

  if (parts[1] === 'gi') {
    apiUrl = `https://enka.network/u/${uid}/__data.json?x-sveltekit-invalidated=01`
  } else if (parts[1] === 'hsr') {
    apiUrl = `https://enka.network/hsr/${uid}/__data.json?x-sveltekit-invalidated=01`
  } else {
    return new Response('Invalid path, here is correct example: /{gi/hsr}/{uid}', { status: 400 })
  }

  // 构建新的请求头
  const headers = new Headers(request.headers)
  headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36')
  headers.set('Accept', 'application/json')
  headers.set('Accept-Language', 'en-US,en;q=0.9')
  headers.set('Referer', 'https://enka.network')

  // 发起请求并返回响应
  const response = await fetch(apiUrl, {
    headers: headers,
  })
  const data = await response.text()

  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

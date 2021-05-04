$(function() {
  const hash = '[hash]'
  const devMode = window.location.hostname.split('.').reverse()[0] === 'ws'

  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = devMode ? 'http://savchenko.sl:3000/bundle.js' : 'https://danjises.github.io/tilda-head/dist/bundle.' + hash + '.js'

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = devMode ? 'http://savchenko.sl:3000/bundle.css' : 'https://danjises.github.io/tilda-head/dist/bundle.' + hash + '.css'

  $('body').append([script, link])
})

import './style.scss'

const __sCTA = {
  text: 'КЛИКАЙ СЮДА',
  link: 'https://savchenko.dev',
  newWindow: true,
  primaryColor: '#ffe100',
  textColor: '#000',
  ctaDelay: 3, // sec
  recId: '#rec301537474',
  ...(window.sCTA || {}),
}

$(function() {
  const $rec = $(__sCTA.recId).hide()
  const $video = $rec.find('video')
  const [video] = $video.get()

  video.muted = true
  video.loop = true
  video.autoplay = true
  video.controls = false

  video.play()

  let ctaTimerId = null
  let lastTime = 0

  const $styles = `
    <style>
      .s-head.active { border-color: ${__sCTA.primaryColor} !important; }
      .s-head:hover:not(.active) { border-color: ${__sCTA.primaryColor} !important; }
      .s-head .s-close::after, .s-head .s-close::before {
        background: ${__sCTA.primaryColor} !important;
      }
      .s-head .s-minimize { border-color: ${__sCTA.primaryColor} !important; }
      .s-head .s-cta {
        color: ${__sCTA.textColor} !important;
        background: ${__sCTA.primaryColor} !important;
      }
    </style>
  `

  const $widget = $(`
    <div class="s-head" style="border-color: ${__sCTA.border};">
      <div class="s-close"></div>
      <div class="s-minimize"></div>
      <a class="s-cta t-text" href="${__sCTA.link}"
        ${__sCTA.newWindow ? 'target="_blank"' : ''}
      >
        ${__sCTA.text}
      </a>
    </div>
  `)
      .on('click', ':not(.s-cta)', function(e) {
        video.play()

        if ($widget.hasClass('active')) return

        video.muted = false
        video.currentTime = lastTime

        $widget.addClass('active')

        ctaTimerId = window.setTimeout(() => $widget.find('.s-cta').fadeIn(), __sCTA.ctaDelay * 1000)
      })
      .on('click', '.s-close', function(e) {
        e.preventDefault()
        e.stopPropagation()
        $widget.remove();
      })
      .on('click', 'video', function(e) {
        e.preventDefault()
      })
      .on('click', '.s-minimize', function(e) {
        e.preventDefault()
        e.stopPropagation()
        video.muted = true
        $widget.removeClass('active')
        $widget.find('.s-cta').hide();
        window.clearInterval(ctaTimerId)
        lastTime = video.currentTime
      })
      .on('click', '.s-cta', function() {
        video.pause()
      })

  $widget.append($video)

  $('body').append($widget)
  $('body').append($styles)
})


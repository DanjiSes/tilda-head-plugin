import './style.scss'

const __sCTA = window.sCTA || {
  text: 'КЛИКАЙ СЮДА',
  link: 'https://savchenko.dev',
  newWindow: true,
  background: '#ffe100',
  color: '#000',
  ctaDelay: 3, // sec
  recId: '#rec301537474',
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

  const $widget = $(`
    <div class="s-head">
      <div class="s-close"></div>
      <div class="s-minimize"></div>
      <a class="s-cta t-text" href="${__sCTA.link}"
         style="
          color: ${__sCTA.color};
          background: ${__sCTA.background};
         "
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
})


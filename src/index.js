import './style.scss'

const __sCTA = window.sCTA || {
  text: 'КЛИКАЙ СЮДА',
  link: 'https://savchenko.dev',
  newWindow: true,
  background: '#ffe100',
  color: '#000',
  ctaDelay: 3, // sec
}

$(function() {
  const $rec = $('#rec301537474').hide()
  const $video = $rec.find('video')
  const [video] = $video.get()

  video.muted = true
  video.loop = true
  video.autoplay = true
  video.controls = false

  console.log(video);

  video.play()

  let ctaTimerId = null

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
      .on('click', function(e) {
        video.muted = false
        $widget.addClass('active')

        video.currentTime = 0
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
      })

  $widget.append($video)

  $('body').append($widget)
})


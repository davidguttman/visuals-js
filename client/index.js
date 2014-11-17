var earstream = require('earstream')

var BeatDetector = require('./beat-detector')
var GiphyQ = require('./giphyq')

var giphyQ = new GiphyQ('mrdiv')

beatTest()

function beatTest () {
  var beatView = document.createElement('div')
  beatView.className = 'beatView'
  document.body.appendChild(beatView)

  var bd = BeatDetector()
  var es = earstream(3)
  es.pipe(bd)

  bd.on('data', function(isBeat) {
    var child = beatView.children[0]
    if (child) beatView.removeChild(child)

    var video = giphyQ.getVideo()
    if (video) {
      video.play()
      beatView.appendChild(video)
      var rect = video.getBoundingClientRect()
      if (rect.height > window.innerHeight) {
        var offset = (rect.height - window.innerHeight)/2
        video.style.top = -offset + 'px'
      }
    }
  })
}


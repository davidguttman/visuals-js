var earstream = require('earstream')

var BeatDetector = require('./beat-detector')
var GiphyQ = require('./giphyq')

var giphyQ = new GiphyQ('mrdiv')

beatTest()

function beatTest () {
  var beatView = document.createElement('div')
  document.body.appendChild(beatView)

  var bd = BeatDetector()
  var es = earstream(3)
  es.pipe(bd)

  bd.on('data', function(isBeat) {
    beatView.innerHTML = ''
    var video = giphyQ.getVideo()
    if (video) {
      video.play()
      beatView.appendChild(video)
    }
  })
}


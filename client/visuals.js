var earstream = require('earstream')

var BeatDetector = require('./beat-detector')
var GiphyQ = require('./giphyq')

var queues = [
  // new GiphyQ('aftereffects')
  new GiphyQ('89a')
  // new GiphyQ('boglio')
  // new GiphyQ('29thfloor')
]

var curQ = 0

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

    var giphyQ = queues[curQ]
    curQ += 1
    if (curQ >= queues.length) curQ = 0

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


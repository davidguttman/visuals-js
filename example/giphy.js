var earstream = require('earstream')

var BeatDetector = require('../lib/beat-detector')
var GiphyQ = require('../lib/giphyq')

var giphyQ = new GiphyQ('trippy')

beatTest()

function beatTest () {
  var beatView = document.createElement('div')
  document.body.appendChild(beatView)

  var bd = BeatDetector()
  var es = earstream(3)
  es.pipe(bd)

  bd.on('data', function(isBeat) {

  })
}


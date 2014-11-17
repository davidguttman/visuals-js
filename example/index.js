var earstream = require('earstream')
var nBars = 4
var es = earstream(nBars)

var BeatDetector = require('../lib/beat-detector')

beatTest()
barsTest()

function beatTest () {
  var beatView = document.createElement('div')
  document.body.appendChild(beatView)
  beatView.style.height = '100px'
  beatView.style.width = '100px'
  beatView.style.background = 'grey'
  beatView.style.border = '1px solid black'

  var bd = BeatDetector()
  var es2 = earstream(3)
  es2.pipe(bd)

  var nBeats = 0

  bd.on('data', function(isBeat) {
    console.log('isBeat', isBeat);
    nBeats += 1
    if (nBeats % 2 === 0) {
      beatView.style.background = 'red'
    } else {
      beatView.style.background = 'blue'
    }
  })
}

function barsTest () {

  var bars = []

  for (var i = nBars; i > 0; i--) {
    var bar = document.createElement('div')
    bar.style.height = '20px'
    bar.style.background = 'steelblue'
    bar.style.border = '1px solid white'
    bars.push(bar)
    document.body.appendChild(bar)
  };


  es.on('data', function(data) {
    data.norm.forEach(function(v, i) {
      bars[i].style.width = v * 100 + '%'
    })
  })
}

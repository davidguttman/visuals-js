var through = require('through2')

var refrac = 250
var minThreshold = 0.3
var decay = 0.002

module.exports = function BeatDetector () {
  var t0 = Date.now()

  var currentThreshold = minThreshold

  var stream = through.obj(function(data, enc, cb) {
    currentThreshold -= decay

    var t1 = Date.now()
    var inCooldown = (t1 - t0) < refrac
    var mag = data.norm[2]

    if (inCooldown) {
      if (mag > currentThreshold) currentThreshold = mag
      return cb()
    }

    var isBeat = (mag > minThreshold) && (mag > currentThreshold)

    if (isBeat) {
      t0 = t1
      currentThreshold = mag
      this.push(true)
    }

    cb()
  })

  return stream
}

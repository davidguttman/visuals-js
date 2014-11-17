var async = require('async')
var through = require('through2')

var searchGiphy = require('./giphy')

module.exports = GiphyQ

function GiphyQ (term) {
  this.term = term
  this.init(term)

  this.playStats = {}
  this.loaded = []

  return this
}

GiphyQ.prototype.init = function(term) {
  var self = this

  searchGiphy(term, function(err, results) {
    if (err) return console.error(err)

    var load = function(result, cb) {
      self.preload(result, function(err, video) {
        self.loaded.push(video)
        cb(null, video)
      })
    }

    async.mapLimit(results, 1, load, function() {})
  })
}

GiphyQ.prototype.preload = function(image, cb) {
  var loaded = false
  var video = document.createElement('video')
  video.src = image.mp4
  video.preload = 'auto'
  video.loop = true

  video.addEventListener('canplaythrough', function(evt) {
    if (!loaded) cb(null, video)
    loaded = true
  })

  video.addEventListener('error', function(evt) {
    cb(video.error)
  })
}

GiphyQ.prototype.getVideo = function() {
  var video = this.loaded.shift()
  if (!video) return null

  this.playStats[video.src] = this.playStats[video.src] || 0
  this.playStats[video.src] += 1
  if (this.playStats[video.src] >= 4) {
    this.playStats[video.src] = 0
    this.loaded.push(video)
  } else {
    var i = this.playStats[video.src] * 2
    this.loaded.splice(i, 0, video)
  }

  return video
}

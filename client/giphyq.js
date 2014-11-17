var map = require('map-async')
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
      })
    }

    map(results, load)
  })
}

GiphyQ.prototype.preload = function(image, cb) {
  var video = document.createElement('video')
  video.src = image.mp4
  video.preload = 'auto'
  video.loop = true

  video.addEventListener('canplaythrough', function(evt) {
    cb(null, video)
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

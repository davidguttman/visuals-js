require('./bootstrap')
var mercury = require('mercury')

var h = mercury.h
var struct = mercury.struct
var array = mercury.array
var value = mercury.value

module.exports = Admin

function Admin (el) {
  this.state = struct({
    results: array([]),
    queue: array([]),
    currentClipUrl: value('')
  })

  mercury.app(el, this.state, this.render.bind(this))

  return this
}

Admin.prototype.render = function(state) {
  var html = h('.admin.container', [
    h('.currentQueue', 'cur queue'),
    this.renderAddView(state)
  ])

  return html
}

Admin.prototype.renderAddView = function(state) {
  var self = this
  var clipSrc = this.createSrc(state.currentClipUrl)
  var video = h('video', {src: clipSrc, autoplay: true, loop: true})

  var html = h('.addToQueue', [
    h('.row', [
      h('input.form-control', {
        placeholder: 'http://giphy.com/gifs/sunset-8bit-69jKrVTKI10w8',
        'ev-keyup': function(evt) {
          var val = evt.currentTarget.value
          self.state.currentClipUrl.set(val)
        }
      })
    ]),
    h('.preview.row', [
      video
    ]),
    h('.add.row', [
      h('a.btn.btn-default', 'Add')
    ])
  ])
  return html
}

Admin.prototype.createSrc = function(url) {
  if (url.match(/giphy\.com\/gifs/)) {
    var p0 = url.split('/')
    var parts = p0[p0.length-1].split('-')
    var id = parts[parts.length - 1]
    return createGiphyUrl(id)
  }
}

function createGiphyUrl (id) {
  return ['http://media.giphy.com/media/',id,'/giphy.mp4'].join('')
}

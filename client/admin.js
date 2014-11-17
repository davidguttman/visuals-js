var mercury = require('mercury')

var h = mercury.h
var struct = mercury.struct
var array = mercury.struct

module.exports = Admin

function Admin (el) {
  this.state = struct({
    results: array([]),
    queue: array([])
  })

  mercury.app(el, this.state, this.render)

  return this
}

Admin.prototype.render = function(state) {
  return h('h1', 'admin')
}

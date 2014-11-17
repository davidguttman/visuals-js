var hash = window.location.hash.replace(/^#\/?/, '')

if (hash === 'admin') {
  var Admin = require('./admin')
  new Admin(document.body)
} else {
  require('./visuals')
}

window.addEventListener('hashchange', window.location.reload.bind(window.location))

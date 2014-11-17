var jsonist = require('jsonist')

module.exports = function searchGiphy (term, cb) {
  var url = createSearchUrl(term)
  jsonist.get(url, function(err, data) {
    if (err) return cb(err)

    var images = data.data.map(function(giph) {
      return giph.images.original
    })

    cb(null, images)
  })
}

var createSearchUrl = function (term) {
  var url = window.location.origin + '/api/proxy/api.giphy.com/v1/gifs/search'
  url += '?api_key=dc6zaTOxFJmzC'
  url += '&limit=100'
  url += '&q='+ escape(term)
  return url
}

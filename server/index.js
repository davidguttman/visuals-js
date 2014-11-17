var hq = require('hyperquest')
var http = require('http')
var Router = require('routes-router')
var ecstatic = require('ecstatic')({root: __dirname + '/../public'})
var querystring = require('querystring')

var router = Router({notFound: ecstatic})

var server = http.createServer(router)

router.addRoute('/api/proxy/*', function(req, res, opts) {
  var url = 'http://' + opts.splats[0] + (opts.parsedUrl.search || '')
  var opts = {headers: {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.122 Safari/537.36'}}
  hq(url, opts).pipe(res)
})

var PORT = process.env.PORT || 3050

server.listen(PORT)

console.log('Listening on port', PORT)

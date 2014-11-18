var head = document.head

var style = document.createElement('link')
style.rel = "stylesheet"
style.type = "text/css"
style.href = "//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
head.appendChild(style)

var jquery = document.createElement('script')
jquery.src = 'http://code.jquery.com/jquery-2.1.1.min.js'
head.appendChild(jquery)

jquery.addEventListener('load', function() {
  var script = document.createElement('script')
  script.src = '//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js'
  head.appendChild(script)
})


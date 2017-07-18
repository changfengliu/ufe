var he = require('he')

module.exports = function(req, res, err){
	return `<html>
	  <head>
	    <title>404 - ufe server</title>
			<style type="text/css">
				body{
					font-size:16px;
				}
				.toIndex{
			    color: #00f;
			    letter-spacing: 1px;
			    text-decoration: none;
				}
			</style>
	  </head>
	  <body>
	    <div>
	      <h1>404</h1>
	      <p>Page not found :(</p>
				<br/>
	      <address>
					Node.js ${process.version}/
					<a href="https://github.com/jfhbrook/node-ecstatic">ecstatic</a>
					server running @ ${he.encode(req.headers.host || '')}
				</address>
				<br/>
				<div>from ufe server.</div>
				<br/>
				<div><a class="toIndex" href="/">&lt;&lt;&nbsp;Index Page</a></div>
				<br/>
	    </div>
	  </body>
	</html>
	`
}

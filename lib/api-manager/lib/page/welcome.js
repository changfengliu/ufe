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
				.success{
					color:#0F0;
				}
			</style>
	  </head>
	  <body>
	    <div>
	      <h1 class="success">Api Mocker Server Started!</h1>
				<br/>
	      <address>
					Node.js ${process.version}/
					<a href="https://github.com/jfhbrook/node-ecstatic">ecstatic</a>
					server running @ ${he.encode(req.headers.host || '')}
				</address>
				<br/>
				<div>from ufe api mocker server.</div>
				<br/>
				<div><a class="toIndex" href="/">&lt;&lt;&nbsp;Index Page</a></div>
				<br/>
	    </div>
	  </body>
	</html>
	`
}

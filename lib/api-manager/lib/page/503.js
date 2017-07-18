var he = require('he')

module.exports = function(req, res, err){
	return `<html>
	  <head>
	    <title>503 - ufe server</title>
			<style type="text/css">
				body{
					font-size:16px;
				}
				pre{
	        background: #e3dfed;
			    line-height: 1.6em;
			    padding: 10px;
				}
				.error-msg{
					color:#F00;
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
	      <h1 class="error-msg">503</h1>
	      <p class="error-msg">Unhandled server error :(</p>
				<h2>Error Stack:</h2>
				<pre>${printStack(err['stack'])}</pre>
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

function printStack(stack){
	return JSON.stringify(stack)
		.replace(/<anonymous>/gi, '&lt;anonymous&gt;')
		.replace(/\\n/gi, '<br/>')
		.replace(/^"|"$/gi, '')
}

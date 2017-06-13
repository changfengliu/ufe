var mitmproxy = require('node-mitmproxy');

mitmproxy.createProxy({
    sslConnectInterceptor: (req, cltSocket, head) => true,
    requestInterceptor: (rOptions, req, res, ssl, next) => {
        console.log(`正在访问：${rOptions.protocol}//${rOptions.hostname}:${rOptions.port}`);
        console.log('cookie:', rOptions.headers.cookie);
        res.end('Hello node-mitmproxy!');
        next();
    },
    responseInterceptor: (req, res, proxyReq, proxyRes, ssl, next) => {
        next();
    }
});

// var Mitm = require("mitm")
// var mitm = Mitm()
//
// mitm.on("request", function(req, res) {
//   res.statusCode = 402
// 	console.log('req');
//   res.end("Pay up, sugar!")
// })
//
//
// setTimeout(()=>{
// 	mitm.disable()
// }, 30000)

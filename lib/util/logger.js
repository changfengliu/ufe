var dateFormat  = require('dateformat')

module.exports = {
  info: console.log,
  //打印一个空行
  sep(){
    this.info('')
  },
  help(txt, title){
    this.info(
      '[%s] %s',
      title || 'help', txt.green
    )
	},
  success(txt, title){
    this.info(
      '[%s] %s',
      title || 'task', txt.cyan
    )
	},
	fail(txt, title){
    this.info(
      '[%s error] %s',
      title || 'task', txt.red
    )
	},
  http: function (req, res, err) {
    var date = dateFormat(new Date, "yyyy-mm-dd HH:MM:ss:l");
    if (err) {
      this.info(
        '\n[%s] "%s %s" Error (%s): "%s"',
        date, req.method.red, req.url.red,
        String(err.status).toString().red, String(err.message || '').red
      )
      if(err['transfer-url']){
        this.info(
          '[%s] "%s -> %s"',
          date, 'transfer'.green, err['transfer-url'].green
        )
      }
      this.info('')
    }
    else {
      this.info(
        '[%s] "%s %s"',
        date, req.method.cyan, req.url.cyan
      )
    }
  }
}

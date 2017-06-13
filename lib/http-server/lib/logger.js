var colors       = require('colors')
var dateFormat = require('dateformat')

module.exports = {
  info: console.log,
  http: function (req, res, err) {
    var date = dateFormat(new Date, "yyyy-mm-dd HH:MM:ss:l");
    if (err) {
      this.info(
        '\n[%s] "%s %s" Error (%s): "%s"',
        date, req.method.red, req.url.red,
        err.status.toString().red, err.message.red
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

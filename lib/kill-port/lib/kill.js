'use strict'

const sh = require('execa').shell

module.exports = function (port) {
  return new Promise(function(resolve, reject) {
    //第一步：查询占用端口的pid
    sh(`lsof -i tcp:${port} | grep LISTEN | awk '{print $2}'`)
      .then(result=>{
        let pid = result['stdout']
        if(pid){
          //第二步：若找到了pid, kill it.
          sh(`kill -9 ${pid}`)
            .then(result=>{
              //kill成功
              resolve({
                port: port,
                pid: pid
              })
            })
            .catch(err=>{
              //若 kill pid时出错.
              reject(err)
            })
        } else {
          //若未找到端口对应的pid.
          resolve(`Port ${port} is not listening`)
        }
      })
      .catch(err=>{
        //若查询占用端口的pid时出错
        reject(err)
      })
  })
}

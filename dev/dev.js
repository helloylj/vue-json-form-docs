const exec = require('child_process').exec
const lernaProjectRoot = '../dynamic-form' // 需要参数化
const fs = require('fs')
const path = require('path')
const glob = require('glob')

//
function execCommand (command, options) {
  return new Promise((resolve, reject) => {
    exec(command, options, function (err, stdout, stderr) {
      if (err) {
        console.error(err, stderr)
        reject(err)
      } else {
        console.log(stdout)
        resolve(stdout)
      }
    })
  })
}

function linkModules () {
  var packageFiles = glob.sync(`${lernaProjectRoot}/packages/*/package.json`)
  //
  let promises = []
  //
  packageFiles.forEach(packageFile => {
    try {
      const _package = JSON.parse(fs.readFileSync(packageFile))
      const modulePath = path.dirname(packageFile)
      //
      promises.push(execCommand('npm link', { cwd: modulePath }))
      //
      promises.push(execCommand(`npm link ${_package.name}`))
    } catch (err) {
      console.log(err)
    }
  })
  //
  return Promise.all(promises)
}

linkModules()
  .then(() => {
    process.exit()
  })

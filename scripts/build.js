/**
 * @Author: Caven
 * @Date: 2021-03-15 20:59:10
 */

'use strict'
const fse = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const chalk = require('chalk')

shell.echo(chalk.green('build sdk start'))

let outDir = path.resolve(__dirname, '..', 'packages/sdk/dist')

fse.ensureDirSync(outDir)

fse.emptyDirSync(outDir)

const pkgs = ['base', 'core', 'chart', 'mapv', 's3m']

const count = pkgs.length

pkgs.forEach((item, index) => {
  let dist = path.resolve(__dirname, '..', `packages/${item}/dist`)
  fse.exists(dist, async exists => {
    if (exists) {
      if (item === 'base') {
        for (let i = 0; i < 7; i++) {
          fse.removeSync(path.join(dist, `${i}.js`))
          fse.removeSync(path.join(dist, `${i}.min.js`))
        }
      }
      fse.copySync(dist, outDir)
      shell.echo(chalk.yellow(`copy ${item} success`))
      if (index === count - 1) {
        await shell.echo(chalk.green('build sdk end'))
      }
    } else {
      shell.echo(chalk.red(`no ${item} dist`))
      if (index === count - 1) {
        await shell.echo(chalk.green('build sdk end'))
      }
    }
  })
})

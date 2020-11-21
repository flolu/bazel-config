import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'yaml'

import {flattenObject} from './flatten-object'

const ruleDir = process.argv[2]
const configsDir = 'configs'
const configSuffix = '.config.yaml'

async function main() {
  const files = await fs.promises.readdir(path.join(__dirname, configsDir))
  await Promise.all(
    files.map(async file => {
      const configStr = await fs.promises.readFile(path.join(__dirname, configsDir, file))
      const {$schema, ...config} = JSON.parse(configStr.toString())
      const flat = flattenObject(config)
      const content = yaml.stringify(k8sConfig(flat))
      const outFile = `${file.split('.')[0]}${configSuffix}`
      await fs.promises.writeFile(path.join(ruleDir, outFile), content)
    }),
  )
}

function k8sConfig(data: object) {
  return {
    apiVersion: 1,
    kind: 'ConfigMap',
    metadata: {
      name: 'config',
    },
    data,
  }
}

main()

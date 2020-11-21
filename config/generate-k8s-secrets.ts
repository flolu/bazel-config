import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'yaml'

import {flattenObject} from './flatten-object'

const ruleDir = process.argv[2]
const configsDir = 'secrets'
const secretsSuffix = '.secrets.yaml'

async function main() {
  const files = await fs.promises.readdir(path.join(__dirname, configsDir))
  await Promise.all(
    files.map(async file => {
      const secretsStr = await fs.promises.readFile(path.join(__dirname, configsDir, file))
      const {$schema, ...secrets} = JSON.parse(secretsStr.toString())
      const flat = flattenObject(secrets)
      const content = yaml.stringify(k8sSecrets(flat))
      const outFile = `${file.split('.')[0]}${secretsSuffix}`
      await fs.promises.writeFile(path.join(ruleDir, outFile), content)
    }),
  )
}

function k8sSecrets(data: object) {
  return {
    apiVersion: 1,
    kind: 'Secrets',
    type: 'Opaque',
    metadata: {
      name: 'secrets',
    },
    stringData: data,
  }
}

main()

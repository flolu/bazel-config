import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'yaml'

const ruleDir = process.argv[2]
const configsDir = 'configs'
const configSuffix = '.config.yaml'

function flattenObject(object: any) {
  const toReturn = {}
  for (const i in object) {
    if (!object.hasOwnProperty(i)) continue
    if (typeof object[i] === 'object' && object[i] !== null) {
      const flatObject = flattenObject(object[i])
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue
        ;(toReturn as any)[i + '.' + x] = (flatObject as any)[x]
      }
    } else {
      ;(toReturn as any)[i] = object[i]
    }
  }
  return toReturn
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

main()

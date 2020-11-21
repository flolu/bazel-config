import * as fs from 'fs'
import * as path from 'path'

console.log(process.argv)
const ruleDir = process.argv[2]
const environment = process.argv[3]

async function main() {
  await fs.promises.writeFile(path.join(ruleDir, 'client.environment.ts'), environment)
}

main()

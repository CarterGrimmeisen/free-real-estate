import { writeFile, mkdirp } from 'fs-extra'
import rimraf from 'rimraf'
import { apiSpecToOpenApi } from 'crosswalk'
import execa from 'execa'

import API from '../api/schema.json'

async function main() {
  await mkdirp('.tmp')
  await writeFile('.tmp/swagger.json', JSON.stringify(apiSpecToOpenApi(API)))

  await execa('git', [
    'clone',
    'https://github.com/nlohmann/swagger_to_uml.git',
    '.tmp/swagger_to_uml',
  ])

  const results = await execa(
    'python',
    ['.tmp/swagger_to_uml/bin/swagger_to_uml', '.tmp/swagger.json'],
    { stdout: 'pipe' }
  )

  await writeFile('swagger.puml', results.stdout)
  await new Promise<void>((resolve, reject) =>
    rimraf('.tmp', (err) => {
      if (err) return reject(err)
      resolve()
    })
  )
}

main()

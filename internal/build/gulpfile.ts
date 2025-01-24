// import { mkdir } from 'fs/promises'
import { series } from 'gulp'
// import { epOutput } from '@bzsh-ui/build-utils'
import { run, withTaskName } from './src'
import 'sucrase/register/ts'

export default series(
  withTaskName('clean', () => run('pnpm run clean'))
  // withTaskName('createOutput', () => mkdir(epOutput, { recursive: true }))
)

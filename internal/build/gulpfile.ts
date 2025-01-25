import { mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { epOutput } from '@bzsh-ui/build-utils'
import { run, runTask, withTaskName } from './src'

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(runTask('buildModules'))
)

/**
 * ！！！！
 * 引入外部注册的gulp任务
 */
export * from './src'

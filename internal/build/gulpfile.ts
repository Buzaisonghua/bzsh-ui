import { copyFile, mkdir } from 'fs/promises'
import path from 'path'
import { parallel, series } from 'gulp'
import { epOutput, epPackage } from '@bzsh-ui/build-utils'
import { run, runTask, withTaskName } from './src'

export const copyFiles = () =>
  Promise.all([copyFile(epPackage, path.join(epOutput, 'package.json'))])

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(runTask('buildModules'), runTask('generateTypesDefinitions')),

  parallel(copyFiles)
)

/**
 * ！！！！
 * 引入外部注册的gulp任务
 */
export * from './src'

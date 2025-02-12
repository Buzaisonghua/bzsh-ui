import { copyFile, mkdir } from 'fs/promises'
import path from 'path'
import { parallel, series } from 'gulp'
import { copy } from 'fs-extra'
import {
  buildOutput,
  epOutput,
  epPackage,
  projRoot
} from '@bzsh-ui/build-utils'
import { buildConfig, run, runTask, withTaskName } from './src'
import type { TaskFunction } from 'gulp'
import type { Module } from './src'

export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(epOutput, 'README.md')
    ),
    copyFile(
      path.resolve(projRoot, 'typings', 'global.d.ts'),
      path.resolve(epOutput, 'global.d.ts')
    )
  ])

export const copyTypesDefinitions: TaskFunction = (done) => {
  // dist/types/packages
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true })
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(runTask('buildModules'), runTask('generateTypesDefinitions')),

  parallel(copyTypesDefinitions, copyFiles)
)

/**
 * ！！！！
 * 引入外部注册的gulp任务
 */
export * from './src'

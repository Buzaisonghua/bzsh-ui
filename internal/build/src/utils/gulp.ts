import { buildRoot } from '@bzsh-ui/build-utils'
import { run } from './process'
import type { TaskFunction } from 'gulp'

/**
 * 为fn函数设置displayName: name属性
 */
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

export const runTask = (name: string) =>
  withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot)
  )

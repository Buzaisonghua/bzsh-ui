import type { TaskFunction } from 'gulp'

/**
 * 为fn函数设置displayName: name属性
 */
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })

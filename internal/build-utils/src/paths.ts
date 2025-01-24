import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

// 获取当前模块目录的路径
const __dirname = dirname(fileURLToPath(import.meta.url))

export const projRoot = resolve(__dirname, '..', '..', '..')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/bzsh-ui` */
export const epOutput = resolve(buildOutput, 'bzsh-ui')

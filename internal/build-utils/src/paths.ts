import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const buildRoot = resolve(projRoot, 'internal', 'build')
export const epRoot = resolve(pkgRoot, 'bzsh-ui')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/bzsh-ui` */
export const epOutput = resolve(buildOutput, 'bzsh-ui')
export const epPackage = resolve(epRoot, 'package.json')

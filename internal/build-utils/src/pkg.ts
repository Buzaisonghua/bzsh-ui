import findWorkspacePackages from '@pnpm/find-workspace-packages'
import { projRoot } from './paths'

export const getWorkspacePackages = () => findWorkspacePackages(projRoot)
/**
 * 是一个 TypeScript 类型定义，表示一个 PNPM 项目的元数据。
 * 它通常用于描述一个项目（或包）的结构和配置信息，类似于 package.json 文件的内容。
 */
export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as Record<
    'dependencies' | 'peerDependencies',
    { [key in string]: any }
  >
}

export const getPackageDependencies = (
  pkgPath: string
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}

// 返回 排除传入的路劲列表中包含 指定文件 的新列表
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter((path) => {
    const position = path.startsWith(projRoot) ? projRoot.length : 0
    return !excludes.some((exclude) => path.includes(exclude, position))
  })
}

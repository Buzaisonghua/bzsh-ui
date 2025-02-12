import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import glob from 'fast-glob'
import { copy, remove } from 'fs-extra'
import { buildOutput } from '@bzsh-ui/build-utils'
import { pathRewriter, run } from '../utils'

export const generateTypesDefinitions = async () => {
  // 运行 vue-tsc 指定指定文件 生成.d.ts文件 只生成声明文件不实际编译 指定生成文件的目录
  await run(
    'npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types'
  )
  // dist/types/packages
  const typesDir = path.join(buildOutput, 'types', 'packages')
  // 查看所有子文件夹下的 d.ts文件
  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true
  })

  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8')
    await writeFile(filePath, pathRewriter('esm')(content), 'utf8')
  })
  await Promise.all(rewriteTasks)
  const sourceDir = path.join(typesDir, 'bzsh-ui')
  await copy(sourceDir, typesDir)
  await remove(sourceDir)
}

import { series } from 'gulp'
import glob from 'fast-glob'
import { epRoot, excludeFiles, pkgRoot } from '@bzsh-ui/build-utils'
import { type OutputOptions, type Plugin, rollup } from 'rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import { generateExternal, withTaskName, writeBundles } from '../utils'
import { buildConfigEntries, target } from '../build-info'
import type { TaskFunction } from 'gulp'

const plugins: Plugin[] = [
  // 它提供了如 @defineProps, @defineEmits, @withDefaults 等宏，可以减少样板代码，并使 Vue 组件更简洁。
  VueMacros({
    setupComponent: false,
    setupSFC: false,
    plugins: {
      vue: vue({
        isProduction: true,
        template: {
          compilerOptions: {
            hoistStatic: false,
            cacheHandlers: false
          }
        }
      }),
      vueJsx: vueJsx()
    }
  }),
  // 插件帮助 Rollup 解析 node_modules 中的模块，确保模块能够正确地被打包到最终构建中
  nodeResolve({
    extensions: ['.mjs', '.js', '.json', '.ts']
  }),
  // 插件用于将 CommonJS 模块转换为 ES 模块格式，使它们能够与 Rollup 配合正常工作。
  commonjs(),
  //  构建过程中通过 esbuild 进行 JavaScript 和 TypeScript 的编译的插件
  esbuild({
    sourceMap: true,
    target,
    loaders: {
      '.vue': 'ts'
    }
  })
]

async function buildModulesComponents() {
  // 获取项目内的 packages文件夹下的文件 packages文件是组件库核心文件
  const input = excludeFiles(
    await glob(['**/*.{js,ts,vue}', '!**/style/(index|css).{js,ts,vue}'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const bundle = await rollup({
    /** 入口文件 */
    input,
    // 打包插件配置
    plugins,
    // 外部依赖,这些以来不打包
    external: await generateExternal({ full: false }),
    /** 树摇配置：所有文件都可以 */
    treeshake: {
      moduleSideEffects: false // 假设所有模块都没有副作用
    }
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        // 指定输出文件格式
        format: config.format,
        // 输出文件路径
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        // 不将所有文件合并
        preserveModules: true,
        // 打包路径
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

// async function buildModulesStyles() {
//   const input = excludeFiles(
//     await glob('**/style/(index|css).{js,ts,vue}', {
//       cwd: pkgRoot,
//       absolute: true,
//       onlyFiles: true
//     })
//   )
//   const bundle = await rollup({
//     input,
//     plugins,
//     treeshake: false
//   })

//   await writeBundles(
//     bundle,
//     buildConfigEntries.map(([module, config]): OutputOptions => {
//       return {
//         format: config.format,
//         dir: path.resolve(config.output.path, 'components'),
//         exports: module === 'cjs' ? 'named' : undefined,
//         preserveModules: true,
//         preserveModulesRoot: epRoot,
//         sourcemap: true,
//         entryFileNames: `[name].${config.ext}`
//       }
//     })
//   )
// }

export const buildModules: TaskFunction = series(
  withTaskName('buildModulesComponents', buildModulesComponents)
  // withTaskName('buildModulesStyles', buildModulesStyles)s
)

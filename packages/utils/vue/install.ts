import { SFCWithInstall } from './typescript'
/**
 * 这段代码定义了一个 withInstall 函数，用于增强一个组件，使其支持安装到 Vue 应用中。它的功能可以总结为：
 * 主组件和附加组件注册：主组件 main 和可选的附加组件 extra 会通过 app.component 方法注册到 Vue 应用中。
 * 为主组件添加 install 方法：给主组件添加 install 方法，允许用户通过 app.use() 方式安装组件。
 * 附加组件的挂载：如果有附加组件 extra，它们会作为属性添加到主组件上。
 * @param main
 * @param extra 对象，key为string value为any
 * @returns 返回的结果是一个包含 install 方法的主组件，并且如果有附加组件，它们会作为额外的属性包含在返回结果中。
 */
export const withInstall = <T, E extends Record<string, any>>(
  main: T, // 主组件
  extra?: E // 可选的附加组件
) => {
  // 给主组件添加 install 方法
  ;(main as SFCWithInstall<T>).install = (app): void => {
    // 将主组件和附加组件注册到 app 中
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp) // 注册组件
    }
  }

  // 如果有附加组件，将它们添加到主组件上
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp // 将附加组件添加为主组件的属性
    }
  }

  // 返回主组件和附加组件的结合体
  return main as SFCWithInstall<T> & E
}

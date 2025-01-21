// import { withInstall } from '@bzsh-ui/utils'

// import Icon from './src/icon.vue'
// import type { SFCWithInstall } from '@bzsh-ui/utils'

// export const BzIcon: SFCWithInstall<typeof Icon> = withInstall(Icon)
// export default BzIcon

// export * from './src/icon'

import Icon from './src/icon.vue'

Icon.install = (app) => {
  app.component(Icon.name, Icon)
}
export const BzIcon = Icon

export default BzIcon

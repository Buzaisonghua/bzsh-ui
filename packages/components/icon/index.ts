import { withInstall } from '@bzsh-ui/utils'

import Icon from './src/icon.vue'
import type { SFCWithInstall } from '@bzsh-ui/utils'

export const BzIcon: SFCWithInstall<typeof Icon> = withInstall(Icon)
export default BzIcon

export * from './src/icon'

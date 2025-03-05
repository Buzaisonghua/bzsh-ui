import { buildProp } from '@bzsh-ui/utils'
import { componentSizes } from '@bzsh-ui/constants'

export const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: true
} as const)

export const useSizeProps = {
  size: useSizeProp
}

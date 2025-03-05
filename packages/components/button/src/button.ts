import { useSizeProp } from '@bzsh-ui/hooks'
import { buildProp } from '@bzsh-ui/utils'

export const buttonType = [
  'default',
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  ''
] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export const buttonProps = buildProp({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonType,
    default: ''
  }
} as const)

// import { fromPairs } from 'lodash-unified' // 将键值对数组转换为对象 [['a', 1], ['b', 2]] => {a: 1, b:2}
// import type { PropType } from 'vue'
// import type {
//   EpPropConvert,
//   IfEpProp,
//   IfNativePropType,
//   NativePropType,
// } from './types'

// export const definePropType = <T>(val: any): PropType<T> => val
// export const epPropKey = '__epPropKey'

// export const buildProp = <
//   Type = never,
//   Value = never,
//   Validator = never
// >() => {}

// export const buildPropaaa = <
//   Type = never,
//   Value = never,
//   Validator = never,
//   Default extends EpPropMergeType<Type, Value, Validator> = never,
//   Required extends boolean = false
// >(
//   prop: EpPropInput<Type, Value, Validator, Default, Required>,
//   key?: string
// ): EpPropFinalized<Type, Value, Validator, Default, Required> => {
//   // filter native prop type and nested prop, e.g `null`, `undefined` (from `buildProps`)
//   if (!isObject(prop) || isEpProp(prop)) return prop as any

//   const { values, required, default: defaultValue, type, validator } = prop

//   const _validator =
//     values || validator
//       ? (val: unknown) => {
//           let valid = false
//           let allowedValues: unknown[] = []

//           if (values) {
//             allowedValues = Array.from(values)
//             if (hasOwn(prop, 'default')) {
//               allowedValues.push(defaultValue)
//             }
//             valid ||= allowedValues.includes(val)
//           }
//           if (validator) valid ||= validator(val)

//           if (!valid && allowedValues.length > 0) {
//             const allowValuesText = [...new Set(allowedValues)]
//               .map((value) => JSON.stringify(value))
//               .join(', ')
//             warn(
//               `Invalid prop: validation failed${
//                 key ? ` for prop "${key}"` : ''
//               }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
//                 val
//               )}.`
//             )
//           }
//           return valid
//         }
//       : undefined

//   const epProp: any = {
//     type,
//     required: !!required,
//     validator: _validator,
//     [epPropKey]: true,
//   }
//   if (hasOwn(prop, 'default')) epProp.default = defaultValue
//   return epProp
// }

// export const buildProps = <
//   Props extends Record<string, { [epPropKey]: true } | NativePropType>
// >(
//   props: Props
// ): {
//   [K in keyof Props]: IfEpProp<
//     Props[K],
//     Props[K],
//     IfNativePropType<Props[K], Props[K], EpPropConvert<Props[K]>>
//   >
// } =>
//   fromPairs(
//     Object.entries(props).map(([key, option]) => [
//       key,
//       buildProp(option as any, key),
//     ])
//   ) as any

export const NOOP = () => {}

const objectToString = Object.prototype.toString
const toTypeString = (value: unknown) => objectToString.call(value)
export const toRawType = (value: unknown) => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

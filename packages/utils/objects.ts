const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val: object, key: string | symbol) =>
  hasOwnProperty.call(val, key)

export const isNil = value =>
  value === undefined || value === null

export const isArray = value =>
  Array.isArray(value)

export const isFunc = value =>
  typeof value === 'function'

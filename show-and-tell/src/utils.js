export const isNil = value =>
  value === undefined || value === null

export const isInt = value =>
  Number.isInteger(value)

export const isArray = value =>
  Array.isArray(value)

export const isFunc = value =>
  typeof value === 'function'

export const repr = value =>
  isNil(value) ? 'nil' : value.repr()

export const getDefault = (options, key, defaultValue) =>
  (options[key] === undefined) ? defaultValue : options[key]

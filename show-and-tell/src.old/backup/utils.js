export const isNil = value =>
  value === undefined || value === null

export const isArray = value =>
  Array.isArray(value)

export const apply_relative = (tp, abs) => {
  if( abs === undefined ) {
    abs = tp.abs;
  }
  tp.value = abs;
  if( !isNaN( tp.rel ) ) {
    tp.value += tp.rel;
  }
}

export const resolve_timepoint = tp => {
  tp.value = undefined
  if (!isNaN(tp.abs)) {
    apply_relative(tp)
  } else if (tp.abs !== undefined) {
    if (!isNaN(tp.abs.value)) {
      apply_relative(tp, tp.abs.value)
    }
  }
  return isNaN(tp.value)
}

export const timepoint = value => {
  let tp
  if (!isNil(value) && isArray(value)) {
    tp = {abs: value[0], rel: value[1]}
  } else {
	  tp = {abs: value}
  }
  resolve_timepoint(tp)
  return tp
}

export const get_default = (obj, name, def) => {
  if( obj[name] === undefined )
	  return def;
  else
	  return obj[name];
}

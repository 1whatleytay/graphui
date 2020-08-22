export function typeHasFields(type) {
  if (!type)
    return false

  return type.kind === 'OBJECT' || type.kind === 'INTERFACE' || type.kind === 'UNION'
}

export function makeTypename(type) {
  if (type.kind === 'NON_NULL') {
    return `!${makeTypename(type.ofType)}`
  } else if (type.kind === 'LIST') {
    return `[${makeTypename(type.ofType)}]`
  } else {
    return type.name
  }
}
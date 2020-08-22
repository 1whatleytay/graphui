import { typeHasFields } from '@/scripts/makeTypename'

export function buildGraphQL(value) {
  if (typeHasFields(value.lowestType) && !value.parts.length) {
    throw `GraphQL type ${value.lowestType.name} needs to have at least 1 part.`
  }

  if (value.parts.length) {
    return `${value.name} { ${value.parts.map(x => buildGraphQL(x)).join(' ')} }`
  }

  return value.name
}
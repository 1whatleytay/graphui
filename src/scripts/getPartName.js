export function getPartName(part) {
  if (part.type === 'text') {
    if ((typeof part.content) === 'object') {
      return `${part.content.name}`
    }

    return part.content
  }
  
  return part.type
}
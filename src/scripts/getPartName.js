export function getPartName(part) {
  if (part.type === 'text') {
    return part.content
  }
  
  return part.type
}
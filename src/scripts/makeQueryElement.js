let index = 0

export function makeQueryElement() {
  return {name: '', parts: [], type: null, lowestType: null, id: index++}
}
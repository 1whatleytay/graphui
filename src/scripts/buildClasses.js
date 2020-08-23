export function buildColor(color, prefix) {
  if (!color)
    return []

  if (color.value)
    return [`${prefix}-${color.color}-${color.value}`]

  return [`${prefix}-${color.color}`]
}

export function buildDirection(direction, prefix) {
  if (!direction)
    return []

  if (typeof direction !== 'object') {
    return [`${prefix}-${direction}`]
  }

  const result = []
  if (prefix.all)
    result.push(`${prefix}-${prefix.all}`)

  if (prefix.x)
    result.push(`${prefix}x-${prefix.x}`)
  if (prefix.y)
    result.push(`${prefix}y-${prefix.y}`)

  if (prefix.left)
    result.push(`${prefix}l-${prefix.left}`)
  if (prefix.right)
    result.push(`${prefix}r-${prefix.right}`)
  if (prefix.top)
    result.push(`${prefix}t-${prefix.top}`)
  if (prefix.bottom)
    result.push(`${prefix}b-${prefix.bottom}`)

  return result
}

export function buildAlign(align, prefix) {
  if (!align)
    return []

  return [`${prefix}-${align}`]
}

export function buildFrame(frame, prefix) {
  if (!frame)
    return []

  return [`${prefix}-${frame}`]
}

export function buildBorder(size) {
  if (!size)
    return []

  if (size === 1)
    return ['border']

  return [`border-${size}`]
}

export function buildRounded(rounded) {
  if (!rounded)
    return []

  const map = {
    0: 'rounded-none',
    1: 'rounded-sm',
    2: 'rounded',
    3: 'rounded-md',
    4: 'rounded-lg',
    5: 'rounded-full'
  }

  return [map[rounded]]
}

export function buildClasses(classes) {
  const build = []

  console.log(classes)

  build.push(...buildColor(classes.textColor, 'text'))
  build.push(...buildColor(classes.backgroundColor, 'bg'))
  build.push(...buildColor(classes.borderColor, 'border'))
  build.push(...buildDirection(classes.padding, 'p'))
  build.push(...buildDirection(classes.margin, 'm'))
  build.push(...buildFrame(classes.width, 'w'))
  build.push(...buildFrame(classes.height, 'h'))
  build.push(...buildAlign(classes.textAlign, 'text'))
  build.push(...buildBorder(classes.borderSize))
  build.push(...buildRounded(classes.rounded))

  return build.join(' ')
}
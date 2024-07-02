export function parseTransform(str = '') {
  const matched = str.match(/translate\(([^\)]+?)\)/)
  const xy = matched?.[1].split(',').map(e => parseInt(e)) || [0, 0]
  return {
    x: xy[0],
    y: xy[1]
  }
}
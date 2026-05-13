export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function uniqueRandomList(count, min, max) {
  const set = new Set()
  while (set.size < count) {
    set.add(randomInt(min, max))
  }
  return Array.from(set).sort((a, b) => a - b)
}
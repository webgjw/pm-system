// 随机不重复数组
function randomNumbers(count, max, min = 1) {
  const set = new Set()
  while (set.size < count) {
    set.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return Array.from(set).sort((a, b) => a - b)
}

export function genSSQ() {
  return {
    red: randomNumbers(6, 33),
    blue: randomNumbers(1, 16)
  }
}

export function genDLT() {
  return {
    front: randomNumbers(5, 35),
    back: randomNumbers(2, 12)
  }
}

export function genKL8() {
  return randomNumbers(10, 80)
}

export function genFC3D() {
  return randomNumbers(3, 9, 0)
}

export function genQLC() {
  return {
    main: randomNumbers(7, 30),
    special: randomNumbers(1, 30)
  }
}

export function genPL3() {
  return randomNumbers(3, 9, 0)
}

export function genPL5() {
  return randomNumbers(5, 9, 0)
}

export function genQXC() {
  return randomNumbers(7, 9, 0)
}
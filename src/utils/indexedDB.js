const DB_NAME = 'Vue3DB'
const STORE_NAME = 'arrayStore'
const DB_VERSION = 1

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * 保存数组
 */
export function saveArray(key, array) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      store.put({ id: key, value: array })

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    }).catch(reject)
  })
}

/**
 * 获取数组
 */
export function getArray(key) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const tx = db.transaction(STORE_NAME, 'readonly')
      const store = tx.objectStore(STORE_NAME)

      const req = store.get(key)
      req.onsuccess = () => {
        resolve(req.result ? req.result.value : [])
      }
      req.onerror = () => reject(req.error)
    }).catch(reject)
  })
}

/**
 * 清空某个数组
 */
export function clearArray(key) {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      const store = tx.objectStore(STORE_NAME)

      store.delete(key)

      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    }).catch(reject)
  })
}
/**
 * 深复制
 * @param {Object} sourceData 源数据
 */
export function deepClone (sourceData) {
  if (!sourceData && typeof sourceData !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetData = sourceData.constructor === Array ? [] : {}
  for (const key in sourceData) {
    if (Object.prototype.hasOwnProperty.call(sourceData, key)) {
      if (sourceData[key] && typeof sourceData[key] === 'object') {
        targetData[key] = sourceData[key].constructor === Array ? [] : {}
        targetData[key] = deepClone(sourceData[key])
      } else {
        targetData[key] = sourceData[key]
      }
    }
  }
  return targetData
}

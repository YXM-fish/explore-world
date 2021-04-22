function getNestedObject(nestedObj, pathArr) {
    return pathArr.reduce(function (obj, key) {
        return obj && obj[key] !== 'undefined' ? obj[key] : null
    }, nestedObj)
}

export {
    getNestedObject
}

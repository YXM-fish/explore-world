export const PAGE_OPERATIONS = {
  '/platformProductMgr/shopifyList': {
    resourceCodes: []
  }
}

export function hasPermission(route, resourceCode) {
  return true
  // if(route.meta && route.meta.operations) {
  //   return route.meta.operations.find(item => item.resourceCode === resourceCode) !== undefined
  // } else {
  //   return false
  // }
}
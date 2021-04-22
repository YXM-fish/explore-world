import Cookies from 'js-cookie'

const VersionKey = 'client-version'
const AllMenuKey = 'all-menu'

export function getVersion() {
  return localStorage.getItem(VersionKey) || Cookies.get(VersionKey)
}

export function setVersion(version) {
  localStorage.setItem(VersionKey, version);
  return Cookies.set(VersionKey, version)
}

export function removeVersion() {
  localStorage.removeItem(VersionKey);
  return Cookies.remove(VersionKey)
}

export function setAllMenus(val){
  return Cookies.set(AllMenuKey, val)
}

export function getAllMenus(){
  return Cookies.get(AllMenuKey)
}

export function removeAllMenus() {
  return Cookies.remove(UserValidKey)
}

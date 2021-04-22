import Cookies from 'js-cookie'

export function setCookie (name, value, config = {}) {
  Cookies.set(name, value, config)
}

export function getCookie (name) {
  return Cookies.get(name)
}

export function removeCookie (name) {
  Cookies.remove(name)
}

export function setSessionItem (name, value) {
  sessionStorage.setItem(name, value)
}

export function getSessionItem (name) {
  return sessionStorage.getItem(name)
}

export function removeSessionItem (name) {
  sessionStorage.removeItem(name)
}

export function setLocalStorageItem (name, value) {
  localStorage.setItem(name, value)
}

export function getLocalStorageItem (name) {
  return localStorage.getItem(name)
}

export function removeLocalStorageItem (name) {
  localStorage.removeItem(name)
}

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const UserValidKey = 'user-valid'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

// user valid value
export function getUserValidVal() {
    return Cookies.get(UserValidKey)
}

export function setUserValidVal(val) {
    return Cookies.set(UserValidKey, val)
}

export function removeUserValidVal() {
    return Cookies.remove(UserValidKey)
}

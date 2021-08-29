import getConfig from 'next/config'
import Router from 'next/router'

import { fetchWrapper } from 'utils'

const userLocalStorageName = '__user__'
const { publicRuntimeConfig } = getConfig()
const baseUrl = `${publicRuntimeConfig.apiUrl}`
const userSubject =
  process.browser &&
  JSON.parse(localStorage.getItem(userLocalStorageName) || '{}')

export const userService = {
  user: userSubject,
  get userValue() {
    return userSubject
  },
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
}

function login(username: string, password: string) {
  const email = username
  const captcha = '11111'
  const login_type = 'member'

  return fetchWrapper
    .post(`${baseUrl}/login`, { email, password, captcha, login_type })
    .then(user => {
      // publish user to subscribers and store in local storage to stay logged in between page refreshes
      localStorage.setItem(userLocalStorageName, JSON.stringify(user))

      return user
    })
}

function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('user')
  Router.push('/auth/login')
}

function register(user: any) {
  return fetchWrapper.post(`${baseUrl}/register`, user)
}

function getAll() {
  return fetchWrapper.get(baseUrl)
}

function getById(id: number) {
  return fetchWrapper.get(`${baseUrl}/${id}`)
}

function update(id: number, params: any) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then(x => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params }
      localStorage.setItem(userLocalStorageName, JSON.stringify(user))

      // publish updated user to subscribers
      userSubject.next(user)
    }
    return x
  })
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: number) {
  return fetchWrapper.delete(`${baseUrl}/${id}`)
}

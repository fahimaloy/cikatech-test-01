export const state = () => ({
  isAuth: false,
  token: '',
  user: {
    username: 'Username',
    email: 'email@example.com',
  },
  pages: [],
})

export const getters = {
  getAuth(state) {
    return state.isAuth
  },
  getToken(state) {
    return state.token
  },
}

export const mutations = {
  setAuth(state, auth) {
    state.isAuth = auth
  },
  setToken(state, tkn) {
    state.token = tkn
  },
  setUser(state, user) {
    state.user = user
  },
  setPagination(state, pagination) {
    state.pages = pagination
  },
}

// export const actions = {
//   fetchCounter({ state }) {
//     // make request
//     const res = { data: 10 }
//     state.counter = res.data
//     return res.data
//   },
//   setToken({ state, tkn }) {
//     state.token.token = tkn
//   },
// }

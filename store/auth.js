export const state = () => {
  return {
    user: null,
    permissions: null,
    roles: null,
    token: null
  }
}

export const mutations = {
  SET_USER(state, payload) {
    this.$storage.setLocalStorage('user', payload.user || null)
    this.$storage.setLocalStorage('permissions', payload.permissions || null)
    this.$storage.setLocalStorage('roles', payload.roles || null)
    this.$storage.setLocalStorage('token', payload.token || null)

    if (payload.token) {
      // set bearer token
      this.$axios.setToken(payload.token, 'Bearer')
    }

    state.user = payload.user || null
    state.permissions = payload.permissions || null
    state.roles = payload.roles || null
    state.token = payload.token || null
  },
  CLEAR_USER(state) {
    state.token = null
    state.user = null
    state.permissions = null
    state.roles = null

    // unset authorization token
    this.$axios.setToken(false)

    this.$storage.removeLocalStorage('token')
    this.$storage.removeLocalStorage('user')
    this.$storage.removeLocalStorage('permissions')
    this.$storage.removeLocalStorage('roles')
  }
}

export const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/auth/login', data)
        .then((resp) => {
          commit('SET_USER', resp.data.payload)
          resolve(resp.data.payload)
        })
        .catch((err) => {
          commit('CLEAR_USER')
          reject(err)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('/api/auth/logout')
        .then((resp) => {
          commit('CLEAR_USER')
          resolve(resp.data.payload)
        })
        .catch((err) => {
          commit('CLEAR_USER')
          reject(err.response)
        })
    })
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  },
  hasPermission: (state) => (permission) => {
    return !!state.permissions.find((p) => p.name === permission)
  }
}

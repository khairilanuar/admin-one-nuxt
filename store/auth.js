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
    this.$storage.setUniversal('user', payload.user || null)
    this.$storage.setUniversal('permissions', payload.permissions || null)
    this.$storage.setUniversal('roles', payload.roles || null)
    this.$storage.setUniversal('token', payload.token || null)

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

    this.$storage.removeUniversal('token')
    this.$storage.removeUniversal('user')
    this.$storage.removeUniversal('permissions')
    this.$storage.removeUniversal('roles')
  }
}

export const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/login', data)
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
        .post('auth/logout')
        .then((resp) => {
          commit('CLEAR_USER')
          resolve(resp.data.payload)
        })
        .catch((err) => {
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

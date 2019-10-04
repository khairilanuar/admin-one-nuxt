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
      this.$axios.defaults.headers.common.Authorization =
        'Bearer ' + payload.token
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

    this.$axios.defaults.headers.common.Authorization = ''

    this.$storage.removeUniversal('token')
    this.$storage.removeUniversal('user')
    this.$storage.removeUniversal('permissions')
    this.$storage.removeUniversal('roles')
  }
}

export const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      // commit('auth_request')
      this.$axios
        .post('auth/login', data)
        .then((resp) => {
          commit('SET_USER', resp.data.data)
          resolve(resp.data.data)
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
          resolve(resp.data.data)
        })
        .catch((err) => {
          reject(err)
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
  }
}

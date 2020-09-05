import referencesMap from '~/assets/static/references_map'

export const state = () => {
  return {
    data: {
      departments: null,
      batches: null,
      courses: null,
      student_statuses: null,
      student_course_statuses: null,
    },
  }
}

export const mutations = {
  set_data(state, params) {
    state.data[params.ref] = params.data
  },
}

export const actions = {
  refData({ commit, state }, { ref, refParam = 0, force = false }) {
    return new Promise((resolve, reject) => {
      // ref keys to api url map
      const refMap = referencesMap

      if (!Object.prototype.hasOwnProperty.call(refMap, ref)) {
        reject(new Error('unmapped reference key'))
        return
      }

      if (!force) {
        const data = Object.prototype.hasOwnProperty.call(state.data, ref)
          ? state.data[ref]
          : null
        if (data !== null) {
          // return data
          resolve(data)
          return
        }
      }

      this.$axios
        .get(refMap[ref], { params: { ref: refParam || 1 } })
        .then((res) => {
          commit('set_data', { ref, data: res.data.payload })
          // eslint-disable-next-line
          // console.log(state.data)
          resolve(res.data.payload)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export const getters = {
  get: (state) => (reference) => {
    // eslint-disable-next-line no-console
    // console.log(state.data)
    // eslint-disable-next-line
    // console.log(state.data.departments)
    return state.data[reference]
  },
}

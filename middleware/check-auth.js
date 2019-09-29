export default function({ isServer, store, req, app }) {
  // If nuxt generate, pass this middleware
  // eslint-disable-next-line no-useless-return
  if (isServer && !req) return

  // eslint-disable-next-line no-unused-vars
  const loggedUser = app.$storage.getUniversal('index')
  // store.commit('SET_USER', loggedUser)
}

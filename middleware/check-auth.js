export default function({ isServer, store, req, app }) {
  // If nuxt generate, pass this middleware
  // eslint-disable-next-line no-useless-return
  // if (isServer && !req) return
  store.commit('auth/SET_USER', {
    roles: app.$storage.getUniversal('roles'),
    permissions: app.$storage.getUniversal('permissions'),
    token: app.$storage.getUniversal('token'),
    user: app.$storage.getUniversal('user')
  })
}

/*

export default async ({ redirect, route, store, req, $axios }) => {
  // If nuxt generate, pass this middleware
  if (process.static) {
    return
  }
  const maybeReq = process.server ? req : null
  const hasSession = maybeReq !== null && !!maybeReq.session
  let maybeAuthenticated = await store.getters['auth/isAuthenticated']
  // eslint-disable-next-line no-console
  console.log(hasSession)
  // console.log(maybeAuthenticated)
  if (hasSession === true && maybeAuthenticated === false) {
    const { data } = await $axios.get('/hpi/auth/whois')
    store.commit('SET_USER', data)
    maybeAuthenticated = data.authenticated || false
  }
  const currentPath = route.path
  const isNotLogin = currentPath !== '/login'
  if (isNotLogin && maybeAuthenticated === false) {
    redirect('/login', { page: route.fullPath })
  }
}
*/

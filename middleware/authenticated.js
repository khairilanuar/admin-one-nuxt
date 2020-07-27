import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default function ({ store, redirect, route, from, _ }) {
  // check authenticated
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/login')
  }

  // check for permission
  const permission = route.meta.reduce(
    (permission, meta) => meta.permission || permission,
    null
  )
  if (permission !== null) {
    if (!store.getters['auth/hasPermission'](permission)) {
      redirect(from.fullPath === route.fullPath ? '/' : from.fullPath)
      Snackbar.open({
        message: `Error! You don't have permission to access: ${route.fullPath}`,
        type: 'is-danger',
        queue: false
      })
    }
  }

  // Get authorizations for matched routes (with children routes too)
  // Doc: https://github.com/nuxt/nuxt.js/issues/1687#issuecomment-331870619
  /*
  const authorizationLevels = route.meta.map((meta) => {
    if (meta.auth && typeof meta.auth.authority !== 'undefined')
      return meta.auth.authority
    return 0
  })
  */

  // eslint-disable-next-line no-console
  // console.log(route)
  // eslint-disable-next-line no-console
  // console.log(from)
  // eslint-disable-next-line no-console
  // console.log(app)
}

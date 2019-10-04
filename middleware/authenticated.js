export default function({ store, redirect }) {
  // eslint-disable-next-line no-console
  // console.log(store.getters['auth/isAuthenticated'])
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/login')
  }
  // TODO: check for permission
}

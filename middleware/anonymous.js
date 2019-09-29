export default function({ store, redirect }) {
  if (store.auth.getters.isAuthenticated) {
    return redirect('/')
  }
}

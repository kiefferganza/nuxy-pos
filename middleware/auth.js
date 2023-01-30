export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.auth.user.accessToken) {
    return redirect('/login')
  }
}

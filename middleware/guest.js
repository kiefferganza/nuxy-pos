export default function ({ store, redirect }) {
  // If the user is logged in
  if (store.state.auth.user.accessToken) {
    return redirect('/')
  }
}

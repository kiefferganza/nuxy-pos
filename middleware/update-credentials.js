import { isValidMethod } from '../js/utils/credentials-reset'

export default function ({ route, redirect, store }) {
  // If the user is not authenticated
  const { type } = route.query
  if (!store.state.auth.person.code) {
    return redirect('/login')
  }
  if (!isValidMethod(type)) {
    return redirect('/login')
  }
}

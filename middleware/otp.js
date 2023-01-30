/*
 * User can only access otp pages when person code is present
 */
import { isValidMethod } from '../js/utils/credentials-reset'

export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  const { type, method } = route.query
  if (!store.state.auth.person.code) {
    return redirect('/login')
  } else if (type && method) {
    if (type.toLowerCase() !== 'reset' || !isValidMethod(method)) {
      return redirect('/login')
    }
  }
}

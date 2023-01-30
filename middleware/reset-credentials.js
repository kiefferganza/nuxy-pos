import { isValidMethod } from '@/js/utils/credentials-reset'

export default function ({ route, redirect }) {
  // If the user is not authenticated
  const { type } = route.query
  if (!isValidMethod(type)) {
    return redirect('/login')
  }
}

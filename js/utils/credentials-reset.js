import { PASSWORD, PIN } from '../constants/reset-credential-types'

export const isValidMethod = (type) => {
  return [PIN, PASSWORD].includes(type.toLowerCase())
}

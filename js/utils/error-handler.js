export const returnFirstError = (error) => {
  return Array.isArray(error) ? error[0] : error
}

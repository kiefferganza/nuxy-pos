// TODO USE COOKIES https://www.npmjs.com/package/cookie-universal-nuxt
export default () => {
  return {
    permissions: [],
    fetchPermissionState: false,
    updatePermissionState: false,
    permissionUpdateError: null,
  }
}

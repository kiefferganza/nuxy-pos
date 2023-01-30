// TODO USE COOKIES https://www.npmjs.com/package/cookie-universal-nuxt
export default () => {
  return {
    roles: [],
    rolePermissions: [],
    paginationLength: 0,
    page: 1,
    fetchRoleState: false,
    fetchRolePermissionsState: false,
  }
}

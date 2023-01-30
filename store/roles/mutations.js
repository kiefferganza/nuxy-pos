export default {
  setRoleList(state, payload) {
    state.roles = payload
  },
  setRolePermissions(state, payload) {
    state.rolePermissions = payload
  },
  setPaginationLength(state, payload) {
    state.paginationLength = payload
  },
  setCurrentPage(state, payload) {
    state.page = payload
  },
  setFetchRolesState(state, payload) {
    state.fetchRoleState = payload
  },
  setFetchRolePermissionsState(state, payload) {
    state.fetchRolePermissionsState = payload
  },
}

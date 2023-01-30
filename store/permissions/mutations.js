export default {
  setPermissionList(state, payload) {
    state.permissions = payload
  },
  setFetchPermissionsState(state, payload) {
    state.fetchPermissionState = payload
  },
  setUpdatePermissionState(state, payload) {
    state.updatePermissionState = payload
  },
  setPermissionUpdateError(state, payload) {
    state.permissionUpdateError = payload
  },
}

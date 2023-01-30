import { UPDATE_ROLE_ACCESS_SUCCESS } from '@/js/constants/toast-messages'

export default {
  async fetchPermissions({ commit }) {
    commit('setFetchPermissionsState', true)
    await this.$api
      .get('users/permissions')
      .then(({ data }) => {
        commit('setPermissionList', data.data)
        commit('setFetchPermissionsState', false)
      })
      .catch(() => {
        commit('setFetchPermissionsState', false)
      })
  },
  async assignPermissions({ commit }, { id, permissions }) {
    commit('setUpdatePermissionState', true)
    commit('setPermissionUpdateError', null)
    await this.$api
      .patch(`users/roles/${id}/access`, {
        permissions,
      })
      .then(({ data }) => {
        commit('setUpdatePermissionState', false)
        this.app.$toast.success(UPDATE_ROLE_ACCESS_SUCCESS)
      })
      .catch(({ response }) => {
        this.app.$toast.error(response.data.message)
        commit('setPermissionUpdateError', response.data.message)
        commit('setUpdatePermissionState', false)
      })
  },
}

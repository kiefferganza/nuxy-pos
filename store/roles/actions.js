export default {
  async fetchRoles({ commit, state }) {
    commit('setFetchRolesState', true)
    await this.$api
      .get('users/roles', {
        params: {
          page: state.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setRoleList', data.data.roles)
        commit('setFetchRolesState', false)
        commit('setPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setFetchRolesState', false)
        commit('setRoleList', [])
        commit('setPaginationLength', 0)
      })
  },
  async fetchRolePermissions({ commit, state }, payload) {
    commit('setFetchRolePermissionsState', true)
    await this.$api
      .get(`users/roles/${payload}/access`)
      .then(({ data }) => {
        commit('setRolePermissions', data.data.permissions)
        commit('setFetchRolePermissionsState', false)
      })
      .catch((e) => {
        commit('setFetchRolePermissionsState', false)
        commit('setRolePermissions', [])
      })
  },
}

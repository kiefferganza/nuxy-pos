export default {
  async fetchDashboardData({ commit }, payload) {
    commit('setFetchingStats', true)
    await this.$api
      .get('back-office/dashboard')
      .then(({ data }) => {
        commit('setFetchingStats', false)
        commit('setDashboardStats', data.data.dashboardData)
      })
      .catch(({ response }) => {
        commit('setFetchingStats', false)
        commit('setFetchingStats', false)
      })
  },
}

export default {
  setDashboardStats(state, payload) {
    state.stats = payload
  },
  setFetchingStats(state, payload) {
    state.fetchingStats = payload
  },
  setDashboardError(state, payload) {
    state.dashboardError = payload
  },
}

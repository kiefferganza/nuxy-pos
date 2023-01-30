export default {
  async fetchRegions({ commit, state }) {
    commit('setRegionState', true)
    commit('setCitiesList', [])
    await this.$api
      .get('helpers/regions')
      .then(({ data }) => {
        commit('setRegionList', data.data.regions)
        commit('setRegionState', false)
      })
      .catch(() => {
        commit('setRegionList', [])
        commit('setRegionState', false)
      })
  },
  async fetchProvinces({ commit, state }, payload) {
    commit('setProvinceState', true)
    commit('setCitiesList', [])
    await this.$api
      .get(`helpers/regions/${payload}/provinces`)
      .then(({ data }) => {
        commit('setProvinceList', data.data.provinces)
        commit('setProvinceState', false)
      })
      .catch(() => {
        commit('setProvinceList', [])
        commit('setProvinceState', false)
      })
  },

  async fetchCities({ commit, state }, payload) {
    commit('setCitiesState', true)
    commit('setCitiesList', [])
    await this.$api
      .get(`helpers/provinces/${payload}/cities`)
      .then(({ data }) => {
        commit('setCitiesList', data.data.cities)
        commit('setCitiesState', false)
      })
      .catch(() => {
        commit('setCitiesList', [])
        commit('setCitiesState', false)
      })
  },
}

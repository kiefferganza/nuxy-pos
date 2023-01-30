export default {
  setRegionList(state, payload) {
    state.regions.list = payload
  },
  setRegionState(state, payload) {
    state.regions.fetch = payload
  },
  setProvinceList(state, payload) {
    state.provinces.list = payload
  },
  setProvinceState(state, payload) {
    state.provinces.fetch = payload
  },
  setCitiesList(state, payload) {
    state.cities.list = payload
  },
  setCitiesState(state, payload) {
    state.cities.fetch = payload
  },
}

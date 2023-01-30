export default {
  formattedRegions(state) {
    return state.regions.list.map(({ description, regionName, regionID }) => {
      return {
        name: `${regionName} - ${description}`,
        value: regionID,
      }
    })
  },
  formattedProvinces(state) {
    return state.provinces.list.map(({ province, provinceID }) => {
      return {
        name: province,
        value: provinceID,
      }
    })
  },
  formattedCities(state) {
    return state.cities.list.map(({ city, cityID }) => {
      return {
        name: city,
        value: cityID,
      }
    })
  },
}

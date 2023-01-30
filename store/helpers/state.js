// TODO USE COOKIES https://www.npmjs.com/package/cookie-universal-nuxt
// TODO: refactor users object

export default () => {
  return {
    regions: {
      fetch: false,
      list: [],
    },
    provinces: {
      fetch: false,
      list: [],
    },
    cities: {
      fetch: false,
      list: [],
    },
  }
}

export default () => {
  return {
    users: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    merchantRequests: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    pendingMerchantRequests: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    roles: {
      fetch: false,
      list: [],
    },
    userCreate: {
      fetch: false,
      error: '',
    },
    aggregatorCreate: {
      fetch: false,
      error: '',
    },
    merchantRequestCreate: {
      fetch: false,
      error: '',
    },
    pendingMerchantRequestCreate: {
      fetch: false,
      error: '',
    },
  }
}

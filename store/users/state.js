// TODO USE COOKIES https://www.npmjs.com/package/cookie-universal-nuxt
// TODO: refactor users object

export default () => {
  return {
    users: [],
    paginationLength: 0,
    page: 1,
    fetchUserState: false,
    userLogoutState: false,
    userLogoutError: null,
    updateRoleState: false,
    roleUpdateError: null,
    onlineUsers: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    kyc: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    pendingKyc: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    userLockRequest: {
      paginationLength: 0,
      page: 1,
      fetchUserLockRequestState: false,
      updateUserLockRequestState: false,
      userLockRequestError: null,
      list: [],
    },

    userCreate: {
      fetch: false,
      error: '',
    },
    pendingUserCreate: {
      fetch: false,
      error: '',
    },
    userDetailsRequests: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    pendingUserLockRequests: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    pendingUserLockRequestCreate: {
      fetch: false,
      error: '',
    },
    pendingUserDetailsRequests: {
      fetch: false,
      paginationLength: 0,
      page: 1,
      list: [],
    },
    kycCreate: {
      fetch: false,
      error: '',
    },
  }
}

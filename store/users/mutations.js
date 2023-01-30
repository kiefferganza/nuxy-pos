export default {
  setUserCreateState(state, payload) {
    state.userCreate.fetch = payload
  },
  setUserCreateError(state, payload) {
    state.userCreate.error = payload
  },
  setUserList(state, payload) {
    state.users = payload
  },
  setUserLockRequest(state, payload) {
    state.userLockRequest.list = payload
  },
  setUserLockUpdateError(state, payload) {
    state.userLockRequest.userLockRequestError = payload
  },
  setUserLockPaginationLength(state, payload) {
    state.userLockRequest.paginationLength = payload
  },
  setUserLockCurrentPage(state, payload) {
    state.userLockRequest.page = payload
  },
  setPendingUserLockCurrentPage(state, payload) {
    state.pendingUserLockRequests.page = payload
  },
  setPaginationLength(state, payload) {
    state.paginationLength = payload
  },
  setCurrentPage(state, payload) {
    state.page = payload
  },
  setUserLogoutState(state, payload) {
    state.userLogoutState = payload
  },
  setUserLogoutError(state, payload) {
    state.userLogoutError = payload
  },
  setFetchUsersState(state, payload) {
    state.fetchUserState = payload
  },
  setUpdateRoleState(state, payload) {
    state.updateRoleState = payload
  },
  setFetchUserLockRequestState(state, payload) {
    state.userLockRequest.fetchUserLockRequestState = payload
  },
  setUpdateUserLockRequestState(state, payload) {
    state.userLockRequest.updateUserLockRequestState = payload
  },
  setOnlineUsersList(state, payload) {
    state.onlineUsers.list = payload
  },
  setOnlineUsersState(state, payload) {
    state.onlineUsers.fetch = payload
  },
  setOnlineUsersCurrentPage(state, payload) {
    state.onlineUsers.page = payload
  },
  setOnlineUsersPaginationLength(state, payload) {
    state.onlineUsers.paginationLength = payload
  },
  setRoleUpdateError(state, payload) {
    state.roleUpdateError = payload
  },
  setUserRole(state, { id, roleId, roles }) {
    const user = state.users.find(({ UserID }) => UserID === id)
    user.RoleID = roleId
    user.RoleName = roles.find(({ RoleID }) => RoleID === roleId).Name
  },
  setLockRequestStatus(state, payload) {
    const lockRequest = state.userLockRequest.list.find(
      (e) => e.id === payload.stagingId
    )
    lockRequest.recordStatus = payload.status === 0 ? 2 : 1
  },
  setPendingLockRequestStatus(state, payload) {
    if (state.pendingUserLockRequests.length > 0) {
      const lockRequest = state.pendingUserLockRequests.list.find(
        (e) => e.id === payload.stagingId
      )
      lockRequest.recordStatus = payload.status === 0 ? 2 : 1
    }
  },
  setUserDetailsRequestList(state, payload) {
    state.userDetailsRequests.list = payload
  },
  setUserDetailsRequestState(state, payload) {
    state.userDetailsRequests.fetch = payload
  },
  setUserDetailsRequestCurrentPage(state, payload) {
    state.userDetailsRequests.page = payload
  },
  setUserDetailsRequestPaginationLength(state, payload) {
    state.userDetailsRequests.paginationLength = payload
  },
  setUserDetailsRequestStatus(state, payload) {
    state.userDetailsRequests.list = state.userDetailsRequests.list.map(
      (data) => {
        if (payload.id === data.id) {
          return {
            ...data,
            recordStatus: payload.status === 0 ? 2 : payload.status,
          }
        }
        return {
          ...data,
        }
      }
    )
  },
  setPendingUserCreateState(state, payload) {
    state.pendingUserCreate.fetch = payload
  },
  setPendingUserCreateError(state, payload) {
    state.pendingUserCreate.error = payload
  },
  setPendingUserDetailsRequestList(state, payload) {
    state.pendingUserDetailsRequests.list = payload
  },
  setPendingUserDetailsRequestState(state, payload) {
    state.pendingUserDetailsRequests.fetch = payload
  },
  setPendingUserDetailsRequestCurrentPage(state, payload) {
    state.pendingUserDetailsRequests.page = payload
  },
  setPendingUserDetailsRequestPaginationLength(state, payload) {
    state.pendingUserDetailsRequests.paginationLength = payload
  },
  setPendingUserDetailsRequestStatus(state, payload) {
    state.pendingUserDetailsRequests.list =
      state.pendingUserDetailsRequests.list.map((data) => {
        if (payload.id === data.id) {
          return {
            ...data,
            recordStatus: payload.status === 0 ? 2 : payload.status,
          }
        }
        return {
          ...data,
        }
      })
  },
  setKycList(state, payload) {
    state.kyc.list = payload
  },
  setKycRequestStatus(state, payload) {
    state.kyc.list = state.kyc.list.map((data) => {
      if (payload.id === data.id) {
        return {
          ...data,
          recordStatus: parseInt(payload.status),
          remarks: payload.remarks,
        }
      }
      return {
        ...data,
      }
    })
  },
  setKycState(state, payload) {
    state.kyc.fetch = payload
  },
  setKycCurrentPage(state, payload) {
    state.kyc.page = payload
  },
  setKycPaginationLength(state, payload) {
    state.kyc.paginationLength = payload
  },
  setPendingKycList(state, payload) {
    state.pendingKyc.list = payload
  },
  setPendingKycRequestStatus(state, payload) {
    state.pendingKyc.list = state.pendingKyc.list.map((data) => {
      if (payload.id === data.id) {
        return {
          ...data,
          recordStatus: parseInt(payload.status),
          remarks: payload.remarks,
        }
      }
      return {
        ...data,
      }
    })
  },
  setPendingKycState(state, payload) {
    state.pendingKyc.fetch = payload
  },
  setPendingKycCurrentPage(state, payload) {
    state.pendingKyc.page = payload
  },
  setPendingKycPaginationLength(state, payload) {
    state.pendingKyc.paginationLength = payload
  },
  setKycCreateState(state, payload) {
    state.kycCreate.fetch = payload
  },
  setKycCreateError(state, payload) {
    state.kycCreate.error = payload
  },
  setPendingUserLockRequestState(state, payload) {
    state.pendingUserLockRequests.fetch = payload
  },
  setPendingUserLockRequestPaginationLength(state, payload) {
    state.pendingUserLockRequests.paginationLength = payload
  },
  setPendingUserLockRequests(state, payload) {
    state.pendingUserLockRequests.list = payload
  },
}

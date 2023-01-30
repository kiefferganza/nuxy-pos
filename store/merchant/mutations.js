export default {
  setUsersList(state, payload) {
    state.users.list = payload
  },
  updateUsersList(state, payload) {
    state.users.list = state.users.list.map((user) => {
      if (user.PersonCode === payload.personCode) {
        return {
          ...user,
          FirstName: payload.firstName,
          LastName: payload.lastName,
          MiddleName: payload.middleName,
          Gender: payload.gender,
          RoleID: payload.roleId,
          Birthdate: payload.birthDate,
        }
      }
      return {
        ...user,
      }
    })
  },
  setUsersState(state, payload) {
    state.users.fetch = payload
  },
  setUsersCurrentPage(state, payload) {
    state.users.page = payload
  },
  setUsersPaginationLength(state, payload) {
    state.users.paginationLength = payload
  },
  setRolesList(state, payload) {
    state.roles.list = payload
  },
  setRolesListState(state, payload) {
    state.roles.fetch = payload
  },
  setUserCreateState(state, payload) {
    state.userCreate.fetch = payload
  },
  setUserCreateError(state, payload) {
    state.userCreate.error = payload
  },
  setMerchantRequestList(state, payload) {
    state.merchantRequests.list = payload
  },
  setMerchantRequestState(state, payload) {
    state.merchantRequests.fetch = payload
  },
  setMerchantRequestPaginationLength(state, payload) {
    state.merchantRequests.paginationLength = payload
  },
  setMerchantCreateState(state, payload) {
    state.merchantRequestCreate.fetch = payload
  },
  setMerchantCreateError(state, payload) {
    state.merchantRequestCreate.error = payload
  },
  setMerchantRequestCurrentPage(state, payload) {
    state.merchantRequests.page = payload
  },
  updateMerchantRequestList(state, payload) {
    state.merchantRequests.list = state.merchantRequests.list.map((data) => {
      if (data.ID === payload.id) {
        return {
          ...data,
          RecordStatus: payload.status === 0 ? 2 : payload.status,
          Remarks: payload.remarks,
        }
      }
      return {
        ...data,
      }
    })
  },
  setPendingMerchantRequestList(state, payload) {
    state.pendingMerchantRequests.list = payload
  },
  setPendingMerchantRequestState(state, payload) {
    state.pendingMerchantRequests.fetch = payload
  },
  setPendingMerchantRequestPaginationLength(state, payload) {
    state.pendingMerchantRequests.paginationLength = payload
  },
  setPendingMerchantCreateState(state, payload) {
    state.pendingMerchantRequestCreate.fetch = payload
  },
  setPendingMerchantCreateError(state, payload) {
    state.pendingMerchantRequestCreate.error = payload
  },
  setPendingMerchantRequestCurrentPage(state, payload) {
    state.pendingMerchantRequests.page = payload
  },
  updatePendingMerchantRequestList(state, payload) {
    state.pendingMerchantRequests.list = state.pendingMerchantRequests.list.map(
      (data) => {
        if (data.ID === payload.id) {
          return {
            ...data,
            RecordStatus: payload.status === 0 ? 2 : payload.status,
            Remarks: payload.remarks,
          }
        }
        return {
          ...data,
        }
      }
    )
  },
}

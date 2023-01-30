import {
  FORCE_LOGOUT_USER_SUCCESS,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_LOCK_REQUEST_SUCCESS,
  CREATE_USER_SUCCESS,
  UPDATE_USER_DETAIL_REQUEST_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_KYC_SUCCESS,
} from '@/js/constants/toast-messages'
import { returnFirstError } from '@/js/utils/error-handler'

export default {
  async fetchUsers({ commit, state }) {
    commit('setFetchUsersState', true)
    await this.$api
      .get('users', {
        params: {
          page: state.page,
          limit: 10,
          isActive: false,
        },
      })
      .then(({ data }) => {
        commit('setUserList', data.data.users)
        commit('setFetchUsersState', false)
        commit('setPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setFetchUsersState', false)
        commit('setUserList', [])
        commit('setPaginationLength', 0)
      })
  },
  async fetchOnlineUsers({ commit, state }) {
    commit('setOnlineUsersState', true)
    await this.$api
      .get('users', {
        params: {
          page: state.onlineUsers.page,
          limit: 10,
          isActive: true,
        },
      })
      .then(({ data }) => {
        commit('setOnlineUsersList', data.data.users)
        commit('setOnlineUsersState', false)
        commit('setOnlineUsersPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setOnlineUsersState', false)
        commit('setOnlineUsersList', [])
        commit('setOnlineUsersPaginationLength', 0)
      })
  },

  async fetchLockRequests({ commit, state }) {
    commit('setFetchUserLockRequestState', true)
    await this.$api
      .get('users/lock/requests', {
        params: {
          page: state.userLockRequest.page,
          limit: 10,
          status: null,
        },
      })
      .then(({ data }) => {
        commit('setFetchUserLockRequestState', false)
        commit('setUserLockPaginationLength', data.data.max)
        commit('setUserLockRequest', data.data.userLockRequests)
      })
      .catch(() => {
        commit('setFetchUserLockRequestState', false)
      })
  },
  async fetchPendingLockRequests({ commit, state }) {
    commit('setPendingUserLockRequestState', true)
    await this.$api
      .get('users/lock/requests', {
        params: {
          page: state.pendingUserLockRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingUserLockRequestState', false)
        commit('setPendingUserLockRequestPaginationLength', data.data.max)
        commit('setPendingUserLockRequests', data.data.userLockRequests)
      })
      .catch(() => {
        commit('setPendingUserLockRequestState', false)
      })
  },

  async assignRole({ commit, rootState }, { id, roleId }) {
    commit('setUpdateRoleState', true)
    commit('setRoleUpdateError', null)
    await this.$api
      .patch(`users/${id}/roles`, {
        roleId,
      })
      .then(() => {
        commit('setUpdateRoleState', false)
        commit('setUserRole', { id, roleId, roles: rootState.roles.roles })
        this.app.$toast.success(UPDATE_USER_ROLE_SUCCESS)
      })
      .catch(({ response }) => {
        this.app.$toast.error(response.data.message)
        commit('setRoleUpdateError', response.data.message)
        commit('setUpdateRoleState', false)
      })
  },
  async stageLockUser({ commit, rootState }, { id, isLocked }) {
    await this.$api
      .put(`users/${id}/lock/stage`, {
        isLocked,
      })
      .then(({ data }) => {
        this.app.$toast.success(data.message)
      })
      .catch(({ response }) => {
        this.app.$toast.error(returnFirstError(response.data.message))
      })
  },
  async approveUserLock({ commit }, { status, stagingId }) {
    commit('setUpdateUserLockRequestState', true)

    await this.$api
      .put(`users/lock/${stagingId}`, {
        status,
        stagingID: stagingId,
      })
      .then(() => {
        commit('setLockRequestStatus', { status, stagingId })
        commit('setPendingLockRequestStatus', { status, stagingId })
        commit('setUpdateUserLockRequestState', false)
        this.app.$toast.success(UPDATE_USER_LOCK_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit(
          'setUserLockUpdateError',
          returnFirstError(response.data.message)
        )
        commit('setUpdateUserLockRequestState', false)
        this.app.$toast.error(returnFirstError(response.data.message))
      })
  },
  async approvePendingUserLock({ commit }, { status, stagingId }) {
    commit('setUpdateUserLockRequestState', true)

    await this.$api
      .put(`users/lock/${stagingId}`, {
        status,
        stagingID: stagingId,
      })
      .then(() => {
        commit('setPendingLockRequestStatus', { status, stagingId })
        commit('setLockRequestStatus', { status, stagingId })
        commit('setUpdateUserLockRequestState', false)
        this.app.$toast.success(UPDATE_USER_LOCK_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit(
          'setUserLockUpdateError',
          returnFirstError(response.data.message)
        )
        commit('setUpdateUserLockRequestState', false)
        this.app.$toast.error(returnFirstError(response.data.message))
      })
  },

  async forceLogoutUser({ commit }, payload) {
    commit('setUserLogoutState', true)
    commit('setUserLogoutError', '')
    await this.$api
      .post(`users/${payload.code}/logout`)
      .then(() => {
        commit('setUserLogoutState', false)
        this.app.$toast.success(FORCE_LOGOUT_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserLogoutState', false)
        commit('setUserLogoutError', response.data.message)
      })
  },

  async createUser({ commit }, payload) {
    commit('setUserCreateState', true)
    commit('setUserCreateError', '')
    await this.$api
      .post(`back-office/users/create`, {
        ...payload,
      })
      .then(() => {
        commit('setUserCreateState', false)
        this.app.$toast.success(CREATE_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserCreateError', response.data.message)
        commit('setUserCreateState', false)
      })
  },
  async updateUser({ commit }, payload) {
    commit('setUserCreateState', true)
    commit('setUserCreateError', '')
    await this.$api
      .put(`back-office/users/update`, {
        ...payload,
      })
      .then(() => {
        commit('setUserCreateState', false)
        this.app.$toast.success(UPDATE_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserCreateError', response.data.message)
        commit('setUserCreateState', false)
      })
  },

  async fetchUserDetailRequests({ commit, state }) {
    commit('setUserDetailsRequestState', true)
    await this.$api
      .get('/back-office/users/stage/list', {
        params: {
          page: state.userDetailsRequests.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setUserDetailsRequestList', data.data.stagedUsers)
        commit('setUserDetailsRequestState', false)
        commit('setUserDetailsRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setUserDetailsRequestList', [])
        commit('setUserDetailsRequestState', false)
        commit('setUserDetailsRequestPaginationLength', 0)
      })
  },
  async fetchPendingUserDetailsRequests({ commit, state }) {
    commit('setPendingUserDetailsRequestState', true)
    await this.$api
      .get('/back-office/users/stage/list', {
        params: {
          page: state.userDetailsRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingUserDetailsRequestList', data.data.stagedUsers)
        commit('setPendingUserDetailsRequestState', false)
        commit('setPendingUserDetailsRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingUserDetailsRequestList', [])
        commit('setPendingUserDetailsRequestState', false)
        commit('setPendingUserDetailsRequestPaginationLength', 0)
      })
  },
  async updateUserDetailRequest({ commit }, payload) {
    commit('setUserCreateState', true)
    commit('setUserCreateError', '')
    await this.$api
      .put(`/back-office/users/update/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setUserCreateState', false)
        commit('setUserDetailsRequestStatus', payload)
        commit('setPendingUserDetailsRequestStatus', payload)
        this.app.$toast.success(UPDATE_USER_DETAIL_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserCreateState', false)
        commit('setUserCreateError', response.data.message)
      })
  },
  async updatePendingUserDetailRequest({ commit }, payload) {
    console.log(payload)
    commit('setUserCreateState', true)
    commit('setUserCreateError', '')
    await this.$api
      .put(`/back-office/users/update/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setUserCreateState', false)
        commit('setPendingUserDetailsRequestStatus', payload)
        commit('setUserDetailsRequestStatus', payload)
        this.app.$toast.success(UPDATE_USER_DETAIL_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserCreateState', false)
        commit('setUserCreateError', response.data.message)
      })
  },
  async fetchKyc({ commit, state }) {
    commit('setKycState', true)
    await this.$api
      .get('/persons/kyc/fetch', {
        params: {
          page: state.kyc.page,
          size: 10,
        },
      })
      .then(({ data }) => {
        commit('setKycList', data.data.list)
        commit('setKycState', false)
        commit('setKycPaginationLength', data.data.maxRecord)
      })
      .catch(() => {
        commit('setKycList', [])
        commit('setKycState', false)
        commit('setKycPaginationLength', 0)
      })
  },
  async fetchPendingKyc({ commit, state }) {
    commit('setPendingKycState', true)
    await this.$api
      .get('/persons/kyc/fetch', {
        params: {
          page: state.kyc.page,
          size: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingKycList', data.data.list)
        commit('setPendingKycState', false)
        commit('setPendingKycPaginationLength', data.data.maxRecord)
      })
      .catch(() => {
        commit('setPendingKycList', [])
        commit('setPendingKycState', false)
        commit('setPendingKycPaginationLength', 0)
      })
  },
  async updateKyc({ commit, state }, payload) {
    const remarks = payload.remarks ?? ''
    commit('setKycCreateState', true)
    commit('setKycCreateError', '')
    await this.$api
      .post('/persons/kyc/verify', {
        stagingId: payload.id,
        status: payload.status,
        remarks,
      })
      .then(({ data }) => {
        commit('setKycCreateState', false)
        commit('setKycRequestStatus', payload)
        commit('setPendingKycRequestStatus', payload)
        this.app.$toast.success(UPDATE_KYC_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setKycCreateState', false)
        commit('setKycCreateError', response.data.message)
      })
  },
  async updatePendingKyc({ commit, state }, payload) {
    const remarks = payload.remarks ?? ''
    commit('setKycCreateState', true)
    commit('setKycCreateError', '')
    await this.$api
      .post('/persons/kyc/verify', {
        stagingId: payload.id,
        status: payload.status,
        remarks,
      })
      .then(({ data }) => {
        commit('setKycCreateState', false)
        commit('setPendingKycRequestStatus', payload)
        commit('setKycRequestStatus', payload)
        this.app.$toast.success(UPDATE_KYC_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setKycCreateState', false)
        commit('setKycCreateError', response.data.message)
      })
  },
}

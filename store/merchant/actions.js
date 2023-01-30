import {
  CREATE_MERCHANT_SUB_USER_SUCCESS,
  UPDATE_MERCHANT_SUB_USER_SUCCESS,
} from '@/js/constants/toast-messages'

export default {
  async fetchSubUsers({ commit, state }) {
    commit('setUsersState', true)
    await this.$api
      .get('/merchants/users', {
        params: {
          page: state.users.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setUsersList', data.data.users)
        commit('setUsersState', false)
        commit('setUsersPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setUsersState', false)
        commit('setUsersList', [])
        commit('setUsersPaginationLength', 0)
      })
  },
  async fetchMerchantRoles({ commit }) {
    commit('setRolesListState', true)
    await this.$api
      .get('/merchants/users/roles')
      .then(({ data }) => {
        commit('setRolesList', data.data.roles)
        commit('setRolesListState', false)
      })
      .catch(() => {
        commit('setRolesListState', false)
        commit('setRolesList', [])
      })
  },
  async createSubUser({ commit, rootState }, payload) {
    commit('setUserCreateState', true)
    commit('setUserCreateError', '')
    await this.$api
      .post('/merchants/users/create', {
        ...payload,
        merchantCode: rootState.auth.user.merchantCode,
      })
      .then(() => {
        commit('setUserCreateState', false)
        this.app.$toast.success(CREATE_MERCHANT_SUB_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserCreateState', false)
        commit('setUserCreateError', response.data.message)
      })
  },
  async updateSubUser({ commit, rootState }, payload) {
    commit('setUserCreateState', true)
    commit('setUserCreateError', '')
    await this.$api
      .put(`/merchants/users/${payload.personCode}/update`, payload)
      .then(() => {
        commit('setUserCreateState', false)
        commit('updateUsersList', payload)
        this.app.$toast.success(UPDATE_MERCHANT_SUB_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setUserCreateState', false)
        commit('setUserCreateError', response.data.message)
      })
  },
  async fetchMerchantRequests({ commit, state }) {
    commit('setMerchantRequestState', true)
    await this.$api
      .get('/merchants/requests', {
        params: {
          page: state.merchantRequests.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setMerchantRequestState', false)
        commit('setMerchantRequestList', data.data.list)
        commit('setMerchantRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setMerchantRequestState', false)
        commit('setMerchantRequestList', [])
        commit('setMerchantRequestPaginationLength', 0)
      })
  },
  async fetchPendingMerchantRequests({ commit, state }) {
    commit('setPendingMerchantRequestState', true)
    await this.$api
      .get('/merchants/requests', {
        params: {
          page: state.pendingMerchantRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingMerchantRequestState', false)
        commit('setPendingMerchantRequestList', data.data.list)
        commit('setPendingMerchantRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingMerchantRequestState', false)
        commit('setPendingMerchantRequestList', {})
        commit('setPendingMerchantRequestPaginationLength', 0)
      })
  },
  async updateMerchantRequest({ commit, state }, payload) {
    commit('setMerchantCreateState', true)
    await this.$api
      .put(`/merchants/request/${payload.id}/update`, {
        status: payload.status,
        remarks: payload.remarks,
      })
      .then(() => {
        commit('setMerchantCreateState', false)
        commit('setMerchantCreateError', '')
        commit('updateMerchantRequestList', payload)
        commit('updatePendingMerchantRequestList', payload)
        this.$toast.success(UPDATE_MERCHANT_SUB_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setMerchantCreateState', false)
        commit('setMerchantCreateError', response.data.message)
      })
  },
  async updatePendingMerchantRequest({ commit, state }, payload) {
    commit('setMerchantCreateState', true)
    await this.$api
      .put(`/merchants/request/${payload.id}/update`, {
        status: payload.status,
        remarks: payload.remarks,
      })
      .then(() => {
        commit('setMerchantCreateState', false)
        commit('setMerchantCreateError', '')
        commit('updatePendingMerchantRequestList', payload)
        commit('updateMerchantRequestList', payload)
        this.$toast.success(UPDATE_MERCHANT_SUB_USER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setMerchantCreateState', false)
        commit('setMerchantCreateError', response.data.message)
      })
  },
}

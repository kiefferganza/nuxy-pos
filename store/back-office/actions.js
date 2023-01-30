import {
  CREATE_BILLER_SUCCESS,
  CREATE_INSTITUTION_SUCCESS,
  CREATE_MERCHANT_AGGREGATOR_SUCCESS,
  UPDATE_AGGREGATOR_REQUEST_SUCCESS,
  UPDATE_BILLER_REQUEST_SUCCESS,
  UPDATE_BILLER_SUCCESS,
  UPDATE_INSTITUTION_REQUEST_SUCCESS,
  UPDATE_MERCHANT_AGGREGATOR_SUCCESS,
  CREATE_BUSINESS_RULES_SUCCESS,
  UPDATE_BUSINESS_RULES_SUCCESS,
  DELETE_BUSINESS_RULES_REQUEST_SUCCESS,
  CREATE_TRANSACTION_FEE_SUCCESS,
  UPDATE_TRANSACTION_FEE_SUCCESS,
  STAGE_TRANSACTION_REVERSAL_SUCCESS,
  UPDATE_TRANSACTION_FEE_REQUEST_SUCCESS,
  UPDATE_BUSINESS_RULES_REQUEST_SUCCESS,
} from '@/js/constants/toast-messages'

export default {
  async fetchMerchantInstitutions({ commit, state }, payload) {
    const q = payload ?? ''
    commit('setInstitutionState', true)
    await this.$api
      .get('/back-office/institutions', {
        params: {
          page: state.institution.page,
          limit: 10,
          q,
        },
      })
      .then(({ data }) => {
        commit('setInstitutionList', data.data.institutions)
        commit('setInstitutionState', false)
        commit('setInstitutionPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setInstitutionState', false)
        commit('setInstitutionList', [])
        commit('setInstitutionPaginationLength', 0)
      })
  },
  async fetchInstitutionTypes({ commit, state }) {
    await this.$api
      .get('/helpers/institution-types')
      .then(({ data }) => {
        commit('setInstitutionTypes', data.data.institutionTypes)
      })
      .catch(() => {
        commit('setInstitutionTypes', [])
      })
  },
  async createInstitution({ commit, rootState }, payload) {
    commit('setInstitutionCreateState', true)
    commit('setInstitutionCreateError', '')
    await this.$api
      .post('/back-office/institutions/create', {
        institutionTypeId: payload.institutionTypeId,
        name: payload.name,
      })
      .then(() => {
        commit('setInstitutionCreateState', false)
        this.app.$toast.success(CREATE_INSTITUTION_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setInstitutionCreateState', false)
        commit('setInstitutionCreateError', response.data.message)
      })
  },
  async updateInstitution({ commit, rootState }, payload) {
    commit('setInstitutionCreateState', true)
    commit('setInstitutionCreateError', '')
    await this.$api
      .put(`/back-office/institutions/${payload.institutionCode}/update`, {
        name: payload.name,
        bic: payload.bIC,
        brstn: payload.bRSTN,
        institutionTypeId: payload.institutionTypeId,
        isActive: payload.isActive,
      })
      .then((data) => {
        commit('setInstitutionCreateState', false)
        this.app.$toast.success(data.data.message)
      })
      .catch(({ response }) => {
        commit('setInstitutionCreateState', false)
        commit('setInstitutionCreateError', response.data.message)
      })
  },
  async fetchInstitutionRequest({ commit, state }) {
    commit('setInstitutionRequestState', true)
    await this.$api
      .get('/back-office/institutions/stage/list', {
        params: {
          page: state.institutionRequest.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setInstitutionRequestList', data.data.list)
        commit('setInstitutionRequestState', false)
        commit('setInstitutionRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setInstitutionRequestState', false)
        commit('setInstitutionRequestList', [])
        commit('setInstitutionRequestPaginationLength', 0)
      })
  },
  async fetchPendingInstitutionRequest({ commit, state }) {
    commit('setPendingInstitutionRequestState', true)
    await this.$api
      .get('/back-office/institutions/stage/list', {
        params: {
          page: state.institutionRequest.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingInstitutionRequestList', data.data.list)
        commit('setPendingInstitutionRequestState', false)
        commit('setPendingInstitutionRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingInstitutionRequestState', false)
        commit('setPendingInstitutionRequestList', [])
        commit('setPendingInstitutionRequestPaginationLength', 0)
      })
  },
  async approveInstitutionRequest({ commit, rootState }, payload) {
    commit('setInstitutionRequestCreateState', true)
    commit('setInstitutionRequestCreateError', '')

    await this.$api
      .put(`/back-office/institutions/${payload.type}/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setInstitutionRequestCreateState', false)
        commit('updateInstitutionRequestList', payload)
        commit('updatePendingInstitutionRequestList', payload)
        this.app.$toast.success(UPDATE_INSTITUTION_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setInstitutionRequestCreateState', false)
        commit('setInstitutionRequestCreateError', response.data.message[0])
        this.app.$toast.error(response.data.message[0])
      })
  },
  async approvePendingInstitutionRequest({ commit, rootState }, payload) {
    commit('setInstitutionRequestCreateState', true)
    commit('setInstitutionRequestCreateError', '')

    await this.$api
      .put(`/back-office/institutions/${payload.type}/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setInstitutionRequestCreateState', false)
        commit('updatePendingInstitutionRequestList', payload)
        commit('updateInstitutionRequestList', payload)
        this.app.$toast.success(UPDATE_INSTITUTION_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setInstitutionRequestCreateState', false)
        commit('setInstitutionRequestCreateError', response.data.message[0])
        this.app.$toast.error(response.data.message[0])
      })
  },
  async fetchAggregators({ commit, state }) {
    commit('setAggregatorsState', true)
    await this.$api
      .get('/back-office/aggregators', {
        params: {
          page: state.aggregators.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setAggregatorsList', data.data.aggregators)
        commit('setAggregatorsState', false)
        commit('setAggregatorsPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setAggregatorsState', false)
        commit('setAggregatorsList', [])
        commit('setAggregatorsPaginationLength', 0)
      })
  },
  async fetchDropdownAggregators({ commit, state }) {
    commit('setAggregatorsState', true)
    await this.$api
      .get('/back-office/aggregators')
      .then(({ data }) => {
        commit('setAggregatorsDropdownList', data.data.aggregators)
        commit('setAggregatorsState', false)
        commit('setAggregatorsPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setAggregatorsState', false)
        commit('setAggregatorsList', [])
        commit('setAggregatorsPaginationLength', 0)
      })
  },

  async fetchAggregatorTypes({ commit, state }) {
    commit('setAggregatorsState', true)
    await this.$api
      .get('/back-office/aggregators/types')
      .then(({ data }) => {
        commit('setAggregatorTypes', data.data.types)
        commit('setAggregatorsState', false)
      })
      .catch(() => {
        commit('setAggregatorsState', false)
      })
  },

  async fetchAggregatorInstitutions({ commit, state }, payload) {
    commit('setAggregatorInstitutionState', true)
    await this.$api
      .get(`/back-office/aggregators/${payload}/institutions`)
      .then(({ data }) => {
        commit('setAggregatorInstitutionList', data.data.institutions)
        commit('setAggregatorInstitutionState', false)
        commit('setAggregatorInstitutionPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setAggregatorInstitutionState', false)
        commit('setAggregatorInstitutionList', [])
        commit('setAggregatorInstitutionPaginationLength', 0)
      })
  },
  async createAggregator({ commit }, payload) {
    commit('setAggregatorsCreateState', true)
    commit('setAggregatorsCreateError', '')
    await this.$api
      .post('/back-office/aggregators/create', {
        ...payload,
      })
      .then(() => {
        commit('setAggregatorsCreateState', false)
        this.app.$toast.success(CREATE_MERCHANT_AGGREGATOR_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setAggregatorsCreateState', false)
        commit('setAggregatorsCreateError', response.data.message)
      })
  },

  async updateAggregator({ commit }, payload) {
    commit('setAggregatorsCreateState', true)
    commit('setAggregatorsCreateError', '')
    await this.$api
      .put(`/back-office/aggregators/${payload.id}/update`, payload)
      .then(() => {
        commit('setAggregatorsCreateState', false)
        this.app.$toast.success(UPDATE_MERCHANT_AGGREGATOR_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setAggregatorsCreateState', false)
        commit('setAggregatorsCreateError', response.data.message)
      })
  },

  async fetchAggregatorRequests({ commit, state }) {
    commit('setAggregatorRequestState', true)
    await this.$api
      .get('/back-office/aggregators/stage/list', {
        params: {
          page: state.aggregatorRequests.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setAggregatorRequestList', data.data.list)
        commit('setAggregatorRequestState', false)
        commit('setAggregatorRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setAggregatorRequestState', false)
        commit('setAggregatorRequestList', [])
        commit('setAggregatorRequestPaginationLength', 0)
      })
  },

  async fetchPendingAggregatorRequests({ commit, state }) {
    commit('setPendingAggregatorRequestState', true)
    await this.$api
      .get('/back-office/aggregators/stage/list', {
        params: {
          page: state.pendingAggregatorRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingAggregatorRequestList', data.data.list)
        commit('setPendingAggregatorRequestState', false)
        commit('setPendingAggregatorRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingAggregatorRequestState', false)
        commit('setPendingAggregatorRequestList', [])
        commit('setPendingAggregatorRequestPaginationLength', 0)
      })
  },

  async updateAggregatorRequest({ commit }, payload) {
    commit('setAggregatorsCreateState', true)
    commit('setAggregatorsCreateError', '')
    await this.$api
      .put(
        `/back-office/aggregators/${payload.type}/${payload.id}/status`,
        payload
      )
      .then(() => {
        commit('setAggregatorsCreateState', false)
        commit('setAggregatorRequestStatus', payload)
        commit('setPendingAggregatorRequestStatus', payload)
        this.app.$toast.success(UPDATE_AGGREGATOR_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setAggregatorsCreateState', false)
        commit('setAggregatorsCreateError', response.data.message)
      })
  },
  async updatePendingAggregatorRequest({ commit }, payload) {
    commit('setAggregatorsCreateState', true)
    commit('setAggregatorsCreateError', '')
    await this.$api
      .put(
        `/back-office/aggregators/${payload.type}/${payload.id}/status`,
        payload
      )
      .then(() => {
        commit('setAggregatorsCreateState', false)
        commit('setPendingAggregatorRequestStatus', payload)
        commit('setAggregatorRequestStatus', payload)
        this.app.$toast.success(UPDATE_AGGREGATOR_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setAggregatorsCreateState', false)
        commit('setAggregatorsCreateError', response.data.message)
      })
  },

  async fetchBillers({ commit, state }) {
    commit('setBillersState', true)
    await this.$api
      .get('/back-office/billers', {
        params: {
          page: state.billers.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setBillersList', data.data.billers)
        commit('setBillersState', false)
        commit('setBillersPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setBillersState', false)
        commit('setBillersList', [])
        commit('setBillersPaginationLength', 0)
      })
  },

  async createBiller({ commit }, payload) {
    commit('setBillersCreateState', true)
    commit('setBillersCreateError', '')
    await this.$api
      .post('/back-office/billers/create', {
        ...payload,
      })
      .then(() => {
        commit('setBillersCreateState', false)
        this.app.$toast.success(CREATE_BILLER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBillersCreateState', false)
        commit('setBillersCreateError', response.data.message)
      })
  },

  async updateBiller({ commit }, payload) {
    commit('setBillersCreateState', true)
    commit('setBillersCreateError', '')
    await this.$api
      .put(`/back-office/billers/${payload.id}/update`, payload)
      .then(() => {
        commit('setBillersCreateState', false)
        this.app.$toast.success(UPDATE_BILLER_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBillersCreateState', false)
        commit('setBillersCreateError', response.data.message)
      })
  },

  async fetchBillerRequests({ commit, state }) {
    commit('setBillerRequestState', true)
    await this.$api
      .get('/back-office/billers/stage/list', {
        params: {
          page: state.billerRequests.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setBillerRequestList', data.data.list)
        commit('setBillerRequestState', false)
        commit('setBillerRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setBillerRequestState', false)
        commit('setBillerRequestList', [])
        commit('setBillerRequestPaginationLength', 0)
      })
  },
  async fetchPendingBillerRequests({ commit, state }) {
    commit('setPendingBillerRequestState', true)
    await this.$api
      .get('/back-office/billers/stage/list', {
        params: {
          page: state.pendingBillerRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingBillerRequestList', data.data.list)
        commit('setPendingBillerRequestState', false)
        commit('setPendingBillerRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingBillerRequestState', false)
        commit('setPendingBillerRequestList', [])
        commit('setPendingBillerRequestPaginationLength', 0)
      })
  },

  async updateBillerRequest({ commit }, payload) {
    commit('setBillersCreateState', true)
    commit('setBillersCreateError', '')
    await this.$api
      .put(`/back-office/billers/${payload.type}/${payload.id}/status`, payload)
      .then(() => {
        commit('setBillersCreateState', false)
        commit('setBillerRequestStatus', payload)
        commit('setPendingBillerRequestStatus', payload)
        this.app.$toast.success(UPDATE_BILLER_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBillersCreateState', false)
        commit('setBillersCreateError', response.data.message)
      })
  },
  async updatePendingBillerRequest({ commit }, payload) {
    commit('setBillersCreateState', true)
    commit('setBillersCreateError', '')
    await this.$api
      .put(`/back-office/billers/${payload.type}/${payload.id}/status`, payload)
      .then(() => {
        commit('setBillersCreateState', false)
        commit('setPendingBillerRequestStatus', payload)
        commit('setBillerRequestStatus', payload)
        this.app.$toast.success(UPDATE_BILLER_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBillersCreateState', false)
        commit('setBillersCreateError', response.data.message)
      })
  },
  async fetchBillerCategories({ commit, state }) {
    await this.$api
      .get('/transactions/categories')
      .then(({ data }) => {
        commit('setBillerCategoriesList', data.data.billerCategories)
      })
      .catch(() => {
        commit('setBillerCategoriesList', [])
      })
  },
  async fetchBusinessRules({ commit, state }) {
    commit('setBusinessRulesState', true)
    await this.$api
      .get('/back-office/business-rules', {
        params: {
          page: state.businessRules.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setBusinessRulesList', data.data.businessRules)
        commit('setBusinessRulesState', false)
        commit('setBusinessRulesPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setBusinessRulesState', false)
        commit('setBusinessRulesList', [])
        commit('setBusinessRulesPaginationLength', 0)
      })
  },
  async createBusinessRules({ commit }, payload) {
    commit('setBusinessRulesCreateState', true)
    commit('setBusinessRulesCreateError', '')
    await this.$api
      .post('/back-office/business-rules/create', {
        name: payload.name,
        description: payload.description,
        value: payload.value,
      })
      .then(() => {
        commit('setBusinessRulesCreateState', false)
        this.app.$toast.success(CREATE_BUSINESS_RULES_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBusinessRulesCreateState', false)
        commit('setBusinessRulesCreateError', response.data.message)
      })
  },
  async updateBusinessRules({ commit }, payload) {
    commit('setBusinessRulesCreateState', true)
    commit('setBusinessRulesCreateError', '')
    await this.$api
      .put(`/back-office/business-rules/${payload.id}/update`, {
        name: payload.name,
        description: payload.description,
        value: payload.value,
      })
      .then(() => {
        commit('setBusinessRulesCreateState', false)
        this.app.$toast.success(UPDATE_BUSINESS_RULES_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBusinessRulesCreateState', false)
        commit('setBusinessRulesCreateError', response.data.message)
      })
  },
  async deleteBusinessRules({ commit }, payload) {
    commit('setBusinessRulesCreateState', true)
    commit('setBusinessRulesCreateError', '')
    await this.$api
      .delete(`/back-office/business-rules/${payload.id}/delete`)
      .then(() => {
        commit('setBusinessRulesCreateState', false)
        this.app.$toast.success(DELETE_BUSINESS_RULES_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBusinessRulesCreateState', false)
        commit('setBusinessRulesCreateError', response.data.message)
      })
  },
  async fetchBusinessRulesRequests({ commit, state }) {
    commit('setBusinessRulesRequestState', true)
    await this.$api
      .get('/back-office/business-rules/stage/list', {
        params: {
          page: state.businessRulesRequests.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setBusinessRulesRequestList', data.data.list)
        commit('setBusinessRulesRequestState', false)
        commit('setBusinessRulesRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setBusinessRulesRequestList', [])
        commit('setBusinessRulesRequestState', false)
        commit('setBusinessRulesRequestPaginationLength', 0)
      })
  },
  async fetchPendingBusinessRulesRequests({ commit, state }) {
    commit('setPendingAggregatorRequestState', true)
    await this.$api
      .get('/back-office/business-rules/stage/list', {
        params: {
          page: state.pendingBusinessRulesRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingBusinessRulesRequestList', data.data.list)
        commit('setPendingBusinessRulesRequestState', false)
        commit('setPendingBusinessRulesRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingBusinessRulesRequestList', [])
        commit('setPendingBusinessRulesRequestState', false)
        commit('setPendingBusinessRulesRequestPaginationLength', 0)
      })
  },
  async updateBusinessRulesRequest({ commit }, payload) {
    commit('setBusinessRulesCreateState', true)
    commit('setBusinessRulesCreateError', '')
    await this.$api
      .put(`/back-office/business-rules/${payload.type}/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setBusinessRulesCreateState', false)
        commit('setBusinessRulesRequestStatus', payload)
        commit('setPendingBusinessRulesRequestStatus', payload)

        this.app.$toast.success(UPDATE_BUSINESS_RULES_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBusinessRulesCreateState', false)
        commit('setBusinessRulesCreateError', response.data.message)
      })
  },
  async updatePendingBusinessRulesRequest({ commit }, payload) {
    commit('setBusinessRulesCreateState', true)
    commit('setBusinessRulesCreateError', '')
    await this.$api
      .put(`/back-office/business-rules/${payload.type}/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setBusinessRulesCreateState', false)
        commit('setPendingBusinessRulesRequestStatus', payload)
        commit('setBusinessRulesRequestStatus', payload)

        this.app.$toast.success(UPDATE_BUSINESS_RULES_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setBusinessRulesCreateState', false)
        commit('setBusinessRulesCreateError', response.data.message)
      })
  },
  async fetchTransactionFees({ commit, state }) {
    commit('setTransactionFeeState', true)
    await this.$api
      .get('/back-office/transaction-fees', {
        params: {
          page: state.transactionFees.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setTransactionFeeList', data.data.transaction_fee)
        commit('setTransactionFeeState', false)
        commit('setTransactionFeePaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setTransactionFeeList', [])
        commit('setTransactionFeeState', false)
        commit('setTransactionFeePaginationLength', 0)
      })
  },
  async createTransactionFee({ commit }, payload) {
    commit('setTransactionFeeCreateState', true)
    commit('setTransactionFeeCreateError', '')
    await this.$api
      .post('/back-office/transaction-fees/create', {
        transactionCode: payload.transactionCode,
        institutionCode: payload.institutionCode,
        aggregatorId: payload.aggregatorId,
        floor: payload.floor,
        ceiling: payload.ceiling,
        feeAmount: payload.feeAmount,
        feeType: payload.feeType,
      })
      .then(() => {
        commit('setTransactionFeeCreateState', false)
        this.app.$toast.success(CREATE_TRANSACTION_FEE_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionFeeCreateState', false)
        commit('setTransactionFeeCreateError', response.data.message)
      })
  },
  async updateTransactionFee({ commit }, payload) {
    commit('setTransactionFeeCreateState', true)
    commit('setTransactionFeeCreateError', '')
    await this.$api
      .put(`/back-office/transaction-fees/${payload.id}/update`, payload)
      .then(() => {
        commit('setTransactionFeeCreateState', false)
        this.app.$toast.success(UPDATE_TRANSACTION_FEE_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionFeeCreateState', false)
        commit('setTransactionFeeCreateError', response.data.message)
      })
  },
  async fetchTransactionFeeRequests({ commit, state }) {
    commit('setTransactionFeeRequestState', true)
    await this.$api
      .get('/back-office/transaction-fees/stage/list', {
        params: {
          page: state.transactionFeeRequests.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setTransactionFeeRequestList', data.data.list)
        commit('setTransactionFeeRequestState', false)
        commit('setTransactionFeeRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setTransactionFeeRequestList', [])
        commit('setTransactionFeeRequestState', false)
        commit('setTransactionFeeRequestPaginationLength', 0)
      })
  },
  async fetchPendingTransactionFeeRequests({ commit, state }) {
    commit('setPendingTransactionFeeRequestState', true)
    await this.$api
      .get('/back-office/transaction-fees/stage/list', {
        params: {
          page: state.transactionFeeRequests.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingTransactionFeeRequestList', data.data.list)
        commit('setPendingTransactionFeeRequestState', false)
        commit('setPendingTransactionFeeRequestPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingTransactionFeeRequestList', [])
        commit('setPendingTransactionFeeRequestState', false)
        commit('setPendingTransactionFeeRequestPaginationLength', 0)
      })
  },
  async fetchTransactionHistory({ commit, state }) {
    commit('setTransactionHistoryState', true)
    await this.$api
      .get('/back-office/transactions', {
        params: {
          page: state.transactionHistory.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setTransactionHistoryList', data.data.list)
        commit('setTransactionHistoryState', false)
        commit('setTransactionHistoryPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setTransactionHistoryList', [])
        commit('setTransactionHistoryState', false)
        commit('setTransactionHistoryPaginationLength', 0)
      })
  },
  async updateTransactionFeeRequest({ commit }, payload) {
    commit('setTransactionFeeCreateState', true)
    commit('setTransactionFeeCreateError', '')
    await this.$api
      .put(
        `/back-office/transaction-fees/${payload.type}/${payload.id}/status`,
        {
          status: payload.status,
        }
      )
      .then(() => {
        commit('setTransactionFeeCreateState', false)
        commit('setTransactionFeeRequestStatus', payload)
        commit('setPendingTransactionFeeRequestStatus', payload)
        this.app.$toast.success(UPDATE_TRANSACTION_FEE_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionFeeCreateState', false)
        commit('setTransactionFeeCreateError', response.data.message)
      })
  },
  async updatePendingTransactionFeeRequest({ commit }, payload) {
    commit('setTransactionFeeCreateState', true)
    commit('setTransactionFeeCreateError', '')
    await this.$api
      .put(
        `/back-office/transaction-fees/${payload.type}/${payload.id}/status`,
        {
          status: payload.status,
        }
      )
      .then(() => {
        commit('setTransactionFeeCreateState', false)
        commit('setPendingTransactionFeeRequestStatus', payload)
        commit('setTransactionFeeRequestStatus', payload)
        this.app.$toast.success(UPDATE_TRANSACTION_FEE_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionFeeCreateState', false)
        commit('setTransactionFeeCreateError', response.data.message)
      })
  },
  async fetchTransactionCodes({ commit, state }) {
    await this.$api
      .get('/back-office/transaction-codes')
      .then(({ data }) => {
        commit('setTransactionFeeCodesList', data.data.response_data)
      })
      .catch(() => {
        commit('setTransactionFeeCodesList', [])
      })
  },
  async fetchTransactionReversalRequests({ commit, state }) {
    commit('setTransactionReversalState', true)
    await this.$api
      .get('/back-office/transactions/reverse/stage/list', {
        params: {
          page: state.transactionReversalRequest.page,
          limit: 10,
        },
      })
      .then(({ data }) => {
        commit('setTransactionReversalList', data.data.list)
        commit('setTransactionReversalState', false)
        commit('setTransactionReversalPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setTransactionReversalList', [])
        commit('setTransactionReversalState', false)
        commit('setTransactionReversalPaginationLength', 0)
      })
  },
  async updateTransactionReversalRequest({ commit }, payload) {
    commit('setTransactionReversalCreateState', true)
    commit('setTransactionReversalCreateError', '')
    await this.$api
      .put(`/back-office/transactions/reverse/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setTransactionReversalCreateState', false)
        commit('setTransactionReversalRequestStatus', payload)
        commit('setPendingTransactionReversalRequestStatus', payload)
        this.app.$toast.success(UPDATE_TRANSACTION_FEE_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionReversalCreateState', false)
        commit('setTransactionReversalCreateError', response.data.message)
      })
  },
  async fetchPendingTransactionReversalRequests({ commit, state }) {
    commit('setPendingTransactionReversalState', true)
    await this.$api
      .get('/back-office/transactions/reverse/stage/list', {
        params: {
          page: state.pendingTransactionReversalRequest.page,
          limit: 10,
          status: 0,
        },
      })
      .then(({ data }) => {
        commit('setPendingTransactionReversalList', data.data.list)
        commit('setPendingTransactionReversalState', false)
        commit('setPendingTransactionReversalPaginationLength', data.data.max)
      })
      .catch(() => {
        commit('setPendingTransactionReversalList', [])
        commit('setPendingTransactionReversalState', false)
        commit('setPendingTransactionReversalPaginationLength', 0)
      })
  },
  async updatePendingTransactionReversalRequest({ commit }, payload) {
    commit('setTransactionReversalCreateState', true)
    commit('setTransactionReversalCreateError', '')
    await this.$api
      .put(`/back-office/transactions/reverse/${payload.id}/status`, {
        status: payload.status,
      })
      .then(() => {
        commit('setTransactionReversalCreateState', false)
        commit('setPendingTransactionReversalRequestStatus', payload)
        commit('setTransactionReversalRequestStatus', payload)
        this.app.$toast.success(UPDATE_TRANSACTION_FEE_REQUEST_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionReversalCreateState', false)
        commit('setTransactionReversalCreateError', response.data.message)
      })
  },

  async stageTransactionReversal({ commit }, payload) {
    commit('setTransactionReverseState', true)
    commit('setTransactionReversalError', null)
    await this.$api
      .post('/back-office/transactions/reverse/stage', {
        ...payload,
      })
      .then(() => {
        commit('setTransactionReverseState', false)
        this.app.$toast.success(STAGE_TRANSACTION_REVERSAL_SUCCESS)
      })
      .catch(({ response }) => {
        commit('setTransactionReverseState', false)
        commit('setTransactionReversalError', response.data.message)
      })
  },
}

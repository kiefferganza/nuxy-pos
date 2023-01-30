export default {
  setInstitutionList(state, payload) {
    state.institution.list = payload
  },
  updateInstitutionList(state, payload) {
    state.institution.list = state.institution.list.map((data) => {
      if (data.institutionCode === payload.institutionCode) {
        return {
          ...data,
          bIC: payload.bIC,
          bRSTN: payload.bRSTN,
          institutionTypeId: payload.institutionTypeId,
          name: payload.name,
        }
      }
      return {
        ...data,
      }
    })
  },
  setInstitutionTypes(state, payload) {
    state.institution.institutionTypes = payload
  },
  setInstitutionState(state, payload) {
    state.institution.fetch = payload
  },
  setInstitutionCurrentPage(state, payload) {
    state.institution.page = payload
  },
  setInstitutionPaginationLength(state, payload) {
    state.institution.paginationLength = payload
  },
  setInstitutionCreateState(state, payload) {
    state.institutionCreate.fetch = payload
  },
  setInstitutionCreateError(state, payload) {
    state.institutionCreate.error = payload
  },
  setInstitutionRequestList(state, payload) {
    state.institutionRequest.list = payload
  },
  setPendingInstitutionRequestList(state, payload) {
    state.pendingInstitutionRequest.list = payload
  },
  updateInstitutionRequestList(state, payload) {
    state.institutionRequest.list = state.institutionRequest.list.map(
      (data) => {
        if (data.id === payload.id) {
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
  updatePendingInstitutionRequestList(state, payload) {
    state.pendingInstitutionRequest.list =
      state.pendingInstitutionRequest.list.map((data) => {
        if (data.id === payload.id) {
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
  setInstitutionRequestTypes(state, payload) {
    state.institutionRequest.institutionTypes = payload
  },
  setInstitutionRequestState(state, payload) {
    state.institutionRequest.fetch = payload
  },
  setInstitutionRequestCurrentPage(state, payload) {
    state.institutionRequest.page = payload
  },
  setInstitutionRequestPaginationLength(state, payload) {
    state.institutionRequest.paginationLength = payload
  },
  setPendingInstitutionRequestTypes(state, payload) {
    state.pendingInstitutionRequest.institutionTypes = payload
  },
  setPendingInstitutionRequestState(state, payload) {
    state.pendingInstitutionRequest.fetch = payload
  },
  setPendingInstitutionRequestCurrentPage(state, payload) {
    state.pendingInstitutionRequest.page = payload
  },
  setPendingInstitutionRequestPaginationLength(state, payload) {
    state.pendingInstitutionRequest.paginationLength = payload
  },
  setInstitutionRequestCreateState(state, payload) {
    state.institutionRequestCreate.fetch = payload
  },
  setInstitutionRequestCreateError(state, payload) {
    state.institutionRequestCreate.error = payload
  },
  setAggregatorsList(state, payload) {
    state.aggregators.list = payload
  },
  setAggregatorTypes(state, payload) {
    state.aggregators.types = payload
  },
  setAggregatorsDropdownList(state, payload) {
    state.aggregators.dropdown = payload
  },
  setAggregatorsState(state, payload) {
    state.aggregators.fetch = payload
  },
  setAggregatorsCurrentPage(state, payload) {
    state.aggregators.page = payload
  },
  setAggregatorsPaginationLength(state, payload) {
    state.aggregators.paginationLength = payload
  },
  setAggregatorsCreateError(state, payload) {
    state.aggregatorCreate.error = payload
  },
  setAggregatorsCreateState(state, payload) {
    state.aggregatorCreate.fetch = payload
  },
  setAggregatorRequestList(state, payload) {
    state.aggregatorRequests.list = payload
  },
  setAggregatorRequestState(state, payload) {
    state.aggregatorRequests.fetch = payload
  },
  setAggregatorRequestCurrentPage(state, payload) {
    state.aggregatorRequests.page = payload
  },
  setAggregatorRequestPaginationLength(state, payload) {
    state.aggregatorRequests.paginationLength = payload
  },
  setPendingAggregatorRequestList(state, payload) {
    state.pendingAggregatorRequests.list = payload
  },
  setPendingAggregatorRequestState(state, payload) {
    state.pendingAggregatorRequests.fetch = payload
  },
  setPendingAggregatorRequestCurrentPage(state, payload) {
    state.pendingAggregatorRequests.page = payload
  },
  setPendingAggregatorRequestPaginationLength(state, payload) {
    state.pendingAggregatorRequests.paginationLength = payload
  },
  setAggregatorInstitutionState(state, payload) {
    state.aggregatorInstitutions.fetch = payload
  },
  setAggregatorInstitutionList(state, payload) {
    state.aggregatorInstitutions.list = payload
  },
  setAggregatorInstitutionPaginationLength(state, payload) {
    state.aggregatorInstitutions.paginationLength = payload
  },
  setAggregatorRequestStatus(state, payload) {
    state.aggregatorRequests.list = state.aggregatorRequests.list.map(
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
  setPendingAggregatorRequestStatus(state, payload) {
    state.pendingAggregatorRequests.list =
      state.pendingAggregatorRequests.list.map((data) => {
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
  setBillersList(state, payload) {
    state.billers.list = payload
  },
  setBillersState(state, payload) {
    state.billers.fetch = payload
  },
  setBillersCurrentPage(state, payload) {
    state.billers.page = payload
  },
  setBillersPaginationLength(state, payload) {
    state.billers.paginationLength = payload
  },
  setBillersCreateError(state, payload) {
    state.billerCreate.error = payload
  },
  setBillersCreateState(state, payload) {
    state.billerCreate.fetch = payload
  },
  setBillerRequestList(state, payload) {
    state.billerRequests.list = payload
  },
  setBillerRequestState(state, payload) {
    state.billerRequests.fetch = payload
  },
  setBillerRequestCurrentPage(state, payload) {
    state.billerRequests.page = payload
  },
  setBillerRequestPaginationLength(state, payload) {
    state.billerRequests.paginationLength = payload
  },
  setPendingBillerRequestList(state, payload) {
    state.pendingBillerRequests.list = payload
  },
  setPendingBillerRequestState(state, payload) {
    state.pendingBillerRequests.fetch = payload
  },
  setPendingBillerRequestCurrentPage(state, payload) {
    state.pendingBillerRequests.page = payload
  },
  setPendingBillerRequestPaginationLength(state, payload) {
    state.pendingBillerRequests.paginationLength = payload
  },
  setBillerCategoriesList(state, payload) {
    state.billers.billerCategories = payload
  },
  setBillerRequestStatus(state, payload) {
    state.billerRequests.list = state.billerRequests.list.map((data) => {
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
  setPendingBillerRequestStatus(state, payload) {
    state.pendingBillerRequests.list = state.pendingBillerRequests.list.map(
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
  setBusinessRulesList(state, payload) {
    state.businessRules.list = payload
  },
  setBusinessRulesState(state, payload) {
    state.businessRules.fetch = payload
  },
  setBusinessRulesCurrentPage(state, payload) {
    state.businessRules.page = payload
  },
  setBusinessRulesPaginationLength(state, payload) {
    state.businessRules.paginationLength = payload
  },
  setBusinessRulesCreateError(state, payload) {
    state.businessRulesCreate.error = payload
  },
  setBusinessRulesCreateState(state, payload) {
    state.businessRulesCreate.fetch = payload
  },
  setBusinessRulesRequestList(state, payload) {
    state.businessRulesRequests.list = payload
  },
  setBusinessRulesRequestState(state, payload) {
    state.businessRulesRequests.fetch = payload
  },
  setBusinessRulesRequestCurrentPage(state, payload) {
    state.businessRulesRequests.page = payload
  },
  setBusinessRulesRequestPaginationLength(state, payload) {
    state.businessRulesRequests.paginationLength = payload
  },
  setBusinessRulesRequestStatus(state, payload) {
    state.businessRulesRequests.list = state.businessRulesRequests.list.map(
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
  setPendingBusinessRulesRequestList(state, payload) {
    state.pendingBusinessRulesRequests.list = payload
  },
  setPendingBusinessRulesRequestState(state, payload) {
    state.pendingBusinessRulesRequests.fetch = payload
  },
  setPendingBusinessRulesRequestCurrentPage(state, payload) {
    state.pendingBusinessRulesRequests.page = payload
  },
  setPendingBusinessRulesRequestPaginationLength(state, payload) {
    state.pendingBusinessRulesRequests.paginationLength = payload
  },
  setPendingBusinessRulesRequestStatus(state, payload) {
    state.pendingBusinessRulesRequests.list =
      state.pendingBusinessRulesRequests.list.map((data) => {
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
  setTransactionFeeList(state, payload) {
    state.transactionFees.list = payload
  },
  setTransactionFeeCodesList(state, payload) {
    state.transactionFees.transactionCodes = payload
  },
  setTransactionFeeState(state, payload) {
    state.transactionFees.fetch = payload
  },
  setTransactionFeeCurrentPage(state, payload) {
    state.transactionFees.page = payload
  },
  setTransactionFeePaginationLength(state, payload) {
    state.transactionFees.paginationLength = payload
  },
  setTransactionFeeCreateError(state, payload) {
    state.transactionFeeCreate.error = payload
  },
  setTransactionFeeCreateState(state, payload) {
    state.transactionFeeCreate.fetch = payload
  },
  setTransactionFeeRequestList(state, payload) {
    state.transactionFeeRequests.list = payload
  },
  setTransactionFeeRequestState(state, payload) {
    state.transactionFeeRequests.fetch = payload
  },
  setTransactionFeeRequestCurrentPage(state, payload) {
    state.transactionFeeRequests.page = payload
  },
  setTransactionFeeRequestPaginationLength(state, payload) {
    state.transactionFeeRequests.paginationLength = payload
  },
  setTransactionFeeRequestStatus(state, payload) {
    state.transactionFeeRequests.list = state.transactionFeeRequests.list.map(
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
  setPendingTransactionFeeRequestList(state, payload) {
    state.pendingTransactionFeeRequests.list = payload
  },
  setPendingTransactionFeeRequestState(state, payload) {
    state.pendingTransactionFeeRequests.fetch = payload
  },
  setPendingTransactionFeeRequestCurrentPage(state, payload) {
    state.pendingTransactionFeeRequests.page = payload
  },
  setPendingTransactionFeeRequestPaginationLength(state, payload) {
    state.pendingTransactionFeeRequests.paginationLength = payload
  },
  setPendingTransactionFeeRequestStatus(state, payload) {
    state.pendingTransactionFeeRequests.list =
      state.pendingTransactionFeeRequests.list.map((data) => {
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
  setTransactionHistoryList(state, payload) {
    state.transactionHistory.list = payload
  },
  setTransactionReverseState(state, payload) {
    state.transactionHistory.reversalState = payload
  },
  setTransactionReversalError(state, payload) {
    state.transactionHistory.reversalError = payload
  },
  setTransactionHistoryState(state, payload) {
    state.transactionHistory.fetch = payload
  },
  setTransactionHistoryCurrentPage(state, payload) {
    state.transactionHistory.page = payload
  },
  setTransactionHistoryPaginationLength(state, payload) {
    state.transactionHistory.paginationLength = payload
  },
  setTransactionReversalList(state, payload) {
    state.transactionReversalRequest.list = payload
  },
  setTransactionReversalState(state, payload) {
    state.transactionReversalRequest.fetch = payload
  },
  setTransactionReversalCurrentPage(state, payload) {
    state.transactionReversalRequest.page = payload
  },
  setTransactionReversalPaginationLength(state, payload) {
    state.transactionReversalRequest.paginationLength = payload
  },
  setTransactionReversalCreateError(state, payload) {
    state.transactionFeeCreate.error = payload
  },
  setTransactionReversalCreateState(state, payload) {
    state.transactionFeeCreate.fetch = payload
  },
  setPendingTransactionReversalList(state, payload) {
    state.pendingTransactionReversalRequest.list = payload
  },
  setPendingTransactionReversalState(state, payload) {
    state.pendingTransactionReversalRequest.fetch = payload
  },
  setPendingTransactionReversalCurrentPage(state, payload) {
    state.pendingTransactionReversalRequest.page = payload
  },
  setPendingTransactionReversalPaginationLength(state, payload) {
    state.pendingTransactionReversalRequest.paginationLength = payload
  },
  setTransactionReversalRequestStatus(state, payload) {
    state.transactionReversalRequest.list =
      state.transactionReversalRequest.list.map((data) => {
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
  setPendingTransactionReversalRequestStatus(state, payload) {
    state.pendingTransactionReversalRequest.list =
      state.pendingTransactionReversalRequest.list.map((data) => {
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
}

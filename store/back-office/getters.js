import format from 'date-fns/format'

export default {
  formattedInstitution(state) {
    return state.institution.list.map((data) => {
      return {
        ...data,
      }
    })
  },
  formattedAggregators(state) {
    return state.aggregators.list.map((data) => {
      const aggregatorTypeName = data.aggregatorType
        ? data.aggregatorType.map(({ name }) => name).join(', ')
        : '--'
      return {
        ...data,
        aggregatorTypeName,
      }
    })
  },
  formattedTransactionHistory(state) {
    return state.transactionHistory.list.map((data) => {
      return {
        ...data,
        formattedDate: format(new Date(data.transactionDate), 'MMMM dd, yyyy'),
      }
    })
  },
  formattedInstitutionTypes(state) {
    return state.institution.institutionTypes.map((data) => {
      return {
        name: data.name,
        value: data.InstitutionTypeId,
      }
    })
  },
  formattedInstitutionRequest(state) {
    return state.institutionRequest.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        newRecord: JSON.parse(data.newRecordDetails).Institution,
        oldRecord:
          data.oldRecordDetails !== ''
            ? JSON.parse(data.oldRecordDetails).Institution
            : null,
      }
    })
  },
  formattedAggregatorRequests(state) {
    return state.aggregatorRequests.list.map((data) => {
      const firstName = data.createdBy[0].firstName
        ? data.createdBy[0].firstName
        : '--'
      const lastName = data.createdBy[0].lastName
        ? data.createdBy[0].lastName
        : '--'
      return {
        ...data,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        requestType:
          data.procedureName === 'StageChangeAggregator' ? 'UPDATE' : 'CREATE',
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
        createdByName: `${firstName} ${lastName}`,
      }
    })
  },

  formattedBillerRequests(state) {
    return state.billerRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedBusinessRulesRequests(state) {
    return state.businessRulesRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: data.newRecordDetails
          ? JSON.parse(data.newRecordDetails)
          : null,
      }
    })
  },
  formattedTransactionFeeRequests(state) {
    return state.transactionFeeRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingBusinessRulesRequests(state) {
    return state.pendingBusinessRulesRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,

        newDetails: data.newRecordDetails
          ? JSON.parse(data.newRecordDetails)
          : null,
      }
    })
  },
  formattedPendingTransactionFeeRequests(state) {
    return state.pendingTransactionFeeRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,

        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingInstitutionRequest(state) {
    return state.pendingInstitutionRequest.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        newRecord: JSON.parse(data.newRecordDetails).Institution,
        oldRecord:
          data.oldRecordDetails === ''
            ? ''
            : JSON.parse(data.oldRecordDetails).Institution,
      }
    })
  },
  formattedPendingAggregatorRequests(state) {
    return state.pendingAggregatorRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        requestType:
          data.procedureName === 'StageChangeAggregator' ? 'UPDATE' : 'CREATE',
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,

        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingBillerRequests(state) {
    return state.pendingBillerRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,

        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedTransactionReversalRequests(state) {
    return state.transactionReversalRequest.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingTransactionReversalRequests(state) {
    return state.pendingTransactionReversalRequest.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy[0].firstName
        ? `${data.createdBy[0].firstName} `
        : '-- '
      FullName += data.createdBy[0].middleName
        ? `${data.createdBy[0].middleName} `
        : '-- '
      FullName += data.createdBy[0].lastName
        ? `${data.createdBy[0].lastName} `
        : '-- '
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
}

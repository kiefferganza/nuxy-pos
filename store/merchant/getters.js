import format from 'date-fns/format'

export default {
  formattedUsers(state) {
    return state.users.list.map((data) => {
      let FullName = ''
      if (data.UserCode) {
        FullName += data.firstName ? `${data.firstName} ` : '-- '
        FullName += data.middleName ? `${data.middleName} ` : '-- '
        FullName += data.lastName ? `${data.lastName} ` : '-- '
      }
      return {
        FullName,
        ...data,
      }
    })
  },
  formattedMerchantRequests(state) {
    return state.merchantRequests.list.map((data) => {
      let FullName = ''
      FullName += data.createdBy
        ? data.createdBy[0].firstName
          ? `${data.createdBy[0].firstName} `
          : '-- '
        : '-- '
      FullName += data.createdBy
        ? data.createdBy[0].middleName
          ? `${data.createdBy[0].middleName} `
          : '-- '
        : '-- '
      FullName += data.createdBy
        ? data.createdBy[0].lastName
          ? `${data.createdBy[0].lastName} `
          : '-- '
        : '-- '
      const {
        newRecordDetails,
        oldRecordDetails,
        procedureName,
        DateTimeRecorded,
      } = data
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(DateTimeRecorded), 'MMMM dd, yyyy'),
        requestType:
          data.procedureName === 'StageCreateMerchant' ? 'CREATE' : 'UPDATE',
        newRecord:
          newRecordDetails === ''
            ? ''
            : procedureName === 'StageCreateMerchant'
            ? JSON.parse(newRecordDetails).CreateMerchant
            : JSON.parse(newRecordDetails).Merchant,
        oldRecord:
          oldRecordDetails === '' ? '' : JSON.parse(oldRecordDetails).Merchant,
      }
    })
  },
  formattedPendingMerchantRequests(state) {
    return state.pendingMerchantRequests.list
      ? state.pendingMerchantRequests.list.map((data) => {
          let FullName = ''
          FullName += data.createdBy
            ? data.createdBy[0].firstName
              ? `${data.createdBy[0].firstName} `
              : '-- '
            : '-- '
          FullName += data.createdBy
            ? data.createdBy[0].middleName
              ? `${data.createdBy[0].middleName} `
              : '-- '
            : '-- '
          FullName += data.createdBy
            ? data.createdBy[0].lastName
              ? `${data.createdBy[0].lastName} `
              : '-- '
            : '-- '
          const {
            newRecordDetails,
            oldRecordDetails,
            procedureName,
            dateTimeRecorded,
          } = data
          return {
            ...data,
            requestedBy: FullName,
            dateCreated: format(new Date(dateTimeRecorded), 'MMMM dd, yyyy'),
            requestType:
              data.procedureName === 'StageCreateMerchant'
                ? 'CREATE'
                : 'UPDATE',
            newRecord:
              newRecordDetails === ''
                ? ''
                : procedureName === 'StageCreateMerchant'
                ? JSON.parse(newRecordDetails).CreateMerchant
                : JSON.parse(newRecordDetails).Merchant,
            oldRecord:
              oldRecordDetails === ''
                ? ''
                : JSON.parse(oldRecordDetails).Merchant,
          }
        })
      : {}
  },
}

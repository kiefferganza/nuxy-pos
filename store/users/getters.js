import format from 'date-fns/format'

export default {
  formattedUsers(state) {
    return state.users.map((data) => {
      let FullName = ''
      FullName += data.firstName ? `${data.firstName} ` : '-- '
      FullName += data.middleName ? `${data.middleName} ` : '-- '
      FullName += data.lastName ? `${data.lastName} ` : '-- '
      return {
        FullName,
        ...data,
      }
    })
  },
  formattedUserLockRequest(state) {
    return state.userLockRequest.list.map((data) => {
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
        oldRecordDetails: JSON.parse(data.oldRecordDetails),
        newRecordDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingUserLockRequest(state) {
    return state.pendingUserLockRequests.list.map((data) => {
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
        oldRecordDetails: JSON.parse(data.oldRecordDetails),
        newRecordDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedUserDetailsRequests(state) {
    return state.userDetailsRequests.list.map((data) => {
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
          data.procedureName === 'StageAddUser' ? 'CREATE' : 'UPDATE',
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingUserDetailsRequests(state) {
    return state.pendingUserDetailsRequests.list.map((data) => {
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
          data.procedureName === 'StageAddUser' ? 'CREATE' : 'UPDATE',
        oldDetails: data.oldRecordDetails
          ? JSON.parse(data.oldRecordDetails)
          : null,
        newDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },

  formattedOnlineUsers(state) {
    return state.onlineUsers.list.map((data) => {
      let FullName = ''
      if (data.userCode) {
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
  formattedKycRequests(state) {
    return state.kyc.list.map((data) => {
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
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        recordDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
  formattedPendingKycRequests(state) {
    return state.pendingKyc.list.map((data) => {
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
      return {
        ...data,
        requestedBy: FullName,
        dateCreated: format(new Date(data.dateTimeRecorded), 'MMMM dd, yyyy'),
        recordDetails: JSON.parse(data.newRecordDetails),
      }
    })
  },
}

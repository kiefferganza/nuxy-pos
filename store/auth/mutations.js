export default {
  setLogInRequestState(state, payload) {
    state.login.busy = payload
  },
  setUserDetails(state, payload) {
    state.user = payload
  },
  setMerchantDetails(state, payload) {
    state.merchant = payload
  },
  setLogInErrorMessage(state, payload) {
    state.login.error = payload
  },
  setLogOutErrorMessage(state, payload) {
    state.logout.error = payload
  },
  setLogInMessage(state, payload) {
    state.login.message = payload
  },
  setPersonData(state, payload) {
    state.person = {
      ...state.person,
      ...payload,
    }
  },
  setUserPermissions(state, payload) {
    state.permissions = payload
  },
  setValidateRequestState(state, payload) {
    state.validate.busy = payload
  },
  setValidateErrorMessage(state, payload) {
    state.validate.error = payload
  },
  setStageCredentialChangeRequestState(state, payload) {
    state.stageCredentialChange.busy = payload
  },
  setStageCredentialChangeErrorMessage(state, payload) {
    state.stageCredentialChange.error = payload
  },
  setGenerateOTPRequestState(state, payload) {
    state.otp.busy = payload
  },
  setGenerateOTPErrorMessage(state, payload) {
    state.otp.error = payload
  },
  setUpdateCredentialRequestState(state, payload) {
    state.credential.busy = payload
  },
  setUpdateCredentialErrorMessage(state, payload) {
    state.credential.error = payload
  },
  setOtpInput(state, payload) {
    state.otpInput = payload
  },
}

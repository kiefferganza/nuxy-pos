// TODO USE COOKIES https://www.npmjs.com/package/cookie-universal-nuxt
export default () => {
  return {
    user: {},
    merchant: {},
    permissions: [],
    person: {
      code: null,
      mobileNumber: null,
      userCode: null,
      otp: null,
    },
    otpInput: null,
    validate: {
      busy: false,
      error: '',
    },
    stageCredentialChange: {
      busy: false,
      error: '',
    },
    logout: {
      error: '',
    },
    login: {
      busy: false,
      error: '',
    },
    otp: {
      busy: false,
      error: '',
    },
    credential: {
      busy: false,
      error: '',
    },
  }
}

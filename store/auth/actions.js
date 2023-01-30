import { encrypt } from '~/js/utils/aes'

export default {
  async logIn({ commit }, payload) {
    commit('setLogInRequestState', true)
    commit('setLogInErrorMessage', '')
    commit('setLogInMessage', '')
    const data = {
      ...payload,
    }
    await this.$api
      .post('auth/login', {
        ...data,
      })
      .then(({ data }) => {
        commit('setLogInRequestState', false)
        commit('setUserDetails', data.data)
        commit('setUserPermissions', data.data.roleAccess)
        delete data.data.roleAccess
        this.app.$cookies.set(
          'user',
          encrypt(
            JSON.stringify(data.data),
            this.app.$config.tokenEncryptionPhrase
          )
        )
        this.app.$api.setToken(data.data.accessToken, 'Bearer')
        this.$router.push('/')
      })
      .catch(({ response }) => {
        commit('setLogInRequestState', false)
        commit('setLogInErrorMessage', response.data.message)
      })
  },

  async fetchMerchantDetails({ commit }, payload) {
    await this.$api
      .post('merchants/get-profile')
      .then(({ data }) => {
        commit('setMerchantDetails', data.data.Merchant[0])
      })
      .catch(({ response }) => {
        commit('setMerchantDetails', {})
      })
  },

  async refreshToken({ commit, state }, payload) {
    const data = {
      refreshToken: payload.refreshToken,
    }
    await this.$api
      .post('auth/refresh-token', {
        ...data,
      })
      .then(({ data }) => {
        const userDetails = {
          ...payload,
          refreshToken: data.data.refreshToken,
          accessToken: data.data.accessToken,
        }
        commit('setUserDetails', userDetails)
      })
      .catch(({ response }) => {
        commit('setLogInRequestState', false)
        commit('setLogInErrorMessage', response.data.message)
      })
    await this.app.$cookies.removeAll()
    await this.app.$cookies.set(
      'user',
      encrypt(
        JSON.stringify(state.user),
        this.app.$config.tokenEncryptionPhrase
      )
    )
    await this.app.$api.setToken(state.user.accessToken, 'Bearer')
  },

  async logout({ commit }) {
    await this.$api
      .post('auth/logout')
      .then(({ data }) => {
        this.app.router.push('/login')
        this.app.$cookies.removeAll()
        commit('setUserDetails', {})
      })
      .catch(({ response }) => {
        commit('setLogOutErrorMessage', response.data.message)
      })
  },

  async staqeChangeCredential({ commit }, payload) {
    commit('setStageCredentialChangeRequestState', true)
    commit('setStageCredentialChangeErrorMessage', '')
    const slug = payload.type === 'password' ? 'password' : 'pincode'
    await this.$api
      .post(`auth/update-${slug}/stage`, {
        ...payload,
      })
      .then(() => {
        commit('setStageCredentialChangeRequestState', false)
      })
      .catch(({ response }) => {
        commit('setStageCredentialChangeRequestState', false)
        commit('setStageCredentialChangeErrorMessage', response.data.message)
      })
  },

  async updateCredentials({ commit }, payload) {
    commit('setUpdateCredentialRequestState', true)
    commit('setUpdateCredentialErrorMessage', '')
    const slug = payload.type === 'password' ? 'password' : 'pincode'
    await this.$api
      .post(`auth/update-${slug}`, {
        ...payload,
      })
      .then(({ data }) => {
        commit('setUpdateCredentialRequestState', false)
        commit('setLogInMessage', 'All set! You can now log in your account')
        this.app.router.push(`/login`)
      })
      .catch(({ response }) => {
        this.app.router.push(`/reset-credentials?type=${payload.type}`)
        commit(
          'setGenerateOTPErrorMessage',
          'Something went wrong with your request'
        )
        commit('setUpdateCredentialRequestState', false)
        commit('setUpdateCredentialErrorMessage', response.data.message)
      })
  },

  async generateOTP({ commit }, payload) {
    commit('setGenerateOTPRequestState', true)
    commit('setGenerateOTPErrorMessage', '')
    const { contactOptionId, contactOptionValue } = payload
    await this.$api
      .post('otp/generate', {
        contactOptionId,
        contactOptionValue,
        isTest: process.env.NODE_ENV === 'development' ? 1 : 0,
      })
      .then(({ data }) => {
        const personData = data.data
        commit('setPersonData', {
          code: personData.personCode,
          userCode: personData.userCode,
          otp: personData.otpCode,
          mobileNumber: contactOptionValue,
        })
        commit('setGenerateOTPRequestState', false)
        this.app.router.push(
          `/security/validate?type=reset&method=${payload.type}`
        )
      })
      .catch(({ response }) => {
        commit('setGenerateOTPRequestState', false)
        commit('setGenerateOTPErrorMessage', response.data.message)
      })
  },
}

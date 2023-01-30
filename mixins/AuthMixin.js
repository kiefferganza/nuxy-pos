export default {
  mounted() {
    this.$store.commit('auth/setLogInErrorMessage', '')
    this.$store.commit('auth/setStageCredentialChangeErrorMessage', '')
    this.$store.commit('auth/setGenerateOTPErrorMessage', '')
    this.$store.commit('auth/setValidateErrorMessage', '')
    this.$store.commit('auth/setUpdateCredentialErrorMessage', '')
  },
}

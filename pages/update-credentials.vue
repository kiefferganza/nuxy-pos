<template>
  <auth-update-credentials @submit="updateCredentials" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'auth',
  middleware: 'update-credentials',
  head() {
    return {
      titleTemplate: '%s - Update Credentials',
    }
  },
  computed: {
    ...mapState('auth', ['person', 'stageCredentialChange', 'otpInput']),
  },
  methods: {
    async updateCredentials(payload) {
      const { type } = this.$route.query
      const data = {
        ...payload,
        type,
        personCode: this.person.code,
        userCode: this.person.userCode,
      }
      if (type === 'password') {
        await this.$store.dispatch('auth/staqeChangeCredential', data)
        if (!this.stageCredentialChange.error) {
          await this.$store.dispatch('auth/updateCredentials', {
            personCode: this.person.code,
            userCode: this.person.userCode,
            otp: this.otpInput,
            type,
          })
        }
      } else {
        await this.$store.dispatch('auth/staqeChangeCredential', data)
        if (!this.stageCredentialChange.error) {
          await this.$store.dispatch('auth/updateCredentials', {
            personCode: this.person.code,
            userCode: this.person.userCode,
            otp: this.otpInput,
            type,
          })
        }
      }
    },
  },
}
</script>

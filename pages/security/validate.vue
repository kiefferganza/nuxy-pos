<template>
  <auth-validate @submit="validate" />
</template>

<script>
import { isValidMethod } from '~/js/utils/credentials-reset'

export default {
  layout: 'auth',
  middleware: 'otp',
  head() {
    return {
      titleTemplate: '%s - Validate',
    }
  },
  methods: {
    validate(payload) {
      const { type, method } = this.$route.query
      if (type && method) {
        if (type.toLowerCase() === 'reset' || isValidMethod(method)) {
          this.$router.push(`/update-credentials?type=${method}`)
          this.$store.commit('auth/setOtpInput', payload.otpCode)
        }
      }
    },
  },
}
</script>

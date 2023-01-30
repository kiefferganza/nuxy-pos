<template>
  <auth-reset-credentials @submit="generateOTP" />
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'reset-credentials',
  head() {
    return {
      titleTemplate: '%s - Reset Credentials',
    }
  },
  methods: {
    generateOTP(payload) {
      const { type } = this.$route.query
      const data = {
        ...payload,
        type,
      }
      this.$store.dispatch('auth/generateOTP', data)
    },
  },
}
</script>

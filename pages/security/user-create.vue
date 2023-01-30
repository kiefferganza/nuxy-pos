<template>
  <auth-user-create @submit="createUser" />
</template>

<script>
export default {
  layout: 'auth',
  head() {
    return {
      titleTemplate: '%s - Create User',
    }
  },
  methods: {
    createUser(payload) {
      this.$store.dispatch('auth/userCreate', payload)
    },
  },
}
</script>

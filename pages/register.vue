<template>
  <auth-register @submit="createPerson" />
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    createPerson(payload) {
      this.$store.dispatch('auth/createPerson', payload)
    },
  },
}
</script>

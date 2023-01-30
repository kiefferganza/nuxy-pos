<template>
  <auth-login @submit="login" />
</template>

<script>
import { mapState } from 'vuex'
import AuthMixin from '~/mixins/AuthMixin'
export default {
  mixins: [AuthMixin],
  layout: 'auth',
  head() {
    return {
      titleTemplate: '%s - Login',
    }
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('roles', ['rolePermissions']),
  },
  methods: {
    async login(payload) {
      await this.$store.dispatch('auth/logIn', payload)
      if (this.$store.state.auth.user.roleId === 8) {
        await this.$store.dispatch('auth/fetchMerchantDetails')
      }
    },
  },
}
</script>

<template>
  <div class="antialiased">
    <layouts-sidebar />
    <div class="lg:pl-64 flex flex-col flex-1">
      <layouts-navbar />
      <main class="flex-1">
        <layouts-breadcrumbs />
        <div class="md:py-5 py-4">
          <Nuxt />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth', 'permission'],
  computed: {
    ...mapState('auth', ['user', 'permissions']),
    ...mapState('roles', ['rolePermissions']),
  },
  created() {
    this.$api.setToken(this.$store.state.auth.user.accessToken, 'Bearer')
  },
}
</script>

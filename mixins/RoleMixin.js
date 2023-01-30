export default {
  mounted() {
    if (this.$store.state.roles.roles.length === 0) {
      this.$store.dispatch('roles/fetchRoles')
    }
  },
}

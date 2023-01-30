export default {
  mounted() {
    if (this.$route.query?.status === 'pending') {
      this.tabIndex = 1
    }
  },
}

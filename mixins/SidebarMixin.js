import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('sidebar', ['showSidebar']),
  },
  methods: {
    toggleSidebar(type) {
      if (type === 'close') {
        this.$store.commit('sidebar/setSidebarState', false)
      } else {
        this.$store.commit('sidebar/setSidebarState', true)
      }
    },
  },
}

export default {
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '/',
    },
    permitted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sidebarItemParentClass() {
      return this.$route.path === this.to
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    },
    sidebarItemChildrenClass() {
      return this.$route.path === this.to
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
    },
  },
}

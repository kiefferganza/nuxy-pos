<template>
  <!-- Profile dropdown -->
  <div v-on-clickaway="toggleDropdown" class="ml-3 relative">
    <div>
      <profile-button
        id="user-menu-button"
        alt-text="Open user menu"
        type="button"
        @click="showDropdown = !showDropdown"
      />
    </div>
    <profile-dropdown :items="dropdownItems" :show="showDropdown" />
  </div>
</template>

<script>
import ProfileDropdown from './components/ProfileDropdown'
import ProfileButton from './components/ProfileButton'
export default {
  components: { ProfileButton, ProfileDropdown },
  data() {
    return {
      showDropdown: false,
    }
  },
  computed: {
    dropdownItems() {
      return [
        {
          title: 'Sign out',
          callback: () => {
            this.$store.dispatch('auth/logout')
            this.showDropdown = false
          },
        },
      ]
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = false
    },
  },
}
</script>

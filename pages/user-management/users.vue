<template>
  <common-wrapper title="Users">
    <template #content>
      <user-management-users
        ref="userPage"
        @lock-user="lockUser"
        @submit="submit"
      />
    </template>
  </common-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import RoleMixin from '@/mixins/RoleMixin'
import { USERS } from '@/js/constants/permissions'

export default {
  mixins: [RoleMixin],
  meta: {
    permissionURL: USERS,
  },
  head() {
    return {
      titleTemplate: '%s - User Management',
    }
  },
  computed: {
    ...mapState('users', ['roleUpdateError', 'userLogoutError']),
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    ...mapActions('users', [
      'assignRole',
      'forceLogoutUser',
      'stageLockUser',
      'fetchOnlineUsers',
      'fetchUsers',
    ]),
    async lockUser(data) {
      await this.stageLockUser({
        ...data,
      })
    },
    async submit(data) {
      if (data.meta === 'update-role') {
        await this.assignRole(data)
        if (!this.roleUpdateError) {
          this.$refs.userPage.hideUpdateRoleModal()
        }
      } else {
        await this.forceLogoutUser({
          code: data.selectedUserCode,
        })
        if (!this.userLogoutError) {
          this.$refs.userPage.hideModal()
          this.fetchOnlineUsers()
        }
      }
    },
  },
}
</script>

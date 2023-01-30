<template>
  <common-wrapper title="User Lock Requests">
    <template #content>
      <user-management-user-lock-request
        ref="lockRequestPage"
        @submit="approveLockRequest"
      />
    </template>
  </common-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { USER_LOCK } from '@/js/constants/permissions'
export default {
  head() {
    return {
      titleTemplate: '%s - User Lock Requests',
    }
  },
  meta: {
    permissionURL: USER_LOCK,
  },
  computed: {
    ...mapState('users', ['userLockRequest']),
  },
  mounted() {
    this.$store.dispatch('users/fetchLockRequests')
  },
  methods: {
    ...mapActions('users', ['approveUserLock', 'approvePendingUserLock']),
    async approveLockRequest(data) {
      if (data.isFiltered) {
        await this.approvePendingUserLock(data)
      } else {
        await this.approveUserLock(data)
      }
      if (!this.roleUpdateError) {
        this.$refs.lockRequestPage.hideModal()
      }
    },
  },
}
</script>

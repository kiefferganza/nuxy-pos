<template>
  <common-wrapper title="User Detail Requests">
    <template #content>
      <user-management-user-details-requests
        ref="userDetailRequests"
        @submit="handleSubmit"
      />
    </template>
  </common-wrapper>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { USERS_STAGE_LIST } from '@/js/constants/permissions'

export default {
  head() {
    return {
      titleTemplate: '%s - User Details Requests',
    }
  },
  meta: {
    permissionURL: USERS_STAGE_LIST,
  },
  computed: {
    ...mapState('users', ['userCreate']),
  },
  mounted() {
    this.fetchUserDetailRequests()
  },
  methods: {
    ...mapActions('users', [
      'fetchUserDetailRequests',
      'updateUserDetailRequest',
      'updatePendingUserDetailRequest',
    ]),
    async handleSubmit(data) {
      if (data.isFiltered) {
        await this.updatePendingUserDetailRequest(data)
      } else {
        await this.updateUserDetailRequest(data)
      }
      if (!this.userCreate.error) {
        this.$refs.userDetailRequests.hideModal()
      }
    },
  },
}
</script>

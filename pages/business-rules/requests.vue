<template>
  <common-wrapper title="Business Rules Requests">
    <template #content>
      <back-office-business-rules-requests
        ref="businessRequest"
        @submit="handleSubmit"
      />
    </template>
  </common-wrapper>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { BUSINESS_RULES_REQUESTS } from '@/js/constants/permissions'

export default {
  head() {
    return {
      titleTemplate: '%s - Business Rules Requests',
    }
  },
  meta: {
    permissionURL: BUSINESS_RULES_REQUESTS,
  },
  computed: {
    ...mapState('back-office', ['businessRulesCreate']),
  },
  mounted() {
    this.fetchBusinessRulesRequests()
  },
  methods: {
    ...mapActions('back-office', [
      'fetchBusinessRulesRequests',
      'updateBusinessRulesRequest',
      'updatePendingBusinessRulesRequest',
    ]),
    async handleSubmit(data) {
      if (data.isFiltered) {
        await this.updatePendingBusinessRulesRequest(data)
      } else {
        await this.updateBusinessRulesRequest(data)
      }
      if (!this.businessRulesCreate.error) {
        this.$refs.businessRequest.hideModal()
      }
    },
  },
}
</script>

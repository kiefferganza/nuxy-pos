<template>
  <common-wrapper title="Merchant Requests">
    <template #content>
      <merchant-admin-merchants ref="merchantRequests" @submit="handleSubmit" />
    </template>
  </common-wrapper>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { MERCHANT_REQUESTS } from '@/js/constants/permissions'

export default {
  head() {
    return {
      titleTemplate: '%s - Merchant Requests',
    }
  },
  meta: {
    permissionURL: MERCHANT_REQUESTS,
  },
  computed: {
    ...mapState('merchant', ['merchantRequests', 'merchantRequestCreate']),
  },
  mounted() {
    this.fetchMerchantRequests()
  },
  methods: {
    ...mapActions('merchant', [
      'fetchMerchantRequests',
      'updateMerchantRequest',
      'updatePendingMerchantRequest',
    ]),
    async handleSubmit(data) {
      if (data.isFiltered) {
        await this.updatePendingMerchantRequest(data)
      } else {
        await this.updateMerchantRequest(data)
      }
      if (!this.merchantRequestCreate.error) {
        this.$refs.merchantRequests.hideModal()
      }
    },
  },
}
</script>

<template>
  <div class="bg-white mb-4 shadow-md rounded-lg border border-gray-100">
    <div
      class="max-w-7xl mx-auto divide-y divide-gray-200 xl:py-8 xl:flex xl:justify-center xl:divide-y-0 xl:divide-x"
    >
      <merchant-details
        title="Merchant Name"
        :description="merchantName"
        icon="info"
      />
      <merchant-details
        title="Date of Incorporation"
        :description="dateOfIncorporation"
        icon="calendar-alt"
      />
      <merchant-details
        title="Address"
        :description="merchantAddress"
        icon="address-card"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import format from 'date-fns/format'
import MerchantDetails from './components/MerchantDetails'

export default {
  components: { MerchantDetails },
  computed: {
    ...mapState('auth', ['merchant']),
    merchantName() {
      return `${this.merchant.BusinessName} (${this.merchant.BusinessNameAlias})`
    },
    dateOfIncorporation() {
      return this.merchant.DateOfIncorporation
        ? format(new Date(this.merchant.DateOfIncorporation), 'MMMM dd, yyyy')
        : 'N/A'
    },
    merchantAddress() {
      const address = `${this.merchant.Address1}, ${this.merchant.Address2}`
      return !this.merchant.Address1 && !this.merchant.Address2
        ? 'N/A'
        : address
    },
  },
}
</script>

<template>
  <div>
    <div class="flex flex-col border border-gray-100 shadow-md rounded-lg">
      <div class="inline-block min-w-full align-middle dark:bg-gray-800">
        <tabs
          v-model="tabIndex"
          :options="['All Requests', 'Pending Requests']"
        >
          <template #tab-pane-content-0="{ data }">
            <common-fa-icon icon="list" class="-ml-0.5 mr-2 h-5 w-5" />
            {{ data }}
          </template>
          <template #tab-pane-content-1="{ data }">
            <common-fa-icon icon="hourglass-2" class="-ml-0.5 mr-2 h-5 w-5" />
            {{ data }}
          </template>
          <template #tab-body-0>
            <merchant-table
              @approve-request="showModal"
              @hold-request="showModal"
            />
          </template>
          <template #tab-body-1>
            <merchant-pending-table
              @approve-request="showModal"
              @hold-request="showModal"
            />
          </template>
        </tabs>
      </div>
    </div>
    <merchant-request-modal
      ref="userModal"
      :show="modal"
      :is-reject="isReject"
      :is-filtered="isFiltered"
      :is-on-hold="isOnHold"
      :update-data="updateData"
      @submit="handleSubmit"
      @close-user-modal="modal = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalMixin from '@/mixins/ModalMixin'
import MerchantRequestModal from '~/components/MerchantAdmin/Merchants/components/MerchantRequestModal'
import Tabs from '~/components/Common/Tabs'
import MerchantTable from '@/components/MerchantAdmin/Merchants/components/MerchantTable'
import MerchantPendingTable from '@/components/MerchantAdmin/Merchants/components/MerchantPendingTable'
import DashboardMixin from '@/mixins/DashboardMixin'
export default {
  components: {
    MerchantPendingTable,
    MerchantTable,
    MerchantRequestModal,
    Tabs,
  },
  mixins: [ModalMixin, DashboardMixin],
  data() {
    return {
      updateData: {},
      isReject: null,
      isOnHold: false,
      isFiltered: false,
      tabIndex: 0,
    }
  },
  computed: {
    ...mapGetters('merchant', [
      'formattedMerchantRequests',
      'formattedPendingMerchantRequests',
    ]),
  },
  methods: {
    handleSubmit(payload) {
      this.$emit('submit', payload)
    },
    resetForm() {
      this.modal = false
    },
    showModal(id, isReject = false, isOnHold = false, isFiltered = false) {
      this.modal = true
      this.isReject = isReject
      this.isOnHold = isOnHold
      this.isFiltered = isFiltered
      this.updateData = isFiltered
        ? this.formattedPendingMerchantRequests.find((e) => e.id === id)
        : this.formattedMerchantRequests.find((e) => e.id === id)
    },
  },
}
</script>

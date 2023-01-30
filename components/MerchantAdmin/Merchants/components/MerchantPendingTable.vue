<template>
  <div>
    <common-table
      searchable
      search-placeholder="Search Pending Merchant Requests.."
      :data="tableData"
      empty-state-title="No Pending Merchant Requests Available"
      empty-state-description="There are no pending merchant requests available as of the moment."
      :fetching="pendingMerchantRequests.fetch"
      pagination
      :pagination-length="pendingMerchantRequests.paginationLength"
      :pagination-limit="10"
      :pagination-page="pendingMerchantRequests.page"
      @table-paginate="changePage"
    >
      <template #table-data-2="{ data }">
        <common-badge
          :title="data"
          :variant="data === 'UPDATE' ? 'info' : 'success'"
        />
      </template>
      <template #table-data-3="{ data }">
        <common-badge
          v-if="data < 2"
          :title="data === 0 ? 'Pending' : 'Approved'"
          :variant="data === 0 ? 'warning' : 'success'"
        />
        <common-badge v-else title="For Resubmission" variant="secondary" />
      </template>
      <template #action-buttons-0="{ data, title }">
        <span v-if="data[3] === 0">{{ title }}</span>
        <span v-else>View Request</span>
      </template>
    </common-table>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('merchant', [
      'pendingMerchantRequests',
      'pendingMerchantRequestCreate',
    ]),
    ...mapGetters('merchant', ['formattedPendingMerchantRequests']),
    tableData() {
      return {
        columns: ['Requested By', 'Created Date', 'Type', 'Status'],
        rows: this.formattedPendingMerchantRequests
          ? this.formattedPendingMerchantRequests.map((e) => {
              return {
                id: e.id,
                rowValues: [
                  e.requestedBy,
                  e.dateCreated,
                  e.requestType,
                  e.recordStatus,
                ],
              }
            })
          : [],
        callbacks: [
          {
            callback: (id) =>
              this.$emit('approve-request', id, false, false, true),
            title: 'Approve Request',
            icon: 'edit',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e),
          },
          {
            callback: (id) => this.$emit('hold-request', id, false, true, true),
            title: 'On Hold Request',
            icon: 'triangle-exclamation',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e, true),
          },
        ],
      }
    },
  },
  mounted() {
    this.$store.dispatch('merchant/fetchPendingMerchantRequests')
  },
  methods: {
    ...mapActions('merchant', ['fetchPendingMerchantRequests']),
    ...mapMutations('merchant', ['setPendingMerchantRequestCurrentPage']),
    visibilityCaseHandle(data, isReject = false) {
      const aggregator = this.formattedPendingMerchantRequests.find(
        ({ id }) => id === data
      )
      const stageUpdate = () =>
        this.$authorize('/back-office/aggregator/stage/update')
      const stageCreate = () =>
        this.$authorize('/back-office/aggregator/stage/create')
      if (aggregator.oldDetails) {
        return isReject
          ? stageUpdate() && aggregator.recordStatus === 0
          : stageUpdate()
      }
      return isReject
        ? stageCreate() && aggregator.recordStatus === 0
        : stageCreate()
    },
    changePage(page) {
      this.setPendingMerchantRequestCurrentPage(page)
      this.fetchPendingMerchantRequests()
    },
  },
}
</script>

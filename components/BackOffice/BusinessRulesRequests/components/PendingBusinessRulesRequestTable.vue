<template>
  <div>
    <common-table
      searchable
      search-placeholder="Search Business Rule Requests.."
      :data="tableData"
      empty-state-title="No Business Rule Requests Available"
      empty-state-description="There are no business rule requests available as of the moment."
      :fetching="pendingBusinessRulesRequests.fetch"
      pagination
      :pagination-length="pendingBusinessRulesRequests.paginationLength"
      :pagination-limit="10"
      :pagination-page="pendingBusinessRulesRequests.page"
      @table-paginate="changePage"
    >
      <template #table-data-2="{ data }">
        <common-badge
          v-if="data === 'GenerateBusinessRule'"
          title="CREATE"
          variant="success"
        />
        <common-badge
          v-else-if="data === 'StageRemoveBusinessRule'"
          title="DELETE"
          variant="danger"
        />
        <common-badge v-else title="UPDATE" variant="info" />
      </template>
      <template #table-data-3="{ data }">
        <common-badge
          v-if="data < 2"
          :title="data === 0 ? 'Pending' : 'Approved'"
          :variant="data === 0 ? 'warning' : 'success'"
        />
        <common-badge v-else title="Denied" variant="danger" />
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
    ...mapState('back-office', ['pendingBusinessRulesRequests']),
    ...mapGetters('back-office', ['formattedPendingBusinessRulesRequests']),
    tableData() {
      return {
        columns: ['Requested By', 'Created Date', 'Type', 'Status'],
        rows: this.formattedPendingBusinessRulesRequests
          ? this.formattedPendingBusinessRulesRequests.map(
              ({
                id,
                requestedBy,
                dateCreated,
                recordStatus,
                procedureName,
              }) => {
                return {
                  id,
                  rowValues: [
                    requestedBy,
                    dateCreated,
                    procedureName,
                    recordStatus,
                  ],
                }
              }
            )
          : [],
        callbacks: [
          {
            callback: (id) => this.$emit('approve-request', id, false, true),
            title: 'Approve Request',
            icon: 'edit',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e),
          },
          {
            callback: (id) => this.$emit('deny-request', id, true, true),
            title: 'Deny Request',
            icon: 'trash-can',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e, true),
          },
        ],
      }
    },
  },
  mounted() {
    this.$store.dispatch('back-office/fetchPendingBusinessRulesRequests')
  },
  methods: {
    ...mapActions('back-office', ['fetchPendingBusinessRulesRequests']),
    ...mapMutations('back-office', [
      'setPendingBusinessRulesRequestCurrentPage',
    ]),
    visibilityCaseHandle(data, isReject = false) {
      const businessRule = this.formattedPendingBusinessRulesRequests.find(
        ({ id }) => id === data
      )
      const stageUpdate = () =>
        this.$authorize('/back-office/business-rules/stage/update')
      const stageCreate = () =>
        this.$authorize('/back-office/business-rules/stage/create')
      if (businessRule.oldDetails) {
        return isReject
          ? stageUpdate() && businessRule.recordStatus === 0
          : stageUpdate()
      }
      return isReject
        ? stageCreate() && businessRule.recordStatus === 0
        : stageCreate()
    },
    changePage(page) {
      this.setPendingBusinessRulesRequestCurrentPage(page)
      this.fetchPendingBusinessRulesRequests()
    },
  },
}
</script>

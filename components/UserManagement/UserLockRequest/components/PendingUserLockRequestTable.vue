<template>
  <div>
    <common-table
      searchable
      search-placeholder="Search User lock requests.."
      :data="tableData"
      empty-state-title="No User lock requests available"
      empty-state-description="There are no user lock requests available as of the moment."
      :fetching="pendingUserLockRequests.fetchUserLockRequestState"
      pagination
      :pagination-length="pendingUserLockRequests.paginationLength"
      :pagination-limit="10"
      :pagination-page="pendingUserLockRequests.page"
      @table-paginate="changePage"
    >
      <template #table-data-2="{ data }">
        <common-badge
          :title="data"
          :variant="data === 'UPDATE' ? 'info' : 'danger'"
        />
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
    ...mapState('users', ['updateRoleState', 'pendingUserLockRequests']),
    ...mapGetters('users', ['formattedPendingUserLockRequest']),
    tableData() {
      return {
        columns: ['User Code', 'Created Date', 'Type', 'Status'],
        rows: this.formattedPendingUserLockRequest
          ? this.formattedPendingUserLockRequest.map(
              ({
                requestedBy,
                recordStatus,
                id,
                dateCreated,
                procedureName,
              }) => {
                return {
                  id,
                  rowValues: [
                    requestedBy,
                    dateCreated,
                    procedureName !== 'StageLockUser' ? 'UPDATE' : 'CREATE',
                    recordStatus,
                  ],
                }
              }
            )
          : [],
        callbacks: [
          {
            callback: (id) => this.$emit('approve-request', id, false, false),
            title: 'Approve Lock Request',
            icon: 'edit',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e),
          },
          {
            callback: (id) => this.$emit('deny-request', id, true, false),
            title: 'Deny Request',
            icon: 'trash-can',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e, true),
          },
        ],
      }
    },
  },
  mounted() {
    this.$store.dispatch('users/fetchPendingLockRequests')
  },
  methods: {
    ...mapActions('users', ['fetchPendingLockRequests']),
    ...mapMutations('users', ['setPendingUserLockCurrentPage']),
    visibilityCaseHandle(data, isReject = false) {
      const aggregator = this.formattedPendingUserLockRequest.find(
        ({ id }) => id === data
      )
      const stageCreate = () => this.$authorize('/users/lock/update')
      return isReject
        ? stageCreate() && aggregator.RecordStatus === 0
        : stageCreate()
    },
    changePage(page) {
      this.setPendingUserLockCurrentPage(page)
      this.fetchPendingLockRequests()
    },
  },
}
</script>

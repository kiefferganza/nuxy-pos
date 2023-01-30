<template>
  <div>
    <common-table
      searchable
      search-placeholder="Search User Detail Requests.."
      :data="tableData"
      empty-state-title="No User Detail Requests Available"
      empty-state-description="There are no user detail requests available as of the moment."
      :fetching="userDetailsRequests.fetch"
      pagination
      :pagination-length="userDetailsRequests.paginationLength"
      :pagination-limit="10"
      :pagination-page="userDetailsRequests.page"
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
        <common-badge v-else title="Denied" variant="danger" />
      </template>
      <template #action-buttons-0="{ data, title, id }">
        <span v-if="data[3] === 0 && visibilityCaseHandle(id)">{{
          title
        }}</span>
        <span v-else>View Request</span>
      </template>
    </common-table>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('users', ['userDetailsRequests']),
    ...mapGetters('users', ['formattedUserDetailsRequests']),
    tableData() {
      return {
        columns: ['Requested By', 'Created Date', 'Type', 'Status'],
        rows: this.formattedUserDetailsRequests
          ? this.formattedUserDetailsRequests.map(
              ({ id, requestedBy, dateCreated, recordStatus, requestType }) => {
                return {
                  id,
                  rowValues: [
                    requestedBy,
                    dateCreated,
                    requestType,
                    recordStatus,
                  ],
                }
              }
            )
          : [],
        callbacks: [
          {
            callback: (id) => this.$emit('approve-request', id),
            title: 'Approve Request',
            icon: 'edit',
            visible: true,
          },
          {
            callback: (id) => this.$emit('deny-request', id, true),
            title: 'Deny Request',
            icon: 'trash-can',
            customCaseVisibility: (e) => this.visibilityCaseHandle(e, true),
          },
        ],
      }
    },
  },
  methods: {
    ...mapActions('users', ['fetchUserDetailRequests']),
    ...mapMutations('users', ['setUserDetailsRequestCurrentPage']),
    visibilityCaseHandle(data, isReject = false) {
      const userDetail = this.formattedUserDetailsRequests.find(
        ({ id }) => id === data
      )
      const stageUpdate = () =>
        this.$authorize('/back-office/user/stage/update')
      const stageCreate = () =>
        this.$authorize('/back-office/user/stage/create')
      if (userDetail.oldDetails) {
        return isReject
          ? stageUpdate() && userDetail.recordStatus === 0
          : stageUpdate()
      }
      return isReject
        ? stageCreate() && userDetail.recordStatus === 0
        : stageCreate()
    },
    changePage(page) {
      this.setUserDetailsRequestCurrentPage(page)
      this.fetchUserDetailRequests()
    },
  },
}
</script>

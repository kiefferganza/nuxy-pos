<template>
  <common-table
    class="animate__animated animate__fadeIn"
    searchable
    search-placeholder="Search users.."
    :data="tableData"
    empty-state-title="No Users Available"
    empty-state-description="There are no users available as of the moment."
    :fetching="onlineUsers.fetch"
    pagination
    :pagination-length="onlineUsers.paginationLength"
    :pagination-limit="10"
    :pagination-page="onlineUsers.page"
    @table-paginate="changePage"
  >
    <template #table-data-0="{ data }">
      <div class="flex items-center gap-4">
        <div class="flex">
          <fa-icon icon="circle" class="text-green-400 h-3 w-3" />
          <fa-icon
            icon="circle"
            class="animate-ping text-green-400 h-3 w-3"
            style="margin-left: -50%"
          />
        </div>
        <span>
          {{ data }}
        </span>
      </div>
    </template>
    <template #table-data-2="{ data }">
      <common-badge
        :title="data"
        :variant="data === 'Inactive' ? 'danger' : 'success'"
      />
    </template>
  </common-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import FaIcon from '~/components/Common/FaIcon'

export default {
  components: { FaIcon },
  computed: {
    ...mapState('users', ['onlineUsers']),
    ...mapGetters('users', ['formattedOnlineUsers']),
    tableData() {
      return {
        columns: ['Name', 'Role'],
        rows: this.formattedOnlineUsers
          ? this.formattedOnlineUsers.map((e) => {
              return {
                id: e.UserCode,
                rowValues: [e.FullName, e.RoleName],
              }
            })
          : [],
        callbacks: [
          {
            callback: (id) => this.$emit('logout-user', id),
            title: 'Logout User',
            icon: 'right-from-bracket',
          },
        ],
      }
    },
  },
  mounted() {
    this.$store.dispatch('users/fetchOnlineUsers')
  },
  methods: {
    ...mapActions('users', ['fetchOnlineUsers']),
    ...mapMutations('users', ['setOnlineUsersCurrentPage']),
    changePage(page) {
      this.setOnlineUsersCurrentPage(page)
      this.fetchOnlineUsers()
    },
  },
}
</script>

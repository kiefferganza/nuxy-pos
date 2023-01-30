<template>
  <common-table
    class="animate__animated animate__fadeIn"
    searchable
    search-placeholder="Search users.."
    :data="tableData"
    empty-state-title="No Users Available"
    empty-state-description="There are no users available as of the moment."
    :fetching="fetchUserState"
    pagination
    :pagination-length="paginationLength"
    :pagination-limit="10"
    :pagination-page="page"
    @table-paginate="changePage"
  >
    <template #widget>
      <form-button
        v-if="$authorize('/back-office/users/create')"
        class="button button__success flex items-center gap-1"
        @click="showModal"
      >
        <fa-icon icon="plus" class="h-4 w-4" /> Create User
      </form-button>
    </template>
    <template #table-data-3="{ data }">
      <common-badge
        :title="data"
        :variant="data === 'Locked' ? 'danger' : 'success'"
      />
    </template>
    <template #action-buttons-2="{ data, title }">
      <span v-if="data.includes('Locked')">Unlock User</span>
      <span v-else>{{ title }}</span>
    </template>
  </common-table>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import FormButton from '@/components/Common/Inputs/FormButton'
import FaIcon from '@/components/Common/FaIcon'
export default {
  components: {
    FaIcon,
    FormButton,
  },
  computed: {
    ...mapState('users', [
      'users',
      'fetchUserState',
      'page',
      'paginationLength',
    ]),
    ...mapGetters('users', ['formattedUsers']),
    tableData() {
      return {
        columns: ['User Code', 'Name', 'Role', 'Lock Status'],
        rows: this.formattedUsers
          ? this.formattedUsers.map((e) => {
              return {
                id: e.UserCode,
                rowValues: [
                  e.UserCode,
                  e.FullName,
                  e.RoleName,
                  e.IsLocked === 1 ? 'Locked' : 'Unlocked',
                ],
              }
            })
          : [],
        callbacks: [
          // {
          //   callback: (id) => this.$emit('assign-role', id),
          //   title: 'Assign Role',
          //   icon: 'edit',
          // },
          {
            callback: (id) => this.$emit('show-user-modal', id),
            title: 'Update User',
            icon: 'edit',
            visible: this.$authorize('/back-office/users/update'),
          },
          {
            callback: (id) => this.$emit('lock-user', id),
            title: 'Lock User',
            icon: 'lock',
            visible: this.$authorize('/users/lock/stage'),
          },
        ],
      }
    },
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    ...mapMutations('users', ['setCurrentPage']),
    changePage(page) {
      this.setCurrentPage(page)
      this.fetchUsers()
    },
    showModal() {
      this.$emit('show-user-modal')
    },
  },
}
</script>

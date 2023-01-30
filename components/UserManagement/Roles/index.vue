<template>
  <div class="flex flex-col border border-gray-100 shadow-md rounded-lg">
    <div class="inline-block min-w-full align-middle dark:bg-gray-800">
      <common-table
        searchable
        search-placeholder="Search roles.."
        :data="tableData"
        empty-state-title="No Roles Available"
        empty-state-description="There are no roles available as of the moment."
        :fetching="fetchRoleState"
        pagination
        :pagination-length="paginationLength"
        :pagination-limit="10"
        :pagination-page="page"
        @table-paginate="changePage"
      />
    </div>
    <modal
      :show="modal"
      size="lg"
      title="Assign Permission"
      :busy="updatePermissionState"
      @save="submit"
      @close="hideModal"
    >
      <permission-table ref="permissionTable" v-model="checkedPermissions" />
    </modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Modal from '@/components/Common/Modal'
import PermissionTable from '@/components/UserManagement/Roles/components/PermissionTable'
import ModalMixin from '@/mixins/ModalMixin'
export default {
  components: {
    PermissionTable,
    Modal,
  },
  mixins: [ModalMixin],
  data() {
    return {
      modal: false,
      updateID: null,
      checkedPermissions: [],
    }
  },
  computed: {
    ...mapState('roles', [
      'roles',
      'paginationLength',
      'fetchRoleState',
      'page',
    ]),
    ...mapState('permissions', ['permissions', 'updatePermissionState']),
    tableData() {
      return {
        columns: ['Role Name'],
        rows: this.roles
          ? this.roles.map((e) => {
              return {
                id: e.RoleID,
                rowValues: [e.Name],
              }
            })
          : [],
        callbacks: [
          {
            callback: (id) => this.showModal(id),
            title: 'Assign Permission',
            icon: 'edit',
          },
        ],
      }
    },
  },
  methods: {
    ...mapActions('roles', ['fetchRoles']),
    ...mapMutations('roles', ['setCurrentPage']),
    changePage(page) {
      this.setCurrentPage(page)
      this.fetchRoles()
    },
    showModal(id) {
      this.modal = true
      this.updateID = id
      this.checkedPermissions = []
      this.$refs.permissionTable.fetchCheckedPermissions(id)
    },
    submit() {
      const permissions = [
        ...this.checkedPermissions.map(({ id, checked }) => {
          return {
            MenuId: id,
            Permission: checked ? 1 : 0,
          }
        }),
      ]
      this.permissions.forEach(({ MenuID }) => {
        const permission = permissions.find(({ MenuId }) => MenuId === MenuID)
        if (!permission) {
          permissions.push({
            MenuId: MenuID,
            Permission: 0,
          })
        }
      })
      this.$emit('submit', {
        permissions,
        id: this.updateID,
      })
    },
  },
}
</script>

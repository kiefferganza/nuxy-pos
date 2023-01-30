<template>
  <div class="flex flex-col border border-gray-100 shadow-md rounded-lg">
    <div class="inline-block min-w-full align-middle dark:bg-gray-800">
      <tabs v-model="tabIndex" :options="['All Users', 'Online Users']">
        <template #tab-pane-content-0="{ data }">
          <common-fa-icon icon="list" class="-ml-0.5 mr-2 h-5 w-5" />
          {{ data }}
        </template>
        <template #tab-pane-content-1="{ data }">
          <common-fa-icon icon="signal" class="-ml-0.5 mr-2 h-5 w-5" />
          {{ data }}
        </template>
        <template #tab-body-0>
          <user-table
            @assign-role="showModal"
            @lock-user="lockUser"
            @show-user-modal="showUserModal"
          />
        </template>
        <template #tab-body-1>
          <user-online-table @logout-user="(e) => showModal(e, 'online')" />
        </template>
      </tabs>
    </div>
    <modal
      :show="modal"
      size="md"
      :busy="userLogoutState"
      save-title="Log out user"
      @save="submit('logout-user')"
      @close="hideModal"
    >
      <div
        class="flex flex-col items-center justify-center text-xl font-medium"
      >
        <span>Are you sure you want to log out this user ?</span>
      </div>
    </modal>
    <modal
      :show="updateRoleModal"
      size="sm"
      title="Assign Role"
      :busy="updateRoleState"
      @save="submit('update-role')"
      @close="hideUpdateRoleModal"
    >
      <form-group label="User Role" label-for="role">
        <form-select
          v-model="selectedRole"
          :options="roleOptions"
          track-by="name"
          label="name"
          :allow-empty="false"
        />
      </form-group>
    </modal>
    <user-form-modal
      ref="userDetailModal"
      :show="userDetailModal"
      :update-data="updateData"
      @submit="submitUserDetails"
      @close-user-modal="userDetailModal = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Common/Modal'
import ModalMixin from '@/mixins/ModalMixin'
import Tabs from '~/components/Common/Tabs'
import FormGroup from '~/components/Common/FormGroup'
import FormSelect from '~/components/Common/Inputs/FormSelect'
import UserTable from '~/components/UserManagement/Users/components/UserTable'
import UserOnlineTable from '@/components/UserManagement/Users/components/UserOnlineTable'
import UserFormModal from '@/components/UserManagement/Users/components/UserFormModal'

export default {
  components: {
    UserFormModal,
    UserOnlineTable,
    UserTable,
    FormGroup,
    FormSelect,
    Modal,
    Tabs,
  },
  mixins: [ModalMixin],
  data() {
    return {
      tabIndex: 0,
      updateRoleModal: false,
      userDetailModal: false,
      updateID: null,
      updateData: {},
      checkedPermissions: [],
      selectedRole: null,
      selectedUserCode: null,
    }
  },
  computed: {
    ...mapState('users', [
      'users',
      'onlineUsers',
      'fetchUserState',
      'page',
      'userLogoutState',
      'paginationLength',
      'updateRoleState',
    ]),
    ...mapState('roles', ['roles']),
    roleOptions() {
      return this.roles.map(({ RoleID, Name }) => {
        return {
          value: RoleID,
          name: Name,
        }
      })
    },
  },
  methods: {
    showModal(id, type = 'all') {
      if (type === 'online') {
        this.modal = true
      } else {
        this.updateRoleModal = true
      }
      this.getModel(id, type)
    },
    hideUpdateRoleModal(id) {
      this.updateRoleModal = false
    },
    getModel(id, type = 'all') {
      this.updateID = id
      const data =
        type === 'all'
          ? this.users.find(({ UserCode }) => UserCode === id)
          : this.onlineUsers.list.find(({ UserCode }) => UserCode === id)
      this.selectedRole = this.roleOptions.find(
        ({ value }) => value === data.RoleID
      )
      this.selectedUserCode = data.UserCode
    },
    lockUser(id) {
      const lockStatus =
        this.users.find(({ UserCode }) => UserCode === id).IsLocked === 1
      this.$emit('lock-user', {
        id,
        isLocked: !lockStatus,
      })
    },
    submit(meta) {
      return this.$emit('submit', {
        roleId: this.selectedRole.value,
        selectedUserCode: this.selectedUserCode,
        id: this.updateID,
        meta,
      })
    },
    showUserModal(data) {
      this.updateData = this.users.find(({ UserCode }) => UserCode === data)
      this.userDetailModal = true
    },
    hideUserModal() {
      this.userDetailModal = false
    },
    submitUserDetails(meta) {
      return this.$emit('submit-user-details', meta)
    },
  },
}
</script>

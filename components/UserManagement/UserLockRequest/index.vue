<template>
  <div class="flex flex-col border border-gray-100 shadow-md rounded-lg">
    <div class="inline-block min-w-full align-middle dark:bg-gray-800">
      <tabs v-model="tabIndex" :options="['All Requests', 'Pending Requests']">
        <template #tab-pane-content-0="{ data }">
          <common-fa-icon icon="list" class="-ml-0.5 mr-2 h-5 w-5" />
          {{ data }}
        </template>
        <template #tab-pane-content-1="{ data }">
          <common-fa-icon icon="hourglass-2" class="-ml-0.5 mr-2 h-5 w-5" />
          {{ data }}
        </template>
        <template #tab-body-0>
          <user-lock-request-table
            @approve-request="showModal"
            @deny-request="showModal"
          />
        </template>
        <template #tab-body-1>
          <pending-user-lock-request-table
            @approve-request="showModal"
            @deny-request="showModal"
          />
        </template>
      </tabs>
    </div>
    <UserLockRequestModal
      ref="userLockRequestModal"
      :show="modal"
      :is-reject="isReject"
      :is-filtered="isFiltered"
      :update-data="lockRequest"
      @submit="handleSubmit"
      @close-user-modal="modal = false"
    />
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import UserLockRequestModal from './components/UserLockRequestModal'
import UserLockRequestTable from './components/UserLockRequestTable'
import PendingUserLockRequestTable from './components/PendingUserLockRequestTable'
import Tabs from '~/components/Common/Tabs'
import ModalMixin from '@/mixins/ModalMixin'
import DashboardMixin from '@/mixins/DashboardMixin'
export default {
  components: {
    UserLockRequestModal,
    UserLockRequestTable,
    PendingUserLockRequestTable,
    Tabs,
  },
  mixins: [ModalMixin, DashboardMixin],
  data() {
    return {
      tabIndex: 0,
      updateID: null,
      isReject: false,
      checkedPermissions: [],
      selectedRole: null,
      lockRequest: {
        oldRecord: null,
        newRecord: null,
        RecordStatus: null,
      },
      userCode: null,
      userCodeMaker: null,
      isUpdated: false,
      isFiltered: false,
    }
  },
  computed: {
    ...mapState('users', ['updateRoleState', 'userLockRequest']),
    ...mapGetters('users', ['formattedUsers', 'formattedUserLockRequest']),
  },
  methods: {
    showModal(id, isReject = false, isFiltered = false) {
      this.modal = true
      this.isReject = isReject
      this.isFiltered = isFiltered
      this.getModel(id)
    },
    getModel(id) {
      this.updateID = id
      const userCode = this.formattedUserLockRequest.find(
        (e) => e.id === this.updateID
      )
      console.log(userCode)
      this.userCode = userCode.UserCode
      this.userCodeMaker = userCode.CreatedBy
      this.isUpdated = userCode.recordStatus === 1
      this.lockRequest.newRecord =
        parseInt(userCode.newRecordDetails.UserLocked[0].NewIsLocked) === 1
          ? 'Locked'
          : 'Unlocked'

      this.lockRequest.oldRecord =
        parseInt(userCode.oldRecordDetails.UserLocked[0].OldIsLocked) === 1
          ? 'Locked'
          : 'Unlocked'
      this.lockRequest.recordStatus = userCode.recordStatus
    },
    handleSubmit(payload) {
      this.$emit('submit', {
        status: payload.status,
        stagingId: this.updateID,
        isFiltered: this.isFiltered,
      })
    },
  },
}
</script>

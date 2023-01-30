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
            <user-details-request-table
              @approve-request="showUserDetailsModal"
              @deny-request="showUserDetailsModal"
            />
          </template>
          <template #tab-body-1>
            <pending-user-details-request-table
              @approve-request="showPendingUserDetailsModal"
              @deny-request="showPendingUserDetailsModal"
            />
          </template>
        </tabs>
      </div>
    </div>
    <user-details-request-modal
      ref="aggregatorRequestModal"
      :show="modal"
      :is-reject="isReject"
      :is-filtered="isFiltered"
      :update-data="updateData"
      @submit="handleSubmit"
      @close-user-modal="modal = false"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UserDetailsRequestModal from './components/UserDetailsRequestModal'
import Tabs from '~/components/Common/Tabs'
import UserDetailsRequestTable from '@/components/UserManagement/UserDetailsRequests/components/UserDetailsRequestTable'
import PendingUserDetailsRequestTable from '@/components/UserManagement/UserDetailsRequests/components/PendingUserDetailsRequestTable'
import ModalMixin from '@/mixins/ModalMixin'
import DashboardMixin from '@/mixins/DashboardMixin'
export default {
  components: {
    UserDetailsRequestModal,
    UserDetailsRequestTable,
    PendingUserDetailsRequestTable,
    Tabs,
  },
  mixins: [ModalMixin, DashboardMixin],
  data() {
    return {
      updateData: {},
      isReject: false,
      isFiltered: false,
      tabIndex: 0,
    }
  },
  computed: {
    ...mapState('users', ['userDetailsRequests']),
    ...mapGetters('users', [
      'formattedUserDetailsRequests',
      'formattedPendingUserDetailsRequests',
    ]),
  },
  methods: {
    handleSubmit(payload) {
      this.$emit('submit', {
        ...payload,
        type: this.updateData.oldDetails ? 'update' : 'create',
      })
    },
    showUserDetailsModal(id, isReject = false, isFiltered = false) {
      this.modal = true
      this.isReject = isReject
      this.isFiltered = isFiltered
      this.updateData = this.formattedUserDetailsRequests.find(
        (e) => e.id === id
      )
    },
    showPendingUserDetailsModal(id, isReject = false, isFiltered = false) {
      this.modal = true
      this.isReject = isReject
      this.isFiltered = isFiltered
      this.updateData = this.formattedPendingUserDetailsRequests.find(
        (e) => e.id === id
      )
    },
  },
}
</script>

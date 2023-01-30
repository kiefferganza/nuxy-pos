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
            <business-rules-request-table
              @approve-request="showModal"
              @deny-request="showModal"
            />
          </template>
          <template #tab-body-1>
            <pending-business-rules-request-table
              @approve-request="showModal"
              @deny-request="showModal"
            />
          </template>
        </tabs>
      </div>
    </div>
    <business-rules-request-modal
      ref="businessRuleRequestModal"
      :show="modal"
      :is-reject="isReject"
      :update-data="updateData"
      @submit="handleSubmit"
      @close-user-modal="modal = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import BusinessRulesRequestModal from './components/BusinessRulesRequestModal'
import BusinessRulesRequestTable from './components/BusinessRulesRequestTable'
import PendingBusinessRulesRequestTable from './components/PendingBusinessRulesRequestTable'
import Tabs from '~/components/Common/Tabs'
import ModalMixin from '@/mixins/ModalMixin'
import DashboardMixin from '@/mixins/DashboardMixin'
export default {
  components: {
    BusinessRulesRequestModal,
    BusinessRulesRequestTable,
    PendingBusinessRulesRequestTable,
    Tabs,
  },
  mixins: [ModalMixin, DashboardMixin],
  data() {
    return {
      updateData: {},
      isReject: false,
      tabIndex: 0,
      isFiltered: false,
    }
  },
  computed: {
    ...mapState('back-office', ['businessRulesRequests']),
    ...mapGetters('back-office', [
      'formattedBusinessRulesRequests',
      'formattedPendingBusinessRulesRequests',
    ]),
  },
  methods: {
    ...mapActions('back-office', ['fetchBusinessRulesRequests']),
    ...mapMutations('back-office', ['setBusinessRulesRequestCurrentPage']),
    handleSubmit(payload) {
      let type = 'create'
      if (this.updateData.procedureName === 'StageRemoveBusinessRule') {
        type = 'delete'
      } else {
        type = this.updateData.oldDetails ? 'update' : 'create'
      }
      this.$emit('submit', {
        ...payload,
        type,
      })
    },
    showModal(id, isReject = false, isFiltered = false) {
      this.modal = true
      this.isReject = isReject
      this.updateData = isFiltered
        ? this.formattedPendingBusinessRulesRequests.find((e) => e.id === id)
        : this.formattedBusinessRulesRequests.find((e) => e.id === id)
    },
  },
}
</script>

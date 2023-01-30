<template>
  <div>
    <div class="flex flex-col border border-gray-100 shadow-md rounded-lg">
      <div class="inline-block min-w-full align-middle dark:bg-gray-800">
        <common-table
          searchable
          search-placeholder="Search Business Rules.."
          :data="tableData"
          empty-state-title="No Business Rules Available"
          empty-state-description="There are no business rules available as of the moment."
          :fetching="businessRules.fetch"
          pagination
          :pagination-length="businessRules.paginationLength"
          :pagination-limit="10"
          :pagination-page="businessRules.page"
          @table-paginate="changePage"
        >
          <template #widget>
            <form-button
              v-if="$authorize('/back-office/business-rules/create')"
              class="button button__success flex items-center gap-1"
              @click="showModal"
            >
              <fa-icon icon="plus" class="h-4 w-4" /> Create Business Rule
            </form-button>
          </template>
        </common-table>
      </div>
    </div>
    <business-rules-modal
      ref="billerModal"
      :show="modal"
      :update-data="updateData"
      :is-delete="isDelete"
      @submit="handleSubmit"
      @close-user-modal="modal = false"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import BusinessRulesModal from './components/BusinessRulesModal'
import ModalMixin from '@/mixins/ModalMixin'
import FormButton from '~/components/Common/Inputs/FormButton'
import FaIcon from '~/components/Common/FaIcon'
export default {
  components: {
    BusinessRulesModal,
    FaIcon,
    FormButton,
  },
  mixins: [ModalMixin],
  data() {
    return {
      updateID: null,
      updateData: {},
      isDelete: null,
    }
  },
  computed: {
    ...mapState('back-office', ['businessRules']),
    tableData() {
      return {
        columns: ['ID', 'Name', 'Description', 'Value'],
        rows: this.businessRules.list
          ? this.businessRules.list.map(
              ({ businessRuleID, description, name, value }) => {
                return {
                  id: businessRuleID,
                  rowValues: [businessRuleID, name, description, value],
                }
              }
            )
          : [],
        callbacks: [
          {
            callback: (id) => this.showModal(id, 'update'),
            title: 'Update Business Rule',
            icon: 'edit',
            visible: this.$authorize('/back-office/business-rules/update'),
          },
          {
            callback: (id) => this.showModal(id, 'delete'),
            title: 'Delete Business Rule',
            icon: 'trash-can',
            visible: this.$authorize('/back-office/business-rules/delete'),
          },
        ],
      }
    },
  },
  methods: {
    ...mapActions('back-office', ['fetchBusinessRules']),
    ...mapMutations('back-office', ['setBusinessRulesCurrentPage']),
    changePage(page) {
      this.setBusinessRulesCurrentPage(page)
      this.fetchBusinessRules()
    },
    handleSubmit(payload) {
      this.$emit('submit', payload)
    },
    resetForm() {
      this.modal = false
      this.updateData = {}
      this.$refs.billerModal.resetForm()
    },
    showModal(id, type = 'create') {
      this.modal = true
      if (type !== 'create') {
        this.updateID = id
        this.isDelete = type === 'delete'
        this.updateData = this.businessRules.list.find(
          ({ businessRuleID }) => businessRuleID === id
        )
      } else {
        this.isDelete = false
        this.updateData = {}
      }
    },
  },
}
</script>

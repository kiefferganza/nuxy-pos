<template>
  <common-modal
    :show="show"
    size="md"
    is-form
    :title="
      !isUpdate
        ? 'Create Business Rule'
        : !isDelete
        ? 'Update Business Rule'
        : ''
    "
    :busy="businessRulesCreate.fetch"
    @save="submit"
    @close="closeModal"
  >
    <alert-component v-show="businessRulesCreate.error" variant="danger">
      <error-message :message="businessRulesCreate.error" />
    </alert-component>
    <div v-if="!isDelete">
      <form-group class="w-full pb-4" label="Name" label-for="name" required>
        <form-input v-model="name" required type="text" name="name" block />
      </form-group>
      <form-group
        class="w-full pb-4"
        label="Description"
        label-for="description"
        required
      >
        <form-input
          v-model="description"
          required
          type="text"
          name="description"
          block
        />
      </form-group>
      <form-group class="w-full pb-4" label="Value" label-for="value" required>
        <form-input v-model="value" required type="number" name="value" block />
      </form-group>
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <warning-icon />
      <span class="font-medium text-lg"
        >Are you sure you want to delete this record?</span
      >
      <span class="font-extralight text-sm"
        >Action is irreversible after this.</span
      >
    </div>
  </common-modal>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import FormGroup from '~/components/Common/FormGroup'
import FormInput from '~/components/Common/Inputs/FormInput'
import ErrorMessage from '@/components/Common/ErrorMessage'
import AlertComponent from '@/components/Common/AlertComponent'
import WarningIcon from '@/components/Common/Icons/WarningIcon'
import { CREATE, UPDATE } from '@/js/constants/form-validations/business-rules'

export default {
  components: {
    AlertComponent,
    WarningIcon,
    FormGroup,
    FormInput,
    ErrorMessage,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    updateData: {
      type: Object,
      default: () => {},
    },
    isDelete: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      name: null,
      description: null,
      value: null,
    }
  },
  computed: {
    ...mapState('back-office', ['businessRulesCreate', 'businessRules']),
    isUpdate() {
      return !this.checkEmptyObject(this.updateData)
    },
  },
  watch: {
    updateData(newData) {
      this.setBusinessRulesCreateError('')
      if (this.isUpdate) {
        this.name = newData.name
        this.description = newData.description
        this.value = newData.value
      } else {
        this.resetForm()
      }
    },
  },
  methods: {
    ...mapMutations('back-office', ['setBusinessRulesCreateError']),
    checkEmptyObject(data) {
      return isEmpty(data)
    },
    submit() {
      if (
        this.$validate(
          this.isUpdate ? UPDATE : CREATE,
          this,
          'back-office/setBusinessRulesCreateError'
        ).length === 0
      ) {
        this.$emit('submit', {
          name: this.name,
          description: this.description,
          value: this.value,
          id: this.updateData?.businessRuleID,
          isUpdate: this.isUpdate,
          isDelete: this.isDelete,
        })
      }
    },
    resetForm() {
      this.name = null
      this.description = null
      this.value = null
    },
    closeModal() {
      this.$emit('close-user-modal')
    },
  },
}
</script>

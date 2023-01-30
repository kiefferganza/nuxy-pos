<template>
  <common-modal
    :show="show"
    :size="isReject ? 'md' : 'lg'"
    :save-title="isReject ? 'Reject Request' : 'Save'"
    :title="isReject ? '' : 'Business Rule Request'"
    :busy="businessRulesCreate.fetch"
    :show-button="updateData.recordStatus === 0"
    @save="submit"
    @close="closeModal"
  >
    <div v-if="!isReject" class="grid grid-cols-1 md:grid-cols-9 gap-3">
      <div
        v-if="updateData.oldDetails"
        class="border border-red-300 bg-red-50 shadow-md rounded-md py-4 px-6 w-full md:col-span-4"
      >
        <form-group
          class="w-full pb-4 py-4"
          label="Name"
          label-for="institution-name"
        >
          <span class="font-light text-sm">{{ oldDetail.name }}</span>
        </form-group>

        <form-group
          class="w-full pb-4 py-1"
          label="Description"
          label-for="description"
        >
          <span class="font-light text-sm">{{ oldDetail.description }}</span>
        </form-group>

        <form-group class="w-full pb-4 py-1" label="Value" label-for="value">
          <span class="font-light text-sm">{{ oldDetail.value }}</span>
        </form-group>
      </div>
      <div class="flex items-center justify-center">
        <fa-icon
          v-if="updateData.oldDetails"
          icon="arrow-right-arrow-left"
          class="h-8 w-8 text-green-500"
        />
      </div>
      <div
        :class="{ 'md:col-span-9': !updateData.oldDetails }"
        class="border border-green-300 bg-green-50 shadow-md rounded-md py-4 px-6 w-full md:col-span-4"
      >
        <div
          :class="{
            'flex items-center flex-col md:flex-row': !updateData.oldDetails,
          }"
        >
          <form-group
            :class="{ 'py-4': updateData.oldDetails }"
            class="w-full pb-4"
            label="Name"
            label-for="name"
          >
            <span class="font-light text-sm">{{ newDetail.name }}</span>
          </form-group>

          <form-group
            class="w-full pb-4 py-1"
            label="Description"
            label-for="description"
          >
            <span class="font-light text-sm">{{ newDetail.description }}</span>
          </form-group>
          <form-group class="w-full pb-4 py-1" label="Value" label-for="value">
            <span class="font-light text-sm">{{ newDetail.value }}</span>
          </form-group>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <warning-icon />
      <span class="font-medium text-lg"
        >Are you sure you want to reject this request?</span
      >
      <span class="font-extralight text-sm"
        >Action is irreversible after this.</span
      >
    </div>
  </common-modal>
</template>

<script>
import { mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import FormGroup from '~/components/Common/FormGroup'
import FaIcon from '@/components/Common/FaIcon'
import WarningIcon from '@/components/Common/Icons/WarningIcon'

export default {
  components: {
    WarningIcon,
    FaIcon,
    FormGroup,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    isReject: {
      type: Boolean,
      default: true,
    },
    isFiltered: {
      type: Boolean,
      default: true,
    },
    updateData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      name: null,
    }
  },
  computed: {
    ...mapState('back-office', ['businessRulesCreate']),
    newDetail() {
      return this.updateData?.newDetails?.BusinessRule[0]
        ? {
            name: this.updateData?.newDetails?.BusinessRule[0].Name,
            description:
              this.updateData?.newDetails?.BusinessRule[0].Description,
            value: this.updateData?.newDetails?.BusinessRule[0].Value,
          }
        : {
            name: '',
            description: '',
            value: '',
          }
    },
    oldDetail() {
      return this.updateData?.oldDetails?.BusinessRule[0]
        ? {
            name: this.updateData?.oldDetails?.BusinessRule[0].Name,
            description:
              this.updateData?.oldDetails?.BusinessRule[0].Description,
            value: this.updateData?.oldDetails?.BusinessRule[0].Value,
          }
        : {
            name: '',
            description: '',
            value: '',
          }
    },
  },
  methods: {
    checkEmptyObject(data) {
      return isEmpty(data)
    },
    submit() {
      this.$emit('submit', {
        status: this.isReject ? 0 : 1,
        id: this.updateData.id,
        isFiltered: this.isFiltered,
      })
    },
    closeModal() {
      this.$emit('close-user-modal')
    },
  },
}
</script>

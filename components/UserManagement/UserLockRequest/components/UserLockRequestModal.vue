<template>
  <common-modal
    :show="show"
    size="md"
    :save-title="isReject ? 'Reject Request' : 'Save'"
    :title="isReject ? '' : 'User Lock Request'"
    :busy="userLockRequest.updateUserLockRequestState"
    :show-button="updateData.recordStatus === 0"
    @save="submit"
    @close="closeModal"
  >
    <div
      v-if="!isReject"
      class="grid grid-cols-1 md:grid-cols-9 gap-3 border-b p-5"
    >
      <div
        v-if="updateData.oldRecord"
        class="border border-red-300 bg-red-50 shadow-md rounded-md py-4 px-6 w-full md:col-span-4"
      >
        <form-group
          class="w-full"
          label="Current Status"
          label-for="aggregator-name"
        >
          <span class="font-light text-sm">{{ oldDetail }}</span>
        </form-group>
      </div>
      <div class="flex items-center justify-center">
        <fa-icon
          v-if="updateData.oldRecord"
          icon="arrow-right-arrow-left"
          class="h-8 w-8 text-green-500"
        />
      </div>
      <div
        :class="{ 'md:col-span-9': !updateData.oldRecord }"
        class="border border-green-300 bg-green-50 shadow-md rounded-md py-4 px-6 w-full md:col-span-4"
      >
        <form-group
          class="w-full"
          label="New Status"
          label-for="aggregator-name"
        >
          <span class="font-light text-sm">{{ newDetail }}</span>
        </form-group>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-start">
      <warning-icon />
      <span class="font-medium text-lg"
        >Are you sure you want to reject this request?</span
      >
      <span class="font-extralight text-sm italic flex justify-end"
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
    ...mapState('users', ['userLockRequest']),
    newDetail() {
      return this.updateData.newRecord
    },
    oldDetail() {
      return this.updateData.oldRecord
    },
  },
  methods: {
    checkEmptyObject(data) {
      return isEmpty(data)
    },
    submit() {
      this.$emit('submit', {
        status: this.isReject ? 0 : 1,
        isFiltered: this.isFiltered,
      })
    },
    closeModal() {
      this.$emit('close-user-modal')
    },
  },
}
</script>

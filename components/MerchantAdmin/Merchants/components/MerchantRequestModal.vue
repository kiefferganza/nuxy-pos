<template>
  <common-modal
    :show="show"
    :size="isReject ? 'md' : 'xl'"
    save-title="Save"
    :title="modalTitle"
    :busy="merchantRequestCreate.fetch"
    :show-button="updateData.recordStatus === 0"
    @save="submit"
    @close="closeModal"
  >
    <alert-component
      v-show="merchantRequestCreate.error"
      class="pb-3"
      variant="danger"
    >
      <error-message :message="merchantRequestCreate.error" />
    </alert-component>
    <alert-component v-show="updateData.Remarks" class="pb-3" variant="info">
      <div class="flex items-start text-justify">
        <span class="text-lg text-blue-800 font-medium pr-4">Remarks:</span>

        <span class="text-lg italic font-normal text-blue-800">{{
          updateData.Remarks
        }}</span>
      </div>
    </alert-component>
    <div
      v-if="!isReject && !isOnHold"
      style="max-height: 30em"
      class="grid grid-cols-1 md:grid-cols-9 gap-3 overflow-y-auto overflow-x-hidden"
    >
      <div
        v-if="updateData.oldDetails"
        class="border border-red-300 bg-red-50 shadow-md rounded-md py-4 px-2 md:px-6 w-full md:col-span-4"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-5">
          <form-group
            class="w-full"
            label="Business Name"
            label-for="first-name"
          >
            {{ oldDetail.businessName }}
          </form-group>
          <form-group
            class="w-full"
            label="Business Alias"
            label-for="middle-name"
          >
            {{ oldDetail.businessAlias }}
          </form-group>
          <form-group class="w-full" label="Website URL" label-for="last-name">
            {{ oldDetail.websiteUrl }}
          </form-group>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-5">
          <form-group
            class="w-full"
            label="Primary Address"
            label-for="first-name"
          >
            {{ oldDetail.primaryAddress }}
          </form-group>
          <form-group
            class="w-full"
            label="Secondary Address"
            label-for="middle-name"
          >
            {{ oldDetail.secondaryAddress }}
          </form-group>
          <form-group class="w-full" label="Zip" label-for="last-name">
            {{ oldDetail.zip }}
          </form-group>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 pb-5">
          <form-group
            class="w-full"
            label="Date of Incorporation"
            label-for="first-name"
          >
            {{ oldDetail.dateOfIncorporation }}
          </form-group>
        </div>
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
        class="border border-green-300 bg-green-50 shadow-md rounded-md py-4 px-3 md:px-6 w-full md:col-span-4"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-5">
          <form-group
            class="w-full"
            label="Business Name"
            label-for="first-name"
          >
            <span class="font-light text-sm">{{ newDetail.businessName }}</span>
          </form-group>
          <form-group
            class="w-full"
            label="Business Alias"
            label-for="middle-name"
          >
            <span class="font-light text-sm">{{
              newDetail.businessAlias
            }}</span>
          </form-group>
          <form-group class="w-full" label="Website URL" label-for="last-name">
            <span class="font-light text-sm">{{ newDetail.websiteUrl }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-5">
          <form-group
            class="w-full"
            label="Primary Address"
            label-for="first-name"
          >
            <span class="font-light text-sm">{{
              newDetail.primaryAddress
            }}</span>
          </form-group>
          <form-group
            class="w-full"
            label="Secondary Address"
            label-for="middle-name"
          >
            <span class="font-light text-sm">{{
              newDetail.secondaryAddress
            }}</span>
          </form-group>
          <form-group class="w-full" label="Zip" label-for="last-name">
            <span class="font-light text-sm">{{ newDetail.zip }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-4 border-b pb-5">
          <form-group
            class="w-full"
            label="Date of Incorporation"
            label-for="first-name"
          >
            <span class="font-light text-sm">{{
              newDetail.dateOfIncorporation
            }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5 pt-3">
          <form-group
            v-for="(file, index) in newDetail.requirements"
            :key="index"
            class="w-full"
            :label="file.fileName"
            label-for="primary-address"
          >
            <nuxt-img :src="file.url" @error="setFallbackImage" />
            <a
              v-if="file.fileName"
              class="pb-3 font-light text-indigo-700"
              :href="file.url"
              target="_blank"
              >View Full Details</a
            >
          </form-group>
        </div>
      </div>
    </div>
    <div v-if="isReject" class="flex flex-col items-center justify-center">
      <warning-icon />
      <span class="font-medium text-lg"
        >Are you sure you want to reject this request?</span
      >
      <span class="font-light text-sm">Action is irreversible after this.</span>
    </div>
    <div v-if="isOnHold" class="flex flex-col items-center justify-start">
      <form-group class="w-full" label="Remarks" label-for="remarks" required>
        <form-text-area v-model="remarks" />
        <span class="font-extralight text-sm italic flex justify-end"
          >Action is irreversible after this.</span
        >
      </form-group>
    </div>
  </common-modal>
</template>

<script>
import { mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import format from 'date-fns/format'
import FallbackImageMixin from '@/mixins/FallbackImageMixin'
import FormGroup from '~/components/Common/FormGroup'
import FormTextArea from '@/components/Common/Inputs/FormTextArea'
import FaIcon from '@/components/Common/FaIcon'
import AlertComponent from '@/components/Common/AlertComponent'
import ErrorMessage from '@/components/Common/ErrorMessage'
import { ADDRESS_TYPES } from '@/js/constants/address-types'

export default {
  components: {
    FaIcon,
    FormGroup,
    FormTextArea,
    AlertComponent,
    ErrorMessage,
  },
  mixins: [FallbackImageMixin],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    isOnHold: {
      type: Boolean,
      default: true,
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
      remarks: null,
    }
  },
  computed: {
    ...mapState('merchant', ['merchantRequestCreate']),
    modalTitle() {
      if (this.isReject && !this.isOnHold) return ''
      if (!this.isReject && this.isOnHold) return 'Hold Merchant Request'
      return ''
    },
    newDetail() {
      return this.updateData?.newRecord
        ? {
            businessName: this.updateData.newRecord[0].BusinessName,
            businessAlias: this.updateData.newRecord[0].BusinessNameAlias,
            primaryAddress: this.updateData.newRecord[0].Address1,
            secondaryAddress: this.updateData.newRecord[0].Address2,
            dateOfIncorporation:
              this.updateData.newRecord[0].DateOfIncorporation,
            websiteUrl: this.updateData.newRecord[0].WebsiteURL,
            zip: this.updateData.newRecord[0].ZipCode,
            requirements: this.updateData.newRecord[0]?.Requirements?.map(
              (data) => {
                return {
                  fileName: data.FileName,
                  mimeType: data.MimeType,
                  requirementID: data.RequirementID,
                  url: data.URL ? data.URL : '/',
                }
              }
            ),
          }
        : {
            businessName: '',
            businessAlias: '',
            primaryAddress: '',
            secondaryAddress: '',
            dateOfIncorporation: '',
            websiteUrl: '',
            zip: '',
            requirements: [
              { fileName: '', mimeType: '', requirementID: '', url: '/' },
            ],
          }
    },
    oldDetail() {
      return this.updateData?.oldRecord
        ? {
            businessName: this.updateData.oldRecord[0].BusinessName,
            businessAlias: this.updateData.oldRecord[0].BusinessNameAlias,
            primaryAddress: this.updateData.oldRecord[0].Address1,
            secondaryAddress: this.updateData.oldRecord[0].Address2,
            dateOfIncorporation:
              this.updateData.oldRecord[0].DateOfIncorporation,
            websiteUrl: this.updateData.oldRecord[0].WebsiteURL,
            zip: this.updateData.oldRecord[0].ZipCode,
            requirements: this.updateData.oldRecord[0]?.Requirements?.map(
              (data) => {
                return {
                  fileName: data.FileName,
                  mimeType: data.MimeType,
                  requirementID: data.RequirementID,
                  url: data.URL,
                }
              }
            ),
          }
        : {
            businessName: '',
            businessAlias: '',
            primaryAddress: '',
            secondaryAddress: '',
            dateOfIncorporation: '',
            websiteUrl: '',
            zip: '',
            requirements: [
              { fileName: 'asd', mimeType: '', requirementID: '', url: '/' },
            ],
          }
    },
  },
  watch: {
    show(data) {
      if (data) {
        this.remarks = null
      }
    },
  },
  methods: {
    formatDate(data) {
      const date = data ?? new Date()
      return format(new Date(date), 'MMMM dd, yyyy')
    },
    getAddressType(addressTypeId) {
      return ADDRESS_TYPES[addressTypeId - 1]
    },
    checkEmptyObject(data) {
      return isEmpty(data)
    },
    submit() {
      let status = 1
      if (this.isReject) {
        status = 0
      } else if (this.isOnHold) {
        status = 2
      }
      this.$emit('submit', {
        status,
        id: this.updateData.id,
        remarks: this.remarks,
        isFiltered: this.isFiltered,
      })
    },
    closeModal() {
      this.$emit('close-user-modal')
    },
  },
}
</script>

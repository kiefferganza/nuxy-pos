<template>
  <common-modal
    :show="show"
    :size="isReject ? 'md' : 'xl'"
    :save-title="isReject ? 'Reject Request' : 'Save'"
    :title="isReject ? '' : 'User Detail Request'"
    :busy="userCreate.fetch"
    :show-button="updateData.recordStatus === 0 && visibilityCaseHandle"
    @save="submit"
    @close="closeModal"
  >
    <div
      v-if="!isReject"
      style="max-height: 30em"
      class="grid grid-cols-1 md:grid-cols-9 gap-3 overflow-y-auto overflow-x-hidden"
    >
      <div
        v-if="updateData.oldDetails"
        class="border border-red-300 bg-red-50 shadow-md rounded-md py-4 px-2 md:px-6 w-full md:col-span-4"
      >
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3">
          <form-group class="w-full" label="First Name" label-for="first-name">
            <span class="font-light text-sm">{{ oldDetail.FirstName }}</span>
          </form-group>
          <form-group
            class="w-full"
            label="Middle Name"
            label-for="middle-name"
          >
            <span class="font-light text-sm">{{ oldDetail.MiddleName }}</span>
          </form-group>
          <form-group class="w-full" label="Last Name" label-for="last-name">
            <span class="font-light text-sm">{{ oldDetail.LastName }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3">
          <form-group class="w-full" label="Gender" label-for="gender">
            <span class="font-light text-sm">{{ oldDetail.GenderType }}</span>
          </form-group>
          <form-group class="w-full" label="Birth Date" label-for="birthdate">
            <span class="font-light text-sm">{{
              formatDate(oldDetail.Birthdate)
            }}</span>
          </form-group>
          <form-group class="w-full" label="Birth Place" label-for="birthplace">
            <span class="font-light text-sm">{{ oldDetail.BirthPlace }}</span>
          </form-group>
        </div>
        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3 border-b border-gray-200"
        >
          <form-group class="w-full" label="Suffix" label-for="suffix">
            <span class="font-light text-sm">{{ oldDetail.Suffix }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-1 gap-4 py-3 border-b border-gray-200">
          <form-group class="w-full" label="Role Name" label-for="role-name">
            <span class="font-light text-sm">{{ oldDetail.RoleName }}</span>
          </form-group>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-gray-200"
        >
          <form-group
            class="w-full"
            label="Contact Option Type"
            label-for="contact-option-type"
          >
            <span class="font-light text-sm">{{
              newDetail.ContactOptionType
            }}</span>
          </form-group>
          <form-group
            class="w-full"
            label="User Name"
            label-for="contact-option-type"
          >
            <span class="font-light text-sm">{{ newDetail.UserName }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
          <form-group
            class="w-full"
            label="Primary Address"
            label-for="address1"
          >
            <span class="font-light text-sm">{{ oldDetail.Address1 }}</span>
          </form-group>
          <form-group
            class="w-full"
            label="Secondary Address"
            label-for="address2"
          >
            <span class="font-light text-sm">{{ oldDetail.Address2 }}</span>
          </form-group>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-gray-200"
        >
          <form-group
            class="w-full"
            label="Address Type"
            label-for="address-type"
          >
            <span class="font-light text-sm">{{
              getAddressType(oldDetail.AddressTypeID)
            }}</span>
          </form-group>
          <form-group class="w-full" label="City" label-for="city">
            <span class="font-light text-sm">{{ oldDetail.City }}</span>
          </form-group>
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-200"
        >
          <form-group class="w-full" label="Zip Code" label-for="city">
            <span class="font-light text-sm">{{ oldDetail.ZipCode }}</span>
          </form-group>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 py-3">
          <form-group class="w-full" label="Has Wallet ?" label-for="last-name">
            <span class="font-light text-sm">{{
              oldDetail.HasWallet === 0 ? 'No' : 'Yes'
            }}</span>
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
        <template v-if="updateData.oldDetails">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3">
            <form-group
              class="w-full"
              label="First Name"
              label-for="first-name"
            >
              <span class="font-light text-sm">{{ newDetail.FirstName }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Middle Name"
              label-for="middle-name"
            >
              <span class="font-light text-sm">{{ newDetail.MiddleName }}</span>
            </form-group>
            <form-group class="w-full" label="Last Name" label-for="last-name">
              <span class="font-light text-sm">{{ newDetail.LastName }}</span>
            </form-group>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3">
            <form-group class="w-full" label="Gender" label-for="gender">
              <span class="font-light text-sm">{{ newDetail.GenderType }}</span>
            </form-group>
            <form-group class="w-full" label="Birth Date" label-for="birthdate">
              <span class="font-light text-sm">{{
                formatDate(newDetail.Birthdate)
              }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Birth Place"
              label-for="birthplace"
            >
              <span class="font-light text-sm">{{ newDetail.BirthPlace }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-2 md:grid-cols-3 gap-4 pb-3 border-b border-gray-200"
          >
            <form-group class="w-full" label="Suffix" label-for="suffix">
              <span class="font-light text-sm">{{ newDetail.Suffix }}</span>
            </form-group>
          </div>
          <div class="grid grid-cols-1 gap-4 py-3 border-b border-gray-200">
            <form-group class="w-full" label="Role Name" label-for="role-name">
              <span class="font-light text-sm">{{ newDetail.RoleName }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-gray-200"
          >
            <form-group
              class="w-full"
              label="Contact Option Type"
              label-for="contact-option-type"
            >
              <span class="font-light text-sm">{{
                newDetail.ContactOptionType
              }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="User Name"
              label-for="contact-option-type"
            >
              <span class="font-light text-sm">{{ newDetail.UserName }}</span>
            </form-group>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
            <form-group
              class="w-full"
              label="Primary Address"
              label-for="address1"
            >
              <span class="font-light text-sm">{{ newDetail.Address1 }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Secondary Address"
              label-for="address2"
            >
              <span class="font-light text-sm">{{ newDetail.Address2 }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-gray-200"
          >
            <form-group
              class="w-full"
              label="Address Type"
              label-for="address-type"
            >
              <span class="font-light text-sm">{{
                getAddressType(newDetail.AddressTypeID)
              }}</span>
            </form-group>
            <form-group class="w-full" label="City" label-for="city">
              <span class="font-light text-sm">{{ newDetail.City }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-200"
          >
            <form-group class="w-full" label="Zip Code" label-for="city">
              <span class="font-light text-sm">{{ newDetail.ZipCode }}</span>
            </form-group>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 py-3">
            <form-group
              class="w-full"
              label="Has Wallet ?"
              label-for="last-name"
            >
              <span class="font-light text-sm">{{
                newDetail.HasWallet === 0 ? 'No' : 'Yes'
              }}</span>
            </form-group>
          </div>
        </template>
        <template v-else>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-3">
            <form-group
              class="w-full"
              label="First Name"
              label-for="first-name"
            >
              <span class="font-light text-sm">{{ newDetail.FirstName }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Middle Name"
              label-for="middle-name"
            >
              <span class="font-light text-sm">{{ newDetail.MiddleName }}</span>
            </form-group>
            <form-group class="w-full" label="Last Name" label-for="last-name">
              <span class="font-light text-sm">{{ newDetail.LastName }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-2 md:grid-cols-4 gap-4 pb-3 border-b border-gray-200"
          >
            <form-group class="w-full" label="Suffix" label-for="suffix">
              <span class="font-light text-sm">{{ newDetail.Suffix }}</span>
            </form-group>
            <form-group class="w-full" label="Gender" label-for="gender">
              <span class="font-light text-sm">{{ newDetail.GenderType }}</span>
            </form-group>
            <form-group class="w-full" label="Birth Date" label-for="birthdate">
              <span class="font-light text-sm">{{
                formatDate(newDetail.Birthdate)
              }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Birth Place"
              label-for="birthplace"
            >
              <span class="font-light text-sm">{{ newDetail.BirthPlace }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-200"
          >
            <form-group class="w-full" label="Role Name" label-for="role-name">
              <span class="font-light text-sm">{{ newDetail.RoleName }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Contact Option Type"
              label-for="contact-option-type"
            >
              <span class="font-light text-sm">{{
                newDetail.ContactOptionType
              }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="User Name"
              label-for="contact-option-type"
            >
              <span class="font-light text-sm">{{ newDetail.UserName }}</span>
            </form-group>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
            <form-group
              class="w-full"
              label="Primary Address"
              label-for="address1"
            >
              <span class="font-light text-sm">{{ newDetail.Address1 }}</span>
            </form-group>
            <form-group
              class="w-full"
              label="Secondary Address"
              label-for="address2"
            >
              <span class="font-light text-sm">{{ newDetail.Address2 }}</span>
            </form-group>
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-200"
          >
            <form-group
              class="w-full"
              label="Address Type"
              label-for="address-type"
            >
              <span class="font-light text-sm">{{
                getAddressType(newDetail.AddressTypeID)
              }}</span>
            </form-group>
            <form-group class="w-full" label="City" label-for="city">
              <span class="font-light text-sm">{{ newDetail.City }}</span>
            </form-group>
            <form-group class="w-full" label="Zip Code" label-for="city">
              <span class="font-light text-sm">{{ newDetail.ZipCode }}</span>
            </form-group>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 py-3">
            <form-group
              class="w-full"
              label="Has Wallet ?"
              label-for="last-name"
            >
              <span class="font-light text-sm">{{
                newDetail.HasWallet === 0 ? 'No' : 'Yes'
              }}</span>
            </form-group>
          </div>
        </template>
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

import format from 'date-fns/format'
import FormGroup from '~/components/Common/FormGroup'
import FaIcon from '@/components/Common/FaIcon'
import WarningIcon from '@/components/Common/Icons/WarningIcon'
import { ADDRESS_TYPES } from '@/js/constants/address-types'

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
    ...mapState('users', ['userCreate']),
    visibilityCaseHandle() {
      const stageUpdate = () =>
        this.$authorize('/back-office/user/stage/update')
      const stageCreate = () =>
        this.$authorize('/back-office/user/stage/create')
      return this.updateData.requestType === 'UPDATE'
        ? stageUpdate()
        : stageCreate()
    },
    newDetail() {
      const data =
        this.updateData.requestType === 'CREATE'
          ? this.updateData?.newDetails?.AddNewUser[0]
          : this.updateData?.newDetails?.UserInfo[0]
      if (data) {
        return {
          ...data,
        }
      }
      return {
        FirstName: '',
        LastName: '',
        MiddleName: '',
        GenderType: '',
        Birthdate: null,
        Suffix: '',
        BirthPlace: '',
        CivilStatusType: '',
        UserName: '',
        ContactOptionType: '',
        RoleName: '',
        Address1: '',
        Address2: '',
        City: '',
        ZipCode: '',
        AddressTypeID: 1,
        HasWallet: false,
      }
    },
    oldDetail() {
      if (this.updateData?.oldDetails?.UserInfo) {
        return {
          ...this.updateData?.oldDetails?.UserInfo[0],
        }
      }
      return {
        FirstName: '',
        LastName: '',
        MiddleName: '',
        GenderType: '',
        Birthdate: null,
        Suffix: '',
        BirthPlace: '',
        CivilStatusType: '',
        UserName: '',
        ContactOptionType: '',
        RoleName: '',
        Address1: '',
        Address2: '',
        City: '',
        ZipCode: '',
        AddressTypeID: 1,
        HasWallet: false,
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

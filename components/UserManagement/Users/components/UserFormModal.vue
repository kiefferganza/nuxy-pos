<template>
  <common-modal
    :show="show"
    size="lg"
    is-form
    :title="!isUpdate ? 'Create User' : 'Update User'"
    :busy="userCreate.fetch"
    @save="submit"
    @close="closeModal"
  >
    <div
      class="overflow-y-auto overflow-x-hidden sm:px-4"
      style="max-height: 30em"
    >
      <alert-component v-show="userCreate.error" class="pb-3" variant="danger">
        <error-message :message="userCreate.error" />
      </alert-component>
      <div class="pb-5">
        <div class="flex flex-col md:flex-row items-center gap-4 pb-1">
          <form-group
            class="w-full"
            label="First Name"
            label-for="first-name"
            required
          >
            <form-input
              v-model="firstName"
              required
              type="text"
              name="first-name"
              block
            />
          </form-group>
          <form-group
            class="w-full"
            label="Middle Name"
            label-for="middle-name"
            required
          >
            <form-input
              v-model="middleName"
              required
              type="text"
              name="middle-name"
              block
            />
          </form-group>
          <form-group
            class="w-full"
            label="Last Name"
            label-for="last-name"
            required
          >
            <form-input
              v-model="lastName"
              required
              type="text"
              name="last-name"
              block
            />
          </form-group>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-4 pb-1">
          <form-group class="w-full" label="Gender" label-for="gender" required>
            <form-select
              v-model="selectedGender"
              :options="genderOptions"
              track-by="name"
              label="name"
              :allow-empty="false"
            />
          </form-group>
          <form-group
            class="w-full"
            label="Birth Date"
            label-for="birth-date"
            required
          >
            <form-date-picker
              v-model="birthDate"
              placeholder="YYYY-MM-DD"
              name="birth-date"
            />
          </form-group>
          <form-group class="w-full" label="Suffix" label-for="suffix">
            <form-input v-model="suffix" type="text" name="suffix" block />
          </form-group>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-4">
          <form-group
            class="w-full"
            label="Birth Place"
            label-for="birth-place"
            required
          >
            <form-input
              v-model="birthPlace"
              required
              type="text"
              name="birth-place"
              block
            />
          </form-group>
          <form-group
            class="w-full"
            label="Civil Status"
            label-for="civil-status"
            required
          >
            <form-select
              v-model="selectedCivilStatus"
              :options="civilStatusOptions"
              track-by="name"
              label="name"
              :allow-empty="false"
            />
          </form-group>
          <form-group class="w-full" label="Role" label-for="role" required>
            <form-select
              v-model="selectedRole"
              track-by="name"
              label="name"
              :allow-empty="false"
              :options="roleOptions"
              name="role"
            />
          </form-group>
        </div>
      </div>
      <div class="py-3 border-t pb-5">
        <div class="flex flex-col md:flex-row items-center gap-4 pb-1">
          <form-group
            class="w-full"
            label="Contact Option"
            label-for="contact-option"
            required
          >
            <form-select
              v-model="selectedContactType"
              track-by="name"
              label="name"
              :allow-empty="false"
              :options="contactOptions"
              name="contact-option"
            />
          </form-group>
          <form-group
            class="w-full"
            label="Contact Value (Username)"
            label-for="username"
            required
          >
            <form-input
              v-model="userName"
              required
              type="text"
              name="username"
              block
            />
          </form-group>
        </div>
        <div
          v-if="checkEmptyObject(updateData)"
          class="flex flex-col md:flex-row items-center gap-4 pb-1"
        >
          <form-group
            class="w-full"
            label="PIN Code"
            label-for="pincode"
            required
          >
            <form-input
              v-model="pinCode"
              required
              type="text"
              name="pincode"
              block
            />
          </form-group>
          <form-group
            class="w-full"
            label="Confirm Pin Code"
            label-for="pincode-confirm"
            required
          >
            <form-input
              v-model="pinCodeConfirm"
              required
              type="text"
              name="pincode-confirm"
              block
            />
          </form-group>
        </div>
        <div
          v-if="checkEmptyObject(updateData)"
          class="flex flex-col md:flex-row items-center gap-4"
        >
          <form-group
            class="w-full"
            label="Password"
            label-for="password"
            required
          >
            <form-input
              v-model="password"
              required
              type="password"
              name="password"
              block
            />
          </form-group>
          <form-group
            class="w-full"
            label="Confirm Password"
            label-for="password-confirm"
            required
          >
            <form-input
              v-model="passwordConfirm"
              required
              type="password"
              name="password-confirm"
              block
            />
          </form-group>
        </div>
      </div>
      <div class="py-3 border-t pb-5">
        <div class="flex flex-col md:flex-row items-center gap-4 pb-1">
          <form-group
            class="w-full"
            label="Primary Address"
            label-for="primary-address"
            required
          >
            <form-input
              v-model="address1"
              required
              type="text"
              name="primary-address"
              block
            />
          </form-group>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-4 pb-1">
          <form-group
            class="w-full"
            label="Secondary Address"
            label-for="secondary-address"
            required
          >
            <form-input
              v-model="address2"
              required
              type="text"
              name="secondary-address"
              block
            />
          </form-group>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-4 pb-1">
          <form-group
            class="w-full"
            label="Zip Code"
            label-for="zip-code"
            required
          >
            <form-input
              v-model="zipCode"
              required
              type="text"
              name="zip-code"
              block
            />
          </form-group>
          <form-group
            class="w-full"
            label="Address Type"
            label-for="address-type"
            required
          >
            <form-select
              v-model="selectedAddressType"
              :options="addressTypeOptions"
              required
              track-by="name"
              label="name"
              :allow-empty="false"
              name="address-type"
            />
          </form-group>
        </div>
        <div class="flex flex-col md:flex-row items-center gap-4">
          <form-group class="w-full" label="Region" label-for="region" required>
            <form-select
              v-model="selectedRegion"
              :options="formattedRegions"
              track-by="name"
              label="name"
              :loading="provinces.fetch"
              :allow-empty="false"
              name="region"
              @input="fetchProvincesByRegion"
            />
          </form-group>
          <form-group
            class="w-full"
            label="Province"
            label-for="province"
            required
          >
            <form-select
              v-model="selectedProvince"
              :disabled="formattedProvinces.length === 0"
              :options="formattedProvinces"
              track-by="name"
              label="name"
              :loading="cities.fetch"
              :allow-empty="false"
              name="province"
              @input="fetchCitiesByProvince"
            />
          </form-group>
          <form-group class="w-full" label="City" label-for="city" required>
            <form-select
              v-model="selectedCity"
              :disabled="formattedCities.length === 0"
              :options="formattedCities"
              track-by="name"
              label="name"
              :allow-empty="false"
              name="city"
            />
          </form-group>
        </div>
      </div>
      <div v-if="!disableWalletInput" class="flex items-center gap-4">
        <form-check-box
          v-model="generateWallet"
          title="Generate Wallet?"
          description="If checked, the system will generate a wallet for the user."
        />
      </div>
    </div>
  </common-modal>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'

import format from 'date-fns/format'
import FormGroup from '~/components/Common/FormGroup'
import FormInput from '~/components/Common/Inputs/FormInput'
import ErrorMessage from '@/components/Common/ErrorMessage'
import AlertComponent from '@/components/Common/AlertComponent'
import { CREATE, UPDATE } from '@/js/constants/form-validations/users'
import FormSelect from '@/components/Common/Inputs/FormSelect'
import FormDatePicker from '@/components/Common/Inputs/FormDatePicker'
import { GENDERS } from '@/js/constants/gender'
import { CIVIL_STATUSES } from '@/js/constants/civil-status'
import { ADDRESS_TYPES } from '@/js/constants/address-types'
import { CONTACT_OPTIONS } from '@/js/constants/contact-options'
import FormCheckBox from '@/components/Common/Inputs/FormCheckBox'

export default {
  components: {
    FormCheckBox,
    FormDatePicker,
    FormSelect,
    AlertComponent,
    FormInput,
    FormGroup,
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
  },
  data() {
    return {
      disableWalletInput: false,
      name: null,
      generateWallet: false,
      suffix: null,
      userName: null,
      firstName: null,
      zipCode: null,
      middleName: null,
      lastName: null,
      birthDate: null,
      birthPlace: null,
      password: null,
      passwordConfirm: null,
      pinCodeConfirm: null,
      pinCode: null,
      selectedRegion: null,
      selectedProvince: null,
      selectedCity: null,
      selectedRole: null,
      address1: null,
      address2: null,
      selectedGender: {
        value: 1,
        name: GENDERS[0],
      },
      selectedContactType: {
        value: 1,
        name: CONTACT_OPTIONS[0],
      },
      selectedCivilStatus: {
        value: 1,
        name: CIVIL_STATUSES[0],
      },
      selectedAddressType: {
        value: 1,
        name: ADDRESS_TYPES[0],
      },
      genderOptions: [
        {
          value: 1,
          name: GENDERS[0],
        },
        {
          value: 2,
          name: GENDERS[1],
        },
        {
          value: 0,
          name: GENDERS[2],
        },
      ],
      civilStatusOptions: [
        {
          value: 1,
          name: CIVIL_STATUSES[0],
        },
        {
          value: 2,
          name: CIVIL_STATUSES[1],
        },
        {
          value: 3,
          name: CIVIL_STATUSES[2],
        },
        {
          value: 4,
          name: CIVIL_STATUSES[3],
        },
      ],
      addressTypeOptions: [
        {
          value: 1,
          name: ADDRESS_TYPES[0],
        },
        {
          value: 2,
          name: ADDRESS_TYPES[1],
        },
      ],
      contactOptions: [
        {
          value: 1,
          name: CONTACT_OPTIONS[0],
        },
        {
          value: 2,
          name: CONTACT_OPTIONS[1],
        },
      ],
    }
  },
  computed: {
    ...mapState('back-office', ['aggregatorCreate']),
    ...mapState('roles', ['roles']),
    ...mapState('users', ['userCreate']),
    ...mapState('helpers', ['provinces', 'cities']),
    ...mapGetters('helpers', [
      'formattedRegions',
      'formattedProvinces',
      'formattedCities',
    ]),
    isUpdate() {
      return !this.checkEmptyObject(this.updateData)
    },
    roleOptions() {
      return this.roles.map(({ RoleID, Name }) => {
        return {
          value: RoleID,
          name: Name,
        }
      })
    },
  },
  watch: {
    updateData(newData) {
      this.$store.commit('users/setUserCreateError', '')
      if (this.isUpdate) {
        this.generateWallet = newData.WalletCode !== null
        this.suffix = newData.suffix
        this.userName = newData.PersonContact
          ? newData.PersonContact[0].Value
          : null
        this.firstName = newData.FirstName
        this.zipCode = newData.PersonAddress
          ? newData.PersonAddress[0].ZipCode
          : null
        this.middleName = newData.MiddleName
        this.lastName = newData.Lastname
        this.birthDate = newData.Birthdate
        this.birthPlace = newData.BirthPlace
        this.selectedRegion = newData.PersonAddress
          ? {
              value: newData.PersonAddress[0].RegionID,
              name: newData.PersonAddress[0].RegionName,
            }
          : null
        this.selectedProvince = newData.PersonAddress
          ? {
              value: newData.PersonAddress[0].ProvinceID,
              name: newData.PersonAddress[0].Province,
            }
          : null
        this.selectedCity = newData.PersonAddress
          ? {
              value: newData.PersonAddress[0].CityID,
              name: newData.PersonAddress[0].City,
            }
          : null
        this.selectedRole = this.roleOptions.find(
          ({ value }) => value === newData.RoleID
        )
        this.address1 = newData.PersonAddress
          ? newData.PersonAddress[0].Address1
          : null
        this.address2 = newData.PersonAddress
          ? newData.PersonAddress[0].Address2
          : null
        this.selectedGender = {
          value: newData.Gender,
          name: GENDERS[
            newData.Gender === 0 ? newData.Gender : newData.Gender - 1
          ],
        }
        this.selectedContactType = newData.PersonContact
          ? {
              value: newData.PersonContact[0].ContactOptionID,
              name: CONTACT_OPTIONS[
                newData.PersonContact[0].ContactOptionID === 0
                  ? newData.PersonContact[0].ContactOptionID
                  : newData.PersonContact[0].ContactOptionID - 1
              ],
            }
          : {
              value: 1,
              name: CONTACT_OPTIONS[0],
            }
        this.selectedCivilStatus = {
          value: newData.CivilStatus,
          name: CIVIL_STATUSES[
            newData.CivilStatus === 0
              ? newData.CivilStatus
              : newData.CivilStatus - 1
          ],
        }
        this.selectedAddressType = newData.PersonAddress
          ? {
              value: newData.PersonAddress[0].AddressTypeID,
              name: ADDRESS_TYPES[
                newData.PersonAddress[0].AddressTypeID === 0
                  ? newData.PersonAddress[0].AddressTypeID
                  : newData.PersonAddress[0].AddressTypeID - 1
              ],
            }
          : {
              value: 1,
              name: ADDRESS_TYPES[0],
            }
        if (this.formattedProvinces.length === 0) {
          this.fetchProvincesByRegion()
        }
        if (this.formattedCities.length === 0) {
          this.fetchCitiesByProvince()
        }
      } else {
        this.resetForm()
      }
    },
    selectedRole(newData) {
      this.disableWalletInput = this.isMakerChecker(newData)
    },
  },
  methods: {
    ...mapActions('helpers', ['fetchProvinces', 'fetchCities']),
    fetchProvincesByRegion() {
      this.selectedProvince = null
      this.selectedCity = null
      if (this.selectedRegion) {
        this.fetchProvinces(this.selectedRegion.value)
      }
    },
    fetchCitiesByProvince() {
      if (this.selectedProvince) {
        this.fetchCities(this.selectedProvince.value)
      }
    },
    checkEmptyObject(data) {
      return isEmpty(data)
    },
    submit() {
      if (
        this.$validate(
          this.isUpdate ? UPDATE : CREATE,
          this,
          'users/setUserCreateError'
        ).length === 0
      ) {
        this.$emit('submit', {
          firstName: this.firstName,
          lastName: this.lastName,
          middleName: this.middleName,
          suffix: this.suffix,
          birthPlace: this.birthPlace,
          civilStatus: this.selectedCivilStatus.value,
          userName: this.userName,
          contactOptionId: this.selectedContactType.value.toString(),
          pinCode: this.pinCode,
          pinCodeConfirm: this.pinCodeConfirm,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          roleId: this.selectedRole.value,
          address1: this.address1,
          address2: this.address2,
          cityId: this.selectedCity.value,
          addressTypeId: this.selectedAddressType.value,
          hasWallet: this.generateWallet ? 1 : 0,
          zipCode: this.zipCode,
          gender: this.selectedGender.value,
          birthDate: this.birthDate
            ? format(new Date(this.birthDate), 'yyyy-MM-dd')
            : null,
          userCode: this.updateData?.UserCode,
          isUpdate: this.isUpdate,
        })
      }
    },
    resetForm() {
      this.generateWallet = false
      this.suffix = null
      this.userName = null
      this.firstName = null
      this.zipCode = null
      this.middleName = null
      this.lastName = null
      this.birthDate = null
      this.birthPlace = null
      this.password = null
      this.passwordConfirm = null
      this.pinCodeConfirm = null
      this.pinCode = null
      this.selectedRegion = null
      this.selectedProvince = null
      this.selectedCity = null
      this.selectedRole = null
      this.address1 = null
      this.address2 = null
      this.selectedGender = {
        value: 1,
        name: GENDERS[0],
      }
      this.selectedContactType = {
        value: 1,
        name: CONTACT_OPTIONS[0],
      }
      this.selectedCivilStatus = {
        value: 1,
        name: CIVIL_STATUSES[0],
      }
      this.selectedAddressType = {
        value: 1,
        name: ADDRESS_TYPES[0],
      }
    },
    closeModal() {
      this.$emit('close-user-modal')
    },
    isMakerChecker(value) {
      const roleSelected = value?.name
      const isMaker = this.checkOptionName(roleSelected, 'Maker')
      const isChecker = this.checkOptionName(roleSelected, 'Checker')

      return isMaker || isChecker
    },
    checkOptionName(arr, value) {
      return arr ? arr.includes(value) : false
    },
  },
}
</script>

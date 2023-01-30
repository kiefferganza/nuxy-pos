<!-- Please remove this file from your project -->
<template>
  <div
    class="max-w-lg w-full bg-white rounded-lg p-6 shadow-md space-y-4 border border-gray-200"
  >
    <auth-heading
      title="Reset Credentials"
      :description="`Reset ${$route.query.type} using your phone number`"
    />
    <alert-component v-show="otp.error" variant="danger">
      <error-message :message="otp.error" />
    </alert-component>
    <form @submit.prevent="submit">
      <div class="pb-5">
        <form-group label-for="mobile-number" label="Mobile Number">
          <form-input
            id="mobile-number"
            v-model="mobileNumber"
            v-mask="'###########'"
            type="text"
            placeholder="09123456789"
            required
            block
          />
        </form-group>
      </div>
      <form-button
        :disabled="otp.busy"
        :busy="otp.busy"
        type="submit"
        block
        class="button button__block button__primary"
        >Proceed</form-button
      >
    </form>
    <div class="flex flex-col md:flex-row items-center justify-center pt-6">
      <span class="text-sm">Already a member? &nbsp;</span>
      <nuxt-link to="/" class="link__primary">Log in.</nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AuthHeading from '~/components/Common/Auth/AuthHeading'
import AlertComponent from '~/components/Common/AlertComponent'
import FormInput from '~/components/Common/Inputs/FormInput'
import FormGroup from '~/components/Common/FormGroup'
import FormButton from '~/components/Common/Inputs/FormButton'
import ErrorMessage from '~/components/Common/ErrorMessage'

export default {
  components: {
    ErrorMessage,
    AuthHeading,
    AlertComponent,
    FormGroup,
    FormInput,
    FormButton,
  },
  data() {
    return {
      mobileNumber: '',
    }
  },
  computed: {
    ...mapState('auth', ['otp']),
  },
  methods: {
    submit() {
      this.$emit('submit', {
        contactOptionId: '1',
        contactOptionValue: this.mobileNumber,
      })
    },
  },
}
</script>

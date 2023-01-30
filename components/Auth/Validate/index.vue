<!-- Please remove this file from your project -->
<template>
  <div
    class="max-w-lg w-full bg-white rounded-lg p-6 shadow-md space-y-4 border border-gray-200"
  >
    <auth-heading
      title="Validate"
      description="Enter the OTP that was sent to your phone number"
    />
    <alert-component v-if="mode === 'development'">
      This is for testing purpose only your OTP is &nbsp;
      <span class="font-bold">{{ person.otp }}</span>
    </alert-component>
    <alert-component v-show="validate.error" variant="danger">
      <error-message :message="validate.error" />
    </alert-component>
    <form @submit.prevent="submit">
      <div class="my-8">
        <form-pin-input v-model="otp" />
      </div>
      <form-button
        :disabled="validate.busy"
        :busy="validate.busy"
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
import FormButton from '~/components/Common/Inputs/FormButton'
import FormPinInput from '~/components/Common/Inputs/FormPinInput'
import ErrorMessage from '~/components/Common/ErrorMessage'

export default {
  components: {
    ErrorMessage,
    FormPinInput,
    AuthHeading,
    AlertComponent,
    FormButton,
  },
  data() {
    return {
      otp: '',
    }
  },
  computed: {
    ...mapState('auth', ['validate', 'person']),
    mode() {
      return process.env.NODE_ENV
    },
  },
  methods: {
    submit() {
      this.$emit('submit', {
        personCode: this.person.code,
        userCode: this.person.userCode,
        otpCode: this.otp,
        mobileNumber: this.person.mobileNumber,
      })
    },
  },
}
</script>
